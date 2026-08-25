import { db, backupEngine } from './db.js';
import assert from 'node:assert';

async function testFullSuite() {
  console.log('=== TESTE COMPLETO DE PERSISTÊNCIA SUPABASE & SISTEMA DE BACKUP ===\n');

  // 1. Fetch current live data from Supabase
  console.log('[1] Consultando dados ao vivo no Supabase...');
  const initialData = await db.getData();
  console.log(` - Escolas no Supabase: ${initialData.schools.length}`);
  console.log(` - Usuários no Supabase: ${initialData.users.length}`);
  console.log(` - Ocorrências no Supabase: ${initialData.occurrences.length}`);
  assert.ok(initialData.schools.length >= 10, 'Escolas devem ser >= 10');
  assert.ok(initialData.users.length >= 7, 'Usuários devem ser >= 7');

  // 2. Create a new full occurrence
  console.log('\n[2] Cadastrando nova ocorrência de teste no Supabase...');
  const testOccId = `occ-test-suite-${Date.now()}`;
  const newOcc = {
    id: testOccId,
    schoolId: 'esc-1',
    createdById: 'usr-3',
    createdByName: 'Pedagoga Maria Silva',
    date: '2026-08-25',
    students: [
      {
        studentName: 'Lucas Ferreira Guimarães',
        sex: 'Masculino',
        turn: 'Tarde',
        gradeCycle: '6º Ano',
        className: '6º Ano B',
        teacherName: 'Prof. Marcos Souza',
        subject_matter: 'Matemática',
        guardian: {
          name: 'Patrícia Guimarães',
          bond: 'Mãe',
          contact: '(31) 97777-2222'
        }
      }
    ],
    classifications: ['Bullying', 'Agressão verbal'],
    feelings: ['Tristeza', 'Frustração'],
    feelings_observations: 'Aluno comunicou grande sofrimento com as ofensas reiteradas.',
    subject: 'Estudante sofreu humilhação reiterada por colegas de sala de aula.',
    referrals: 'Mediação escolar e agendamento presencial com a família.',
    direction_referrals: ['Conselho Tutelar'],
    status: 'finalizado'
  };

  const savedOcc = await db.saveOccurrence(newOcc);
  assert.strictEqual(savedOcc.id, testOccId);
  console.log(' ✅ Ocorrência salva com sucesso no Supabase:', savedOcc.id);

  // 3. Test Automatic Backup Snapshot
  console.log('\n[3] Gerando snapshot de backup do Supabase...');
  const backup = await backupEngine.createBackup('suite_test');
  assert.ok(backup.filename.startsWith('pome_backup_suite_test_'));
  assert.ok(backup.counts.occurrences >= 1);
  console.log(` ✅ Backup snapshot criado: ${backup.filename} (${backup.counts.occurrences} ocorrências)`);

  // 4. Update with Director Visto
  console.log('\n[4] Registrando Visto da Diretoria no Supabase...');
  savedOcc.directorNotes = 'Homologado pela diretoria em 25/08/2026. Acompanhamento psicossocial iniciado.';
  savedOcc.updatedById = 'usr-2';
  savedOcc.updatedByName = 'Diretor(a) Wancleber';
  savedOcc.updatedAt = new Date().toISOString();
  
  const updatedOcc = await db.saveOccurrence(savedOcc);
  assert.strictEqual(updatedOcc.directorNotes, savedOcc.directorNotes);
  console.log(' ✅ Visto da Diretoria persistido com sucesso no Supabase!');

  // 5. Read back from Supabase and assert full richness
  console.log('\n[5] Lendo ocorrência atualizada do Supabase...');
  const allOccs = await db.getOccurrences();
  const fetched = allOccs.find(o => o.id === testOccId);
  assert.ok(fetched, 'Ocorrência recém-salva deve existir no Supabase');
  assert.strictEqual(fetched.students[0].studentName, 'Lucas Ferreira Guimarães');
  assert.deepStrictEqual(fetched.classifications, ['Bullying', 'Agressão verbal']);
  assert.deepStrictEqual(fetched.feelings, ['Tristeza', 'Frustração']);
  assert.strictEqual(fetched.directorNotes, 'Homologado pela diretoria em 25/08/2026. Acompanhamento psicossocial iniciado.');
  console.log(' ✅ Todos os campos e metadados lidos perfeitamente do Supabase!');

  // 6. Test Backup Restore to Supabase
  console.log('\n[6] Testando restauração de backup no Supabase...');
  const restoreResult = await backupEngine.restoreBackup(backup.filename);
  assert.strictEqual(restoreResult.success, true);
  console.log(' ✅ Restauração executada e validada com sucesso no Supabase!');

  // 7. Clean up test occurrence
  console.log('\n[7] Excluindo ocorrência de teste do Supabase...');
  await db.deleteOccurrence(testOccId);
  const afterDelete = await db.getOccurrences();
  const stillExists = afterDelete.some(o => o.id === testOccId);
  assert.strictEqual(stillExists, false);
  console.log(' ✅ Exclusão validada com sucesso no Supabase!');

  console.log('\n🎉 TODOS OS TESTES PASSARAM COM SUCESSO (100% SUPABASE AUTORITATIVO & BACKUP OPERACIONAL) 🎉\n');
}

testFullSuite().then(() => process.exit(0)).catch(e => { console.error('Falha nos testes:', e); process.exit(1); });
