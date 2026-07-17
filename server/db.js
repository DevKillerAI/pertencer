import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);
const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseKey) : null;

// Dynamic schema detection for Supabase mode fallback
export const schemaCache = {
  occurrences: {
    hasSubjectMatter: false,
    hasAttendedPeople: false,
    hasClassifications: false,
    hasStatus: false
  },
  users: {
    hasEmail: false
  }
};

async function detectSchema() {
  if (!isSupabaseConfigured) return;
  try {
    const { error: errSubjectMatter } = await supabase.from('occurrences').select('subject_matter').limit(1);
    schemaCache.occurrences.hasSubjectMatter = !errSubjectMatter;

    const { error: errAttendedPeople } = await supabase.from('occurrences').select('attended_people').limit(1);
    schemaCache.occurrences.hasAttendedPeople = !errAttendedPeople;

    const { error: errClassifications } = await supabase.from('occurrences').select('classifications').limit(1);
    schemaCache.occurrences.hasClassifications = !errClassifications;

    const { error: errStatus } = await supabase.from('occurrences').select('status').limit(1);
    schemaCache.occurrences.hasStatus = !errStatus;

    const { error: errEmail } = await supabase.from('users').select('email').limit(1);
    schemaCache.users.hasEmail = !errEmail;

    console.log('Database: Schema detection completed:', JSON.stringify(schemaCache));
  } catch (error) {
    console.error('Database: Schema detection failed, using fallbacks:', error);
  }
}

if (isSupabaseConfigured) {
  console.log('Database: Connected using Supabase.');
  detectSchema();
} else {
  console.log('Database: Supabase keys not set. Falling back to local db.json file.');
}

