import React, { useState, useEffect } from 'react';
import './App.css';
import logoVetor from './logo-vetor.svg';
import LandingLoginPage from './components/LandingLoginPage';
import { LEGAL_GLOSSARY, DIMENSIONS_INFO } from './constants/legalGlossary';
import { LGPD_DOCUMENT } from './constants/lgpdTerms';

// Constants: 10 Unidades Escolares Oficiais do Piloto POME
export const OFFICIAL_SCHOOLS = [
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

const IconScale = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM7 21h10M12 3v18M3 7h18" />
  </svg>
);

const IconTarget = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const IconBookOpen = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const IconCheckCircle = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconUser = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconLock = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconPlus = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconEdit = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const IconX = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconEye = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconTag = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const IconAlertCircle = (props) => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const IconFileText = (props) => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const IconClock = (props) => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// Constants: Grade Cycles / Anos
const GRADE_CYCLES = [
  '3 anos', '4 anos', '5 anos',
  '1º Ano', '2º Ano', '3º Ano', '4º Ano', '5º Ano',
  '6º Ano', '7º Ano', '8º Ano', '9º Ano',
  'EJA 1º segmento', 'EJA 2º segmento'
];

// Constants: Turnos (Item 2)
const TURN_OPTIONS = [
  'Manhã',
  'Tarde',
  'Noite',
  'Integral'
];

// Constants: Componentes Curriculares / Matérias (Item 2)
const SUBJECT_OPTIONS = [
  'Língua Portuguesa',
  'Matemática',
  'Ciências',
  'História',
  'Geografia',
  'Artes',
  'Educação Física',
  'Língua Inglesa',
  'Ensino Religioso',
  'Filosofia',
  'Sociologia',
  'Outro'
];

// Helper: Formatar data local atual no formato YYYY-MM-DD sem distorção UTC (Item 1)
const getLocalDateString = (d = new Date()) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Helper: Exibir data formatada em pt-BR sem risco de retroceder um dia por fuso UTC (Item 1)
const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '-';
  if (typeof dateStr === 'string' && dateStr.includes('-')) {
    const clean = dateStr.split('T')[0];
    const parts = clean.split('-');
    if (parts.length === 3) {
      const [y, m, d] = parts;
      return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
    }
  }
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return String(dateStr);
  return d.toLocaleDateString('pt-BR');
};

