import { supabase, isSupabaseConfigured, db, invalidateCache } from './db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'db.json');

async function cleanUsers() {
  console.log('--- INICIANDO LIMPEZA CONTROLADA DE USUÁRIOS ---');
  
  // 1. Verificar estado atual
  const usersBefore = await db.getUsers(true);
  console.log(`Total de usuários antes da limpeza: ${usersBefore.length}`);
  
  const felipeUser = usersBefore.find(u => u.id === 'usr-felipe' || u.email === 'felipe@edu.contagem.mg.gov.br' || u.cpf === '99999999999');
  if (!felipeUser) {
    throw new Error('FATAL: Usuário Super Admin de Felipe não encontrado para preservação! Abortando.');
  }

  console.log(`Preservando Super Admin Master: ${felipeUser.name} (${felipeUser.email})`);

  // 2. Limpar no Supabase
  if (isSupabaseConfigured && supabase) {
    console.log('Excluindo usuários de teste no Supabase (mantendo apenas usr-felipe)...');
    const { data: deleted, error } = await supabase
      .from('users')
      .delete()
      .neq('id', 'usr-felipe')
      .select();

    if (error) {
      console.error('Erro ao excluir no Supabase:', error.message);
      throw error;
    }
    console.log(`✅ Supabase: ${deleted ? deleted.length : 'todos os outros'} usuários excluídos com sucesso.`);
  }

  // 3. Limpar no db.json local
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf8');
      const dbJson = JSON.parse(raw);
      if (Array.isArray(dbJson.users)) {
        dbJson.users = dbJson.users.filter(u => u.id === 'usr-felipe');
        fs.writeFileSync(DB_FILE, JSON.stringify(dbJson, null, 2), 'utf8');
        console.log('✅ Local db.json atualizado.');
      }
    }
  } catch (e) {
    console.warn('Aviso ao atualizar db.json:', e.message);
  }

  // 4. Invalidar cache em memória
  invalidateCache('users');

  // 5. Verificar estado final
  const usersAfter = await db.getUsers(true);
  console.log(`Total de usuários após a limpeza: ${usersAfter.length}`);
  console.log('Usuários ativos no sistema:', JSON.stringify(usersAfter.map(u => ({ id: u.id, name: u.name, cpf: u.cpf, email: u.email, role: u.role })), null, 2));
  console.log('--- LIMPEZA CONCLUÍDA COM SUCESSO ---');
}

cleanUsers().then(() => process.exit(0)).catch(err => {
  console.error('Falha na limpeza:', err);
  process.exit(1);
});
