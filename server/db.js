import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Detect serverless environment (Vercel, AWS Lambda, etc.)
const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NOW_REGION);
const BASE_DATA_DIR = isServerless ? os.tmpdir() : __dirname;

const DB_FILE = path.join(BASE_DATA_DIR, 'db.json');

// Supabase Configuration (Single Source of Truth)
const supabaseUrl = process.env.SUPABASE_URL || 'https://mowvehesrsawbxqhtytk.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'sb_publishable_9DG9WVh7oVbM9r2hXQMvkA_ERImrg3S';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);
export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
}) : null;

if (isSupabaseConfigured) {
  console.log('Database: Supabase configurado e ativo como FONTE ÚNICA DA VERDADE.');
} else {
  console.error('FATAL: Supabase não configurado. Verifique as credenciais no .env.');
}

// Paths for logging and automatic backups
const LOGS_DIR = path.join(BASE_DATA_DIR, 'logs');
const LOG_FILE = path.join(LOGS_DIR, 'pome_activity.log');
const BACKUP_DIR = path.join(BASE_DATA_DIR, 'backups');

try {
  if (!fs.existsSync(LOGS_DIR)) fs.mkdirSync(LOGS_DIR, { recursive: true });
} catch (_) {}

try {
  if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
} catch (_) {}

// In-Memory Backup Ring Buffer (Serverless Safe)
const memoryBackups = [];

// In-Memory Log Ring Buffer (last 300 logs)
const memoryLogs = [];

export const logEngine = {
  log: (level, message, meta = {}) => {
    const entry = {
      id: 'log-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString(),
      level: level.toUpperCase(), // 'INFO', 'WARN', 'ERROR', 'AUDIT'
      message,
      meta
    };
    memoryLogs.unshift(entry);
    if (memoryLogs.length > 300) memoryLogs.pop();
    
    try {
      fs.appendFileSync(LOG_FILE, JSON.stringify(entry) + '\n', 'utf8');
    } catch (e) {
      console.error('Failed to append log to file:', e);
    }
    return entry;
  },
  getLogs: (limit = 100, level = null) => {
    let result = memoryLogs;
    if (level && level !== 'ALL') {
      result = result.filter(l => l.level === level.toUpperCase());
    }
    return result.slice(0, limit);
  },
  clearLogs: () => {
    memoryLogs.length = 0;
  }
};

// =========================================================================
// ENCODING & DECODING HELPERS (METADATA PROTECTION & RESILIENCE)
// =========================================================================

export function decodeUser(u) {
  if (!u) return null;
  let decoded = { ...u };
  let cleanClasses = Array.isArray(decoded.classes) ? [...decoded.classes] : [];

  const emailItem = cleanClasses.find(c => typeof c === 'string' && c.startsWith('__email:'));
  if (emailItem) {
    decoded.email = emailItem.slice(8);
    cleanClasses = cleanClasses.filter(c => c !== emailItem);
  } else if (!decoded.email) {
    decoded.email = '';
  }

  const phoneItem = cleanClasses.find(c => typeof c === 'string' && c.startsWith('__phone:'));
  if (phoneItem) {
    decoded.phone = phoneItem.slice(8);
    cleanClasses = cleanClasses.filter(c => c !== phoneItem);
  } else if (!decoded.phone) {
    decoded.phone = '';
  }

  const lgpdItem = cleanClasses.find(c => typeof c === 'string' && c.startsWith('__lgpd:'));
  if (lgpdItem) {
    decoded.lgpd_accepted = true;
    cleanClasses = cleanClasses.filter(c => c !== lgpdItem);
  }

  const createdItem = cleanClasses.find(c => typeof c === 'string' && c.startsWith('__created:'));
  if (createdItem) {
    decoded.createdAt = createdItem.slice(10);
    cleanClasses = cleanClasses.filter(c => c !== createdItem);
  }

  decoded.classes = cleanClasses;
  return decoded;
}

