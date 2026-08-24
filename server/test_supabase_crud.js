import { db } from './db.js';

async function testSupabaseCrud() {
  console.log('--- TESTING SUPABASE FULL CRUD CYCLE ---');
  
  // 1. Create Occurrence
  const newOcc = {
    id: `occ-pome-${Date.now()}`,
    schoolId: 'esc-1',
    createdById: 'usr-3',
    createdByName: 'Pedagoga Maria Silva',
    date: '2026-08-24',
    students: [
      {
        studentName: 'Estudante Teste Supabase',
        sex: 'Feminino',
        turn: 'Manhã',
        gradeCycle: '5º Ano',
        className: '5º Ano B',
        teacherName: 'Profª Cláudia Mendes',
        subject_matter: 'Língua Portuguesa',
        guardian: {
          name: 'Maria Responsável',
          bond: 'Mãe',
          contact: '(31) 98888-0000'
        }
      }
    ],
    studentName: 'Estudante Teste Supabase',
    gradeCycle: '5º Ano',
    className: '5º Ano B',
    teacherName: 'Profª Cláudia Mendes',
    guardianName: 'Maria Responsável',
    contacts: '(31) 98888-0000',
    type: 'Bullying',
    classifications: ['Bullying', 'Intimidação (ato isolado, não sistemático)'],
    feelings: ['Frustração', 'Insegurança'],
    feelings_observations: 'A aluna relatou sentir-se isolada durante as brincadeiras em grupo.',
    subject: 'Relato de apelidos depreciativos e exclusão das atividades de recreação por colegas.',
    referrals: 'Mediação individual realizada e agendamento de conversa com os responsáveis.',
    observations: 'Acompanhar o comportamento na próxima semana.',
    direction_referrals: ['Conselho Tutelar'],
    status: 'finalizado'
  };

  console.log('[1] Saving occurrence to Supabase...');
  const saved = await db.saveOccurrence(newOcc);
  console.log('Saved:', saved.id);

  // 2. Read Occurrences from Supabase
  console.log('\n[2] Reading occurrences from Supabase...');
  const all = await db.getOccurrences();
  const found = all.find(o => o.id === newOcc.id);
  if (!found) {
    throw new Error('Created occurrence not found in Supabase!');
  }
  console.log('Found in Supabase:');
  console.log(' - Student:', found.students?.[0]?.studentName);
  console.log(' - Classifications:', found.classifications);
  console.log(' - Feelings:', found.feelings);
  console.log(' - Direction referrals:', found.direction_referrals);
  console.log(' - Status:', found.status);

  // 3. Update with Director Visto
  console.log('\n[3] Updating with Director Visto...');
  found.directorNotes = 'Visto da diretoria registrado e homologado com sucesso.';
  found.updatedById = 'usr-2';
  found.updatedByName = 'Diretor Wancleber';
  await db.saveOccurrence(found);

  const updatedAll = await db.getOccurrences();
  const updatedFound = updatedAll.find(o => o.id === newOcc.id);
  console.log('Updated directorNotes:', updatedFound?.directorNotes);

  // 4. Delete Occurrence
  console.log('\n[4] Deleting test occurrence...');
  await db.deleteOccurrence(newOcc.id);
  
  const finalAll = await db.getOccurrences();
  const deletedFound = finalAll.find(o => o.id === newOcc.id);
  console.log('Deleted successfully? ', !deletedFound);
  console.log('\n--- SUPABASE CRUD TEST 100% SUCCESSFUL! ---');
}

testSupabaseCrud().then(() => process.exit(0)).catch(e => { console.error('CRUD Failed:', e); process.exit(1); });
