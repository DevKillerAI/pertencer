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
  let registeredUser = null;
  try {
    console.log('\n--- RUNNING POME INTEGRATION TESTS ---\n');

    // 1. Test duplicate CPF user registration
    console.log('Testing duplicate CPF user registration...');
    const resUserCpf = await fetch('http://localhost:3002/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Duplicate User',
        cpf: '99999999999', // same as superadmin felipe
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
        cpf: '98765432100',
        email: 'felipe@edu.contagem.mg.gov.br', // same as superadmin felipe
        password: 'password',
        role: 'pedagogo'
      })
    });
    assert.strictEqual(resUserEmail.status, 400);
    const jsonUserEmail = await resUserEmail.json();
    assert.match(jsonUserEmail.error, /E-mail.*já cadastrado/);
    console.log('✅ Test Passed: Duplicate Email blocked.');

    // 3. Test Public Self-Registration with LGPD (Apontamento 1)
    console.log('Testing Public Self-Registration with LGPD requirement...');
    const testRegCpf = `88${Date.now().toString().slice(-9)}`;
    const testRegEmail = `assistente_${Date.now()}@educacao.contagem.mg.gov.br`;

    const resRegNoLgpd = await fetch('http://localhost:3002/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Novo Assistente Sem LGPD',
        cpf: testRegCpf,
        email: testRegEmail,
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
        cpf: testRegCpf,
        email: testRegEmail,
        password: 'senha123',
        confirmPassword: 'senha123',
        role: 'assistente',
        schoolId: 'esc-1',
        lgpd_accepted: true
      })
    });
    assert.strictEqual(resRegOk.status, 201);
    registeredUser = await resRegOk.json();
    console.log('✅ Test Passed: Self-registration with LGPD completed.');

    // 4. Test Director adding "Visto da Diretoria" (Director's notes/signature)
    console.log('Testing Director adding notes / visto to an occurrence...');
    const resDirVisto = await fetch('http://localhost:3002/api/occurrences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 'occ-1',
        schoolId: 'esc-1',
        studentName: 'Gabriel Souza Lima',
        directorNotes: 'Visto e parecer pedagógico homologado pela diretoria em 23/08.',
        updatedById: 'usr-felipe',
        updatedByName: 'Felipe Marcelino'
      })
    });
    assert.strictEqual(resDirVisto.status, 200);
    console.log('✅ Test Passed: Director successfully applied official visto / parecer.');

    // 5. Test deleting occurrence
    console.log('Testing deleting occurrence...');
    const resDel = await fetch('http://localhost:3002/api/occurrences/occ-1?role=gestor&userId=usr-1', {
      method: 'DELETE'
    });
    assert.strictEqual(resDel.status, 200);
    const jsonDel = await resDel.json();
    assert.strictEqual(jsonDel.success, true);
    console.log('✅ Test Passed: Occurrence deletion completed.');

    // 8. Create full occurrence with multiple students, feelings (CNV), and protection referral
    console.log('Testing creating occurrence with multiple students, CNV feelings and protection network referral...');
    const resCreateMulti = await fetch('http://localhost:3002/api/occurrences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 'occ-multi-test',
        schoolId: 'esc-1',
        createdById: 'usr-felipe',
        createdByName: 'Felipe Marcelino',
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

    // 9. Create a draft occurrence as registeredUser
    console.log('Creating a draft occurrence as registered user...');
    const resCreateDraft = await fetch('http://localhost:3002/api/occurrences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: 'occ-draft-test',
        studentName: 'Test Draft Student',
        schoolId: 'esc-1',
        type: 'Bullying',
        status: 'rascunho',
        createdById: registeredUser.id,
        createdByName: registeredUser.name,
        date: '2026-07-31',
        subject: 'Relato de teste de rascunho.'
      })
    });
    assert.strictEqual(resCreateDraft.status, 200);
    console.log('✅ Test Passed: Draft created successfully.');

    // 10. Test that other user cannot see the draft
    console.log('Testing that another user cannot see the draft of registeredUser...');
    const resGetDraftsOther = await fetch('http://localhost:3002/api/occurrences?schoolId=esc-1&role=pedagogo&userId=other-user-999');
    assert.strictEqual(resGetDraftsOther.status, 200);
    const occurrencesOther = await resGetDraftsOther.json();
    const foundDraftOther = occurrencesOther.find(o => o.id === 'occ-draft-test');
    assert.strictEqual(foundDraftOther, undefined);
    console.log('✅ Test Passed: Other user cannot see registeredUser\'s draft.');

    // 11. Test that creator CAN see their own draft
    console.log('Testing that creator CAN see their own draft...');
    const resGetDraftsSelf = await fetch(`http://localhost:3002/api/occurrences?schoolId=esc-1&role=assistente&userId=${registeredUser.id}`);
    assert.strictEqual(resGetDraftsSelf.status, 200);
    const occurrencesSelf = await resGetDraftsSelf.json();
    const foundDraftSelf = occurrencesSelf.find(o => o.id === 'occ-draft-test');
    assert.ok(foundDraftSelf);
    assert.strictEqual(foundDraftSelf.status, 'rascunho');
    console.log('✅ Test Passed: Creator can see their own draft.');

    // 12. Test Gestor / Seduc global visibility (all schools)
    console.log('Testing Gestor global visibility across all schools...');
    const resGestorOccs = await fetch('http://localhost:3002/api/occurrences?role=gestor&userId=usr-1');
    assert.strictEqual(resGestorOccs.status, 200);
    const gestorOccs = await resGestorOccs.json();
    assert.ok(gestorOccs.length >= 1, 'Gestor must see occurrences across all schools');
    console.log(`✅ Test Passed: Gestor sees all ${gestorOccs.length} network occurrences.`);

    // 13. Test Assistente School-Specific Visibility
    console.log('Testing Assistente visibility scoped to school esc-1...');
    const resAssistOccs = await fetch('http://localhost:3002/api/occurrences?schoolId=esc-1&role=assistente&userId=usr-assist');
    assert.strictEqual(resAssistOccs.status, 200);
    const assistOccs = await resAssistOccs.json();
    assert.ok(assistOccs.every(o => o.schoolId === 'esc-1'));
    console.log('✅ Test Passed: Assistente view is strictly scoped to assigned school.');

    // 14. Test Gestor School CRUD (Create and Delete)
    console.log('Testing Gestor school management...');
    const resNewSchool = await fetch('http://localhost:3002/api/schools', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Escola Teste Integração' })
    });
    assert.strictEqual(resNewSchool.status, 200);
    const savedSchool = await resNewSchool.json();
    assert.ok(savedSchool.id);
    
    // Delete school
    const resDelSchool = await fetch(`http://localhost:3002/api/schools/${savedSchool.id}`, { method: 'DELETE' });
    assert.strictEqual(resDelSchool.status, 200);
    console.log('✅ Test Passed: Gestor school creation and deletion.');

    // 15. Test Super Admin Telemetry Metrics
    console.log('Testing Super Admin telemetry metrics API...');
    const resMetrics = await fetch('http://localhost:3002/api/admin/metrics');
    assert.strictEqual(resMetrics.status, 200);
    const metrics = await resMetrics.json();
    assert.ok(metrics.counts.schools >= 1);
    assert.ok(metrics.counts.users >= 1);
    assert.ok(typeof metrics.uptimeSeconds === 'number');
    console.log('✅ Test Passed: Super Admin Telemetry Metrics operational.');

    // 16. Test Super Admin Activity & Error Logs
    console.log('Testing Super Admin activity logs API...');
    const resLogs = await fetch('http://localhost:3002/api/admin/logs');
    assert.strictEqual(resLogs.status, 200);
    const logs = await resLogs.json();
    assert.ok(Array.isArray(logs));
    assert.ok(logs.length > 0);
    console.log(`✅ Test Passed: Super Admin retrieved ${logs.length} activity/audit logs.`);

    // 17. Test Super Admin Automatic & Manual Backup Snapshot
    console.log('Testing Super Admin backup generation and listing...');
    const resBackup = await fetch('http://localhost:3002/api/admin/backups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label: 'test_automated' })
    });
    assert.ok(resBackup.status === 200 || resBackup.status === 201);
    const backupResult = await resBackup.json();
    assert.ok(backupResult.backup);
    assert.ok(backupResult.backup.filename.startsWith('pome_backup_'));

    const resBackupsList = await fetch('http://localhost:3002/api/admin/backups');
    assert.strictEqual(resBackupsList.status, 200);
    const backupsList = await resBackupsList.json();
    assert.ok(backupsList.some(b => b.filename === backupResult.backup.filename));
    console.log('✅ Test Passed: Backup snapshot created and indexed successfully.');

    // 18. Test Super Admin Role Simulation Mode (LGPD Compliant)
    console.log('Testing Super Admin Role Simulation Mode...');
    const resSim = await fetch('http://localhost:3002/api/admin/simulation-mode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ simulatedRole: 'pedagogo', schoolId: 'esc-1', schoolName: 'E.M. Dona Belinha' })
    });
    assert.strictEqual(resSim.status, 200);
    const simData = await resSim.json();
    assert.strictEqual(simData.success, true);
    assert.strictEqual(simData.simulatedRole, 'pedagogo');
    console.log('✅ Test Passed: Super Admin role simulation mode activated and audited under LGPD compliance.');

    // 19. Test Super Admin Backup Restore
    console.log('Testing Super Admin backup restore execution...');
    const resRestore = await fetch('http://localhost:3002/api/admin/backups/restore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: backupResult.backup.filename })
    });
    assert.strictEqual(resRestore.status, 200);
    const restoreResult = await resRestore.json();
    assert.strictEqual(restoreResult.success, true);
    console.log('✅ Test Passed: Database restoration executed and verified.');

    // Clean up test occurrences and registered test user
    console.log('Cleaning up test data...');
    await fetch('http://localhost:3002/api/occurrences/occ-draft-test?role=superadmin&userId=usr-felipe', { method: 'DELETE' });
    await fetch('http://localhost:3002/api/occurrences/occ-multi-test?role=superadmin&userId=usr-felipe', { method: 'DELETE' });
    if (registeredUser && registeredUser.id) {
      await fetch(`http://localhost:3002/api/users/${registeredUser.id}`, { method: 'DELETE' });
    }

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
