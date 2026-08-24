import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

console.log('--- SUPABASE DIRECT DIAGNOSTIC ---');
console.log('SUPABASE_URL:', SUPABASE_URL);
console.log('SUPABASE_KEY (prefix):', SUPABASE_KEY ? SUPABASE_KEY.slice(0, 15) + '...' : 'MISSING');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false }
});

async function runDiagnostic() {
  // 1. Test query schools
  console.log('\n[1] Testing query from "schools"...');
  try {
    const start = Date.now();
    const { data, error, status, statusText } = await supabase.from('schools').select('*');
    console.log(`Status: ${status} (${statusText}), Elapsed: ${Date.now() - start}ms`);
    if (error) {
      console.error('Error on schools:', JSON.stringify(error, null, 2));
    } else {
      console.log(`Success! Found ${data?.length} schools.`);
    }
  } catch (err) {
    console.error('Exception querying schools:', err);
  }

  // 2. Test query users
  console.log('\n[2] Testing query from "users"...');
  try {
    const start = Date.now();
    const { data, error, status, statusText } = await supabase.from('users').select('*');
    console.log(`Status: ${status} (${statusText}), Elapsed: ${Date.now() - start}ms`);
    if (error) {
      console.error('Error on users:', JSON.stringify(error, null, 2));
    } else {
      console.log(`Success! Found ${data?.length} users.`);
    }
  } catch (err) {
    console.error('Exception querying users:', err);
  }

  // 3. Test query occurrences
  console.log('\n[3] Testing query from "occurrences"...');
  try {
    const start = Date.now();
    const { data, error, status, statusText } = await supabase.from('occurrences').select('*').order('id', { ascending: false }).limit(10);
    console.log(`Status: ${status} (${statusText}), Elapsed: ${Date.now() - start}ms`);
    if (error) {
      console.error('Error on occurrences query:', JSON.stringify(error, null, 2));
    } else {
      console.log(`Success! Retrieved ${data?.length} occurrences:`);
      data?.forEach(o => {
        console.log(` - ID: ${o.id} | Student: ${o.student_name || o.studentName} | Date: ${o.date} | School: ${o.school_id || o.schoolId}`);
      });
    }
  } catch (err) {
    console.error('Exception querying occurrences:', err);
  }

  // 4. Test insert into occurrences
  console.log('\n[4] Testing INSERT into "occurrences"...');
  const testId = `occ-diag-${Date.now()}`;
  const testPayload = {
    id: testId,
    school_id: 'esc-1',
    student_name: 'Teste Diagnostico Supabase',
    date: '2026-08-24',
    type: 'Atendimento Geral',
    subject: 'Teste de insercao direta para diagnostico de conexao Supabase',
    referrals: 'Teste de encaminhamento',
    observations: 'Observacao de teste',
    direction_referrals: ['Conselho Tutelar']
  };

  try {
    const start = Date.now();
    const { data, error, status, statusText } = await supabase
      .from('occurrences')
      .upsert(testPayload)
      .select();
    console.log(`Status: ${status} (${statusText}), Elapsed: ${Date.now() - start}ms`);
    if (error) {
      console.error('INSERT ERROR DETAILED:', JSON.stringify(error, null, 2));
      console.error('Error Code:', error.code);
      console.error('Error Message:', error.message);
      console.error('Error Details:', error.details);
      console.error('Error Hint:', error.hint);
    } else {
      console.log('INSERT SUCCESSFUL! Returned data:', data);
      
      // Cleanup
      console.log('Cleaning up test record...');
      await supabase.from('occurrences').delete().eq('id', testId);
      console.log('Cleanup complete.');
    }
  } catch (err) {
    console.error('Exception inserting into occurrences:', err);
  }
}

runDiagnostic().then(() => process.exit(0)).catch(e => { console.error('Fatal:', e); process.exit(1); });
