import { db } from './db.js';

async function testSeducRender() {
  console.log('Testing SEDUC data fetching and view calculations...');
  const schools = await db.getSchools();
  const occurrences = await db.getOccurrences();
  const users = await db.getUsers();

  const user = users.find(u => u.role === 'seduc');
  console.log('User SEDUC:', user);

  // Test occurrences filtering
  const filtered = occurrences.filter(o => !o.status || o.status !== 'rascunho' || o.createdById === user.id);
  console.log('Occurrences count for SEDUC:', filtered.length);

  // Test getEscolasReport
  const escolasReport = schools.map(s => {
    const occs = filtered.filter(o => o.schoolId === s.id);
    return {
      id: s.id,
      name: s.name,
      total: occs.length,
      comVisto: occs.filter(o => o.directorNotes && o.directorNotes.trim()).length,
      vistoObrigatorio: occs.filter(o => !o.directorNotes && o.status !== 'rascunho' && Array.isArray(o.direction_referrals) && o.direction_referrals.length > 0).length,
      semVisto: occs.filter(o => !o.directorNotes && o.status !== 'rascunho').length,
      rascunhos: occs.filter(o => o.status === 'rascunho').length,
      riscos: occs.filter(o => (o.classifications || []).some(c => c.toLowerCase().includes('risco') || c.toLowerCase().includes('agressiva'))).length
    };
  });
  console.log('Escolas report generated successfully:', escolasReport.length);

  console.log('All calculations completed without errors!');
}

testSeducRender().then(() => process.exit(0)).catch(e => { console.error('Error:', e); process.exit(1); });
