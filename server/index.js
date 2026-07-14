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
app.post('/api/login', (req, res) => {
  const { cpf, password } = req.body;
  if (!cpf || !password) {
    return res.status(400).json({ error: 'CPF e senha são obrigatórios.' });
  }

  // Clean CPF characters to compare
  const cleanCpf = cpf.replace(/\D/g, '');
  const users = db.getUsers();
  
  const user = users.find(u => u.cpf.replace(/\D/g, '') === cleanCpf && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'CPF ou senha incorretos.' });
  }

  // Find school name if user has a schoolId
  let schoolName = null;
  if (user.schoolId) {
    const school = db.getSchools().find(s => s.id === user.schoolId);
    if (school) schoolName = school.name;
  }

  // Exclude password in response
  const { password: _, ...userWithoutPassword } = user;
  res.json({ ...userWithoutPassword, schoolName });
});

// GET Schools
app.get('/api/schools', (req, res) => {
  res.json(db.getSchools());
});

// POST School (Gestor only)
app.post('/api/schools', (req, res) => {
  const { id, name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Nome da escola é obrigatório.' });
  }
  const saved = db.saveSchool({ id, name });
  res.json(saved);
});

// GET Occurrences (Filtered by role and school)
app.get('/api/occurrences', (req, res) => {
  const { schoolId, role, userId } = req.query;
  let occurrences = db.getOccurrences();

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
});

// POST Occurrence (Create/Update)
app.post('/api/occurrences', (req, res) => {
  const occurrence = req.body;
  
  if (!occurrence.studentName || !occurrence.schoolId || !occurrence.type) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  const saved = db.saveOccurrence(occurrence);
  res.json(saved);
});

// GET Users (Gestor only)
app.get('/api/users', (req, res) => {
  const users = db.getUsers().map(({ password, ...u }) => u);
  res.json(users);
});

// POST User (Gestor only)
app.post('/api/users', (req, res) => {
  const user = req.body;
  if (!user.name || !user.cpf || !user.password || !user.role) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }
  const saved = db.saveUser(user);
  const { password, ...savedWithoutPassword } = saved;
  res.json(savedWithoutPassword);
});

// DELETE User (Gestor only)
app.delete('/api/users/:id', (req, res) => {
  db.deleteUser(req.params.id);
  res.json({ success: true });
});

// DELETE School (Gestor only)
app.delete('/api/schools/:id', (req, res) => {
  db.deleteSchool(req.params.id);
  res.json({ success: true });
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
