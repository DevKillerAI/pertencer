import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from the React frontend build
app.use(express.static(path.join(__dirname, '../dist')));

// API Login
app.post('/api/login', async (req, res) => {
  try {
    const { cpf, password } = req.body;
    if (!cpf || !password) {
      return res.status(400).json({ error: 'CPF e senha são obrigatórios.' });
    }

    // Clean CPF characters to compare
    const cleanCpf = cpf.replace(/\D/g, '');
    const users = await db.getUsers();
    
    const user = users.find(u => u.cpf.replace(/\D/g, '') === cleanCpf && u.password === password);
    
    if (!user) {
      return res.status(401).json({ error: 'CPF ou senha incorretos.' });
    }

    // Find school name if user has a schoolId
    let schoolName = null;
    if (user.schoolId) {
      const schools = await db.getSchools();
      const school = schools.find(s => s.id === user.schoolId);
      if (school) schoolName = school.name;
    }

    // Exclude password in response
    const { password: _, ...userWithoutPassword } = user;
    res.json({ ...userWithoutPassword, schoolName });
  } catch (error) {
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

// POST School (Gestor only)
app.post('/api/schools', async (req, res) => {
  try {
    const { id, name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Nome da escola é obrigatório.' });
    }
    const saved = await db.saveSchool({ id, name });
    res.json(saved);
  } catch (error) {
    console.error('Error saving school:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// API Register (Public user request with LGPD compliance)
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

    const newUser = {
      name,
      cpf: cleanCpf,
      email,
      phone: phone || '',
      password: req.body.password || 'senha123',
      role: role.toLowerCase(), // seduc, pedagogo, diretor, assistente
      schoolId: role.toLowerCase() === 'seduc' ? null : (schoolId || null),
      classes: [],
      lgpd_accepted: true,
      createdAt: new Date().toISOString()
    };

    const saved = await db.saveUser(newUser);
    const { password: _pwd, ...savedWithoutPassword } = saved;
    res.status(201).json(savedWithoutPassword);
  } catch (error) {
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
    } else if (role === 'gestor' || role === 'seduc') {
      // Gestor / Seduc sees everything
    }

    res.json(occurrences);
  } catch (error) {
    console.error('Error fetching occurrences:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// POST Occurrence (Create/Update)
app.post('/api/occurrences', async (req, res) => {
  try {
    const occurrence = req.body;
    const hasStudentName = occurrence.studentName || (Array.isArray(occurrence.students) && occurrence.students.length > 0 && occurrence.students[0].studentName);
    
    if (!hasStudentName || !occurrence.schoolId) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes (Estudante e Escola são necessários).' });
    }

    // Set first student name as studentName if missing for backward compatibility
    if (!occurrence.studentName && Array.isArray(occurrence.students) && occurrence.students.length > 0) {
      occurrence.studentName = occurrence.students[0].studentName;
      occurrence.gradeCycle = occurrence.students[0].gradeCycle;
      occurrence.className = occurrence.students[0].className;
      occurrence.teacherName = occurrence.students[0].teacherName;
      occurrence.subject_matter = occurrence.students[0].subject_matter;
      if (occurrence.students[0].guardian) {
        occurrence.guardianName = occurrence.students[0].guardian.name;
        occurrence.contacts = occurrence.students[0].guardian.contact;
      }
    }

    // Ensure type field is populated from classifications
    if (!occurrence.type && Array.isArray(occurrence.classifications) && occurrence.classifications.length > 0) {
      occurrence.type = occurrence.classifications[0];
    } else if (!occurrence.type) {
      occurrence.type = 'Atendimento';
    }

    const saved = await db.saveOccurrence(occurrence);
    res.json(saved);
  } catch (error) {
    console.error('Error saving occurrence:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// GET Users (Gestor only)
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

// POST User (Gestor only)
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
    const { password: _pwd, ...savedWithoutPassword } = saved;
    res.json(savedWithoutPassword);
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// DELETE User (Gestor only)
app.delete('/api/users/:id', async (req, res) => {
  try {
    await db.deleteUser(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// DELETE School (Gestor only)
app.delete('/api/schools/:id', async (req, res) => {
  try {
    await db.deleteSchool(req.params.id);
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
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting occurrence:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
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
});
