import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

// Initialize database with seed data if it doesn't exist
const initialData = {
  schools: [
    { id: 'esc-1', name: 'Escola Municipal Professor Wancleber Pacheco' },
    { id: 'esc-2', name: 'Escola Municipal Anita Garibaldi' },
    { id: 'esc-3', name: 'Escola Municipal Castro Alves' },
    { id: 'esc-4', name: 'Escola Municipal Monteiro Lobato' },
    { id: 'esc-5', name: 'Escola Municipal Cecília Meireles' },
    { id: 'esc-6', name: 'Escola Municipal Duque de Caxias' },
    { id: 'esc-7', name: 'Escola Municipal Ruy Barbosa' },
    { id: 'esc-8', name: 'Escola Municipal Getúlio Vargas' },
    { id: 'esc-9', name: 'Escola Municipal Machado de Assis' }
  ],
  users: [
    {
      id: 'usr-1',
      name: 'Elisabette Leo',
      cpf: '00000000000',
      password: 'admin',
      role: 'gestor',
      schoolId: null,
      classes: []
    },
    {
      id: 'usr-2',
      name: 'Diretor Wancleber',
      cpf: '11111111111',
      password: 'senha',
      role: 'diretor',
      schoolId: 'esc-1',
      classes: []
    },
    {
      id: 'usr-3',
      name: 'Pedagoga Maria Silva',
      cpf: '22222222222',
      password: 'senha',
      role: 'pedagogo',
      schoolId: 'esc-1',
      classes: ['5º Ano A', '5º Ano B', '4º Ano A']
    },
    {
      id: 'usr-4',
      name: 'Pedagoga Ana Costa',
      cpf: '33333333333',
      password: 'senha',
      role: 'pedagogo',
      schoolId: 'esc-2',
      classes: ['3º Ano A', '3º Ano B']
    }
  ],
  occurrences: [
    {
      id: 'occ-1',
      schoolId: 'esc-1',
      createdById: 'usr-3',
      createdByName: 'Pedagoga Maria Silva',
      date: '2026-07-13',
      studentName: 'Gabriel Souza Lima',
      gradeCycle: '5º Ano',
      className: '5º Ano A',
      teacherName: 'Profª Cláudia Mendes',
      guardianName: 'Regina Souza Lima',
      contacts: '(41) 98888-7777',
      type: 'Bullying',
      subject: 'O estudante relatou sofrer apelidos depreciativos recorrentes por parte de colegas da mesma turma durante o recreio.',
      referrals: 'Conversa individual com os alunos envolvidos. Ligação para os responsáveis e agendamento de atendimento presencial conjunto.',
      observations: 'O aluno demonstrou-se bastante abalado. A professora de sala foi orientada a monitorar mais de perto as interações na sala.',
      directorNotes: 'Acompanhei o caso e os responsáveis compareceram no dia 14/07. Comprometeram-se a acompanhar a rotina escolar.'
    }
  ]
};

function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      writeDb(initialData);
      return initialData;
    }
    const content = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading DB:', error);
    return initialData;
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing DB:', error);
    return false;
  }
}

export const db = {
  getData: () => readDb(),
  
  // Schools
  getSchools: () => readDb().schools,
  saveSchool: (school) => {
    const data = readDb();
    if (school.id) {
      data.schools = data.schools.map(s => s.id === school.id ? { ...s, ...school } : s);
    } else {
      school.id = 'esc-' + Date.now();
      data.schools.push(school);
    }
    writeDb(data);
    return school;
  },
  deleteSchool: (id) => {
    const data = readDb();
    data.schools = data.schools.filter(s => s.id !== id);
    writeDb(data);
  },
  
  // Users
  getUsers: () => readDb().users,
  saveUser: (user) => {
    const data = readDb();
    if (user.id) {
      data.users = data.users.map(u => u.id === user.id ? { ...u, ...user } : u);
    } else {
      user.id = 'usr-' + Date.now();
      data.users.push(user);
    }
    writeDb(data);
    return user;
  },
  deleteUser: (id) => {
    const data = readDb();
    data.users = data.users.filter(u => u.id !== id);
    writeDb(data);
  },
  
  // Occurrences
  getOccurrences: () => readDb().occurrences,
  saveOccurrence: (occurrence) => {
    const data = readDb();
    if (occurrence.id) {
      data.occurrences = data.occurrences.map(o => o.id === occurrence.id ? { ...o, ...occurrence } : o);
    } else {
      occurrence.id = 'occ-' + Date.now();
      data.occurrences.push(occurrence);
    }
    writeDb(data);
    return occurrence;
  }
};
