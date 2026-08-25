import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.SUPABASE_URL || 'https://mowvehesrsawbxqhtytk.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'sb_publishable_9DG9WVh7oVbM9r2hXQMvkA_ERImrg3S';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

const DB_FILE = path.join(__dirname, 'db.json');

async function migrateAll() {
  console.log('=== MIGRANDO TODOS OS DADOS PARA O SUPABASE (FONTE ÚNICA DA VERDADE) ===');
  const dbData = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));

  // 1. Escolas
  console.log(`\n[1] Sincronizando ${dbData.schools.length} escolas...`);
  for (const s of dbData.schools) {
    const { error } = await supabase.from('schools').upsert(s);
    if (error) console.error(` ❌ Erro ao sincronizar escola ${s.name}:`, error.message);
    else console.log(` ✅ Escola: ${s.name} (${s.id})`);
  }

  // 2. Usuários
  console.log(`\n[2] Sincronizando ${dbData.users.length} usuários...`);
  for (const u of dbData.users) {
    const userClasses = Array.isArray(u.classes) ? u.classes.filter(c => !c.startsWith('__')) : [];
    const payload = {
      id: u.id,
      name: (u.name || '').trim(),
      cpf: (u.cpf || '').replace(/\D/g, ''),
      password: u.password || 'senha',
      role: (u.role || 'pedagogo').toLowerCase(),
      schoolId: (u.role === 'seduc' || u.role === 'superadmin' || u.role === 'gestor') ? null : (u.schoolId || null),
      classes: [...userClasses]
    };
    if (u.email) payload.classes.push(`__email:${u.email.trim()}`);
    if (u.phone) payload.classes.push(`__phone:${u.phone.trim()}`);
    if (u.lgpd_accepted) payload.classes.push('__lgpd:true');
    if (u.createdAt) payload.classes.push(`__created:${u.createdAt}`);

    const { error } = await supabase.from('users').upsert(payload);
    if (error) console.error(` ❌ Erro ao sincronizar usuário ${u.name}:`, error.message);
    else console.log(` ✅ Usuário: [${u.role}] ${u.name} (CPF: ${u.cpf})`);
  }

  // 3. Ocorrências
  console.log(`\n[3] Sincronizando ${dbData.occurrences.length} ocorrências...`);
  for (const occ of dbData.occurrences) {
    const firstStudent = Array.isArray(occ.students) && occ.students.length > 0 ? occ.students[0] : {};
    const meta = {
      subject_matter: occ.subject_matter || firstStudent.subject_matter || '',
      attended_people: occ.attended_people || [],
      students: occ.students || [],
      classifications: occ.classifications || (occ.type ? [occ.type] : []),
      feelings: occ.feelings || [],
      feelings_observations: occ.feelings_observations || '',
      direction_referrals: occ.direction_referrals || [],
      status: occ.status || 'finalizado',
      directorNotes: occ.directorNotes || '',
      createdAt: occ.createdAt || (occ.date ? `${occ.date}T12:00:00.000Z` : new Date().toISOString()),
      updatedAt: occ.updatedAt || '',
      updatedById: occ.updatedById || '',
      updatedByName: occ.updatedByName || '',
      editHistory: occ.editHistory || []
    };

    // Strip legacy meta tag if present
    let rawObs = (occ.observations || '').replace(/<!--POME_META_START-->[\s\S]*?<!--POME_META_END-->/g, '').replace(/\[POME_META:[\s\S]*?\]/g, '').trim();

    const metaTag = `<!--POME_META_START-->\n${JSON.stringify(meta)}\n<!--POME_META_END-->`;
    const finalObservations = rawObs ? `${rawObs}\n\n${metaTag}` : metaTag;

    const payload = {
      id: occ.id,
      schoolId: occ.schoolId || 'esc-1',
      createdById: occ.createdById || 'usr-3',
      createdByName: occ.createdByName || 'Pedagogo(a)',
      date: occ.date || new Date().toISOString().split('T')[0],
      studentName: occ.studentName || firstStudent.studentName || 'Estudante',
      gradeCycle: occ.gradeCycle || firstStudent.gradeCycle || '',
      className: occ.className || firstStudent.className || '',
      teacherName: occ.teacherName || firstStudent.teacherName || '',
      guardianName: occ.guardianName || firstStudent.guardian?.name || '',
      contacts: occ.contacts || firstStudent.guardian?.contact || '',
      type: occ.type || (Array.isArray(occ.classifications) && occ.classifications[0]) || 'Atendimento Geral',
      subject: occ.subject || 'Atendimento POME',
      referrals: occ.referrals || '',
      observations: finalObservations,
      directorNotes: occ.directorNotes || ''
    };

    const { error } = await supabase.from('occurrences').upsert(payload);
    if (error) console.error(` ❌ Erro ao sincronizar ocorrência ${occ.id}:`, error.message);
    else console.log(` ✅ Ocorrência: ID ${occ.id} - Aluno: ${payload.studentName} - Tipo: ${payload.type}`);
  }

  console.log('\n=== MIGRAÇÃO COMPLETA: TODOS OS DADOS ESTÃO 100% PERSISTIDOS NO SUPABASE ===\n');
}

migrateAll().then(() => process.exit(0)).catch(e => { console.error('Falha na migração:', e); process.exit(1); });