export function encodeUser(user) {
  const userClasses = Array.isArray(user.classes)
    ? user.classes.filter(c => typeof c === 'string' && !c.startsWith('__'))
    : [];

  const classesPayload = [...userClasses];
  if (user.email) classesPayload.push(`__email:${user.email.trim()}`);
  if (user.phone) classesPayload.push(`__phone:${user.phone.trim()}`);
  if (user.lgpd_accepted) classesPayload.push('__lgpd:true');
  if (user.createdAt) classesPayload.push(`__created:${user.createdAt}`);

  return {
    id: user.id || ('usr-' + Date.now() + '-' + Math.floor(Math.random() * 1000)),
    name: (user.name || '').trim(),
    cpf: (user.cpf || '').replace(/\D/g, ''),
    password: user.password || 'senha',
    role: (user.role || 'pedagogo').toLowerCase(),
    schoolId: (user.role === 'seduc' || user.role === 'superadmin' || user.role === 'gestor') ? null : (user.schoolId || null),
    classes: classesPayload
  };
}

export function decodeOccurrence(raw) {
  if (!raw) return null;
  const decoded = { ...raw };
  let obs = decoded.observations || '';
  let meta = null;

  // Format 1: <!--POME_META_START-->...<!--POME_META_END-->
  const startTag = '<!--POME_META_START-->';
  const endTag = '<!--POME_META_END-->';
  const startIdx = obs.indexOf(startTag);
  const endIdx = obs.indexOf(endTag);
  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    const jsonStr = obs.slice(startIdx + startTag.length, endIdx).trim();
    try {
      meta = JSON.parse(jsonStr);
      obs = (obs.slice(0, startIdx) + obs.slice(endIdx + endTag.length)).trim();
    } catch (e) {
      console.error('Error parsing POME_META tag:', e);
    }
  }

  // Format 2: Fallback for legacy [POME_META:...]
  if (!meta && obs.includes('[POME_META:')) {
    const pStart = obs.indexOf('[POME_META:');
    const pEnd = obs.lastIndexOf(']');
    if (pStart !== -1 && pEnd > pStart) {
      const jsonStr = obs.slice(pStart + 11, pEnd).trim();
      try {
        meta = JSON.parse(jsonStr);
        obs = (obs.slice(0, pStart) + obs.slice(pEnd + 1)).trim();
      } catch (_) {}
    }
  }

  if (meta) {
    if (meta.subject_matter !== undefined) decoded.subject_matter = meta.subject_matter;
    if (meta.attended_people !== undefined) decoded.attended_people = meta.attended_people;
    if (meta.students !== undefined) decoded.students = meta.students;
    if (meta.classifications !== undefined) decoded.classifications = meta.classifications;
    if (meta.feelings !== undefined) decoded.feelings = meta.feelings;
    if (meta.feelings_observations !== undefined) decoded.feelings_observations = meta.feelings_observations;
    if (meta.direction_referrals !== undefined) decoded.direction_referrals = meta.direction_referrals;
    if (meta.status !== undefined) decoded.status = meta.status;
    if (meta.createdAt !== undefined) decoded.createdAt = meta.createdAt;
    if (meta.updatedAt !== undefined) decoded.updatedAt = meta.updatedAt;
    if (meta.updatedById !== undefined) decoded.updatedById = meta.updatedById;
    if (meta.updatedByName !== undefined) decoded.updatedByName = meta.updatedByName;
    if (meta.editHistory !== undefined) decoded.editHistory = meta.editHistory;
    if (meta.directorNotes !== undefined && (!decoded.directorNotes || !decoded.directorNotes.trim())) {
      decoded.directorNotes = meta.directorNotes;
    }
  }

  decoded.observations = obs;

  // Guarantee standard default structures
  if (!decoded.attended_people) decoded.attended_people = [];
  if (!decoded.students || !Array.isArray(decoded.students) || decoded.students.length === 0) {
    decoded.students = [{
      studentName: decoded.studentName || 'Estudante',
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
  if (!decoded.subject_matter) decoded.subject_matter = decoded.students[0]?.subject_matter || '';
  if (!decoded.createdAt) decoded.createdAt = decoded.date ? `${decoded.date}T12:00:00.000Z` : new Date().toISOString();
  if (!decoded.updatedAt) decoded.updatedAt = '';
  if (!decoded.updatedById) decoded.updatedById = '';
  if (!decoded.updatedByName) decoded.updatedByName = '';
  if (!decoded.editHistory) decoded.editHistory = [];
  if (!decoded.directorNotes) decoded.directorNotes = '';

  return decoded;
}

export function encodeOccurrence(occurrence) {
  const firstStudent = Array.isArray(occurrence.students) && occurrence.students.length > 0
    ? occurrence.students[0]
    : {};

  const cleanObs = (occurrence.observations || '')
    .replace(/<!--POME_META_START-->[\s\S]*?<!--POME_META_END-->/g, '')
    .replace(/\[POME_META:[\s\S]*?\]/g, '')
    .trim();

  const meta = {
    subject_matter: occurrence.subject_matter || firstStudent.subject_matter || '',
    attended_people: occurrence.attended_people || [],
    students: occurrence.students || [],
    classifications: occurrence.classifications || (occurrence.type ? [occurrence.type] : []),
    feelings: occurrence.feelings || [],
    feelings_observations: occurrence.feelings_observations || '',
    direction_referrals: occurrence.direction_referrals || [],
    status: occurrence.status || 'finalizado',
    directorNotes: occurrence.directorNotes || '',
    createdAt: occurrence.createdAt || (occurrence.date ? `${occurrence.date}T12:00:00.000Z` : new Date().toISOString()),
    updatedAt: occurrence.updatedAt || '',
    updatedById: occurrence.updatedById || '',
    updatedByName: occurrence.updatedByName || '',
    editHistory: occurrence.editHistory || []
  };

  const metaTag = `<!--POME_META_START-->\n${JSON.stringify(meta)}\n<!--POME_META_END-->`;
  const finalObservations = cleanObs ? `${cleanObs}\n\n${metaTag}` : metaTag;

  const payload = {
    id: occurrence.id,
    schoolId: occurrence.schoolId || 'esc-1',
    createdById: occurrence.createdById || 'usr-3',
    createdByName: occurrence.createdByName || 'Pedagogo(a)',
    date: occurrence.date || new Date().toISOString().split('T')[0],
    studentName: occurrence.studentName || firstStudent.studentName || 'Estudante',
    gradeCycle: occurrence.gradeCycle || firstStudent.gradeCycle || '',
    className: occurrence.className || firstStudent.className || '',
    teacherName: occurrence.teacherName || firstStudent.teacherName || '',
    guardianName: occurrence.guardianName || firstStudent.guardian?.name || '',
    contacts: occurrence.contacts || firstStudent.guardian?.contact || '',
    type: occurrence.type || (Array.isArray(occurrence.classifications) && occurrence.classifications[0]) || 'Atendimento Geral',
    subject: occurrence.subject || 'Atendimento POME',
    referrals: occurrence.referrals || '',
    observations: finalObservations,
    directorNotes: occurrence.directorNotes || ''
  };

  return payload;
}

// Timeout wrapper for robust Supabase calls
const withTimeout = (promise, ms = 12000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Supabase request timeout')), ms))
  ]);
};

