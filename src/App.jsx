import React, { useState, useEffect } from 'react';
import './App.css';
import logoVetor from './logo-vetor.svg';

// SVG Logo Component (Circle of kids around a house with a heart)
const Logo = ({ iconOnly = false, ...props }) => {
  if (iconOnly) {
    return (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        {/* Magnifying glass handle */}
        <path d="M 62 62 L 78 78" stroke="#1c355e" strokeWidth="7.5" strokeLinecap="round" />
        {/* Blue Ring Segment */}
        <path d="M 60 60 A 25 25 0 0 1 20 34" stroke="#1c355e" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* Teal Ring Segment */}
        <path d="M 25 25 A 25 25 0 0 1 61 24" stroke="#20a894" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* Green Ring Segment */}
        <path d="M 65 30 A 25 25 0 0 1 63 56" stroke="#3da35d" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* People Icons */}
        <circle cx="34" cy="42" r="3" fill="#2b5ba2" />
        <rect x="31" y="47" width="6" height="12" rx="3" fill="#2b5ba2" />
        <circle cx="45" cy="35" r="3" fill="#20a894" />
        <rect x="42" y="40" width="6" height="19" rx="3" fill="#20a894" />
        <circle cx="56" cy="28" r="3" fill="#3da35d" />
        <rect x="53" y="33" width="6" height="26" rx="3" fill="#3da35d" />
      </svg>
    );
  }

  // Full Logomarca matching the official logo-vetor.svg
  return (
    <img 
      src={logoVetor} 
      alt="POME Logo" 
      {...props} 
      style={{ display: 'block', maxWidth: '100%', height: 'auto', ...props.style }} 
    />
  );
};

// Outline Icons
const IconHome = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconSearch = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconSchool = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

const IconUsers = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
  </svg>
);

const IconFolder = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const IconWarning = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconShield = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconActivity = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const IconHeart = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconPrinter = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

const IconTrash = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const EyeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const IconServer = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

const IconDatabase = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const IconRefresh = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const IconDownload = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconLightning = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

// Constants: Grade Cycles / Anos
const GRADE_CYCLES = [
  '1º Ano', '2º Ano', '3º Ano', '4º Ano', '5º Ano',
  '6º Ano', '7º Ano', '8º Ano', '9º Ano',
  'EJA 1º segmento', 'EJA 2º segmento'
];

// Constants: New 3-Level Scientific Taxonomy (Natureza -> Dimensões -> Termos)
const TAXONOMY_TREE = {
  'Natureza: Perturbadora': {
    'Descumprimento de normas escolares': [
      'Indisciplina recorrente',
      'Saída injustificada da sala',
      'Uso indevido de aparelhos eletrônicos',
      'Incivilidade (desordens, provocações, zombarias, falta de polidez, interrupções, indiferença)',
      'Transgressão'
    ],
    'Intimidação isolada': [
      'Intimidação (ato isolado, não sistemático)'
    ]
  },
  'Natureza: Agressiva e/ou Violenta': {
    'Violências interpessoais': [
      'Agressão física',
      'Agressão verbal',
      'Ameaça',
      'Intimidação sistemática (bullying)',
      'Intimidação sistemática virtual (cyberbullying)',
      'Cyberagressão',
      'Sexting não consensual',
      'Shaming',
      'Linchamento virtual',
      'Violência psicológica',
      'Assédio moral',
      'Assédio moral institucional / violência institucional',
      'Perseguição (stalking)',
      'Extorsão',
      'Violência entre grupos ou gangues'
    ],
    'Discriminação e preconceito (violências estruturais)': [
      'Racismo',
      'Injúria racial',
      'LGBTfobia (homofobia/transfobia)',
      'Machismo',
      'Misoginia',
      'Classismo',
      'Gordofobia',
      'Capacitismo',
      'Xenofobia',
      'Discriminação regional',
      'Preconceito religioso',
      'Preconceito linguístico',
      'Preconceito socioeconômico',
      'Discriminação por aparência',
      'Discriminação por gênero',
      'Etarismo'
    ],
    'Violência sexual': [
      'Assédio sexual',
      'Abuso sexual',
      'Importunação sexual',
      'Estupro / estupro de vulnerável',
      'Exploração sexual',
      'Divulgação não consensual de imagem íntima'
    ],
    'Patrimônio escolar': [
      'Furto e/ou roubo',
      'Dano ao patrimônio (depredação)',
      'Incêndio ou tentativa de incêndio'
    ]
  },
  'Natureza: Situações de risco': {
    'Situações de risco': [
      'Automutilação / autolesão',
      'Ideação ou tentativa de suicídio',
      'Uso, porte ou consumo de álcool e outras drogas',
      'Indícios de violência doméstica/familiar',
      'Negligência ou evasão escolar recorrente',
      'Porte de arma'
    ]
  }
};

// Constants: Sentimentos Identificados (CNV - Comunicação Não-Violenta)
const FEELINGS_LIST = [
  'Alegria', 'Alívio', 'Ansiedade', 'Confusão',
  'Culpa', 'Esperança', 'Frustração', 'Impotência',
  'Insegurança', 'Medo', 'Preocupação', 'Raiva',
  'Solidão', 'Tristeza', 'Vergonha', 'Outro'
];

// Constants: Encaminhamentos Direção / Rede de Proteção
const DIRECTION_REFERRALS_LIST = [
  'Conselho tutelar',
  'Rede de saúde (UBS/CAPS)',
  'Assistente social (CRAS/CREAS)',
  'Articulador de território',
  'Outro'
];

// Helper: Initial single student structure
const createDefaultStudent = () => ({
  studentName: '',
  sex: '',
  turn: '',
  gradeCycle: '',
  className: '',
  teacherName: '',
  subject_matter: '',
  guardian: {
    name: '',
    bond: 'Mãe',
    customBond: '',
    contact: ''
  }
});

// Helper: Anonymize name for LGPD compliance (e.g., "Gabriel Souza Lima" -> "G. S. L.")
const anonymizeText = (text, isAnonymized = false) => {
  if (!text) return '';
  if (!isAnonymized) return text;
  return text
    .split(' ')
    .filter(Boolean)
    .map(word => word[0].toUpperCase() + '.')
    .join(' ');
};

// Comprehensive Profile Tutorials & Permissions Dictionary
const ROLE_TUTORIALS_DATA = {
  pedagogo: {
    roleKey: 'pedagogo',
    name: 'Pedagogo(a) / Coordenação Pedagógica',
    icon: '🎓',
    color: '#d97706',
    tagline: 'Atendimento direto, escuta ativa (CNV), mediação e registro de ocorrências escolares.',
    overview: 'O perfil de Pedagogo(a) é o coração da mediação escolar. Ele é responsável pelo acolhimento de estudantes e responsáveis, realização de escuta qualificada sem julgamentos morais, registro das ocorrências com a taxonomia de 3 níveis, aplicação de práticas restaurativas e acompanhamento contínuo.',
    permissions: {
      allowed: [
        'Cadastrar novos atendimentos e ocorrências no fluxo estruturado em 5 etapas',
        'Incluir múltiplos estudantes, turnos, turmas, professores e responsáveis no mesmo registro',
        'Mapear sentimentos identificados na escuta ativa baseada em Comunicação Não-Violenta (CNV)',
        'Classificar ocorrências nas dimensões: Perturbadoras, Agressivas/Violentas ou Situações de Risco',
        'Salvar ocorrências em modo "Rascunho" para complementação posterior com total privacidade',
        'Editar e excluir suas próprias ocorrências ANTES que a diretoria emita o visto formal',
        'Acessar "Meus Relatórios" com distribuição por turma, sentimentos e exportação em planilha CSV',
        'Imprimir a ficha oficial de atendimento formatada para papel A4 com opção de anonimização (LGPD)'
      ],
      restricted: [
        'Não pode visualizar os rascunhos particulares de outros pedagogos',
        'Não pode alterar ou excluir ocorrências após a emissão do Visto da Diretoria',
        'Não tem acesso às ocorrências de outras escolas da rede municipal',
        'Não pode preencher o campo exclusivo de parecer/visto da diretoria escolar'
      ]
    },
    steps: [
      { step: '1', title: 'Iniciar Atendimento', desc: 'No Painel Principal, clique em "+ Nova Ocorrência" e preencha os dados dos estudantes e responsáveis atendidos.' },
      { step: '2', title: 'Relato e Classificação', desc: 'Descreva detalhadamente o ocorrido no campo de Assunto e selecione os termos da taxonomia científica.' },
      { step: '3', title: 'Escuta Ativa (CNV)', desc: 'Identifique os sentimentos expressos pelos envolvidos (Ansiedade, Frustração, Raiva, etc.) sem rotulá-los.' },
      { step: '4', title: 'Medidas e Encaminhamentos', desc: 'Registre as ações escolares acordadas e, se necessário, marque encaminhamentos à rede de proteção externa.' },
      { step: '5', title: 'Salvar ou Rascunho', desc: 'Revise todas as informações. Escolha "Salvar como Rascunho" se faltar informação ou "Finalizar e Salvar" para concluir.' }
    ],
    lgpd: 'Assegure-se de ativar o modo "Anonimizar (LGPD)" ao exibir telas ou relatórios em reuniões pedagógicas amplas, garantindo a proteção da identidade de crianças e adolescentes conforme a Lei 13.709/2018.'
  },
  diretor: {
    roleKey: 'diretor',
    name: 'Diretor(a) Escolar',
    icon: '🏫',
    color: '#059669',
    tagline: 'Gestão institucional, homologação de vistos, pareceres diretivos e articulação da rede de proteção.',
    overview: 'A Direção Escolar possui a atribuição de acompanhar o clima da unidade, analisar todos os atendimentos registrados pelos pedagogos, emitir pareceres formais (Vistos da Diretoria), acionar os órgãos de garantia de direitos e liderar as ações preventivas na escola.',
    permissions: {
      allowed: [
        'Visualizar todas as ocorrências finalizadas registradas na sua escola',
        'Emitir o Visto Oficial e Parecer da Diretoria com plano de acompanhamento institucional',
        'Consultar o Relatório de Gestão Escolar com taxa de homologação de vistos e pendências',
        'Analisar a distribuição de ocorrências por turma, turno, componente curricular e professor',
        'Monitorar encaminhamentos oficiais a órgãos externos (Conselho Tutelar, CAPS, CRAS/CREAS)',
        'Imprimir a ficha completa de atendimento em folha A4 com bloco de assinaturas formais',
        'Exportar planilha em formato CSV de todas as ocorrências da unidade escolar'
      ],
      restricted: [
        'Não pode visualizar dados de outras unidades escolares da rede municipal',
        'Não pode excluir ocorrências da base (garantia de preservação do histórico institucional)',
        'Não pode emitir visto em ocorrências que ainda estejam no status de Rascunho pelo pedagogo'
      ]
    },
    steps: [
      { step: '1', title: 'Filtrar Pendências', desc: 'No Painel Principal, localize as ocorrências com badge amarelo "Pendente" ou use o filtro do dashboard.' },
      { step: '2', title: 'Analisar o Atendimento', desc: 'Clique no botão "Detalhes" para ler o relato dos fatos, sentimentos mapeados e ações tomadas pela equipe pedagógica.' },
      { step: '3', title: 'Emitir o Visto Oficial', desc: 'No bloco "Observações da Diretoria", registre o parecer formal e clique em "Confirmar Visto da Diretoria".' },
      { step: '4', title: 'Acionar Rede Externa', desc: 'Em casos de violação de direitos ou risco, articule o encaminhamento formal junto ao Conselho Tutelar/CAPS.' },
      { step: '5', title: 'Monitorar Indicadores', desc: 'Acesse a aba "Relatórios da Direção" para acompanhar turmas com maior incidência e taxa de vistos emitidos.' }
    ],
    lgpd: 'O Diretor é o guardião legal dos registros físicos e digitais na unidade. Fichas impressas devem ser arquivadas em prontuários sob chave e sigilo funcional.'
  },
  assistente: {
    roleKey: 'assistente',
    name: 'Assistente / Mediador(a) de Conflitos',
    icon: '🤝',
    color: '#0ea5e9',
    tagline: 'Apoio ao acolhimento, escuta inicial e colaboração no registro de mediações escolares.',
    overview: 'O(A) Assistente ou Mediador(a) atua no suporte operacional e acolhimento direto dos estudantes, auxiliando na identificação precoce de conflitos, registro de atendimentos preliminares e articulação com a coordenação pedagógica.',
    permissions: {
      allowed: [
        'Registrar novas ocorrências e acolhimentos de mediação no sistema',
        'Mapear sentimentos (CNV) e aplicar a taxonomia científica de conflitos',
        'Salvar rascunhos para posterior complementação com a equipe pedagógica',
        'Consultar o histórico de ocorrências registradas em sua unidade escolar',
        'Acessar relatórios pedagógicos e exportar dados em formato CSV',
        'Imprimir fichas de atendimento em formato A4'
      ],
      restricted: [
        'Não pode acessar dados de outras escolas da rede municipal',
        'Não pode emitir visto ou parecer oficial da diretoria escolar',
        'Não pode excluir ocorrências de outros usuários ou que já tenham recebido visto da direção'
      ]
    },
    steps: [
      { step: '1', title: 'Acolhimento Inicial', desc: 'Abra o formulário de Nova Ocorrência para registrar o atendimento inicial e os estudantes envolvidos.' },
      { step: '2', title: 'Escuta e Mediação', desc: 'Registre o relato da mediação e mapeie as emoções observadas no diálogo.' },
      { step: '3', title: 'Encaminhamento Interno', desc: 'Compartilhe o caso com o Pedagogo ou Diretor da unidade para acompanhamento integrado.' }
    ],
    lgpd: 'Mantenha total discrição e sigilo funcional em relação a qualquer conversa ou dado sociofamiliar obtido no atendimento.'
  },
  gestor: {
    roleKey: 'gestor',
    name: 'Gestor(a) SEDUC / Secretaria Municipal de Educação',
    icon: '🌐',
    color: '#1e40af',
    tagline: 'Supervisão macro da rede, formulação de políticas públicas e governança educacional.',
    overview: 'A equipe gestora da SEDUC possui visão analítica panorâmica sobre todas as unidades escolares do município. Utiliza os dados de clima escolar para identificar demandas regionais, apoiar equipes pedagógicas e subsidiar formações continuadas.',
    permissions: {
      allowed: [
        'Visualização consolidada de todas as ocorrências em TODAS as escolas do município',
        'Cadastrar, editar e gerenciar unidades escolares da rede municipal',
        'Cadastrar, vincular e gerenciar contas de usuários (Diretores, Pedagogos, Assistentes)',
        'Acessar o Relatório Consolidado de Clima Escolar com comparativo entre escolas',
        'Exportar bases de dados completas em formato SPSS (para pesquisas estatísticas) e CSV',
        'Filtrar ocorrências por qualquer escola, ciclo, natureza ou período',
        'Editar ou excluir ocorrências para saneamento ou correção de dados'
      ],
      restricted: [
        'Não possui acesso ao módulo de infraestrutura técnica/backups (exclusivo do Super Admin)',
        'Não possui funcionalidade de impersonação de contas'
      ]
    },
    steps: [
      { step: '1', title: 'Monitorar a Rede', desc: 'Consulte os cards de métricas globais e filtre por escolas específicas no Painel Principal.' },
      { step: '2', title: 'Gerenciar Escolas e Usuários', desc: 'Acesse as abas "Gerenciar Escolas" e "Gerenciar Usuários" para criar unidades e delegar acessos.' },
      { step: '3', title: 'Exportar para Pesquisa (SPSS)', desc: 'Na aba "Relatórios de Gestão", clique em "Exportar SPSS" para obter a base estruturada para análise acadêmica.' },
      { step: '4', title: 'Planejamento Estratégico', desc: 'Utilize os indicadores de situações de risco para direcionar equipes de apoio psicossocial às escolas prioritárias.' }
    ],
    lgpd: 'Tratamento de dados em conformidade com o Art. 7º e 11 da LGPD para execução de políticas públicas educacionais.'
  },
  seduc: {
    roleKey: 'seduc',
    name: 'SEDUC / Equipe Técnica da Secretaria',
    icon: '🌐',
    color: '#1e40af',
    tagline: 'Acompanhamento pedagógico regional e monitoramento de indicadores de clima escolar.',
    overview: 'Membros da equipe técnica da Secretaria de Educação possuem acesso analítico a todas as unidades escolares para suporte, orientação formativa e articulação com órgãos do município.',
    permissions: {
      allowed: [
        'Visualização de ocorrências de toda a rede municipal de ensino',
        'Emissão de relatórios consolidados em SPSS e CSV',
        'Gestão de unidades escolares e contas pedagógicas',
        'Filtro dinâmico por dimensões, escolas e turmas'
      ],
      restricted: [
        'Não possui acesso ao módulo de backups e telemetria do Super Admin'
      ]
    },
    steps: [
      { step: '1', title: 'Diagnóstico da Rede', desc: 'Acesse o Painel Principal e Relatórios de Gestão para monitorar ocorrências em toda a rede.' },
      { step: '2', title: 'Apoio às Unidades', desc: 'Identifique escolas com maior taxa de casos críticos e organize intervenções preventivas.' }
    ],
    lgpd: 'Uso estritamente institucional dos dados estatísticos conforme a legislação vigente.'
  },
  superadmin: {
    roleKey: 'superadmin',
    name: 'Super Administrador (Master Admin)',
    icon: '👑',
    color: '#7c3aed',
    tagline: 'Acesso total, telemetria em tempo real, auditoria, impersonação e recuperação de desastres.',
    overview: 'O perfil de Super Administrador Master detém privilégios totais sobre a plataforma. É responsável pela governança técnica, segurança da informação, auditoria em tempo real, suporte através de impersonação e execução de backups contínuos.',
    permissions: {
      allowed: [
        'Acesso irrestrito a todas as páginas, escolas, usuários e ocorrências da plataforma',
        'Aba exclusiva "⚡ Administração do Sistema" com telemetria de CPU, RAM, Uptime e Banco',
        'Impersonação instantânea de qualquer conta para auditoria e suporte técnico em 1 clique',
        'Geração manual e automática de snapshots de Backup com download JSON e restauração completa',
        'Console de Logs de Auditoria LGPD e Erros do Sistema em tempo real',
        'Acesso a todos os relatórios da rede, exportações SPSS e gerenciamento completo'
      ],
      restricted: [
        'Nenhuma restrição técnica (Acesso Total de Nível Raiz / Master)'
      ]
    },
    steps: [
      { step: '1', title: 'Verificar Telemetria', desc: 'No painel de Administração, monitore a integridade do banco (Supabase/Local) e consumo de memória.' },
      { step: '2', title: 'Auditoria e Impersonação', desc: 'Utilize a central de impersonação para inspecionar exatamente o que pedagogos e diretores visualizam.' },
      { step: '3', title: 'Backups de Segurança', desc: 'Gere snapshots manuais antes de manutenções e teste a restauração caso necessário.' },
      { step: '4', title: 'Análise de Logs', desc: 'Filtre os logs de severidade ERROR e AUDIT para garantir conformidade e rastreabilidade total.' }
    ],
    lgpd: 'Responsabilidade primária pela segurança técnica da base, criptografia e guarda dos backups em conformidade com a LGPD.'
  }
};

