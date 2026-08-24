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

## 🏛️ Perfis de Acesso

* **Super Admin:** Gestão master, telemetria técnica, logs e auditoria.
* **SEDUC / Gestor Central:** Visão panorâmica de toda a rede municipal e relatórios consolidados.
* **Diretor(a):** Gestão e visto de 100% das ocorrências da unidade escolar.
* **Pedagogo(a):** Abertura, mediação e registro dos atendimentos socioemocionais.
* **Assistente Escolar / Mediador:** Apoio ao núcleo pedagógico e consultas.

