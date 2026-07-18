import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkColumns() {
  console.log("Fetching occurrences structure...");
  const { data, error } = await supabase.from('occurrences').select('*').limit(1);
  if (error) {
    console.error("Fetch failed:", error);
  } else {
    console.log("Success! Keys of first row:", data.length > 0 ? Object.keys(data[0]) : "No rows found");
  }
  
  console.log("\nFetching schools structure...");
  const { data: schools, error: schoolErr } = await supabase.from('schools').select('*').limit(1);
  if (schoolErr) {
    console.error("Fetch schools failed:", schoolErr);
  } else {
    console.log("Success! Keys of first row:", schools.length > 0 ? Object.keys(schools[0]) : "No rows found");
  }

  console.log("\nFetching users structure...");
  const { data: users, error: userErr } = await supabase.from('users').select('*').limit(1);
  if (userErr) {
    console.error("Fetch users failed:", userErr);
  } else {
    console.log("Success! Keys of first row:", users.length > 0 ? Object.keys(users[0]) : "No rows found");
  }
}

checkColumns();