function App() {
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [tutorialTab, setTutorialTab] = useState('welcome');
  const [showTutorialModal, setShowTutorialModal] = useState(false);

  // Dynamic Role Tutorial State
  const [showRoleTutorialModal, setShowRoleTutorialModal] = useState(false);
  const [tutorialSelectedRole, setTutorialSelectedRole] = useState('pedagogo');
  const [tutorialSubTab, setTutorialSubTab] = useState('overview');

  // Authentication & Session
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  // Impersonation State (Super Admin viewing as another user)
  const [impersonatedOriginalUser, setImpersonatedOriginalUser] = useState(() => {
    const saved = localStorage.getItem('impersonatedOriginalUser');
    return saved ? JSON.parse(saved) : null;
  });

  // Admin Telemetry & Control Panel States (Super Admin)
  const [adminMetrics, setAdminMetrics] = useState(null);
  const [adminLogs, setAdminLogs] = useState([]);
  const [adminBackups, setAdminBackups] = useState([]);
  const [logFilterLevel, setLogFilterLevel] = useState('ALL');
  const [impersonateSearch, setImpersonateSearch] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);
  const [backupActionStatus, setBackupActionStatus] = useState('');
  
  const [loginData, setLoginData] = useState({ cpf: '', password: '' });
  const [loginError, setLoginError] = useState('');

  // Self-Registration Modal State (Apontamento 1: Cadastro com LGPD)
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showFullLgpdTerms, setShowFullLgpdTerms] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerData, setRegisterData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    role: 'pedagogo',
    schoolId: '',
    password: '',
    lgpd_accepted: false
  });
  
  // App States
  const [occurrences, setOccurrences] = useState([]);
  const [schools, setSchools] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterNature, setFilterNature] = useState('');
  const [filterSchool, setFilterSchool] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [dashboardFilter, setDashboardFilter] = useState('all');
  
  // Modals & Forms
  const [showForm, setShowForm] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [selectedOccurrence, setSelectedOccurrence] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [anonymizeView, setAnonymizeView] = useState(false);
  
  // Director Observation Temp State
  const [directorNotes, setDirectorNotes] = useState('');

  // School/User Creation States (Gestor)
  const [newSchoolName, setNewSchoolName] = useState('');
  const [editingSchool, setEditingSchool] = useState(null);
  const [newUserData, setNewUserData] = useState({ 
    name: '', cpf: '', email: '', phone: '', password: '', role: 'pedagogo', schoolId: '', classesInput: '' 
  });

  // Progressive Form State (5 Steps)
  const initialFormState = {
    id: '',
    schoolId: '',
    students: [createDefaultStudent()],
    date: new Date().toISOString().split('T')[0],
    
    // Passo 2: Assunto e Classificações
    subject: '',
    classifications: [],
    type: '',
    
    // Passo 3: Sentimentos Identificados (CNV)
    feelings: [],
    customFeeling: '',
    feelings_observations: '',
    
    // Passo 4: Encaminhamentos e Rede de Proteção
    referrals: '',
    observations: '',
    direction_referrals: [],
    customDirectionReferral: '',
    
    // Passo 5 / Controle
    directorNotes: '',
    status: 'rascunho'
  };

  const [formData, setFormData] = useState(initialFormState);

  // Apply theme to HTML tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // API Calls
  const fetchSchools = async () => {
    try {
      const res = await fetch('/api/schools');
      if (res.ok) {
        const data = await res.json();
        setSchools(data);
        return data;
      }
    } catch (err) {
      console.error('Error fetching schools:', err);
    }
    return null;
  };

  const fetchOccurrences = async () => {
    if (!user) return null;
    try {
      const url = `/api/occurrences?schoolId=${user.schoolId || ''}&role=${user.role}&userId=${user.id}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setOccurrences(data);
        return data;
      }
    } catch (err) {
      console.error('Error fetching occurrences:', err);
    }
    return null;
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        setUsersList(data);
        return data;
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
    return null;
  };

  const fetchAdminData = async () => {
    try {
      setAdminLoading(true);
      const [metricsRes, logsRes, backupsRes] = await Promise.all([
        fetch('/api/admin/metrics'),
        fetch(`/api/admin/logs?level=${logFilterLevel === 'ALL' ? '' : logFilterLevel}`),
        fetch('/api/admin/backups')
      ]);
      if (metricsRes.ok) setAdminMetrics(await metricsRes.json());
      if (logsRes.ok) setAdminLogs(await logsRes.json());
      if (backupsRes.ok) setAdminBackups(await backupsRes.json());
    } catch (err) {
      console.error('Error loading admin telemetry data:', err);
    } finally {
      setAdminLoading(false);
    }
  };

  useEffect(() => {
    const initApp = async () => {
      if (user) {
        try {
          const promises = [fetchSchools(), fetchOccurrences(), fetchUsers()];
          if (user.role === 'superadmin' || impersonatedOriginalUser) {
            promises.push(fetchAdminData());
          }
          await Promise.all(promises);
        } catch (err) {
          console.error('Error loading initial data:', err);
        }
      } else {
        await fetchSchools();
      }
      setLoading(false);
    };
    initApp();
  }, [user]);

  // Handler: Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      if (res.ok) {
        const loggedUser = await res.json();
        setUser(loggedUser);
        localStorage.setItem('user', JSON.stringify(loggedUser));
        setActiveTab(loggedUser.role === 'superadmin' ? 'sysadmin' : 'dashboard');
      } else {
        const data = await res.json();
        setLoginError(data.error || 'Credenciais inválidas.');
      }
    } catch (err) {
      console.error('Login connection error:', err);
      setLoginError('Erro ao conectar ao servidor.');
    }
  };

  // Handler: Self-Registration (Apontamento 1)
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');

    if (!registerData.lgpd_accepted) {
      setRegisterError('Você deve concordar com os termos da LGPD e sigilo.');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });
      if (res.ok) {
        setRegisterSuccess('Cadastro realizado com sucesso! Você já pode realizar o login imediatamente com seu CPF/E-mail e senha.');
        setRegisterData({
          name: '', cpf: '', email: '', phone: '', role: 'pedagogo', schoolId: '', password: '', lgpd_accepted: false
        });
        setTimeout(() => {
          setShowRegisterModal(false);
          setRegisterSuccess('');
        }, 2500);
      } else {
        const data = await res.json();
        setRegisterError(data.error || 'Erro ao realizar cadastro.');
      }
    } catch (err) {
      console.error('Register connection error:', err);
      setRegisterError('Erro de conexão com o servidor.');
    }
  };

  // Handler: Impersonate (Super Admin logging as any user)
  const handleImpersonate = async (targetUser) => {
    if (!confirm(`Deseja entrar na conta de ${targetUser.name} (${targetUser.role.toUpperCase()}) para auditoria e suporte?`)) return;
    try {
      const res = await fetch('/api/admin/impersonate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId: targetUser.id })
      });
      if (res.ok) {
        const impersonatedUser = await res.json();
        
        // Preserve the original Root Super Admin (never overwrite with an impersonated user)
        const rootSuperAdmin = impersonatedOriginalUser || user;
        setImpersonatedOriginalUser(rootSuperAdmin);
        localStorage.setItem('impersonatedOriginalUser', JSON.stringify(rootSuperAdmin));
        
        // Switch current user
        setUser(impersonatedUser);
        localStorage.setItem('user', JSON.stringify(impersonatedUser));
        setActiveTab('dashboard');
      } else {
        alert('Erro ao iniciar impersonação de conta.');
      }
    } catch (err) {
      console.error('Error during impersonation:', err);
      alert('Erro ao conectar ao servidor.');
    }
  };

  // Handler: Stop Impersonation (Cleanly return to Super Admin)
  const handleStopImpersonation = () => {
    const rootSuperAdmin = impersonatedOriginalUser || JSON.parse(localStorage.getItem('impersonatedOriginalUser') || 'null');
    if (rootSuperAdmin) {
      // Clear impersonation state first
      setImpersonatedOriginalUser(null);
      localStorage.removeItem('impersonatedOriginalUser');
      
      // Restore Super Admin session
      setUser(rootSuperAdmin);
      localStorage.setItem('user', JSON.stringify(rootSuperAdmin));
      setActiveTab('sysadmin');
      setTimeout(fetchAdminData, 100);
    }
  };

  // Handler: Create Manual Backup
  const handleCreateBackup = async (label = 'manual') => {
    try {
      setBackupActionStatus('Gerando backup...');
      const res = await fetch('/api/admin/backups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label })
      });
      if (res.ok) {
        setBackupActionStatus('✅ Backup gerado com sucesso!');
        fetchAdminData();
        setTimeout(() => setBackupActionStatus(''), 4000);
      } else {
        alert('Erro ao criar backup.');
        setBackupActionStatus('');
      }
    } catch (err) {
      console.error('Error creating backup:', err);
      alert('Erro ao gerar backup.');
      setBackupActionStatus('');
    }
  };

  // Handler: Restore Backup
  const handleRestoreBackup = async (filename) => {
    if (!confirm(`⚠️ ATENÇÃO: Deseja restaurar a base de dados a partir do arquivo "${filename}"?\n\nOs dados atuais serão atualizados com as informações deste backup.`)) return;
    try {
      setBackupActionStatus('Restaurando dados do backup...');
      const res = await fetch('/api/admin/backups/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename })
      });
      if (res.ok) {
        setBackupActionStatus('✅ Base de dados restaurada com sucesso!');
        await Promise.all([fetchSchools(), fetchOccurrences(), fetchUsers(), fetchAdminData()]);
        setTimeout(() => setBackupActionStatus(''), 4000);
      } else {
        const err = await res.json();
        alert(err.error || 'Erro ao restaurar backup.');
        setBackupActionStatus('');
      }
    } catch (err) {
      console.error('Error restoring backup:', err);
      alert('Erro de conexão ao restaurar backup.');
      setBackupActionStatus('');
    }
  };

  // Handler: Clear Logs
  const handleClearLogs = async () => {
    if (!confirm('Deseja realmente limpar todos os logs de atividade em memória?')) return;
    try {
      const res = await fetch('/api/admin/logs', { method: 'DELETE' });
      if (res.ok) fetchAdminData();
    } catch (err) {
      console.error('Error clearing logs:', err);
    }
  };

  // Handler: Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setImpersonatedOriginalUser(null);
    localStorage.removeItem('impersonatedOriginalUser');
    setActiveTab('dashboard');
    setShowForm(false);
    setFormStep(1);
    setSearchQuery('');
    setFilterNature('');
    setFilterSchool('');
    setFilterClass('');
    setSelectedOccurrence(null);
    setShowDetailModal(false);
    setLoginData({ cpf: '', password: '' });
    setLoginError('');
    window.location.href = '/';
  };

  // Handler: Save Occurrence (5 Steps)
  const handleSaveOccurrence = async (status = 'finalizado') => {
    const primaryType = formData.classifications && formData.classifications.length > 0
      ? formData.classifications[0]
      : 'Atendimento Geral';

    const firstStudent = formData.students[0] || createDefaultStudent();

    const payload = {
      ...formData,
      type: primaryType,
      status: status,
      studentName: firstStudent.studentName,
      gradeCycle: firstStudent.gradeCycle,
      className: firstStudent.className,
      teacherName: firstStudent.teacherName,
      subject_matter: firstStudent.subject_matter,
      guardianName: firstStudent.guardian?.name || '',
      contacts: firstStudent.guardian?.contact || '',
      schoolId: user.schoolId || formData.schoolId || schools[0]?.id,
      createdById: formData.createdById || user.id,
      createdByName: formData.createdByName || user.name,
      updatedAt: new Date().toISOString(),
      updatedById: user.id,
      updatedByName: user.name
    };

    try {
      const res = await fetch('/api/occurrences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await fetchOccurrences();
        setShowForm(false);
        setFormData(initialFormState);
        setFormStep(1);
      } else {
        const err = await res.json();
        alert(err.error || 'Erro ao salvar ocorrência.');
      }
    } catch (err) {
      console.error('Save occurrence connection error:', err);
      alert('Erro de conexão ao salvar ocorrência.');
    }
  };

  // Handler: Load Occurrence for Editing
  const handleEditOccurrence = (occ) => {
    const studentsList = Array.isArray(occ.students) && occ.students.length > 0
      ? occ.students
      : [{
          studentName: occ.studentName || '',
          sex: occ.sex || '',
          turn: occ.turn || '',
          gradeCycle: occ.gradeCycle || '',
          className: occ.className || '',
          teacherName: occ.teacherName || '',
          subject_matter: occ.subject_matter || '',
          guardian: {
            name: occ.guardianName || (occ.attended_people?.[0]?.name || ''),
            bond: occ.attended_people?.[0]?.bond || 'Mãe',
            customBond: '',
            contact: occ.contacts || (occ.attended_people?.[0]?.contact || '')
          }
        }];

    setFormData({
      id: occ.id,
      schoolId: occ.schoolId,
      students: studentsList,
      date: occ.date || new Date().toISOString().split('T')[0],
      subject: occ.subject || '',
      classifications: Array.isArray(occ.classifications) ? occ.classifications : (occ.type ? [occ.type] : []),
      type: occ.type || '',
      feelings: Array.isArray(occ.feelings) ? occ.feelings : [],
      customFeeling: '',
      feelings_observations: occ.feelings_observations || '',
      referrals: occ.referrals || '',
      observations: occ.observations || '',
      direction_referrals: Array.isArray(occ.direction_referrals) ? occ.direction_referrals : [],
      customDirectionReferral: '',
      directorNotes: occ.directorNotes || '',
      status: occ.status || 'finalizado',
      createdById: occ.createdById,
      createdByName: occ.createdByName
    });
    setShowForm(true);
    setFormStep(1);
  };

  // Handler: Delete Occurrence
  const handleDeleteOccurrence = async (occId) => {
    if (!confirm('Deseja realmente excluir esta ocorrência permanentemente?')) return;
    try {
      const res = await fetch(`/api/occurrences/${occId}?role=${user.role}&userId=${user.id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchOccurrences();
      } else {
        const err = await res.json();
        alert(err.error || 'Erro ao excluir ocorrência.');
      }
    } catch (err) {
      console.error('Delete occurrence error:', err);
      alert('Erro de conexão ao excluir ocorrência.');
    }
  };

  // Handler: Save Director Notes
  const handleSaveDirectorNotes = async () => {
    if (!selectedOccurrence) return;
    const updated = {
      ...selectedOccurrence,
      directorNotes: directorNotes,
      updatedAt: new Date().toISOString(),
      updatedById: user.id,
      updatedByName: user.name
    };
    try {
      const res = await fetch('/api/occurrences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        fetchOccurrences();
        setShowDetailModal(false);
        setSelectedOccurrence(null);
      } else {
        alert('Erro ao salvar observações.');
      }
    } catch (err) {
      console.error('Save director notes error:', err);
      alert('Erro de conexão.');
    }
  };

  // Format CPF Input
  const formatCPF = (value) => {
    const clean = value.replace(/\D/g, '');
    if (clean.length <= 3) return clean;
    if (clean.length <= 6) return `${clean.slice(0, 3)}.${clean.slice(3)}`;
    if (clean.length <= 9) return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6)}`;
    return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6, 9)}-${clean.slice(9, 11)}`;
  };

  // Format Phone Input
  const formatPhone = (value) => {
    const clean = value.replace(/\D/g, '');
    if (clean.length <= 2) return clean;
    if (clean.length <= 7) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
  };

  // CSV/Excel Export (SPSS Friendly)
  const handleExportSPSS = () => {
    const headers = [
      'ID_Ocorrencia',
      'Escola_ID',
      'Escola_Nome',
      'Data_Registro',
      'Estudantes_Nomes',
      'Qtd_Estudantes',
      'Ano_Ciclo_Principal',
      'Turma_Principal',
      'Turno_Principal',
      'Professor_Principal',
      'Responsavel_Nome',
      'Responsavel_Contato',
      'Classificacoes_Texto',
      'Sentimentos_Mapeados',
      'Assunto_Descricao',
      'Encaminhamentos_Escolares',
      'Encaminhamento_Direcao_Protecao',
      'Observacoes_Pedagogicas',
      'Observacoes_Diretoria',
      'Status_Registro',
      'Criado_Por'
    ];

    const escape = (val) => {
      if (val === undefined || val === null) return '""';
      const str = String(val).replace(/"/g, '""').replace(/\r?\n|\r/g, ' ');
      return `"${str}"`;
    };

    const rows = occurrences.map(o => {
      const schoolName = schools.find(s => s.id === o.schoolId)?.name || 'Desconhecida';
      const studentsList = Array.isArray(o.students) && o.students.length > 0 ? o.students : [];
      const studentNames = studentsList.map(s => s.studentName).join(', ') || o.studentName || '';
      const classificationsStr = Array.isArray(o.classifications) ? o.classifications.join(' | ') : o.type;
      const feelingsStr = Array.isArray(o.feelings) ? o.feelings.join(', ') : '';
      const directionRefStr = Array.isArray(o.direction_referrals) ? o.direction_referrals.join(', ') : '';

      return [
        escape(o.id),
        escape(o.schoolId),
        escape(schoolName),
        escape(o.date),
        escape(studentNames),
        studentsList.length || 1,
        escape(o.gradeCycle || studentsList[0]?.gradeCycle),
        escape(o.className || studentsList[0]?.className),
        escape(studentsList[0]?.turn || ''),
        escape(o.teacherName || studentsList[0]?.teacherName),
        escape(o.guardianName || studentsList[0]?.guardian?.name),
        escape(o.contacts || studentsList[0]?.guardian?.contact),
        escape(classificationsStr),
        escape(feelingsStr),
        escape(o.subject),
        escape(o.referrals),
        escape(directionRefStr),
        escape(o.observations),
        escape(o.directorNotes),
        escape(o.status || 'finalizado'),
        escape(o.createdByName)
      ];
    });

    const csvContent = "\uFEFF" + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    const dateStr = new Date().toISOString().slice(0,10);
    link.setAttribute('download', `pome_export_ocorrencias_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper: Match classification to taxonomy nature
  const getNatureForClassification = (classificationTerm) => {
    if (!classificationTerm) return null;
    const termLower = classificationTerm.toLowerCase().trim();
    for (const [natureName, dimensions] of Object.entries(TAXONOMY_TREE)) {
      for (const [dimName, terms] of Object.entries(dimensions)) {
        if (terms.some(t => {
          const tLower = t.toLowerCase();
          return tLower === termLower || termLower.includes(tLower) || tLower.includes(termLower);
        })) {
          if (natureName.includes('Perturbadora')) return 'Perturbadora';
          if (natureName.includes('Agressiva')) return 'Agressiva';
          if (natureName.includes('risco') || natureName.includes('Risco')) return 'Risco';
        }
      }
    }
    return null;
  };

  const occurrenceHasNature = (occ, natureType) => {
    const list = Array.isArray(occ.classifications) && occ.classifications.length > 0
      ? occ.classifications
      : [occ.type || ''];
    return list.some(term => getNatureForClassification(term) === natureType);
  };

  // Filter & Search Logic
  const filteredOccurrences = occurrences.filter(o => {
    const studentNames = (Array.isArray(o.students) ? o.students.map(s => s.studentName).join(' ') : o.studentName) || '';
    const guardianName = o.guardianName || (Array.isArray(o.students) && o.students[0]?.guardian?.name) || '';
    const subject = o.subject || '';
    const className = o.className || (Array.isArray(o.students) && o.students[0]?.className) || '';
    const createdByName = o.createdByName || '';
    const gradeCycle = o.gradeCycle || (Array.isArray(o.students) && o.students[0]?.gradeCycle) || '';
    const type = o.type || '';
    const status = o.status || 'finalizado';
    const schoolName = schools.find(s => s.id === o.schoolId)?.name || '';

    const normalize = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const normalizedQuery = normalize(searchQuery);

    const matchesSearch = 
      normalize(studentNames).includes(normalizedQuery) ||
      normalize(guardianName).includes(normalizedQuery) ||
      normalize(subject).includes(normalizedQuery) ||
      normalize(className).includes(normalizedQuery) ||
      normalize(createdByName).includes(normalizedQuery) ||
      normalize(schoolName).includes(normalizedQuery) ||
      normalize(gradeCycle).includes(normalizedQuery) ||
      normalize(type).includes(normalizedQuery) ||
      normalize(status).includes(normalizedQuery) ||
      (Array.isArray(o.classifications) && o.classifications.some(c => normalize(c).includes(normalizedQuery)));
      
    const matchesSchool = filterSchool ? o.schoolId === filterSchool : true;
    const matchesClass = filterClass 
      ? className.toLowerCase().includes(filterClass.toLowerCase()) ||
        `${gradeCycle} ${className}`.toLowerCase().includes(filterClass.toLowerCase()) ||
        (Array.isArray(o.students) && o.students.some(st => (st.className || '').toLowerCase().includes(filterClass.toLowerCase()) || `${st.gradeCycle || ''} ${st.className || ''}`.toLowerCase().includes(filterClass.toLowerCase())))
      : true;
    
    // Nature filter (Search page dropdown)
    const matchesNature = filterNature
      ? (Array.isArray(o.classifications) && o.classifications.some(c => c.toLowerCase().includes(filterNature.toLowerCase()))) ||
        (o.type && o.type.toLowerCase().includes(filterNature.toLowerCase()))
      : true;

    // Dashboard Dimension Panorama Filter (Pill buttons)
    const matchesDashboard = (activeTab === 'dashboard' && dashboardFilter !== 'all')
      ? occurrenceHasNature(o, dashboardFilter)
      : true;

    return matchesSearch && matchesNature && matchesSchool && matchesClass && matchesDashboard;
  });

  // Calculate Metrics/Statistics for current context (Real database counts)
  const getMetrics = () => {
    const baseOccurrences = occurrences; // Real database list scoped to current school/user
    const total = baseOccurrences.length;
    
    const perturbadoras = baseOccurrences.filter(o => occurrenceHasNature(o, 'Perturbadora')).length;
    const agressivas = baseOccurrences.filter(o => occurrenceHasNature(o, 'Agressiva')).length;
    const riscos = baseOccurrences.filter(o => occurrenceHasNature(o, 'Risco')).length;
    const comVisto = baseOccurrences.filter(o => Boolean(o.directorNotes && o.directorNotes.trim())).length;
    const rascunhos = baseOccurrences.filter(o => o.status === 'rascunho').length;

    return { total, perturbadoras, agressivas, riscos, comVisto, rascunhos };
  };

  const metrics = getMetrics();

  // Relatórios Analíticos (Pedagogo, Diretor, Gestor e Super Admin)
  const getTurmasReport = () => {
    const map = {};
    occurrences.forEach(o => {
      const studentsList = Array.isArray(o.students) && o.students.length > 0 ? o.students : [];
      const classKey = (studentsList.length > 0 ? `${studentsList[0].gradeCycle || ''} - ${studentsList[0].className || ''}` : `${o.gradeCycle || ''} - ${o.className || ''}`).trim() || 'Geral / Outros';
      
      if (!map[classKey]) {
        map[classKey] = {
          className: classKey,
          count: 0,
          studentsCount: 0,
          comVisto: 0,
          semVisto: 0,
          perturbadoras: 0,
          agressivas: 0,
          risco: 0,
          myCount: 0
        };
      }
      map[classKey].count += 1;
      if (user && o.createdById === user.id) map[classKey].myCount += 1;
      map[classKey].studentsCount += (studentsList.length || 1);
      if (o.directorNotes && o.directorNotes.trim()) map[classKey].comVisto += 1;
      else map[classKey].semVisto += 1;
      if (occurrenceHasNature(o, 'Perturbadora')) map[classKey].perturbadoras += 1;
      if (occurrenceHasNature(o, 'Agressiva')) map[classKey].agressivas += 1;
      if (occurrenceHasNature(o, 'Risco')) map[classKey].risco += 1;
    });
    return Object.values(map).sort((a, b) => b.count - a.count);
  };

  const getSentimentosReport = () => {
    const map = {};
    occurrences.forEach(o => {
      if (Array.isArray(o.feelings)) {
        o.feelings.forEach(f => {
          if (!f) return;
          map[f] = (map[f] || 0) + 1;
        });
      }
    });
    return Object.entries(map)
      .map(([feeling, count]) => ({ feeling, count }))
      .sort((a, b) => b.count - a.count);
  };

  const getDisciplinasReport = () => {
    const map = {};
    occurrences.forEach(o => {
      const studentsList = Array.isArray(o.students) && o.students.length > 0 ? o.students : [];
      const subj = (studentsList[0]?.subject_matter || o.subject_matter || 'Não especificada').trim();
      const prof = (studentsList[0]?.teacherName || o.teacherName || 'Geral').trim();
      const key = `${subj} (${prof})`;
      if (!map[key]) {
        map[key] = { key, subject: subj, teacher: prof, count: 0 };
      }
      map[key].count += 1;
    });
    return Object.values(map).sort((a, b) => b.count - a.count);
  };

  const getEncaminhamentosReport = () => {
    const map = {};
    occurrences.forEach(o => {
      if (Array.isArray(o.direction_referrals)) {
        o.direction_referrals.forEach(ref => {
          if (!ref) return;
          map[ref] = (map[ref] || 0) + 1;
        });
      }
    });
    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  };

  const getEscolasReport = () => {
    return schools.map(s => {
      const occs = occurrences.filter(o => o.schoolId === s.id);
      return {
        id: s.id,
        name: s.name,
        total: occs.length,
        comVisto: occs.filter(o => o.directorNotes && o.directorNotes.trim()).length,
        semVisto: occs.filter(o => !o.directorNotes && o.status !== 'rascunho').length,
        rascunhos: occs.filter(o => o.status === 'rascunho').length,
        riscos: occs.filter(o => occurrenceHasNature(o, 'Risco') || occurrenceHasNature(o, 'Agressiva')).length
      };
    }).sort((a, b) => b.total - a.total);
  };

  // Print PDF function
  const handlePrint = (occ) => {
    setSelectedOccurrence(occ);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  // Helper validation for Step 1
  const isStep1Valid = formData.students.every(s => 
    s.studentName.trim().length >= 3 && 
    s.sex && 
    s.turn.trim() && 
    s.gradeCycle && 
    s.className.trim() &&
    s.teacherName.trim() &&
    s.subject_matter.trim() &&
    s.guardian.name.trim() &&
    s.guardian.contact.trim()
  ) && (user?.role !== 'gestor' && user?.role !== 'seduc' ? true : Boolean(formData.schoolId));

  // Helper validation for Step 2
  const isStep2Valid = formData.subject.trim().length >= 10 && formData.classifications.length > 0;

  // Helper validation for Step 3 (Sentimentos)
  const isStep3Valid = formData.feelings.length > 0;

  // Helper validation for Step 4 (Encaminhamentos)
  const isStep4Valid = formData.referrals.trim().length >= 5;

  // Render Loading Splash Screen
  if (loading) {
    return (
      <div className="splash-screen-wrapper">
        <div className="splash-logo-container">
          <Logo style={{ width: '550px', height: 'auto', marginBottom: '1.5rem' }} />
          <div className="splash-progress-bar">
            <div className="splash-progress-fill"></div>
          </div>
        </div>
      </div>
    );
  }

  // Render Login page if not authenticated
  if (!user) {
    return (
      <div className="login-wrapper" style={{ flexDirection: 'column', gap: '1.25rem', alignItems: 'center' }}>
        
        {/* Tutorial Bar */}
        <div className="tutorial-container">
          <div className="tutorial-header" onClick={() => setShowTutorial(!showTutorial)}>
            <div className="tutorial-title">
              <span>💡</span>
              <span>Tutorial de Navegação e Contas de Teste</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {showTutorial ? '▲ Recolher' : '▼ Expandir'}
            </span>
          </div>

          {showTutorial && (
            <div className="tutorial-content">
              <div className="tutorial-tabs">
                <button 
                  type="button"
                  className={`tutorial-tab-btn ${tutorialTab === 'welcome' ? 'active' : ''}`}
                  onClick={() => setTutorialTab('welcome')}
                >
                  Boas-vindas
                </button>
                <button 
                  type="button"
                  className={`tutorial-tab-btn ${tutorialTab === 'roles' ? 'active' : ''}`}
                  onClick={() => setTutorialTab('roles')}
                >
                  Contas de Acesso
                </button>
                <button 
                  type="button"
                  className={`tutorial-tab-btn ${tutorialTab === 'features' ? 'active' : ''}`}
                  onClick={() => setTutorialTab('features')}
                >
                  Fluxo em 5 Passos
                </button>
              </div>

              <div className="tutorial-tab-content">
                {tutorialTab === 'welcome' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <p>
                      A plataforma <strong>POME</strong> (Plataforma de Observação da Melhoria do Clima Escolar) apoia o registro sistemático, mediação de conflitos e análise estatística na rede de ensino.
                    </p>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                        onClick={() => setShowRegisterModal(true)}
                      >
                        📝 Solicitar Cadastro de Acesso
                      </button>
                    </div>
                  </div>
                )}

                {tutorialTab === 'roles' && (
                  <div>
                    <p style={{ marginBottom: '0.5rem' }}>Clique em um perfil para preencher os dados de login automaticamente:</p>
                    <div className="quick-login-grid">
                      <div 
                        className="quick-login-card" 
                        onClick={() => setLoginData({ cpf: 'vina@pome.com.br', password: '2018@Senha' })}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                          <span className="quick-login-role">👑 Felipe Marcelino (Super Admin)</span>
                          <button
                            type="button"
                            className="help-role-badge"
                            style={{ width: '18px', height: '18px', fontSize: '0.65rem' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setTutorialSelectedRole('superadmin');
                              setTutorialSubTab('overview');
                              setShowRoleTutorialModal(true);
                            }}
                          >
                            ❓
                            <span className="tooltip-role-text">💡 Tutorial e Permissões do Super Admin</span>
                          </button>
                        </div>
                        <span className="quick-login-creds">vina@pome.com.br | 2018@Senha</span>
                      </div>
                      <div 
                        className="quick-login-card" 
                        onClick={() => setLoginData({ cpf: '000.000.000-00', password: 'admin' })}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                          <span className="quick-login-role">⚡ Elisabette (Super Admin)</span>
                          <button
                            type="button"
                            className="help-role-badge"
                            style={{ width: '18px', height: '18px', fontSize: '0.65rem' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setTutorialSelectedRole('superadmin');
                              setTutorialSubTab('overview');
                              setShowRoleTutorialModal(true);
                            }}
                          >
                            ❓
                            <span className="tooltip-role-text">💡 Tutorial e Permissões do Super Admin</span>
                          </button>
                        </div>
                        <span className="quick-login-creds">CPF: 000.000.000-00 | Senha: admin</span>
                      </div>
                      <div 
                        className="quick-login-card" 
                        onClick={() => setLoginData({ cpf: '111.111.111-11', password: 'senha' })}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                          <span className="quick-login-role">💼 Diretor(a)</span>
                          <button
                            type="button"
                            className="help-role-badge"
                            style={{ width: '18px', height: '18px', fontSize: '0.65rem' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setTutorialSelectedRole('diretor');
                              setTutorialSubTab('overview');
                              setShowRoleTutorialModal(true);
                            }}
                          >
                            ❓
                            <span className="tooltip-role-text">💡 Tutorial e Permissões do Diretor</span>
                          </button>
                        </div>
                        <span className="quick-login-creds">CPF: 111.111.111-11 | Senha: senha</span>
                      </div>
                      <div 
                        className="quick-login-card" 
                        onClick={() => setLoginData({ cpf: '222.222.222-22', password: 'senha' })}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                          <span className="quick-login-role">✏️ Pedagogo(a)</span>
                          <button
                            type="button"
                            className="help-role-badge"
                            style={{ width: '18px', height: '18px', fontSize: '0.65rem' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setTutorialSelectedRole('pedagogo');
                              setTutorialSubTab('overview');
                              setShowRoleTutorialModal(true);
                            }}
                          >
                            ❓
                            <span className="tooltip-role-text">💡 Tutorial e Permissões do Pedagogo</span>
                          </button>
                        </div>
                        <span className="quick-login-creds">CPF: 222.222.222-22 | Senha: senha</span>
                      </div>
                    </div>
                  </div>
                )}

                {tutorialTab === 'features' && (
                  <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.825rem' }}>
                    <li><strong>Passo 1 (Identificação):</strong> Múltiplos estudantes, turno, sexo, ciclo/EJA e dados do responsável.</li>
                    <li><strong>Passo 2 (Ocorrência):</strong> Relato do ocorrido primeiro e classificação na nova taxonomia em 3 níveis.</li>
                    <li><strong>Passo 3 (Sentimentos):</strong> Escuta ativa CNV identificando emoções sem julgamento.</li>
                    <li><strong>Passo 4 (Encaminhamentos):</strong> Ações escolares e acionamento da rede de proteção (Conselho Tutelar, CAPS, etc.).</li>
                    <li><strong>Passo 5 (Revisão):</strong> Confirmação, rascunho e emissão de folhas de atendimento A4 com anonimização LGPD.</li>
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Login Card */}
        <form className="login-card" onSubmit={handleLogin}>
          <div className="login-header">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem', width: '100%' }}>
              <Logo style={{ width: '220px', height: 'auto' }} />
            </div>
            <p className="login-subtitle">Sistema de Registro e Monitoramento de Clima Escolar</p>
          </div>
          
          {loginError && (
            <div style={{ color: 'var(--danger)', fontSize: '0.875rem', backgroundColor: 'var(--danger-light)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--danger)' }}>
              {loginError}
            </div>
          )}

          <div className="form-group">
            <label className="form-label">CPF ou E-mail Institucional</label>
            <input
              type="text"
              placeholder="000.000.000-00 ou seu e-mail..."
              className="form-control"
              value={loginData.cpf}
              onChange={(e) => {
                const val = e.target.value;
                if (/^[\d.-]*$/.test(val) && !val.includes('@')) {
                  setLoginData({ ...loginData, cpf: formatCPF(val) });
                } else {
                  setLoginData({ ...loginData, cpf: val });
                }
              }}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Senha</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                className="form-control"
                style={{ paddingRight: '2.5rem' }}
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 0
                }}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.25rem' }}>
            Entrar no Sistema
          </button>

          <div style={{ textAlign: 'center', marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
            <button 
              type="button" 
              className="btn btn-secondary" 
              style={{ width: '100%', fontSize: '0.85rem' }}
              onClick={() => setShowRegisterModal(true)}
            >
              📝 Solicitar Acesso ao POME
            </button>
          </div>
        </form>

        {/* Modal: Cadastro de Usuário (Apontamento 1 - POME.pdf Pág. 1) */}
        {showRegisterModal && (
          <div className="modal-overlay" onClick={() => setShowRegisterModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.15rem' }}>Cadastro de Usuário</h3>
                <button className="btn btn-secondary" onClick={() => setShowRegisterModal(false)}>
                  ✕
                </button>
              </div>
              <form className="card-body" onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Preencha os dados abaixo para solicitar acesso ao POME.
                </p>

                {/* LGPD Info Notice */}
                <div className="lgpd-box" style={{ borderLeft: '4px solid var(--primary)' }}>
                  ℹ️ Este cadastro segue a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong>. Seus dados são usados apenas para controle de acesso e responsabilidade pelos registros no sistema.
                </div>

                {registerSuccess && (
                  <div style={{ color: 'var(--success)', backgroundColor: 'var(--success-light)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--success)', fontSize: '0.875rem' }}>
                    {registerSuccess}
                  </div>
                )}

                {registerError && (
                  <div style={{ color: 'var(--danger)', backgroundColor: 'var(--danger-light)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--danger)', fontSize: '0.875rem' }}>
                    {registerError}
                  </div>
                )}

                {/* Perfil de Acesso */}
                <div className="form-group">
                  <label className="form-label" style={{ fontWeight: '600' }}>Perfil de Acesso</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {[
                      { id: 'seduc', label: 'Seduc' },
                      { id: 'diretor', label: 'Diretor(a)' },
                      { id: 'pedagogo', label: 'Pedagogo(a)' },
                      { id: 'assistente', label: 'Assistente escolar' }
                    ].map(p => (
                      <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', cursor: 'pointer', fontSize: '0.85rem' }}>
                        <input
                          type="radio"
                          name="profile_role"
                          checked={registerData.role === p.id}
                          onChange={() => setRegisterData({ ...registerData, role: p.id })}
                        />
                        <span>{p.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Nome Completo */}
                <div className="form-group">
                  <label className="form-label">Nome Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nome completo, como consta no documento"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                  />
                </div>

                {/* CPF & E-mail */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">CPF</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="000.000.000-00"
                      value={registerData.cpf}
                      onChange={(e) => setRegisterData({ ...registerData, cpf: formatCPF(e.target.value) })}
                      maxLength={14}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">E-mail Institucional</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="nome@educacao.contagem.mg.gov.br"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Telefone & Unidade Escolar */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Telefone</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="(31) 90000-0000"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: formatPhone(e.target.value) })}
                      maxLength={15}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Unidade Escolar</label>
                    <select
                      className="form-select"
                      value={registerData.schoolId}
                      onChange={(e) => setRegisterData({ ...registerData, schoolId: e.target.value })}
                      disabled={registerData.role === 'seduc'}
                      required={registerData.role !== 'seduc'}
                    >
                      <option value="">Selecione a escola vinculada...</option>
                      {schools.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Termo de Consentimento LGPD */}
                <div className="lgpd-box" style={{ marginTop: '0.5rem' }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem', color: 'var(--primary)' }}>
                    Termo de consentimento (LGPD)
                  </div>
                  <p style={{ fontSize: '0.78rem' }}>
                    O presente termo formaliza o consentimento para tratamento de dados pessoais e dados pessoais sensíveis no âmbito do POME, comprometendo-se o usuário ao sigilo e ao zelo no registro e na divulgação.
                  </p>
                  
                  <button 
                    type="button" 
                    onClick={() => setShowFullLgpdTerms(!showFullLgpdTerms)}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-orange)', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer', padding: '0.25rem 0', textDecoration: 'underline' }}
                  >
                    {showFullLgpdTerms ? '▲ Ocultar termo completo' : '▼ Ler termo completo'}
                  </button>

                  {showFullLgpdTerms && (
                    <div className="lgpd-full-text">
                      Em cumprimento à Lei Federal nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais - LGPD), o usuário declara estar ciente de que todos os dados coletados na plataforma destinam-se exclusivamente ao monitoramento educacional, mediação e clima escolar, sendo expressamente vedado o uso para fins não autorizados ou o compartilhamento de informações identificáveis de estudantes e famílias sem a devida anonimização e salvaguarda legal.
                    </div>
                  )}

                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500' }}>
                    <input
                      type="checkbox"
                      checked={registerData.lgpd_accepted}
                      onChange={(e) => setRegisterData({ ...registerData, lgpd_accepted: e.target.checked })}
                      required
                    />
                    <span>Li e concordo com o termo de consentimento para tratamento de dados pessoais e compromisso de sigilo, conforme a LGPD.</span>
                  </label>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowRegisterModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={!registerData.lgpd_accepted}>
                    Concluir cadastro
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Impersonation Alert Banner */}
      {impersonatedOriginalUser && (
        <div className="impersonation-banner">
          <div className="impersonation-banner-info">
            <span className="impersonation-badge">⚠️ AUDITORIA MASTER ATIVA</span>
            <span>
              Você está navegando como <strong>{user.name}</strong> ({user.role?.toUpperCase()}{user.schoolName ? ` | ${user.schoolName}` : ''}).
            </span>
          </div>
          <button 
            type="button" 
            className="btn btn-warning" 
            onClick={handleStopImpersonation}
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem', fontWeight: '700', backgroundColor: '#d97706', color: 'white', border: 'none', cursor: 'pointer', borderRadius: 'var(--radius-sm)' }}
          >
            ⬅️ Sair e Voltar para Super Admin
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <header className="navbar">
        <a href="#" className="navbar-brand" onClick={() => setActiveTab('dashboard')}>
          <Logo style={{ height: '70px', width: 'auto' }} />
        </a>
        <div className="navbar-user">
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-role" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>{user.role === 'superadmin' ? '👑 SUPER ADMIN' : user.role.toUpperCase()} {user.schoolName ? `| ${user.schoolName}` : ''}</span>
              <button
                type="button"
                className="help-role-badge"
                title={`Tutorial e Permissões do perfil: ${ROLE_TUTORIALS_DATA[user.role]?.name || user.role}`}
                onClick={() => {
                  setTutorialSelectedRole(user.role === 'seduc' ? 'seduc' : user.role);
                  setTutorialSubTab('overview');
                  setShowRoleTutorialModal(true);
                }}
              >
                ❓
                <span className="tooltip-role-text">
                  💡 Tutorial e Permissões do Perfil ({ROLE_TUTORIALS_DATA[user.role]?.name || user.role})
                </span>
              </button>
            </div>
          </div>
          
          <button 
            className="theme-toggle" 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            title="Alternar Tema"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={() => {
              setTutorialSelectedRole(user.role === 'seduc' ? 'seduc' : user.role);
              setTutorialSubTab('overview');
              setShowRoleTutorialModal(true);
            }}
            style={{ padding: '0.5rem 0.85rem', marginRight: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}
          >
            💡 Tutorial
          </button>

          <button className="btn btn-secondary" onClick={handleLogout} style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}>
            Sair
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setActiveTab('dashboard'); setShowForm(false); }}
          >
            <IconHome style={{ marginRight: '6px' }} /> Painel Principal
          </button>
          <button 
            className={`btn ${activeTab === 'occurrences' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setActiveTab('occurrences'); setShowForm(false); }}
          >
            <IconSearch style={{ marginRight: '6px' }} /> Buscar Ocorrências
          </button>
          
          {(user.role === 'gestor' || user.role === 'seduc' || user.role === 'superadmin') && (
            <>
              <button 
                className={`btn ${activeTab === 'schools' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => { setActiveTab('schools'); setShowForm(false); }}
              >
                <IconSchool style={{ marginRight: '6px' }} /> Gerenciar Escolas
              </button>
              <button 
                className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => { setActiveTab('users'); setShowForm(false); }}
              >
                <IconUsers style={{ marginRight: '6px' }} /> Gerenciar Usuários
              </button>
            </>
          )}

          <button 
            className={`btn ${activeTab === 'reports' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setActiveTab('reports'); setShowForm(false); }}
          >
            <IconFolder style={{ marginRight: '6px' }} />
            {user.role === 'pedagogo' || user.role === 'assistente' ? 'Meus Relatórios' : 
             user.role === 'diretor' ? 'Relatórios da Direção' : 'Relatórios de Gestão'}
          </button>

          {(user.role === 'superadmin' || impersonatedOriginalUser) && (
            <button 
              className={`btn ${activeTab === 'sysadmin' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => { setActiveTab('sysadmin'); setShowForm(false); fetchAdminData(); }}
              style={{
                backgroundColor: activeTab === 'sysadmin' ? '#7c3aed' : 'var(--bg-app)',
                borderColor: '#7c3aed',
                color: activeTab === 'sysadmin' ? 'white' : '#7c3aed',
                fontWeight: '700'
              }}
            >
              <IconLightning style={{ marginRight: '6px' }} /> Administração do Sistema
            </button>
          )}
        </div>

        {/* ----------------- TAB: DASHBOARD (Apontamento 2: Organizado por Dimensão) ----------------- */}
        {activeTab === 'dashboard' && !showForm && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2>Dashboard de Acompanhamento</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {user.role === 'gestor' || user.role === 'seduc' ? 'Visão global da rede municipal' : `Visão geral: ${user.schoolName}`} | Hoje {new Date().toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={() => { setFormData(initialFormState); setShowForm(true); setFormStep(1); }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><IconSchool /> Novo Atendimento</span>
                </button>
                {(user.role === 'gestor' || user.role === 'seduc') && (
                  <button className="btn btn-success" onClick={handleExportSPSS}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><IconFolder /> Exportar SPSS</span>
                  </button>
                )}
              </div>
            </div>

            {/* Dashboard Filter Options */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Visualização por Panorama:</span>
              <button 
                className={`btn btn-secondary ${dashboardFilter === 'all' ? 'active' : ''}`}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', backgroundColor: dashboardFilter === 'all' ? 'var(--primary-light)' : 'transparent', color: dashboardFilter === 'all' ? 'var(--primary)' : 'inherit', fontWeight: dashboardFilter === 'all' ? '700' : 'normal' }}
                onClick={() => setDashboardFilter('all')}
              >
                Todas as Dimensões
              </button>
              <button 
                className={`btn btn-secondary ${dashboardFilter === 'Perturbadora' ? 'active' : ''}`}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', backgroundColor: dashboardFilter === 'Perturbadora' ? 'var(--warning-light)' : 'transparent', color: dashboardFilter === 'Perturbadora' ? 'var(--accent-orange)' : 'inherit', fontWeight: dashboardFilter === 'Perturbadora' ? '700' : 'normal' }}
                onClick={() => setDashboardFilter('Perturbadora')}
              >
                Perturbadoras
              </button>
              <button 
                className={`btn btn-secondary ${dashboardFilter === 'Agressiva' ? 'active' : ''}`}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', backgroundColor: dashboardFilter === 'Agressiva' ? 'var(--danger-light)' : 'transparent', color: dashboardFilter === 'Agressiva' ? 'var(--danger)' : 'inherit', fontWeight: dashboardFilter === 'Agressiva' ? '700' : 'normal' }}
                onClick={() => setDashboardFilter('Agressiva')}
              >
                Agressivas / Violentas
              </button>
              <button 
                className={`btn btn-secondary ${dashboardFilter === 'Risco' ? 'active' : ''}`}
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', backgroundColor: dashboardFilter === 'Risco' ? 'var(--primary-light)' : 'transparent', color: dashboardFilter === 'Risco' ? 'var(--primary)' : 'inherit', fontWeight: dashboardFilter === 'Risco' ? '700' : 'normal' }}
                onClick={() => setDashboardFilter('Risco')}
              >
                Situações de Risco
              </button>
            </div>

            {/* Counters Grid */}
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon" style={{ color: 'var(--primary)' }}><IconFolder /></div>
                <div className="metric-details">
                  <h4>Total Registros</h4>
                  <div className="metric-value">{metrics.total}</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon bullying" style={{ color: 'var(--warning)' }}><IconWarning /></div>
                <div className="metric-details">
                  <h4>Perturbadoras</h4>
                  <div className="metric-value">{metrics.perturbadoras}</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon homophobia" style={{ color: 'var(--danger)' }}><IconShield /></div>
                <div className="metric-details">
                  <h4>Agressivas / Violentas</h4>
                  <div className="metric-value">{metrics.agressivas}</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon" style={{ backgroundColor: 'var(--danger-light)', color: 'var(--danger)' }}><IconActivity /></div>
                <div className="metric-details">
                  <h4>Situações de Risco</h4>
                  <div className="metric-value">{metrics.riscos}</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}><IconSchool /></div>
                <div className="metric-details">
                  <h4>Visto Diretoria</h4>
                  <div className="metric-value">{metrics.comVisto}</div>
                </div>
              </div>
            </div>

            {/* Recent Occurrences Card */}
            <div className="card" style={{ marginTop: '1.5rem' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Ocorrências Recentes</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <label 
                    className={`anonymize-badge ${anonymizeView ? 'active' : ''}`}
                    onClick={() => setAnonymizeView(!anonymizeView)}
                    title="Anonimizar dados conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018)"
                  >
                    <span>🔒</span>
                    <span>{anonymizeView ? 'LGPD: Nomes Ocultos' : 'Anonimizar (LGPD)'}</span>
                  </label>
                  <span className="badge badge-primary">{filteredOccurrences.length} registros</span>
                </div>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                {filteredOccurrences.length === 0 ? (
                  <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Nenhuma ocorrência registrada recentemente.
                  </p>
                ) : (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Data</th>
                          {(user.role === 'gestor' || user.role === 'seduc') && <th>Escola</th>}
                          <th>Estudante(s)</th>
                          <th>Turma</th>
                          <th>Classificação</th>
                          <th>Criado Por</th>
                          <th>Status</th>
                          <th style={{ textAlign: 'right' }}>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOccurrences.slice(0, 10).map(o => {
                          const schoolName = schools.find(s => s.id === o.schoolId)?.name || 'Desconhecida';
                          const studentsList = Array.isArray(o.students) && o.students.length > 0 ? o.students : [];
                          const displayedStudent = studentsList.length > 0
                            ? studentsList.map(s => anonymizeText(s.studentName, anonymizeView)).join(', ')
                            : anonymizeText(o.studentName, anonymizeView);

                          const primaryType = Array.isArray(o.classifications) && o.classifications.length > 0
                            ? o.classifications[0]
                            : o.type || 'Atendimento';

                          return (
                            <tr key={o.id}>
                              <td>{new Date(o.date).toLocaleDateString('pt-BR')}</td>
                              {(user.role === 'gestor' || user.role === 'seduc') && <td style={{ fontWeight: '500' }}>{schoolName}</td>}
                              <td style={{ fontWeight: '600' }}>{displayedStudent}</td>
                              <td>{o.className || studentsList[0]?.className || '-'}</td>
                              <td>
                                <span className="badge badge-primary">{primaryType}</span>
                              </td>
                              <td style={{ color: 'var(--text-secondary)' }}>{o.createdByName}</td>
                              <td>
                                {o.status === 'rascunho' ? (
                                  <span className="badge badge-secondary" style={{ backgroundColor: 'var(--text-secondary)', color: 'white' }}>Rascunho</span>
                                ) : o.directorNotes ? (
                                  <span className="badge badge-success">Visto Diretoria</span>
                                ) : (
                                  <span className="badge badge-warning">Pendente</span>
                                )}
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                                  <button 
                                    className="btn btn-secondary" 
                                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                                    onClick={() => {
                                      setSelectedOccurrence(o);
                                      setDirectorNotes(o.directorNotes || '');
                                      setShowDetailModal(true);
                                    }}
                                  >
                                    Detalhes
                                  </button>
                                  <button 
                                    className="btn btn-primary" 
                                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                                    onClick={() => handlePrint(o)}
                                  >
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IconPrinter /> A4</span>
                                  </button>
                                  {(user.role === 'gestor' || 
                                    user.role === 'seduc' ||
                                    (user.role === 'diretor' && o.schoolId === user.schoolId) || 
                                    (user.role === 'pedagogo' && o.createdById === user.id && !o.directorNotes)) && (
                                    <button 
                                      className="btn btn-warning" 
                                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', backgroundColor: 'var(--accent-orange)', color: 'white', border: 'none' }}
                                      onClick={() => handleEditOccurrence(o)}
                                    >
                                      Alterar
                                    </button>
                                  )}
                                  {(user.role === 'gestor' || user.role === 'seduc' || (user.role === 'pedagogo' && o.createdById === user.id && !o.directorNotes)) && (
                                    <button 
                                      className="btn btn-danger" 
                                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', backgroundColor: 'var(--danger)', color: 'white' }}
                                      onClick={() => handleDeleteOccurrence(o.id)}
                                    >
                                      Excluir
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB: BUSCAR OCORRÊNCIAS ----------------- */}
        {activeTab === 'occurrences' && !showForm && (
          <div className="fade-in">
            <h2>Busca e Consulta de Ocorrências</h2>
            
            {/* Filters Bar */}
            <div className="filters-bar">
              <input
                type="text"
                placeholder="Buscar por estudante, responsável ou relato..."
                className="form-control filter-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              {(user.role === 'gestor' || user.role === 'seduc') && (
                <select 
                  className="form-select" 
                  style={{ width: '220px' }} 
                  value={filterSchool} 
                  onChange={(e) => setFilterSchool(e.target.value)}
                >
                  <option value="">Todas as Escolas</option>
                  {schools.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              )}

              <select 
                className="form-select" 
                style={{ width: '200px' }} 
                value={filterNature} 
                onChange={(e) => setFilterNature(e.target.value)}
              >
                <option value="">Todas as Naturezas</option>
                <option value="Perturbadora">Perturbadoras</option>
                <option value="Agressiva">Agressivas / Violentas</option>
                <option value="Risco">Situações de Risco</option>
              </select>

              <input
                type="text"
                placeholder="Filtrar Turma"
                className="form-control"
                style={{ width: '140px' }}
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
              />

              <label 
                className={`anonymize-badge ${anonymizeView ? 'active' : ''}`}
                onClick={() => setAnonymizeView(!anonymizeView)}
              >
                <span>🔒</span>
                <span>{anonymizeView ? 'LGPD Ativa' : 'Anonimizar'}</span>
              </label>
            </div>

            {/* Search Results Table */}
            <div className="card">
              <div className="card-body" style={{ padding: 0 }}>
                {filteredOccurrences.length === 0 ? (
                  <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Nenhuma ocorrência encontrada para os filtros selecionados.
                  </p>
                ) : (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Data</th>
                          {(user.role === 'gestor' || user.role === 'seduc') && <th>Escola</th>}
                          <th>Estudante(s)</th>
                          <th>Turma</th>
                          <th>Responsável</th>
                          <th>Classificação</th>
                          <th>Criado Por</th>
                          <th>Status</th>
                          <th style={{ textAlign: 'right' }}>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOccurrences.map(o => {
                          const schoolName = schools.find(s => s.id === o.schoolId)?.name || 'Desconhecida';
                          const studentsList = Array.isArray(o.students) && o.students.length > 0 ? o.students : [];
                          const displayedStudent = studentsList.length > 0
                            ? studentsList.map(s => anonymizeText(s.studentName, anonymizeView)).join(', ')
                            : anonymizeText(o.studentName, anonymizeView);

                          const guardianName = o.guardianName || studentsList[0]?.guardian?.name || '-';
                          const primaryType = Array.isArray(o.classifications) && o.classifications.length > 0
                            ? o.classifications[0]
                            : o.type || 'Atendimento';

                          return (
                            <tr key={o.id}>
                              <td>{new Date(o.date).toLocaleDateString('pt-BR')}</td>
                              {(user.role === 'gestor' || user.role === 'seduc') && <td style={{ fontWeight: '500' }}>{schoolName}</td>}
                              <td style={{ fontWeight: '600' }}>{displayedStudent}</td>
                              <td>{o.className || studentsList[0]?.className || '-'}</td>
                              <td>{anonymizeText(guardianName, anonymizeView)}</td>
                              <td>
                                <span className="badge badge-primary">{primaryType}</span>
                              </td>
                              <td style={{ color: 'var(--text-secondary)' }}>{o.createdByName}</td>
                              <td>
                                {o.status === 'rascunho' ? (
                                  <span className="badge badge-secondary" style={{ backgroundColor: 'var(--text-secondary)', color: 'white' }}>Rascunho</span>
                                ) : o.directorNotes ? (
                                  <span className="badge badge-success">Visto Diretoria</span>
                                ) : (
                                  <span className="badge badge-warning">Pendente</span>
                                )}
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                                  <button 
                                    className="btn btn-secondary" 
                                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                                    onClick={() => {
                                      setSelectedOccurrence(o);
                                      setDirectorNotes(o.directorNotes || '');
                                      setShowDetailModal(true);
                                    }}
                                  >
                                    Detalhes
                                  </button>
                                  <button 
                                    className="btn btn-primary" 
                                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                                    onClick={() => handlePrint(o)}
                                  >
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IconPrinter /> A4</span>
                                  </button>
                                  {(user.role === 'gestor' || 
                                    user.role === 'seduc' ||
                                    (user.role === 'diretor' && o.schoolId === user.schoolId) || 
                                    (user.role === 'pedagogo' && o.createdById === user.id && !o.directorNotes)) && (
                                    <button 
                                      className="btn btn-warning" 
                                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', backgroundColor: 'var(--accent-orange)', color: 'white', border: 'none' }}
                                      onClick={() => handleEditOccurrence(o)}
                                    >
                                      Alterar
                                    </button>
                                  )}
                                  {(user.role === 'gestor' || user.role === 'seduc' || (user.role === 'pedagogo' && o.createdById === user.id && !o.directorNotes)) && (
                                    <button 
                                      className="btn btn-danger" 
                                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', backgroundColor: 'var(--danger)', color: 'white' }}
                                      onClick={() => handleDeleteOccurrence(o.id)}
                                    >
                                      Excluir
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ----------------- FORMULÁRIO PROGRESSIVO EM 5 ETAPAS (POME.PDF) ----------------- */}
        {showForm && (
          <div className="card fade-in" style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Registro de Atendimento</h3>
              <button className="btn btn-secondary" onClick={() => setShowForm(false)}>
                Cancelar
              </button>
            </div>
            <div className="card-body">
              
              {/* 5-Step Progress Indicator */}
              <div className="step-indicator">
                <div className={`step-item ${formStep >= 1 ? 'active' : ''} ${formStep > 1 ? 'completed' : ''}`}>
                  <div className="step-number">1</div>
                  <div className="step-label">Identificação</div>
                </div>
                <div className={`step-item ${formStep >= 2 ? 'active' : ''} ${formStep > 2 ? 'completed' : ''}`}>
                  <div className="step-number">2</div>
                  <div className="step-label">Ocorrência</div>
                </div>
                <div className={`step-item ${formStep >= 3 ? 'active' : ''} ${formStep > 3 ? 'completed' : ''}`}>
                  <div className="step-number">3</div>
                  <div className="step-label">Sentimentos</div>
                </div>
                <div className={`step-item ${formStep >= 4 ? 'active' : ''} ${formStep > 4 ? 'completed' : ''}`}>
                  <div className="step-number">4</div>
                  <div className="step-label">Encaminhamentos</div>
                </div>
                <div className={`step-item ${formStep >= 5 ? 'active' : ''}`}>
                  <div className="step-number">5</div>
                  <div className="step-label">Revisão</div>
                </div>
              </div>

              {/* =========================================================================
                  PASSO 1: IDENTIFICAÇÃO (Múltiplos Estudantes, Sexo, Turno, EJA, Responsável)
                  ========================================================================= */}
              {formStep === 1 && (
                <div className="fade-in">
                  <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', color: 'var(--primary)' }}>
                    Passo 1: Identificação
                  </h4>

                  {/* Escola designada (para Gestor / Seduc) */}
                  {(user.role === 'gestor' || user.role === 'seduc') && (
                    <div className="form-group full-width" style={{ marginBottom: '1.25rem' }}>
                      <label className="form-label">Escola Municipal Vinculada</label>
                      <select
                        className="form-select"
                        value={formData.schoolId || ''}
                        onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                        required
                      >
                        <option value="">Selecione a escola...</option>
                        {schools.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Lista de Estudantes Vinculados */}
                  {formData.students.map((student, sIdx) => (
                    <div key={sIdx} className="student-card-item">
                      <div className="student-card-header">
                        <span className="student-card-title">
                          <span>👤</span>
                          <span>Estudante {sIdx + 1}</span>
                        </span>
                        {formData.students.length > 1 && (
                          <button
                            type="button"
                            className="btn btn-danger"
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                            onClick={() => {
                              const updated = formData.students.filter((_, i) => i !== sIdx);
                              setFormData({ ...formData, students: updated });
                            }}
                          >
                            Remover Estudante
                          </button>
                        )}
                      </div>

                      <div className="form-grid">
                        {/* Nome Completo */}
                        <div className="form-group full-width">
                          <label className="form-label">Nome Completo do Estudante</label>
                          <input
                            type="text"
                            placeholder="Nome do estudante..."
                            className="form-control"
                            value={student.studentName}
                            onChange={(e) => {
                              const updated = [...formData.students];
                              updated[sIdx].studentName = e.target.value;
                              setFormData({ ...formData, students: updated });
                            }}
                            required
                          />
                        </div>

                        {/* Sexo & Turno */}
                        <div className="form-group">
                          <label className="form-label">Sexo</label>
                          <select
                            className="form-select"
                            value={student.sex}
                            onChange={(e) => {
                              const updated = [...formData.students];
                              updated[sIdx].sex = e.target.value;
                              setFormData({ ...formData, students: updated });
                            }}
                            required
                          >
                            <option value="">Selecione...</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Masculino">Masculino</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label">Turno</label>
                          <input
                            type="text"
                            placeholder="Ex: Manhã, Tarde, Noite..."
                            className="form-control"
                            value={student.turn}
                            onChange={(e) => {
                              const updated = [...formData.students];
                              updated[sIdx].turn = e.target.value;
                              setFormData({ ...formData, students: updated });
                            }}
                            required
                          />
                        </div>

                        {/* Ano/Ciclo & Turma */}
                        <div className="form-group">
                          <label className="form-label">Ano / Ciclo</label>
                          <select
                            className="form-select"
                            value={student.gradeCycle}
                            onChange={(e) => {
                              const updated = [...formData.students];
                              updated[sIdx].gradeCycle = e.target.value;
                              setFormData({ ...formData, students: updated });
                            }}
                            required
                          >
                            <option value="">Selecione...</option>
                            {GRADE_CYCLES.map(g => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="form-label">Turma</label>
                          <input
                            type="text"
                            placeholder="Ex: 5º Ano A"
                            className="form-control"
                            value={student.className}
                            onChange={(e) => {
                              const updated = [...formData.students];
                              updated[sIdx].className = e.target.value;
                              setFormData({ ...formData, students: updated });
                            }}
                            required
                          />
                        </div>

                        {/* Professor(a) & Componente Curricular */}
                        <div className="form-group">
                          <label className="form-label">Professor(a)</label>
                          <input
                            type="text"
                            placeholder="Nome do(a) professor(a)..."
                            className="form-control"
                            value={student.teacherName}
                            onChange={(e) => {
                              const updated = [...formData.students];
                              updated[sIdx].teacherName = e.target.value;
                              setFormData({ ...formData, students: updated });
                            }}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Componente Curricular</label>
                          <input
                            type="text"
                            placeholder="Ex: Língua Portuguesa, Matemática..."
                            className="form-control"
                            value={student.subject_matter}
                            onChange={(e) => {
                              const updated = [...formData.students];
                              updated[sIdx].subject_matter = e.target.value;
                              setFormData({ ...formData, students: updated });
                            }}
                            required
                          />
                        </div>

                        {/* Bloco Responsável (Abaixo dos dados do estudante) */}
                        <div className="form-group full-width" style={{ marginTop: '0.5rem', backgroundColor: 'var(--bg-card)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                          <label className="form-label" style={{ fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                            Responsável pelo(a) Estudante
                          </label>
                          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.5fr', gap: '0.75rem' }}>
                            <div>
                              <input
                                type="text"
                                placeholder="Nome do responsável..."
                                className="form-control"
                                value={student.guardian.name}
                                onChange={(e) => {
                                  const updated = [...formData.students];
                                  updated[sIdx].guardian.name = e.target.value;
                                  setFormData({ ...formData, students: updated });
                                }}
                                required
                              />
                            </div>
                            <div>
                              <select
                                className="form-select"
                                value={student.guardian.bond}
                                onChange={(e) => {
                                  const updated = [...formData.students];
                                  updated[sIdx].guardian.bond = e.target.value;
                                  setFormData({ ...formData, students: updated });
                                }}
                              >
                                <option value="Mãe">Mãe</option>
                                <option value="Pai">Pai</option>
                                <option value="Responsável">Responsável</option>
                                <option value="Avó/Avô">Avó / Avô</option>
                                <option value="Tio/Tia">Tio / Tia</option>
                                <option value="Outro">Outro</option>
                              </select>
                            </div>
                            <div>
                              <input
                                type="text"
                                placeholder="Telefone de contato..."
                                className="form-control"
                                value={student.guardian.contact}
                                onChange={(e) => {
                                  const updated = [...formData.students];
                                  updated[sIdx].guardian.contact = formatPhone(e.target.value);
                                  setFormData({ ...formData, students: updated });
                                }}
                                maxLength={15}
                                required
                              />
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}

                  {/* Botão Adicionar Estudante */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0 1.5rem 0', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          students: [...formData.students, createDefaultStudent()]
                        });
                      }}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      ➕ Adicionar Estudante
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: '600' }}>Data do atendimento:</label>
                      <input
                        type="date"
                        className="form-control"
                        style={{ width: '160px' }}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => setFormStep(2)}
                      disabled={!isStep1Valid}
                    >
                      Continuar para Passo 2 ➡️
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  PASSO 2: ASSUNTO PRIMEIRO + CLASSIFICAÇÃO DA OCORRÊNCIA (Nova Taxonomia)
                  ========================================================================= */}
              {formStep === 2 && (
                <div className="fade-in">
                  <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', color: 'var(--primary)' }}>
                    Passo 2: Assunto e Classificação do Atendimento
                  </h4>
                  
                  {/* 1. Assunto/Descrição do Ocorrido VEM PRIMEIRO (Apontamento 4a) */}
                  <div className="form-group full-width" style={{ marginBottom: '1.5rem' }}>
                    <label className="form-label" style={{ fontWeight: '700', fontSize: '0.95rem' }}>
                      Assunto / Descrição do Ocorrido
                    </label>
                    <textarea
                      placeholder="Relate detalhadamente o ocorrido ou o motivo do atendimento..."
                      className="form-textarea"
                      style={{ minHeight: '160px' }}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                      <span>Mínimo 10 caracteres.</span>
                      <span>Atual: {formData.subject.trim().length}</span>
                    </div>
                  </div>

                  {/* 2. Classificação da Ocorrência em 3 Níveis (Apontamento 4b) */}
                  <div className="form-group full-width">
                    <label className="form-label" style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                      Classificação da Ocorrência (Selecione uma ou mais)
                    </label>

                    <div style={{ maxHeight: '420px', overflowY: 'auto', paddingRight: '0.25rem' }}>
                      {Object.entries(TAXONOMY_TREE).map(([nature, dimensions]) => (
                        <div key={nature} className="taxonomy-nature-card">
                          <div className="taxonomy-nature-header">
                            <span>🏷️</span>
                            <span>{nature}</span>
                          </div>
                          
                          {Object.entries(dimensions).map(([dimension, terms]) => (
                            <div key={dimension} className="taxonomy-dimension-block">
                              <div className="taxonomy-dimension-title">
                                Dimensão: {dimension}
                              </div>
                              <div className="taxonomy-items-grid">
                                {terms.map(term => {
                                  const isChecked = (formData.classifications || []).includes(term);
                                  return (
                                    <label key={term} className="taxonomy-item-label">
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={(e) => {
                                          let updatedList = [...(formData.classifications || [])];
                                          if (e.target.checked) {
                                            updatedList.push(term);
                                          } else {
                                            updatedList = updatedList.filter(item => item !== term);
                                          }
                                          setFormData({ ...formData, classifications: updatedList });
                                        }}
                                      />
                                      <span>{term}</span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                    <button className="btn btn-secondary" onClick={() => setFormStep(1)}>
                      ⬅️ Voltar ao Passo 1
                    </button>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => setFormStep(3)}
                      disabled={!isStep2Valid}
                    >
                      Continuar para Passo 3 ➡️
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  PASSO 3: SENTIMENTOS IDENTIFICADOS (NOVO PASSO - Apontamento 5)
                  ========================================================================= */}
              {formStep === 3 && (
                <div className="fade-in">
                  <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconHeart style={{ color: 'var(--accent-orange)' }} />
                    <span>Passo 3: Sentimentos Identificados</span>
                  </h4>
                  
                  {/* CNV Guideline Banner */}
                  <div className="cnv-banner">
                    <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                      Selecione os sentimentos percebidos ou expressos durante o atendimento. (É possível selecionar mais de uma opção).
                    </p>
                    <p style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                      Utilize termos que expressem emoções e sentimentos, evitando julgamentos, rótulos ou diagnósticos.
                    </p>
                  </div>

                  {/* Feelings Grid */}
                  <div className="feelings-grid">
                    {FEELINGS_LIST.map(feeling => {
                      const isSelected = (formData.feelings || []).includes(feeling);
                      return (
                        <div
                          key={feeling}
                          className={`feeling-checkbox-card ${isSelected ? 'selected' : ''}`}
                          onClick={() => {
                            let updated = [...(formData.feelings || [])];
                            if (isSelected) {
                              updated = updated.filter(f => f !== feeling);
                            } else {
                              updated.push(feeling);
                            }
                            setFormData({ ...formData, feelings: updated });
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                            style={{ pointerEvents: 'none' }}
                          />
                          <span>{feeling}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Outro Sentimento Especificado */}
                  {(formData.feelings || []).includes('Outro') && (
                    <div className="form-group full-width fade-in" style={{ marginBottom: '1.25rem' }}>
                      <label className="form-label">Especifique o outro sentimento</label>
                      <input
                        type="text"
                        placeholder="Qual outro sentimento foi identificado?..."
                        className="form-control"
                        value={formData.customFeeling || ''}
                        onChange={(e) => setFormData({ ...formData, customFeeling: e.target.value })}
                        required
                      />
                    </div>
                  )}

                  {/* Observações sobre os Sentimentos */}
                  <div className="form-group full-width" style={{ marginTop: '1rem' }}>
                    <label className="form-label" style={{ fontWeight: '600' }}>
                      Observações sobre os sentimentos (opcional)
                    </label>
                    <textarea
                      placeholder="Descreva quando necessário, a forma como a pessoa expressou cada sentimento e em qual contexto foi identificado. Ex.: O estudante demonstrou frustração ao falar sobre o conflito com o colega..."
                      className="form-textarea"
                      style={{ minHeight: '110px' }}
                      maxLength={500}
                      value={formData.feelings_observations || ''}
                      onChange={(e) => setFormData({ ...formData, feelings_observations: e.target.value })}
                    />
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                      <span>Essas informações ajudam a compreender a situação e orientar intervenções restaurativas.</span>
                      <span>{(formData.feelings_observations || '').length} / 500</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                    <button className="btn btn-secondary" onClick={() => setFormStep(2)}>
                      ⬅️ Voltar ao Passo 2
                    </button>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => setFormStep(4)}
                      disabled={!isStep3Valid}
                    >
                      Continuar para Passo 4 ➡️
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  PASSO 4: ENCAMINHAMENTOS + REDE DE PROTEÇÃO / DIREÇÃO (Apontamentos 6 e 7)
                  ========================================================================= */}
              {formStep === 4 && (
                <div className="fade-in">
                  <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', color: 'var(--primary)' }}>
                    Passo 4: Encaminhamentos e Observações
                  </h4>
                  
                  <div className="form-grid">
                    {/* Encaminhamentos Escolares */}
                    <div className="form-group full-width">
                      <label className="form-label" style={{ fontWeight: '600' }}>
                        Encaminhamentos (Ações Tomadas)
                      </label>
                      <textarea
                        placeholder="Ex: Conversei com os estudantes. Realizada roda de conversa sobre convivência; Reunião com responsáveis; Mediação pedagógica..."
                        className="form-textarea"
                        style={{ minHeight: '120px' }}
                        value={formData.referrals}
                        onChange={(e) => setFormData({ ...formData, referrals: e.target.value })}
                        required
                      />
                    </div>

                    {/* Observações Adicionais */}
                    <div className="form-group full-width">
                      <label className="form-label" style={{ fontWeight: '600' }}>
                        Observações Adicionais (Opcional)
                      </label>
                      <textarea
                        placeholder="A coordenação junto ao professor referência da turma vai realizar acompanhamento; combinou-se elaboração de cartilha temática..."
                        className="form-textarea"
                        style={{ minHeight: '100px' }}
                        value={formData.observations}
                        onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                      />
                    </div>

                    {/* Encaminhamento Direção / Rede de Proteção (Apontamento 7) */}
                    <div className="form-group full-width" style={{ marginTop: '0.75rem', backgroundColor: 'var(--bg-app)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                      <label className="form-label" style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>
                        Encaminhamento Direção (Se Necessário)
                      </label>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
                        Usado quando houver indícios de violação de direito ou necessidade de proteção especializada.
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '0.75rem' }}>
                        {DIRECTION_REFERRALS_LIST.map(item => {
                          const isChecked = (formData.direction_referrals || []).includes(item);
                          return (
                            <label key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => {
                                  let updated = [...(formData.direction_referrals || [])];
                                  if (e.target.checked) {
                                    updated.push(item);
                                  } else {
                                    updated = updated.filter(i => i !== item);
                                  }
                                  setFormData({ ...formData, direction_referrals: updated });
                                }}
                              />
                              <span>{item}</span>
                            </label>
                          );
                        })}
                      </div>

                      {(formData.direction_referrals || []).includes('Outro') && (
                        <div style={{ marginTop: '0.75rem' }}>
                          <input
                            type="text"
                            placeholder="Especifique o outro encaminhamento da direção..."
                            className="form-control"
                            value={formData.customDirectionReferral || ''}
                            onChange={(e) => setFormData({ ...formData, customDirectionReferral: e.target.value })}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                    <button className="btn btn-secondary" onClick={() => setFormStep(3)}>
                      ⬅️ Voltar ao Passo 3
                    </button>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => setFormStep(5)}
                      disabled={!isStep4Valid}
                    >
                      Revisar Registro ➡️
                    </button>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  PASSO 5: REVISAR REGISTRO DE ATENDIMENTO (Apontamento 8)
                  ========================================================================= */}
              {formStep === 5 && (
                <div className="fade-in">
                  <h4 style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', color: 'var(--primary)' }}>
                    Passo 5: Revisar Registro de Atendimento
                  </h4>

                  <div style={{ backgroundColor: 'var(--bg-app)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                    
                    {/* Estudantes */}
                    <div style={{ marginBottom: '1rem' }}>
                      <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '0.35rem' }}>
                        Estudante(s) Vinculado(s):
                      </strong>
                      {formData.students.map((st, i) => (
                        <div key={i} style={{ padding: '0.5rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '0.35rem' }}>
                          <p><strong>{st.studentName}</strong> ({st.sex || 'Não informado'} | Turno: {st.turn || 'Não informado'})</p>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                            {st.gradeCycle} - {st.className} | Prof: {st.teacherName} ({st.subject_matter})
                          </p>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                            Responsável: {st.guardian.name} ({st.guardian.bond}) - Contato: {st.guardian.contact}
                          </p>
                        </div>
                      ))}
                    </div>

                    <p style={{ marginBottom: '0.5rem' }}>
                      <strong>Data do Atendimento:</strong> {new Date(formData.date).toLocaleDateString('pt-BR')}
                    </p>

                    {/* Classificações */}
                    <div style={{ marginBottom: '0.75rem' }}>
                      <strong>Classificações da Ocorrência:</strong>
                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                        {formData.classifications.map(c => (
                          <span key={c} className="badge badge-primary">{c}</span>
                        ))}
                      </div>
                    </div>

                    {/* Sentimentos */}
                    {formData.feelings.length > 0 && (
                      <div style={{ marginBottom: '0.75rem' }}>
                        <strong>Sentimentos Identificados:</strong>
                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                          {formData.feelings.map(f => (
                            <span key={f} className="badge badge-warning">{f}</span>
                          ))}
                        </div>
                        {formData.feelings_observations && (
                          <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.25rem', fontSize: '0.825rem' }}>
                            "{formData.feelings_observations}"
                          </p>
                        )}
                      </div>
                    )}
                    
                    {/* Assunto */}
                    <div style={{ marginTop: '1rem', borderTop: '1px dashed var(--border-color)', paddingTop: '0.75rem' }}>
                      <strong>Assunto (Relato do Ocorrido):</strong>
                      <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>
                        {formData.subject}
                      </p>
                    </div>

                    {/* Encaminhamentos */}
                    <div style={{ marginTop: '0.75rem' }}>
                      <strong>Encaminhamentos Tomados:</strong>
                      <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>
                        {formData.referrals}
                      </p>
                    </div>

                    {/* Rede de Proteção */}
                    {formData.direction_referrals.length > 0 && (
                      <div style={{ marginTop: '0.75rem' }}>
                        <strong>Encaminhamentos Direção / Rede de Proteção:</strong>
                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                          {formData.direction_referrals.map(r => (
                            <span key={r} className="badge badge-danger">{r}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.observations && (
                      <div style={{ marginTop: '0.75rem' }}>
                        <strong>Observações Adicionais:</strong>
                        <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.25rem' }}>
                          {formData.observations}
                        </p>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <button className="btn btn-secondary" onClick={() => setFormStep(4)}>
                      ⬅️ Editar Dados
                    </button>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button 
                        type="button"
                        className="btn btn-secondary" 
                        style={{ backgroundColor: 'var(--warning-light)', color: 'var(--warning-hover)', borderColor: 'var(--warning)' }}
                        onClick={() => {
                          const tempOcc = {
                            ...formData,
                            schoolId: user.schoolId || formData.schoolId || schools[0]?.id,
                            createdById: user.id,
                            createdByName: user.name,
                            status: 'rascunho'
                          };
                          handlePrint(tempOcc);
                        }}
                      >
                        🖨️ Imprimir Prévia (Rascunho)
                      </button>
                      <button 
                        type="button"
                        className="btn btn-warning" 
                        style={{ backgroundColor: 'var(--accent-orange)', color: 'white', border: 'none' }}
                        onClick={() => handleSaveOccurrence('rascunho')}
                      >
                        💾 Salvar Rascunho
                      </button>
                      <button 
                        type="button"
                        className="btn btn-success" 
                        onClick={() => handleSaveOccurrence('finalizado')}
                      >
                        ✅ Finalizar e Salvar
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ----------------- TAB: GERENCIAR ESCOLAS (GESTOR / SEDUC / SUPERADMIN) ----------------- */}
        {activeTab === 'schools' && (user.role === 'gestor' || user.role === 'seduc' || user.role === 'superadmin') && (
          <div className="fade-in">
            <h2>Gerenciamento de Escolas</h2>
            
            <div className="form-grid" style={{ gridTemplateColumns: '1fr 2fr', gap: '1.5rem', alignItems: 'start' }}>
              
              <div className="card">
                <div className="card-header">
                  <h3>{editingSchool ? 'Editar Escola' : 'Cadastrar Nova Escola'}</h3>
                </div>
                <form className="card-body" onSubmit={async (e) => {
                  e.preventDefault();
                  if (!newSchoolName.trim()) return;
                  try {
                    const payload = editingSchool ? { id: editingSchool.id, name: newSchoolName } : { name: newSchoolName };
                    const res = await fetch('/api/schools', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload)
                    });
                    if (res.ok) {
                      setNewSchoolName('');
                      setEditingSchool(null);
                      fetchSchools();
                    }
                  } catch (err) {
                    console.error('Error saving school:', err);
                    alert('Erro ao salvar escola.');
                  }
                }}>
                  <div className="form-group" style={{ marginBottom: '1rem' }}>
                    <label className="form-label">Nome da Escola Municipal</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ex: Escola Municipal Cecília Meireles"
                      value={newSchoolName}
                      onChange={(e) => setNewSchoolName(e.target.value)}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                      {editingSchool ? 'Salvar Alterações' : 'Cadastrar Escola'}
                    </button>
                    {editingSchool && (
                      <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={() => {
                          setEditingSchool(null);
                          setNewSchoolName('');
                        }}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3>Escolas Cadastradas ({schools.length})</h3>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nome da Escola</th>
                          <th style={{ textAlign: 'right' }}>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schools.map(s => (
                          <tr key={s.id}>
                            <td style={{ color: 'var(--text-muted)' }}>{s.id}</td>
                            <td style={{ fontWeight: '600' }}>{s.name}</td>
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                                <button 
                                  className="btn btn-secondary" 
                                  style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                                  onClick={() => {
                                    setEditingSchool(s);
                                    setNewSchoolName(s.name);
                                  }}
                                >
                                  Editar
                                </button>
                                <button 
                                  className="btn btn-danger" 
                                  style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                                  onClick={async () => {
                                    if (!confirm('Deseja realmente excluir esta escola?')) return;
                                    try {
                                      const res = await fetch(`/api/schools/${s.id}`, { method: 'DELETE' });
                                      if (res.ok) fetchSchools();
                                    } catch (err) {
                                      console.error('Delete school error:', err);
                                      alert('Erro ao excluir escola.');
                                    }
                                  }}
                                >
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}><IconTrash /> Excluir</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ----------------- TAB: GERENCIAR USUÁRIOS (GESTOR / SEDUC / SUPERADMIN) ----------------- */}
        {activeTab === 'users' && (user.role === 'gestor' || user.role === 'seduc' || user.role === 'superadmin') && (
          <div className="fade-in">
            <h2>Gerenciamento de Usuários</h2>
            
            <div className="form-grid" style={{ gridTemplateColumns: '1fr 2fr', gap: '1.5rem', alignItems: 'start' }}>
              
              <div className="card">
                <div className="card-header">
                  <h3>Cadastrar Novo Usuário</h3>
                </div>
                <form className="card-body" onSubmit={async (e) => {
                  e.preventDefault();
                  const classes = newUserData.classesInput
                    ? newUserData.classesInput.split(',').map(c => c.trim())
                    : [];
                  const payload = {
                    name: newUserData.name,
                    email: newUserData.email,
                    phone: newUserData.phone,
                    cpf: newUserData.cpf.replace(/\D/g, ''),
                    password: newUserData.password,
                    role: newUserData.role,
                    schoolId: (newUserData.role === 'gestor' || newUserData.role === 'seduc') ? null : newUserData.schoolId,
                    classes: classes
                  };

                  try {
                    const res = await fetch('/api/users', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload)
                    });
                    if (res.ok) {
                      setNewUserData({ name: '', cpf: '', email: '', phone: '', password: '', role: 'pedagogo', schoolId: '', classesInput: '' });
                      fetchUsers();
                    } else {
                      const err = await res.json();
                      alert(err.error || 'Erro ao criar usuário.');
                    }
                  } catch (err) {
                    console.error('Create user error:', err);
                    alert('Erro de conexão ao criar usuário.');
                  }
                }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Nome Completo</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ex: Ana Souza"
                      value={newUserData.name}
                      onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">E-mail Institucional</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Ex: ana@educacao.contagem.mg.gov.br"
                      value={newUserData.email || ''}
                      onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div className="form-group">
                      <label className="form-label">CPF</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="000.000.000-00"
                        value={newUserData.cpf}
                        onChange={(e) => setNewUserData({ ...newUserData, cpf: formatCPF(e.target.value) })}
                        maxLength={14}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Telefone</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="(31) 90000-0000"
                        value={newUserData.phone || ''}
                        onChange={(e) => setNewUserData({ ...newUserData, phone: formatPhone(e.target.value) })}
                        maxLength={15}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Senha Provisória</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Senha provisória..."
                      value={newUserData.password}
                      onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Nível de Permissão</label>
                    <select
                      className="form-select"
                      value={newUserData.role}
                      onChange={(e) => setNewUserData({ ...newUserData, role: e.target.value })}
                      required
                    >
                      <option value="pedagogo">Pedagogo(a)</option>
                      <option value="diretor">Diretor(a)</option>
                      <option value="assistente">Assistente Escolar</option>
                      <option value="seduc">Seduc / Gestor Central</option>
                      <option value="gestor">Gestor do Projeto</option>
                    </select>
                  </div>

                  {newUserData.role !== 'gestor' && newUserData.role !== 'seduc' && (
                    <div className="form-group">
                      <label className="form-label">Escola Designada</label>
                      <select
                        className="form-select"
                        value={newUserData.schoolId}
                        onChange={(e) => setNewUserData({ ...newUserData, schoolId: e.target.value })}
                        required
                      >
                        <option value="">Selecione uma escola...</option>
                        {schools.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {newUserData.role === 'pedagogo' && (
                    <div className="form-group">
                      <label className="form-label">Turmas Vinculadas (Separadas por vírgula)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ex: 5º Ano A, 5º Ano B, 4º Ano A"
                        value={newUserData.classesInput}
                        onChange={(e) => setNewUserData({ ...newUserData, classesInput: e.target.value })}
                      />
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Cadastrar Usuário
                  </button>
                </form>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3>Usuários Cadastrados ({usersList.length})</h3>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>CPF</th>
                          <th>Permissão</th>
                          <th>Escola</th>
                          <th>Turmas</th>
                          <th style={{ textAlign: 'right' }}>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersList.map(u => {
                          const schoolName = schools.find(s => s.id === u.schoolId)?.name || 'Rede Geral';
                          return (
                            <tr key={u.id}>
                              <td style={{ fontWeight: '600' }}>{u.name}</td>
                              <td>{u.cpf}</td>
                              <td>
                                <span className={`badge ${
                                  u.role === 'superadmin' ? 'badge-primary' :
                                  u.role === 'gestor' || u.role === 'seduc' ? 'badge-danger' : 
                                  u.role === 'diretor' ? 'badge-primary' : 'badge-success'
                                }`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                  {u.role}
                                  <button
                                    type="button"
                                    className="help-role-badge"
                                    style={{ width: '18px', height: '18px', fontSize: '0.65rem', marginLeft: '4px' }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setTutorialSelectedRole(u.role === 'seduc' ? 'seduc' : u.role);
                                      setTutorialSubTab('overview');
                                      setShowRoleTutorialModal(true);
                                    }}
                                  >
                                    ❓
                                    <span className="tooltip-role-text">
                                      💡 Tutorial e Permissões ({ROLE_TUTORIALS_DATA[u.role]?.name || u.role})
                                    </span>
                                  </button>
                                </span>
                              </td>
                              <td style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {schoolName}
                              </td>
                              <td>
                                {u.classes && u.classes.length > 0 ? u.classes.join(', ') : '-'}
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                {u.id !== user.id && (
                                  <button 
                                    className="btn btn-danger" 
                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                                    onClick={async () => {
                                      if (!confirm('Deseja realmente excluir este usuário?')) return;
                                      try {
                                        const res = await fetch(`/api/users/${u.id}`, { method: 'DELETE' });
                                        if (res.ok) fetchUsers();
                                      } catch (err) {
                                        console.error('Delete user error:', err);
                                        alert('Erro ao excluir usuário.');
                                      }
                                    }}
                                  >
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IconTrash /> Excluir</span>
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ----------------- TAB: RELATÓRIOS (ADAPTÁVEL POR PERFIL) ----------------- */}
        {activeTab === 'reports' && (
          <div className="fade-in">
            {/* RELATÓRIO DO PEDAGOGO / ASSISTENTE */}
            {(user.role === 'pedagogo' || user.role === 'assistente') && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h2>📊 Relatório Pedagógico & Atendimentos da Unidade</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      Acompanhamento individual de registros realizados por <strong>{user.name}</strong> | {user.schoolName || 'Escola Municipal'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button className="btn btn-primary" onClick={() => window.print()}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IconPrinter /> Imprimir Relatório Pedagógico</span>
                    </button>
                    <button className="btn btn-success" onClick={handleExportSPSS}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IconFolder /> Exportar Planilha (CSV)</span>
                    </button>
                  </div>
                </div>

                {/* 4 Cards de Métricas Pedagógicas */}
                <div className="metrics-grid" style={{ marginBottom: '1.75rem' }}>
                  <div className="metric-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                    <div className="metric-icon" style={{ color: 'var(--primary)' }}><IconUsers /></div>
                    <div className="metric-details">
                      <h4>Cadastrados por Mim</h4>
                      <div className="metric-value">{occurrences.filter(o => o.createdById === user.id).length}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Atendimentos registrados por você</span>
                    </div>
                  </div>

                  <div className="metric-card" style={{ borderLeft: '4px solid #3b82f6' }}>
                    <div className="metric-icon" style={{ color: '#3b82f6' }}><IconSchool /></div>
                    <div className="metric-details">
                      <h4>Total na Minha Escola</h4>
                      <div className="metric-value">{occurrences.length}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.schoolName}</span>
                    </div>
                  </div>

                  <div className="metric-card" style={{ borderLeft: '4px solid var(--accent-orange)' }}>
                    <div className="metric-icon" style={{ color: 'var(--accent-orange)' }}><IconFolder /></div>
                    <div className="metric-details">
                      <h4>Meus Rascunhos</h4>
                      <div className="metric-value">{occurrences.filter(o => o.createdById === user.id && o.status === 'rascunho').length}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pendentes de finalização</span>
                    </div>
                  </div>

                  <div className="metric-card" style={{ borderLeft: '4px solid var(--success)' }}>
                    <div className="metric-icon" style={{ color: 'var(--success)' }}><IconShield /></div>
                    <div className="metric-details">
                      <h4>Com Visto da Direção</h4>
                      <div className="metric-value">{occurrences.filter(o => o.createdById === user.id && Boolean(o.directorNotes && o.directorNotes.trim())).length}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Homologados pela diretoria</span>
                    </div>
                  </div>
                </div>

                {/* Quadro 1: Distribuição de Ocorrências por Turma */}
                <div className="card" style={{ marginBottom: '1.75rem' }}>
                  <div className="card-header">
                    <h3>🏫 Distribuição de Atendimentos por Turma & Ciclo</h3>
                  </div>
                  <div className="card-body" style={{ padding: 0 }}>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Turma / Ciclo</th>
                            <th>Total na Turma</th>
                            <th>Cadastrados por Mim</th>
                            <th>Estudantes Atendidos</th>
                            <th>Perturbadoras</th>
                            <th>Agressivas/Violentas</th>
                            <th>Situações de Risco</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getTurmasReport().map(t => (
                            <tr key={t.className}>
                              <td style={{ fontWeight: '700' }}>{t.className}</td>
                              <td><span className="badge badge-primary">{t.count}</span></td>
                              <td><span className="badge badge-secondary" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: '700' }}>{t.myCount}</span></td>
                              <td>{t.studentsCount}</td>
                              <td>{t.perturbadoras}</td>
                              <td>{t.agressivas}</td>
                              <td>{t.risco > 0 ? <span style={{ color: 'var(--danger)', fontWeight: '700' }}>{t.risco}</span> : 0}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Grid 2 Colunas: Sentimentos CNV e Rede de Proteção */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
                  {/* Sentimentos CNV */}
                  <div className="card">
                    <div className="card-header">
                      <h3>💬 Sentimentos Identificados (Escuta Ativa CNV)</h3>
                    </div>
                    <div className="card-body">
                      {getSentimentosReport().length === 0 ? (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Nenhum sentimento mapeado nos atendimentos.</p>
                      ) : (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {getSentimentosReport().map(s => (
                            <span key={s.feeling} className="badge badge-warning" style={{ padding: '0.45rem 0.75rem', fontSize: '0.825rem' }}>
                              {s.feeling}: <strong>{s.count}</strong>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Encaminhamentos */}
                  <div className="card">
                    <div className="card-header">
                      <h3>🛡️ Rede de Proteção & Encaminhamentos Externos</h3>
                    </div>
                    <div className="card-body">
                      {getEncaminhamentosReport().length === 0 ? (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Nenhum encaminhamento externo registrado.</p>
                      ) : (
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {getEncaminhamentosReport().map(e => (
                            <span key={e.name} className="badge badge-danger" style={{ padding: '0.45rem 0.75rem', fontSize: '0.825rem' }}>
                              {e.name}: <strong>{e.count}</strong>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* RELATÓRIO DO DIRETOR */}
            {user.role === 'diretor' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h2>📊 Relatório de Gestão Escolar & Clima Institucional</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      Visão administrativa, homologação de vistos e mediação de conflitos da <strong>{user.schoolName || 'Escola Municipal'}</strong>
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button className="btn btn-primary" onClick={() => window.print()}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IconPrinter /> Imprimir Relatório da Diretoria</span>
                    </button>
                    <button className="btn btn-success" onClick={handleExportSPSS}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IconFolder /> Exportar Planilha (CSV)</span>
                    </button>
                  </div>
                </div>

                {/* 4 Cards de Métricas da Diretoria */}
                <div className="metrics-grid" style={{ marginBottom: '1.75rem' }}>
                  <div className="metric-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                    <div className="metric-icon" style={{ color: 'var(--primary)' }}><IconSchool /></div>
                    <div className="metric-details">
                      <h4>Total Ocorrências</h4>
                      <div className="metric-value">{occurrences.length}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Recebidas na escola</span>
                    </div>
                  </div>

                  <div className="metric-card" style={{ borderLeft: '4px solid var(--success)' }}>
                    <div className="metric-icon" style={{ color: 'var(--success)' }}><IconShield /></div>
                    <div className="metric-details">
                      <h4>Vistos Homologados</h4>
                      <div className="metric-value">{occurrences.filter(o => Boolean(o.directorNotes && o.directorNotes.trim())).length}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Com visto/parecer assinado</span>
                    </div>
                  </div>

                  <div className="metric-card" style={{ borderLeft: '4px solid var(--accent-orange)' }}>
                    <div className="metric-icon" style={{ color: 'var(--accent-orange)' }}><IconWarning /></div>
                    <div className="metric-details">
                      <h4>Pendentes de Visto</h4>
                      <div className="metric-value">{occurrences.filter(o => !o.directorNotes && o.status !== 'rascunho').length}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Aguardando análise da direção</span>
                    </div>
                  </div>

                  <div className="metric-card" style={{ borderLeft: '4px solid var(--danger)' }}>
                    <div className="metric-icon" style={{ color: 'var(--danger)' }}><IconActivity /></div>
                    <div className="metric-details">
                      <h4>Casos Críticos / Risco</h4>
                      <div className="metric-value">{occurrences.filter(o => occurrenceHasNature(o, 'Risco') || occurrenceHasNature(o, 'Agressiva')).length}</div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Agressões e situações de risco</span>
                    </div>
                  </div>
                </div>

                {/* Quadro 1: Acompanhamento de Vistos por Turma */}
                <div className="card" style={{ marginBottom: '1.75rem' }}>
                  <div className="card-header">
                    <h3>🏫 Acompanhamento de Ocorrências e Vistos por Turma</h3>
                  </div>
                  <div className="card-body" style={{ padding: 0 }}>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Turma / Ciclo</th>
                            <th>Total Ocorrências</th>
                            <th>Com Visto Direção</th>
                            <th>Pendentes de Visto</th>
                            <th>Casos de Risco</th>
                            <th>Taxa de Homologação</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getTurmasReport().map(t => {
                            const taxa = t.count > 0 ? Math.round((t.comVisto / t.count) * 100) : 0;
                            return (
                              <tr key={t.className}>
                                <td style={{ fontWeight: '700' }}>{t.className}</td>
                                <td><span className="badge badge-primary">{t.count}</span></td>
                                <td><span className="badge badge-success">{t.comVisto}</span></td>
                                <td>
                                  {t.semVisto > 0 ? (
                                    <span className="badge badge-warning">{t.semVisto} pendentes</span>
                                  ) : (
                                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Em dia</span>
                                  )}
                                </td>
                                <td>{t.risco > 0 ? <span style={{ color: 'var(--danger)', fontWeight: '700' }}>{t.risco}</span> : 0}</td>
                                <td>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ flex: 1, backgroundColor: 'var(--bg-app)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                                      <div style={{ width: `${taxa}%`, backgroundColor: taxa === 100 ? 'var(--success)' : 'var(--accent-orange)', height: '100%' }}></div>
                                    </div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '700', minWidth: '32px' }}>{taxa}%</span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Grid 2 Colunas: Ocorrências por Disciplina/Professor e Rede de Proteção */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
                  {/* Conflitos por Disciplina/Professor */}
                  <div className="card">
                    <div className="card-header">
                      <h3>📚 Conflitos por Componente Curricular / Docente</h3>
                    </div>
                    <div className="card-body" style={{ padding: 0 }}>
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Componente / Professor</th>
                              <th style={{ textAlign: 'right' }}>Registros</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getDisciplinasReport().map(d => (
                              <tr key={d.key}>
                                <td><strong>{d.subject}</strong> <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>({d.teacher})</span></td>
                                <td style={{ textAlign: 'right', fontWeight: '700' }}><span className="badge badge-primary">{d.count}</span></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* Rede de Proteção */}
                  <div className="card">
                    <div className="card-header">
                      <h3>⚖️ Encaminhamentos a Órgãos da Rede de Proteção</h3>
                    </div>
                    <div className="card-body">
                      {getEncaminhamentosReport().length === 0 ? (
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Nenhum encaminhamento oficial para órgãos externos.</p>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {getEncaminhamentosReport().map(e => (
                            <div key={e.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                              <span style={{ fontWeight: '600', fontSize: '0.85rem' }}>{e.name}</span>
                              <span className="badge badge-danger">{e.count} acionamentos</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* RELATÓRIO DO GESTOR / SEDUC / SUPER ADMIN */}
            {(user.role === 'gestor' || user.role === 'seduc' || user.role === 'superadmin') && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h2>📊 Relatório Consolidado de Clima Escolar da Rede Municipal</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      Visão analítica completa das ocorrências na rede municipal de ensino
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <button className="btn btn-primary" onClick={() => window.print()}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IconPrinter /> Imprimir Relatório Geral</span>
                    </button>
                    <button className="btn btn-success" onClick={handleExportSPSS}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IconFolder /> Exportar SPSS / CSV</span>
                    </button>
                  </div>
                </div>

                {/* Metrics Grid da Rede */}
                <div className="metrics-grid" style={{ marginBottom: '1.75rem' }}>
                  <div className="metric-card">
                    <div className="metric-icon" style={{ color: 'var(--primary)' }}><IconSchool /></div>
                    <div className="metric-details">
                      <h4>Total Escolas</h4>
                      <div className="metric-value">{schools.length}</div>
                    </div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-icon" style={{ color: 'var(--accent-orange)' }}><IconFolder /></div>
                    <div className="metric-details">
                      <h4>Total Ocorrências</h4>
                      <div className="metric-value">{occurrences.length}</div>
                    </div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-icon" style={{ color: 'var(--success)' }}><IconUsers /></div>
                    <div className="metric-details">
                      <h4>Média / Escola</h4>
                      <div className="metric-value">
                        {schools.length > 0 ? (occurrences.length / schools.length).toFixed(1) : 0}
                      </div>
                    </div>
                  </div>
                  <div className="metric-card">
                    <div className="metric-icon" style={{ color: 'var(--danger)' }}><IconShield /></div>
                    <div className="metric-details">
                      <h4>Com Visto Direção</h4>
                      <div className="metric-value">{occurrences.filter(o => o.directorNotes).length}</div>
                    </div>
                  </div>
                </div>

                {/* Tabela Comparativa por Escola */}
                <div className="card" style={{ marginBottom: '1.75rem' }}>
                  <div className="card-header">
                    <h3>🏫 Quadro Comparativo por Unidade Escolar</h3>
                  </div>
                  <div className="card-body" style={{ padding: 0 }}>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Unidade Escolar</th>
                            <th>Total Ocorrências</th>
                            <th>Com Visto</th>
                            <th>Pendentes de Visto</th>
                            <th>Casos Críticos / Risco</th>
                            <th>Rascunhos</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getEscolasReport().map(escola => (
                            <tr key={escola.id}>
                              <td style={{ fontWeight: '600' }}>{escola.name}</td>
                              <td><span className="badge badge-primary">{escola.total}</span></td>
                              <td><span className="badge badge-success">{escola.comVisto}</span></td>
                              <td>{escola.semVisto > 0 ? <span className="badge badge-warning">{escola.semVisto}</span> : '-'}</td>
                              <td>{escola.riscos > 0 ? <span style={{ color: 'var(--danger)', fontWeight: '700' }}>{escola.riscos}</span> : 0}</td>
                              <td>{escola.rascunhos > 0 ? <span className="badge badge-secondary">{escola.rascunhos}</span> : '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

        {/* ----------------- TAB: ADMINISTRAÇÃO DO SISTEMA (SUPER ADMIN) ----------------- */}
        {activeTab === 'sysadmin' && (user.role === 'superadmin' || impersonatedOriginalUser) && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2>⚡ Painel de Administração do Sistema</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Super Administrador Master | Telemetria, auditoria em tempo real, impersonação de contas e backups da rede
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <button 
                  className="btn btn-secondary" 
                  onClick={fetchAdminData}
                  disabled={adminLoading}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <IconRefresh className={adminLoading ? 'spin' : ''} /> {adminLoading ? 'Atualizando...' : 'Atualizar Dados'}
                </button>
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleCreateBackup('manual')}
                  style={{ backgroundColor: '#7c3aed', borderColor: '#7c3aed', color: 'white', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <IconDatabase /> Criar Backup Imediato
                </button>
              </div>
            </div>

            {backupActionStatus && (
              <div style={{ padding: '0.85rem 1.25rem', marginBottom: '1.25rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', border: '1px solid var(--primary)', color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>💾</span>
                <span>{backupActionStatus}</span>
              </div>
            )}

            {/* SEÇÃO 1: TELEMETRIA E SAÚDE DO SISTEMA */}
            <div className="metrics-grid" style={{ marginBottom: '1.75rem' }}>
              <div className="metric-card" style={{ borderLeft: '4px solid #10b981' }}>
                <div className="metric-icon" style={{ color: '#10b981', backgroundColor: '#d1fae5' }}><IconServer /></div>
                <div className="metric-details">
                  <h4>Status Banco de Dados</h4>
                  <div className="metric-value" style={{ fontSize: '1.05rem' }}>
                    {adminMetrics?.supabase?.configured ? '🟢 Supabase Conectado' : '🟡 Fallback Local (db.json)'}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Uptime: {adminMetrics ? `${Math.floor(adminMetrics.uptimeSeconds / 3600)}h ${Math.floor((adminMetrics.uptimeSeconds % 3600) / 60)}m ${adminMetrics.uptimeSeconds % 60}s` : 'Calculando...'}
                  </span>
                </div>
              </div>

              <div className="metric-card" style={{ borderLeft: '4px solid #3b82f6' }}>
                <div className="metric-icon" style={{ color: '#3b82f6', backgroundColor: '#dbeafe' }}><IconUsers /></div>
                <div className="metric-details">
                  <h4>Usuários Cadastrados</h4>
                  <div className="metric-value">{adminMetrics?.counts?.users || usersList.length}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {schools.length} Escolas na rede municipal
                  </span>
                </div>
              </div>

              <div className="metric-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                <div className="metric-icon" style={{ color: '#f59e0b', backgroundColor: '#fef3c7' }}><IconFolder /></div>
                <div className="metric-details">
                  <h4>Total Ocorrências</h4>
                  <div className="metric-value">{adminMetrics?.counts?.occurrences || occurrences.length}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {adminMetrics?.counts?.drafts || 0} Rascunhos privados
                  </span>
                </div>
              </div>

              <div className="metric-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
                <div className="metric-icon" style={{ color: '#8b5cf6', backgroundColor: '#ede9fe' }}><IconDatabase /></div>
                <div className="metric-details">
                  <h4>Central de Backups</h4>
                  <div className="metric-value">{adminMetrics?.counts?.backups || adminBackups.length}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {adminMetrics?.lastBackup ? `Último: ${new Date(adminMetrics.lastBackup.createdAt).toLocaleTimeString('pt-BR')}` : 'Auto snapshot ativo'}
                  </span>
                </div>
              </div>
            </div>

            {/* SEÇÃO 2: CENTRAL DE IMPERSONAÇÃO (TROCA RÁPIDA DE CONTA) */}
            <div className="card" style={{ marginBottom: '1.75rem', border: '1px solid #7c3aed33' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', backgroundColor: 'var(--bg-app)' }}>
                <div>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7c3aed' }}>
                    <IconLightning /> Troca Rápida de Conta & Impersonação (Auditoria Master)
                  </h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    Acesse o sistema diretamente pela visão de qualquer pedagogo, diretor ou assistente da rede para prestar suporte ou auditar lançamentos.
                  </p>
                </div>
                <input
                  type="text"
                  placeholder="Buscar usuário por nome, CPF ou perfil..."
                  className="form-control"
                  style={{ maxWidth: '320px', fontSize: '0.85rem' }}
                  value={impersonateSearch}
                  onChange={(e) => setImpersonateSearch(e.target.value)}
                />
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Nome do Usuário</th>
                        <th>CPF</th>
                        <th>E-mail</th>
                        <th>Perfil</th>
                        <th>Escola Vinculada</th>
                        <th style={{ textAlign: 'right' }}>Ação de Impersonação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList
                        .filter(u => {
                          const query = impersonateSearch.toLowerCase();
                          return (
                            u.name?.toLowerCase().includes(query) ||
                            u.cpf?.includes(query) ||
                            u.role?.toLowerCase().includes(query) ||
                            u.email?.toLowerCase().includes(query)
                          );
                        })
                        .map(u => {
                          const schoolName = schools.find(s => s.id === u.schoolId)?.name || 'Rede Central';
                          const isSelf = u.id === user.id;
                          return (
                            <tr key={u.id}>
                              <td style={{ fontWeight: '600' }}>{u.name}</td>
                              <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{u.cpf}</td>
                              <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{u.email || '-'}</td>
                              <td>
                                <span className={`badge ${
                                  u.role === 'superadmin' ? 'badge-danger' :
                                  u.role === 'gestor' || u.role === 'seduc' ? 'badge-warning' : 
                                  u.role === 'diretor' ? 'badge-primary' : 'badge-success'
                                }`} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                  {u.role.toUpperCase()}
                                  <button
                                    type="button"
                                    className="help-role-badge"
                                    style={{ width: '18px', height: '18px', fontSize: '0.65rem', marginLeft: '4px' }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setTutorialSelectedRole(u.role === 'seduc' ? 'seduc' : u.role);
                                      setTutorialSubTab('overview');
                                      setShowRoleTutorialModal(true);
                                    }}
                                  >
                                    ❓
                                    <span className="tooltip-role-text">
                                      💡 Tutorial e Permissões ({ROLE_TUTORIALS_DATA[u.role]?.name || u.role})
                                    </span>
                                  </button>
                                </span>
                              </td>
                              <td style={{ fontSize: '0.85rem', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {schoolName}
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                {isSelf ? (
                                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Você está aqui</span>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', backgroundColor: '#7c3aed', borderColor: '#7c3aed', color: 'white' }}
                                    onClick={() => handleImpersonate(u)}
                                  >
                                    👤 Entrar como este usuário
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* SEÇÃO 3: CENTRAL DE BACKUP AUTOMÁTICO & RECUPERAÇÃO */}
            <div className="card" style={{ marginBottom: '1.75rem' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconDatabase /> Central de Backup Automático & Recuperação de Desastres
                  </h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    O sistema executa snapshots automáticos contínuos de todas as informações inseridas na rede escolar (escolas, usuários e ocorrências).
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => handleCreateBackup('manual')}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
                >
                  <IconDownload /> Gerar Novo Snapshot Agora
                </button>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                {adminBackups.length === 0 ? (
                  <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Nenhum arquivo de backup encontrado no servidor.
                  </p>
                ) : (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Data e Hora do Snapshot</th>
                          <th>Nome do Arquivo</th>
                          <th>Tamanho</th>
                          <th>Registros Contidos</th>
                          <th style={{ textAlign: 'right' }}>Ações de Recuperação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminBackups.map((b, bIdx) => (
                          <tr key={b.filename || bIdx}>
                            <td style={{ fontWeight: '600' }}>
                              {new Date(b.createdAt).toLocaleString('pt-BR')}
                            </td>
                            <td style={{ color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                              {b.filename}
                            </td>
                            <td>{(b.sizeBytes / 1024).toFixed(1)} KB</td>
                            <td>
                              {b.metadata?.counts ? (
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                  🏫 {b.metadata.counts.schools} | 👥 {b.metadata.counts.users} | 📋 {b.metadata.counts.occurrences}
                                </span>
                              ) : '-'}
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                                <a
                                  href={`/api/admin/backups/${b.filename}`}
                                  download={b.filename}
                                  className="btn btn-secondary"
                                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', textDecoration: 'none' }}
                                >
                                  📥 Baixar JSON
                                </a>
                                <button
                                  type="button"
                                  className="btn btn-warning"
                                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', backgroundColor: 'var(--accent-orange)', color: 'white', border: 'none' }}
                                  onClick={() => handleRestoreBackup(b.filename)}
                                >
                                  🔄 Restaurar Base
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* SEÇÃO 4: LOGS DE ATIVIDADE, AUDITORIA E ERROS */}
            <div className="card">
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconActivity /> Logs de Atividade, Auditoria e Erros do Servidor
                  </h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    Monitoramento em tempo real de requisições, erros HTTP, logins e trilha de auditoria LGPD.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <select
                    className="form-select"
                    style={{ width: '150px', fontSize: '0.8rem' }}
                    value={logFilterLevel}
                    onChange={(e) => {
                      setLogFilterLevel(e.target.value);
                      setTimeout(fetchAdminData, 50);
                    }}
                  >
                    <option value="ALL">Todos os Níveis</option>
                    <option value="ERROR">Apenas Erros (ERROR)</option>
                    <option value="WARN">Avisos (WARN)</option>
                    <option value="AUDIT">Auditoria (AUDIT)</option>
                    <option value="INFO">Informativo (INFO)</option>
                  </select>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={fetchAdminData}
                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                  >
                    <IconRefresh />
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleClearLogs}
                    style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                  >
                    <IconTrash /> Limpar Logs
                  </button>
                </div>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                {adminLogs.length === 0 ? (
                  <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Nenhum log registrado para o filtro selecionado.
                  </p>
                ) : (
                  <div className="table-responsive" style={{ maxHeight: '420px', overflowY: 'auto' }}>
                    <table className="table" style={{ fontSize: '0.825rem' }}>
                      <thead>
                        <tr>
                          <th style={{ width: '160px' }}>Data e Hora</th>
                          <th style={{ width: '90px' }}>Nível</th>
                          <th>Mensagem de Atividade / Erro</th>
                          <th style={{ width: '140px' }}>Metadados</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminLogs.map(log => (
                          <tr key={log.id}>
                            <td style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                              {new Date(log.timestamp).toLocaleTimeString('pt-BR')} ({new Date(log.timestamp).toLocaleDateString('pt-BR')})
                            </td>
                            <td>
                              <span className={`badge ${
                                log.level === 'ERROR' ? 'badge-danger' :
                                log.level === 'WARN' ? 'badge-warning' :
                                log.level === 'AUDIT' ? 'badge-primary' : 'badge-secondary'
                              }`} style={{
                                backgroundColor: log.level === 'AUDIT' ? '#7c3aed' : undefined,
                                color: log.level === 'AUDIT' ? 'white' : undefined
                              }}>
                                {log.level}
                              </span>
                            </td>
                            <td style={{ fontFamily: log.level === 'ERROR' ? 'monospace' : 'inherit', fontWeight: log.level === 'ERROR' ? '600' : 'normal' }}>
                              {log.message}
                            </td>
                            <td style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                              {log.meta ? Object.entries(log.meta).map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : v}`).join(' | ') : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </main>

      {/* DETAIL MODAL (Com suporte a LGPD e observações da direção) */}
      {showDetailModal && selectedOccurrence && (
        <div className="modal-overlay" onClick={() => { setShowDetailModal(false); setSelectedOccurrence(null); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Detalhes do Atendimento</h3>
              <button className="btn btn-secondary" onClick={() => { setShowDetailModal(false); setSelectedOccurrence(null); }}>
                ✕
              </button>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', maxHeight: '80vh' }}>
              
              {/* Toggle LGPD no Modal */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <label 
                  className={`anonymize-badge ${anonymizeView ? 'active' : ''}`}
                  onClick={() => setAnonymizeView(!anonymizeView)}
                >
                  <span>🔒</span>
                  <span>{anonymizeView ? 'LGPD: Nomes Ocultos' : 'Anonimizar (LGPD)'}</span>
                </label>
              </div>

              {/* Estudantes */}
              <div>
                <strong style={{ color: 'var(--primary)' }}>Estudante(s):</strong>
                {(Array.isArray(selectedOccurrence.students) && selectedOccurrence.students.length > 0 ? selectedOccurrence.students : [
                  {
                    studentName: selectedOccurrence.studentName,
                    sex: selectedOccurrence.sex,
                    turn: selectedOccurrence.turn,
                    gradeCycle: selectedOccurrence.gradeCycle,
                    className: selectedOccurrence.className,
                    teacherName: selectedOccurrence.teacherName,
                    subject_matter: selectedOccurrence.subject_matter,
                    guardian: {
                      name: selectedOccurrence.guardianName,
                      bond: 'Responsável',
                      contact: selectedOccurrence.contacts
                    }
                  }
                ]).map((st, i) => (
                  <div key={i} style={{ backgroundColor: 'var(--bg-app)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginTop: '0.35rem' }}>
                    <p><strong>{anonymizeText(st.studentName, anonymizeView)}</strong> ({st.sex || 'Não informado'} | Turno: {st.turn || 'Não informado'})</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
                      {st.gradeCycle} - {st.className} | Prof: {st.teacherName} ({st.subject_matter})
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
                      Responsável: {anonymizeText(st.guardian?.name, anonymizeView)} ({st.guardian?.bond || 'Responsável'}) - Contato: {anonymizeView ? '(XX) XXXXX-XXXX' : (st.guardian?.contact || 'Não informado')}
                    </p>
                  </div>
                ))}
              </div>

              <p><strong>Data da Ocorrência:</strong> {new Date(selectedOccurrence.date).toLocaleDateString('pt-BR')}</p>
              
              {/* Classificações */}
              <div>
                <strong>Classificações:</strong>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                  {(Array.isArray(selectedOccurrence.classifications) ? selectedOccurrence.classifications : [selectedOccurrence.type]).filter(Boolean).map(c => (
                    <span key={c} className="badge badge-primary">{c}</span>
                  ))}
                </div>
              </div>

              {/* Sentimentos */}
              {Array.isArray(selectedOccurrence.feelings) && selectedOccurrence.feelings.length > 0 && (
                <div>
                  <strong>Sentimentos Identificados (CNV):</strong>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                    {selectedOccurrence.feelings.map(f => (
                      <span key={f} className="badge badge-warning">{f}</span>
                    ))}
                  </div>
                  {selectedOccurrence.feelings_observations && (
                    <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.25rem', fontSize: '0.825rem' }}>
                      "{selectedOccurrence.feelings_observations}"
                    </p>
                  )}
                </div>
              )}

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                <strong>Assunto (Relato do Ocorrido):</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{selectedOccurrence.subject}</p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                <strong>Encaminhamentos Escolares:</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{selectedOccurrence.referrals}</p>
              </div>

              {/* Rede de Proteção */}
              {Array.isArray(selectedOccurrence.direction_referrals) && selectedOccurrence.direction_referrals.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                  <strong>Encaminhamento Direção / Rede de Proteção:</strong>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                    {selectedOccurrence.direction_referrals.map(r => (
                      <span key={r} className="badge badge-danger">{r}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedOccurrence.observations && (
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                  <strong>Observações do Pedagogo:</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{selectedOccurrence.observations}</p>
                </div>
              )}

              {/* Observações da Diretoria */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', backgroundColor: 'var(--bg-app)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <strong>Observações da Diretoria (Visto / Acompanhamento)</strong>
                
                {(user.role === 'diretor' || user.role === 'gestor' || user.role === 'seduc') ? (
                  selectedOccurrence.status === 'rascunho' ? (
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontStyle: 'italic', fontSize: '0.875rem' }}>
                      Esta ocorrência está em modo de Rascunho. Aguarde a finalização pelo pedagogo para registrar o visto da diretoria.
                    </p>
                  ) : (
                    <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <textarea
                        className="form-textarea"
                        placeholder="Escreva aqui observações do diretor, visto ou plano de acompanhamento..."
                        value={directorNotes}
                        onChange={(e) => setDirectorNotes(e.target.value)}
                      />
                      <button className="btn btn-primary" onClick={handleSaveDirectorNotes}>
                        Confirmar Visto da Diretoria
                      </button>
                    </div>
                  )
                ) : (
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', fontStyle: 'italic' }}>
                    {selectedOccurrence.directorNotes || 'Nenhuma observação cadastrada pela diretoria ainda.'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- TEMPLATE DE IMPRESSÃO A4 COM CONFORMIDADE LGPD ----------------- */}
      {selectedOccurrence && (
        <div className="printable-report">
          {selectedOccurrence.status === 'rascunho' && (
            <div className="print-watermark">Rascunho</div>
          )}
          <div className="print-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <div className="print-school-name">
                {schools.find(s => s.id === selectedOccurrence.schoolId)?.name || 'REDE MUNICIPAL DE ENSINO'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', margin: '4px 0', lineHeight: '1.1' }}>
                <span style={{ fontSize: '10pt', fontWeight: 'bold', letterSpacing: '0.05em', color: '#1c355e' }}>POME</span>
                <span style={{ fontSize: '7pt', fontWeight: 'bold', color: '#246949' }}>PLATAFORMA DE OBSERVAÇÃO DOS NÚCLEOS DE MEDIAÇÃO PARA MELHORIA DO CLIMA ESCOLAR</span>
              </div>
              <div className="print-doc-title">REGISTRO DE ATENDIMENTO</div>
            </div>
            <Logo style={{ height: '55px', width: 'auto' }} />
          </div>

          {/* Estudantes na Impressão */}
          <div className="print-fields-grid">
            <div className="print-field col-12" style={{ gridColumn: 'span 12' }}>
              <span className="print-field-label" style={{ display: 'block', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '4px' }}>
                Estudante(s) e Responsável(is):
              </span>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #000' }}>
                    <th style={{ textAlign: 'left', fontSize: '8.5pt', padding: '2px' }}>Estudante</th>
                    <th style={{ textAlign: 'left', fontSize: '8.5pt', padding: '2px' }}>Sexo/Turno</th>
                    <th style={{ textAlign: 'left', fontSize: '8.5pt', padding: '2px' }}>Ano / Turma</th>
                    <th style={{ textAlign: 'left', fontSize: '8.5pt', padding: '2px' }}>Responsável / Contato</th>
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(selectedOccurrence.students) && selectedOccurrence.students.length > 0 ? selectedOccurrence.students : [
                    {
                      studentName: selectedOccurrence.studentName,
                      sex: selectedOccurrence.sex || 'Não inf.',
                      turn: selectedOccurrence.turn || 'Não inf.',
                      gradeCycle: selectedOccurrence.gradeCycle,
                      className: selectedOccurrence.className,
                      guardian: {
                        name: selectedOccurrence.guardianName || 'Não informado',
                        bond: 'Responsável',
                        contact: selectedOccurrence.contacts || 'Não informado'
                      }
                    }
                  ]).map((st, i) => (
                    <tr key={i} style={{ borderBottom: '1px dashed #ddd' }}>
                      <td style={{ fontSize: '8.5pt', padding: '3px 2px', fontWeight: 'bold' }}>{anonymizeText(st.studentName, anonymizeView)}</td>
                      <td style={{ fontSize: '8.5pt', padding: '3px 2px' }}>{st.sex} / {st.turn}</td>
                      <td style={{ fontSize: '8.5pt', padding: '3px 2px' }}>{st.gradeCycle} - {st.className}</td>
                      <td style={{ fontSize: '8.5pt', padding: '3px 2px' }}>
                        {anonymizeText(st.guardian?.name, anonymizeView)} ({st.guardian?.bond}) - {anonymizeView ? '(XX) XXXXX-XXXX' : st.guardian?.contact}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="print-field col-6">
              <span className="print-field-label">Data da Ocorrência:</span> {new Date(selectedOccurrence.date).toLocaleDateString('pt-BR')}
            </div>
            <div className="print-field col-6">
              <span className="print-field-label">Classificação(ões):</span> {(Array.isArray(selectedOccurrence.classifications) ? selectedOccurrence.classifications : [selectedOccurrence.type]).filter(Boolean).join(', ')}
            </div>

            {Array.isArray(selectedOccurrence.feelings) && selectedOccurrence.feelings.length > 0 && (
              <div className="print-field col-12" style={{ gridColumn: 'span 12' }}>
                <span className="print-field-label">Sentimentos Identificados (CNV):</span> {selectedOccurrence.feelings.join(', ')}
                {selectedOccurrence.feelings_observations && ` — "${selectedOccurrence.feelings_observations}"`}
              </div>
            )}
          </div>

          <div className="print-section">
            <div className="print-section-title">ASSUNTO (RELATO DO OCORRIDO)</div>
            <div className="print-section-content">{selectedOccurrence.subject}</div>
          </div>

          <div className="print-section">
            <div className="print-section-title">ENCAMINHAMENTOS E AÇÕES TOMADAS</div>
            <div className="print-section-content">{selectedOccurrence.referrals}</div>
          </div>

          {Array.isArray(selectedOccurrence.direction_referrals) && selectedOccurrence.direction_referrals.length > 0 && (
            <div className="print-section">
              <div className="print-section-title">ENCAMINHAMENTO DIREÇÃO / REDE DE PROTEÇÃO</div>
              <div className="print-section-content">{selectedOccurrence.direction_referrals.join(', ')}</div>
            </div>
          )}

          {selectedOccurrence.observations && (
            <div className="print-section">
              <div className="print-section-title">OBSERVAÇÕES PEDAGÓGICAS ADICIONAIS</div>
              <div className="print-section-content">{selectedOccurrence.observations}</div>
            </div>
          )}

          {selectedOccurrence.directorNotes && (
            <div className="print-section">
              <div className="print-section-title">ACOMPANHAMENTO / VISTO DA DIRETORIA</div>
              <div className="print-section-content">{selectedOccurrence.directorNotes}</div>
            </div>
          )}

          <div className="print-signatures-block" style={{ marginTop: '35px' }}>
            <div className="print-signature-line">
              <div style={{ borderTop: '1px solid #000', width: '200px', margin: '0 auto' }}></div>
              Pedagogo(a) / Responsável pelo Registro
            </div>
            <div className="print-signature-line">
              <div style={{ borderTop: '1px solid #000', width: '200px', margin: '0 auto' }}></div>
              Direção Escolar
            </div>
            <div className="print-signature-line">
              <div style={{ borderTop: '1px solid #000', width: '200px', margin: '0 auto' }}></div>
              Responsável(is) Atendido(s)
            </div>
          </div>
        </div>
      )}

      {/* TUTORIAL MODAL (GERAL) */}
      {showTutorialModal && (
        <div className="modal-overlay" onClick={() => setShowTutorialModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>💡 Tutorial e Guia do Sistema POME</h3>
              <button className="btn btn-secondary" onClick={() => setShowTutorialModal(false)}>
                ✕
              </button>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', overflowY: 'auto', maxHeight: '75vh', padding: '1.5rem' }}>
              
              <div>
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Apresentação</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  A plataforma <strong>POME</strong> é uma ferramenta de monitoramento do clima escolar desenvolvida para registro estruturado, escuta com base na Comunicação Não-Violenta (CNV), acompanhamento diretivo e integração com a rede de proteção da infância e adolescência.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Fluxo do Atendimento em 5 Passos</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <p><strong>1. Identificação:</strong> Inclusão de um ou múltiplos estudantes envolvidos com sexo, turno, ciclo/EJA e responsável direto.</p>
                  <p><strong>2. Ocorrência:</strong> Relato detalhado do assunto primeiro e seleção da classificação pela nova taxonomia em 3 níveis (Perturbadoras, Agressivas/Violentas, Risco).</p>
                  <p><strong>3. Sentimentos (CNV):</strong> Mapeamento das emoções expressas na escuta qualificada sem rótulos.</p>
                  <p><strong>4. Encaminhamentos:</strong> Registro das ações tomadas na escola e encaminhamentos para Conselho Tutelar, CAPS, CRAS/CREAS se necessário.</p>
                  <p><strong>5. Revisão & Emissão:</strong> Conferência geral, salvamento de rascunho/finalização e emissão em A4 com suporte à anonimização LGPD.</p>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  onClick={() => {
                    setShowTutorialModal(false);
                    setTutorialSelectedRole(user?.role === 'seduc' ? 'seduc' : user?.role || 'pedagogo');
                    setShowRoleTutorialModal(true);
                  }}
                >
                  ❓ Abrir Guia de Permissões & Tutorial por Perfil
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ----------------- DYNAMIC ROLE TUTORIAL & PERMISSIONS MODAL ----------------- */}
      {showRoleTutorialModal && (
        <div className="modal-overlay" onClick={() => setShowRoleTutorialModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px', width: '95%' }}>
            
            {/* Modal Header */}
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.6rem' }}>{ROLE_TUTORIALS_DATA[tutorialSelectedRole]?.icon || '💡'}</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem' }}>
                    Guia de Permissões & Tutorial: <span style={{ color: ROLE_TUTORIALS_DATA[tutorialSelectedRole]?.color || 'var(--primary)' }}>{ROLE_TUTORIALS_DATA[tutorialSelectedRole]?.name}</span>
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    {ROLE_TUTORIALS_DATA[tutorialSelectedRole]?.tagline}
                  </p>
                </div>
              </div>
              <button 
                className="btn btn-secondary" 
                onClick={() => setShowRoleTutorialModal(false)}
                style={{ padding: '0.35rem 0.75rem', fontSize: '1rem', borderRadius: '50%' }}
              >
                ✕
              </button>
            </div>

            <div className="card-body" style={{ padding: '1.25rem', overflowY: 'auto', maxHeight: '78vh' }}>
              
              {/* Role Switcher Tabs (Permite navegar entre todos os perfis) */}
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', display: 'block', marginBottom: '0.4rem' }}>
                  Consultar outro perfil de usuário:
                </span>
                <div className="role-tutorial-tabs">
                  {Object.values(ROLE_TUTORIALS_DATA).map(r => (
                    <button
                      key={r.roleKey}
                      type="button"
                      className={`role-tutorial-tab-btn ${tutorialSelectedRole === r.roleKey ? 'active' : ''}`}
                      style={{
                        backgroundColor: tutorialSelectedRole === r.roleKey ? r.color : undefined,
                        borderColor: tutorialSelectedRole === r.roleKey ? r.color : undefined
                      }}
                      onClick={() => {
                        setTutorialSelectedRole(r.roleKey);
                        setTutorialSubTab('overview');
                      }}
                    >
                      <span>{r.icon}</span>
                      <span>{r.roleKey === 'superadmin' ? 'Super Admin' : r.roleKey === 'pedagogo' ? 'Pedagogo' : r.roleKey === 'diretor' ? 'Diretor' : r.roleKey === 'assistente' ? 'Assistente' : 'Gestor/SEDUC'}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-tabs Internas: Visão Geral | Permissões | Passo a Passo | LGPD */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className={`btn ${tutorialSubTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.825rem', padding: '0.35rem 0.75rem' }}
                  onClick={() => setTutorialSubTab('overview')}
                >
                  📋 Visão Geral
                </button>
                <button
                  type="button"
                  className={`btn ${tutorialSubTab === 'permissions' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.825rem', padding: '0.35rem 0.75rem' }}
                  onClick={() => setTutorialSubTab('permissions')}
                >
                  🛡️ Permissões & Restrições
                </button>
                <button
                  type="button"
                  className={`btn ${tutorialSubTab === 'steps' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.825rem', padding: '0.35rem 0.75rem' }}
                  onClick={() => setTutorialSubTab('steps')}
                >
                  🚀 Passo a Passo no Sistema
                </button>
                <button
                  type="button"
                  className={`btn ${tutorialSubTab === 'lgpd' ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.825rem', padding: '0.35rem 0.75rem' }}
                  onClick={() => setTutorialSubTab('lgpd')}
                >
                  🔒 Diretrizes LGPD & Ética
                </button>
              </div>

              {/* CONTEÚDO DA SUB-ABA: VISÃO GERAL */}
              {tutorialSubTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ backgroundColor: 'var(--bg-app)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', lineHeight: '1.6' }}>
                    <h4 style={{ color: ROLE_TUTORIALS_DATA[tutorialSelectedRole]?.color, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {ROLE_TUTORIALS_DATA[tutorialSelectedRole]?.icon} Atribuição Institucional
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {ROLE_TUTORIALS_DATA[tutorialSelectedRole]?.overview}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                    <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid #10b98144' }}>
                      <strong style={{ color: '#059669', fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>
                        ✅ Principais Atribuições
                      </strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {ROLE_TUTORIALS_DATA[tutorialSelectedRole]?.permissions.allowed.length} permissões ativas configuradas no perfil.
                      </span>
                    </div>
                    <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid #ef444444' }}>
                      <strong style={{ color: '#dc2626', fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem' }}>
                        ⛔ Restrições de Segurança
                      </strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        Proteção de sigilo, hierarquia institucional e conformidade LGPD.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* CONTEÚDO DA SUB-ABA: PERMISSÕES & RESTRIÇÕES */}
              {tutorialSubTab === 'permissions' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* O que pode fazer */}
                  <div>
                    <h4 style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.65rem' }}>
                      ✅ O que este perfil PODE fazer:
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {ROLE_TUTORIALS_DATA[tutorialSelectedRole]?.permissions.allowed.map((perm, idx) => (
                        <div key={idx} className="permission-pill-allowed">
                          <span>✓</span>
                          <span>{perm}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* O que NÃO pode fazer */}
                  <div>
                    <h4 style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.65rem' }}>
                      ⛔ O que este perfil NÃO tem acesso (Restrições):
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {ROLE_TUTORIALS_DATA[tutorialSelectedRole]?.permissions.restricted.map((rest, idx) => (
                        <div key={idx} className="permission-pill-restricted">
                          <span>✕</span>
                          <span>{rest}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CONTEÚDO DA SUB-ABA: PASSO A PASSO PRÁTICO */}
              {tutorialSubTab === 'steps' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {ROLE_TUTORIALS_DATA[tutorialSelectedRole]?.steps.map((st) => (
                    <div key={st.step} className="tutorial-step-card">
                      <div className="tutorial-step-number" style={{ backgroundColor: ROLE_TUTORIALS_DATA[tutorialSelectedRole]?.color }}>
                        {st.step}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{st.title}</h4>
                        <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CONTEÚDO DA SUB-ABA: LGPD */}
              {tutorialSubTab === 'lgpd' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ backgroundColor: 'var(--bg-app)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--accent-orange)' }}>
                    <h4 style={{ color: 'var(--accent-orange)', marginBottom: '0.5rem' }}>
                      ⚖️ Compromisso de Sigilo e Proteção de Dados (Lei 13.709/2018)
                    </h4>
                    <p style={{ fontSize: '0.875rem', lineHeight: '1.5', color: 'var(--text-primary)' }}>
                      {ROLE_TUTORIALS_DATA[tutorialSelectedRole]?.lgpd}
                    </p>
                  </div>

                  <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    <p><strong>Boas Práticas Recomendadas:</strong></p>
                    <ul style={{ paddingLeft: '1.25rem', marginTop: '0.25rem' }}>
                      <li>Nunca compartilhe sua senha ou deixe o sistema aberto em computadores de uso coletivo.</li>
                      <li>Utilize o botão de anonimização (LGPD) sempre que projetar dados em telões ou reuniões.</li>
                      <li>Fichas de atendimento impressas devem ser guardadas em arquivo seguro da secretaria escolar.</li>
                    </ul>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="card-footer" style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', paddingRight: '1.25rem', paddingBottom: '1rem' }}>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => setShowRoleTutorialModal(false)}
                style={{ fontSize: '0.85rem', padding: '0.4rem 1.25rem' }}
              >
                Entendi, Fechar Tutorial
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
