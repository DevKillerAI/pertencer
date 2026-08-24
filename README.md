# 🏫 POME / PERTENCER - Plataforma de Observação e Melhoria do Clima Escolar

Sistema institucional integrado para **registro pedagógico**, **mediação de conflitos escolar**, **escuta qualificada socioemocional (CNV)**, **acompanhamento diretivo** e **telemetria analítica** da rede municipal de ensino.

---

## 📚 Documentação Completa do Sistema

Para uma descrição detalhada de todas as telas, funcionalidades, perfis de acesso, taxonomia em 3 níveis e regras de negócio, consulte o documento oficial:

👉 **[DOCUMENTACAO_SISTEMA.md](file:///k:/CLIMA_NEW/DOCUMENTACAO_SISTEMA.md)**

---

## ⚡ Principais Funcionalidades

* 📝 **Registro de Atendimento em 5 Passos:** Identificação dos envolvidos, relato dos fatos com classificação multinível, escuta empática de sentimentos (CNV), encaminhamentos e revisão.
* 🛡️ **Taxonomia Científica (3 Níveis):** Perturbadoras, Agressivas e/ou Violentas e Situações de Risco.
* ⚠️ **Visto Obrigatório da Direção Inteligente:** Notificação de visto direcionada apenas para registros que envolvem a Direção e a Rede de Proteção.
* 🔒 **Conformidade LGPD (Lei nº 13.709/2018):** Anonimização e mascaramento de nomes de estudantes, responsáveis e professores em 1 clique em todas as tabelas, modais e impressões.
* 🔍 **Rastreabilidade & Auditoria:** Histórico detalhado de criação e edições em cada ocorrência.
* 📊 **Relatórios Analíticos & Telemetria:** Gráficos por natureza, sentimentos, turmas, turnos e ranking comparativo entre escolas com exportação para SPSS, Excel e CSV.
* 🖨️ **Folha de Atendimento A4:** Emissão de documento institucional pronto para impressão com campos para assinaturas formais e marca d'água de rascunho.
* ⚙️ **Painel Master de Auditoria & Backups (Super Admin):** Monitoramento de integridade do servidor, telemetria de RAM/Uptime, snapshots de backup e logs em tempo real.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* Node.js (v18+)
* NPM

### Instalação e Execução
```bash
# Instalar dependências
npm install

# Iniciar servidor backend e frontend
npm run dev

# Gerar build de produção
npm run build
```

---

## 🏛️ Perfis de Acesso & Credenciais de Homologação

| Perfil / Cargo | Nome do Usuário | CPF de Acesso | E-mail Institucional | Senha Padrão | Escopo |
|---|---|---|---|---|---|
| 👑 **Super Admin** | Elisabette Leo | `000.000.000-00` | `admin@edu.contagem.mg.gov.br` | `admin123` *(ou `admin`)* | Toda a Rede |
| 👑 **Super Admin** | Felipe Marcelino | `999.999.999-99` | `felipe@edu.contagem.mg.gov.br` | `2018@Senha` | Toda a Rede |
| 🏛️ **Gestor SEDUC** | Gestão Central SEDUC | `111.111.111-11` | `gestor@edu.contagem.mg.gov.br` | `seduc123` *(ou `seduc` / `admin`)* | Rede Municipal |
| 💼 **Diretor(a)** | Diretor(a) Wancleber | `222.222.222-22` | `diretor@edu.contagem.mg.gov.br` | `diretor123` *(ou `senha`)* | Escola Wancleber |
| ✏️ **Pedagogo(a)** | Pedagoga Maria Silva | `333.333.333-33` | `pedagogo@edu.contagem.mg.gov.br` | `pedagogo123` *(ou `senha`)* | Escola Wancleber |
| 🤝 **Assistente Escolar** | Assistente de Mediação | `444.444.444-44` | `assistente@edu.contagem.mg.gov.br` | `assistente123` *(ou `senha`)* | Escola Wancleber |

