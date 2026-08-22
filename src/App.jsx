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

function App() {
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [tutorialTab, setTutorialTab] = useState('welcome');
  const [showTutorialModal, setShowTutorialModal] = useState(false);

  // Authentication & Session
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  
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

  useEffect(() => {
    const initApp = async () => {
      if (user) {
        try {
          await Promise.all([fetchSchools(), fetchOccurrences(), fetchUsers()]);
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
        setActiveTab('dashboard');
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
        setRegisterSuccess('Solicitação de cadastro realizada com sucesso! Você já pode realizar o login.');
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

  // Handler: Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
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

  // Filter & Search Logic
  const filteredOccurrences = occurrences.filter(o => {
    const studentNames = (Array.isArray(o.students) ? o.students.map(s => s.studentName).join(' ') : o.studentName) || '';
    const guardianName = o.guardianName || '';
    const subject = o.subject || '';
    const className = o.className || '';
    const createdByName = o.createdByName || '';
    const gradeCycle = o.gradeCycle || '';
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
      normalize(status).includes(normalizedQuery);
      
    const matchesSchool = filterSchool ? o.schoolId === filterSchool : true;
    const matchesClass = filterClass ? className.toLowerCase().includes(filterClass.toLowerCase()) : true;
    
    // Nature filter
    const matchesNature = filterNature
      ? (Array.isArray(o.classifications) && o.classifications.some(c => c.toLowerCase().includes(filterNature.toLowerCase()))) ||
        (o.type && o.type.toLowerCase().includes(filterNature.toLowerCase()))
      : true;

    // Pedagogue class restriction
    const matchesPedagogueClasses = 
      user && user.role === 'pedagogo' && user.classes && user.classes.length > 0
        ? user.classes.some(c => c.trim().toLowerCase() === className.trim().toLowerCase())
        : true;

    return matchesSearch && matchesNature && matchesSchool && matchesClass && matchesPedagogueClasses;
  });

  // Calculate Metrics/Statistics for current context
  const getMetrics = () => {
    const activeOccurrences = filteredOccurrences;
    const total = activeOccurrences.length;
    const perturbadoras = activeOccurrences.filter(o => {
      const classifications = o.classifications || [o.type];
      return classifications.some(c => 
        ['Indisciplina recorrente', 'Saída injustificada da sala', 'Uso indevido de aparelhos eletrônicos', 'Incivilidade', 'Transgressão', 'Intimidação (ato isolado, não sistemático)'].some(k => c?.includes(k))
      );
    }).length;

    const agressivas = activeOccurrences.filter(o => {
      const classifications = o.classifications || [o.type];
      return classifications.some(c => 
        ['Agressão física', 'Agressão verbal', 'Ameaça', 'Bullying', 'Racismo', 'LGBTfobia', 'Homofobia', 'Assédio', 'Vandalismo'].some(k => c?.includes(k))
      );
    }).length;

    const riscos = activeOccurrences.filter(o => {
      const classifications = o.classifications || [o.type];
      return classifications.some(c => 
        ['Automutilação', 'Suicídio', 'Álcool', 'Drogas', 'Violência doméstica', 'Evasão', 'Arma'].some(k => c?.includes(k))
      );
    }).length;

    const comVisto = activeOccurrences.filter(o => o.directorNotes).length;
    const rascunhos = activeOccurrences.filter(o => o.status === 'rascunho').length;

    return { total, perturbadoras, agressivas, riscos, comVisto, rascunhos };
  };

  const metrics = getMetrics();

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
                        onClick={() => setLoginData({ cpf: '000.000.000-00', password: 'admin' })}
                      >
                        <span className="quick-login-role">🛡️ Gestor / Seduc</span>
                        <span className="quick-login-creds">CPF: 000.000.000-00 | Senha: admin</span>
                      </div>
                      <div 
                        className="quick-login-card" 
                        onClick={() => setLoginData({ cpf: '111.111.111-11', password: 'senha' })}
                      >
                        <span className="quick-login-role">💼 Diretor(a)</span>
                        <span className="quick-login-creds">CPF: 111.111.111-11 | Senha: senha</span>
                      </div>
                      <div 
                        className="quick-login-card" 
                        onClick={() => setLoginData({ cpf: '222.222.222-22', password: 'senha' })}
                      >
                        <span className="quick-login-role">✏️ Pedagogo(a)</span>
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
            <label className="form-label">CPF</label>
            <input
              type="text"
              placeholder="000.000.000-00"
              className="form-control"
              value={loginData.cpf}
              onChange={(e) => setLoginData({ ...loginData, cpf: formatCPF(e.target.value) })}
              maxLength={14}
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
      {/* Navigation Bar */}
      <header className="navbar">
        <a href="#" className="navbar-brand" onClick={() => setActiveTab('dashboard')}>
          <Logo style={{ height: '70px', width: 'auto' }} />
        </a>
        <div className="navbar-user">
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-role">
              {user.role.toUpperCase()} {user.schoolName ? `| ${user.schoolName}` : ''}
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
            onClick={() => setShowTutorialModal(true)}
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
          
          {(user.role === 'gestor' || user.role === 'seduc') && (
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
              <button 
                className={`btn ${activeTab === 'reports' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => { setActiveTab('reports'); setShowForm(false); }}
              >
                <IconFolder style={{ marginRight: '6px' }} /> Relatórios de Gestão
              </button>
            </>
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

        {/* ----------------- TAB: GERENCIAR ESCOLAS (GESTOR / SEDUC) ----------------- */}
        {activeTab === 'schools' && (user.role === 'gestor' || user.role === 'seduc') && (
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

        {/* ----------------- TAB: GERENCIAR USUÁRIOS (GESTOR / SEDUC) ----------------- */}
        {activeTab === 'users' && (user.role === 'gestor' || user.role === 'seduc') && (
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
                                  u.role === 'gestor' || u.role === 'seduc' ? 'badge-danger' : 
                                  u.role === 'diretor' ? 'badge-primary' : 'badge-success'
                                }`}>
                                  {u.role}
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

        {/* ----------------- TAB: RELATÓRIOS (GESTOR / SEDUC) ----------------- */}
        {activeTab === 'reports' && (user.role === 'gestor' || user.role === 'seduc') && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2>Relatório Consolidado de Clima Escolar</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Visão analítica completa das ocorrências na rede municipal de ensino</p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={() => window.print()}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IconPrinter /> Imprimir Relatório Geral</span>
                </button>
                <button className="btn btn-success" onClick={handleExportSPSS}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IconFolder /> Exportar SPSS</span>
                </button>
              </div>
            </div>

            <div className="metrics-grid" style={{ marginBottom: '1.5rem' }}>
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

      {/* TUTORIAL MODAL */}
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

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
