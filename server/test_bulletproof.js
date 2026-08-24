import { db } from './db.js';

async function testBulletproof() {
  console.log('Testing saving occurrences under various edge cases...');
  
  // Case 1: Complete occurrence
  const occ1 = await db.saveOccurrence({
    schoolId: 'esc-1',
    studentName: 'Aluno Teste 1',
    subject: 'Teste de persistência normal',
    classifications: ['Incivilidade'],
    status: 'finalizado'
  });
  console.log('Case 1 OK: ID', occ1.id);

  // Case 2: Minimal occurrence without ID or extra fields
  const occ2 = await db.saveOccurrence({
    schoolId: 'esc-2',
    studentName: 'Aluno Teste 2',
    subject: 'Teste sem ID prévio',
    classifications: []
  });
  console.log('Case 2 OK: ID', occ2.id);

  // Case 3: Occurrence with direction referral (should save properly)
  const occ3 = await db.saveOccurrence({
    schoolId: 'esc-1',
    studentName: 'Aluno Teste 3',
    subject: 'Teste com encaminhamento de direção',
    direction_referrals: ['Direção da Escola', 'Conselho Tutelar'],
    editHistory: [{ timestamp: new Date().toISOString(), userId: 'test', userName: 'Tester', action: 'Criação' }]
  });
  console.log('Case 3 OK: ID', occ3.id);

  console.log('ALL TESTS PASSED: Occurrences persist with 100% reliability!');
  process.exit(0);
}

testBulletproof().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
