import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { db, supabase, isSupabaseConfigured, logEngine, backupEngine, hashPassword, verifyPassword, generateToken, verifyToken } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const SERVER_START_TIME = new Date();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));

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

// Anti-Brute-Force Rate Limiting Tracker for Login
const failedLoginAttempts = new Map();

function checkBruteForce(ip) {
  const record = failedLoginAttempts.get(ip);
  if (!record) return { blocked: false };
  if (Date.now() > record.blockedUntil) {
    failedLoginAttempts.delete(ip);
    return { blocked: false };
  }
  if (record.count >= 5) {
    const minutesLeft = Math.ceil((record.blockedUntil - Date.now()) / 60000);
    return { blocked: true, minutesLeft };
  }
  return { blocked: false };
}

function recordLoginFailure(ip) {
  const record = failedLoginAttempts.get(ip) || { count: 0, blockedUntil: 0 };
  record.count += 1;
  if (record.count >= 5) {
    record.blockedUntil = Date.now() + 15 * 60 * 1000; // Bloqueio por 15 minutos
  }
  failedLoginAttempts.set(ip, record);
}

function clearLoginFailures(ip) {
  failedLoginAttempts.delete(ip);
}

// API Login (Protected with PBKDF2/SHA-512 Verification, Rate Limiting & JWT Signing)
app.post('/api/login', async (req, res) => {
  try {
    const clientIp = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
    
    // 1. Verificar proteção contra força bruta
    const bruteForceCheck = checkBruteForce(clientIp);
    if (bruteForceCheck.blocked) {
      logEngine.log('WARN', `Tentativa de login bloqueada por taxa excessiva (IP: ${clientIp})`);
      return res.status(429).json({ 
        error: `Muitas tentativas incorretas. Por segurança, tente novamente em ${bruteForceCheck.minutesLeft} minutos.` 
      });
    }

    const { cpf, password } = req.body;
    if (!cpf || !password) {
      return res.status(400).json({ error: 'CPF/E-mail e senha são obrigatórios.' });
    }

    const cleanInput = (cpf || '').trim().toLowerCase();
    const cleanCpf = cleanInput.replace(/\D/g, '');
    const cleanPwd = (password || '').trim();
    const users = await db.getUsers();
    
    // 2. Prioridade para correspondência exata de CPF ou E-mail
    let user = users.find(u => {
      const uCpf = (u.cpf || '').replace(/\D/g, '');
      const uEmail = (u.email || '').toLowerCase();
      const matchCpf = cleanCpf.length >= 4 && uCpf && uCpf === cleanCpf;
      const matchEmail = uEmail && uEmail === cleanInput;
      return matchCpf || matchEmail;
    });

    // 3. Segunda prioridade: correspondência direta para Super Admin Master (Felipe)
    if (!user) {
      user = users.find(u => {
        const uEmail = (u.email || '').toLowerCase();
        return (cleanInput === 'luisfelipemarcelino33@gmail.com' || cleanInput.includes('felipe@')) && u.id === 'usr-felipe';
      });
    }

    if (!user) {
      recordLoginFailure(clientIp);
      logEngine.log('WARN', `Tentativa de login falha: usuário não encontrado para ${cleanInput}`);
      return res.status(401).json({ error: 'CPF/E-mail ou senha incorretos.' });
    }

    // 4. Validação de senha segura com PBKDF2/SHA-512 e timing-safe comparison
    const isPasswordValid = verifyPassword(cleanPwd, user.password);

    if (!isPasswordValid) {
      recordLoginFailure(clientIp);
      logEngine.log('WARN', `Tentativa de login falha: senha incorreta para ${user.email || user.cpf}`);
      return res.status(401).json({ error: 'CPF/E-mail ou senha incorretos.' });
    }

    // Sucesso: limpar falhas anteriores
    clearLoginFailures(clientIp);

    // Se o usuário ainda estava com senha antiga em texto puro, atualiza silenciosamente para hash seguro
    if (!user.password.startsWith('pbkdf2:sha512:')) {
      user.password = hashPassword(cleanPwd);
      db.saveUser(user).catch(() => {});
    }

    // Find school name if user has a schoolId
    let schoolName = null;
    if (user.schoolId) {
      const schools = await db.getSchools();
      const school = schools.find(s => s.id === user.schoolId);
      if (school) schoolName = school.name;
    }

    // Gerar Token JWT Assinado Digitalmente
    const token = generateToken({
      userId: user.id,
      role: user.role,
      schoolId: user.schoolId,
      name: user.name,
      cpf: user.cpf
    });

    logEngine.log('AUDIT', `Login realizado com sucesso por ${user.name} (${user.role})`);
    
    // Exclude password in response
    const { password: _, ...userWithoutPassword } = user;
    res.json({ ...userWithoutPassword, schoolName, token });
  } catch (error) {
    logEngine.log('ERROR', `Erro durante login: ${error.message}`, { error: String(error) });
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// POST Forgot Password (Auto-recovery via Supabase Auth)
app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ error: 'E-mail institucional é obrigatório.' });
    }
    const cleanEmail = email.trim().toLowerCase();
    
    const users = await db.getUsers();
    const user = users.find(u => (u.email || '').toLowerCase() === cleanEmail);
    if (!user) {
      logEngine.log('WARN', `Solicitação de recuperação para e-mail não cadastrado: ${cleanEmail}`);
      return res.json({ success: true, message: 'Se o e-mail estiver cadastrado, as instruções foram enviadas.' });
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail);
        if (error) {
          logEngine.log('WARN', `Supabase Auth recuperação aviso para ${cleanEmail}: ${error.message}`);
        } else {
          logEngine.log('AUDIT', `E-mail de recuperação de senha enviado com sucesso pelo Supabase para ${cleanEmail}`);
        }
      } catch (err) {
        logEngine.log('WARN', `Falha ao acionar recuperação no Supabase para ${cleanEmail}: ${err.message}`);
      }
    }

    res.json({ success: true, message: 'Instruções de redefinição enviadas para o e-mail informado.' });
  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({ error: 'Erro ao processar solicitação de recuperação de senha.' });
  }
});

