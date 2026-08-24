import { db, supabase, isSupabaseConfigured } from './db.js';

async function checkUsers() {
  console.log('--- DB.getUsers() ---');
  const users = await db.getUsers();
  console.log(JSON.stringify(users.map(u => ({ id: u.id, name: u.name, cpf: u.cpf, email: u.email, password: u.password, role: u.role, schoolId: u.schoolId })), null, 2));

  if (isSupabaseConfigured) {
    console.log('\n--- SUPABASE USERS TABLE ---');
    try {
      const { data, error } = await supabase.from('users').select('*');
      if (error) console.error('Supabase error:', error.message);
      else console.log(JSON.stringify(data, null, 2));
    } catch (e) {
      console.error('Supabase fetch error:', e.message);
    }
  }
}

checkUsers().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
