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

    // 3. Test Public Self-Registration with LGPD (Apontamento 1)
    console.log('Testing Public Self-Registration with LGPD requirement...');
    const resRegNoLgpd = await fetch('http://localhost:3002/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Novo Assistente',
        cpf: '88888888888',
        email: 'assistente@educacao.contagem.mg.gov.br',
        role: 'assistente',
        schoolId: 'esc-1',
        lgpd_accepted: false
      })
    });
    assert.strictEqual(resRegNoLgpd.status, 400);
    console.log('✅ Test Passed: Self-registration blocked without LGPD consent.');

    const resRegOk = await fetch('http://localhost:3002/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Novo Assistente Aprovado',
        cpf: '88888888888',
        email: 'assistente@educacao.contagem.mg.gov.br',
        role: 'assistente',
        schoolId: 'esc-1',
        lgpd_accepted: true
      })
    });
    assert.strictEqual(resRegOk.status, 201);
    console.log('✅ Test Passed: Self-registration with LGPD completed.');

    // 4. Test Pedagogue deleting unauthorized occurrence
    console.log('Testing Pedagogue delete permission restriction...');
    const resDelFail = await fetch('http://localhost:3002/api/occurrences/occ-1?role=pedagogo&userId=usr-4', {
      method: 'DELETE'
    });
    assert.strictEqual(resDelFail.status, 403);
    const jsonDelFail = await resDelFail.json();
    assert.match(jsonDelFail.error, /O pedagogo só pode excluir ocorrências criadas por ele/);
    console.log('✅ Test Passed: Pedagogue cannot delete others\' occurrences.');

    // 5. Test Director deleting occurrence
    console.log('Testing Director delete permission restriction...');
    const resDelDir = await fetch('http://localhost:3002/api/occurrences/occ-1?role=diretor&userId=usr-2', {
      method: 'DELETE'
    });
    assert.strictEqual(resDelDir.status, 403);
    const jsonDelDir = await resDelDir.json();
    assert.match(jsonDelDir.error, /Diretores não têm permissão para excluir ocorrências/);
    console.log('✅ Test Passed: Director blocked from deleting.');

    // 6. Test Pedagogue deleting their own occurrence with director notes
    console.log('Testing Pedagogue deleting their own occurrence that has director notes...');
    const resDelSigned = await fetch('http://localhost:3002/api/occurrences/occ-1?role=pedagogo&userId=usr-3', {
      method: 'DELETE'
    });
    assert.strictEqual(resDelSigned.status, 403);
    const jsonDelSigned = await resDelSigned.json();
    assert.match(jsonDelSigned.error, /Ocorrências com visto da diretoria não podem ser excluídas por pedagogos/);
    console.log('✅ Test Passed: Pedagogue blocked from deleting signed occurrence.');

    // 7. Create full occurrence with multiple students, feelings (CNV), and protection referral
    console.log('Testing creating occurrence with multiple students, CNV feelings and protection network referral...');
    const resCreateMulti = await fetch('http://localhost:3002/api/occurrences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 'occ-multi-test',
        schoolId: 'esc-1',
        createdById: 'usr-3',
        createdByName: 'Pedagoga Maria Silva',
        date: '2026-08-22',
        students: [
          {
            studentName: 'Estudante 1 Teste',
            sex: 'Feminino',
            turn: 'Manhã',
            gradeCycle: '5º Ano',
            className: '5º Ano A',
            teacherName: 'Profª Cláudia',
            subject_matter: 'Língua Portuguesa',
            guardian: { name: 'Mãe 1', bond: 'Mãe', contact: '(31) 98888-0001' }
          },
          {
            studentName: 'Estudante 2 Teste',
            sex: 'Masculino',
            turn: 'Manhã',
            gradeCycle: '5º Ano',
            className: '5º Ano A',
            teacherName: 'Profª Cláudia',
            subject_matter: 'Língua Portuguesa',
            guardian: { name: 'Pai 2', bond: 'Pai', contact: '(31) 98888-0002' }
          }
        ],
        classifications: ['Bullying', 'Agressão verbal'],
        subject: 'Relato completo de conflito com mediação pedagógica realizada.',
        feelings: ['Frustração', 'Insegurança', 'Tristeza'],
        feelings_observations: 'Os estudantes expressaram tristeza e arrependimento durante a escuta qualificada.',
        referrals: 'Roda de conversa com a turma e diálogo com famílias.',
        direction_referrals: ['Conselho tutelar'],
        status: 'finalizado'
      })
    });
    assert.strictEqual(resCreateMulti.status, 200);
    const createdOcc = await resCreateMulti.json();
    assert.strictEqual(createdOcc.students.length, 2);
    assert.strictEqual(createdOcc.feelings.length, 3);
    console.log('✅ Test Passed: Multi-student occurrence with CNV and direction referral created.');

    // 8. Create a draft occurrence as usr-3
    console.log('Creating a draft occurrence as usr-3...');
    const resCreateDraft = await fetch('http://localhost:3002/api/occurrences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 'occ-draft-test',
        studentName: 'Test Draft Student',
        schoolId: 'esc-1',
        type: 'Bullying',
        status: 'rascunho',
        createdById: 'usr-3',
        createdByName: 'Pedagoga Maria Silva',
        date: '2026-07-31',
        subject: 'Relato de teste de rascunho.'
      })
    });
    assert.strictEqual(resCreateDraft.status, 200);
    console.log('✅ Test Passed: Draft created successfully.');

    // 9. Test that usr-4 (different user) cannot see the draft of usr-3
    console.log('Testing that usr-4 cannot see the draft of usr-3...');
    const resGetDraftsOther = await fetch('http://localhost:3002/api/occurrences?schoolId=esc-1&role=pedagogo&userId=usr-4');
    assert.strictEqual(resGetDraftsOther.status, 200);
    const occurrencesOther = await resGetDraftsOther.json();
    const foundDraftOther = occurrencesOther.find(o => o.id === 'occ-draft-test');
    assert.strictEqual(foundDraftOther, undefined);
    console.log('✅ Test Passed: User usr-4 cannot see usr-3\'s draft.');

    // 10. Test that usr-3 (creator) CAN see the draft
    console.log('Testing that usr-3 can see their own draft...');
    const resGetDraftsSelf = await fetch('http://localhost:3002/api/occurrences?schoolId=esc-1&role=pedagogo&userId=usr-3');
    assert.strictEqual(resGetDraftsSelf.status, 200);
    const occurrencesSelf = await resGetDraftsSelf.json();
    const foundDraftSelf = occurrencesSelf.find(o => o.id === 'occ-draft-test');
    assert.ok(foundDraftSelf);
    assert.strictEqual(foundDraftSelf.status, 'rascunho');
    console.log('✅ Test Passed: Creator can see their own draft.');

    // Clean up test occurrences
    console.log('Cleaning up test data...');
    await fetch('http://localhost:3002/api/occurrences/occ-draft-test?role=gestor&userId=usr-1', { method: 'DELETE' });
    await fetch('http://localhost:3002/api/occurrences/occ-multi-test?role=gestor&userId=usr-1', { method: 'DELETE' });

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