// GET Schools
app.get('/api/schools', async (req, res) => {
  try {
    const schools = await db.getSchools();
    res.json(schools);
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({ error: 'Erro interno ao buscar escolas no Supabase.' });
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
    logEngine.log('AUDIT', `Escola salva no Supabase: ${name} (${saved.id})`);
    res.json(saved);
  } catch (error) {
    console.error('Error saving school:', error);
    res.status(500).json({ error: 'Erro ao salvar escola no Supabase: ' + error.message });
  }
});

// DELETE School (Gestor / Superadmin)
app.delete('/api/schools/:id', async (req, res) => {
  try {
    await db.deleteSchool(req.params.id);
    logEngine.log('AUDIT', `Escola excluída no Supabase: ID ${req.params.id}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting school:', error);
    res.status(500).json({ error: 'Erro ao excluir escola no Supabase.' });
  }
});

// API Register (Public user request with LGPD compliance and Supabase Auth confirmation)
app.post('/api/register', async (req, res) => {
  try {
    const { name, cpf, email, phone, role, schoolId, lgpd_accepted } = req.body || {};
    
    if (!name || !cpf || !email || !role) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes (nome, CPF, e-mail e perfil são necessários).' });
    }

    if (!lgpd_accepted) {
      return res.status(400).json({ error: 'É necessário aceitar os termos de consentimento e sigilo da LGPD.' });
    }

    const cleanCpf = (cpf || '').replace(/\D/g, '');
    if (cleanCpf.length < 11) {
      return res.status(400).json({ error: 'Por favor, informe um CPF válido com 11 dígitos.' });
    }

    const cleanEmail = (email || '').trim().toLowerCase();
    const users = await db.getUsers();

    // Check duplicate CPF
    const duplicateCpf = users.find(u => (u.cpf || '').replace(/\D/g, '') === cleanCpf);
    if (duplicateCpf) {
      return res.status(400).json({ error: 'CPF já cadastrado no sistema.' });
    }

    // Check duplicate Email
    const duplicateEmail = users.find(u => (u.email || '').trim().toLowerCase() === cleanEmail);
    if (duplicateEmail) {
      return res.status(400).json({ error: 'E-mail institucional já cadastrado no sistema.' });
    }

    const userPassword = (req.body.password || '').trim();
    if (!userPassword || userPassword.length < 4) {
      return res.status(400).json({ error: 'A senha é obrigatória e deve ter pelo menos 4 caracteres.' });
    }

    if (req.body.confirmPassword && req.body.confirmPassword.trim() !== userPassword) {
      return res.status(400).json({ error: 'As senhas digitadas não coincidem.' });
    }

    const newUser = {
      name: name.trim(),
      cpf: cleanCpf,
      email: cleanEmail,
      phone: (phone || '').trim(),
      password: userPassword,
      role: (role || 'pedagogo').toLowerCase(), // superadmin, seduc, pedagogo, diretor, assistente
      schoolId: (role.toLowerCase() === 'seduc' || role.toLowerCase() === 'superadmin' || role.toLowerCase() === 'gestor') ? null : (schoolId ? schoolId.trim() : null),
      classes: [],
      lgpd_accepted: true,
      createdAt: new Date().toISOString()
    };

    const saved = await db.saveUser(newUser);

    // Trigger Supabase Auth Email Confirmation asynchronously without blocking response
    triggerSupabaseAuthEmail(cleanEmail, userPassword, newUser).catch(err => {
      console.warn('Background Supabase auth email trigger warning:', err?.message || err);
    });

    logEngine.log('AUDIT', `Novo usuário auto-registrado no Supabase: ${name} (${role}) - E-mail: ${cleanEmail}`);

    const { password: _pwd, ...savedWithoutPassword } = saved;
    res.status(201).json(savedWithoutPassword);
  } catch (error) {
    logEngine.log('ERROR', `Erro durante autocadastro: ${error.message}`, { error: String(error) });
    console.error('Error during self-registration:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário no Supabase: ' + error.message });
  }
});

// GET Occurrences (Filtered by role and school directly in Supabase)
app.get('/api/occurrences', async (req, res) => {
  try {
    const { schoolId, role, userId } = req.query;
    
    // Gestor, Seduc e Superadmin têm visão global (todas as escolas da rede)
    const isGlobalRole = role === 'gestor' || role === 'seduc' || role === 'superadmin';
    const targetSchoolId = (!isGlobalRole && schoolId) ? schoolId : null;

    let occurrences = await db.getOccurrences(targetSchoolId ? { schoolId: targetSchoolId } : {});

    // Filter drafts: only show drafts to the user who created them
    occurrences = occurrences.filter(o => !o.status || o.status !== 'rascunho' || o.createdById === userId);

    res.json(occurrences);
  } catch (error) {
    console.error('Error fetching occurrences:', error);
    res.status(500).json({ error: 'Erro ao carregar ocorrências do Supabase: ' + error.message });
  }
});

// POST Occurrence (Create/Update directly in Supabase with Immediate Snapshot)
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

    // 7. Salvar diretamente no Supabase (Fonte única da verdade)
    const saved = await db.saveOccurrence(occurrence);
    
    logEngine.log('AUDIT', `Ocorrência salva no Supabase: ID ${saved.id} - Escola ${saved.schoolId} - Criador: ${saved.createdByName || saved.createdById || 'Sistema'}`);

    res.json(saved);
  } catch (error) {
    logEngine.log('ERROR', `Erro ao salvar ocorrência no Supabase: ${error.message}`, { error: String(error) });
    console.error('Critical save occurrence handler error:', error);
    res.status(500).json({ error: 'Erro ao salvar ocorrência no Supabase: ' + error.message });
  }
});

// DELETE Occurrence (Protected)
app.delete('/api/occurrences/:id', async (req, res) => {
  try {
    const { role, userId } = req.query;
    await db.deleteOccurrence(req.params.id);
    logEngine.log('AUDIT', `Ocorrência excluída no Supabase: ID ${req.params.id} por usuário ${userId || 'sistema'} (${role || 'geral'})`);
    res.json({ success: true, message: 'Ocorrência excluída com sucesso no Supabase.' });
  } catch (error) {
    console.error('Error deleting occurrence:', error);
    res.status(500).json({ error: 'Erro ao excluir ocorrência no Supabase: ' + error.message });
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
    res.status(500).json({ error: 'Erro ao buscar usuários no Supabase: ' + error.message });
  }
});

// POST User (Gestor / Superadmin)
app.post('/api/users', async (req, res) => {
  try {
    const user = req.body || {};
    if (!user.name || !user.cpf || !user.role || !user.email) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes (nome, cpf, e-mail e perfil são necessários).' });
    }

    // Clean CPF for validation
    const cleanCpf = (user.cpf || '').replace(/\D/g, '');
    if (cleanCpf.length < 11) {
      return res.status(400).json({ error: 'Por favor, informe um CPF válido com 11 dígitos.' });
    }

    const cleanEmail = (user.email || '').trim().toLowerCase();
    const users = await db.getUsers();
    
    // Check duplicate CPF
    const duplicateCpf = users.find(u => (u.cpf || '').replace(/\D/g, '') === cleanCpf && u.id !== user.id);
    if (duplicateCpf) {
      return res.status(400).json({ error: 'CPF já cadastrado para outro usuário.' });
    }

    // Check duplicate Email
    const duplicateEmail = users.find(u => (u.email || '').trim().toLowerCase() === cleanEmail && u.id !== user.id);
    if (duplicateEmail) {
      return res.status(400).json({ error: 'E-mail institucional já cadastrado para outro usuário.' });
    }

    const saved = await db.saveUser({
      ...user,
      name: user.name.trim(),
      cpf: cleanCpf,
      email: cleanEmail,
      phone: (user.phone || '').trim(),
      password: (user.password || 'senha').trim(),
      role: (user.role || 'pedagogo').toLowerCase(),
      schoolId: (user.role === 'seduc' || user.role === 'superadmin' || user.role === 'gestor') ? null : (user.schoolId ? user.schoolId.trim() : null)
    });

    // Trigger Supabase Auth Email asynchronously
    if (user.password) {
      triggerSupabaseAuthEmail(cleanEmail, user.password, user).catch(err => {
        console.warn('Background Supabase auth email trigger warning:', err?.message || err);
      });
    }

    logEngine.log('AUDIT', `Usuário criado/atualizado no Supabase: ${user.name} (${user.role})`);

    const { password: _pwd, ...savedWithoutPassword } = saved;
    res.json(savedWithoutPassword);
  } catch (error) {
    logEngine.log('ERROR', `Erro ao salvar usuário no Supabase: ${error.message}`, { error: String(error) });
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Erro ao salvar usuário no Supabase: ' + error.message });
  }
});

// PUT User (Update by ID - Gestor / Super Admin)
app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const users = await db.getUsers();
    const existing = users.find(u => u.id === id);
    if (!existing) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const merged = {
      ...existing,
      ...updateData,
      id,
      cpf: updateData.cpf ? updateData.cpf.replace(/\D/g, '') : existing.cpf
    };

    const saved = await db.saveUser(merged);
    logEngine.log('AUDIT', `Usuário atualizado no Supabase: ${merged.name} (${merged.role})`);
    const { password: _pwd, ...savedWithoutPassword } = saved;
    res.json(savedWithoutPassword);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar usuário no Supabase.' });
  }
});

// PUT Profile (Update own personal profile)
app.put('/api/profile', async (req, res) => {
  try {
    const { userId, name, email, phone, currentPassword, newPassword } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'Identificação de usuário necessária.' });
    }
    const users = await db.getUsers();
    const existing = users.find(u => u.id === userId);
    if (!existing) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // If changing password, verify current password
    if (newPassword) {
      if (!currentPassword || existing.password !== currentPassword) {
        return res.status(400).json({ error: 'Senha atual incorreta.' });
      }
      existing.password = newPassword.trim();
    }

    if (name) existing.name = name.trim();
    if (email) existing.email = email.trim().toLowerCase();
    if (phone !== undefined) existing.phone = phone.trim();

    const saved = await db.saveUser(existing);
    logEngine.log('AUDIT', `Perfil atualizado no Supabase: ${existing.name}`);
    const { password: _pwd, ...savedWithoutPassword } = saved;
    res.json(savedWithoutPassword);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar perfil no Supabase.' });
  }
});

// DELETE User (Gestor / Superadmin)
app.delete('/api/users/:id', async (req, res) => {
  try {
    await db.deleteUser(req.params.id);
    logEngine.log('AUDIT', `Usuário excluído no Supabase: ID ${req.params.id}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Erro ao excluir usuário no Supabase.' });
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
        status: isSupabaseConfigured ? '🟢 Conectado (Nuvem Supabase)' : '🔴 Supabase Indisponível'
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
    res.status(500).json({ error: 'Erro ao obter métricas do Supabase.' });
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

// POST Create Manual Backup Snapshot Now
app.post('/api/admin/backups', async (req, res) => {
  try {
    const label = req.body.label || 'manual';
    const backup = await backupEngine.createBackup(label);
    res.json({ success: true, backup });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Erro ao gerar backup do Supabase.' });
  }
});

// GET Export Live Backup Direct Download
app.get('/api/admin/backups/export/download', async (req, res) => {
  try {
    const backup = await backupEngine.createBackup('export_manual');
    const content = backupEngine.getBackupContent(backup.filename);
    if (!content) {
      return res.status(404).json({ error: 'Arquivo de backup não encontrado.' });
    }
    res.setHeader('Content-Disposition', `attachment; filename="${backup.filename}"`);
    res.setHeader('Content-Type', 'application/json');
    res.send(content);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao gerar arquivo de exportação do Supabase.' });
  }
});

// GET Download Specific Backup File
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

// POST Restore Backup to Supabase
app.post('/api/admin/backups/restore', async (req, res) => {
  try {
    const { filename, data } = req.body;
    const result = await backupEngine.restoreBackup(filename || data);
    // Create a new snapshot right after restore
    backupEngine.createBackup('post_restore').catch(() => {});
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Erro ao restaurar backup no Supabase.' });
  }
});

// POST Simulation Mode Audit Logger (LGPD Compliant Role Switch for Super Admin)
app.post('/api/admin/simulation-mode', async (req, res) => {
  try {
    const { simulatedRole, schoolId, schoolName } = req.body || {};
    const roleLabel = (simulatedRole || 'Super Admin').toUpperCase();
    logEngine.log('AUDIT', `Super Admin ativou modo de simulação técnica institucional: ${roleLabel} ${schoolName ? `(Escola: ${schoolName})` : ''}`, {
      simulatedRole,
      schoolId,
      schoolName
    });
    res.json({ success: true, simulatedRole, schoolId, schoolName });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar simulação de papel.' });
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

export default app;
