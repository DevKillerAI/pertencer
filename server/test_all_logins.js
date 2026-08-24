const accountsToTest = [
  // Gestor SEDUC
  { id: 'Gestor SEDUC por CPF formatado', cpf: '111.111.111-11', password: 'seduc' },
  { id: 'Gestor SEDUC por CPF sem pontos', cpf: '11111111111', password: 'seduc123' },
  { id: 'Gestor SEDUC por E-mail', cpf: 'gestor@edu.contagem.mg.gov.br', password: 'senha' },
  { id: 'Gestor SEDUC por Alias gestor', cpf: 'gestor', password: 'admin' },
  
  // Super Admin
  { id: 'Super Admin por CPF', cpf: '000.000.000-00', password: 'admin' },
  { id: 'Super Admin por Email', cpf: 'admin@edu.contagem.mg.gov.br', password: 'admin123' },
  { id: 'Super Admin Felipe CPF', cpf: '999.999.999-99', password: '2018@Senha' },
  
  // Diretor
  { id: 'Diretor por CPF', cpf: '222.222.222-22', password: 'senha' },
  { id: 'Diretor por Email', cpf: 'diretor@edu.contagem.mg.gov.br', password: 'diretor123' },

  // Pedagogo
  { id: 'Pedagogo por CPF', cpf: '333.333.333-33', password: 'senha' },
  { id: 'Pedagogo por Email', cpf: 'pedagogo@edu.contagem.mg.gov.br', password: 'pedagogo123' },

  // Assistente
  { id: 'Assistente por CPF', cpf: '444.444.444-44', password: 'senha' },
  { id: 'Assistente por Email', cpf: 'assistente@edu.contagem.mg.gov.br', password: 'assistente123' }
];

async function runTests() {
  console.log('Testing authentication for all institutional accounts...\n');
  let allOk = true;

  for (const acc of accountsToTest) {
    try {
      const res = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf: acc.cpf, password: acc.password })
      });
      const data = await res.json();
      if (res.ok && data.id) {
        console.log(`✅ [PASS] ${acc.id} -> Logged in as: ${data.name} (${data.role})`);
      } else {
        console.error(`❌ [FAIL] ${acc.id} -> Status ${res.status}:`, data.error);
        allOk = false;
      }
    } catch (err) {
      console.error(`❌ [ERROR] ${acc.id}:`, err.message);
      allOk = false;
    }
  }

  if (allOk) {
    console.log('\n🎉 ALL ACCOUNTS LOGGED IN SUCCESSFULLY WITH 100% RELIABILITY!');
    process.exit(0);
  } else {
    console.error('\n⚠️ SOME LOGINS FAILED.');
    process.exit(1);
  }
}

runTests();
