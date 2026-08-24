import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false }
});

async function listAll() {
  console.log('--- SUPABASE LIVE DATA ---');
  const { data: users } = await supabase.from('users').select('*');
  console.log('\nUsers in Supabase (' + users?.length + '):');
  users?.forEach(u => console.log(` - [${u.role}] ${u.name} (CPF: ${u.cpf}, School: ${u.schoolId})`));

  const { data: schools } = await supabase.from('schools').select('*');
  console.log('\nSchools in Supabase (' + schools?.length + '):');
  schools?.forEach(s => console.log(` - ${s.id}: ${s.name}`));

  const { data: occurrences } = await supabase.from('occurrences').select('*');
  console.log('\nOccurrences in Supabase (' + occurrences?.length + '):');
  occurrences?.forEach(o => console.log(` - ${o.id}: Student: ${o.studentName} | Date: ${o.date} | School: ${o.schoolId}`));
}

listAll();