// =========================================================================
// CORE DATABASE API (SUPABASE EXCLUSIVE AUTHORITY)
// =========================================================================

export const db = {
  // Full Database State (Used for Metrics and Complete Backups)
  getData: async () => {
    const schools = await db.getSchools();
    const users = await db.getUsers();
    const occurrences = await db.getOccurrences();
    return { schools, users, occurrences };
  },

  // Schools
  getSchools: async () => {
    if (!supabase) throw new Error('Supabase client not initialized');
    const { data, error } = await withTimeout(supabase
      .from('schools')
      .select('*')
      .order('name', { ascending: true }));
    if (error) {
      logEngine.log('ERROR', `Erro ao buscar escolas no Supabase: ${error.message}`);
      throw error;
    }
    return data || [];
  },

  saveSchool: async (school) => {
    if (!supabase) throw new Error('Supabase client not initialized');
    if (!school.id) {
      school.id = 'esc-' + Date.now();
    }
    const { data, error } = await withTimeout(supabase
      .from('schools')
      .upsert(school)
      .select());
    if (error) {
      logEngine.log('ERROR', `Erro ao salvar escola no Supabase: ${error.message}`);
      throw error;
    }
    return data[0];
  },

  deleteSchool: async (id) => {
    if (!supabase) throw new Error('Supabase client not initialized');
    const { error } = await withTimeout(supabase
      .from('schools')
      .delete()
      .eq('id', id));
    if (error) {
      logEngine.log('ERROR', `Erro ao excluir escola no Supabase: ${error.message}`);
      throw error;
    }
    return true;
  },

  // Users
  getUsers: async () => {
    if (!supabase) throw new Error('Supabase client not initialized');
    const { data, error } = await withTimeout(supabase
      .from('users')
      .select('*')
      .order('name', { ascending: true }));
    if (error) {
      logEngine.log('ERROR', `Erro ao buscar usuários no Supabase: ${error.message}`);
      throw error;
    }
    return (data || []).map(decodeUser);
  },

  saveUser: async (user) => {
    if (!supabase) throw new Error('Supabase client not initialized');
    const payload = encodeUser(user);
    const { error } = await withTimeout(supabase
      .from('users')
      .upsert(payload));
    if (error) {
      logEngine.log('ERROR', `Erro ao salvar usuário no Supabase: ${error.message}`);
      throw error;
    }
    return decodeUser(payload);
  },

  deleteUser: async (id) => {
    if (!supabase) throw new Error('Supabase client not initialized');
    const { error } = await withTimeout(supabase
      .from('users')
      .delete()
      .eq('id', id));
    if (error) {
      logEngine.log('ERROR', `Erro ao excluir usuário no Supabase: ${error.message}`);
      throw error;
    }
    return true;
  },

  // Occurrences
  getOccurrences: async () => {
    if (!supabase) throw new Error('Supabase client not initialized');
    const { data, error } = await withTimeout(supabase
      .from('occurrences')
      .select('*')
      .order('date', { ascending: false }));
    if (error) {
      logEngine.log('ERROR', `Erro ao buscar ocorrências no Supabase: ${error.message}`);
      throw error;
    }
    return (data || []).map(decodeOccurrence);
  },

  saveOccurrence: async (occurrence) => {
    if (!supabase) throw new Error('Supabase client not initialized');
    if (!occurrence.id) {
      occurrence.id = 'occ-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
    }
    const payload = encodeOccurrence(occurrence);
    const { error } = await withTimeout(supabase
      .from('occurrences')
      .upsert(payload)
      .select());
    if (error) {
      logEngine.log('ERROR', `Erro ao salvar ocorrência no Supabase: ${error.message}`);
      throw error;
    }
    return decodeOccurrence(payload);
  },

  deleteOccurrence: async (id) => {
    if (!supabase) throw new Error('Supabase client not initialized');
    const { error } = await withTimeout(supabase
      .from('occurrences')
      .delete()
      .eq('id', id));
    if (error) {
      logEngine.log('ERROR', `Erro ao excluir ocorrência no Supabase: ${error.message}`);
      throw error;
    }
    return true;
  }
};