// Helper: Format DateTime for Audit Trail
export const formatDisplayDateTime = (isoStr) => {
  if (!isoStr) return '-';
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return String(isoStr);
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Helper: Determine Occurrence Status (Visto Obrigatório apenas se houver encaminhamento para a Direção/Rede)
export const getOccurrenceStatus = (o) => {
  if (!o) return { key: 'none', label: '-', badgeClass: 'badge-secondary', style: {} };
  
  if (o.status === 'rascunho') {
    return {
      key: 'rascunho',
      label: '📝 Rascunho',
      badgeClass: 'badge-secondary',
      style: { backgroundColor: 'var(--text-secondary)', color: 'white' }
    };
  }
  if (o.directorNotes && o.directorNotes.trim()) {
    return {
      key: 'visto',
      label: '✅ Visto Diretoria',
      badgeClass: 'badge-success',
      style: {}
    };
  }
  
  // Apenas exige visto se houver opções ticadas no campo de encaminhamento da direção / rede de proteção
  const hasDirectionRef = Array.isArray(o.direction_referrals) && o.direction_referrals.length > 0;
  if (hasDirectionRef) {
    return {
      key: 'visto_obrigatorio',
      label: '⚠️ Visto Obrigatório',
      badgeClass: 'badge-warning',
      style: { backgroundColor: '#fef3c7', color: '#92400e', border: '1px solid #f59e0b', fontWeight: '700' }
    };
  }
  
  // Caso contrário, trata-se de um atendimento rotineiro registrado normalmente
  return {
    key: 'registrado',
    label: '📄 Registrado',
    badgeClass: 'badge-secondary',
    style: { backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1' }
  };
};

// Constants: 8 Dimensões Oficiais do POME (Classificação das Ocorrências - Ordem Crescente de Complexidade/Gravidade)
const TAXONOMY_DIMENSIONS = {
  '1. Comportamentos e situações típicas da primeira infância': [
    'Mordida entre crianças',
    'Disputa por objetos/brinquedos',
    'Agressividade física entre crianças pequenas',
    'Dificuldade de adaptação / choro persistente',
    'Birra / crise comportamental',
    'Regressão comportamental',
    'Recusa alimentar / seletividade alimentar'
  ],
  '2. Reclamações pedagógicas e institucionais': [
    'Reclamação pedagógica',
    'Reclamação institucional / administrativa'
  ],
  '3. Descumprimento de normas escolares': [
    'Indisciplina recorrente',
    'Saída injustificada da sala',
    'Uso indevido de aparelhos eletrônicos',
    'Transgressão',
    'Incivilidade',
    'Atraso recorrente',
    'Fraude em avaliação (cola)'
  ],
  '4. Patrimônio escolar': [
    'Furto',
    'Roubo',
    'Dano ao patrimônio'
  ],
  '5. Discriminação e preconceito': [
    'Racismo',
    'Injúria racial',
    'Discriminação por orientação sexual',
    'Gordofobia',
    'Capacitismo',
    'Xenofobia',
    'Preconceito religioso',
    'Preconceito linguístico',
    'Preconceito socioeconômico',
    'Discriminação por aparência',
    'Discriminação de gênero',
    'Etarismo',
    'Machismo',
    'Misoginia',
    'Classismo',
    'Discriminação regional'
  ],
  '6. Violências interpessoais': [
    'Agressão física',
    'Agressão verbal',
    'Ameaça',
    'Intimidação sistemática (bullying)',
    'Intimidação sistemática virtual (cyberbullying)',
    'Intimidação (ato isolado)',
    'Extorsão',
    'Shaming',
    'Perseguição (stalking)',
    'Linchamento virtual',
    'Assédio moral'
  ],
  '7. Situações de risco à vida, à saúde e à segurança': [
    'Negligência',
    'Porte de arma'
  ],
  '8. Violência sexual': [
    'Assédio sexual',
    'Importunação sexual',
    'Abuso sexual',
    'Divulgação não consensual de imagem íntima'
  ]
};

// Aliases para compatibilidade
const TAXONOMY_TREE = TAXONOMY_DIMENSIONS;

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
  customSubject: '',
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
    iconType: 'book',
    color: '#d97706',
    tagline: 'Atendimento direto, escuta ativa (CNV), mediação e registro de ocorrências escolares.',
    overview: 'O perfil de Pedagogo(a) é o coração da mediação escolar. Ele é responsável pelo acolhimento de estudantes e responsáveis, realização de escuta qualificada sem julgamentos morais, registro das ocorrências com a classificação em 8 dimensões pedagógicas, aplicação de práticas restaurativas e acompanhamento contínuo.',
    permissions: {
      allowed: [
        'Cadastrar novos atendimentos e ocorrências no fluxo estruturado em 5 etapas',
        'Incluir múltiplos estudantes, turnos, turmas, professores e responsáveis no mesmo registro',
        'Mapear sentimentos identificados na escuta ativa baseada em Comunicação Não-Violenta (CNV)',
        'Classificar ocorrências nas 8 dimensões oficiais do POME e suas categorias ordenadas por gravidade',
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
    iconType: 'school',
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
      { step: '1', title: 'Filtrar Pendências', desc: 'No Painel Principal, localize as ocorrências com badge "Visto Obrigatório" ou use os filtros analíticos.' },
      { step: '2', title: 'Analisar o Atendimento', desc: 'Clique no botão "Detalhes" para ler o relato dos fatos, sentimentos mapeados e ações tomadas pela equipe pedagógica.' },
      { step: '3', title: 'Emitir o Visto Oficial', desc: 'No bloco "Observações da Diretoria", registre o parecer formal e clique em "Confirmar Visto da Diretoria".' },
      { step: '4', title: 'Acionar Rede Externa', desc: 'Em casos de violação de direitos ou risco, articule o encaminhamento formal junto ao Conselho Tutelar/CAPS.' },
      { step: '5', title: 'Monitorar Indicadores', desc: 'Acesse a aba "Relatórios da Direção" para acompanhar turmas com maior incidência e taxa de vistos emitidos.' }
    ],
    lgpd: 'O Diretor é o guardião legal dos registros físicos e digitais na unidade. Fichas impressas devem ser arquivadas em prontuários sob chave e sigilo funcional.'
  },
  assistente: {
    roleKey: 'assistente',
    name: 'Assistente / Mediador(a) Escolar',
    iconType: 'users',
    color: '#0284c7',
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
  seduc: {
    roleKey: 'seduc',
    name: 'Gestor(a) SEDUC / Secretaria de Educação',
    iconType: 'school',
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
        'Filtrar ocorrências por qualquer escola, ciclo, dimensão ou período',
        'Editar ou excluir ocorrências para saneamento ou correção de dados'
      ],
      restricted: [
        'Não possui acesso ao módulo de infraestrutura técnica/backups (exclusivo do Super Admin)',
        'Não possui funcionalidade de impersonação de contas de usuários'
      ]
    },
    steps: [
      { step: '1', title: 'Monitorar a Rede', desc: 'Consulte os cards de métricas globais e filtre por escolas específicas no Painel Principal.' },
      { step: '2', title: 'Gerenciar Escolas e Usuários', desc: 'Acesse as abas "Gerenciar Escolas" e "Gerenciar Usuários" para criar unidades e delegar acessos.' },
      { step: '3', title: 'Exportar para Pesquisa (SPSS)', desc: 'Na aba "Relatórios de Gestão", clique em "Exportar SPSS" para obter a base estruturada para análise acadêmica.' },
      { step: '4', title: 'Planejamento Estratégico', desc: 'Utilize os indicadores de situações de risco para direcionar equipes de apoio psicossocial às escolas prioritárias.' }
    ],
    lgpd: 'Tratamento de dados em conformidade com os Arts. 7º e 11 da LGPD para execução de políticas públicas educacionais.'
  },
  superadmin: {
    roleKey: 'superadmin',
    name: 'Super Administrador (Master Admin)',
    iconType: 'shield',
    color: '#7c3aed',
    tagline: 'Acesso total, telemetria em tempo real, auditoria, impersonação e recuperação de desastres.',
    overview: 'O perfil de Super Administrador Master detém privilégios totais sobre a plataforma. É responsável pela governança técnica, segurança da informação, auditoria em tempo real, suporte através de impersonação e execução de backups contínuos.',
    permissions: {
      allowed: [
        'Acesso irrestrito a todas as páginas, escolas, usuários e ocorrências da plataforma',
        'Aba exclusiva "Administração do Sistema" com telemetria de CPU, RAM, Uptime e Banco',
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

// Hierarchy levels for tutorial viewing (superadmin: all; others: current role and below, never above)
const ROLE_HIERARCHY_LEVELS = {
  superadmin: 5,
  seduc: 4,
  gestor: 4,
  diretor: 3,
  pedagogo: 2,
  assistente: 1
};

const ROLE_HIERARCHY_ORDER = ['superadmin', 'seduc', 'diretor', 'pedagogo', 'assistente'];

const getVisibleTutorialRoles = (userRole) => {
  const currentLevel = ROLE_HIERARCHY_LEVELS[userRole] || 1;
  return ROLE_HIERARCHY_ORDER.filter(r => (ROLE_HIERARCHY_LEVELS[r] || 1) <= currentLevel);
};

const renderRoleIconComponent = (iconType, props = {}) => {
  switch (iconType) {
    case 'shield':
      return <IconShield {...props} />;
    case 'school':
      return <IconSchool {...props} />;
    case 'book':
      return <IconBookOpen {...props} />;
    case 'users':
      return <IconUsers {...props} />;
    default:
      return <IconShield {...props} />;
  }
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--bg-app, #f8fafc)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ color: 'var(--danger, #dc2626)', marginBottom: '1rem' }}>⚠️ Ocorreu uma instabilidade na exibição da tela</h2>
          <p style={{ color: 'var(--text-secondary, #64748b)', maxWidth: '500px', marginBottom: '1.5rem' }}>
            {this.state.error?.message || 'Erro inesperado de renderização.'}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              className="btn btn-primary"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
            >
              🔄 Recarregar Página
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                localStorage.removeItem('user');
                window.location.reload();
              }}
            >
              🚪 Voltar ao Login
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function MainApp() {
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [tutorialTab, setTutorialTab] = useState('welcome');
  const [showTutorialModal, setShowTutorialModal] = useState(false);

  // Dynamic Role Tutorial State
  const [showRoleTutorialModal, setShowRoleTutorialModal] = useState(false);
  const [tutorialSelectedRole, setTutorialSelectedRole] = useState('pedagogo');
  const [tutorialSubTab, setTutorialSubTab] = useState('overview');
  const [notification, setNotification] = useState(null);

  // Authentication & Session
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [notification]);

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

  // Self-Registration Modal State (Cadastro com LGPD - Itens 8, 9, 10, 11, 12)
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showFullLgpdTerms, setShowFullLgpdTerms] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    role: 'pedagogo',
    schoolId: '',
    password: '',
    confirmPassword: '',
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

  // Advanced Analytical Report Filters State (Diretores, Gestores e Pedagogos)
  const [reportFilterSchool, setReportFilterSchool] = useState('');
  const [reportFilterSex, setReportFilterSex] = useState('');
  const [reportFilterFeeling, setReportFilterFeeling] = useState('');
  const [reportFilterNature, setReportFilterNature] = useState('');
  const [reportFilterClassification, setReportFilterClassification] = useState('');
  const [reportFilterTurn, setReportFilterTurn] = useState('');
  const [reportFilterGrade, setReportFilterGrade] = useState('');
  const [reportFilterStatus, setReportFilterStatus] = useState('');
  const [reportFilterReferral, setReportFilterReferral] = useState('');
  const [reportFilterDateStart, setReportFilterDateStart] = useState('');
  const [reportFilterDateEnd, setReportFilterDateEnd] = useState('');
  const [reportSearchQuery, setReportSearchQuery] = useState('');
  const [reportActiveChartTab, setReportActiveChartTab] = useState('nature'); // 'nature' | 'feelings' | 'sex' | 'turns' | 'classes' | 'schools'
  
  // Modals & Forms
  const [showForm, setShowForm] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [selectedOccurrence, setSelectedOccurrence] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [anonymizeView, setAnonymizeView] = useState(false);
  const [printMode, setPrintMode] = useState('occurrence'); // 'occurrence' | 'executive'
  const [printOccurrence, setPrintOccurrence] = useState(null);
  
  // Director Observation Temp State
  const [directorNotes, setDirectorNotes] = useState('');

  // School/User Creation States (Gestor)
  const [newSchoolName, setNewSchoolName] = useState('');
  const [editingSchool, setEditingSchool] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileData, setProfileData] = useState({ name: '', email: '', phone: '', currentPassword: '', newPassword: '', confirmNewPassword: '' });
  const [profileMessage, setProfileMessage] = useState(null);
  const [selectedGlossaryTerm, setSelectedGlossaryTerm] = useState(null);
  const [newUserData, setNewUserData] = useState({ 
    name: '', cpf: '', email: '', phone: '', password: '', role: 'pedagogo', schoolId: '', classesInput: '' 
  });

  // Progressive Form State (5 Steps)
  const initialFormState = {
    id: '',
    schoolId: '',
    students: [createDefaultStudent()],
    date: getLocalDateString(),
    
    // Passo 2: Assunto e Classificações
    subject: '',
    classifications: [],
    customOtherClassification: '',
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
    status: 'rascunho',
    createdAt: '',
    createdById: '',
    createdByName: '',
    updatedAt: '',
    updatedById: '',
    updatedByName: '',
    editHistory: []
  };

  const [formData, setFormData] = useState(initialFormState);

  // Handler: Change Step with automatic smooth scroll to top of form
  const goToStep = (stepNumber) => {
    setFormStep(stepNumber);
    setTimeout(() => {
      const formCard = document.getElementById('pome-form-card');
      if (formCard) {
        formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 30);
  };

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
        if (Array.isArray(data) && data.length > 0) {
          setSchools(data);
          return data;
        }
      }
    } catch (err) {
      console.error('Error fetching schools:', err);
    }
    setSchools(OFFICIAL_SCHOOLS);
    return OFFICIAL_SCHOOLS;
  };

  const fetchOccurrences = async () => {
    if (!user) return null;
    try {
      const url = `/api/occurrences?schoolId=${user.schoolId || ''}&role=${user.role}&userId=${user.id}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setOccurrences(data);
          return data;
        }
      }
    } catch (err) {
      console.error('Error fetching occurrences from Supabase:', err);
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

  // Handler: Logout
  const handleLogout = () => {
    setUser(null);
    setImpersonatedOriginalUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('impersonatedOriginalUser');
    setActiveTab('dashboard');
    setShowForm(false);
    setSelectedOccurrence(null);
  };

  // Handler: Self-Registration (Itens 8, 9, 10, 11, 12)
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError('');
    setRegisterSuccess('');

    if (!registerData.name || !registerData.name.trim()) {
      setRegisterError('Por favor, informe seu nome completo.');
      return;
    }

    const cleanCpf = (registerData.cpf || '').replace(/\D/g, '');
    if (cleanCpf.length < 11) {
      setRegisterError('Por favor, informe um CPF válido com 11 dígitos.');
      return;
    }

    if (!registerData.email || !registerData.email.trim()) {
      setRegisterError('Por favor, informe seu e-mail institucional.');
      return;
    }

    if (registerData.role !== 'seduc' && !registerData.schoolId) {
      setRegisterError('Por favor, selecione sua unidade escolar vinculada.');
      return;
    }

    if (!registerData.password || registerData.password.length < 4) {
      setRegisterError('A senha é obrigatória e deve conter pelo menos 4 caracteres.');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setRegisterError('A confirmação de senha não coincide com a senha digitada.');
      return;
    }

    if (!registerData.lgpd_accepted) {
      setRegisterError('É necessário marcar o aceite dos termos de proteção de dados (LGPD) e sigilo profissional.');
      return;
    }

    setIsRegistering(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });
      const data = await res.json();
      if (res.ok) {
        setRegisterSuccess('Cadastro realizado com sucesso! Você já pode entrar imediatamente no sistema.');
        const registeredIdentifier = registerData.cpf || registerData.email;
        setLoginData({ cpf: registeredIdentifier, password: registerData.password });
        setRegisterData({
          name: '', cpf: '', email: '', phone: '', role: 'pedagogo', schoolId: '', password: '', confirmPassword: '', lgpd_accepted: false
        });
        setTimeout(() => {
          setShowRegisterModal(false);
          setRegisterSuccess('');
        }, 1800);
      } else {
        setRegisterError(data.error || 'Erro ao realizar cadastro.');
      }
    } catch (err) {
      console.error('Register connection error:', err);
      setRegisterError('Erro de conexão com o servidor: ' + (err.message || 'Verifique sua conexão.'));
    } finally {
      setIsRegistering(false);
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

  // Handler: Create Manual Backup with Instant Browser File Download
  const handleCreateBackup = async (label = 'manual') => {
    try {
      setBackupActionStatus('Gerando backup completo do Supabase...');
      const res = await fetch('/api/admin/backups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label })
      });
      if (res.ok) {
        const result = await res.json();
        setBackupActionStatus('✅ Backup gerado com sucesso! Baixando arquivo...');
        
        // Direct reliable Blob Download in browser
        try {
          const payload = result.backup?.fullData || result.backup || result;
          const jsonStr = JSON.stringify(payload, null, 2);
          const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = result.backup?.filename || `pome_backup_supabase_${Date.now()}.json`;
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 400);
        } catch (downloadErr) {
          console.warn('Blob download fallback:', downloadErr);
          if (result.backup?.filename) {
            window.open(`/api/admin/backups/${result.backup.filename}`, '_blank');
          }
        }
        
        if (user.role === 'superadmin' || impersonatedOriginalUser) {
          fetchAdminData();
        }
        setTimeout(() => setBackupActionStatus(''), 4000);
      } else {
        const err = await res.json();
        alert(err.error || 'Erro ao criar backup do Supabase.');
        setBackupActionStatus('');
      }
    } catch (err) {
      console.error('Error creating backup:', err);
      alert('Erro de conexão ao gerar backup.');
      setBackupActionStatus('');
    }
  };

  // Handler: Restore Backup from Server Snapshot
  const handleRestoreBackup = async (filename) => {
    if (!confirm(`⚠️ ATENÇÃO: Deseja restaurar a base de dados do Supabase a partir do arquivo "${filename}"?\n\nOs dados atuais do Supabase serão atualizados com as informações deste backup.`)) return;
    try {
      setBackupActionStatus('Restaurando dados do backup no Supabase...');
      const res = await fetch('/api/admin/backups/restore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename })
      });
      if (res.ok) {
        setBackupActionStatus('✅ Base de dados Supabase restaurada com sucesso!');
        await Promise.all([fetchSchools(), fetchOccurrences(), fetchUsers()]);
        if (user.role === 'superadmin' || impersonatedOriginalUser) {
          await fetchAdminData();
        }
        setTimeout(() => setBackupActionStatus(''), 4000);
      } else {
        const err = await res.json();
        alert(err.error || 'Erro ao restaurar backup no Supabase.');
        setBackupActionStatus('');
      }
    } catch (err) {
      console.error('Error restoring backup:', err);
      alert('Erro de conexão ao restaurar backup no Supabase.');
      setBackupActionStatus('');
    }
  };

  // Handler: Restore Backup from User's Local .json File Upload
  const handleRestoreFromFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!confirm(`⚠️ ATENÇÃO: Deseja restaurar a base de dados do Supabase a partir do arquivo "${file.name}"?\n\nTodas as informações do Supabase serão atualizadas com o conteúdo deste arquivo de backup.`)) {
      e.target.value = '';
      return;
    }
    try {
      setBackupActionStatus('Lendo e restaurando arquivo de backup no Supabase...');
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          const res = await fetch('/api/admin/backups/restore', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: parsed })
          });
          if (res.ok) {
            setBackupActionStatus('✅ Base Supabase restaurada com sucesso!');
            await Promise.all([fetchSchools(), fetchOccurrences(), fetchUsers()]);
            if (user.role === 'superadmin' || impersonatedOriginalUser) {
              await fetchAdminData();
            }
            setTimeout(() => setBackupActionStatus(''), 4000);
          } else {
            const err = await res.json();
            alert(err.error || 'Erro ao restaurar arquivo no Supabase.');
            setBackupActionStatus('');
          }
        } catch (parseErr) {
          alert('Arquivo de backup inválido: formato JSON corrompido ou incorreto.');
          setBackupActionStatus('');
        }
      };
      reader.readAsText(file);
    } catch (err) {
      console.error('Error reading backup file:', err);
      alert('Erro ao carregar arquivo de backup.');
      setBackupActionStatus('');
    } finally {
      e.target.value = '';
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

  // Offline Sync Queue Processor
  const syncOfflineOccurrences = async () => {
    try {
      const queue = JSON.parse(localStorage.getItem('pome_sync_queue') || '[]');
      if (!Array.isArray(queue) || queue.length === 0) return;
      
      const remaining = [];
      for (const item of queue) {
        try {
          const res = await fetch('/api/occurrences', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
          });
          if (!res.ok) remaining.push(item);
        } catch {
          remaining.push(item);
        }
      }
      localStorage.setItem('pome_sync_queue', JSON.stringify(remaining));
      if (remaining.length < queue.length) {
        fetchOccurrences();
      }
    } catch (e) {
      console.warn('Sync offline queue warning:', e);
    }
  };

  useEffect(() => {
    syncOfflineOccurrences();
    window.addEventListener('online', syncOfflineOccurrences);
    return () => window.removeEventListener('online', syncOfflineOccurrences);
  }, []);

  // Handler: Save Occurrence (5 Steps com Ultra-Resistência e Backup Offline)
  const handleSaveOccurrence = async (status = 'finalizado') => {
    if (status === 'finalizado') {
      const invalidStudent = (formData.students || []).find(s => 
        !(s?.studentName || '').trim() ||
        !(s?.guardian?.name || '').trim() ||
        !(s?.teacherName || '').trim() ||
        !(s?.subject_matter || '').trim() ||
        (s?.subject_matter === 'Outro' && !(s?.customSubject || '').trim())
      );

      if (invalidStudent) {
        if (!(invalidStudent.studentName || '').trim()) {
          alert('Por favor, informe o Nome Completo do Estudante (Passo 1) antes de finalizar o atendimento.');
        } else if (!(invalidStudent.guardian?.name || '').trim()) {
          alert('Por favor, informe o Nome do Responsável (Passo 1) antes de finalizar o atendimento.');
        } else if (!(invalidStudent.teacherName || '').trim()) {
          alert('Por favor, informe o Nome do Professor (Passo 1) antes de finalizar o atendimento.');
        } else if (invalidStudent.subject_matter === 'Outro' && !(invalidStudent.customSubject || '').trim()) {
          alert('Por favor, informe manualmente a matéria/componente curricular (Passo 1).');
        } else {
          alert('Por favor, preencha todos os campos obrigatórios do estudante (Passo 1).');
        }
        setFormStep(1);
        return;
      }

      if ((user?.role === 'gestor' || user?.role === 'seduc' || user?.role === 'superadmin') && !formData.schoolId && !user.schoolId) {
        alert('Por favor, selecione a Escola Municipal Vinculada (Passo 1) antes de finalizar.');
        setFormStep(1);
        return;
      }

      if (!(formData.subject || '').trim()) {
        alert('Por favor, descreva o relato/assunto da ocorrência (Passo 2) antes de finalizar.');
        setFormStep(2);
        return;
      }

      if ((formData.classifications || []).includes('Outra') && !(formData.customOtherClassification || '').trim()) {
        alert('Por favor, especifique e descreva a ocorrência atípica no campo "Outra ocorrência" (Passo 2) antes de finalizar.');
        setFormStep(2);
        return;
      }
    }

    const primaryType = formData.classifications && formData.classifications.length > 0
      ? formData.classifications[0]
      : 'Atendimento Geral';

    const resolvedSchoolId = (user.role === 'gestor' || user.role === 'seduc' || user.role === 'superadmin')
      ? (formData.schoolId || user.schoolId || schools[0]?.id || 'esc-1')
      : (user.schoolId || formData.schoolId || schools[0]?.id || 'esc-1');

    const mappedStudents = (formData.students && formData.students.length > 0 ? formData.students : [createDefaultStudent()]).map(st => {
      const finalSubject = st.subject_matter === 'Outro' && (st.customSubject || '').trim()
        ? st.customSubject.trim()
        : (st.subject_matter || 'Não especificada');
      return {
        ...st,
        studentName: (st.studentName || '').trim() || (status === 'rascunho' ? 'Estudante em Atendimento (Rascunho)' : 'Estudante'),
        subject_matter: finalSubject
      };
    });

    const firstStudent = mappedStudents[0] || createDefaultStudent();
    const safeStudentName = firstStudent.studentName;

    const isNew = !formData.id;
    const nowIso = new Date().toISOString();
    const actionLabel = isNew
      ? (status === 'rascunho' ? 'Criação de rascunho' : 'Criação do atendimento')
      : 'Edição do atendimento';

    const history = Array.isArray(formData.editHistory) ? [...formData.editHistory] : [];
    history.push({
      timestamp: nowIso,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: actionLabel
    });

    const occId = formData.id || ('occ-' + Date.now() + '-' + Math.floor(Math.random() * 10000));

    const payload = {
      ...formData,
      id: occId,
      type: primaryType,
      status: status,
      schoolId: resolvedSchoolId,
      students: mappedStudents,
      studentName: safeStudentName,
      gradeCycle: firstStudent.gradeCycle || '',
      className: firstStudent.className || '',
      teacherName: firstStudent.teacherName || '',
      subject_matter: firstStudent.subject_matter || '',
      guardianName: firstStudent.guardian?.name || '',
      contacts: firstStudent.guardian?.contact || '',
      createdAt: formData.createdAt || (formData.date ? `${formData.date}T12:00:00.000Z` : nowIso),
      createdById: formData.createdById || user.id,
      createdByName: formData.createdByName || user.name,
      updatedAt: nowIso,
      updatedById: user.id,
      updatedByName: user.name,
      editHistory: history
    };

    // 1. Gravar imediatamente no estado da interface (feedback instantâneo sem perda)
    setOccurrences(prev => [payload, ...prev.filter(o => o.id !== payload.id)]);

    // 2. Persistir no Supabase (Fonte única e exclusiva de verdade)
    try {
      const res = await fetch('/api/occurrences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        await fetchOccurrences();
      } else {
        const err = await res.json();
        alert(err.error || 'Erro ao persistir atendimento no Supabase.');
      }
    } catch (err) {
      console.error('Network or server error saving occurrence:', err);
      alert('Erro de conexão ao salvar no Supabase.');
    }

    // Feedback visual imediato e transição suave
    setNotification({
      type: 'success',
      message: status === 'rascunho'
        ? '💾 Rascunho salvo com sucesso! Você pode continuar editando quando desejar.'
        : '✅ Atendimento finalizado e registrado com sucesso!'
    });

    setShowForm(false);
    setFormData({ ...initialFormState, schoolId: user.schoolId || (schools[0]?.id || '') });
    setFormStep(1);
    setActiveTab('occurrences');
  };

  // Handler: Load Occurrence for Editing
  const handleEditOccurrence = (occ) => {
    const studentsList = Array.isArray(occ.students) && occ.students.length > 0
      ? occ.students.map(st => {
          const isStandard = SUBJECT_OPTIONS.includes(st.subject_matter);
          return {
            ...st,
            subject_matter: isStandard ? st.subject_matter : (st.subject_matter ? 'Outro' : ''),
            customSubject: isStandard ? '' : (st.subject_matter || ''),
            guardian: st.guardian || {
              name: occ.guardianName || (occ.attended_people?.[0]?.name || ''),
              bond: occ.attended_people?.[0]?.bond || 'Mãe',
              customBond: '',
              contact: occ.contacts || (occ.attended_people?.[0]?.contact || '')
            }
          };
        })
      : [{
          studentName: occ.studentName || '',
          sex: occ.sex || '',
          turn: occ.turn || '',
          gradeCycle: occ.gradeCycle || '',
          className: occ.className || '',
          teacherName: occ.teacherName || '',
          subject_matter: SUBJECT_OPTIONS.includes(occ.subject_matter) ? occ.subject_matter : (occ.subject_matter ? 'Outro' : ''),
          customSubject: SUBJECT_OPTIONS.includes(occ.subject_matter) ? '' : (occ.subject_matter || ''),
          guardian: {
            name: occ.guardianName || (occ.attended_people?.[0]?.name || ''),
            bond: occ.attended_people?.[0]?.bond || 'Mãe',
            customBond: '',
            contact: occ.contacts || (occ.attended_people?.[0]?.contact || '')
          }
        }];

    setFormData({
      id: occ.id,
      schoolId: occ.schoolId || user.schoolId || (schools[0]?.id || ''),
      students: studentsList,
      date: occ.date ? occ.date.split('T')[0] : getLocalDateString(),
      subject: occ.subject || '',
      classifications: Array.isArray(occ.classifications) ? occ.classifications : (occ.type ? [occ.type] : []),
      customOtherClassification: occ.customOtherClassification || '',
      type: occ.type || '',
      feelings: Array.isArray(occ.feelings) ? occ.feelings : [],
      customFeeling: occ.customFeeling || '',
      feelings_observations: occ.feelings_observations || '',
      referrals: occ.referrals || '',
      observations: occ.observations || '',
      direction_referrals: Array.isArray(occ.direction_referrals) ? occ.direction_referrals : [],
      customDirectionReferral: occ.customDirectionReferral || '',
      directorNotes: occ.directorNotes || '',
      status: occ.status || 'finalizado',
      createdAt: occ.createdAt || '',
      createdById: occ.createdById || '',
      createdByName: occ.createdByName || '',
      updatedAt: occ.updatedAt || '',
      updatedById: occ.updatedById || '',
      updatedByName: occ.updatedByName || '',
      editHistory: Array.isArray(occ.editHistory) ? occ.editHistory : []
    });

    setFormStep(1);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Save Director Notes (com Registro de Auditoria e Ultra-Resistência)
  const handleSaveDirectorNotes = async () => {
    if (!selectedOccurrence) return;
    const nowIso = new Date().toISOString();
    const history = Array.isArray(selectedOccurrence.editHistory) ? [...selectedOccurrence.editHistory] : [];
    history.push({
      timestamp: nowIso,
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'Visto e parecer da diretoria'
    });

    const noteToSave = (directorNotes && directorNotes.trim()) ? directorNotes.trim() : 'Visto confirmado e acompanhado pela Direção Escolar.';

    const updated = {
      ...selectedOccurrence,
      directorNotes: noteToSave,
      updatedAt: nowIso,
      updatedById: user.id,
      updatedByName: user.name,
      editHistory: history
    };

    // 1. Atualizar imediatamente no estado local da interface
    setOccurrences(prev => prev.map(o => o.id === updated.id ? updated : o));
    setSelectedOccurrence(updated);

    // 2. Gravar imediatamente no LocalStorage (pome_local_occurrences)
    try {
      const localStore = JSON.parse(localStorage.getItem('pome_local_occurrences') || '[]');
      localStorage.setItem('pome_local_occurrences', JSON.stringify([updated, ...localStore.filter(o => o.id !== updated.id)]));
    } catch (_) {}

    // 3. Salvar no backend com fila de sincronização
    try {
      const res = await fetch('/api/occurrences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });
      if (res.ok) {
        await fetchOccurrences();
      } else {
        const queue = JSON.parse(localStorage.getItem('pome_sync_queue') || '[]');
        localStorage.setItem('pome_sync_queue', JSON.stringify([updated, ...queue.filter(o => o.id !== updated.id)]));
      }
    } catch (err) {
      console.warn('Director note saved locally, queued for server sync:', err);
      const queue = JSON.parse(localStorage.getItem('pome_sync_queue') || '[]');
      localStorage.setItem('pome_sync_queue', JSON.stringify([updated, ...queue.filter(o => o.id !== updated.id)]));
    }

    setNotification({
      type: 'success',
      message: '✅ Visto da diretoria registrado e confirmado com sucesso!'
    });

    setShowDetailModal(false);
    setSelectedOccurrence(null);
  };

  // Handler: Delete Occurrence
  const handleDeleteOccurrence = async (id) => {
    if (!window.confirm('Tem certeza de que deseja excluir este registro de atendimento?')) return;
    try {
      // 1. Atualizar estado local imediatamente
      setOccurrences(prev => prev.filter(o => o.id !== id));
      
      // 2. Limpar cache local
      try {
        const localStore = JSON.parse(localStorage.getItem('pome_local_occurrences') || '[]');
        localStorage.setItem('pome_local_occurrences', JSON.stringify(localStore.filter(o => o.id !== id)));
      } catch (_) {}

      // 3. Fechar modal de detalhes se estiver aberta
      if (selectedOccurrence && selectedOccurrence.id === id) {
        setShowDetailModal(false);
        setSelectedOccurrence(null);
      }

      // 4. Chamar endpoint de exclusão
      const userRole = user?.role || 'gestor';
      const userId = user?.id || 'usr-1';
      const res = await fetch(`/api/occurrences/${id}?role=${userRole}&userId=${userId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setNotification({ type: 'success', message: '🗑️ Registro de atendimento excluído com sucesso!' });
        await fetchOccurrences();
      } else {
        const err = await res.json();
        alert(err.error || 'Erro ao excluir ocorrência.');
        await fetchOccurrences();
      }
    } catch (err) {
      console.error('Error deleting occurrence:', err);
      setNotification({ type: 'info', message: 'Registro removido localmente.' });
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
  // Clear all report filters
  const handleClearReportFilters = () => {
    setReportFilterSchool('');
    setReportFilterSex('');
    setReportFilterFeeling('');
    setReportFilterNature('');
    setReportFilterClassification('');
    setReportFilterTurn('');
    setReportFilterGrade('');
    setReportFilterStatus('');
    setReportFilterReferral('');
    setReportFilterDateStart('');
    setReportFilterDateEnd('');
    setReportSearchQuery('');
  };

  // CSV/Excel Export (SPSS Friendly & Filtered Support)
  const handleExportSPSS = (listToExport = reportFilteredOccurrences) => {
    const targetList = Array.isArray(listToExport) && listToExport.length > 0 ? listToExport : occurrences;
    const headers = [
      'ID_Ocorrencia',
      'Escola_ID',
      'Escola_Nome',
      'Data_Registro',
      'Estudantes_Nomes',
      'Sexos_Estudantes',
      'Turnos_Estudantes',
      'Qtd_Estudantes',
      'Ano_Ciclo_Principal',
      'Turma_Principal',
      'Professor_Principal',
      'Responsavel_Nome',
      'Responsavel_Contato',
      'Dimensoes_Detectadas',
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

    const rows = targetList.map(o => {
      const schoolName = schools.find(s => s.id === o.schoolId)?.name || 'Rede Geral';
      const studentsList = Array.isArray(o.students) && o.students.length > 0 ? o.students : [];
      const studentNames = studentsList.map(s => s.studentName).join(', ') || o.studentName || '';
      const sexesStr = studentsList.map(s => s.sex).filter(Boolean).join(', ') || o.sex || '';
      const classificationsStr = Array.isArray(o.classifications) 
        ? o.classifications.map(c => c === 'Outra' && o.customOtherClassification ? `Outra (${o.customOtherClassification})` : c).join(' | ') 
        : (o.type || '');
      const directionRefStr = Array.isArray(o.direction_referrals) ? o.direction_referrals.join(', ') : '';
      
      const detectedDimensions = (Array.isArray(o.classifications) && o.classifications.length > 0 ? o.classifications : [o.type || ''])
        .map(c => getDimensionForClassification(c))
        .filter(Boolean)
        .filter((v, i, a) => a.indexOf(v) === i);

      return [
        escape(o.id),
        escape(o.schoolId),
        escape(schoolName),
        escape(o.date),
        escape(studentNames),
        escape(sexesStr),
        escape(turnsStr),
        studentsList.length || 1,
        escape(o.gradeCycle || studentsList[0]?.gradeCycle),
        escape(o.className || studentsList[0]?.className),
        escape(o.teacherName || studentsList[0]?.teacherName),
        escape(o.guardianName || studentsList[0]?.guardian?.name),
        escape(o.contacts || studentsList[0]?.guardian?.contact),
        escape(detectedDimensions.join(' | ')),
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
    link.setAttribute('download', `pome_relatorio_analitico_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Helper: Match classification to taxonomy dimension
  const getDimensionForClassification = (classificationTerm) => {
    if (!classificationTerm) return null;
    const termLower = classificationTerm.toLowerCase().trim();
    for (const [dimName, terms] of Object.entries(TAXONOMY_DIMENSIONS)) {
      if (terms.some(t => {
        const tLower = t.toLowerCase();
        return tLower === termLower || termLower.includes(tLower) || tLower.includes(termLower);
      })) {
        return dimName;
      }
    }
    if (termLower.includes('outra')) return 'Outra';
    return 'Outra';
  };

  const occurrenceHasDimension = (occ, dimensionQuery) => {
    if (!dimensionQuery || dimensionQuery === 'all') return true;
    const list = Array.isArray(occ.classifications) && occ.classifications.length > 0
      ? occ.classifications
      : [occ.type || ''];
    return list.some(term => {
      const dim = getDimensionForClassification(term);
      if (!dim) return false;
      return dim.toLowerCase().includes(dimensionQuery.toLowerCase()) || 
             dimensionQuery.toLowerCase().includes(dim.toLowerCase());
    });
  };

  // Backward compatibility aliases
  const getNatureForClassification = (term) => getDimensionForClassification(term);
  const occurrenceHasNature = (occ, dimQuery) => occurrenceHasDimension(occ, dimQuery);

  // Filter & Search Logic (Tabela Geral e Dashboard)
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

    const normalize = (str) => (str || '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
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
    
    // Dimension filter (Search page dropdown)
    const matchesDimension = filterNature
      ? occurrenceHasDimension(o, filterNature) ||
        (Array.isArray(o.classifications) && o.classifications.some(c => c.toLowerCase().includes(filterNature.toLowerCase()))) ||
        (o.type && o.type.toLowerCase().includes(filterNature.toLowerCase()))
      : true;

    // Dashboard Dimension Panorama Filter (Pill buttons)
    const matchesDashboard = (activeTab === 'dashboard' && dashboardFilter !== 'all')
      ? occurrenceHasDimension(o, dashboardFilter)
      : true;

    return matchesSearch && matchesDimension && matchesSchool && matchesClass && matchesDashboard;
  });

  // Advanced Report Filters (Filtros Específicos para Relatórios & Gráficos)
  const reportFilteredOccurrences = occurrences.filter(o => {
    const studentsList = Array.isArray(o.students) && o.students.length > 0 ? o.students : [];
    const studentNames = studentsList.map(s => s.studentName).join(' ') || o.studentName || '';
    const sexes = studentsList.map(s => s.sex).filter(Boolean);
    const turns = studentsList.map(s => s.turn).filter(Boolean);
    const grades = studentsList.map(s => s.gradeCycle).filter(Boolean);
    const classifications = Array.isArray(o.classifications) && o.classifications.length > 0 ? o.classifications : [o.type || ''];
    const feelings = Array.isArray(o.feelings) ? o.feelings : [];
    const referrals = Array.isArray(o.direction_referrals) ? o.direction_referrals : [];

    // Filter by School
    if (reportFilterSchool && o.schoolId !== reportFilterSchool) return false;

    // Filter by Sex
    if (reportFilterSex) {
      const matchSex = sexes.some(s => s.toLowerCase() === reportFilterSex.toLowerCase()) || 
                       (o.sex && o.sex.toLowerCase() === reportFilterSex.toLowerCase());
      if (!matchSex) return false;
    }

    // Filter by Feeling
    if (reportFilterFeeling) {
      const matchFeeling = feelings.some(f => f.toLowerCase() === reportFilterFeeling.toLowerCase());
      if (!matchFeeling) return false;
    }

    // Filter by Dimension
    if (reportFilterNature && !occurrenceHasDimension(o, reportFilterNature)) return false;

    // Filter by Specific Classification
    if (reportFilterClassification) {
      const matchClassif = classifications.some(c => c.toLowerCase().includes(reportFilterClassification.toLowerCase()));
      if (!matchClassif) return false;
    }

    // Filter by Turn
    if (reportFilterTurn) {
      const matchTurn = turns.some(t => t.toLowerCase().includes(reportFilterTurn.toLowerCase())) ||
                        (o.turn && o.turn.toLowerCase().includes(reportFilterTurn.toLowerCase()));
      if (!matchTurn) return false;
    }

    // Filter by Grade / Cycle
    if (reportFilterGrade) {
      const matchGrade = grades.some(g => g.toLowerCase().includes(reportFilterGrade.toLowerCase())) ||
                         (o.gradeCycle && o.gradeCycle.toLowerCase().includes(reportFilterGrade.toLowerCase()));
      if (!matchGrade) return false;
    }

    // Filter by Status / Visto
    if (reportFilterStatus) {
      if (reportFilterStatus === 'com_visto' && !o.directorNotes) return false;
      if (reportFilterStatus === 'sem_visto' && (o.directorNotes || o.status === 'rascunho')) return false;
      if (reportFilterStatus === 'rascunho' && o.status !== 'rascunho') return false;
      if (reportFilterStatus === 'finalizado' && o.status === 'rascunho') return false;
    }

    // Filter by Referral / Rede de Proteção
    if (reportFilterReferral) {
      const matchRef = referrals.some(r => r.toLowerCase().includes(reportFilterReferral.toLowerCase())) ||
                       (o.referrals && o.referrals.toLowerCase().includes(reportFilterReferral.toLowerCase()));
      if (!matchRef) return false;
    }

    // Filter by Date Range
    if (reportFilterDateStart) {
      const occDate = new Date(o.date).toISOString().slice(0, 10);
      if (occDate < reportFilterDateStart) return false;
    }
    if (reportFilterDateEnd) {
      const occDate = new Date(o.date).toISOString().slice(0, 10);
      if (occDate > reportFilterDateEnd) return false;
    }

    // Free Text Search in Reports
    if (reportSearchQuery) {
      const norm = (s) => (s || '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      const q = norm(reportSearchQuery);
      const matchText = norm(studentNames).includes(q) ||
                        norm(o.subject).includes(q) ||
                        norm(o.createdByName).includes(q) ||
                        classifications.some(c => norm(c).includes(q)) ||
                        feelings.some(f => norm(f).includes(q));
      if (!matchText) return false;
    }

    return true;
  });

  // Calculate Metrics/Statistics for current context (Real database counts)
  const getMetrics = (source = occurrences) => {
    const total = source.length;
    const dimCounts = {};
    Object.keys(TAXONOMY_DIMENSIONS).forEach(dim => {
      dimCounts[dim] = source.filter(o => occurrenceHasDimension(o, dim)).length;
    });
    dimCounts['Outra'] = source.filter(o => occurrenceHasDimension(o, 'Outra')).length;

    const comVisto = source.filter(o => Boolean(o.directorNotes && o.directorNotes.trim())).length;
    const vistoObrigatorio = source.filter(o => !o.directorNotes && o.status !== 'rascunho' && Array.isArray(o.direction_referrals) && o.direction_referrals.length > 0).length;
    const registrados = source.filter(o => o.status !== 'rascunho' && (!Array.isArray(o.direction_referrals) || o.direction_referrals.length === 0) && !o.directorNotes).length;
    const rascunhos = source.filter(o => o.status === 'rascunho').length;

    return { total, dimCounts, comVisto, vistoObrigatorio, registrados, rascunhos };
  };

  const metrics = getMetrics();
  const reportMetrics = getMetrics(reportFilteredOccurrences);

  // Status & Badge Helper (Ícones SVG monocromáticos e cores elegantes)
  const getOccurrenceStatus = (occ) => {
    if (!occ) {
      return {
        label: 'Registrado',
        badgeClass: 'table-status-badge',
        icon: <IconFileText style={{ width: '11px', height: '11px', flexShrink: 0 }} />,
        style: { backgroundColor: '#f0f9ff', color: '#0369a1', borderColor: '#bae6fd' }
      };
    }
    if (occ.status === 'rascunho') {
      return {
        label: 'Rascunho',
        badgeClass: 'table-status-badge',
        icon: <IconClock style={{ width: '11px', height: '11px', flexShrink: 0 }} />,
        style: { backgroundColor: '#f8fafc', color: '#475569', borderColor: '#cbd5e1' }
      };
    }
    const hasDirectionRef = Array.isArray(occ.direction_referrals) && occ.direction_referrals.length > 0;
    const hasVisto = Boolean(occ.directorNotes && occ.directorNotes.trim());

    if (hasVisto) {
      return {
        label: 'Visto Confirmado',
        badgeClass: 'table-status-badge',
        icon: <IconCheckCircle style={{ width: '11px', height: '11px', flexShrink: 0 }} />,
        style: { backgroundColor: '#f0fdf4', color: '#15803d', borderColor: '#bbf7d0' }
      };
    }
    if (hasDirectionRef) {
      return {
        label: 'Visto Obrigatório',
        badgeClass: 'table-status-badge',
        icon: <IconAlertCircle style={{ width: '11px', height: '11px', flexShrink: 0 }} />,
        style: { backgroundColor: '#fffbeb', color: '#b45309', borderColor: '#fde68a' }
      };
    }
    return {
      label: 'Registrado',
      badgeClass: 'table-status-badge',
      icon: <IconFileText style={{ width: '11px', height: '11px', flexShrink: 0 }} />,
      style: { backgroundColor: '#f0f9ff', color: '#0369a1', borderColor: '#bae6fd' }
    };
  };

  // Relatórios Analíticos (Pedagogo, Diretor, Gestor e Super Admin)
  const getTurmasReport = (source = reportFilteredOccurrences) => {
    const map = {};
    source.forEach(o => {
      const studentsList = Array.isArray(o.students) && o.students.length > 0 ? o.students : [];
      const classKey = (studentsList.length > 0 ? `${studentsList[0].gradeCycle || ''} - ${studentsList[0].className || ''}` : `${o.gradeCycle || ''} - ${o.className || ''}`).trim() || 'Geral / Outros';
      
      if (!map[classKey]) {
        map[classKey] = {
          className: classKey,
          count: 0,
          studentsCount: 0,
          comVisto: 0,
          vistoObrigatorio: 0,
          semVisto: 0,
          myCount: 0
        };
      }
      map[classKey].count += 1;
      if (user && o.createdById === user.id) map[classKey].myCount += 1;
      map[classKey].studentsCount += (studentsList.length || 1);
      if (o.directorNotes && o.directorNotes.trim()) {
        map[classKey].comVisto += 1;
      } else {
        map[classKey].semVisto += 1;
        if (Array.isArray(o.direction_referrals) && o.direction_referrals.length > 0) {
          map[classKey].vistoObrigatorio += 1;
        }
      }
    });
    return Object.values(map).sort((a, b) => b.count - a.count);
  };

  const getSentimentosReport = (source = reportFilteredOccurrences) => {
    const map = {};
    source.forEach(o => {
      if (Array.isArray(o.feelings)) {
        o.feelings.forEach(f => {
          if (!f) return;
          map[f] = (map[f] || 0) + 1;
        });
      }
    });
    return Object.entries(map)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  };

  const getDisciplinasReport = (source = reportFilteredOccurrences) => {
    const map = {};
    source.forEach(o => {
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

  const getEncaminhamentosReport = (source = reportFilteredOccurrences) => {
    const map = {};
    source.forEach(o => {
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

  const getEscolasReport = (source = reportFilteredOccurrences) => {
    return schools.map(s => {
      const occs = source.filter(o => o.schoolId === s.id);
      return {
        id: s.id,
        name: s.name,
        total: occs.length,
        comVisto: occs.filter(o => o.directorNotes && o.directorNotes.trim()).length,
        vistoObrigatorio: occs.filter(o => !o.directorNotes && o.status !== 'rascunho' && Array.isArray(o.direction_referrals) && o.direction_referrals.length > 0).length,
        semVisto: occs.filter(o => !o.directorNotes && o.status !== 'rascunho').length,
        rascunhos: occs.filter(o => o.status === 'rascunho').length,
        riscos: occs.filter(o => occurrenceHasNature(o, 'Risco') || occurrenceHasNature(o, 'Agressiva')).length
      };
    }).sort((a, b) => b.total - a.total);
  };

  const getSexDistributionReport = (source = reportFilteredOccurrences) => {
    let masc = 0, fem = 0, outro = 0;
    source.forEach(o => {
      const studentsList = Array.isArray(o.students) && o.students.length > 0 ? o.students : [];
      if (studentsList.length > 0) {
        studentsList.forEach(st => {
          const s = (st.sex || '').toLowerCase();
          if (s.includes('masc')) masc += 1;
          else if (s.includes('fem')) fem += 1;
          else outro += 1;
        });
      } else {
        const s = (o.sex || '').toLowerCase();
        if (s.includes('masc')) masc += 1;
        else if (s.includes('fem')) fem += 1;
        else outro += 1;
      }
    });
    const total = masc + fem + outro || 1;
    return {
      total: masc + fem + outro,
      masc, fem, outro,
      mascPct: Math.round((masc / total) * 100),
      femPct: Math.round((fem / total) * 100),
      outroPct: Math.round((outro / total) * 100)
    };
  };

  const getDimensionsDistributionReport = (source = reportFilteredOccurrences) => {
    const total = source.length || 1;
    const items = Object.entries(TAXONOMY_DIMENSIONS).map(([dimName, terms], idx) => {
      const info = DIMENSIONS_INFO[dimName] || {};
      const count = source.filter(o => occurrenceHasDimension(o, dimName)).length;
      return {
        dimName,
        shortName: `${info.numero || (idx + 1)}. ${info.nome || dimName}`,
        numero: info.numero || (idx + 1),
        icone: info.icone || '📌',
        color: info.cor || '#0ea5e9',
        count,
        pct: Math.round((count / total) * 100)
      };
    });

    const countOutra = source.filter(o => occurrenceHasDimension(o, 'Outra')).length;
    if (countOutra > 0) {
      items.push({
        dimName: 'Outra',
        shortName: '9. Outra / Não contemplada',
        numero: 9,
        icone: '➕',
        color: '#64748b',
        count: countOutra,
        pct: Math.round((countOutra / total) * 100)
      });
    }

    return items;
  };

  const getNaturesDistributionReport = (source = reportFilteredOccurrences) => getDimensionsDistributionReport(source);

  const getTurnsDistributionReport = (source = reportFilteredOccurrences) => {
    const map = { 'Manhã': 0, 'Tarde': 0, 'Noite': 0, 'Integral': 0 };
    source.forEach(o => {
      const studentsList = Array.isArray(o.students) && o.students.length > 0 ? o.students : [];
      const turn = (studentsList[0]?.turn || o.turn || '').toLowerCase();
      if (turn.includes('manh')) map['Manhã'] += 1;
      else if (turn.includes('tard')) map['Tarde'] += 1;
      else if (turn.includes('noit')) map['Noite'] += 1;
      else if (turn.includes('integ')) map['Integral'] += 1;
    });
    const total = source.length || 1;
    return Object.entries(map).map(([name, count]) => ({
      name,
      count,
      pct: Math.round((count / total) * 100)
    }));
  };

  const getTurnoReport = (source = reportFilteredOccurrences) => getTurnsDistributionReport(source);

  const getClassificationReport = (source = reportFilteredOccurrences) => {
    const map = {};
    const total = source.length || 1;
    source.forEach(o => {
      const cls = Array.isArray(o.classifications) && o.classifications.length > 0 ? o.classifications : (o.type ? [o.type] : []);
      cls.forEach(c => {
        if (!c) return;
        map[c] = (map[c] || 0) + 1;
      });
    });
    return Object.entries(map)
      .map(([name, count]) => ({ name, count, pct: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count);
  };

  // Print Occurrence Ficha A4 function
  const handlePrintOccurrence = (occ) => {
    const targetOcc = occ || selectedOccurrence;
    if (!targetOcc) return;
    setPrintMode('occurrence');
    setPrintOccurrence(targetOcc);
    setSelectedOccurrence(targetOcc);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  // Print Executive / Analytical Report function
  const handlePrintExecutiveReport = () => {
    setPrintMode('executive');
    setPrintOccurrence(null);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  // Backwards-compatible alias for printing
  const handlePrint = (occ) => handlePrintOccurrence(occ);

  // Helper validation for Step 1
  const isStep1Valid = Boolean(
    Array.isArray(formData?.students) && 
    formData.students.length > 0 &&
    formData.students.every(s => 
      (s?.studentName || '').trim().length >= 2 && 
      s?.sex && 
      (s?.turn || '').trim() && 
      s?.gradeCycle && 
      (s?.className || '').trim() &&
      (s?.teacherName || '').trim().length >= 2 &&
      (s?.subject_matter || '').trim() &&
      (s?.subject_matter !== 'Outro' || (s?.customSubject || '').trim().length >= 2) &&
      (s?.guardian?.name || '').trim().length >= 2 &&
      (s?.guardian?.contact || '').trim()
    ) && (user?.role !== 'gestor' && user?.role !== 'seduc' && user?.role !== 'superadmin' ? true : Boolean(formData?.schoolId || user?.schoolId))
  );

  // Helper validation for Step 2
  const isStep2Valid = Boolean((formData?.subject || '').trim().length >= 10 && Array.isArray(formData?.classifications) && formData.classifications.length > 0);

  // Helper validation for Step 3 (Sentimentos)
  const isStep3Valid = !(formData?.feelings || []).includes('Outro') || Boolean((formData?.customFeeling || '').trim());

  // Helper validation for Step 4 (Encaminhamentos)
  const isStep4Valid = Boolean(
    (formData?.referrals || '').trim().length >= 5 && 
    (!(formData?.direction_referrals || []).includes('Outro') || Boolean((formData?.customDirectionReferral || '').trim()))
  );

  // Helper validation for Step 5 (Revisão e Finalização)
  const isStep5Valid = isStep1Valid && isStep2Valid && isStep3Valid && isStep4Valid;

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
      <>
        <LandingLoginPage
          credentials={{ username: loginData.cpf, password: loginData.password }}
          setCredentials={(creds) => {
            const val = creds.username;
            const formatted = (/^[\d.-]*$/.test(val) && !val.includes('@')) ? formatCPF(val) : val;
            setLoginData({ cpf: formatted, password: creds.password });
          }}
          onLogin={handleLogin}
          loading={false}
          error={loginError}
          onOpenRegister={() => setShowRegisterModal(true)}
          LogoComponent={Logo}
        />

        {/* Modal: Cadastro de Usuário (Itens 9, 10, 11, 12 - Imagem POME) */}
        {showRegisterModal && (
          <div className="modal-overlay" onClick={() => setShowRegisterModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem' }}>
                <h3 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--primary)' }}>Cadastro de Usuário</h3>
                <button className="btn btn-secondary" onClick={() => setShowRegisterModal(false)} style={{ padding: '0.35rem 0.75rem', borderRadius: '50%' }}>
                  ✕
                </button>
              </div>
              
              <form className="card-body" onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Preencha os dados abaixo para criar sua conta de acesso ao POME.
                </p>

                {/* LGPD Info Box */}
                <div className="lgpd-box" style={{ borderLeft: '4px solid var(--primary)', backgroundColor: 'var(--bg-app)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                  ℹ️ Este cadastro segue a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong>. Seus dados são utilizados exclusivamente para autenticação e registro funcional no sistema.
                </div>

                {registerSuccess && (
                  <div style={{ color: 'var(--success)', backgroundColor: 'var(--success-light)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--success)', fontSize: '0.875rem', fontWeight: '500' }}>
                    {registerSuccess}
                  </div>
                )}

                {registerError && (
                  <div style={{ color: 'var(--danger)', backgroundColor: 'var(--danger-light)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--danger)', fontSize: '0.875rem', fontWeight: '500' }}>
                    {registerError}
                  </div>
                )}

                {/* CPF e E-mail Institucional */}
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
                      placeholder="seu.email@edu.contagem.mg.gov.br"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Nome Completo e Telefone */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Nome Completo</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ex.: Nome do Usuário"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Telefone (Opcional)</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="(31) 90000-0000"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: formatPhone(e.target.value) })}
                      maxLength={15}
                    />
                  </div>
                </div>

                {/* Perfil e Unidade / Escola (Dropdowns) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Perfil</label>
                    <select
                      className="form-select"
                      value={registerData.role}
                      onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
                      required
                    >
                      <option value="pedagogo">Pedagogo(a)</option>
                      <option value="diretor">Diretor(a)</option>
                      <option value="assistente">Assistente Escolar / Mediador(a)</option>
                      <option value="seduc">Gestor(a) SEDUC</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Unidade / Escola</label>
                    <select
                      className="form-select"
                      value={registerData.schoolId}
                      onChange={(e) => setRegisterData({ ...registerData, schoolId: e.target.value })}
                      disabled={registerData.role === 'seduc'}
                      required={registerData.role !== 'seduc'}
                    >
                      <option value="">Selecione...</option>
                      {schools.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Senha e Repetir Senha (Itens 10 e 11) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">Senha</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showRegisterPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Digite sua senha"
                        style={{ paddingRight: '2.5rem' }}
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                        minLength={4}
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
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
                        {showRegisterPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Repetir senha</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showRegisterConfirmPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Digite novamente sua senha"
                        style={{ paddingRight: '2.5rem' }}
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        required
                        minLength={4}
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegisterConfirmPassword(!showRegisterConfirmPassword)}
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
                        {showRegisterConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Termo de Consentimento LGPD Completo */}
                <div className="lgpd-box" style={{ marginTop: '0.25rem', backgroundColor: 'var(--bg-app)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <div style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '0.88rem' }}>
                      📜 {LGPD_DOCUMENT.title}
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setShowFullLgpdTerms(!showFullLgpdTerms)}
                      style={{ background: 'none', border: 'none', color: '#0284c7', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                    >
                      {showFullLgpdTerms ? '▲ Recolher termo' : '▼ Expandir e ler termo completo'}
                    </button>
                  </div>
                  
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem 0', lineHeight: '1.4' }}>
                    {LGPD_DOCUMENT.subtitle}. Este termo formaliza o consentimento nos termos dos Arts. 7º e 11 da Lei nº 13.709/2018.
                  </p>

                  {showFullLgpdTerms && (
                    <div className="lgpd-full-text-scroll" style={{ fontSize: '0.76rem', color: '#334155', lineHeight: '1.45', maxHeight: '240px', overflowY: 'auto', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '0.85rem', marginBottom: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {LGPD_DOCUMENT.sections.map((sec) => (
                        <div key={sec.number} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '0.45rem' }}>
                          <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.2rem' }}>
                            {sec.number}. {sec.title}
                          </strong>
                          {sec.content.map((p, idx) => (
                            <p key={idx} style={{ margin: '0.2rem 0' }}>{p}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.5rem', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '600', color: '#0f172a' }}>
                    <input
                      type="checkbox"
                      checked={registerData.lgpd_accepted}
                      onChange={(e) => setRegisterData({ ...registerData, lgpd_accepted: e.target.checked })}
                      required
                      style={{ marginTop: '2px' }}
                    />
                    <span>{LGPD_DOCUMENT.checkboxLabel}</span>
                  </label>
                </div>

                {/* Actions (Botão Cadastrar) */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowRegisterModal(false)}>
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ padding: '0.625rem 1.75rem', fontWeight: '700' }} 
                    disabled={isRegistering}
                  >
                    {isRegistering ? 'Cadastrando conta...' : 'Cadastrar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </>
    );
  }

  return (
    <div className="app-container">
      {/* Toast Notification Banner */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          backgroundColor: notification.type === 'success' ? '#10b981' : notification.type === 'danger' ? '#ef4444' : '#3b82f6',
          color: 'white',
          padding: '0.85rem 1.35rem',
          borderRadius: 'var(--radius-md, 8px)',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '0.95rem',
          fontWeight: '600',
          animation: 'fadeIn 0.2s ease-in-out'
        }}>
          <span>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1 }}
          >
            ✕
          </button>
        </div>
      )}

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
              <span>{user.role === 'superadmin' ? '👑 SUPER ADMIN' : (user.role?.toUpperCase() || 'USUÁRIO')} {user.schoolName ? `| ${user.schoolName}` : ''}</span>
              <button
                type="button"
                className="help-role-badge"
                title={`Tutorial e Permissões do perfil: ${ROLE_TUTORIALS_DATA[user.role]?.name || user.role || 'Perfil'}`}
                onClick={() => {
                  setTutorialSelectedRole(user.role === 'seduc' ? 'seduc' : user.role);
                  setTutorialSubTab('overview');
                  setShowRoleTutorialModal(true);
                }}
              >
                ❓
                <span className="tooltip-role-text">
                  💡 Tutorial e Permissões do Perfil ({ROLE_TUTORIALS_DATA[user.role]?.name || user.role || 'Perfil'})
                </span>
              </button>
            </div>
          </div>
          
          <button 
            className="theme-toggle" 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            data-tooltip={theme === 'light' ? 'Alternar para Modo Escuro' : 'Alternar para Modo Claro'}
            data-tooltip-pos="bottom"
            title={theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={() => {
              setProfileData({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: ''
              });
              setProfileMessage(null);
              setShowProfileModal(true);
            }}
            data-tooltip="Gerenciar seus dados cadastrais e senha"
            data-tooltip-pos="bottom"
            title="Meu Perfil de Acesso"
            style={{ padding: '0.5rem 0.85rem', marginRight: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}
          >
            👤 Meu Perfil
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={() => {
              setTutorialSelectedRole(user.role === 'seduc' ? 'seduc' : user.role);
              setTutorialSubTab('overview');
              setShowRoleTutorialModal(true);
            }}
            data-tooltip="Guia institucional de uso e permissões"
            data-tooltip-pos="bottom"
            title="Tutorial do Sistema"
            style={{ padding: '0.5rem 0.85rem', marginRight: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}
          >
            💡 Tutorial
          </button>

          <button 
            className="btn btn-secondary" 
            onClick={handleLogout} 
            data-tooltip="Encerrar sessão de forma segura"
            data-tooltip-pos="bottom"
            title="Sair do POME"
            style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem' }}
          >
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

          {(user.role === 'superadmin' || user.role === 'seduc' || user.role === 'gestor' || impersonatedOriginalUser) && (
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
              <IconLightning style={{ marginRight: '6px' }} /> Administração & Backups
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
                  {user.role === 'gestor' || user.role === 'seduc' ? 'Visão global da rede municipal' : `Visão geral: ${user.schoolName || 'Escola Municipal'}`} | Hoje {new Date().toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <button className="btn btn-primary" onClick={() => { setFormData(initialFormState); setShowForm(true); setFormStep(1); }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><IconSchool /> Novo Atendimento</span>
                </button>
                {(user.role === 'gestor' || user.role === 'seduc' || user.role === 'superadmin') && (
                  <>
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => handleCreateBackup('manual')}
                      style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                      title="Gerar e baixar backup completo da base de dados do Supabase"
                    >
                      <IconDatabase /> Fazer Backup (JSON)
                    </button>
                    <button className="btn btn-success" onClick={() => handleExportSPSS()}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><IconFolder /> Exportar SPSS</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Dashboard Filter Options */}
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginRight: '4px' }}>Panorama por Dimensão:</span>
              <button 
                className={`btn btn-secondary ${dashboardFilter === 'all' ? 'active' : ''}`}
                style={{ padding: '0.3rem 0.65rem', fontSize: '0.78rem', backgroundColor: dashboardFilter === 'all' ? 'var(--primary-light)' : 'transparent', color: dashboardFilter === 'all' ? 'var(--primary)' : 'inherit', fontWeight: dashboardFilter === 'all' ? '700' : 'normal' }}
                onClick={() => setDashboardFilter('all')}
              >
                🌐 Todas
              </button>
              {Object.entries(DIMENSIONS_INFO).map(([key, info]) => {
                const isActive = dashboardFilter === key;
                return (
                  <button 
                    key={key}
                    className={`btn btn-secondary ${isActive ? 'active' : ''}`}
                    style={{ 
                      padding: '0.3rem 0.65rem', 
                      fontSize: '0.78rem', 
                      backgroundColor: isActive ? 'var(--primary-light)' : 'transparent', 
                      color: isActive ? 'var(--primary)' : 'inherit', 
                      fontWeight: isActive ? '700' : 'normal',
                      borderColor: isActive ? info.cor : 'var(--border-color)'
                    }}
                    onClick={() => setDashboardFilter(key)}
                    title={key}
                  >
                    {info.icone} {info.numero}. {info.nome.length > 22 ? info.nome.substring(0, 20) + '...' : info.nome}
                  </button>
                );
              })}
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
              <div className="metric-card" style={{ borderLeft: '4px solid var(--success)' }}>
                <div className="metric-icon" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}><IconCheckCircle /></div>
                <div className="metric-details">
                  <h4>Visto da Direção</h4>
                  <div className="metric-value">{metrics.comVisto}</div>
                </div>
              </div>
              <div className="metric-card" style={{ borderLeft: '4px solid #f59e0b', borderColor: metrics.vistoObrigatorio > 0 ? '#f59e0b' : 'var(--border-color)', backgroundColor: metrics.vistoObrigatorio > 0 ? '#fffbeb' : 'inherit' }}>
                <div className="metric-icon" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}><IconWarning /></div>
                <div className="metric-details">
                  <h4 style={{ color: metrics.vistoObrigatorio > 0 ? '#92400e' : 'inherit', fontWeight: '700' }}>Visto Obrigatório</h4>
                  <div className="metric-value" style={{ color: metrics.vistoObrigatorio > 0 ? '#b45309' : 'inherit' }}>{metrics.vistoObrigatorio}</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--text-secondary)' }}><IconClock /></div>
                <div className="metric-details">
                  <h4>Em Rascunho</h4>
                  <div className="metric-value">{metrics.rascunhos}</div>
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
                          <th style={{ width: '75px' }}>Data</th>
                          {(user.role === 'gestor' || user.role === 'seduc') && <th style={{ maxWidth: '110px' }}>Escola</th>}
                          <th style={{ minWidth: '150px' }}>Estudante(s)</th>
                          <th style={{ width: '40px', textAlign: 'center' }}>Turma</th>
                          <th style={{ minWidth: '110px' }}>Classificação</th>
                          <th style={{ minWidth: '90px' }}>Criado Por</th>
                          <th style={{ width: '110px' }}>Status</th>
                          <th style={{ textAlign: 'right', width: '115px' }}>Ações</th>
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
                            : o.type || 'Atendimento Geral';

                          const canEditOrDelete = (user.role === 'gestor' || 
                            user.role === 'seduc' ||
                            user.role === 'superadmin' ||
                            user.role === 'diretor' || 
                            ((user.role === 'pedagogo' || user.role === 'assistente') && (o.createdById === user.id || !o.createdById) && !o.directorNotes));

                          return (
                            <tr key={o.id}>
                              <td style={{ whiteSpace: 'nowrap', fontSize: '0.78rem' }}>{formatDisplayDate(o.date)}</td>
                              {(user.role === 'gestor' || user.role === 'seduc') && (
                                <td style={{ maxWidth: '110px', fontSize: '0.76rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '500' }} title={schoolName}>
                                  {schoolName}
                                </td>
                              )}
                              <td style={{ fontWeight: '700', color: 'var(--text-primary)', wordBreak: 'break-word', fontSize: '0.82rem', lineHeight: '1.3' }}>
                                {displayedStudent}
                              </td>
                              <td style={{ textAlign: 'center', fontSize: '0.78rem', fontWeight: '600' }}>
                                {o.className || studentsList[0]?.className || '-'}
                              </td>
                              <td>
                                <span className="table-classification-badge" title={primaryType}>
                                  {primaryType}
                                </span>
                              </td>
                              <td style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: '1.25', wordBreak: 'break-word' }}>
                                {anonymizeText(o.createdByName, anonymizeView)}
                              </td>
                              <td>
                                {(() => {
                                  const st = getOccurrenceStatus(o);
                                  return (
                                    <span className={st.badgeClass} style={st.style}>
                                      {st.icon}
                                      <span>{st.label}</span>
                                    </span>
                                  );
                                })()}
                              </td>
                              <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                <div style={{ display: 'inline-flex', gap: '4px', alignItems: 'center', justifyContent: 'flex-end' }}>
                                  <button 
                                    className="action-icon-btn action-icon-view" 
                                    data-tooltip="Ver detalhes completos do atendimento"
                                    data-tooltip-pos="left"
                                    onClick={() => {
                                      setSelectedOccurrence(o);
                                      setDirectorNotes(o.directorNotes || '');
                                      setShowDetailModal(true);
                                    }}
                                    title="Ver detalhes completos do atendimento"
                                  >
                                    <IconEye style={{ width: '14px', height: '14px' }} />
                                  </button>
                                  <button 
                                    className="action-icon-btn action-icon-print" 
                                    data-tooltip="Imprimir Ficha Oficial A4"
                                    data-tooltip-pos="left"
                                    onClick={() => handlePrint(o)}
                                    title="Imprimir Ficha Oficial A4"
                                  >
                                    <IconPrinter style={{ width: '14px', height: '14px' }} />
                                  </button>
                                  {canEditOrDelete && (
                                    <button 
                                      className="action-icon-btn action-icon-edit" 
                                      data-tooltip="Editar ocorrência"
                                      data-tooltip-pos="left"
                                      onClick={() => handleEditOccurrence(o)}
                                      title="Editar ocorrência"
                                    >
                                      <IconEdit style={{ width: '14px', height: '14px' }} />
                                    </button>
                                  )}
                                  {canEditOrDelete && (
                                    <button 
                                      className="action-icon-btn action-icon-delete" 
                                      data-tooltip="Excluir ocorrência"
                                      data-tooltip-pos="left"
                                      onClick={() => handleDeleteOccurrence(o.id)}
                                      title="Excluir ocorrência"
                                    >
                                      <IconTrash style={{ width: '14px', height: '14px' }} />
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
                style={{ width: '230px' }} 
                value={filterNature} 
                onChange={(e) => setFilterNature(e.target.value)}
              >
                <option value="">Todas as Dimensões</option>
                {Object.entries(DIMENSIONS_INFO).map(([key, info]) => (
                  <option key={key} value={key}>
                    {info.icone} {info.numero}. {info.nome}
                  </option>
                ))}
                <option value="Outra">➕ 9. Outra / Não contemplada</option>
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
                          <th style={{ width: '75px' }}>Data</th>
                          {(user.role === 'gestor' || user.role === 'seduc') && <th style={{ maxWidth: '110px' }}>Escola</th>}
                          <th style={{ minWidth: '140px' }}>Estudante(s)</th>
                          <th style={{ width: '40px', textAlign: 'center' }}>Turma</th>
                          <th style={{ minWidth: '95px' }}>Responsável</th>
                          <th style={{ minWidth: '105px' }}>Classificação</th>
                          <th style={{ minWidth: '85px' }}>Criado Por</th>
                          <th style={{ width: '110px' }}>Status</th>
                          <th style={{ textAlign: 'right', width: '115px' }}>Ações</th>
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
                            : o.type || 'Atendimento Geral';

                          const canEditOrDelete = (user.role === 'gestor' || 
                            user.role === 'seduc' || 
                            user.role === 'superadmin' || 
                            user.role === 'diretor' || 
                            ((user.role === 'pedagogo' || user.role === 'assistente') && (o.createdById === user.id || !o.createdById) && !o.directorNotes));

                          return (
                            <tr key={o.id}>
                              <td style={{ whiteSpace: 'nowrap', fontSize: '0.78rem' }}>{formatDisplayDate(o.date)}</td>
                              {(user.role === 'gestor' || user.role === 'seduc') && (
                                <td style={{ maxWidth: '110px', fontSize: '0.76rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '500' }} title={schoolName}>
                                  {schoolName}
                                </td>
                              )}
                              <td style={{ fontWeight: '700', color: 'var(--text-primary)', wordBreak: 'break-word', fontSize: '0.82rem', lineHeight: '1.3' }}>
                                {displayedStudent}
                              </td>
                              <td style={{ textAlign: 'center', fontSize: '0.78rem', fontWeight: '600' }}>
                                {o.className || studentsList[0]?.className || '-'}
                              </td>
                              <td style={{ fontSize: '0.76rem', wordBreak: 'break-word', color: 'var(--text-secondary)' }}>
                                {anonymizeText(guardianName, anonymizeView)}
                              </td>
                              <td>
                                <span className="table-classification-badge" title={primaryType}>
                                  {primaryType}
                                </span>
                              </td>
                              <td style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: '1.25', wordBreak: 'break-word' }}>
                                {anonymizeText(o.createdByName, anonymizeView)}
                              </td>
                              <td>
                                {(() => {
                                  const st = getOccurrenceStatus(o);
                                  return (
                                    <span className={st.badgeClass} style={st.style}>
                                      {st.icon}
                                      <span>{st.label}</span>
                                    </span>
                                  );
                                })()}
                              </td>
                              <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                <div style={{ display: 'inline-flex', gap: '4px', alignItems: 'center', justifyContent: 'flex-end' }}>
                                  <button 
                                    className="action-icon-btn action-icon-view" 
                                    data-tooltip="Ver detalhes completos do atendimento"
                                    data-tooltip-pos="left"
                                    onClick={() => {
                                      setSelectedOccurrence(o);
                                      setDirectorNotes(o.directorNotes || '');
                                      setShowDetailModal(true);
                                    }}
                                    title="Ver detalhes completos do atendimento"
                                  >
                                    <IconEye style={{ width: '14px', height: '14px' }} />
                                  </button>
                                  <button 
                                    className="action-icon-btn action-icon-print" 
                                    data-tooltip="Imprimir Ficha Oficial A4"
                                    data-tooltip-pos="left"
                                    onClick={() => handlePrint(o)}
                                    title="Imprimir Ficha Oficial A4"
                                  >
                                    <IconPrinter style={{ width: '14px', height: '14px' }} />
                                  </button>
                                  {canEditOrDelete && (
                                    <button 
                                      className="action-icon-btn action-icon-edit" 
                                      data-tooltip="Editar ocorrência"
                                      data-tooltip-pos="left"
                                      onClick={() => handleEditOccurrence(o)}
                                      title="Editar ocorrência"
                                    >
                                      <IconEdit style={{ width: '14px', height: '14px' }} />
                                    </button>
                                  )}
                                  {canEditOrDelete && (
                                    <button 
                                      className="action-icon-btn action-icon-delete" 
                                      data-tooltip="Excluir ocorrência"
                                      data-tooltip-pos="left"
                                      onClick={() => handleDeleteOccurrence(o.id)}
                                      title="Excluir ocorrência"
                                    >
                                      <IconTrash style={{ width: '14px', height: '14px' }} />
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
          <div id="pome-form-card" className="card fade-in" style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Registro de Atendimento</h3>
              <button className="btn btn-secondary" onClick={() => setShowForm(false)}>
                Cancelar
              </button>
            </div>
            <div className="card-body">
              
              {/* 5-Step Progress Indicator (Clicável para Navegação Rápida) */}
              <div className="step-indicator">
                <div 
                  className={`step-item ${formStep >= 1 ? 'active' : ''} ${formStep > 1 ? 'completed' : ''}`}
                  onClick={() => goToStep(1)}
                  style={{ cursor: 'pointer' }}
                  title="Passo 1: Identificação do Estudante"
                >
                  <div className="step-number">1</div>
                  <div className="step-label">Identificação</div>
                </div>
                <div 
                  className={`step-item ${formStep >= 2 ? 'active' : ''} ${formStep > 2 ? 'completed' : ''}`}
                  onClick={() => goToStep(2)}
                  style={{ cursor: 'pointer' }}
                  title="Passo 2: Relato e Classificação"
                >
                  <div className="step-number">2</div>
                  <div className="step-label">Ocorrência</div>
                </div>
                <div 
                  className={`step-item ${formStep >= 3 ? 'active' : ''} ${formStep > 3 ? 'completed' : ''}`}
                  onClick={() => goToStep(3)}
                  style={{ cursor: 'pointer' }}
                  title="Passo 3: Sentimentos (CNV)"
                >
                  <div className="step-number">3</div>
                  <div className="step-label">Sentimentos</div>
                </div>
                <div 
                  className={`step-item ${formStep >= 4 ? 'active' : ''} ${formStep > 4 ? 'completed' : ''}`}
                  onClick={() => goToStep(4)}
                  style={{ cursor: 'pointer' }}
                  title="Passo 4: Encaminhamentos"
                >
                  <div className="step-number">4</div>
                  <div className="step-label">Encaminhamentos</div>
                </div>
                <div 
                  className={`step-item ${formStep >= 5 ? 'active' : ''}`}
                  onClick={() => goToStep(5)}
                  style={{ cursor: 'pointer' }}
                  title="Passo 5: Revisão e Finalização"
                >
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

                  {/* Escola vinculada */}
                  {(user.role === 'gestor' || user.role === 'seduc' || user.role === 'superadmin' || !user.schoolId) ? (
                    <div className="form-group full-width" style={{ marginBottom: '1.25rem' }}>
                      <label className="form-label" style={{ fontWeight: '700' }}>Escola Municipal Vinculada *</label>
                      <select
                        className="form-select"
                        value={formData.schoolId || user.schoolId || ''}
                        onChange={(e) => setFormData({ ...formData, schoolId: e.target.value })}
                        required
                      >
                        <option value="">Selecione a escola vinculada...</option>
                        {schools.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className="form-group full-width" style={{ marginBottom: '1.25rem' }}>
                      <label className="form-label" style={{ fontWeight: '700' }}>Escola Vinculada</label>
                      <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.1rem' }}>🏫</span>
                        <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                          {user.schoolName || schools.find(s => s.id === (formData.schoolId || user.schoolId))?.name || 'Escola Municipal'}
                        </span>
                        <span className="badge badge-success" style={{ marginLeft: 'auto', fontSize: '0.75rem' }}>Unidade Oficial</span>
                      </div>
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
                          <label className="form-label">Nome Completo do(a) Estudante *</label>
                          <input
                            type="text"
                            placeholder="Nome completo do(a) estudante..."
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
                          <label className="form-label">Sexo *</label>
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
                          <label className="form-label">Turno *</label>
                          <select
                            className="form-select"
                            value={student.turn}
                            onChange={(e) => {
                              const updated = [...formData.students];
                              updated[sIdx].turn = e.target.value;
                              setFormData({ ...formData, students: updated });
                            }}
                            required
                          >
                            <option value="">Selecione o turno...</option>
                            {TURN_OPTIONS.map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>

                        {/* Ano/Ciclo & Turma */}
                        <div className="form-group">
                          <label className="form-label">Ano / Ciclo *</label>
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
                          <label className="form-label">Turma *</label>
                          <input
                            type="text"
                            placeholder="Ex: 5º ANO A"
                            className="form-control"
                            style={{ textTransform: 'uppercase' }}
                            value={student.className}
                            onChange={(e) => {
                              const updated = [...formData.students];
                              updated[sIdx].className = e.target.value.toUpperCase();
                              setFormData({ ...formData, students: updated });
                            }}
                            required
                          />
                        </div>

                        {/* Professor(a) & Componente Curricular */}
                        <div className="form-group">
                          <label className="form-label">Professor(a) *</label>
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
                          <label className="form-label">Componente Curricular / Matéria *</label>
                          <select
                            className="form-select"
                            value={student.subject_matter}
                            onChange={(e) => {
                              const val = e.target.value;
                              const updated = [...formData.students];
                              updated[sIdx].subject_matter = val;
                              if (val !== 'Outro') {
                                updated[sIdx].customSubject = '';
                              }
                              setFormData({ ...formData, students: updated });
                            }}
                            required
                          >
                            <option value="">Selecione a matéria...</option>
                            {SUBJECT_OPTIONS.map(subj => (
                              <option key={subj} value={subj}>{subj}</option>
                            ))}
                          </select>
                          {(student.subject_matter === 'Outro' || (student.customSubject && !SUBJECT_OPTIONS.includes(student.subject_matter))) && (
                            <input
                              type="text"
                              placeholder="Informe a matéria manualmente..."
                              className="form-control"
                              style={{ marginTop: '0.4rem' }}
                              value={student.customSubject || ''}
                              onChange={(e) => {
                                const updated = [...formData.students];
                                updated[sIdx].customSubject = e.target.value;
                                setFormData({ ...formData, students: updated });
                              }}
                              required
                            />
                          )}
                        </div>

                        {/* Bloco Responsável (Abaixo dos dados do estudante) */}
                        <div className="form-group full-width" style={{ marginTop: '0.5rem', backgroundColor: 'var(--bg-card)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                          <label className="form-label" style={{ fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                            Responsável pelo(a) Estudante *
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

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button 
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => { setShowForm(false); setActiveTab('occurrences'); }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        ⬅️ Voltar / Cancelar
                      </button>
                      <button 
                        type="button"
                        className="btn btn-warning"
                        style={{ backgroundColor: 'var(--accent-orange)', color: 'white', border: 'none' }}
                        onClick={() => handleSaveOccurrence('rascunho')}
                      >
                        💾 Salvar Rascunho
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button 
                        type="button"
                        className="btn btn-secondary" 
                        onClick={() => goToStep(5)}
                      >
                        🔍 Ir para Revisão
                      </button>
                      <button 
                        type="button"
                        className="btn btn-primary" 
                        onClick={() => goToStep(2)}
                      >
                        Continuar para Passo 2 ➡️
                      </button>
                    </div>
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
                  
                  {/* 1. Assunto/Descrição do Ocorrido VEM PRIMEIRO (Apontamento 4a / Item 6) */}
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
                    <span style={{ color: '#dc2626', fontSize: '0.8rem', fontWeight: '500', display: 'block', marginTop: '0.25rem' }}>
                      (Não citar nomes de pais/responsáveis, professores e alunos neste campo.)
                    </span>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                      <span>Mínimo 10 caracteres.</span>
                      <span>Atual: {formData.subject.trim().length}</span>
                    </div>
                  </div>

                  {/* 2. Classificação da Ocorrência nas 8 Dimensões Oficiais */}
                  <div className="form-group full-width">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                      <label className="form-label" style={{ fontWeight: '700', fontSize: '0.95rem', margin: 0 }}>
                        Classificação da Ocorrência pelas 8 Dimensões (Selecione uma ou mais)
                      </label>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Itens organizados do menos grave para o mais grave dentro de cada dimensão.
                      </span>
                    </div>

                    <div className="taxonomy-dimensions-container">
                      {Object.entries(TAXONOMY_DIMENSIONS).map(([dimension, terms]) => {
                        const info = DIMENSIONS_INFO[dimension] || {};
                        return (
                          <div key={dimension} className="taxonomy-dimension-card">
                            <div className="taxonomy-dimension-header" style={{ borderLeft: `5px solid ${info.cor || 'var(--primary)'}` }}>
                              <div className="taxonomy-dimension-header-left">
                                <span style={{ fontSize: '1.2rem' }}>{info.icone || '📌'}</span>
                                <span style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--primary)' }}>{dimension}</span>
                              </div>
                              <button
                                type="button"
                                className="glossary-circle-btn"
                                data-tooltip={`Ver definição e diretrizes da "${dimension}"`}
                                data-tooltip-pos="left"
                                title={`Ver definição da dimensão: "${dimension}"`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setSelectedGlossaryTerm({
                                    isDimension: true,
                                    termo: dimension,
                                    dimensao: dimension,
                                    numero: info.numero,
                                    icone: info.icone,
                                    cor: info.cor,
                                    significado: info.descricao || 'Definição oficial da dimensão pedagógica conforme as diretrizes do POME.',
                                    encaminhamentoPedagogico: info.orientacaoPedagogica || 'Atuação preventiva, acolhimento e mediação pedagógica.',
                                    fonteLegal: 'Glossário Jurídico das Classificações do POME - SEDUC Contagem / Legislação Federal Brasileira.'
                                  });
                                }}
                              >
                                ?
                              </button>
                            </div>
                            
                            <div className="taxonomy-dimension-body">
                              <div className="taxonomy-items-grid">
                                {terms.map(term => {
                                  const isChecked = (formData.classifications || []).includes(term);
                                  return (
                                    <div key={term} className="taxonomy-item-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', background: isChecked ? '#f0fdf4' : 'transparent', border: isChecked ? '1px solid #bbf7d0' : '1px solid transparent', borderRadius: '6px', padding: '4px 8px' }}>
                                      <label className="taxonomy-item-label" style={{ flex: 1, margin: 0, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
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
                                        <span style={{ fontSize: '0.84rem', fontWeight: isChecked ? '600' : 'normal', color: isChecked ? '#15803d' : 'inherit' }}>{term}</span>
                                      </label>
                                      <button
                                        type="button"
                                        className="glossary-circle-btn"
                                        data-tooltip={`Ver definição jurídica de "${term}"`}
                                        data-tooltip-pos="left"
                                        title={`Ver definição jurídica de "${term}"`}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          setSelectedGlossaryTerm(LEGAL_GLOSSARY[term] || {
                                            termo: term,
                                            dimensao: dimension,
                                            significado: 'Classificação pedagógica para fins de monitoramento e mediação no POME.',
                                            termoAdequado: term,
                                            situacaoEscola: 'Ocorrência registrada no ambiente escolar conforme os protocolos da rede.',
                                            fonteLegal: 'Regimento Escolar e Legislação Vigente.'
                                          });
                                        }}
                                      >
                                        ?
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Botão e Bloco Independente: Outra Ocorrência (Fora da grade das 8 dimensões) */}
                    <div 
                      className="taxonomy-other-container" 
                      style={{ 
                        marginTop: '1.25rem', 
                        padding: '1rem 1.25rem', 
                        backgroundColor: (formData.classifications || []).includes('Outra') ? '#f0fdf4' : 'var(--bg-app)', 
                        border: (formData.classifications || []).includes('Outra') ? '2px solid #22c55e' : '1px dashed var(--border-color)', 
                        borderRadius: 'var(--radius-md)' 
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', margin: 0, fontWeight: '700', fontSize: '0.92rem', color: (formData.classifications || []).includes('Outra') ? '#15803d' : 'inherit' }}>
                          <input
                            type="checkbox"
                            checked={(formData.classifications || []).includes('Outra')}
                            onChange={(e) => {
                              let updatedList = [...(formData.classifications || [])];
                              if (e.target.checked) {
                                if (!updatedList.includes('Outra')) updatedList.push('Outra');
                              } else {
                                updatedList = updatedList.filter(item => item !== 'Outra');
                              }
                              setFormData({ ...formData, classifications: updatedList });
                            }}
                            style={{ width: '18px', height: '18px' }}
                          />
                          <span>➕ Outra ocorrência / Não contemplada nas 8 dimensões propostas</span>
                        </label>
                        <button
                          type="button"
                          className="glossary-circle-btn"
                          data-tooltip="Ver orientação sobre a opção Outra"
                          data-tooltip-pos="left"
                          title="Ver orientação sobre a opção Outra"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedGlossaryTerm(LEGAL_GLOSSARY['Outra'] || {
                              termo: 'Outra Ocorrência (Não Contemplada)',
                              dimensao: 'Outra / Não contemplada',
                              significado: 'Esta opção deve ser preenchida obrigatoriamente se o ocorrido não coincide com nenhum dos itens das 8 dimensões citadas acima.',
                              termoAdequado: 'Descrever no campo de texto a situação atípica ou específica observada.',
                              situacaoEscola: 'Fato atípico, conflito externo ou evento que não coincide com nenhuma das condutas catalogadas nas dimensões pedagógicas anteriores.',
                              fonteLegal: 'Regimento Escolar e Diretrizes da SEDUC Contagem.'
                            });
                          }}
                        >
                          ?
                        </button>
                      </div>
                      <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem', marginLeft: '1.85rem' }}>
                        Utilize e preencha este campo se o ocorrido não coincide com nenhum dos itens das 8 dimensões acima citadas.
                      </span>

                      {/* Campo de descrição condicional quando "Outra" estiver selecionada */}
                      {(formData.classifications || []).includes('Outra') && (
                        <div style={{ marginTop: '0.9rem', marginLeft: '1.85rem' }}>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#15803d', marginBottom: '0.35rem' }}>
                            Descreva o ocorrido que não se encaixa nas dimensões acima: <span style={{ color: '#dc2626' }}>*</span>
                          </label>
                          <textarea
                            className="form-control"
                            rows={2}
                            placeholder="Descreva detalhadamente a situação atípica ou específica observada..."
                            value={formData.customOtherClassification || ''}
                            onChange={(e) => setFormData({ ...formData, customOtherClassification: e.target.value })}
                            style={{ fontSize: '0.85rem', width: '100%', borderColor: '#86efac', backgroundColor: '#ffffff' }}
                          />
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                            Preenchimento obrigatório para especificar o motivo ou a tipologia da ocorrência atípica.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => goToStep(1)}>
                      ⬅️ Voltar ao Passo 1
                    </button>
                    <button 
                      type="button"
                      className="btn btn-warning"
                      style={{ backgroundColor: 'var(--accent-orange)', color: 'white', border: 'none' }}
                      onClick={() => handleSaveOccurrence('rascunho')}
                    >
                      💾 Salvar Rascunho
                    </button>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button 
                        type="button"
                        className="btn btn-secondary" 
                        onClick={() => goToStep(5)}
                      >
                        🔍 Ir para Revisão
                      </button>
                      <button 
                        type="button"
                        className="btn btn-primary" 
                        onClick={() => goToStep(3)}
                      >
                        Continuar para Passo 3 ➡️
                      </button>
                    </div>
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
                    <span style={{ color: '#dc2626', fontSize: '0.8rem', fontWeight: '500', display: 'block', marginTop: '0.25rem' }}>
                      (Não citar nomes de pais/responsáveis, professores e alunos neste campo.)
                    </span>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                      <span>Essas informações ajudam a compreender a situação e orientar intervenções restaurativas.</span>
                      <span>{(formData.feelings_observations || '').length} / 500</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => goToStep(2)}>
                      ⬅️ Voltar ao Passo 2
                    </button>
                    <button 
                      type="button"
                      className="btn btn-warning"
                      style={{ backgroundColor: 'var(--accent-orange)', color: 'white', border: 'none' }}
                      onClick={() => handleSaveOccurrence('rascunho')}
                    >
                      💾 Salvar Rascunho
                    </button>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button 
                        type="button"
                        className="btn btn-secondary" 
                        onClick={() => goToStep(5)}
                      >
                        🔍 Ir para Revisão
                      </button>
                      <button 
                        type="button"
                        className="btn btn-primary" 
                        onClick={() => goToStep(4)}
                      >
                        Continuar para Passo 4 ➡️
                      </button>
                    </div>
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
                      <span style={{ color: '#dc2626', fontSize: '0.8rem', fontWeight: '500', display: 'block', marginTop: '0.25rem' }}>
                        (Não citar nomes de pais/responsáveis, professores e alunos neste campo.)
                      </span>
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
                      <span style={{ color: '#dc2626', fontSize: '0.8rem', fontWeight: '500', display: 'block', marginTop: '0.25rem' }}>
                        (Não citar nomes de pais/responsáveis, professores e alunos neste campo.)
                      </span>
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

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => goToStep(3)}>
                      ⬅️ Voltar ao Passo 3
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
                      className="btn btn-primary" 
                      onClick={() => goToStep(5)}
                    >
                      Revisar Registro (Passo 5) ➡️
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
                          <p><strong>{st.studentName}</strong> • {st.sex || 'Não informado'} • Turno: {st.turn || 'Não informado'}</p>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                            {st.gradeCycle} - {st.className} | Prof: {st.teacherName} ({st.subject_matter === 'Outro' && st.customSubject ? st.customSubject : (st.subject_matter || 'Não informada')})
                          </p>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                            Responsável: {st.guardian.name} ({st.guardian.bond}) - Contato: {st.guardian.contact}
                          </p>
                        </div>
                      ))}
                    </div>

                    <p style={{ marginBottom: '0.5rem' }}>
                      <strong>Data do Atendimento:</strong> {formatDisplayDate(formData.date)}
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
                      <p style={{ color: 'var(--text-primary)', marginTop: '0.35rem', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                        {formData.subject}
                      </p>
                    </div>

                    {/* Encaminhamentos */}
                    {formData.referrals && (
                      <div style={{ marginTop: '0.75rem' }}>
                        <strong>Encaminhamentos e Ações Tomadas:</strong>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>
                          {formData.referrals}
                        </p>
                      </div>
                    )}

                    {/* Observações */}
                    {formData.observations && (
                      <div style={{ marginTop: '0.75rem' }}>
                        <strong>Observações Pedagógicas:</strong>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>
                          {formData.observations}
                        </p>
                      </div>
                    )}

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
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <button type="button" className="btn btn-secondary" onClick={() => goToStep(4)}>
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
                          handlePrintOccurrence(tempOcc);
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
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                              <div style={{ display: 'inline-flex', gap: '5px', justifyContent: 'flex-end' }}>
                                <button 
                                  className="action-icon-btn action-icon-edit" 
                                  data-tooltip="Editar nome da escola"
                                  data-tooltip-pos="left"
                                  title="Editar nome da escola"
                                  onClick={() => {
                                    setEditingSchool(s);
                                    setNewSchoolName(s.name);
                                  }}
                                >
                                  <IconEdit style={{ width: '14px', height: '14px' }} />
                                </button>
                                <button 
                                  className="action-icon-btn action-icon-delete" 
                                  data-tooltip="Excluir unidade escolar"
                                  data-tooltip-pos="left"
                                  title="Excluir unidade escolar"
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
                                  <IconTrash style={{ width: '14px', height: '14px' }} />
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
            <div className="card" style={{ marginBottom: '2rem' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1.25rem 1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.35rem', margin: 0, color: 'var(--primary)', fontWeight: '800' }}>
                    👥 Usuários Cadastrados na Rede ({usersList.length})
                  </h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
                    Gerenciamento institucional de perfis, lotações escolares e permissões de acesso ao POME.
                  </p>
                </div>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => {
                    setNewUserData({ name: '', cpf: '', email: '', phone: '', password: '', role: 'pedagogo', schoolId: '', classesInput: '' });
                    setShowCreateUserModal(true);
                  }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1.25rem', fontWeight: '700' }}
                >
                  <IconPlus /> Cadastrar Novo Usuário
                </button>
              </div>

              <div className="card-body" style={{ padding: 0 }}>
                <div className="table-responsive">
                  <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ padding: '0.85rem 1rem' }}>Nome Completo</th>
                        <th style={{ padding: '0.85rem 1rem' }}>CPF</th>
                        <th style={{ padding: '0.85rem 1rem' }}>E-mail Institucional</th>
                        <th style={{ padding: '0.85rem 1rem' }}>Perfil / Permissão</th>
                        <th style={{ padding: '0.85rem 1rem' }}>Escola Vinculada</th>
                        <th style={{ padding: '0.85rem 1rem' }}>Turmas</th>
                        <th style={{ textAlign: 'right', padding: '0.85rem 1rem' }}>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList.map(u => {
                        const schoolName = schools.find(s => s.id === u.schoolId)?.name || 'Rede Geral';
                        const roleColor = u.role === 'superadmin' ? '#7c3aed' : u.role === 'seduc' || u.role === 'gestor' ? '#1e40af' : u.role === 'diretor' ? '#0369a1' : '#059669';
                        const roleBg = u.role === 'superadmin' ? '#f5f3ff' : u.role === 'seduc' || u.role === 'gestor' ? '#eff6ff' : u.role === 'diretor' ? '#f0f9ff' : '#ecfdf5';
                        const roleBorder = u.role === 'superadmin' ? '#ddd6fe' : u.role === 'seduc' || u.role === 'gestor' ? '#bfdbfe' : u.role === 'diretor' ? '#bae6fd' : '#a7f3d0';

                        return (
                          <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                            <td style={{ fontWeight: '700', color: 'var(--text-primary)', padding: '0.85rem 1rem' }}>{u.name}</td>
                            <td style={{ padding: '0.85rem 1rem', fontFamily: 'monospace', fontSize: '0.85rem', color: '#475569' }}>{u.cpf}</td>
                            <td style={{ padding: '0.85rem 1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{u.email || '-'}</td>
                            <td style={{ padding: '0.85rem 1rem' }}>
                              <span className="badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: roleBg, color: roleColor, border: `1px solid ${roleBorder}`, padding: '3px 10px', fontSize: '0.76rem', fontWeight: '700', borderRadius: '50px', whiteSpace: 'nowrap' }}>
                                <span>{u.role}</span>
                                <button
                                  type="button"
                                  className="help-role-badge"
                                  style={{ width: '18px', height: '18px', fontSize: '0.65rem', marginLeft: '2px', cursor: 'pointer', border: 'none', background: 'transparent', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setTutorialSelectedRole(u.role === 'seduc' ? 'seduc' : u.role);
                                    setTutorialSubTab('overview');
                                    setShowRoleTutorialModal(true);
                                  }}
                                  title={`Ver atribuições de ${u.role}`}
                                >
                                  ❓
                                </button>
                              </span>
                            </td>
                            <td style={{ padding: '0.85rem 1rem', fontWeight: '500', color: '#334155' }}>
                              {schoolName}
                            </td>
                            <td style={{ padding: '0.85rem 1rem', fontSize: '0.82rem', color: '#64748b' }}>
                              {u.classes && u.classes.length > 0 ? u.classes.join(', ') : '-'}
                            </td>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap', padding: '0.65rem 1rem' }}>
                              <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <button 
                                  className="action-icon-btn action-icon-edit" 
                                  data-tooltip="Editar lotação e permissões do usuário"
                                  data-tooltip-pos="left"
                                  title="Editar lotação e permissões do usuário"
                                  onClick={() => {
                                    setEditingUser({
                                      id: u.id,
                                      name: u.name,
                                      cpf: u.cpf,
                                      email: u.email || '',
                                      phone: u.phone || '',
                                      role: u.role,
                                      schoolId: u.schoolId || '',
                                      classesInput: Array.isArray(u.classes) ? u.classes.join(', ') : ''
                                    });
                                  }}
                                >
                                  <IconEdit style={{ width: '14px', height: '14px' }} />
                                </button>
                                {u.id !== user.id && (
                                  <button 
                                    className="action-icon-btn action-icon-delete" 
                                    data-tooltip="Excluir usuário do sistema"
                                    data-tooltip-pos="left"
                                    title="Excluir usuário do sistema"
                                    onClick={async () => {
                                      if (!confirm(`Deseja realmente excluir o usuário ${u.name}?`)) return;
                                      try {
                                        const res = await fetch(`/api/users/${u.id}`, { method: 'DELETE' });
                                        if (res.ok) fetchUsers();
                                      } catch (err) {
                                        console.error('Delete user error:', err);
                                        alert('Erro ao excluir usuário.');
                                      }
                                    }}
                                  >
                                    <IconTrash style={{ width: '14px', height: '14px' }} />
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
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB: RELATÓRIOS ANALÍTICOS & GRÁFICOS (TODOS OS PERFIS) ----------------- */}
        {activeTab === 'reports' && (
          <div className="fade-in">
            {/* CABEÇALHO DO RELATÓRIO */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2>
                  📊 {user.role === 'diretor' ? 'Relatório de Gestão Escolar & Clima Institucional' :
                      (user.role === 'gestor' || user.role === 'seduc' || user.role === 'superadmin') ? 'Relatório Consolidado de Clima Escolar da Rede Municipal' :
                      'Relatório Pedagógico & Atendimentos da Unidade'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  {user.role === 'diretor' ? `Visão administrativa, acompanhamento de vistos e mediação de conflitos da ${user.schoolName || 'Escola Municipal'}` :
                   (user.role === 'gestor' || user.role === 'seduc' || user.role === 'superadmin') ? 'Painel estatístico comparativo, telemetria da rede e monitoramento de indicadores socioemocionais' :
                   `Acompanhamento dos atendimentos registrados por ${user.name} | ${user.schoolName || 'Escola Municipal'}`}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={handlePrintExecutiveReport}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IconPrinter /> Imprimir Relatório Executivo</span>
                </button>
                <button className="btn btn-success" onClick={() => handleExportSPSS(reportFilteredOccurrences)}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IconFolder /> Exportar Planilha (CSV Filtrado)</span>
                </button>
                {(user.role === 'gestor' || user.role === 'seduc' || user.role === 'superadmin') && (
                  <button className="btn btn-secondary" onClick={() => handleExportSPSS(occurrences)}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IconDatabase /> Exportar SPSS Geral</span>
                  </button>
                )}
              </div>
            </div>

            {/* PAINEL DE FILTROS AVANÇADOS MULTIDIMENSIONAIS */}
            <div className="report-filter-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.1rem' }}>🔍</span>
                  <strong style={{ fontSize: '0.95rem' }}>Filtros Analíticos de Pesquisa</strong>
                  <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                    {reportFilteredOccurrences.length} de {occurrences.length} registros
                  </span>
                </div>
                {(reportFilterSchool || reportFilterSex || reportFilterFeeling || reportFilterNature || reportFilterClassification || reportFilterTurn || reportFilterGrade || reportFilterStatus || reportFilterReferral || reportFilterDateStart || reportFilterDateEnd || reportSearchQuery) && (
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                    onClick={handleClearReportFilters}
                  >
                    🧹 Limpar Filtros
                  </button>
                )}
              </div>

              <div className="report-filter-grid">
                {/* Filtro de Escola (Gestores/Seduc/SuperAdmin) */}
                {(user.role === 'gestor' || user.role === 'seduc' || user.role === 'superadmin') && (
                  <div className="report-filter-group">
                    <label className="report-filter-label">Escola</label>
                    <select
                      className="form-select"
                      style={{ fontSize: '0.825rem', padding: '0.4rem 0.6rem' }}
                      value={reportFilterSchool}
                      onChange={(e) => setReportFilterSchool(e.target.value)}
                    >
                      <option value="">Todas as Escolas ({schools.length})</option>
                      {schools.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Filtro por Sexo / Gênero */}
                <div className="report-filter-group">
                  <label className="report-filter-label">Sexo do Estudante</label>
                  <select
                    className="form-select"
                    style={{ fontSize: '0.825rem', padding: '0.4rem 0.6rem' }}
                    value={reportFilterSex}
                    onChange={(e) => setReportFilterSex(e.target.value)}
                  >
                    <option value="">Todos os Sexos</option>
                    <option value="Masculino">👨 Masculino</option>
                    <option value="Feminino">👩 Feminino</option>
                    <option value="Outro">🧑 Outro / Não informado</option>
                  </select>
                </div>

                {/* Filtro por Dimensão da Ocorrência */}
                <div className="report-filter-group">
                  <label className="report-filter-label">Dimensão da Ocorrência</label>
                  <select
                    className="form-select"
                    style={{ fontSize: '0.825rem', padding: '0.4rem 0.6rem' }}
                    value={reportFilterNature}
                    onChange={(e) => setReportFilterNature(e.target.value)}
                  >
                    <option value="">Todas as Dimensões</option>
                    {Object.entries(DIMENSIONS_INFO).map(([key, info]) => (
                      <option key={key} value={key}>
                        {info.icone} {info.numero}. {info.nome}
                      </option>
                    ))}
                    <option value="Outra">➕ 9. Outra / Não contemplada</option>
                  </select>
                </div>

                {/* Filtro por Sentimento CNV */}
                <div className="report-filter-group">
                  <label className="report-filter-label">Sentimento (CNV)</label>
                  <select
                    className="form-select"
                    style={{ fontSize: '0.825rem', padding: '0.4rem 0.6rem' }}
                    value={reportFilterFeeling}
                    onChange={(e) => setReportFilterFeeling(e.target.value)}
                  >
                    <option value="">Todos os Sentimentos</option>
                    <option value="Ansiedade">Ansiedade</option>
                    <option value="Frustração">Frustração</option>
                    <option value="Raiva">Raiva</option>
                    <option value="Tristeza">Tristeza</option>
                    <option value="Insegurança">Insegurança</option>
                    <option value="Medo">Medo</option>
                    <option value="Vergonha">Vergonha</option>
                    <option value="Alívio">Alívio</option>
                    <option value="Culpa">Culpa</option>
                    <option value="Esperança">Esperança</option>
                  </select>
                </div>

                {/* Filtro por Turno */}
                <div className="report-filter-group">
                  <label className="report-filter-label">Turno Escolar</label>
                  <select
                    className="form-select"
                    style={{ fontSize: '0.825rem', padding: '0.4rem 0.6rem' }}
                    value={reportFilterTurn}
                    onChange={(e) => setReportFilterTurn(e.target.value)}
                  >
                    <option value="">Todos os Turnos</option>
                    <option value="Manhã">☀️ Manhã</option>
                    <option value="Tarde">🌤️ Tarde</option>
                    <option value="Noite">🌙 Noite</option>
                    <option value="Integral">⏱️ Integral</option>
                  </select>
                </div>

                {/* Filtro por Ciclo / Turma */}
                <div className="report-filter-group">
                  <label className="report-filter-label">Ano / Ciclo</label>
                  <select
                    className="form-select"
                    style={{ fontSize: '0.825rem', padding: '0.4rem 0.6rem' }}
                    value={reportFilterGrade}
                    onChange={(e) => setReportFilterGrade(e.target.value)}
                  >
                    <option value="">Todos os Anos/Ciclos</option>
                    <option value="1º Ano">1º Ano</option>
                    <option value="2º Ano">2º Ano</option>
                    <option value="3º Ano">3º Ano</option>
                    <option value="4º Ano">4º Ano</option>
                    <option value="5º Ano">5º Ano</option>
                    <option value="6º Ano">6º Ano</option>
                    <option value="7º Ano">7º Ano</option>
                    <option value="8º Ano">8º Ano</option>
                    <option value="9º Ano">9º Ano</option>
                    <option value="EJA">EJA</option>
                  </select>
                </div>

                {/* Filtro por Visto da Diretoria */}
                <div className="report-filter-group">
                  <label className="report-filter-label">Status do Visto</label>
                  <select
                    className="form-select"
                    style={{ fontSize: '0.825rem', padding: '0.4rem 0.6rem' }}
                    value={reportFilterStatus}
                    onChange={(e) => setReportFilterStatus(e.target.value)}
                  >
                    <option value="">Todos os Status</option>
                    <option value="com_visto">✅ Com Visto Homologado</option>
                    <option value="sem_visto">⏳ Pendente de Visto</option>
                    <option value="rascunho">📝 Em Rascunho</option>
                    <option value="finalizado">🔒 Finalizados</option>
                  </select>
                </div>

                {/* Filtro por Rede de Proteção */}
                <div className="report-filter-group">
                  <label className="report-filter-label">Rede de Proteção</label>
                  <select
                    className="form-select"
                    style={{ fontSize: '0.825rem', padding: '0.4rem 0.6rem' }}
                    value={reportFilterReferral}
                    onChange={(e) => setReportFilterReferral(e.target.value)}
                  >
                    <option value="">Todos os Encaminhamentos</option>
                    <option value="Conselho Tutelar">Conselho Tutelar</option>
                    <option value="CAPS">CAPS / Saúde Mental</option>
                    <option value="CRAS">CRAS / CREAS</option>
                    <option value="Vara">Vara da Infância</option>
                    <option value="Polícia">Polícia Comunitária</option>
                  </select>
                </div>

                {/* Data Início */}
                <div className="report-filter-group">
                  <label className="report-filter-label">Data Início</label>
                  <input
                    type="date"
                    className="form-control"
                    style={{ fontSize: '0.825rem', padding: '0.35rem 0.5rem' }}
                    value={reportFilterDateStart}
                    onChange={(e) => setReportFilterDateStart(e.target.value)}
                  />
                </div>

                {/* Data Fim */}
                <div className="report-filter-group">
                  <label className="report-filter-label">Data Fim</label>
                  <input
                    type="date"
                    className="form-control"
                    style={{ fontSize: '0.825rem', padding: '0.35rem 0.5rem' }}
                    value={reportFilterDateEnd}
                    onChange={(e) => setReportFilterDateEnd(e.target.value)}
                  />
                </div>

                {/* Busca Livre */}
                <div className="report-filter-group" style={{ gridColumn: 'span 2' }}>
                  <label className="report-filter-label">Busca por Termo / Aluno / Assunto</label>
                  <input
                    type="text"
                    placeholder="Filtrar por nome de aluno, assunto, professor ou tipo..."
                    className="form-control"
                    style={{ fontSize: '0.825rem', padding: '0.4rem 0.6rem' }}
                    value={reportSearchQuery}
                    onChange={(e) => setReportSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* METRICS CARDS (BASEADOS NOS FILTROS ATIVOS) */}
            <div className="metrics-grid" style={{ marginBottom: '1.75rem' }}>
              <div className="metric-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                <div className="metric-icon" style={{ color: 'var(--primary)' }}><IconSchool /></div>
                <div className="metric-details">
                  <h4>Total Filtrado</h4>
                  <div className="metric-value">{reportMetrics.total}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {reportMetrics.total === occurrences.length ? 'Base completa' : 'Conforme filtros ativos'}
                  </span>
                </div>
              </div>

              <div className="metric-card" style={{ borderLeft: '4px solid var(--success)' }}>
                <div className="metric-icon" style={{ color: 'var(--success)' }}><IconShield /></div>
                <div className="metric-details">
                  <h4>Com Visto da Direção</h4>
                  <div className="metric-value">{reportMetrics.comVisto}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {reportMetrics.total > 0 ? `${Math.round((reportMetrics.comVisto / reportMetrics.total) * 100)}% homologados` : '0%'}
                  </span>
                </div>
              </div>

              <div className="metric-card" style={{ borderLeft: '4px solid #f59e0b', borderColor: reportMetrics.vistoObrigatorio > 0 ? '#f59e0b' : 'var(--border-color)', backgroundColor: reportMetrics.vistoObrigatorio > 0 ? '#fffbeb' : 'inherit' }}>
                <div className="metric-icon" style={{ color: '#92400e', backgroundColor: '#fef3c7' }}><IconWarning /></div>
                <div className="metric-details">
                  <h4 style={{ color: reportMetrics.vistoObrigatorio > 0 ? '#92400e' : 'inherit' }}>Visto Obrigatório</h4>
                  <div className="metric-value" style={{ color: reportMetrics.vistoObrigatorio > 0 ? '#b45309' : 'inherit' }}>{reportMetrics.vistoObrigatorio}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Demandam visto imediato</span>
                </div>
              </div>

              <div className="metric-card" style={{ borderLeft: '4px solid #64748b' }}>
                <div className="metric-icon" style={{ color: '#64748b', backgroundColor: 'var(--bg-app)' }}><IconClock /></div>
                <div className="metric-details">
                  <h4>Em Rascunho</h4>
                  <div className="metric-value">{reportMetrics.rascunhos}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Não finalizadas</span>
                </div>
              </div>
            </div>

            {/* PAINEL DE GRÁFICOS VISUAIS E INTERATIVOS */}
            <div className="chart-card" style={{ marginBottom: '1.75rem' }}>
              <div className="chart-header" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3>📊 Gráficos & Visualizações Estatísticas</h3>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <button 
                    type="button"
                    className={`btn ${(reportActiveChartTab === 'nature' || reportActiveChartTab === 'dimensions') ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '0.78rem', padding: '0.3rem 0.65rem' }}
                    onClick={() => setReportActiveChartTab('dimensions')}
                  >
                    ⚖️ Distribuição por Dimensão
                  </button>
                  <button 
                    type="button"
                    className={`btn ${reportActiveChartTab === 'feelings' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '0.78rem', padding: '0.3rem 0.65rem' }}
                    onClick={() => setReportActiveChartTab('feelings')}
                  >
                    💬 Sentimentos (CNV)
                  </button>
                  <button 
                    type="button"
                    className={`btn ${reportActiveChartTab === 'sex' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '0.78rem', padding: '0.3rem 0.65rem' }}
                    onClick={() => setReportActiveChartTab('sex')}
                  >
                    👥 Perfil por Sexo
                  </button>
                  <button 
                    type="button"
                    className={`btn ${reportActiveChartTab === 'turns' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '0.78rem', padding: '0.3rem 0.65rem' }}
                    onClick={() => setReportActiveChartTab('turns')}
                  >
                    ☀️ Turnos
                  </button>
                  <button 
                    type="button"
                    className={`btn ${reportActiveChartTab === 'classes' ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ fontSize: '0.78rem', padding: '0.3rem 0.65rem' }}
                    onClick={() => setReportActiveChartTab('classes')}
                  >
                    🏫 Turmas & Ciclos
                  </button>
                  {(user.role === 'gestor' || user.role === 'seduc' || user.role === 'superadmin') && (
                    <button 
                      type="button"
                      className={`btn ${reportActiveChartTab === 'schools' ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ fontSize: '0.78rem', padding: '0.3rem 0.65rem' }}
                      onClick={() => setReportActiveChartTab('schools')}
                    >
                      🌐 Ranking por Escola
                    </button>
                  )}
                </div>
              </div>

              {/* GRÁFICO 1: DISTRIBUIÇÃO PELAS 8 DIMENSÕES OFICIAIS */}
              {(reportActiveChartTab === 'nature' || reportActiveChartTab === 'dimensions') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {(() => {
                    const dims = getDimensionsDistributionReport(reportFilteredOccurrences);
                    const totalOccs = reportFilteredOccurrences.length || 1;
                    
                    // Build gradient string for donut
                    let accumPct = 0;
                    const segments = dims.map(d => {
                      const start = accumPct;
                      const end = accumPct + d.pct;
                      accumPct = end;
                      return `${d.color} ${start}% ${end}%`;
                    });
                    const donutGradient = segments.length > 0 && dims.some(d => d.count > 0)
                      ? `conic-gradient(${segments.join(', ')})`
                      : 'conic-gradient(#e2e8f0 0% 100%)';

                    return (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          {dims.map(d => (
                            <div key={d.dimName} className="chart-bar-row">
                              <div className="chart-bar-info" style={{ marginBottom: '2px' }}>
                                <span style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span>{d.icone}</span>
                                  <span>{d.shortName}</span>
                                </span>
                                <strong style={{ fontSize: '0.84rem', color: d.color }}>{d.count} ({d.pct}%)</strong>
                              </div>
                              <div className="chart-bar-track" style={{ height: '8px' }}>
                                <div 
                                  className="chart-bar-fill" 
                                  style={{ 
                                    width: `${d.pct}%`, 
                                    backgroundColor: d.color,
                                    borderRadius: '4px'
                                  }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Donut Indicador e Legenda Consolidada */}
                        <div className="chart-donut-container" style={{ backgroundColor: 'var(--bg-app)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                          <div 
                            className="chart-donut-circle" 
                            style={{ background: donutGradient }}
                          >
                            <div className="chart-donut-inner">
                              <span>{reportFilteredOccurrences.length}</span>
                              <span style={{ fontSize: '0.65rem', fontWeight: '600', color: 'var(--text-secondary)' }}>TOTAL</span>
                            </div>
                          </div>

                          <div className="chart-legend" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.35rem 0.75rem', marginTop: '1rem' }}>
                            {dims.map(d => (
                              <div key={d.dimName} className="chart-legend-item" style={{ fontSize: '0.74rem' }}>
                                <div className="chart-legend-color" style={{ backgroundColor: d.color, width: '10px', height: '10px', borderRadius: '2px' }}></div>
                                <span title={d.dimName} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {d.numero}. {d.shortName.split('.')[1] || d.shortName}: <strong>{d.count}</strong>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* GRÁFICO 2: SENTIMENTOS IDENTIFICADOS NA ESCUTA CNV */}
              {reportActiveChartTab === 'feelings' && (
                <div>
                  {getSentimentosReport(reportFilteredOccurrences).length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '1.5rem' }}>
                      Nenhum sentimento registrado para o filtro selecionado.
                    </p>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                      {getSentimentosReport(reportFilteredOccurrences).map((s, idx) => {
                        const totalSentimentos = getSentimentosReport(reportFilteredOccurrences).reduce((acc, cur) => acc + cur.count, 0) || 1;
                        const pct = Math.round((s.count / totalSentimentos) * 100);
                        const colors = ['#f59e0b', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];
                        const itemColor = colors[idx % colors.length];
                        return (
                          <div key={s.feeling} style={{ backgroundColor: 'var(--bg-app)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', fontSize: '0.85rem' }}>
                              <strong>💬 {s.feeling}</strong>
                              <span style={{ fontWeight: '700', color: itemColor }}>{s.count} vezes ({pct}%)</span>
                            </div>
                            <div className="chart-bar-track">
                              <div className="chart-bar-fill" style={{ width: `${pct}%`, backgroundColor: itemColor }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* GRÁFICO 3: DISTRIBUIÇÃO POR SEXO / GÊNERO */}
              {reportActiveChartTab === 'sex' && (
                <div>
                  {(() => {
                    const sexData = getSexDistributionReport(reportFilteredOccurrences);
                    return (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <div className="chart-bar-row">
                            <div className="chart-bar-info">
                              <span style={{ fontWeight: '600', color: '#2563eb' }}>👨 Masculino</span>
                              <strong>{sexData.masc} estudantes ({sexData.mascPct}%)</strong>
                            </div>
                            <div className="chart-bar-track">
                              <div className="chart-bar-fill" style={{ width: `${sexData.mascPct}%`, backgroundColor: '#3b82f6', backgroundImage: 'linear-gradient(90deg, #3b82f6, #60a5fa)' }}></div>
                            </div>
                          </div>

                          <div className="chart-bar-row">
                            <div className="chart-bar-info">
                              <span style={{ fontWeight: '600', color: '#db2777' }}>👩 Feminino</span>
                              <strong>{sexData.fem} estudantes ({sexData.femPct}%)</strong>
                            </div>
                            <div className="chart-bar-track">
                              <div className="chart-bar-fill" style={{ width: `${sexData.femPct}%`, backgroundColor: '#ec4899', backgroundImage: 'linear-gradient(90deg, #ec4899, #f472b6)' }}></div>
                            </div>
                          </div>

                          {sexData.outro > 0 && (
                            <div className="chart-bar-row">
                              <div className="chart-bar-info">
                                <span style={{ fontWeight: '600', color: '#6b7280' }}>🧑 Outro / Não Informado</span>
                                <strong>{sexData.outro} estudantes ({sexData.outroPct}%)</strong>
                              </div>
                              <div className="chart-bar-track">
                                <div className="chart-bar-fill" style={{ width: `${sexData.outroPct}%`, backgroundColor: '#9ca3af' }}></div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Donut de Sexo */}
                        <div className="chart-donut-container" style={{ backgroundColor: 'var(--bg-app)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                          <div 
                            className="chart-donut-circle" 
                            style={{ 
                              background: `conic-gradient(#3b82f6 0% ${sexData.mascPct}%, #ec4899 ${sexData.mascPct}% ${sexData.mascPct + sexData.femPct}%, #9ca3af ${sexData.mascPct + sexData.femPct}% 100%)` 
                            }}
                          >
                            <div className="chart-donut-inner">
                              <span>{sexData.total}</span>
                              <span style={{ fontSize: '0.65rem', fontWeight: '600', color: 'var(--text-secondary)' }}>ESTUDANTES</span>
                            </div>
                          </div>

                          <div className="chart-legend">
                            <div className="chart-legend-item">
                              <div className="chart-legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
                              <span>Masculino: <strong>{sexData.masc} ({sexData.mascPct}%)</strong></span>
                            </div>
                            <div className="chart-legend-item">
                              <div className="chart-legend-color" style={{ backgroundColor: '#ec4899' }}></div>
                              <span>Feminino: <strong>{sexData.fem} ({sexData.femPct}%)</strong></span>
                            </div>
                            {sexData.outro > 0 && (
                              <div className="chart-legend-item">
                                <div className="chart-legend-color" style={{ backgroundColor: '#9ca3af' }}></div>
                                <span>Outro/Não Inf: <strong>{sexData.outro} ({sexData.outroPct}%)</strong></span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* GRÁFICO 4: DISTRIBUIÇÃO POR TURNO */}
              {reportActiveChartTab === 'turns' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {getTurnsDistributionReport(reportFilteredOccurrences).map(turn => {
                    const icon = turn.name === 'Manhã' ? '☀️' : turn.name === 'Tarde' ? '🌤️' : turn.name === 'Noite' ? '🌙' : '⏱️';
                    return (
                      <div key={turn.name} style={{ backgroundColor: 'var(--bg-app)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{icon} {turn.name}</span>
                          <span className="badge badge-primary">{turn.count} casos</span>
                        </div>
                        <div className="chart-bar-track" style={{ height: '8px' }}>
                          <div className="chart-bar-fill" style={{ width: `${turn.pct}%`, backgroundColor: 'var(--primary)' }}></div>
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>{turn.pct}% do total filtrado</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* GRÁFICO 5: TURMAS E CICLOS */}
              {reportActiveChartTab === 'classes' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {getTurmasReport(reportFilteredOccurrences).slice(0, 8).map(turma => {
                    const maxCount = getTurmasReport(reportFilteredOccurrences)[0]?.count || 1;
                    const pct = Math.round((turma.count / maxCount) * 100);
                    return (
                      <div key={turma.className} className="chart-bar-row" style={{ backgroundColor: 'var(--bg-app)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                        <div className="chart-bar-info">
                          <span style={{ fontWeight: '700', fontSize: '0.875rem' }}>🏫 {turma.className}</span>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>{turma.comVisto} com visto</span>
                            {turma.semVisto > 0 && <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>{turma.semVisto} pendentes</span>}
                            <strong style={{ minWidth: '28px', textAlign: 'right' }}>{turma.count}</strong>
                          </div>
                        </div>
                        <div className="chart-bar-track" style={{ height: '8px', marginTop: '0.35rem' }}>
                          <div className="chart-bar-fill" style={{ width: `${pct}%`, backgroundColor: 'var(--primary)' }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* GRÁFICO 6: RANKING POR ESCOLA (GESTOR / SEDUC / SUPER ADMIN) */}
              {reportActiveChartTab === 'schools' && (user.role === 'gestor' || user.role === 'seduc' || user.role === 'superadmin') && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {getEscolasReport(reportFilteredOccurrences).map(escola => {
                    const maxTotal = getEscolasReport(reportFilteredOccurrences)[0]?.total || 1;
                    const pct = Math.round((escola.total / maxTotal) * 100);
                    return (
                      <div key={escola.id} style={{ backgroundColor: 'var(--bg-app)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                          <div>
                            <strong style={{ fontSize: '0.9rem' }}>{escola.name}</strong>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
                              ({escola.comVisto} com visto | {escola.semVisto} sem visto | {escola.riscos} casos de risco)
                            </span>
                          </div>
                          <span className="badge badge-primary" style={{ fontSize: '0.8rem', padding: '0.3rem 0.6rem' }}>
                            {escola.total} ocorrências
                          </span>
                        </div>
                        <div className="chart-bar-track">
                          <div className="chart-bar-fill" style={{ width: `${pct}%`, backgroundColor: '#3b82f6', backgroundImage: 'linear-gradient(90deg, #3b82f6, #10b981)' }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* TABELA 1: ACOMPANHAMENTO ANALÍTICO POR TURMA & CICLO */}
            <div className="card" style={{ marginBottom: '1.75rem' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>🏫 Detalhamento Analítico por Turma & Ciclo</h3>
                <span className="badge badge-secondary">{getTurmasReport(reportFilteredOccurrences).length} turmas mapeadas</span>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Turma / Ciclo</th>
                        <th>Total Ocorrências</th>
                        {(user.role === 'pedagogo' || user.role === 'assistente') && <th>Cadastrados por Mim</th>}
                        <th>Estudantes Atendidos</th>
                        <th>Visto Obrigatório</th>
                        <th>Com Visto Diretoria</th>
                        <th>Taxa de Homologação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getTurmasReport(reportFilteredOccurrences).map(t => {
                        const taxa = t.count > 0 ? Math.round((t.comVisto / t.count) * 100) : 0;
                        return (
                          <tr key={t.className}>
                            <td style={{ fontWeight: '700' }}>{t.className}</td>
                            <td><span className="badge badge-primary">{t.count}</span></td>
                            {(user.role === 'pedagogo' || user.role === 'assistente') && (
                              <td><span className="badge badge-secondary" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: '700' }}>{t.myCount}</span></td>
                            )}
                            <td>{t.studentsCount}</td>
                            <td>{t.vistoObrigatorio > 0 ? <span className="badge badge-warning" style={{ backgroundColor: '#fef3c7', color: '#92400e', fontWeight: '700' }}>{t.vistoObrigatorio}</span> : '0'}</td>
                            <td><span className="badge badge-success">{t.comVisto}</span></td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ flex: 1, backgroundColor: 'var(--bg-app)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                                  <div style={{ width: `${taxa}%`, backgroundColor: taxa === 100 ? 'var(--success)' : taxa >= 50 ? 'var(--accent-orange)' : 'var(--danger)', height: '100%' }}></div>
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

            {/* GRID 2 COLUNAS: CONFLITOS POR DISCIPLINA & REDE DE PROTEÇÃO */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
              {/* Disciplinas & Docentes */}
              <div className="card">
                <div className="card-header">
                  <h3>📚 Ocorrências por Componente Curricular / Docente</h3>
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
                        {getDisciplinasReport(reportFilteredOccurrences).length === 0 ? (
                          <tr><td colSpan="2" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Nenhum dado encontrado</td></tr>
                        ) : (
                          getDisciplinasReport(reportFilteredOccurrences).map(d => (
                            <tr key={d.key}>
                              <td><strong>{d.subject}</strong> <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>({d.teacher})</span></td>
                              <td style={{ textAlign: 'right', fontWeight: '700' }}><span className="badge badge-primary">{d.count}</span></td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Rede de Proteção */}
              <div className="card">
                <div className="card-header">
                  <h3>🛡️ Encaminhamentos a Órgãos da Rede de Proteção</h3>
                </div>
                <div className="card-body">
                  {getEncaminhamentosReport(reportFilteredOccurrences).length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Nenhum encaminhamento oficial para órgãos externos no filtro atual.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {getEncaminhamentosReport(reportFilteredOccurrences).map(e => (
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

            {/* TABELA COMPARATIVA DE ESCOLAS (GESTOR / SEDUC / SUPER ADMIN) */}
            {(user.role === 'gestor' || user.role === 'seduc' || user.role === 'superadmin') && (
              <div className="card" style={{ marginBottom: '1.75rem' }}>
                <div className="card-header">
                  <h3>🏫 Quadro Comparativo Consolidado por Unidade Escolar</h3>
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
                        {getEscolasReport(reportFilteredOccurrences).map(escola => (
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
            )}

            {/* LISTA COMPLETA DAS OCORRÊNCIAS FILTRADAS */}
            <div className="card">
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>📋 Ocorrências Filtradas ({reportFilteredOccurrences.length})</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Clique em Detalhes para emitir visto ou imprimir folha A4</span>
              </div>
              <div className="card-body" style={{ padding: 0 }}>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ width: '75px' }}>Data</th>
                        <th style={{ minWidth: '140px' }}>Estudante(s)</th>
                        <th style={{ minWidth: '120px' }}>Escola / Turma</th>
                        <th style={{ minWidth: '110px' }}>Classificação</th>
                        <th style={{ minWidth: '100px' }}>Sentimentos</th>
                        <th style={{ width: '110px' }}>Status</th>
                        <th style={{ textAlign: 'right', width: '80px' }}>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportFilteredOccurrences.length === 0 ? (
                        <tr>
                          <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                            Nenhum registro encontrado para os filtros selecionados. Tente ajustar os parâmetros de busca acima.
                          </td>
                        </tr>
                      ) : (
                        reportFilteredOccurrences.map(o => {
                          const studentsList = Array.isArray(o.students) && o.students.length > 0 ? o.students : [];
                          const studentNames = (studentsList.length > 0 
                            ? studentsList.map(s => anonymizeText(s.studentName, anonymizeView)).join(', ') 
                            : anonymizeText(o.studentName, anonymizeView)) || 'Não informado';
                          const className = (studentsList.length > 0 ? `${studentsList[0].gradeCycle || ''} ${studentsList[0].className || ''}` : `${o.gradeCycle || ''} ${o.className || ''}`).trim();
                          const schoolName = schools.find(s => s.id === o.schoolId)?.name || 'Rede Geral';
                          const classifications = Array.isArray(o.classifications) && o.classifications.length > 0 ? o.classifications : [o.type || 'Geral'];

                          return (
                            <tr key={o.id}>
                              <td style={{ fontSize: '0.78rem', whiteSpace: 'nowrap' }}>{formatDisplayDate(o.date)}</td>
                              <td style={{ fontWeight: '700', color: 'var(--text-primary)', wordBreak: 'break-word', fontSize: '0.82rem', lineHeight: '1.3' }}>
                                {studentNames}
                              </td>
                              <td style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                                <div style={{ fontWeight: '500' }}>{schoolName}</div>
                                <span style={{ color: 'var(--text-muted)' }}>{className}</span>
                              </td>
                              <td>
                                <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
                                  {classifications.map((c, i) => (
                                    <span key={i} className="table-classification-badge" title={c}>{c}</span>
                                  ))}
                                </div>
                              </td>
                              <td>
                                {Array.isArray(o.feelings) && o.feelings.length > 0 ? (
                                  <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
                                    {o.feelings.map((f, i) => (
                                      <span key={i} className="badge badge-warning" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>{f}</span>
                                    ))}
                                  </div>
                                ) : (
                                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>-</span>
                                )}
                              </td>
                              <td>
                                {(() => {
                                  const st = getOccurrenceStatus(o);
                                  return (
                                    <span className={st.badgeClass} style={st.style}>
                                      {st.icon}
                                      <span>{st.label}</span>
                                    </span>
                                  );
                                })()}
                              </td>
                              <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                <div style={{ display: 'inline-flex', gap: '4px', justifyContent: 'flex-end' }}>
                                  <button
                                    className="action-icon-btn action-icon-view"
                                    data-tooltip="Ver detalhes completos do atendimento"
                                    data-tooltip-pos="left"
                                    onClick={() => {
                                      setSelectedOccurrence(o);
                                      setDirectorNotes(o.directorNotes || '');
                                      setShowDetailModal(true);
                                    }}
                                    title="Ver detalhes completos do atendimento"
                                  >
                                    <IconEye style={{ width: '14px', height: '14px' }} />
                                  </button>
                                  <button
                                    className="action-icon-btn action-icon-print"
                                    data-tooltip="Imprimir Ficha Oficial A4"
                                    data-tooltip-pos="left"
                                    onClick={() => handlePrint(o)}
                                    title="Imprimir Ficha Oficial A4"
                                  >
                                    <IconPrinter style={{ width: '14px', height: '14px' }} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ----------------- TAB: ADMINISTRAÇÃO DO SISTEMA (SUPER ADMIN / GESTÃO SEDUC) ----------------- */}
        {activeTab === 'sysadmin' && (user.role === 'superadmin' || user.role === 'seduc' || user.role === 'gestor' || impersonatedOriginalUser) && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2>⚡ Painel de Administração & Backups do Sistema</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  Gestão Master e SEDUC | Telemetria, auditoria em tempo real, impersonação de contas e backups da rede
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
                              <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                {isSelf ? (
                                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Você está aqui</span>
                                ) : (
                                  <button
                                    type="button"
                                    className="action-icon-btn action-icon-restore"
                                    data-tooltip="Auditar e acessar sistema como este usuário"
                                    data-tooltip-pos="left"
                                    title="Entrar como este usuário"
                                    onClick={() => handleImpersonate(u)}
                                  >
                                    <IconUser style={{ width: '14px', height: '14px' }} />
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
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                  <label 
                    className="btn btn-secondary" 
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', cursor: 'pointer', margin: 0 }}
                    title="Restaurar base de dados do Supabase enviando um arquivo .json salvo no seu computador"
                  >
                    <IconFolder /> Restaurar de Arquivo (.json)
                    <input 
                      type="file" 
                      accept=".json" 
                      onChange={handleRestoreFromFile} 
                      style={{ display: 'none' }} 
                    />
                  </label>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => handleCreateBackup('manual')}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
                    title="Gerar e baixar backup completo da base de dados do Supabase"
                  >
                    <IconDownload /> Fazer & Baixar Backup (.json)
                  </button>
                </div>
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
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                              <div style={{ display: 'inline-flex', gap: '6px', justifyContent: 'flex-end' }}>
                                <a
                                  href={`/api/admin/backups/${b.filename}`}
                                  download={b.filename}
                                  className="action-icon-btn action-icon-view"
                                  data-tooltip="Baixar arquivo JSON de backup"
                                  data-tooltip-pos="left"
                                  title="Baixar arquivo JSON de backup"
                                  style={{ textDecoration: 'none' }}
                                >
                                  <IconDownload style={{ width: '14px', height: '14px' }} />
                                </a>
                                <button
                                  type="button"
                                  className="action-icon-btn action-icon-restore"
                                  data-tooltip="Restaurar base de dados a partir deste snapshot"
                                  data-tooltip-pos="left"
                                  title="Restaurar base de dados a partir deste snapshot"
                                  onClick={() => handleRestoreBackup(b.filename)}
                                >
                                  <IconRefresh style={{ width: '14px', height: '14px' }} />
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h3 style={{ margin: 0 }}>Detalhes do Atendimento</h3>
                {(() => {
                  const st = getOccurrenceStatus(selectedOccurrence);
                  return <span className={`badge ${st.badgeClass}`} style={st.style}>{st.label}</span>;
                })()}
              </div>
              <button className="btn btn-secondary" onClick={() => { setShowDetailModal(false); setSelectedOccurrence(null); }}>
                ✕
              </button>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', maxHeight: '80vh' }}>
              
              {/* Alerta Informativo de Visto Direção vs Atendimento Rotineiro */}
              {(() => {
                const hasDirectionRef = Array.isArray(selectedOccurrence.direction_referrals) && selectedOccurrence.direction_referrals.length > 0;
                const hasVisto = Boolean(selectedOccurrence.directorNotes && selectedOccurrence.directorNotes.trim());

                if (hasVisto) {
                  return (
                    <div style={{ backgroundColor: '#dcfce7', border: '1px solid #22c55e', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#15803d' }}>
                      <span style={{ fontSize: '1.25rem' }}>✅</span>
                      <span><strong>Visto Confirmado pela Direção:</strong> Atendimento formalmente validado e acompanhado pela equipe gestora escolar.</span>
                    </div>
                  );
                } else if (hasDirectionRef) {
                  return (
                    <div style={{ backgroundColor: '#fffbeb', border: '1px solid #f59e0b', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#92400e' }}>
                      <span style={{ fontSize: '1.25rem' }}>⚠️</span>
                      <span><strong>Visto Obrigatório da Direção:</strong> Este atendimento possui encaminhamento para a Direção / Rede de Proteção e requer o visto formal da equipe gestora.</span>
                    </div>
                  );
                } else {
                  return (
                    <div style={{ backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '0.65rem 0.85rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                      <span>ℹ️</span>
                      <span>Atendimento rotineiro registrado. Não requer visto obrigatório da direção escolar.</span>
                    </div>
                  );
                }
              })()}

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
                    <p><strong>{anonymizeText(st.studentName, anonymizeView)}</strong> • {st.sex || 'Não informado'} • Turno: {st.turn || 'Não informado'}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
                      {st.gradeCycle} - {st.className} | Prof: {anonymizeText(st.teacherName, anonymizeView)} ({st.subject_matter || 'Não informada'})
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
                      Responsável: {anonymizeText(st.guardian?.name, anonymizeView)} ({st.guardian?.bond || 'Responsável'}) - Contato: {anonymizeView ? '(XX) XXXXX-XXXX' : (st.guardian?.contact || 'Não informado')}
                    </p>
                  </div>
                ))}
              </div>

              <p><strong>Data da Ocorrência:</strong> {formatDisplayDate(selectedOccurrence.date)}</p>
              
              {/* Classificações */}
              <div>
                <strong>Classificações:</strong>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                  {(Array.isArray(selectedOccurrence.classifications) ? selectedOccurrence.classifications : [selectedOccurrence.type]).filter(Boolean).map(c => (
                    <span key={c} className="badge badge-primary">
                      {c === 'Outra' && selectedOccurrence.customOtherClassification ? `Outra: ${selectedOccurrence.customOtherClassification}` : c}
                    </span>
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
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', backgroundColor: 'var(--bg-app)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    Observações da Diretoria (Visto / Acompanhamento)
                  </strong>
                  {Boolean(selectedOccurrence.directorNotes && selectedOccurrence.directorNotes.trim()) && (
                    <span className="badge badge-success" style={{ backgroundColor: '#dcfce7', color: '#15803d', border: '1px solid #86efac', fontSize: '0.75rem' }}>
                      <IconCheckCircle style={{ width: '12px', height: '12px', display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} />
                      Visto Confirmado
                    </span>
                  )}
                </div>
                
                {(user.role === 'diretor' || user.role === 'gestor' || user.role === 'seduc' || user.role === 'superadmin') ? (
                  selectedOccurrence.status === 'rascunho' ? (
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontStyle: 'italic', fontSize: '0.875rem' }}>
                      Esta ocorrência está em modo de Rascunho. Aguarde a finalização pelo pedagogo para registrar o visto da diretoria.
                    </p>
                  ) : (
                    <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {Boolean(selectedOccurrence.directorNotes && selectedOccurrence.directorNotes.trim()) && (
                        <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '0.65rem 0.85rem', fontSize: '0.84rem', color: '#166534' }}>
                          <div style={{ fontWeight: '700', marginBottom: '2px' }}>Parecer Atual da Diretoria:</div>
                          <div style={{ whiteSpace: 'pre-wrap' }}>{selectedOccurrence.directorNotes}</div>
                        </div>
                      )}
                      <textarea
                        className="form-textarea"
                        placeholder="Escreva aqui observações do diretor, visto ou plano de acompanhamento..."
                        value={directorNotes}
                        onChange={(e) => setDirectorNotes(e.target.value)}
                        rows={3}
                      />
                      <button 
                        className="btn btn-primary" 
                        onClick={handleSaveDirectorNotes}
                        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: '600' }}
                      >
                        <IconCheckCircle style={{ width: '16px', height: '16px' }} />
                        {selectedOccurrence.directorNotes ? 'Atualizar Visto / Parecer da Diretoria' : 'Confirmar Visto da Diretoria'}
                      </button>
                    </div>
                  )
                ) : (
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.35rem', fontStyle: selectedOccurrence.directorNotes ? 'normal' : 'italic', fontSize: '0.85rem' }}>
                    {selectedOccurrence.directorNotes || 'Nenhuma observação cadastrada pela diretoria ainda.'}
                  </p>
                )}
              </div>

              {/* RASTREABILIDADE & AUDITORIA */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>🛡️</span>
                  <span>Rastreabilidade & Auditoria</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem', backgroundColor: 'var(--bg-app)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div>
                    <span style={{ color: 'var(--text-secondary)' }}>Criado por: </span>
                    <strong>{anonymizeText(selectedOccurrence.createdByName || 'Usuário do Sistema', anonymizeView)}</strong>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {formatDisplayDateTime(selectedOccurrence.createdAt || selectedOccurrence.date)}
                    </div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-secondary)' }}>Última alteração: </span>
                    <strong>{selectedOccurrence.updatedByName ? anonymizeText(selectedOccurrence.updatedByName, anonymizeView) : 'Sem edições'}</strong>
                    <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {selectedOccurrence.updatedAt ? formatDisplayDateTime(selectedOccurrence.updatedAt) : '-'}
                    </div>
                  </div>
                </div>

                {Array.isArray(selectedOccurrence.editHistory) && selectedOccurrence.editHistory.length > 0 && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    <details>
                      <summary style={{ cursor: 'pointer', fontWeight: '600', color: 'var(--primary)' }}>
                        📜 Ver histórico completo de ações ({selectedOccurrence.editHistory.length})
                      </summary>
                      <div style={{ marginTop: '0.35rem', display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '0.5rem', borderLeft: '2px solid var(--border-color)' }}>
                        {selectedOccurrence.editHistory.map((h, hIdx) => (
                          <div key={hIdx}>
                            • <strong>{formatDisplayDateTime(h.timestamp)}</strong>: {h.action} por {anonymizeText(h.userName, anonymizeView)}
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer with Actions */}
            <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', padding: '0.75rem 1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-tooltip="Gerar e imprimir ficha de atendimento oficial (A4)"
                  title="Imprimir Ficha A4"
                  style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  onClick={() => handlePrint(selectedOccurrence)}
                >
                  <IconPrinter style={{ width: '15px', height: '15px' }} /> Imprimir Ficha A4
                </button>
                {(user.role === 'gestor' || 
                  user.role === 'seduc' || 
                  user.role === 'superadmin' || 
                  user.role === 'diretor' || 
                  ((user.role === 'pedagogo' || user.role === 'assistente') && (selectedOccurrence.createdById === user.id || !selectedOccurrence.createdById) && !selectedOccurrence.directorNotes)) && (
                  <>
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-tooltip="Editar informações e classificação deste atendimento"
                      title="Editar Atendimento"
                      style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem', backgroundColor: 'var(--accent-orange)', color: 'white', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      onClick={() => {
                        const occToEdit = { ...selectedOccurrence };
                        setShowDetailModal(false);
                        setSelectedOccurrence(null);
                        handleEditOccurrence(occToEdit);
                      }}
                    >
                      <IconEdit style={{ width: '15px', height: '15px' }} /> Alterar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-tooltip="Excluir permanentemente esta ocorrência"
                      title="Excluir Atendimento"
                      style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem', backgroundColor: 'var(--danger)', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      onClick={() => handleDeleteOccurrence(selectedOccurrence.id)}
                    >
                      <IconTrash style={{ width: '15px', height: '15px' }} /> Excluir
                    </button>
                  </>
                )}
              </div>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={() => { setShowDetailModal(false); setSelectedOccurrence(null); }}
                style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}
              >
                Fechar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ----------------- TEMPLATE DE IMPRESSÃO A4: FICHA DE ATENDIMENTO ----------------- */}
      {printMode === 'occurrence' && (printOccurrence || selectedOccurrence) && (() => {
        const occ = printOccurrence || selectedOccurrence;
        return (
          <div className="printable-report">
            {occ.status === 'rascunho' && (
              <div className="print-watermark">Rascunho</div>
            )}
            <div className="print-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div className="print-school-name">
                  {schools.find(s => s.id === occ.schoolId)?.name || (user.schoolName || 'REDE MUNICIPAL DE ENSINO')}
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
                      <th style={{ textAlign: 'left', fontSize: '8.5pt', padding: '2px' }}>Sexo / Turno</th>
                      <th style={{ textAlign: 'left', fontSize: '8.5pt', padding: '2px' }}>Ano / Turma</th>
                      <th style={{ textAlign: 'left', fontSize: '8.5pt', padding: '2px' }}>Professora / Disciplina</th>
                      <th style={{ textAlign: 'left', fontSize: '8.5pt', padding: '2px' }}>Responsável / Contato</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(Array.isArray(occ.students) && occ.students.length > 0 ? occ.students : [
                      {
                        studentName: occ.studentName,
                        sex: occ.sex || 'Não inf.',
                        turn: occ.turn || 'Não inf.',
                        gradeCycle: occ.gradeCycle,
                        className: occ.className,
                        teacherName: occ.teacherName,
                        subject_matter: occ.subject_matter,
                        guardian: {
                          name: occ.guardianName || 'Não informado',
                          bond: 'Responsável',
                          contact: occ.contacts || 'Não informado'
                        }
                      }
                    ]).map((st, i) => (
                      <tr key={i} style={{ borderBottom: '1px dashed #ddd' }}>
                        <td style={{ fontSize: '8.5pt', padding: '3px 2px', fontWeight: 'bold' }}>{anonymizeText(st.studentName, anonymizeView)}</td>
                        <td style={{ fontSize: '8.5pt', padding: '3px 2px' }}>{st.sex} / {st.turn}</td>
                        <td style={{ fontSize: '8.5pt', padding: '3px 2px' }}>{st.gradeCycle} - {st.className}</td>
                        <td style={{ fontSize: '8.5pt', padding: '3px 2px' }}>
                          <strong>{anonymizeText(st.teacherName || occ.teacherName || 'Não informada', anonymizeView)}</strong>
                          <span style={{ display: 'block', fontSize: '7.5pt', color: '#333' }}>
                            ({st.subject_matter === 'Outro' ? (st.customSubject || 'Outro') : (st.subject_matter || occ.subject_matter || 'Não informada')})
                          </span>
                        </td>
                        <td style={{ fontSize: '8.5pt', padding: '3px 2px' }}>
                          {anonymizeText(st.guardian?.name, anonymizeView)} ({st.guardian?.bond || 'Resp.'}) - {anonymizeView ? '(XX) XXXXX-XXXX' : st.guardian?.contact}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="print-field col-6">
                <span className="print-field-label">Data da Ocorrência:</span> {formatDisplayDate(occ.date)}
              </div>
              <div className="print-field col-6">
                <span className="print-field-label">Classificação(ões):</span> {(Array.isArray(occ.classifications) ? occ.classifications : [occ.type]).filter(Boolean).map(c => c === 'Outra' && occ.customOtherClassification ? `Outra (${occ.customOtherClassification})` : c).join(', ')}
              </div>

              {Array.isArray(occ.feelings) && occ.feelings.length > 0 && (
                <div className="print-field col-12" style={{ gridColumn: 'span 12' }}>
                  <span className="print-field-label">Sentimentos Identificados (CNV):</span> {occ.feelings.join(', ')}
                  {occ.feelings_observations && ` — "${occ.feelings_observations}"`}
                </div>
              )}
            </div>

            <div className="print-section">
              <div className="print-section-title">ASSUNTO (RELATO DO OCORRIDO)</div>
              <div className="print-section-content">{occ.subject}</div>
            </div>

            <div className="print-section">
              <div className="print-section-title">ENCAMINHAMENTOS E AÇÕES TOMADAS</div>
              <div className="print-section-content">{occ.referrals}</div>
            </div>

            {Array.isArray(occ.direction_referrals) && occ.direction_referrals.length > 0 && (
              <div className="print-section">
                <div className="print-section-title">ENCAMINHAMENTO DIREÇÃO / REDE DE PROTEÇÃO</div>
                <div className="print-section-content">{occ.direction_referrals.join(', ')}</div>
              </div>
            )}

            {occ.observations && (
              <div className="print-section">
                <div className="print-section-title">OBSERVAÇÕES PEDAGÓGICAS ADICIONAIS</div>
                <div className="print-section-content">{occ.observations}</div>
              </div>
            )}

            {occ.directorNotes && (
              <div className="print-section">
                <div className="print-section-title">ACOMPANHAMENTO / VISTO DA DIRETORIA</div>
                <div className="print-section-content">{occ.directorNotes}</div>
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
        );
      })()}

      {/* ----------------- TEMPLATE DE IMPRESSÃO A4: RELATÓRIO ANALÍTICO EXECUTIVO ----------------- */}
      {printMode === 'executive' && (
        <div className="printable-executive-report">
          <div className="print-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '12px' }}>
            <div style={{ flex: 1 }}>
              <div className="print-school-name" style={{ fontSize: '13pt', fontWeight: 'bold' }}>
                {reportFilterSchool ? (schools.find(s => s.id === reportFilterSchool)?.name || 'ESCOLA MUNICIPAL') : (user.schoolName || 'REDE MUNICIPAL DE ENSINO DE CONTAGEM')}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', margin: '2px 0', lineHeight: '1.1' }}>
                <span style={{ fontSize: '10pt', fontWeight: 'bold', letterSpacing: '0.05em', color: '#1c355e' }}>POME — PLATAFORMA DE CLIMA ESCOLAR</span>
                <span style={{ fontSize: '7.5pt', fontWeight: 'bold', color: '#246949' }}>SECRETARIA MUNICIPAL DE EDUCAÇÃO (SEDUC)</span>
              </div>
              <div className="print-doc-title" style={{ fontSize: '13pt', fontWeight: 'bold', marginTop: '3px' }}>
                {user.role === 'diretor' ? 'RELATÓRIO DE GESTÃO ESCOLAR E CLIMA INSTITUCIONAL' :
                 (user.role === 'gestor' || user.role === 'seduc' || user.role === 'superadmin') ? 'RELATÓRIO CONSOLIDADO DE CLIMA ESCOLAR' :
                 'RELATÓRIO PEDAGÓGICO DE ATENDIMENTOS'}
              </div>
            </div>
            <Logo style={{ height: '50px', width: 'auto' }} />
          </div>

          {/* Metadados da Emissão */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8pt', borderBottom: '1px solid #ddd', paddingBottom: '4px', marginBottom: '10px' }}>
            <div><strong>Emissão:</strong> {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
            <div><strong>Responsável pela Extração:</strong> {user.name} ({user.role?.toUpperCase()})</div>
            <div><strong>Total de Registros:</strong> {reportFilteredOccurrences.length} ocorrência(s)</div>
          </div>

          {/* Filtros Aplicados */}
          <div style={{ backgroundColor: '#f8f9fa', padding: '5px 8px', borderRadius: '4px', marginBottom: '12px', fontSize: '8pt', border: '1px solid #ddd' }}>
            <strong>Filtros Ativos: </strong>
            <span>Escola: {reportFilterSchool ? (schools.find(s => s.id === reportFilterSchool)?.name || reportFilterSchool) : 'Todas'} | </span>
            <span>Período: {reportFilterDateStart || reportFilterDateEnd ? `${formatDisplayDate(reportFilterDateStart)} a ${formatDisplayDate(reportFilterDateEnd)}` : 'Todo o período'} | </span>
            <span>Sexo: {reportFilterSex || 'Todos'} | </span>
            <span>Turno: {reportFilterTurn || 'Todos'} | </span>
            <span>Ciclo: {reportFilterGrade || 'Todos'} | </span>
            <span>Dimensão: {reportFilterNature || 'Todas'} | </span>
            <span>Classificação: {reportFilterClassification || 'Todas'} | </span>
            <span>Sentimento: {reportFilterFeeling || 'Todos'} | </span>
            <span>Status: {reportFilterStatus === 'com_visto' ? 'Com Visto' : reportFilterStatus === 'sem_visto' ? 'Pendente de Visto' : reportFilterStatus === 'rascunho' ? 'Em Rascunho' : (reportFilterStatus || 'Todos')}</span>
          </div>

          {/* Indicadores Resumidos (KPIs) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', marginBottom: '12px' }}>
            <div style={{ border: '1px solid #333', padding: '5px', textAlign: 'center', borderRadius: '4px' }}>
              <div style={{ fontSize: '7pt', fontWeight: 'bold', textTransform: 'uppercase' }}>Atendimentos</div>
              <div style={{ fontSize: '13pt', fontWeight: 'bold', color: '#1c355e' }}>{reportFilteredOccurrences.length}</div>
            </div>
            <div style={{ border: '1px solid #333', padding: '5px', textAlign: 'center', borderRadius: '4px' }}>
              <div style={{ fontSize: '7pt', fontWeight: 'bold', textTransform: 'uppercase' }}>Com Visto</div>
              <div style={{ fontSize: '13pt', fontWeight: 'bold', color: '#2b8a3e' }}>{reportFilteredOccurrences.filter(o => o.directorNotes).length}</div>
            </div>
            <div style={{ border: '1px solid #333', padding: '5px', textAlign: 'center', borderRadius: '4px' }}>
              <div style={{ fontSize: '7pt', fontWeight: 'bold', textTransform: 'uppercase' }}>Visto Obrigatório</div>
              <div style={{ fontSize: '13pt', fontWeight: 'bold', color: '#e67700' }}>{reportFilteredOccurrences.filter(o => !o.directorNotes && o.status !== 'rascunho' && Array.isArray(o.direction_referrals) && o.direction_referrals.length > 0).length}</div>
            </div>
            <div style={{ border: '1px solid #333', padding: '5px', textAlign: 'center', borderRadius: '4px' }}>
              <div style={{ fontSize: '7pt', fontWeight: 'bold', textTransform: 'uppercase' }}>Risco à Vida/Saúde</div>
              <div style={{ fontSize: '13pt', fontWeight: 'bold', color: '#c92a2a' }}>{reportFilteredOccurrences.filter(o => occurrenceHasDimension(o, '7. Situações de risco à vida, à saúde e à segurança') || occurrenceHasDimension(o, '8. Violência sexual')).length}</div>
            </div>
            <div style={{ border: '1px solid #333', padding: '5px', textAlign: 'center', borderRadius: '4px' }}>
              <div style={{ fontSize: '7pt', fontWeight: 'bold', textTransform: 'uppercase' }}>Rascunhos</div>
              <div style={{ fontSize: '13pt', fontWeight: 'bold', color: '#495057' }}>{reportFilteredOccurrences.filter(o => o.status === 'rascunho').length}</div>
            </div>
          </div>

          {/* Distribuição por Classificação e Turno */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <div style={{ border: '1px solid #000', padding: '6px', borderRadius: '4px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '8.5pt', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '4px', textTransform: 'uppercase' }}>
                Classificações Principais
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '7.5pt' }}>
                <tbody>
                  {getClassificationReport(reportFilteredOccurrences).slice(0, 5).map(c => (
                    <tr key={c.name} style={{ borderBottom: '1px dashed #eee' }}>
                      <td style={{ padding: '2px 0' }}>{c.name}</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold', width: '35px' }}>{c.count}</td>
                      <td style={{ textAlign: 'right', color: '#666', width: '30px' }}>{c.pct}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ border: '1px solid #000', padding: '6px', borderRadius: '4px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '8.5pt', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '4px', textTransform: 'uppercase' }}>
                Distribuição por Turno
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '7.5pt' }}>
                <tbody>
                  {getTurnoReport(reportFilteredOccurrences).map(t => (
                    <tr key={t.name} style={{ borderBottom: '1px dashed #eee' }}>
                      <td style={{ padding: '2px 0' }}>{t.name}</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold', width: '35px' }}>{t.count}</td>
                      <td style={{ textAlign: 'right', color: '#666', width: '30px' }}>{t.pct}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Listagem Analítica de Ocorrências */}
          <div style={{ marginTop: '8px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '9pt', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '6px', textTransform: 'uppercase' }}>
              Listagem Analítica dos Atendimentos ({reportFilteredOccurrences.length})
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '7.5pt' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #000', backgroundColor: '#f0f0f0' }}>
                  <th style={{ textAlign: 'left', padding: '3px 2px' }}>Data</th>
                  <th style={{ textAlign: 'left', padding: '3px 2px' }}>Estudante(s)</th>
                  <th style={{ textAlign: 'left', padding: '3px 2px' }}>Ano / Turma</th>
                  <th style={{ textAlign: 'left', padding: '3px 2px' }}>Matéria / Docente</th>
                  <th style={{ textAlign: 'left', padding: '3px 2px' }}>Classificação</th>
                  <th style={{ textAlign: 'left', padding: '3px 2px' }}>Escola</th>
                  <th style={{ textAlign: 'center', padding: '3px 2px' }}>Visto</th>
                </tr>
              </thead>
              <tbody>
                {reportFilteredOccurrences.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '8px', color: '#666' }}>Nenhuma ocorrência encontrada para os filtros selecionados.</td>
                  </tr>
                ) : (
                  reportFilteredOccurrences.map((o, idx) => {
                    const stNames = Array.isArray(o.students) && o.students.length > 0
                      ? o.students.map(s => anonymizeText(s.studentName, anonymizeView)).join(', ')
                      : (anonymizeText(o.studentName, anonymizeView) || '-');
                    const classes = Array.isArray(o.students) && o.students.length > 0
                      ? o.students.map(s => `${s.gradeCycle || ''} ${s.className || ''}`).filter(Boolean).join(', ')
                      : `${o.gradeCycle || ''} ${o.className || ''}`;
                    const subjects = Array.isArray(o.students) && o.students.length > 0
                      ? o.students.map(s => `${s.subject_matter || ''} (${anonymizeText(s.teacherName, anonymizeView)})`).filter(Boolean).join(', ')
                      : `${o.subject_matter || ''} (${anonymizeText(o.teacherName, anonymizeView)})`;
                    const classifications = (Array.isArray(o.classifications) ? o.classifications : [o.type]).filter(Boolean).join(', ');
                    const schName = schools.find(s => s.id === o.schoolId)?.name || 'Rede Geral';

                    return (
                      <tr key={o.id || idx} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '2px', whiteSpace: 'nowrap' }}>{formatDisplayDate(o.date)}</td>
                        <td style={{ padding: '2px', fontWeight: 'bold' }}>{stNames}</td>
                        <td style={{ padding: '2px' }}>{classes || '-'}</td>
                        <td style={{ padding: '2px' }}>{subjects || '-'}</td>
                        <td style={{ padding: '2px' }}>{classifications || '-'}</td>
                        <td style={{ padding: '2px' }}>{schName}</td>
                        <td style={{ padding: '2px', textAlign: 'center', fontWeight: 'bold' }}>
                          {o.directorNotes ? '✅ Sim' : (o.status === 'rascunho' ? '📝 Rasc.' : '⏳ Não')}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Bloco de Assinaturas */}
          <div className="print-signatures-block" style={{ marginTop: '25px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <div className="print-signature-line" style={{ borderTop: '1px solid #000', textAlign: 'center', fontSize: '8pt', paddingTop: '3px' }}>
              {user.name}<br />
              <strong>{user.role === 'diretor' ? 'Direção Escolar' : (user.role === 'pedagogo' ? 'Coordenação Pedagógica' : 'Gestão SEDUC')}</strong>
            </div>
            <div className="print-signature-line" style={{ borderTop: '1px solid #000', textAlign: 'center', fontSize: '8pt', paddingTop: '3px' }}>
              Visto / Homologação SEDUC Contagem<br />
              <strong>Secretaria Municipal de Educação</strong>
            </div>
          </div>
        </div>
      )}

      {/* TUTORIAL MODAL (GERAL) */}
      {showTutorialModal && (
        <div className="modal-overlay" onClick={() => setShowTutorialModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px', maxHeight: '88vh', display: 'flex', flexDirection: 'column', padding: 0, borderRadius: 'var(--radius-lg, 12px)', overflow: 'hidden' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                  <IconBookOpen style={{ width: '20px', height: '20px' }} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--primary)', fontWeight: '800' }}>
                    Tutorial e Guia do Sistema POME
                  </h3>
                  <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Plataforma Oficial de Monitoramento do Clima Escolar
                  </p>
                </div>
              </div>
              <button className="btn btn-secondary" onClick={() => setShowTutorialModal(false)} style={{ padding: '0.35rem', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}>
                <IconX />
              </button>
            </div>

            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', overflowY: 'auto', flex: 1, padding: '1.25rem 1.5rem' }}>
              <div>
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.35rem', fontSize: '0.95rem', fontWeight: '700' }}>Apresentação Institucional</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.55', margin: 0 }}>
                  A plataforma <strong>POME</strong> é uma ferramenta de monitoramento do clima escolar desenvolvida para registro estruturado, escuta com base na Comunicação Não-Violenta (CNV), acompanhamento diretivo e integração com a rede de proteção da infância e adolescência.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.65rem', fontSize: '0.95rem', fontWeight: '700' }}>Fluxo do Atendimento em 5 Etapas</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.84rem' }}>
                  <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-app)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <strong>1. Identificação:</strong> Inclusão de um ou múltiplos estudantes atendidos, turnos, ciclos e dados de responsáveis.
                  </div>
                  <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-app)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <strong>2. Ocorrência:</strong> Relato descritivo dos fatos e classificação pelas 3 dimensões (Perturbadoras, Agressivas, Risco).
                  </div>
                  <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-app)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <strong>3. Sentimentos (CNV):</strong> Mapeamento das emoções expressas na escuta qualificada sem rótulos ou julgamentos.
                  </div>
                  <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-app)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <strong>4. Encaminhamentos:</strong> Registro de medidas escolares internas e articulação com a rede de proteção externa (Conselho Tutelar, CAPS, CRAS).
                  </div>
                  <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-app)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <strong>5. Revisão & Emissão:</strong> Validação geral, salvamento de rascunho ou finalização e impressão em folha A4 com conformidade LGPD.
                  </div>
                </div>
              </div>
            </div>

            <div className="card-footer" style={{ borderTop: '1px solid var(--border-color)', padding: '0.85rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-card)' }}>
              <button
                type="button"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}
                onClick={() => {
                  setShowTutorialModal(false);
                  const initialRole = user?.role === 'gestor' ? 'seduc' : (user?.role || 'pedagogo');
                  setTutorialSelectedRole(initialRole);
                  setTutorialSubTab('overview');
                  setShowRoleTutorialModal(true);
                }}
              >
                <IconShield style={{ width: '16px', height: '16px' }} /> Guia de Permissões do Meu Perfil
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowTutorialModal(false)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- DYNAMIC ROLE TUTORIAL & PERMISSIONS MODAL ----------------- */}
      {showRoleTutorialModal && (
        <div className="modal-overlay" onClick={() => setShowRoleTutorialModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', width: '95%', maxHeight: '90vh', display: 'flex', flexDirection: 'column', padding: 0, borderRadius: 'var(--radius-lg, 12px)', overflow: 'hidden' }}>
            
            {(() => {
              const visibleRoles = getVisibleTutorialRoles(user?.role);
              const activeRoleKey = visibleRoles.includes(tutorialSelectedRole) 
                ? tutorialSelectedRole 
                : (visibleRoles[0] || 'pedagogo');
              const rData = ROLE_TUTORIALS_DATA[activeRoleKey] || ROLE_TUTORIALS_DATA.pedagogo;

              return (
                <>
                  {/* Modal Header */}
                  <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', padding: '1.25rem 1.5rem', backgroundColor: 'var(--bg-card)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: `${rData.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: rData.color, flexShrink: 0 }}>
                        {renderRoleIconComponent(rData.iconType, { style: { width: '22px', height: '22px' } })}
                      </div>
                      <div>
                        <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: '800' }}>
                          Guia de Permissões: <span style={{ color: rData.color }}>{rData.name}</span>
                        </h3>
                        <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                          {rData.tagline}
                        </p>
                      </div>
                    </div>
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => setShowRoleTutorialModal(false)}
                      style={{ padding: '0.35rem', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}
                    >
                      <IconX />
                    </button>
                  </div>

                  <div className="card-body" style={{ padding: '1.25rem 1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    
                    {/* Role Switcher Tabs (Mostra APENAS o perfil atual e perfis hierarquicamente abaixo; Super Admin vê todos) */}
                    {visibleRoles.length > 1 && (
                      <div style={{ marginBottom: '1.25rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                          Consultar perfis institucionais permitidos:
                        </span>
                        <div className="role-tutorial-tabs">
                          {visibleRoles.map(roleKey => {
                            const r = ROLE_TUTORIALS_DATA[roleKey];
                            if (!r) return null;
                            const isActive = activeRoleKey === roleKey;
                            return (
                              <button
                                key={r.roleKey}
                                type="button"
                                className={`role-tutorial-tab-btn ${isActive ? 'active' : ''}`}
                                style={{
                                  backgroundColor: isActive ? r.color : 'var(--bg-app)',
                                  borderColor: isActive ? r.color : 'var(--border-color)',
                                  color: isActive ? '#ffffff' : 'var(--text-primary)'
                                }}
                                onClick={() => {
                                  setTutorialSelectedRole(r.roleKey);
                                  setTutorialSubTab('overview');
                                }}
                              >
                                {renderRoleIconComponent(r.iconType, { style: { width: '15px', height: '15px', color: isActive ? '#ffffff' : r.color } })}
                                <span>{r.roleKey === 'superadmin' ? 'Super Admin' : r.roleKey === 'seduc' ? 'Gestor/SEDUC' : r.roleKey === 'diretor' ? 'Diretor' : r.roleKey === 'pedagogo' ? 'Pedagogo' : 'Assistente'}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Sub-tabs Internas: Visão Geral | Permissões | Passo a Passo | LGPD */}
                    <div className="tutorial-subtab-nav">
                      <button
                        type="button"
                        className={`tutorial-subtab-btn ${tutorialSubTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setTutorialSubTab('overview')}
                      >
                        <IconBookOpen style={{ width: '15px', height: '15px' }} />
                        <span>Visão Geral</span>
                      </button>
                      <button
                        type="button"
                        className={`tutorial-subtab-btn ${tutorialSubTab === 'permissions' ? 'active' : ''}`}
                        onClick={() => setTutorialSubTab('permissions')}
                      >
                        <IconShield style={{ width: '15px', height: '15px' }} />
                        <span>Permissões & Restrições</span>
                      </button>
                      <button
                        type="button"
                        className={`tutorial-subtab-btn ${tutorialSubTab === 'steps' ? 'active' : ''}`}
                        onClick={() => setTutorialSubTab('steps')}
                      >
                        <IconTarget style={{ width: '15px', height: '15px' }} />
                        <span>Passo a Passo no Sistema</span>
                      </button>
                      <button
                        type="button"
                        className={`tutorial-subtab-btn ${tutorialSubTab === 'lgpd' ? 'active' : ''}`}
                        onClick={() => setTutorialSubTab('lgpd')}
                      >
                        <IconLock style={{ width: '15px', height: '15px' }} />
                        <span>Diretrizes LGPD & Ética</span>
                      </button>
                    </div>

                    {/* CONTEÚDO DA SUB-ABA: VISÃO GERAL */}
                    {tutorialSubTab === 'overview' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ backgroundColor: 'var(--bg-app)', padding: '1rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', lineHeight: '1.6' }}>
                          <h4 style={{ color: rData.color, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: '700' }}>
                            {renderRoleIconComponent(rData.iconType, { style: { width: '18px', height: '18px', color: rData.color } })}
                            <span>Atribuição Institucional</span>
                          </h4>
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', margin: 0 }}>
                            {rData.overview}
                          </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                          <div style={{ padding: '0.9rem 1.1rem', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                            <strong style={{ color: '#059669', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.25rem' }}>
                              <IconCheckCircle style={{ width: '16px', height: '16px' }} /> Principais Atribuições
                            </strong>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                              {rData.permissions.allowed.length} permissões ativas configuradas no perfil.
                            </span>
                          </div>
                          <div style={{ padding: '0.9rem 1.1rem', borderRadius: '8px', backgroundColor: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                            <strong style={{ color: '#dc2626', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.25rem' }}>
                              <IconShield style={{ width: '16px', height: '16px' }} /> Restrições de Sigilo
                            </strong>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                              Proteção de privacidade, hierarquia institucional e conformidade LGPD.
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
                          <h4 style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', fontSize: '0.92rem', fontWeight: '700' }}>
                            <IconCheckCircle style={{ width: '18px', height: '18px', color: '#059669' }} />
                            <span>O que este perfil PODE fazer:</span>
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {rData.permissions.allowed.map((perm, idx) => (
                              <div key={idx} className="permission-pill-allowed">
                                <span style={{ fontWeight: '800', color: '#059669', marginRight: '4px' }}>✓</span>
                                <span>{perm}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* O que NÃO pode fazer */}
                        <div>
                          <h4 style={{ color: '#dc2626', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', fontSize: '0.92rem', fontWeight: '700' }}>
                            <IconShield style={{ width: '18px', height: '18px', color: '#dc2626' }} />
                            <span>O que este perfil NÃO tem acesso (Restrições):</span>
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {rData.permissions.restricted.map((rest, idx) => (
                              <div key={idx} className="permission-pill-restricted">
                                <span style={{ fontWeight: '800', color: '#dc2626', marginRight: '4px' }}>✕</span>
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
                        {rData.steps.map((st) => (
                          <div key={st.step} className="tutorial-step-card">
                            <div className="tutorial-step-number" style={{ backgroundColor: rData.color }}>
                              {st.step}
                            </div>
                            <div style={{ flex: 1 }}>
                              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '700' }}>{st.title}</h4>
                              <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>{st.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* CONTEÚDO DA SUB-ABA: LGPD */}
                    {tutorialSubTab === 'lgpd' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ backgroundColor: 'var(--bg-app)', padding: '1rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--accent-orange)' }}>
                          <h4 style={{ color: 'var(--accent-orange)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem' }}>
                            <IconScale style={{ width: '18px', height: '18px' }} />
                            <span>Compromisso de Sigilo e Proteção de Dados (Lei 13.709/2018)</span>
                          </h4>
                          <p style={{ fontSize: '0.875rem', lineHeight: '1.55', color: 'var(--text-primary)', margin: 0 }}>
                            {rData.lgpd}
                          </p>
                        </div>

                        <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: '1.5', backgroundColor: 'var(--bg-card)', padding: '1rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>Boas Práticas Recomendadas:</strong>
                          <ul style={{ paddingLeft: '1.25rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            <li>Nunca compartilhe sua senha ou deixe o sistema aberto em computadores de uso coletivo.</li>
                            <li>Utilize o botão de anonimização (LGPD) sempre que projetar dados em telões ou reuniões pedagógicas.</li>
                            <li>Fichas de atendimento impressas devem ser guardadas em arquivo seguro da secretaria escolar.</li>
                          </ul>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Modal Footer */}
                  <div className="card-footer" style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', padding: '0.85rem 1.5rem', backgroundColor: 'var(--bg-card)' }}>
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={() => setShowRoleTutorialModal(false)}
                      style={{ fontSize: '0.85rem', padding: '0.5rem 1.5rem', fontWeight: '700' }}
                    >
                      Entendi, Fechar Tutorial
                    </button>
                  </div>
                </>
              );
            })()}

          </div>
        </div>
      )}

      {/* MODAL: GLOSSÁRIO JURÍDICO & PEDAGÓGICO */}
      {selectedGlossaryTerm && (
        <div className="modal-overlay" onClick={() => setSelectedGlossaryTerm(null)}>
          <div className="modal-content glossary-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '660px', maxHeight: '88vh', display: 'flex', flexDirection: 'column', padding: 0, borderRadius: 'var(--radius-lg, 12px)', overflow: 'hidden' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card)' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <IconBookOpen style={{ width: '15px', height: '15px' }} />
                  <span>{selectedGlossaryTerm.isDimension ? 'Definição e Diretrizes da Dimensão POME' : 'Glossário Jurídico & Pedagógico POME'}</span>
                </div>
                <h3 style={{ fontSize: '1.3rem', margin: '0.35rem 0 0 0', color: 'var(--primary)', fontWeight: '800', lineHeight: '1.2' }}>
                  {selectedGlossaryTerm.icone && <span style={{ marginRight: '8px' }}>{selectedGlossaryTerm.icone}</span>}
                  {selectedGlossaryTerm.termo}
                </h3>
                <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                  {selectedGlossaryTerm.dimensao && (
                    <span className="badge" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontSize: '0.75rem', padding: '3px 9px', borderRadius: '6px', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', fontWeight: '700' }}>
                      Dimensão: {selectedGlossaryTerm.dimensao}
                    </span>
                  )}
                  {selectedGlossaryTerm.isDimension && (
                    <span className="badge" style={{ backgroundColor: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', fontSize: '0.75rem', padding: '3px 9px', borderRadius: '6px', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', fontWeight: '700' }}>
                      Classificação Oficial POME
                    </span>
                  )}
                </div>
              </div>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setSelectedGlossaryTerm(null)} 
                style={{ padding: '0.35rem', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}
                title="Fechar"
              >
                <IconX />
              </button>
            </div>

            <div className="card-body" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', flex: 1 }}>
              {/* Conceito / Definição */}
              <div className="glossary-section-card" style={{ padding: '0.9rem 1.1rem', borderRadius: '8px', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', borderLeft: '3px solid var(--primary)' }}>
                <h5 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', margin: '0 0 0.35rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <IconScale style={{ width: '16px', height: '16px', color: 'var(--primary)', flexShrink: 0 }} />
                  <span>{selectedGlossaryTerm.isDimension ? 'Definição e Abrangência da Dimensão' : 'Significado Conforme a Legislação'}</span>
                </h5>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: '1.55', margin: 0 }}>
                  {selectedGlossaryTerm.significado}
                </p>
              </div>

              {/* Orientação Pedagógica / Diretrizes (para Dimensões) */}
              {selectedGlossaryTerm.encaminhamentoPedagogico && (
                <div className="glossary-section-card" style={{ padding: '0.9rem 1.1rem', borderRadius: '8px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderLeft: '3px solid #22c55e' }}>
                  <h5 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#15803d', margin: '0 0 0.35rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <IconSchool style={{ width: '16px', height: '16px', color: '#15803d', flexShrink: 0 }} />
                    <span>Diretrizes e Orientação Pedagógica</span>
                  </h5>
                  <p style={{ fontSize: '0.875rem', color: '#166534', lineHeight: '1.55', margin: 0 }}>
                    {selectedGlossaryTerm.encaminhamentoPedagogico}
                  </p>
                </div>
              )}

              {/* Termo Adequado (para Itens) */}
              {selectedGlossaryTerm.termoAdequado && (
                <div className="glossary-section-card" style={{ padding: '0.9rem 1.1rem', borderRadius: '8px', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', borderLeft: '3px solid var(--accent-orange)' }}>
                  <h5 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-orange)', margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <IconTarget style={{ width: '16px', height: '16px', color: 'var(--accent-orange)', flexShrink: 0 }} />
                    <span>Termo Tecnicamente Adequado</span>
                  </h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', margin: 0, lineHeight: '1.45' }}>
                    "{selectedGlossaryTerm.termoAdequado}"
                  </p>
                </div>
              )}

              {/* Situação em que se aplica (para Itens) */}
              {selectedGlossaryTerm.situacaoEscola && (
                <div className="glossary-section-card" style={{ padding: '0.9rem 1.1rem', borderRadius: '8px', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)' }}>
                  <h5 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', margin: '0 0 0.35rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <IconSchool style={{ width: '16px', height: '16px', color: 'var(--primary)', flexShrink: 0 }} />
                    <span>Situação em que se aplica na escola (Exemplo Prático)</span>
                  </h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: '1.5', margin: 0 }}>
                    {selectedGlossaryTerm.situacaoEscola}
                  </p>
                </div>
              )}

              {/* Fonte Legal */}
              {selectedGlossaryTerm.fonteLegal && (
                <div className="glossary-section-card" style={{ padding: '0.9rem 1.1rem', borderRadius: '8px', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)' }}>
                  <h5 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', margin: '0 0 0.25rem 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <IconBookOpen style={{ width: '16px', height: '16px', color: 'var(--primary)', flexShrink: 0 }} />
                    <span>Fonte Legal e Normativa</span>
                  </h5>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, fontWeight: '600' }}>
                    {selectedGlossaryTerm.fonteLegal}
                  </p>
                </div>
              )}
            </div>

            <div className="card-footer" style={{ borderTop: '1px solid var(--border-color)', padding: '0.85rem 1.5rem', display: 'flex', justifyContent: 'flex-end', backgroundColor: 'var(--bg-card)' }}>
              <button type="button" className="btn btn-primary" onClick={() => setSelectedGlossaryTerm(null)} style={{ padding: '0.5rem 1.5rem', fontWeight: '700' }}>
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CADASTRAR NOVO USUÁRIO (GESTOR / SEDUC / SUPER ADMIN) */}
      {showCreateUserModal && (
        <div className="modal-overlay" onClick={() => setShowCreateUserModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', padding: 0, borderRadius: 'var(--radius-lg, 12px)', overflow: 'hidden' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', padding: '1.25rem 1.5rem' }}>
              <div>
                <h3 style={{ margin: 0, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem' }}>
                  <IconPlus /> Cadastrar Novo Usuário
                </h3>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Defina os dados de identificação, lotação e perfil de acesso do servidor.
                </p>
              </div>
              <button className="btn btn-secondary" onClick={() => setShowCreateUserModal(false)} style={{ padding: '0.35rem', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}>
                <IconX />
              </button>
            </div>

            <form className="card-body" onSubmit={async (e) => {
              e.preventDefault();
              const cleanCpf = (newUserData.cpf || '').replace(/\D/g, '');
              if (cleanCpf.length < 11) {
                alert('Por favor, informe um CPF válido com 11 dígitos.');
                return;
              }

              const classes = newUserData.classesInput
                ? newUserData.classesInput.split(',').map(c => c.trim().toUpperCase()).filter(Boolean)
                : [];
              const payload = {
                name: newUserData.name.trim(),
                email: (newUserData.email || '').trim(),
                phone: (newUserData.phone || '').trim(),
                cpf: cleanCpf,
                password: (newUserData.password || 'senha').trim(),
                role: newUserData.role,
                schoolId: (newUserData.role === 'gestor' || newUserData.role === 'seduc' || newUserData.role === 'superadmin') ? null : (newUserData.schoolId ? newUserData.schoolId.trim() : null),
                classes: classes
              };

              setIsCreatingUser(true);
              try {
                const res = await fetch('/api/users', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload)
                });
                if (res.ok) {
                  setShowCreateUserModal(false);
                  setNewUserData({ name: '', cpf: '', email: '', phone: '', password: '', role: 'pedagogo', schoolId: '', classesInput: '' });
                  await fetchUsers();
                  setNotification({ type: 'success', message: 'Usuário cadastrado com sucesso no sistema e no Supabase!' });
                } else {
                  const err = await res.json();
                  alert(err.error || 'Erro ao criar usuário.');
                }
              } catch (err) {
                console.error('Create user error:', err);
                alert('Erro de conexão ao criar usuário.');
              } finally {
                setIsCreatingUser(false);
              }
            }} style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', flex: 1 }}>
              <div className="form-group">
                <label className="form-label">Nome Completo *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ex: Ana Souza"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">CPF *</label>
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
                  <label className="form-label">E-mail Institucional *</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="nome@edu.contagem.mg.gov.br"
                    value={newUserData.email}
                    onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Telefone de Contato</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="(31) 90000-0000"
                    value={newUserData.phone}
                    onChange={(e) => setNewUserData({ ...newUserData, phone: formatPhone(e.target.value) })}
                    maxLength={15}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Senha Inicial *</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mínimo 4 caracteres"
                    value={newUserData.password}
                    onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Perfil de Acesso *</label>
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
                  {user.role === 'superadmin' && <option value="superadmin">Super Admin</option>}
                </select>
              </div>

              {newUserData.role !== 'gestor' && newUserData.role !== 'seduc' && newUserData.role !== 'superadmin' && (
                <div className="form-group">
                  <label className="form-label">Escola Vinculada *</label>
                  <select
                    className="form-select"
                    value={newUserData.schoolId}
                    onChange={(e) => setNewUserData({ ...newUserData, schoolId: e.target.value })}
                    required
                  >
                    <option value="">Selecione a escola...</option>
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
                    placeholder="Ex: 5º ANO A, 5º ANO B, 4º ANO A"
                    style={{ textTransform: 'uppercase' }}
                    value={newUserData.classesInput}
                    onChange={(e) => setNewUserData({ ...newUserData, classesInput: e.target.value.toUpperCase() })}
                  />
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowCreateUserModal(false)}>
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ padding: '0.6rem 1.5rem', fontWeight: '700' }}
                  disabled={isCreatingUser}
                >
                  {isCreatingUser ? 'Cadastrando servidor...' : 'Confirmar Cadastro'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDITAR USUÁRIO (GESTOR / SEDUC / SUPER ADMIN) */}
      {editingUser && (
        <div className="modal-overlay" onClick={() => setEditingUser(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', padding: 0, borderRadius: 'var(--radius-lg, 12px)', overflow: 'hidden' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', padding: '1.25rem 1.5rem' }}>
              <div>
                <h3 style={{ margin: 0, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem' }}>
                  <IconEdit /> Editar Usuário: {editingUser.name}
                </h3>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Altere a lotação escolar, permissões e dados de contato do servidor.
                </p>
              </div>
              <button className="btn btn-secondary" onClick={() => setEditingUser(null)} style={{ padding: '0.35rem', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}>
                <IconX />
              </button>
            </div>

            <form className="card-body" onSubmit={async (e) => {
              e.preventDefault();
              const classes = editingUser.classesInput
                ? editingUser.classesInput.split(',').map(c => c.trim().toUpperCase()).filter(Boolean)
                : (Array.isArray(editingUser.classes) ? editingUser.classes : []);
              
              const payload = {
                name: editingUser.name,
                email: editingUser.email,
                phone: editingUser.phone,
                cpf: editingUser.cpf.replace(/\D/g, ''),
                role: editingUser.role,
                schoolId: (editingUser.role === 'gestor' || editingUser.role === 'seduc' || editingUser.role === 'superadmin') ? null : editingUser.schoolId,
                classes: classes
              };

              try {
                const res = await fetch(`/api/users/${editingUser.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload)
                });
                if (res.ok) {
                  setEditingUser(null);
                  fetchUsers();
                  setNotification({ type: 'success', message: 'Usuário atualizado com sucesso!' });
                } else {
                  const err = await res.json();
                  alert(err.error || 'Erro ao atualizar usuário.');
                }
              } catch (err) {
                console.error('Update user error:', err);
                alert('Erro de conexão ao atualizar usuário.');
              }
            }} style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', flex: 1 }}>
              <div className="form-group">
                <label className="form-label">Nome Completo</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">CPF</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingUser.cpf}
                    onChange={(e) => setEditingUser({ ...editingUser, cpf: formatCPF(e.target.value) })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">E-mail Institucional</label>
                  <input
                    type="email"
                    className="form-control"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Telefone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: formatPhone(e.target.value) })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Perfil de Acesso</label>
                  <select
                    className="form-select"
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    required
                  >
                    <option value="pedagogo">Pedagogo(a)</option>
                    <option value="diretor">Diretor(a)</option>
                    <option value="assistente">Assistente Escolar</option>
                    <option value="seduc">Seduc / Gestor Central</option>
                    <option value="gestor">Gestor do Projeto</option>
                    {user.role === 'superadmin' && <option value="superadmin">Super Admin</option>}
                  </select>
                </div>
              </div>

              {editingUser.role !== 'gestor' && editingUser.role !== 'seduc' && editingUser.role !== 'superadmin' && (
                <div className="form-group">
                  <label className="form-label">Escola Vinculada</label>
                  <select
                    className="form-select"
                    value={editingUser.schoolId || ''}
                    onChange={(e) => setEditingUser({ ...editingUser, schoolId: e.target.value })}
                    required
                  >
                    <option value="">Selecione a escola...</option>
                    {schools.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {editingUser.role === 'pedagogo' && (
                <div className="form-group">
                  <label className="form-label">Turmas Vinculadas (Separadas por vírgula)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ex: 3º ANO A, 4º ANO B"
                    style={{ textTransform: 'uppercase' }}
                    value={editingUser.classesInput}
                    onChange={(e) => setEditingUser({ ...editingUser, classesInput: e.target.value.toUpperCase() })}
                  />
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setEditingUser(null)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontWeight: '700' }}>
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: MEU PERFIL (AUTONOMIA DO USUÁRIO LOGADO) */}
      {showProfileModal && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', padding: 0, borderRadius: 'var(--radius-lg, 12px)', overflow: 'hidden' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', padding: '1.25rem 1.5rem', backgroundColor: 'var(--bg-card)' }}>
              <div>
                <h3 style={{ margin: 0, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem' }}>
                  <IconUser /> Meu Perfil de Acesso
                </h3>
                <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Atualize suas informações cadastrais e credenciais de acesso.
                </p>
              </div>
              <button className="btn btn-secondary" onClick={() => setShowProfileModal(false)} style={{ padding: '0.35rem', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px' }}>
                <IconX />
              </button>
            </div>

            <form className="card-body" onSubmit={async (e) => {
              e.preventDefault();
              setProfileMessage(null);

              if (profileData.newPassword && profileData.newPassword !== profileData.confirmNewPassword) {
                setProfileMessage({ type: 'danger', text: 'A confirmação de nova senha não confere.' });
                return;
              }

              try {
                const res = await fetch('/api/profile', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    userId: user.id,
                    name: profileData.name,
                    email: profileData.email,
                    phone: profileData.phone,
                    currentPassword: profileData.currentPassword,
                    newPassword: profileData.newPassword
                  })
                });

                if (res.ok) {
                  const updated = await res.json();
                  const mergedUser = { ...user, ...updated };
                  setUser(mergedUser);
                  localStorage.setItem('user', JSON.stringify(mergedUser));
                  setProfileMessage({ type: 'success', text: 'Perfil atualizado com sucesso!' });
                  setTimeout(() => {
                    setShowProfileModal(false);
                    setProfileMessage(null);
                  }, 1400);
                } else {
                  const err = await res.json();
                  setProfileMessage({ type: 'danger', text: err.error || 'Erro ao atualizar perfil.' });
                }
              } catch (err) {
                console.error('Update profile error:', err);
                setProfileMessage({ type: 'danger', text: 'Erro de conexão com o servidor.' });
              }
            }} style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', flex: 1 }}>
              
              {profileMessage && (
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: profileMessage.type === 'success' ? '#dcfce7' : '#fee2e2',
                  color: profileMessage.type === 'success' ? '#15803d' : '#b91c1c',
                  border: `1px solid ${profileMessage.type === 'success' ? '#86efac' : '#fca5a5'}`,
                  fontSize: '0.85rem',
                  fontWeight: '600'
                }}>
                  {profileMessage.text}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Nome Completo</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">E-mail Institucional</label>
                <input
                  type="email"
                  className="form-control"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Telefone de Contato</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: formatPhone(e.target.value) })}
                />
              </div>

              <div style={{ backgroundColor: 'var(--bg-app)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <IconLock style={{ width: '16px', height: '16px' }} />
                  <span>Alterar Senha de Acesso (Opcional)</span>
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Senha Atual</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Digite sua senha atual"
                    value={profileData.currentPassword}
                    onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Nova Senha</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Mínimo 4 dígitos"
                      value={profileData.newPassword}
                      onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" style={{ fontSize: '0.8rem' }}>Confirmar Nova Senha</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Repita a nova senha"
                      value={profileData.confirmNewPassword}
                      onChange={(e) => setProfileData({ ...profileData, confirmNewPassword: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                {(user.role === 'superadmin' || user.role === 'seduc' || user.role === 'gestor') && (
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => handleCreateBackup('profile')}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
                    title="Fazer e baixar backup completo da base de dados do Supabase"
                  >
                    <IconDatabase /> Fazer Backup (JSON)
                  </button>
                )}
                <div style={{ display: 'flex', gap: '0.75rem', marginLeft: 'auto' }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowProfileModal(false)}>
                    Fechar
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontWeight: '700' }}>
                    Atualizar Perfil
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <MainApp />
    </ErrorBoundary>
  );
}
