const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

async function fetchSchema() {
  const url = `${supabaseUrl}/rest/v1/?apikey=${supabaseKey}`;
  console.log("Fetching schema from URL:", url);
  try {
    const res = await fetch(url);
    const text = await res.text();
    console.log("Raw response (first 500 chars):", text.slice(0, 500));
    const data = JSON.parse(text);
    console.log("Definitions key present:", !!data.definitions);
    if (data.definitions) {
      console.log("Definitions:", Object.keys(data.definitions));
    }
  } catch (err) {
    console.error("Error fetching schema:", err);
  }
}

fetchSchema();
