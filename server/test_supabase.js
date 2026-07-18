import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  const mockOcc = {
    id: 'occ-test-123',
    schoolId: 'esc-1',
    createdById: 'usr-3',
    createdByName: 'Pedagoga Maria Silva',
    date: '2026-07-13',
    studentName: 'Gabriel Souza Lima',
    gradeCycle: '5º Ano',
    className: '5º Ano A',
    teacherName: 'Profª Cláudia Mendes',
    subject_matter: 'Língua Portuguesa',
    attended_people: [
      { name: 'Regina Souza Lima', bond: 'Mãe', contact: '(41) 98888-7777' }
    ],
    classifications: ['Bullying'],
    type: 'Bullying',
    status: 'finalizado',
    subject: 'O estudante relatou sofrer apelidos depreciativos recorrentes por parte de colegas da mesma turma.',
    referrals: 'Conversa individual com os alunos envolvidos.',
    observations: 'O aluno demonstrou-se bastante abalado.',
    directorNotes: 'Acompanhei o caso.'
  };

  console.log("Attempting to insert mock occurrence...");
  const { data, error } = await supabase.from('occurrences').upsert(mockOcc).select();
  if (error) {
    console.error("Upsert failed with error:", error);
  } else {
    console.log("Upsert succeeded! Returned data:", data);
  }
}

testInsert();
