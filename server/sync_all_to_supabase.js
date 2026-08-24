import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false }
});

async function syncAll() {
  console.log('--- SYNCING LOCAL CANONICAL DATA TO SUPABASE ---');
  const dbData = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf-8'));

  // 1. Sync Schools
  console.log(`Syncing ${dbData.schools.length} schools...`);
  for (const s of dbData.schools) {
    const { error } = await supabase.from('schools').upsert(s);
    if (error) console.error(`Error syncing school ${s.name}:`, error.message);
    else console.log(` ✅ School synced: ${s.name}`);
  }

  // 2. Sync Users
  console.log(`\nSyncing ${dbData.users.length} users...`);
  for (const u of dbData.users) {
    const payload = {
      id: u.id,
      name: u.name,
      cpf: u.cpf,
      password: u.password,
      role: u.role,
      schoolId: u.schoolId,
      classes: Array.isArray(u.classes) ? u.classes : []
    };
    if (u.email) {
      payload.classes = payload.classes.filter(c => !c.startsWith('__email:'));
      payload.classes.push(`__email:${u.email}`);
    }
    const { error } = await supabase.from('users').upsert(payload);
    if (error) console.error(`Error syncing user ${u.name}:`, error.message);
    else console.log(` ✅ User synced: [${u.role}] ${u.name} (CPF: ${u.cpf})`);
  }

  console.log('\n--- SYNC COMPLETE ---');
}

syncAll().then(() => process.exit(0)).catch(e => { console.error('Sync failed:', e); process.exit(1); });
