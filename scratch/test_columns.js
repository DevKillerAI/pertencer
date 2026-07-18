import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const occurrenceColumns = [
  'id', 'schoolId', 'createdById', 'createdByName', 'date', 
  'studentName', 'gradeCycle', 'className', 'teacherName', 
  'subject_matter', 'attended_people', 'classifications', 
  'type', 'status', 'subject', 'referrals', 'observations', 
  'directorNotes'
];

const userColumns = [
  'id', 'name', 'cpf', 'email', 'password', 'role', 'schoolId', 'classes'
];

async function checkColumns() {
  console.log("Checking columns in 'occurrences' table...");
  for (const col of occurrenceColumns) {
    const { data, error } = await supabase.from('occurrences').select(col).limit(1);
    if (error) {
      console.log(`❌ Column '${col}': NOT FOUND or error:`, error.message);
    } else {
      console.log(`✅ Column '${col}': OK`);
    }
  }

  console.log("\nChecking columns in 'users' table...");
  for (const col of userColumns) {
    const { data, error } = await supabase.from('users').select(col).limit(1);
    if (error) {
      console.log(`❌ Column '${col}': NOT FOUND or error:`, error.message);
    } else {
      console.log(`✅ Column '${col}': OK`);
    }
  }
}

checkColumns();
