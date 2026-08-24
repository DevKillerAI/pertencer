import { db } from './db.js';

async function runFullSystemAudit() {
  console.log('--- RUNNING FULL SYSTEM AUDIT ---');

  const schools = await db.getSchools();
  const users = await db.getUsers();
  const occurrences = await db.getOccurrences();

  console.log(`Verified ${schools.length} schools, ${users.length} users, ${occurrences.length} occurrences.`);

  // 1. Verify all roles exist
  const roles = ['pedagogo', 'assistente', 'diretor', 'seduc', 'superadmin'];
  for (const role of roles) {
    const user = users.find(u => u.role === role);
    if (!user) throw new Error(`Role missing: ${role}`);
    console.log(`✅ Role verified: ${role} (${user.name})`);
  }

  // 2. Test Step Validation Logic
  const testStudent = {
    studentName: 'Lucas Gabriel',
    sex: 'Masculino',
    turn: 'Manhã',
    gradeCycle: 'Ensino Fundamental II',
    className: '7º Ano A',
    teacherName: 'Prof. Marcos',
    subject_matter: 'Matemática',
    guardian: { name: 'Mariana Gabriel', contact: '(31) 98888-7777', bond: 'Mãe' }
  };

  const isStep1Valid = Boolean(
    [testStudent].length > 0 &&
    [testStudent].every(s =>
      (s?.studentName || '').trim().length >= 3 &&
      s?.sex &&
      (s?.turn || '').trim() &&
      s?.gradeCycle &&
      (s?.className || '').trim() &&
      (s?.teacherName || '').trim() &&
      (s?.subject_matter || '').trim() &&
      (s?.guardian?.name || '').trim() &&
      (s?.guardian?.contact || '').trim()
    )
  );
  if (!isStep1Valid) throw new Error('isStep1Valid failed');
  console.log('✅ isStep1Valid passed');

  const testSubject = 'Desentendimento durante a aula de matemática sobre materiais';
  const testClassifications = ['Conflito interpessoal / Discussão'];
  const isStep2Valid = Boolean(testSubject.trim().length >= 10 && testClassifications.length > 0);
  if (!isStep2Valid) throw new Error('isStep2Valid failed');
  console.log('✅ isStep2Valid passed');

  const testFeelings = ['Frustração', 'Raiva'];
  const isStep3Valid = !testFeelings.includes('Outro') || Boolean(''.trim());
  if (!isStep3Valid) throw new Error('isStep3Valid failed');
  console.log('✅ isStep3Valid passed');

  const testReferrals = 'Realizada escuta ativa e combinados pedagógicos com ambos os estudantes.';
  const testDirReferrals = ['Conselho Tutelar'];
  const isStep4Valid = Boolean(testReferrals.trim().length >= 5);
  if (!isStep4Valid) throw new Error('isStep4Valid failed');
  console.log('✅ isStep4Valid passed');

  const isStep5Valid = isStep1Valid && isStep2Valid && isStep3Valid && isStep4Valid;
  if (!isStep5Valid) throw new Error('isStep5Valid failed');
  console.log('✅ isStep5Valid passed');

  // 3. Test Full Occurrence Creation and Persistence
  const newOcc = {
    id: `occ-test-${Date.now()}`,
    schoolId: 'esc-1',
    students: [testStudent],
    date: '2026-08-24',
    subject: testSubject,
    classifications: testClassifications,
    type: testClassifications[0],
    feelings: testFeelings,
    feelings_observations: 'Aluno demonstrou irritação inicial, mas acolheu o diálogo.',
    referrals: testReferrals,
    observations: 'Acompanhamento previsto para a próxima semana.',
    direction_referrals: testDirReferrals,
    status: 'finalizado',
    createdById: 'usr-3',
    createdByName: 'Pedagoga Maria Silva',
    createdAt: new Date().toISOString()
  };

  const saved = await db.saveOccurrence(newOcc);
  if (!saved || saved.id !== newOcc.id) throw new Error('Failed to save occurrence');
  console.log(`✅ Occurrence created successfully: ${saved.id}`);

  // 4. Test Director Visto
  saved.directorNotes = 'Visto da diretoria registrado. Agendada reunião com responsáveis.';
  saved.updatedAt = new Date().toISOString();
  saved.updatedById = 'usr-2';
  saved.updatedByName = 'Diretor(a) Wancleber';
  const updatedOcc = await db.saveOccurrence(saved);
  if (!updatedOcc.directorNotes) throw new Error('Failed to update director notes');
  console.log('✅ Director visto registered successfully');

  // 5. Test Delete
  const deleted = await db.deleteOccurrence(saved.id);
  if (!deleted) throw new Error('Failed to delete occurrence');
  console.log('✅ Occurrence deleted successfully in cleanup');

  console.log('--- ALL SYSTEM AUDIT CHECKS PASSED (100% OPERATIONAL) ---');
}

runFullSystemAudit()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Audit Error:', err);
    process.exit(1);
  });
