import { spawn } from 'child_process';
import assert from 'node:assert';

console.log('Starting POME test server on port 3002 (Local Fallback)...');
const server = spawn('node', ['--env-file=.env', 'server/index.js'], {
  env: { 
    ...process.env, 
    PORT: '3002',
    SUPABASE_URL: '', // Force local fallback for automated test stability
    SUPABASE_KEY: '' 
  }
});

let serverOutput = '';
server.stdout.on('data', (data) => {
  serverOutput += data.toString();
  console.log('[Server]', data.toString().trim());
});

server.stderr.on('data', (data) => {
  console.error('[Server Error]', data.toString().trim());
});

// Wait for server to start
await new Promise(resolve => setTimeout(resolve, 2000));

async function runTests() {
  try {
    console.log('\n--- RUNNING POME INTEGRATION TESTS ---\n');

    // 1. Test duplicate CPF user registration
    console.log('Testing duplicate CPF user registration...');
    const resUserCpf = await fetch('http://localhost:3002/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Duplicate User',
        cpf: '00000000000', // same as gestor
        email: 'unique@pome.com',
        password: 'password',
        role: 'pedagogo'
      })
    });
    assert.strictEqual(resUserCpf.status, 400);
    const jsonUserCpf = await resUserCpf.json();
    assert.match(jsonUserCpf.error, /CPF já cadastrado/);
    console.log('✅ Test Passed: Duplicate CPF blocked.');

    // 2. Test duplicate Email user registration
    console.log('Testing duplicate Email user registration...');
    const resUserEmail = await fetch('http://localhost:3002/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Duplicate Email User',
        cpf: '99999999999',
        email: 'gestor@pome.com', // same as gestor
        password: 'password',
        role: 'pedagogo'
      })
    });
    assert.strictEqual(resUserEmail.status, 400);
    const jsonUserEmail = await resUserEmail.json();
    assert.match(jsonUserEmail.error, /E-mail já cadastrado/);
    console.log('✅ Test Passed: Duplicate Email blocked.');

    // 3. Test Pedagogue deleting unauthorized occurrence
    console.log('Testing Pedagogue delete permission restriction...');
    const resDelFail = await fetch('http://localhost:3002/api/occurrences/occ-1?role=pedagogo&userId=usr-4', {
      method: 'DELETE'
    });
    assert.strictEqual(resDelFail.status, 403);
    const jsonDelFail = await resDelFail.json();
    assert.match(jsonDelFail.error, /O pedagogo só pode excluir ocorrências criadas por ele/);
    console.log('✅ Test Passed: Pedagogue cannot delete others\' occurrences.');

    // 4. Test Director deleting occurrence
    console.log('Testing Director delete permission restriction...');
    const resDelDir = await fetch('http://localhost:3002/api/occurrences/occ-1?role=diretor&userId=usr-2', {
      method: 'DELETE'
    });
    assert.strictEqual(resDelDir.status, 403);
    const jsonDelDir = await resDelDir.json();
    assert.match(jsonDelDir.error, /Diretores não têm permissão para excluir ocorrências/);
    console.log('✅ Test Passed: Director blocked from deleting.');

    console.log('\n🎉 ALL POME TESTS PASSED SUCCESSFULLY! 🎉\n');
  } catch (error) {
    console.error('❌ Test Failed:', error);
    process.exitCode = 1;
  } finally {
    console.log('Stopping test server...');
    server.kill();
  }
}

runTests();
