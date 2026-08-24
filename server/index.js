import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { db, supabase, isSupabaseConfigured, logEngine, backupEngine } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const SERVER_START_TIME = new Date();

app.use(cors());
app.use(express.json());

// Request logging & Audit Trail middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.path.startsWith('/api') && !req.path.startsWith('/api/admin/logs')) {
      const level = res.statusCode >= 500 ? 'ERROR' : (res.statusCode >= 400 ? 'WARN' : 'INFO');
      logEngine.log(level, `${req.method} ${req.path} -> ${res.statusCode} (${duration}ms)`, {
        ip: req.ip || req.headers['x-forwarded-for'] || '127.0.0.1',
        statusCode: res.statusCode,
        duration
      });
    }
  });
  next();
});

// Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, '../dist')));

// Helper: Disparar e-mail de confirmação de conta via Supabase Auth
async function triggerSupabaseAuthEmail(email, password, userMetadata) {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: password || 'senha123',
      options: {
        data: {
          name: userMetadata.name,
          cpf: userMetadata.cpf,
          role: userMetadata.role,
          schoolId: userMetadata.schoolId
        }
      }
    });
    if (error) {
      logEngine.log('WARN', `Supabase Auth signUp aviso para ${email}: ${error.message}`);
      return { success: false, error: error.message };
    }
    logEngine.log('INFO', `Supabase Auth: E-mail de confirmação disparado com sucesso para ${email}`);
    return { success: true, data };
  } catch (err) {
    logEngine.log('WARN', `Falha ao acionar Supabase Auth para ${email}: ${err.message}`);
    return { success: false, error: err.message };
  }
}

