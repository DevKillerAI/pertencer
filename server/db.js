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
    hasStudents: false,
    hasClassifications: false,
    hasFeelings: false,
    hasFeelingsObservations: false,
    hasDirectionReferrals: false,
    hasStatus: false,
    hasUpdatedAt: false,
    hasUpdatedById: false,
    hasUpdatedByName: false
  },
  users: {
    hasEmail: false,
    hasPhone: false,
    hasLgpdAccepted: false
  }
};

async function detectSchema() {
  if (!isSupabaseConfigured) return;
  try {
    const { error: errSubjectMatter } = await supabase.from('occurrences').select('subject_matter').limit(1);
    schemaCache.occurrences.hasSubjectMatter = !errSubjectMatter;

    const { error: errAttendedPeople } = await supabase.from('occurrences').select('attended_people').limit(1);
    schemaCache.occurrences.hasAttendedPeople = !errAttendedPeople;

    const { error: errStudents } = await supabase.from('occurrences').select('students').limit(1);
    schemaCache.occurrences.hasStudents = !errStudents;

    const { error: errClassifications } = await supabase.from('occurrences').select('classifications').limit(1);
    schemaCache.occurrences.hasClassifications = !errClassifications;

    const { error: errFeelings } = await supabase.from('occurrences').select('feelings').limit(1);
    schemaCache.occurrences.hasFeelings = !errFeelings;

    const { error: errFeelingsObservations } = await supabase.from('occurrences').select('feelings_observations').limit(1);
    schemaCache.occurrences.hasFeelingsObservations = !errFeelingsObservations;

    const { error: errDirectionReferrals } = await supabase.from('occurrences').select('direction_referrals').limit(1);
    schemaCache.occurrences.hasDirectionReferrals = !errDirectionReferrals;

    const { error: errStatus } = await supabase.from('occurrences').select('status').limit(1);
    schemaCache.occurrences.hasStatus = !errStatus;

    const { error: errUpdatedAt } = await supabase.from('occurrences').select('updatedAt').limit(1);
    schemaCache.occurrences.hasUpdatedAt = !errUpdatedAt;

    const { error: errUpdatedById } = await supabase.from('occurrences').select('updatedById').limit(1);
    schemaCache.occurrences.hasUpdatedById = !errUpdatedById;

    const { error: errUpdatedByName } = await supabase.from('occurrences').select('updatedByName').limit(1);
    schemaCache.occurrences.hasUpdatedByName = !errUpdatedByName;

    const { error: errEmail } = await supabase.from('users').select('email').limit(1);
    schemaCache.users.hasEmail = !errEmail;

    const { error: errPhone } = await supabase.from('users').select('phone').limit(1);
    schemaCache.users.hasPhone = !errPhone;

    const { error: errLgpd } = await supabase.from('users').select('lgpd_accepted').limit(1);
    schemaCache.users.hasLgpdAccepted = !errLgpd;

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

function findClosingBracket(str, startIdx) {
  let depth = 0;
  for (let i = startIdx; i < str.length; i++) {
    if (str[i] === '[') {
      depth++;
    } else if (str[i] === ']') {
      depth--;
      if (depth === 0) {
        return i;
      }
    }
  }
  return -1;
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
      try {
        const { data, error } = await supabase
          .from('schools')
          .select('*')
          .order('name', { ascending: true });
        if (error) throw error;
        return data || [];
      } catch (err) {
        console.warn('Supabase getSchools failed, using local fallback:', err.message || err);
      }
    }
    return readDb().schools;
  },
  
  saveSchool: async (school) => {
    if (isSupabaseConfigured) {
      try {
        if (!school.id) {
          school.id = 'esc-' + Date.now();
        }
        const { data, error } = await supabase
          .from('schools')
          .upsert(school)
          .select();
        if (error) throw error;
        return data[0];
      } catch (err) {
        console.warn('Supabase saveSchool failed, using local fallback:', err.message || err);
      }
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
      try {
        const { error } = await supabase
          .from('schools')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return;
      } catch (err) {
        console.warn('Supabase deleteSchool failed, using local fallback:', err.message || err);
      }
    }
    
    // Local Fallback
    const data = readDb();
    data.schools = data.schools.filter(s => s.id !== id);
    writeDb(data);
  },
  
  // Users
  getUsers: async () => {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .order('name', { ascending: true });
        if (error) throw error;
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
      } catch (err) {
        console.warn('Supabase getUsers failed, using local fallback:', err.message || err);
      }
    }
    return readDb().users;
  },
  
  saveUser: async (user) => {
    if (isSupabaseConfigured) {
      try {
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

        const { error } = await supabase
          .from('users')
          .upsert(payload)
          .select();
        if (error) throw error;
        return user;
      } catch (err) {
        console.warn('Supabase saveUser failed, using local fallback:', err.message || err);
      }
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
      try {
        const { error } = await supabase
          .from('users')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return;
      } catch (err) {
        console.warn('Supabase deleteUser failed, using local fallback:', err.message || err);
      }
    }
    
    // Local Fallback
    const data = readDb();
    data.users = data.users.filter(u => u.id !== id);
    writeDb(data);
  },

  // Occurrences
  getOccurrences: async () => {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('occurrences')
          .select('*')
          .order('date', { ascending: false });
        if (error) throw error;
        
        const list = data || [];
        return list.map(o => {
          let decoded = { ...o };
          
          // Extract metadata from observations if present
          if (decoded.observations && decoded.observations.includes('[POME_META:')) {
            let obs = decoded.observations;
            let startIdx;
            while ((startIdx = obs.indexOf('[POME_META:')) !== -1) {
              const endIdx = findClosingBracket(obs, startIdx);
              if (endIdx !== -1) {
                const jsonStr = obs.slice(startIdx + 11, endIdx);
                try {
                  const meta = JSON.parse(jsonStr);
                  if (!schemaCache.occurrences.hasSubjectMatter && meta.subject_matter !== undefined) decoded.subject_matter = meta.subject_matter;
                  if (!schemaCache.occurrences.hasAttendedPeople && meta.attended_people !== undefined) decoded.attended_people = meta.attended_people;
                  if (!schemaCache.occurrences.hasStudents && meta.students !== undefined) decoded.students = meta.students;
                  if (!schemaCache.occurrences.hasClassifications && meta.classifications !== undefined) decoded.classifications = meta.classifications;
                  if (!schemaCache.occurrences.hasFeelings && meta.feelings !== undefined) decoded.feelings = meta.feelings;
                  if (!schemaCache.occurrences.hasFeelingsObservations && meta.feelings_observations !== undefined) decoded.feelings_observations = meta.feelings_observations;
                  if (!schemaCache.occurrences.hasDirectionReferrals && meta.direction_referrals !== undefined) decoded.direction_referrals = meta.direction_referrals;
                  if (!schemaCache.occurrences.hasStatus && meta.status !== undefined) decoded.status = meta.status;
                  if (!schemaCache.occurrences.hasUpdatedAt && meta.updatedAt !== undefined) decoded.updatedAt = meta.updatedAt;
                  if (!schemaCache.occurrences.hasUpdatedById && meta.updatedById !== undefined) decoded.updatedById = meta.updatedById;
                  if (!schemaCache.occurrences.hasUpdatedByName && meta.updatedByName !== undefined) decoded.updatedByName = meta.updatedByName;
                } catch (e) {
                  console.error("Failed to parse serialized occurrence metadata:", e);
                }
                // Remove the metadata tag from obs
                obs = (obs.slice(0, startIdx) + obs.slice(endIdx + 1)).trim();
              } else {
                break;
              }
            }
            decoded.observations = obs;
          }
          
          // Default values if missing
          if (!decoded.attended_people) decoded.attended_people = [];
          if (!decoded.students) {
            decoded.students = [{
              studentName: decoded.studentName || '',
              sex: decoded.sex || '',
              turn: decoded.turn || '',
              gradeCycle: decoded.gradeCycle || '',
              className: decoded.className || '',
              teacherName: decoded.teacherName || '',
              subject_matter: decoded.subject_matter || '',
              guardian: {
                name: decoded.guardianName || (decoded.attended_people[0]?.name || ''),
                bond: decoded.attended_people[0]?.bond || 'Responsável',
                contact: decoded.contacts || (decoded.attended_people[0]?.contact || '')
              }
            }];
          }
          if (!decoded.classifications) decoded.classifications = decoded.type ? [decoded.type] : [];
          if (!decoded.feelings) decoded.feelings = [];
          if (!decoded.feelings_observations) decoded.feelings_observations = '';
          if (!decoded.direction_referrals) decoded.direction_referrals = [];
          if (!decoded.status) decoded.status = 'finalizado';
          if (!decoded.subject_matter) decoded.subject_matter = '';
          if (!decoded.updatedAt) decoded.updatedAt = '';
          if (!decoded.updatedById) decoded.updatedById = '';
          if (!decoded.updatedByName) decoded.updatedByName = '';
          
          return decoded;
        });
      } catch (err) {
        console.warn('Supabase getOccurrences failed, using local fallback:', err.message || err);
      }
    }
    const localOccurrences = readDb().occurrences || [];
    return localOccurrences.map(o => {
      let decoded = { ...o };
      if (!decoded.students) {
        decoded.students = [{
          studentName: decoded.studentName || '',
          sex: decoded.sex || '',
          turn: decoded.turn || '',
          gradeCycle: decoded.gradeCycle || '',
          className: decoded.className || '',
          teacherName: decoded.teacherName || '',
          subject_matter: decoded.subject_matter || '',
          guardian: {
            name: decoded.guardianName || (decoded.attended_people?.[0]?.name || ''),
            bond: decoded.attended_people?.[0]?.bond || 'Responsável',
            contact: decoded.contacts || (decoded.attended_people?.[0]?.contact || '')
          }
        }];
      }
      if (!decoded.feelings) decoded.feelings = [];
      if (!decoded.feelings_observations) decoded.feelings_observations = '';
      if (!decoded.direction_referrals) decoded.direction_referrals = [];
      return decoded;
    });
  },
  
  saveOccurrence: async (occurrence) => {
    if (isSupabaseConfigured) {
      try {
        if (!occurrence.id) {
          occurrence.id = 'occ-' + Date.now();
        }
        
        const payload = { ...occurrence };
        
        // If schema is missing columns, serialize them into observations
        if (!schemaCache.occurrences.hasSubjectMatter || 
            !schemaCache.occurrences.hasAttendedPeople || 
            !schemaCache.occurrences.hasStudents ||
            !schemaCache.occurrences.hasClassifications || 
            !schemaCache.occurrences.hasFeelings ||
            !schemaCache.occurrences.hasFeelingsObservations ||
            !schemaCache.occurrences.hasDirectionReferrals ||
            !schemaCache.occurrences.hasStatus ||
            !schemaCache.occurrences.hasUpdatedAt ||
            !schemaCache.occurrences.hasUpdatedById ||
            !schemaCache.occurrences.hasUpdatedByName) {
          
          const meta = {
            subject_matter: occurrence.subject_matter || '',
            attended_people: occurrence.attended_people || [],
            students: occurrence.students || [],
            classifications: occurrence.classifications || [],
            feelings: occurrence.feelings || [],
            feelings_observations: occurrence.feelings_observations || '',
            direction_referrals: occurrence.direction_referrals || [],
            status: occurrence.status || 'finalizado',
            updatedAt: occurrence.updatedAt || '',
            updatedById: occurrence.updatedById || '',
            updatedByName: occurrence.updatedByName || ''
          };
          
          // Remove the columns that don't exist from the payload to avoid PostgREST insert errors
          if (!schemaCache.occurrences.hasSubjectMatter) delete payload.subject_matter;
          if (!schemaCache.occurrences.hasAttendedPeople) delete payload.attended_people;
          if (!schemaCache.occurrences.hasStudents) delete payload.students;
          if (!schemaCache.occurrences.hasClassifications) delete payload.classifications;
          if (!schemaCache.occurrences.hasFeelings) delete payload.feelings;
          if (!schemaCache.occurrences.hasFeelingsObservations) delete payload.feelings_observations;
          if (!schemaCache.occurrences.hasDirectionReferrals) delete payload.direction_referrals;
          if (!schemaCache.occurrences.hasStatus) delete payload.status;
          if (!schemaCache.occurrences.hasUpdatedAt) delete payload.updatedAt;
          if (!schemaCache.occurrences.hasUpdatedById) delete payload.updatedById;
          if (!schemaCache.occurrences.hasUpdatedByName) delete payload.updatedByName;
          
          // Append metadata to observations
          const metaTag = `[POME_META:${JSON.stringify(meta)}]`;
          payload.observations = `${occurrence.observations || ''}\n\n${metaTag}`.trim();
        }

        const { error } = await supabase
          .from('occurrences')
          .upsert(payload)
          .select();
        if (error) throw error;
        return occurrence;
      } catch (err) {
        console.warn('Supabase saveOccurrence failed, using local fallback:', err.message || err);
      }
    }
    
    // Local Fallback
    const data = readDb();
    if (occurrence.id) {
      const exists = data.occurrences.some(o => o.id === occurrence.id);
      if (exists) {
        data.occurrences = data.occurrences.map(o => o.id === occurrence.id ? { ...o, ...occurrence } : o);
      } else {
        data.occurrences.push(occurrence);
      }
    } else {
      occurrence.id = 'occ-' + Date.now();
      data.occurrences.push(occurrence);
    }
    writeDb(data);
    return occurrence;
  },
  
  deleteOccurrence: async (id) => {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from('occurrences')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return;
      } catch (err) {
        console.warn('Supabase deleteOccurrence failed, using local fallback:', err.message || err);
      }
    }
    
    // Local Fallback
    const data = readDb();
    data.occurrences = data.occurrences.filter(o => o.id !== id);
    writeDb(data);
  }
};
