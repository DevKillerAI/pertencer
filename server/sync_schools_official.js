import { supabase, isSupabaseConfigured } from './db.js';

const OFFICIAL_SCHOOLS = [
  { id: 'esc-1', name: 'CEMEI Sagrado Coração' },
  { id: 'esc-2', name: 'EM Dona Gabriela Leite Araújo' },
  { id: 'esc-3', name: 'EM Professora Maria Olintha' },
  { id: 'esc-4', name: 'EM Maria Silva Lucas – CAIC' },
  { id: 'esc-5', name: 'EM Professor Wancleber Pacheco' },
  { id: 'esc-6', name: 'EM Glória Marques Diniz' },
  { id: 'esc-7', name: 'EM Isabel Nascimento de Mattos' },
  { id: 'esc-8', name: 'EM Francisco Sales da Silva Diniz' },
  { id: 'esc-9', name: 'EM Professora Julia Kubitschek de Oliveira' },
  { id: 'esc-10', name: 'EM Dona Cordelina Silveira Mattos' }
];

async function syncSchools() {
  if (!isSupabaseConfigured) {
    console.log('Supabase is not configured, skipped.');
    return;
  }
  console.log('Syncing 10 official schools to Supabase...');
  for (const school of OFFICIAL_SCHOOLS) {
    const { data, error } = await supabase.from('schools').upsert(school, { onConflict: 'id' });
    if (error) {
      console.error('Error upserting school', school.name, error);
    } else {
      console.log('Upserted:', school.name);
    }
  }
  console.log('School sync complete!');
}

syncSchools();
