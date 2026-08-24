import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false }
});

async function checkUsers() {
  const { data: users } = await supabase.from('users').select('*');
  console.log('SUPABASE USERS DETAILED:');
  console.log(JSON.stringify(users, null, 2));
}

checkUsers();
