# 🏆 SNAPSHOT MESTRE — MELHOR VERSÃO ESTÁVEL DO POME (CONTAGEM)
> **STATUS:** MARCO ZERO DE ESTABILIDADE MÁXIMA (GOLD MASTER)  
> **DATA DE REGISTRO:** 25 de Agosto de 2026  
> **COMMIT BASE:** `0f22401`  
> **REPOSITÓRIO:** `https://github.com/DevKillerAI/pertencer.git`  
> **AMBIENTE DE PRODUÇÃO:** `https://pome-contagem.vercel.app`

---

## 📌 PROPÓSITO DESTE DOCUMENTO
Este arquivo serve como o **ponto de referência definitivo e imutável** para o assistente de IA e desenvolvedores. Qualquer alteração futura deve **obrigatoriamente preservar todas as regras, contratos de dados, rotas e comportamentos descritos aqui**.

---

## 🏗️ 1. ARQUITETURA DE DADOS: SUPABASE COMO FONTE ÚNICA DA VERDADE

1. **Autoridade Absoluta:**
   - O **Supabase** é a **ÚNICA** base de dados válida e ativa da aplicação.
   - Não há fallback silencioso que ressuscite dados antigos ou gere divisão de dados (*split-brain*).
   - O `localStorage` do navegador é utilizado estritamente para manter a sessão do usuário logado e o tema (claro/escuro), **nunca** para mesclar ocorrências.

2. **Credenciais Supabase:**
   - **URL:** `https://mowvehesrsawbxqhtytk.supabase.co`
   - **Tabelas Canônicas:**
     - `schools` (10 escolas da rede municipal cadastradas)
     - `users` (10 usuários de todos os perfis cadastrados)
     - `occurrences` (todas as ocorrências ativas com histórico e vistos)

3. **Encapsulamento de Metadados Ricos:**
   - O campo `observations` da tabela `occurrences` utiliza o marcador seguro `<!--POME_META_START-->...<!--POME_META_END-->` para transportar com fidelidade total:
     - Lista de estudantes (`students`: array de alunos com responsável, telefone, turma, turno e matéria).
     - Matriz de sentimentos (`feelings` e `feelings_observations`).
     - Classificações detalhadas (`classifications`).
     - Encaminhamentos da direção (`direction_referrals`).
     - Histórico de edições e autoria (`editHistory`).
     - Visto formal da Diretoria (`directorNotes`).

---

## 🛡️ 2. SISTEMA DE BACKUP CONTÍNUO & RESILIÊNCIA TOTAL

1. **Backups Automáticos por Evento:**
   - Toda gravação no banco (nova ocorrência, edição, visto da diretoria, exclusão, novo cadastro de usuário) dispara um snapshot de segurança imediato.
2. **Compatibilidade Vercel Serverless (Zero Erros EROFS):**
   - O motor `backupEngine` (`server/db.js`) armazena backups em buffer de memória e em `/tmp`, sendo 100% imune a sistemas de arquivos somente leitura da Vercel (`/var/task`).
3. **Download Instantâneo no Navegador:**
   - O botão **"Fazer Backup (JSON)"** presente no Dashboard, no Painel de Administração e no modal **Meu Perfil** gera um Blob JSON direto para download na máquina do usuário.
4. **Restauração de Emergência:**
   - Possui upload de arquivo `.json` para restauração direta de todo o Supabase com 1 clique.

---

## 👥 3. PERFIS DE ACESSO E REGRAS DE NEGÓCIO

| Perfil | Escopo de Visualização | Principais Permissões |
|---|---|---|
| **Super Admin** | Todas as 10 Escolas | Controle total, Auditoria Master, Impersonação, Backups, Gestão de Usuários e Escolas. |
| **SEDUC / Gestor** | Todas as 10 Escolas | Visão global da rede, Exportação SPSS, Gerenciar Usuários/Escolas, Backups. |
| **Diretor(a)** | Escola Vinculada | Acompanhamento da unidade, emissão de **Visto da Diretoria**, Relatórios da Direção. |
| **Pedagogo(a)** | Escola Vinculada | Registro de Atendimentos (5 Passos), salvamento de rascunhos, emissão de Ficha A4. |
| **Assistente** | Escola Vinculada | Apoio ao registro de mediação e atendimentos da escola. |