// =========================================================================
// AUTOMATIC BACKUP ENGINE & DISASTER RECOVERY
// =========================================================================

export const backupEngine = {
  createBackup: async (label = 'auto') => {
    try {
      const data = await db.getData();
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `pome_backup_${label}_${timestamp}.json`;
      
      const payload = {
        metadata: {
          version: '3.0.0',
          source: 'Supabase Cloud Database (POME Contagem)',
          createdAt: new Date().toISOString(),
          label,
          counts: {
            schools: data.schools?.length || 0,
            users: data.users?.length || 0,
            occurrences: data.occurrences?.length || 0
          }
        },
        data
      };

      // In-memory backup snapshot (serverless resilient)
      const memEntry = {
        filename,
        sizeBytes: Buffer.byteLength(JSON.stringify(payload)),
        createdAt: payload.metadata.createdAt,
        metadata: payload.metadata,
        fullData: payload
      };
      memoryBackups.unshift(memEntry);
      if (memoryBackups.length > 50) memoryBackups.pop();

      // Safe write to disk if supported
      try {
        const filePath = path.join(BACKUP_DIR, filename);
        fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), 'utf8');
      } catch (fsErr) {
        try {
          const fallbackTmp = path.join(os.tmpdir(), filename);
          fs.writeFileSync(fallbackTmp, JSON.stringify(payload, null, 2), 'utf8');
        } catch (_) {}
      }

      // Safe update local db.json
      try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
      } catch (_) {}

      logEngine.log('INFO', `Backup snapshot gerado com sucesso [${label}]: ${filename}`, { counts: payload.metadata.counts });
      return { filename, ...payload.metadata, fullData: payload };
    } catch (err) {
      logEngine.log('ERROR', `Falha ao criar backup: ${err.message}`, { error: String(err) });
      throw err;
    }
  },
  
  listBackups: () => {
    try {
      const diskBackups = [];
      const searchDirs = [BACKUP_DIR, os.tmpdir()].filter((d, i, arr) => d && fs.existsSync(d) && arr.indexOf(d) === i);
      
      for (const bDir of searchDirs) {
        try {
          const files = fs.readdirSync(bDir).filter(f => f.startsWith('pome_backup_') && f.endsWith('.json'));
          for (const file of files) {
            if (!diskBackups.some(b => b.filename === file)) {
              try {
                const filePath = path.join(bDir, file);
                const stats = fs.statSync(filePath);
                let meta = null;
                try {
                  const raw = fs.readFileSync(filePath, 'utf8');
                  meta = JSON.parse(raw)?.metadata || null;
                } catch (_) {}
                diskBackups.push({
                  filename: file,
                  sizeBytes: stats.size,
                  createdAt: stats.mtime.toISOString(),
                  metadata: meta
                });
              } catch (_) {}
            }
          }
        } catch (_) {}
      }

      const mergedMap = new Map();
      memoryBackups.forEach(mb => mergedMap.set(mb.filename, {
        filename: mb.filename,
        sizeBytes: mb.sizeBytes,
        createdAt: mb.createdAt,
        metadata: mb.metadata
      }));
      diskBackups.forEach(db => {
        if (!mergedMap.has(db.filename)) mergedMap.set(db.filename, db);
      });

      return Array.from(mergedMap.values()).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (err) {
      console.error('Error listing backups:', err);
      return memoryBackups.map(mb => ({
        filename: mb.filename,
        sizeBytes: mb.sizeBytes,
        createdAt: mb.createdAt,
        metadata: mb.metadata
      }));
    }
  },
  
  getBackupContent: (filename) => {
    const safeFilename = path.basename(filename);
    const inMem = memoryBackups.find(b => b.filename === safeFilename);
    if (inMem) {
      return JSON.stringify(inMem.fullData, null, 2);
    }
    const searchDirs = [BACKUP_DIR, os.tmpdir()].filter((d, i, arr) => d && fs.existsSync(d) && arr.indexOf(d) === i);
    for (const bDir of searchDirs) {
      const filePath = path.join(bDir, safeFilename);
      if (fs.existsSync(filePath)) {
        try {
          return fs.readFileSync(filePath, 'utf8');
        } catch (_) {}
      }
    }
    return null;
  },
  
  restoreBackup: async (filenameOrData) => {
    try {
      let payload = filenameOrData;
      if (typeof filenameOrData === 'string') {
        const safeFilename = path.basename(filenameOrData);
        const inMem = memoryBackups.find(b => b.filename === safeFilename);
        if (inMem) {
          payload = inMem.fullData;
        } else {
          const searchDirs = [BACKUP_DIR, os.tmpdir()].filter((d, i, arr) => d && fs.existsSync(d) && arr.indexOf(d) === i);
          let found = false;
          for (const bDir of searchDirs) {
            const filePath = path.join(bDir, safeFilename);
            if (fs.existsSync(filePath)) {
              try {
                const raw = fs.readFileSync(filePath, 'utf8');
                payload = JSON.parse(raw);
                found = true;
                break;
              } catch (_) {}
            }
          }
          if (!found) throw new Error('Arquivo de backup não encontrado no servidor.');
        }
      }
      
      const targetData = payload.data || payload;
      if (!targetData.schools || !targetData.users || !targetData.occurrences) {
        throw new Error('Formato de backup inválido: dados essenciais ausentes.');
      }
      
      // 1. Restaurar escolas
      if (Array.isArray(targetData.schools)) {
        for (const s of targetData.schools) {
          await db.saveSchool(s);
        }
      }

      // 2. Restaurar usuários
      if (Array.isArray(targetData.users)) {
        for (const u of targetData.users) {
          await db.saveUser(u);
        }
      }

      // 3. Restaurar ocorrências
      if (Array.isArray(targetData.occurrences)) {
        for (const o of targetData.occurrences) {
          await db.saveOccurrence(o);
        }
      }
      
      logEngine.log('AUDIT', `Banco de dados Supabase restaurado com sucesso a partir do backup`, { counts: payload.metadata?.counts });
      return { success: true, metadata: payload.metadata };
    } catch (err) {
      logEngine.log('ERROR', `Falha na restauração do backup: ${err.message}`, { error: String(err) });
      throw err;
    }
  }
};
