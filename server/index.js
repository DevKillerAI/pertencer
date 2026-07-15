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

// GET Occurrences (Filtered by role and school)
app.get('/api/occurrences', async (req, res) => {
  try {
    const { schoolId, role, userId } = req.query;
    let occurrences = await db.getOccurrences();

    if (role === 'pedagogo') {
      // Pedagogues only see their own school's occurrences, and we can filter by their classes on the frontend or here
      occurrences = occurrences.filter(o => o.schoolId === schoolId);
    } else if (role === 'diretor') {
      // Directors see occurrences from their school
      occurrences = occurrences.filter(o => o.schoolId === schoolId);
    } else if (role === 'gestor') {
      // Gestor sees everything
      // No filter
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
    
    if (!occurrence.studentName || !occurrence.schoolId || !occurrence.type) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
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
    const usersWithoutPassword = users.map(({ password, ...u }) => u);
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
    if (!user.name || !user.cpf || !user.password || !user.role) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    }
    const saved = await db.saveUser(user);
    const { password, ...savedWithoutPassword } = saved;
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

// DELETE Occurrence
app.delete('/api/occurrences/:id', async (req, res) => {
  try {
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