---

## 📋 4. FLUXO DO FORMULÁRIO DE ATENDIMENTO (5 PASSOS)

- **Passo 1 — Identificação dos Estudantes:** Suporte a múltiplos estudantes, responsável, grau de parentesco, contato, turma, turno, professor e componente curricular.
  - *Navegação:* Botões **"⬅️ Voltar / Cancelar"**, **"💾 Salvar Rascunho"**, **"🔍 Ir para Revisão"** e **"Continuar para Passo 2 ➡️"**.
- **Passo 2 — Relato do Fato & Classificações:** Descrição minuciosa dos acontecimentos e tipificação jurídica/pedagógica conforme Glossário da SEDUC.
- **Passo 3 — Sentimentos e Emoções:** Levantamento dos sentimentos envolvidos (Tristeza, Medo, Raiva, Frustração, Insegurança, etc.) e observações qualitativas.
- **Passo 4 — Encaminhamentos Pedagógicos e da Direção:** Ações imediatas, combinados escolares e encaminhamentos para rede externa (Conselho Tutelar, CREAS, Saúde Mental, etc.).
- **Passo 5 — Revisão Geral e Finalização:** Resumo de todos os dados preenchidos com opção de salvar como rascunho ou homologar como finalizado.

---

## 🔌 5. ROTAS DE API (BACKEND EXPRESS / SERVERLESS)

- `POST /api/login` — Autenticação por CPF/E-mail institucional com suporte a perfis e aliases.
- `POST /api/register` — Autocadastro com conformidade LGPD e confirmação via Supabase Auth.
- `GET /api/schools` & `POST /api/schools` & `DELETE /api/schools/:id` — CRUD de escolas no Supabase.
- `GET /api/occurrences` — Consulta de ocorrências filtradas por papel e escola diretamente no Supabase.
- `POST /api/occurrences` — Persistência atômica de ocorrência no Supabase + backup automático.
- `DELETE /api/occurrences/:id` — Exclusão protegida no Supabase + backup automático.
- `GET /api/users` & `POST /api/users` & `PUT /api/users/:id` & `DELETE /api/users/:id` — CRUD de usuários no Supabase.
- `PUT /api/profile` — Atualização de perfil próprio e troca de senha.
- `GET /api/admin/metrics` — Telemetria de uptime, status do Supabase e contagens.
- `GET /api/admin/logs` & `DELETE /api/admin/logs` — Auditoria e logs de requisições.
- `GET /api/admin/backups` & `POST /api/admin/backups` — Listagem e disparo de backups.
- `GET /api/admin/backups/export/download` — Download direto de backup do Supabase.
- `POST /api/admin/backups/restore` — Restauração de base Supabase a partir de payload JSON.
- `POST /api/admin/impersonate` — Navegação em auditoria master (Super Admin).

---

## ⚠️ 6. DIRETRIZES FUNDAMENTAIS PARA PRÓXIMAS ALTERAÇÕES ("O QUE NUNCA QUEBRAR")
1. **NÃO reintroduzir mesclagem com `localStorage`** no carregamento de ocorrências. O Supabase é a verdade.
2. **NÃO utilizar escrita síncrona obrigatória em disco** que quebre o ambiente serverless da Vercel.
3. **NÃO alterar os marcadores `<!--POME_META_START-->`** para evitar corrupção de metadados em ocorrências já registradas.
4. **SEMPRE validar a compilação do frontend (`npm run build`)** antes de realizar commits.
5. **PRESERVAR a experiência visual fluida**, modo escuro/claro, avisos em toast e navegações em 5 passos.

---
*Documento gerado e validado em 25/08/2026 como base sólida da aplicação POME Contagem.*
