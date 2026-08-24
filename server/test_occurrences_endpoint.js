import { db } from './db.js';

async function testEndpoint() {
  console.log('--- TESTING OCCURRENCES PERSISTENCE ---');
  
  // 1. Get occurrences currently in DB
  const list = await db.getOccurrences();
  console.log(`Current occurrences in db: ${list.length}`);
  list.forEach(o => console.log(` - ID: ${o.id} | Student: ${o.studentName} | School: ${o.schoolId} | Status: ${o.status}`));

  // 2. Post a new occurrence as Gestor SEDUC
  const newOcc = {
    id: `occ-seduc-${Date.now()}`,
    schoolId: 'esc-1',
    createdById: 'usr-seduc',
    createdByName: 'Gestão Central SEDUC',
    date: '2026-08-24',
    students: [
      {
        studentName: 'Ana Clara Silveira',
        sex: 'Feminino',
        turn: 'Manhã',
        gradeCycle: '5º Ano',
        className: '5º Ano A',
        teacherName: 'Profª Cláudia Mendes',
        subject_matter: 'Língua Portuguesa',
        guardian: {
          name: 'Renata Silveira',
          bond: 'Mãe',
          contact: '(31) 98888-1111'
        }
      }
    ],
    classifications: ['Bullying'],
    feelings: ['Frustração'],
    subject: 'Atendimento de mediação sobre conflito escolar.',
    referrals: 'Encaminhado para acolhimento pedagógico.',
    direction_referrals: [],
    status: 'finalizado'
  };

  console.log('\n[2] Saving occurrence via db.saveOccurrence...');
  const saved = await db.saveOccurrence(newOcc);
  console.log('Saved occurrence ID:', saved.id);

  // 3. Fetch occurrences again
  const listAfter = await db.getOccurrences();
  console.log(`\nOccurrences in db after save: ${listAfter.length}`);
  const found = listAfter.find(o => o.id === newOcc.id);
  console.log('Found newly created occurrence?', !!found);
  if (found) {
    console.log('Details:', {
      id: found.id,
      studentName: found.studentName,
      schoolId: found.schoolId,
      classifications: found.classifications,
      status: found.status
    });
  }
}

testEndpoint().then(() => process.exit(0)).catch(e => { console.error('Error:', e); process.exit(1); });
