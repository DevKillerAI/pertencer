import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.SUPABASE_URL || 'https://mowvehesrsawbxqhtytk.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'sb_publishable_9DG9WVh7oVbM9r2hXQMvkA_ERImrg3S';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('--- Registering Super User: Felipe Marcelino ---');
  
  const superUserData = {
    id: 'usr-felipe',
    name: 'Felipe Marcelino (Super Admin)',
    cpf: '99999999999',
    email: 'vina@pome.com.br',
    phone: '(31) 99999-9999',
    password: '2018@Senha',
    role: 'superadmin',
    schoolId: null,
    classes: ['__email:vina@pome.com.br'],
    lgpd_accepted: true,
    createdAt: new Date().toISOString()
  };

  // 1. Insert into Supabase table
  try {
    const { data: dbUser, error: dbErr } = await supabase
      .from('users')
      .upsert(superUserData)
      .select();
    if (dbErr) {
      console.warn('Supabase DB upsert warning:', dbErr.message);
    } else {
      console.log('✅ Supabase DB user created/updated:', dbUser);
    }
  } catch (e) {
    console.error('Supabase DB error:', e.message);
  }

  // 2. Trigger Supabase Auth signUp for vina@pome.com.br
  console.log('\n--- Sending Supabase Auth Confirmation to vina@pome.com.br ---');
  try {
    const authRes1 = await supabase.auth.signUp({
      email: 'vina@pome.com.br',
      password: '2018@Senha',
      options: {
        data: {
          name: 'Felipe Marcelino',
          role: 'superadmin',
          cpf: '99999999999'
        }
      }
    });
    console.log('Auth signUp result (vina@pome.com.br):', JSON.stringify(authRes1, null, 2));
  } catch (e) {
    console.error('Auth error (vina@pome.com.br):', e.message);
  }

  // 3. Trigger Supabase Auth signUp for luisfelipemarcelino33@gmail.com
  console.log('\n--- Sending Supabase Auth Confirmation to luisfelipemarcelino33@gmail.com ---');
  try {
    const authRes2 = await supabase.auth.signUp({
      email: 'luisfelipemarcelino33@gmail.com',
      password: '2018@Senha',
      options: {
        data: {
          name: 'Felipe Marcelino',
          role: 'superadmin',
          cpf: '99999999999'
        }
      }
    });
    console.log('Auth signUp result (luisfelipemarcelino33@gmail.com):', JSON.stringify(authRes2, null, 2));
  } catch (e) {
    console.error('Auth error (luisfelipemarcelino33@gmail.com):', e.message);
  }
}

run();
