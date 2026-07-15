async function getHeaders() {
  try {
    const res = await fetch('https://mowvehesrsawbxqhtytk.supabase.co/rest/v1/', {
      headers: {
        'apikey': 'sb_publishable_9DG9WVh7oVbM9r2hXQMvkA_ERImrg3S'
      }
    });
    console.log('Status:', res.status);
    console.log('Headers:');
    for (const [key, value] of res.headers.entries()) {
      console.log(`${key}: ${value}`);
    }
  } catch (err) {
    console.error('Error fetching headers:', err);
  }
}

getHeaders();
