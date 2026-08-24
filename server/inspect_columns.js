import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false }
});

async function inspectSchema() {
  console.log('--- INSPECTING SUPABASE OCCURRENCES SCHEMA ---');
  const { data, error } = await supabase.from('occurrences').select('*').limit(1);
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Existing columns on an occurrence record:', Object.keys(data[0] || {}));
    console.log('Sample record:', JSON.stringify(data[0], null, 2));
  }
}

inspectSchema();