// Initialize database with seed data if it doesn't exist (Local Fallback only)
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
      email: 'gestor@pome.com',
      password: 'admin',
      role: 'gestor',
      schoolId: null,
      classes: []
    },
    {
      id: 'usr-2',
      name: 'Diretor Wancleber',
      cpf: '11111111111',
      email: 'diretor@pome.com',
      password: 'senha',
      role: 'diretor',
      schoolId: 'esc-1',
      classes: []
    },
    {
      id: 'usr-3',
      name: 'Pedagoga Maria Silva',
      cpf: '22222222222',
      email: 'pedagoga1@pome.com',
      password: 'senha',
      role: 'pedagogo',
      schoolId: 'esc-1',
      classes: ['5º Ano A', '5º Ano B', '4º Ano A']
    },
    {
      id: 'usr-4',
      name: 'Pedagoga Ana Costa',
      cpf: '33333333333',
      email: 'pedagoga2@pome.com',
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
      subject_matter: 'Língua Portuguesa',
      attended_people: [
        { name: 'Regina Souza Lima', bond: 'Mãe', contact: '(41) 98888-7777' }
      ],
      classifications: ['Bullying'],
      type: 'Bullying',
      status: 'finalizado',
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
  getData: async () => {
    if (isSupabaseConfigured) {
      const schools = await db.getSchools();
      const users = await db.getUsers();
      const occurrences = await db.getOccurrences();
      return { schools, users, occurrences };
    }
    return readDb();
  },
  
  // Schools
  getSchools: async () => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('schools')
        .select('*')
        .order('name', { ascending: true });
      if (error) {
        console.error('Supabase Error (getSchools):', error);
        throw error;
      }
      return data || [];
    }
    return readDb().schools;
  },
  
  saveSchool: async (school) => {
    if (isSupabaseConfigured) {
      if (!school.id) {
        school.id = 'esc-' + Date.now();
      }
      const { data, error } = await supabase
        .from('schools')
        .upsert(school)
        .select();
      if (error) {
        console.error('Supabase Error (saveSchool):', error);
        throw error;
      }
      return data[0];
    }
    
    // Local Fallback
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
  
  deleteSchool: async (id) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('schools')
        .delete()
        .eq('id', id);
      if (error) {
        console.error('Supabase Error (deleteSchool):', error);
        throw error;
      }
      return;
    }
    
    // Local Fallback
    const data = readDb();
    data.schools = data.schools.filter(s => s.id !== id);
    writeDb(data);
  },
  
  // Users
  getUsers: async () => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('name', { ascending: true });
      if (error) {
        console.error('Supabase Error (getUsers):', error);
        throw error;
      }
      const list = data || [];
      return list.map(u => {
        let decoded = { ...u };
        // Extract email from classes if present and email column is missing
        if (!schemaCache.users.hasEmail && Array.isArray(decoded.classes)) {
          const emailItem = decoded.classes.find(c => c && c.startsWith('__email:'));
          if (emailItem) {
            decoded.email = emailItem.slice(8);
            decoded.classes = decoded.classes.filter(c => c !== emailItem);
          } else {
            decoded.email = '';
          }
        }
        return decoded;
      });
    }
    return readDb().users;
  },
  
  saveUser: async (user) => {
    if (isSupabaseConfigured) {
      if (!user.id) {
        user.id = 'usr-' + Date.now();
      }
      // Ensure classes is stored as JSON array in Supabase JSONB
      const payload = {
        ...user,
        classes: Array.isArray(user.classes) ? [...user.classes] : []
      };
      
      if (!schemaCache.users.hasEmail) {
        // Store email in classes array as a special item
        if (user.email) {
          payload.classes.push(`__email:${user.email}`);
        }
        // Remove email column from payload to avoid PostgREST error
        delete payload.email;
      }

      const { data, error } = await supabase
        .from('users')
        .upsert(payload)
        .select();
      if (error) {
        console.error('Supabase Error (saveUser):', error);
        throw error;
      }
      return user;
    }
    
    // Local Fallback
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
  
  deleteUser: async (id) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
      if (error) {
        console.error('Supabase Error (deleteUser):', error);
        throw error;
      }
      return;
    }
    
    // Local Fallback
    const data = readDb();
    data.users = data.users.filter(u => u.id !== id);
    writeDb(data);
  },
  
  // Occurrences
  getOccurrences: async () => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('occurrences')
        .select('*')
        .order('date', { ascending: false });
      if (error) {
        console.error('Supabase Error (getOccurrences):', error);
        throw error;
      }
      
      const list = data || [];
      return list.map(o => {
        let decoded = { ...o };
        
        // Extract metadata from observations if present
        if (decoded.observations && decoded.observations.includes('[POME_META:')) {
          try {
            const startIdx = decoded.observations.indexOf('[POME_META:');
            const endIdx = decoded.observations.indexOf(']', startIdx);
            if (endIdx !== -1) {
              const jsonStr = decoded.observations.slice(startIdx + 11, endIdx);
              const meta = JSON.parse(jsonStr);
              
              if (!schemaCache.occurrences.hasSubjectMatter) decoded.subject_matter = meta.subject_matter;
              if (!schemaCache.occurrences.hasAttendedPeople) decoded.attended_people = meta.attended_people;
              if (!schemaCache.occurrences.hasClassifications) decoded.classifications = meta.classifications;
              if (!schemaCache.occurrences.hasStatus) decoded.status = meta.status;
              
              // Clean up the metadata tag from observations so it doesn't show in UI
              decoded.observations = (decoded.observations.slice(0, startIdx) + decoded.observations.slice(endIdx + 1)).trim();
            }
          } catch (e) {
            console.error("Failed to parse serialized occurrence metadata:", e);
          }
        }
        
        // Default values if missing
        if (!decoded.attended_people) decoded.attended_people = [];
        if (!decoded.classifications) decoded.classifications = [];
        if (!decoded.status) decoded.status = 'finalizado';
        if (!decoded.subject_matter) decoded.subject_matter = '';
        
        return decoded;
      });
    }
    return readDb().occurrences;
  },
  
  saveOccurrence: async (occurrence) => {
    if (isSupabaseConfigured) {
      if (!occurrence.id) {
        occurrence.id = 'occ-' + Date.now();
      }
      
      const payload = { ...occurrence };
      
      // If schema is missing columns, serialize them into observations
      if (!schemaCache.occurrences.hasSubjectMatter || 
          !schemaCache.occurrences.hasAttendedPeople || 
          !schemaCache.occurrences.hasClassifications || 
          !schemaCache.occurrences.hasStatus) {
        
        const meta = {
          subject_matter: occurrence.subject_matter || '',
          attended_people: occurrence.attended_people || [],
          classifications: occurrence.classifications || [],
          status: occurrence.status || 'finalizado'
        };
        
        // Remove the columns that don't exist from the payload to avoid PostgREST insert errors
        if (!schemaCache.occurrences.hasSubjectMatter) delete payload.subject_matter;
        if (!schemaCache.occurrences.hasAttendedPeople) delete payload.attended_people;
        if (!schemaCache.occurrences.hasClassifications) delete payload.classifications;
        if (!schemaCache.occurrences.hasStatus) delete payload.status;
        
        // Append metadata to observations
        const metaTag = `[POME_META:${JSON.stringify(meta)}]`;
        payload.observations = `${occurrence.observations || ''}\n\n${metaTag}`.trim();
      }

      const { data, error } = await supabase
        .from('occurrences')
        .upsert(payload)
        .select();
      if (error) {
        console.error('Supabase Error (saveOccurrence):', error);
        throw error;
      }
      return occurrence;
    }
    
    // Local Fallback
    const data = readDb();
    if (occurrence.id) {
      data.occurrences = data.occurrences.map(o => o.id === occurrence.id ? { ...o, ...occurrence } : o);
    } else {
      occurrence.id = 'occ-' + Date.now();
      data.occurrences.push(occurrence);
    }
    writeDb(data);
    return occurrence;
  },
  
  deleteOccurrence: async (id) => {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('occurrences')
        .delete()
        .eq('id', id);
      if (error) {
        console.error('Supabase Error (deleteOccurrence):', error);
        throw error;
      }
      return;
    }
    
    // Local Fallback
    const data = readDb();
    data.occurrences = data.occurrences.filter(o => o.id !== id);
    writeDb(data);
  }
};