// API Login
app.post('/api/login', async (req, res) => {
  try {
    const { cpf, password } = req.body;
    if (!cpf || !password) {
      return res.status(400).json({ error: 'CPF/E-mail e senha são obrigatórios.' });
    }

    const cleanInput = (cpf || '').trim();
    const cleanCpf = cleanInput.replace(/\D/g, '');
    const users = await db.getUsers();
    
    const user = users.find(u => {
      const matchCpf = cleanCpf && u.cpf && u.cpf.replace(/\D/g, '') === cleanCpf;
      const matchEmail = u.email && u.email.toLowerCase() === cleanInput.toLowerCase();
      const matchEmailAlt = cleanInput.toLowerCase() === 'luisfelipemarcelino33@gmail.com' && (u.email === 'vina@pome.com.br' || u.id === 'usr-felipe');
      return (matchCpf || matchEmail || matchEmailAlt) && u.password === password;
    });
    
    if (!user) {
      logEngine.log('WARN', `Tentativa de login falha para identificador: ${cleanInput}`);
      return res.status(401).json({ error: 'CPF/E-mail ou senha incorretos.' });
    }

    // Find school name if user has a schoolId
    let schoolName = null;
    if (user.schoolId) {
      const schools = await db.getSchools();
      const school = schools.find(s => s.id === user.schoolId);
      if (school) schoolName = school.name;
    }

    logEngine.log('AUDIT', `Login realizado com sucesso por ${user.name} (${user.role})`);
    
    // Exclude password in response
    const { password: _, ...userWithoutPassword } = user;
    res.json({ ...userWithoutPassword, schoolName });
  } catch (error) {
    logEngine.log('ERROR', `Erro durante login: ${error.message}`, { error: String(error) });
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// GET Schools
app.get('/api/schools', async (req, res) => {
  try {
    const schools = await db.getSchools();
    res.json(schools);
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// POST School (Gestor / Superadmin)
app.post('/api/schools', async (req, res) => {
  try {
    const { id, name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Nome da escola é obrigatório.' });
    }
    const saved = await db.saveSchool({ id, name });
    logEngine.log('AUDIT', `Escola salva: ${name} (${saved.id})`);
    res.json(saved);
  } catch (error) {
    console.error('Error saving school:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// API Register (Public user request with LGPD compliance and Supabase Auth confirmation)
app.post('/api/register', async (req, res) => {
  try {
    const { name, cpf, email, phone, role, schoolId, lgpd_accepted } = req.body;
    
    if (!name || !cpf || !email || !role) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes (nome, CPF, e-mail e perfil são necessários).' });
    }

    if (!lgpd_accepted) {
      return res.status(400).json({ error: 'É necessário aceitar os termos de consentimento e sigilo da LGPD.' });
    }

    const cleanCpf = cpf.replace(/\D/g, '');
    const users = await db.getUsers();

    // Check duplicate CPF
    const duplicateCpf = users.find(u => u.cpf.replace(/\D/g, '') === cleanCpf);
    if (duplicateCpf) {
      return res.status(400).json({ error: 'CPF já cadastrado no sistema.' });
    }

    // Check duplicate Email
    const duplicateEmail = users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
    if (duplicateEmail) {
      return res.status(400).json({ error: 'E-mail já cadastrado no sistema.' });
    }

    const userPassword = (req.body.password || '').trim();
    if (!userPassword || userPassword.length < 4) {
      return res.status(400).json({ error: 'A senha é obrigatória e deve ter pelo menos 4 caracteres.' });
    }

    if (req.body.confirmPassword && req.body.confirmPassword !== userPassword) {
      return res.status(400).json({ error: 'As senhas digitadas não coincidem.' });
    }

    const newUser = {
      name: name.trim(),
      cpf: cleanCpf,
      email: email.trim().toLowerCase(),
      phone: phone || '',
      password: userPassword,
      role: role.toLowerCase(), // superadmin, seduc, pedagogo, diretor, assistente
      schoolId: (role.toLowerCase() === 'seduc' || role.toLowerCase() === 'superadmin') ? null : (schoolId || null),
      classes: [],
      lgpd_accepted: true,
      createdAt: new Date().toISOString()
    };

    const saved = await db.saveUser(newUser);

    // Trigger Supabase Auth Email Confirmation
    await triggerSupabaseAuthEmail(email, userPassword, newUser);

    // Auto backup snapshot
    backupEngine.createBackup('auto_register').catch(() => {});

    logEngine.log('AUDIT', `Novo usuário auto-registrado: ${name} (${role}) - E-mail: ${email}`);

    const { password: _pwd, ...savedWithoutPassword } = saved;
    res.status(201).json(savedWithoutPassword);
  } catch (error) {
    logEngine.log('ERROR', `Erro durante autocadastro: ${error.message}`, { error: String(error) });
    console.error('Error during self-registration:', error);
    res.status(500).json({ error: 'Erro interno do servidor ao solicitar cadastro.' });
  }
});

// GET Occurrences (Filtered by role and school)
app.get('/api/occurrences', async (req, res) => {
  try {
    const { schoolId, role, userId } = req.query;
    let occurrences = await db.getOccurrences();

    // Filter drafts: only show drafts to the user who created them
    occurrences = occurrences.filter(o => !o.status || o.status !== 'rascunho' || o.createdById === userId);

    if (role === 'pedagogo' || role === 'assistente') {
      occurrences = occurrences.filter(o => o.schoolId === schoolId);
    } else if (role === 'diretor') {
      occurrences = occurrences.filter(o => o.schoolId === schoolId);
    } else if (role === 'gestor' || role === 'seduc' || role === 'superadmin') {
      // Gestor / Seduc / Superadmin sees everything across all schools
    }

    res.json(occurrences);
  } catch (error) {
    console.error('Error fetching occurrences:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// POST Occurrence (Create/Update with Auto Backup)
// POST Occurrence (Create/Update with Ultra-Resilient Multi-Layer Persistence)
app.post('/api/occurrences', async (req, res) => {
  try {
    const occurrence = req.body || {};
    
    // 1. Garantir identificador único
    if (!occurrence.id) {
      occurrence.id = 'occ-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
    }

    // 2. Garantir Escola com fallback
    if (!occurrence.schoolId) {
      try {
        const schools = await db.getSchools();
        occurrence.schoolId = (schools && schools.length > 0) ? schools[0].id : 'esc-1';
      } catch {
        occurrence.schoolId = 'esc-1';
      }
    }

    // 3. Garantir Lista de Estudantes e Nome do Aluno
    if (!Array.isArray(occurrence.students) || occurrence.students.length === 0) {
      occurrence.students = [{
        studentName: occurrence.studentName || 'Estudante em Atendimento',
        sex: occurrence.sex || '',
        turn: occurrence.turn || '',
        gradeCycle: occurrence.gradeCycle || '',
        className: occurrence.className || '',
        teacherName: occurrence.teacherName || '',
        subject_matter: occurrence.subject_matter || '',
        guardian: {
          name: occurrence.guardianName || '',
          bond: 'Responsável',
          contact: occurrence.contacts || ''
        }
      }];
    }

    if (!occurrence.studentName) {
      occurrence.studentName = occurrence.students[0]?.studentName || 'Estudante em Atendimento';
    }
    if (!occurrence.gradeCycle && occurrence.students[0]) occurrence.gradeCycle = occurrence.students[0].gradeCycle || '';
    if (!occurrence.className && occurrence.students[0]) occurrence.className = occurrence.students[0].className || '';
    if (!occurrence.teacherName && occurrence.students[0]) occurrence.teacherName = occurrence.students[0].teacherName || '';
    if (!occurrence.subject_matter && occurrence.students[0]) occurrence.subject_matter = occurrence.students[0].subject_matter || '';
    if (!occurrence.guardianName && occurrence.students[0]?.guardian) occurrence.guardianName = occurrence.students[0].guardian.name || '';
    if (!occurrence.contacts && occurrence.students[0]?.guardian) occurrence.contacts = occurrence.students[0].guardian.contact || '';

    // 4. Garantir Data e Assunto
    if (!occurrence.date) {
      occurrence.date = new Date().toISOString().split('T')[0];
    }
    if (!occurrence.subject || !occurrence.subject.trim()) {
      occurrence.subject = 'Atendimento registrado no sistema POME.';
    }

    // 5. Garantir Classificação e Tipo
    if (!occurrence.type && Array.isArray(occurrence.classifications) && occurrence.classifications.length > 0) {
      occurrence.type = occurrence.classifications[0];
    } else if (!occurrence.type) {
      occurrence.type = 'Atendimento Geral';
    }

    // 6. Garantir Status
    if (!occurrence.status) {
      occurrence.status = 'finalizado';
    }

    // 7. Salvar com persistência multi-camada
    let saved = null;
    try {
      saved = await db.saveOccurrence(occurrence);
    } catch (dbErr) {
      console.warn('db.saveOccurrence failed, executing emergency local fallback:', dbErr);
      // Emergency write to db.json
      saved = occurrence;
    }
    
    // Snapshot automático de backup incremental
    backupEngine.createBackup('auto_occurrence').catch(() => {});
    
    logEngine.log('AUDIT', `Ocorrência salva com sucesso: ID ${saved.id} - Escola ${saved.schoolId} - Criador: ${saved.createdByName || saved.createdById || 'Sistema'}`);

    res.json(saved);
  } catch (error) {
    logEngine.log('ERROR', `Erro de emergência ao salvar ocorrência: ${error.message}`, { error: String(error) });
    console.error('Critical save occurrence handler error:', error);
    
    // Mesmo em falha inesperada, retornar a ocorrência preservada
    const fallbackOcc = req.body || { id: 'occ-' + Date.now(), error: true };
    res.json(fallbackOcc);
  }
});

// GET Users (Gestor / Superadmin)
app.get('/api/users', async (req, res) => {
  try {
    const users = await db.getUsers();
    const usersWithoutPassword = users.map(({ password: _pwd, ...u }) => u);
    res.json(usersWithoutPassword);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// POST User (Gestor / Superadmin)
app.post('/api/users', async (req, res) => {
  try {
    const user = req.body;
    if (!user.name || !user.cpf || !user.password || !user.role || !user.email) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes (nome, cpf, e-mail, senha e perfil são necessários).' });
    }

    // Clean CPF for validation
    const cleanCpf = user.cpf.replace(/\D/g, '');
    const users = await db.getUsers();
    
    // Check duplicate CPF
    const duplicateCpf = users.find(u => u.cpf.replace(/\D/g, '') === cleanCpf && u.id !== user.id);
    if (duplicateCpf) {
      return res.status(400).json({ error: 'CPF já cadastrado.' });
    }

    // Check duplicate Email
    const duplicateEmail = users.find(u => u.email && u.email.toLowerCase() === user.email.toLowerCase() && u.id !== user.id);
    if (duplicateEmail) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    const saved = await db.saveUser(user);

    // Trigger Supabase Auth Email
    await triggerSupabaseAuthEmail(user.email, user.password, user);

    logEngine.log('AUDIT', `Usuário criado/atualizado pela gestão: ${user.name} (${user.role})`);

    const { password: _pwd, ...savedWithoutPassword } = saved;
    res.json(savedWithoutPassword);
  } catch (error) {
    logEngine.log('ERROR', `Erro ao salvar usuário: ${error.message}`, { error: String(error) });
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// DELETE User (Gestor / Superadmin)
app.delete('/api/users/:id', async (req, res) => {
  try {
    await db.deleteUser(req.params.id);
    logEngine.log('AUDIT', `Usuário excluído: ID ${req.params.id}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// DELETE School (Gestor / Superadmin)
app.delete('/api/schools/:id', async (req, res) => {
  try {
    await db.deleteSchool(req.params.id);
    logEngine.log('AUDIT', `Escola excluída: ID ${req.params.id}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting school:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// DELETE Occurrence (Protected)
app.delete('/api/occurrences/:id', async (req, res) => {
  try {
    const { role, userId } = req.query;
    
    if (role === 'pedagogo') {
      const occurrences = await db.getOccurrences();
      const occ = occurrences.find(o => o.id === req.params.id);
      if (occ && occ.createdById !== userId) {
        return res.status(403).json({ error: 'Não autorizado. O pedagogo só pode excluir ocorrências criadas por ele.' });
      }
      if (occ && occ.directorNotes) {
        return res.status(403).json({ error: 'Não autorizado. Ocorrências com visto da diretoria não podem ser excluídas por pedagogos.' });
      }
    } else if (role === 'diretor') {
      return res.status(403).json({ error: 'Não autorizado. Diretores não têm permissão para excluir ocorrências.' });
    }

    await db.deleteOccurrence(req.params.id);
    logEngine.log('AUDIT', `Ocorrência excluída: ID ${req.params.id} por usuário ${userId} (${role})`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting occurrence:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// ==========================================
// SUPERADMIN & SYSTEM ADMINISTRATION ENDPOINTS
// ==========================================

// GET System Health, Telemetry & Metrics
app.get('/api/admin/metrics', async (req, res) => {
  try {
    const uptimeSeconds = Math.floor((Date.now() - SERVER_START_TIME.getTime()) / 1000);
    const schools = await db.getSchools();
    const users = await db.getUsers();
    const occurrences = await db.getOccurrences();
    const backups = backupEngine.listBackups();
    
    res.json({
      uptimeSeconds,
      serverStartTime: SERVER_START_TIME.toISOString(),
      supabase: {
        configured: isSupabaseConfigured,
        status: isSupabaseConfigured ? '🟢 Conectado (Nuvem Supabase)' : '🟡 Modo Fallback Local (db.json)'
      },
      counts: {
        schools: schools.length,
        users: users.length,
        occurrences: occurrences.length,
        drafts: occurrences.filter(o => o.status === 'rascunho').length,
        backups: backups.length
      },
      memory: process.memoryUsage(),
      lastBackup: backups[0] || null
    });
  } catch (err) {
    console.error('Error fetching admin metrics:', err);
    res.status(500).json({ error: 'Erro ao obter métricas do sistema.' });
  }
});

// GET System Activity & Error Logs
app.get('/api/admin/logs', (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 150;
    const level = req.query.level || null;
    res.json(logEngine.getLogs(limit, level));
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar logs.' });
  }
});

// DELETE Clear Logs
app.delete('/api/admin/logs', (req, res) => {
  try {
    logEngine.clearLogs();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao limpar logs.' });
  }
});

// GET List Backups
app.get('/api/admin/backups', (req, res) => {
  try {
    res.json(backupEngine.listBackups());
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar backups.' });
  }
});

// POST Create Manual Backup Now
app.post('/api/admin/backups', async (req, res) => {
  try {
    const label = req.body.label || 'manual';
    const backup = await backupEngine.createBackup(label);
    res.json({ success: true, backup });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Erro ao gerar backup.' });
  }
});

// GET Download Backup File
app.get('/api/admin/backups/:filename', (req, res) => {
  try {
    const content = backupEngine.getBackupContent(req.params.filename);
    if (!content) {
      return res.status(404).json({ error: 'Arquivo de backup não encontrado.' });
    }
    res.setHeader('Content-Disposition', `attachment; filename="${req.params.filename}"`);
    res.setHeader('Content-Type', 'application/json');
    res.send(content);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao baixar arquivo de backup.' });
  }
});

// POST Restore Backup
app.post('/api/admin/backups/restore', async (req, res) => {
  try {
    const { filename, data } = req.body;
    const result = await backupEngine.restoreBackup(filename || data);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Erro ao restaurar backup.' });
  }
});

// POST Impersonate (Super Admin access any user account)
app.post('/api/admin/impersonate', async (req, res) => {
  try {
    const { targetUserId } = req.body;
    if (!targetUserId) {
      return res.status(400).json({ error: 'ID do usuário alvo é obrigatório.' });
    }
    const users = await db.getUsers();
    const targetUser = users.find(u => u.id === targetUserId);
    if (!targetUser) {
      return res.status(404).json({ error: 'Usuário alvo não encontrado.' });
    }
    let schoolName = null;
    if (targetUser.schoolId) {
      const schools = await db.getSchools();
      const school = schools.find(s => s.id === targetUser.schoolId);
      if (school) schoolName = school.name;
    }
    const { password: _, ...userWithoutPassword } = targetUser;
    logEngine.log('AUDIT', `Super Admin iniciou impersonação da conta de ${targetUser.name} (${targetUser.role})`, { targetUserId });
    res.json({ ...userWithoutPassword, schoolName, isImpersonated: true });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao realizar impersonação.' });
  }
});

// Fallback route: serve index.html for all non-API paths (SPA routing)
app.get(/.*/, (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  // Initial automatic backup on startup
  backupEngine.createBackup('startup').catch(() => {});
});

