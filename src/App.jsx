import React, { useState, useEffect } from 'react';
import './App.css';

// SVG Logo Component (Circle of kids around a house with a heart)
const Logo = (props) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    {/* Center House (Navy Blue) */}
    <path 
      d="M 35,52 L 50,37 L 65,52 M 39.5,50.5 L 39.5,66 C 39.5,67 40,67.5 41,67.5 L 59,67.5 C 60,67.5 60.5,67 60.5,66 L 60.5,50.5" 
      stroke="#1c355e" 
      strokeWidth="4" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    {/* Center Heart (Pink) */}
    <path 
      d="M 50,55.5 C 49.3,53.7 47.5,52.5 45.7,52.5 C 43,52.5 41.5,54.5 41.5,57.2 C 41.5,60.5 45.7,63.8 50,65.8 C 54.3,63.8 58.5,60.5 58.5,57.2 C 58.5,54.5 57,52.5 54.3,52.5 C 52.5,52.5 50.7,53.7 50,55.5 Z" 
      fill="#e51c60" 
    />
    
    {/* 6 Stylized Figures around the house */}
    {/* Top: Blue */}
    <g>
      <circle cx="50" cy="15" r="5.5" fill="#005fa9" />
      <path d="M 46.5,21 L 44,32 C 43.8,33 44.5,34 45.5,34 C 46.2,34 46.8,33.5 47,32.8 L 48.5,28.5 C 49,27.5 51,27.5 51.5,28.5 L 53,32.8 C 53.2,33.5 53.8,34 54.5,34 C 55.5,34 56.2,33 56,32 L 53.5,21 Z" fill="#005fa9" />
      <path d="M 33.5,23 C 39,18.5 44,17 50,17 C 56,17 61,18.5 66.5,23" stroke="#005fa9" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </g>

    {/* Top-Right: Teal */}
    <g transform="rotate(60 50 50)">
      <circle cx="50" cy="15" r="5.5" fill="#00a294" />
      <path d="M 46.5,21 L 44,32 C 43.8,33 44.5,34 45.5,34 C 46.2,34 46.8,33.5 47,32.8 L 48.5,28.5 C 49,27.5 51,27.5 51.5,28.5 L 53,32.8 C 53.2,33.5 53.8,34 54.5,34 C 55.5,34 56.2,33 56,32 L 53.5,21 Z" fill="#00a294" />
      <path d="M 33.5,23 C 39,18.5 44,17 50,17 C 56,17 61,18.5 66.5,23" stroke="#00a294" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </g>

    {/* Bottom-Right: Green */}
    <g transform="rotate(120 50 50)">
      <circle cx="50" cy="15" r="5.5" fill="#70b135" />
      <path d="M 46.5,21 L 44,32 C 43.8,33 44.5,34 45.5,34 C 46.2,34 46.8,33.5 47,32.8 L 48.5,28.5 C 49,27.5 51,27.5 51.5,28.5 L 53,32.8 C 53.2,33.5 53.8,34 54.5,34 C 55.5,34 56.2,33 56,32 L 53.5,21 Z" fill="#70b135" />
      <path d="M 33.5,23 C 39,18.5 44,17 50,17 C 56,17 61,18.5 66.5,23" stroke="#70b135" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </g>

    {/* Bottom: Yellow */}
    <g transform="rotate(180 50 50)">
      <circle cx="50" cy="15" r="5.5" fill="#f9bd15" />
      <path d="M 46.5,21 L 44,32 C 43.8,33 44.5,34 45.5,34 C 46.2,34 46.8,33.5 47,32.8 L 48.5,28.5 C 49,27.5 51,27.5 51.5,28.5 L 53,32.8 C 53.2,33.5 53.8,34 54.5,34 C 55.5,34 56.2,33 56,32 L 53.5,21 Z" fill="#f9bd15" />
      <path d="M 33.5,23 C 39,18.5 44,17 50,17 C 56,17 61,18.5 66.5,23" stroke="#f9bd15" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </g>

    {/* Bottom-Left: Orange */}
    <g transform="rotate(240 50 50)">
      <circle cx="50" cy="15" r="5.5" fill="#f37022" />
      <path d="M 46.5,21 L 44,32 C 43.8,33 44.5,34 45.5,34 C 46.2,34 46.8,33.5 47,32.8 L 48.5,28.5 C 49,27.5 51,27.5 51.5,28.5 L 53,32.8 C 53.2,33.5 53.8,34 54.5,34 C 55.5,34 56.2,33 56,32 L 53.5,21 Z" fill="#f37022" />
      <path d="M 33.5,23 C 39,18.5 44,17 50,17 C 56,17 61,18.5 66.5,23" stroke="#f37022" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </g>

    {/* Top-Left: Purple */}
    <g transform="rotate(300 50 50)">
      <circle cx="50" cy="15" r="5.5" fill="#85368a" />
      <path d="M 46.5,21 L 44,32 C 43.8,33 44.5,34 45.5,34 C 46.2,34 46.8,33.5 47,32.8 L 48.5,28.5 C 49,27.5 51,27.5 51.5,28.5 L 53,32.8 C 53.2,33.5 53.8,34 54.5,34 C 55.5,34 56.2,33 56,32 L 53.5,21 Z" fill="#85368a" />
      <path d="M 33.5,23 C 39,18.5 44,17 50,17 C 56,17 61,18.5 66.5,23" stroke="#85368a" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </g>
  </svg>
);

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
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const IconWarning = (props) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconShield = (props) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconActivity = (props) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
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

// Constants for Occurrence types and SPSS codes
const OCCURRENCE_TYPES = [
  { label: 'Bullying', code: 1 },
  { label: 'Homofobia', code: 2 },
  { label: 'Racismo', code: 3 },
  { label: 'Conflito Verbal/Físico', code: 4 },
  { label: 'Outros', code: 5 }
];

function App() {
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [tutorialTab, setTutorialTab] = useState('welcome');
  const [showTutorialModal, setShowTutorialModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Authentication & Session
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [loginData, setLoginData] = useState({ cpf: '', password: '' });
  const [loginError, setLoginError] = useState('');
  
  // App States
  const [occurrences, setOccurrences] = useState([]);
  const [schools, setSchools] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterSchool, setFilterSchool] = useState('');
  const [filterClass, setFilterClass] = useState('');
  
  // Modals & Forms
  const [showForm, setShowForm] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [selectedOccurrence, setSelectedOccurrence] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  // Director Observation Temp State
  const [directorNotes, setDirectorNotes] = useState('');

  // School/User Creation States (Gestor)
  const [newSchoolName, setNewSchoolName] = useState('');
  const [editingSchool, setEditingSchool] = useState(null);
  const [newUserData, setNewUserData] = useState({ name: '', cpf: '', password: '', role: 'pedagogo', schoolId: '', classesInput: '' });

  // Progressive Form State
  const initialFormState = {
    id: '',
    studentName: '',
    gradeCycle: '',
    className: '',
    teacherName: '',
    guardianName: '',
    contacts: '',
    date: new Date().toISOString().split('T')[0],
    type: '',
    subject: '',
    referrals: '',
    observations: '',
    directorNotes: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  // Apply theme to HTML tag
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Load initial data based on login state
  useEffect(() => {
    if (user) {
      fetchSchools();
      fetchOccurrences();
      if (user.role === 'gestor') {
        fetchUsers();
      }
    }
  }, [user]);

  // API Call: Fetch Schools
  const fetchSchools = async () => {
    try {
      const res = await fetch('/api/schools');
      if (res.ok) {
        const data = await res.json();
        setSchools(data);
      }
    } catch (err) {
      console.error('Error fetching schools:', err);
    }
  };

  // API Call: Fetch Occurrences
  const fetchOccurrences = async () => {
    if (!user) return;
    try {
      const url = `/api/occurrences?schoolId=${user.schoolId || ''}&role=${user.role}&userId=${user.id}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setOccurrences(data);
      }
    } catch (err) {
      console.error('Error fetching occurrences:', err);
    }
  };

  // API Call: Fetch Users (Gestor only)
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        setUsersList(data);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

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
      setLoginError('Erro ao conectar ao servidor.');
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
    setFilterType('');
    setFilterSchool('');
    setFilterClass('');
    setSelectedOccurrence(null);
    setShowDetailModal(false);
    setLoginData({ cpf: '', password: '' });
    setLoginError('');
    
    // Force clean navigation back to home page
    window.location.href = '/';
  };

  // Handler: Save Occurrence
  const handleSaveOccurrence = async () => {
    const payload = {
      ...formData,
      schoolId: user.schoolId || formData.schoolId || schools[0]?.id,
      createdById: user.id,
      createdByName: user.name
    };

    try {
      const res = await fetch('/api/occurrences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        fetchOccurrences();
        setShowForm(false);
        setFormData(initialFormState);
        setFormStep(1);
      } else {
        alert('Erro ao salvar ocorrência.');
      }
    } catch (err) {
      alert('Erro de conexão ao salvar ocorrência.');
    }
  };

  // Handler: Delete Occurrence
  const handleDeleteOccurrence = async (occId) => {
    if (!confirm('Deseja realmente excluir esta ocorrência permanentemente?')) return;
    try {
      const res = await fetch(`/api/occurrences/${occId}`, { method: 'DELETE' });
      if (res.ok) {
        fetchOccurrences();
      } else {
        alert('Erro ao excluir ocorrência.');
      }
    } catch (err) {
      alert('Erro de conexão ao excluir ocorrência.');
    }
  };

  // Handler: Save Director Notes
  const handleSaveDirectorNotes = async () => {
    if (!selectedOccurrence) return;
    const updated = {
      ...selectedOccurrence,
      directorNotes: directorNotes
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
      alert('Erro de conexão.');
    }
  };

  // Handler: Save New/Edited School (Gestor)
  const handleCreateSchool = async (e) => {
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
      alert('Erro ao salvar escola.');
    }
  };

  // Handler: Delete School (Gestor)
  const handleDeleteSchool = async (schoolId) => {
    if (!confirm('Deseja realmente excluir esta escola? Todos os usuários e ocorrências dela ficarão sem vínculo.')) return;
    try {
      const res = await fetch(`/api/schools/${schoolId}`, { method: 'DELETE' });
      if (res.ok) {
        fetchSchools();
        if (editingSchool?.id === schoolId) {
          setEditingSchool(null);
          setNewSchoolName('');
        }
      }
    } catch (err) {
      alert('Erro ao excluir escola.');
    }
  };

  // Handler: Save New User (Gestor)
  const handleCreateUser = async (e) => {
    e.preventDefault();
    const classes = newUserData.classesInput
      ? newUserData.classesInput.split(',').map(c => c.trim())
      : [];
    const payload = {
      name: newUserData.name,
      cpf: newUserData.cpf.replace(/\D/g, ''),
      password: newUserData.password,
      role: newUserData.role,
      schoolId: newUserData.role === 'gestor' ? null : newUserData.schoolId,
      classes: classes
    };

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setNewUserData({ name: '', cpf: '', password: '', role: 'pedagogo', schoolId: '', classesInput: '' });
        fetchUsers();
      } else {
        const err = await res.json();
        alert(err.error || 'Erro ao criar usuário.');
      }
    } catch (err) {
      alert('Erro de conexão ao criar usuário.');
    }
  };

  // Handler: Delete User (Gestor)
  const handleDeleteUser = async (userId) => {
    if (!confirm('Deseja realmente excluir este usuário?')) return;
    try {
      const res = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
      if (res.ok) {
        fetchUsers();
      }
    } catch (err) {
      alert('Erro ao excluir usuário.');
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

  // CSV/Excel Export (SPSS Friendly)
  const handleExportSPSS = () => {
    // Columns definition
    const headers = [
      'ID_Ocorrencia',
      'Escola_ID',
      'Escola_Nome',
      'Data_Registro',
      'Estudante_Nome',
      'Ano_Ciclo',
      'Turma',
      'Professor_Nome',
      'Responsavel_Nome',
      'Contatos',
      'Tipo_Ocorrencia_Texto',
      'Tipo_Ocorrencia_Codigo',
      'Assunto',
      'Encaminhamentos',
      'Observacoes_Pedagogicas',
      'Observacoes_Diretoria',
      'Criado_Por'
    ];

    // Robust escaping to avoid replace errors on numbers/undef
    const escape = (val) => {
      if (val === undefined || val === null) return '""';
      const str = String(val).replace(/"/g, '""').replace(/\r?\n|\r/g, ' ');
      return `"${str}"`;
    };

    // Build Rows
    const rows = occurrences.map(o => {
      const schoolName = schools.find(s => s.id === o.schoolId)?.name || 'Desconhecida';
      const typeObj = OCCURRENCE_TYPES.find(t => t.label === o.type) || { code: 5 };
      
      return [
        escape(o.id),
        escape(o.schoolId),
        escape(schoolName),
        escape(o.date),
        escape(o.studentName),
        escape(o.gradeCycle),
        escape(o.className),
        escape(o.teacherName),
        escape(o.guardianName),
        escape(o.contacts),
        escape(o.type),
        typeObj.code,
        escape(o.subject),
        escape(o.referrals),
        escape(o.observations),
        escape(o.directorNotes),
        escape(o.createdByName)
      ];
    });

    // Join with semicolon (Standard in Brazil to open directly in Excel without import wizard)
    const csvContent = "\uFEFF" + [headers.join(';'), ...rows.map(r => r.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    
    const dateStr = new Date().toISOString().slice(0,10);
    link.setAttribute('download', `ocorrencias_export_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter & Search Logic
  const filteredOccurrences = occurrences.filter(o => {
    const matchesSearch = 
      o.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.guardianName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.subject && o.subject.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesType = filterType ? o.type === filterType : true;
    const matchesSchool = filterSchool ? o.schoolId === filterSchool : true;
    const matchesClass = filterClass ? o.className === filterClass : true;
    
    // In addition, if pedagogue, restrict list to their designated classes
    const matchesPedagogueClasses = 
      user && user.role === 'pedagogo' && user.classes && user.classes.length > 0
        ? user.classes.includes(o.className)
        : true;

    return matchesSearch && matchesType && matchesSchool && matchesClass && matchesPedagogueClasses;
  });

  // Calculate Metrics/Statistics for current school/context
  const getMetrics = () => {
    const activeOccurrences = filteredOccurrences;
    const total = activeOccurrences.length;
    const bullying = activeOccurrences.filter(o => o.type === 'Bullying').length;
    const homophobia = activeOccurrences.filter(o => o.type === 'Homofobia').length;
    const racism = activeOccurrences.filter(o => o.type === 'Racismo').length;
    const conflicts = activeOccurrences.filter(o => o.type === 'Conflito Verbal/Físico').length;
    const others = activeOccurrences.filter(o => o.type === 'Outros').length;

    return { total, bullying, homophobia, racism, conflicts, others };
  };

  const metrics = getMetrics();

  // Print PDF function
  const handlePrint = (occ) => {
    setSelectedOccurrence(occ);
    // Give state a brief moment to update printable template, then print
    setTimeout(() => {
      window.print();
    }, 150);
  };

  // Render Loading Splash Screen
  if (loading) {
    return (
      <div className="splash-screen-wrapper">
        <div className="splash-logo-container">
          <Logo style={{ width: '120px', height: '120px' }} />
          <div className="splash-text">
            <span className="splash-title">PERTENCER</span>
            <span className="splash-subtitle">AVALIADOR DE CLIMA ESCOLAR</span>
          </div>
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
                  Fluxo do App
                </button>
                <button 
                  type="button"
                  className={`tutorial-tab-btn ${tutorialTab === 'data_mgmt' ? 'active' : ''}`}
                  onClick={() => setTutorialTab('data_mgmt')}
                >
                  Adicionar/Remover
                </button>
              </div>

              <div className="tutorial-tab-content">
                {tutorialTab === 'welcome' && (
                  <p>
                    O <strong>PERTENCER</strong> é o avaliador de clima escolar para registro e monitoramento de ocorrências escolares (bullying, racismo, conflitos, etc.) da rede municipal. Navegue usando as contas de teste na próxima aba.
                  </p>
                )}

                {tutorialTab === 'roles' && (
                  <div>
                    <p style={{ marginBottom: '0.5rem' }}>Clique em um perfil para preencher os dados de login automaticamente:</p>
                    <div className="quick-login-grid">
                      <div 
                        className="quick-login-card" 
                        onClick={() => {
                          setLoginData({ cpf: '000.000.000-00', password: 'admin' });
                        }}
                      >
                        <span className="quick-login-role">🛡️ Gestor (Total)</span>
                        <span className="quick-login-creds">CPF: 000.000.000-00 | Senha: admin</span>
                      </div>
                      <div 
                        className="quick-login-card" 
                        onClick={() => {
                          setLoginData({ cpf: '111.111.111-11', password: 'senha' });
                        }}
                      >
                        <span className="quick-login-role">💼 Diretor (Escola)</span>
                        <span className="quick-login-creds">CPF: 111.111.111-11 | Senha: senha</span>
                      </div>
                      <div 
                        className="quick-login-card" 
                        onClick={() => {
                          setLoginData({ cpf: '222.222.222-22', password: 'senha' });
                        }}
                      >
                        <span className="quick-login-role">✏️ Pedagogo (Registro)</span>
                        <span className="quick-login-creds">CPF: 222.222.222-22 | Senha: senha</span>
                      </div>
                    </div>
                  </div>
                )}

                {tutorialTab === 'features' && (
                  <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <li><strong>Pedagogo:</strong> Registra ocorrências em formulário progressivo por etapas. Visualiza apenas turmas designadas e pode excluir suas próprias ocorrências.</li>
                    <li><strong>Diretor:</strong> Analisa ocorrências da escola e insere o plano de ação / visto da diretoria.</li>
                    <li><strong>Gestor:</strong> Cadastra escolas e usuários, acessa painel analítico consolidado, exclui qualquer ocorrência e exporta dados no formato SPSS (Excel/CSV).</li>
                  </ul>
                )}

                {tutorialTab === 'data_mgmt' && (
                  <div style={{ fontSize: '0.825rem' }}>
                    <p style={{ marginBottom: '0.25rem' }}><strong>Como Adicionar Dados:</strong></p>
                    <ul style={{ paddingLeft: '1.1rem', marginBottom: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                      <li>Entre como <strong>Pedagogo</strong> para adicionar **Ocorrências**.</li>
                      <li>Entre como <strong>Gestor</strong> para adicionar **Escolas** e **Usuários**.</li>
                    </ul>
                    <p style={{ marginBottom: '0.25rem' }}><strong>Como Remover Dados:</strong></p>
                    <ul style={{ paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                      <li>Entre como <strong>Gestor</strong> para remover **Escolas**, **Usuários** ou qualquer **Ocorrência** (botões "Excluir").</li>
                      <li>Entre como <strong>Pedagogo</strong> para remover **Ocorrências** que foram criadas por você.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <form className="login-card" onSubmit={handleLogin}>
          <div className="login-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '0.5rem' }}>
              <Logo style={{ width: '60px', height: '60px' }} />
              <div className="login-logo-block" style={{ textAlign: 'left' }}>
                <span className="login-logo-title">PERTENCER</span>
                <span className="login-logo-subtitle">AVALIADOR DE CLIMA ESCOLAR</span>
              </div>
            </div>
            <p className="login-subtitle">Sistema de Registro e Monitoramento de Ocorrências</p>
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

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            Entrar no Sistema
          </button>
        </form>
      </div>
    );
  }

  // Helper values to display progressive fields in step 1
  const isNameFilled = formData.studentName.trim().length >= 3;
  const isClassFilled = isNameFilled && formData.gradeCycle.trim() && formData.className.trim();
  const isTeacherGuardianFilled = isClassFilled && formData.teacherName.trim() && formData.guardianName.trim();

  // Helper values for step 2
  const isTypeSubjectFilled = formData.type && formData.subject.trim().length >= 10;

  // Helper values for step 3
  const isActionsFilled = formData.referrals.trim().length >= 5;

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <header className="navbar">
        <a href="#" className="navbar-brand" onClick={() => setActiveTab('dashboard')}>
          <Logo style={{ width: '48px', height: '48px' }} />
          <div className="navbar-logo-text">
            <span className="navbar-title">PERTENCER</span>
            <span className="navbar-subtitle">AVALIADOR DE CLIMA ESCOLAR</span>
          </div>
        </a>
        <div className="navbar-user">
          <div className="user-info">
            <div className="user-name">{user.name}</div>
            <div className="user-role">
              {user.role} {user.schoolName ? `| ${user.schoolName}` : ''}
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
            style={{ padding: '0.5rem 1rem', marginRight: '0.5rem', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            💡 Tutorial
          </button>

          <button className="btn btn-secondary" onClick={handleLogout} style={{ padding: '0.5rem 1rem' }}>
            Sair
          </button>
        </div>
      </header>

      {/* Main Dashboard / Content Area */}
      <main className="main-content">
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
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
          
          {user.role === 'gestor' && (
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

        {/* ----------------- TAB: DASHBOARD ----------------- */}
        {activeTab === 'dashboard' && !showForm && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2>Dashboard de Acompanhamento</h2>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {user.role === 'gestor' ? 'Visão global de todas as escolas' : `Visão geral: ${user.schoolName}`} | Hoje é {new Date().toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {user.role === 'pedagogo' && (
                  <button className="btn btn-primary" onClick={() => { setShowForm(true); setFormStep(1); }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><IconSchool /> Nova Ocorrência</span>
                  </button>
                )}
                {(user.role === 'gestor' || user.role === 'diretor') && (
                  <button className="btn btn-success" onClick={handleExportSPSS}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><IconFolder /> Exportar SPSS</span>
                  </button>
                )}
              </div>
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
                  <h4>Bullying</h4>
                  <div className="metric-value">{metrics.bullying}</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon homophobia" style={{ color: 'var(--danger)' }}><IconShield /></div>
                <div className="metric-details">
                  <h4>Homofobia</h4>
                  <div className="metric-value">{metrics.homophobia}</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon" style={{ backgroundColor: 'var(--danger-light)', color: 'var(--danger)' }}><IconUsers /></div>
                <div className="metric-details">
                  <h4>Racismo</h4>
                  <div className="metric-value">{metrics.racism}</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}><IconActivity /></div>
                <div className="metric-details">
                  <h4>Conflitos</h4>
                  <div className="metric-value">{metrics.conflicts}</div>
                </div>
              </div>
            </div>

            {/* Recent Occurrences Card */}
            <div className="card">
              <div className="card-header">
                <h3>Ocorrências Recentes</h3>
                <span className="badge badge-primary">{filteredOccurrences.length} encontrados</span>
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
                          {user.role === 'gestor' && <th>Escola</th>}
                          <th>Estudante</th>
                          <th>Turma</th>
                          <th>Tipo</th>
                          <th>Criado Por</th>
                          <th>Status</th>
                          <th style={{ textAlign: 'right' }}>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOccurrences.slice(0, 10).map(o => {
                          const schoolName = schools.find(s => s.id === o.schoolId)?.name || 'Desconhecida';
                          return (
                            <tr key={o.id}>
                              <td>{new Date(o.date).toLocaleDateString('pt-BR')}</td>
                              {user.role === 'gestor' && <td style={{ fontWeight: '500' }}>{schoolName}</td>}
                              <td>{o.studentName}</td>
                              <td>{o.className}</td>
                              <td>
                                <span className={`badge ${
                                  o.type === 'Bullying' ? 'badge-warning' :
                                  o.type === 'Homofobia' ? 'badge-danger' : 
                                  o.type === 'Racismo' ? 'badge-danger' : 'badge-primary'
                                }`}>
                                  {o.type}
                                </span>
                              </td>
                              <td style={{ color: 'var(--text-secondary)' }}>{o.createdByName}</td>
                              <td>
                                {o.directorNotes ? (
                                  <span className="badge badge-success">Visto Diretoria</span>
                                ) : (
                                  <span className="badge badge-warning">Pendente Visto</span>
                                )}
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                                  <button 
                                    className="btn btn-secondary" 
                                    style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                                    onClick={() => {
                                      setSelectedOccurrence(o);
                                      setDirectorNotes(o.directorNotes || '');
                                      setShowDetailModal(true);
                                    }}
                                  >
                                    Ver Detalhes
                                  </button>
                                  <button 
                                    className="btn btn-primary" 
                                    style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                                    onClick={() => handlePrint(o)}
                                  >
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IconPrinter /> PDF</span>
                                  </button>
                                  {(user.role === 'gestor' || o.createdById === user.id) && (
                                    <button 
                                      className="btn btn-danger" 
                                      style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem', backgroundColor: 'var(--danger)', color: 'white' }}
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
            <h2>Busca de Ocorrências</h2>
            
            {/* Filters Bar */}
            <div className="filters-bar">
              <input
                type="text"
                placeholder="Buscar por estudante, responsável ou relato..."
                className="form-control filter-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              
              {user.role === 'gestor' && (
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
                style={{ width: '180px' }} 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="">Todos os Tipos</option>
                {OCCURRENCE_TYPES.map(t => (
                  <option key={t.label} value={t.label}>{t.label}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Filtrar por Turma"
                className="form-control"
                style={{ width: '150px' }}
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
              />
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
                          {user.role === 'gestor' && <th>Escola</th>}
                          <th>Estudante</th>
                          <th>Turma</th>
                          <th>Responsável</th>
                          <th>Tipo</th>
                          <th>Criado Por</th>
                          <th>Status</th>
                          <th style={{ textAlign: 'right' }}>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOccurrences.map(o => {
                          const schoolName = schools.find(s => s.id === o.schoolId)?.name || 'Desconhecida';
                          return (
                            <tr key={o.id}>
                              <td>{new Date(o.date).toLocaleDateString('pt-BR')}</td>
                              {user.role === 'gestor' && <td style={{ fontWeight: '500' }}>{schoolName}</td>}
                              <td>{o.studentName}</td>
                              <td>{o.className}</td>
                              <td>{o.guardianName}</td>
                              <td>
                                <span className={`badge ${
                                  o.type === 'Bullying' ? 'badge-warning' :
                                  o.type === 'Homofobia' ? 'badge-danger' : 
                                  o.type === 'Racismo' ? 'badge-danger' : 'badge-primary'
                                }`}>
                                  {o.type}
                                </span>
                              </td>
                              <td style={{ color: 'var(--text-secondary)' }}>{o.createdByName}</td>
                              <td>
                                {o.directorNotes ? (
                                  <span className="badge badge-success">Visto Diretoria</span>
                                ) : (
                                  <span className="badge badge-warning">Pendente</span>
                                )}
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                                  <button 
                                    className="btn btn-secondary" 
                                    style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
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
                                    style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                                    onClick={() => handlePrint(o)}
                                  >
                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IconPrinter /> PDF</span>
                                  </button>
                                  {(user.role === 'gestor' || o.createdById === user.id) && (
                                    <button 
                                      className="btn btn-danger" 
                                      style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem', backgroundColor: 'var(--danger)', color: 'white' }}
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

        {/* ----------------- DYNAMIC PROGRESSIVE FORM ----------------- */}
        {showForm && (
          <div className="card fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="card-header">
              <h3>Registro de Atendimento aos Pais</h3>
              <button className="btn btn-secondary" onClick={() => setShowForm(false)}>
                Cancelar
              </button>
            </div>
            <div className="card-body">
              
              {/* Progressive Steps Indicator */}
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
                  <div className="step-label">Ações</div>
                </div>
                <div className={`step-item ${formStep >= 4 ? 'active' : ''}`}>
                  <div className="step-number">4</div>
                  <div className="step-label">Revisão</div>
                </div>
              </div>

              {/* STEP 1: IDENTIFICATION (WITH PROGRESSIVE FIELDS DISCLOSURE) */}
              {formStep === 1 && (
                <div className="fade-in">
                  <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    Passo 1: Identificação do Estudante e Responsável
                  </h4>
                  
                  <div className="form-grid">
                    {/* Always visible */}
                    <div className="form-group full-width">
                      <label className="form-label">Nome Completo do Estudante</label>
                      <input
                        type="text"
                        placeholder="Digite o nome do estudante..."
                        className="form-control"
                        value={formData.studentName}
                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                        required
                      />
                    </div>

                    {/* Appears when Name has >= 3 chars */}
                    {isNameFilled && (
                      <>
                        <div className="form-group fade-in">
                          <label className="form-label">Ano / Ciclo</label>
                          <input
                            type="text"
                            placeholder="Ex: 5º Ano"
                            className="form-control"
                            value={formData.gradeCycle}
                            onChange={(e) => setFormData({ ...formData, gradeCycle: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group fade-in">
                          <label className="form-label">Turma</label>
                          <input
                            type="text"
                            placeholder="Ex: 5º Ano A"
                            className="form-control"
                            value={formData.className}
                            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                            required
                          />
                        </div>
                      </>
                    )}

                    {/* Appears when Class fields are filled */}
                    {isClassFilled && (
                      <>
                        <div className="form-group fade-in">
                          <label className="form-label">Professora Regente</label>
                          <input
                            type="text"
                            placeholder="Nome da professora..."
                            className="form-control"
                            value={formData.teacherName}
                            onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group fade-in">
                          <label className="form-label">Nome do Responsável Atendido</label>
                          <input
                            type="text"
                            placeholder="Nome do pai, mãe ou tutor..."
                            className="form-control"
                            value={formData.guardianName}
                            onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                            required
                          />
                        </div>
                      </>
                    )}

                    {/* Appears when Teacher and Guardian names are filled */}
                    {isTeacherGuardianFilled && (
                      <>
                        <div className="form-group fade-in">
                          <label className="form-label">Contatos Telefônicos</label>
                          <input
                            type="text"
                            placeholder="Ex: (41) 99999-8888"
                            className="form-control"
                            value={formData.contacts}
                            onChange={(e) => setFormData({ ...formData, contacts: e.target.value })}
                            required
                          />
                        </div>
                        <div className="form-group fade-in">
                          <label className="form-label">Data do Atendimento</label>
                          <input
                            type="date"
                            className="form-control"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            required
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => setFormStep(2)}
                      disabled={!isTeacherGuardianFilled || !formData.contacts || !formData.date}
                    >
                      Continuar ➡️
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: OCCURRENCE INFORMATION */}
              {formStep === 2 && (
                <div className="fade-in">
                  <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    Passo 2: Assunto e Classificação do Atendimento
                  </h4>
                  
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label className="form-label">Tipo Principal de Ocorrência (Classificação)</label>
                      <select 
                        className="form-select"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        required
                      >
                        <option value="">Selecione a classificação...</option>
                        {OCCURRENCE_TYPES.map(t => (
                          <option key={t.label} value={t.label}>{t.label}</option>
                        ))}
                      </select>
                    </div>

                    {formData.type && (
                      <div className="form-group full-width fade-in">
                        <label className="form-label">Assunto / Descrição do Ocorrido</label>
                        <textarea
                          placeholder="Relate detalhadamente o ocorrido ou o motivo do atendimento aos pais..."
                          className="form-textarea"
                          style={{ minHeight: '180px' }}
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                        />
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                          Mínimo 10 caracteres. Atual: {formData.subject.trim().length}
                        </span>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                    <button className="btn btn-secondary" onClick={() => setFormStep(1)}>
                      ⬅️ Voltar
                    </button>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => setFormStep(3)}
                      disabled={!isTypeSubjectFilled}
                    >
                      Continuar ➡️
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: ACTION / REFERRALS */}
              {formStep === 3 && (
                <div className="fade-in">
                  <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    Passo 3: Encaminhamentos e Observações
                  </h4>
                  
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label className="form-label">Encaminhamentos (Ações Tomadas)</label>
                      <textarea
                        placeholder="Ex: Acordo firmado com os pais; Encaminhado para a psicologia escolar; Mudança de sala..."
                        className="form-textarea"
                        style={{ minHeight: '120px' }}
                        value={formData.referrals}
                        onChange={(e) => setFormData({ ...formData, referrals: e.target.value })}
                        required
                      />
                    </div>

                    {isActionsFilled && (
                      <div className="form-group full-width fade-in">
                        <label className="form-label">Observações Adicionais (Opcional)</label>
                        <textarea
                          placeholder="Notas complementares sobre o comportamento ou acordos adicionais..."
                          className="form-textarea"
                          style={{ minHeight: '100px' }}
                          value={formData.observations}
                          onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                        />
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                    <button className="btn btn-secondary" onClick={() => setFormStep(2)}>
                      ⬅️ Voltar
                    </button>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => setFormStep(4)}
                      disabled={!isActionsFilled}
                    >
                      Revisar Registro ➡️
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: REVIEW & SAVE */}
              {formStep === 4 && (
                <div className="fade-in">
                  <h4 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    Passo 4: Confirmar Registro de Atendimento
                  </h4>

                  <div style={{ backgroundColor: 'var(--bg-app)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                    <p style={{ marginBottom: '0.5rem' }}><strong>Estudante:</strong> {formData.studentName} ({formData.gradeCycle} - {formData.className})</p>
                    <p style={{ marginBottom: '0.5rem' }}><strong>Responsável:</strong> {formData.guardianName} | <strong>Contato:</strong> {formData.contacts}</p>
                    <p style={{ marginBottom: '0.5rem' }}><strong>Professora:</strong> {formData.teacherName} | <strong>Data:</strong> {new Date(formData.date).toLocaleDateString('pt-BR')}</p>
                    <p style={{ marginBottom: '0.5rem' }}><strong>Classificação:</strong> <span className="badge badge-primary">{formData.type}</span></p>
                    
                    <div style={{ marginTop: '1rem', borderTop: '1px dashed var(--border-color)', paddingTop: '1rem' }}>
                      <p><strong>Assunto (Ocorrido):</strong></p>
                      <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.25rem' }}>{formData.subject}</p>
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                      <p><strong>Encaminhamentos:</strong></p>
                      <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.25rem' }}>{formData.referrals}</p>
                    </div>

                    {formData.observations && (
                      <div style={{ marginTop: '1rem' }}>
                        <p><strong>Observações:</strong></p>
                        <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: '0.25rem' }}>{formData.observations}</p>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                    <button className="btn btn-secondary" onClick={() => setFormStep(3)}>
                      ⬅️ Editar Dados
                    </button>
                    <button className="btn btn-success" onClick={handleSaveOccurrence}>
                      💾 Salvar Registro e Finalizar
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* ----------------- TAB: GERENCIAR ESCOLAS (GESTOR ONLY) ----------------- */}
        {activeTab === 'schools' && user.role === 'gestor' && (
          <div className="fade-in">
            <h2>Gerenciamento de Escolas</h2>
            
            <div className="form-grid" style={{ gridTemplateColumns: '1fr 2fr', gap: '1.5rem', alignItems: 'start' }}>
              
              {/* Form: Create/Edit School */}
              <div className="card">
                <div className="card-header">
                  <h3>{editingSchool ? 'Editar Escola' : 'Cadastrar Nova Escola'}</h3>
                </div>
                <form className="card-body" onSubmit={handleCreateSchool}>
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

              {/* List: Existing Schools */}
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
                                  onClick={() => handleDeleteSchool(s.id)}
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

        {/* ----------------- TAB: GERENCIAR USUÁRIOS (GESTOR ONLY) ----------------- */}
        {activeTab === 'users' && user.role === 'gestor' && (
          <div className="fade-in">
            <h2>Gerenciamento de Usuários</h2>
            
            <div className="form-grid" style={{ gridTemplateColumns: '1fr 2fr', gap: '1.5rem', alignItems: 'start' }}>
              
              {/* Form: Create User */}
              <div className="card">
                <div className="card-header">
                  <h3>Cadastrar Novo Usuário</h3>
                </div>
                <form className="card-body" onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
                    <label className="form-label">CPF (Acesso)</label>
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
                      <option value="pedagogo">Pedagogo (Lançamento e turmas)</option>
                      <option value="diretor">Diretor (Monitora escola e notas)</option>
                      <option value="gestor">Gestor do Projeto (Administração total)</option>
                    </select>
                  </div>

                  {newUserData.role !== 'gestor' && (
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
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        O pedagogo só visualizará ocorrências dessas turmas.
                      </span>
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                    Cadastrar Usuário
                  </button>
                </form>
              </div>

              {/* List: Existing Users */}
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
                          const schoolName = schools.find(s => s.id === u.schoolId)?.name || 'Nenhuma/Gestor';
                          return (
                            <tr key={u.id}>
                              <td style={{ fontWeight: '600' }}>{u.name}</td>
                              <td>{u.cpf}</td>
                              <td>
                                <span className={`badge ${
                                  u.role === 'gestor' ? 'badge-danger' : 
                                  u.role === 'diretor' ? 'badge-primary' : 'badge-success'
                                }`}>
                                  {u.role}
                                </span>
                              </td>
                              <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {schoolName}
                              </td>
                              <td>
                                {u.classes && u.classes.length > 0 
                                  ? u.classes.join(', ')
                                  : '-'}
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                {u.id !== user.id && (
                                  <button 
                                    className="btn btn-danger" 
                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                                    onClick={() => handleDeleteUser(u.id)}
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

        {/* ----------------- TAB: RELATÓRIOS (GESTOR ONLY) ----------------- */}
        {activeTab === 'reports' && user.role === 'gestor' && (
          <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2>Relatório Consolidado de Clima Escolar</h2>
                <p style={{ color: 'var(--text-secondary)' }}>Visão analítica completa das ocorrências na rede municipal de ensino</p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button className="btn btn-primary" onClick={() => window.print()}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IconPrinter /> Imprimir Relatório Geral</span>
                </button>
                <button className="btn btn-success" onClick={handleExportSPSS}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><IconFolder /> Exportar SPSS</span>
                </button>
              </div>
            </div>

            {/* General Metrics Grid */}
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
                  <div className="metric-value">
                    {occurrences.filter(o => o.directorNotes).length}
                  </div>
                </div>
              </div>
            </div>

            <div className="form-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'start', marginBottom: '1.5rem' }}>
              
              {/* Card: Ocorrências por Categoria */}
              <div className="card">
                <div className="card-header">
                  <h3>Ocorrências por Classificação (Rede)</h3>
                </div>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {OCCURRENCE_TYPES.map(t => {
                    const count = occurrences.filter(o => o.type === t.label).length;
                    const percent = occurrences.length > 0 ? ((count / occurrences.length) * 100).toFixed(0) : 0;
                    return (
                      <div key={t.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: '600' }}>
                          <span>{t.label}</span>
                          <span style={{ color: 'var(--text-secondary)' }}>{count} ({percent}%)</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${percent}%`, height: '100%', backgroundColor: t.label === 'Bullying' ? 'var(--warning)' : t.label === 'Homofobia' ? 'var(--danger)' : t.label === 'Racismo' ? 'var(--primary)' : 'var(--success)', borderRadius: '4px' }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Card: Ocorrências por Escola */}
              <div className="card">
                <div className="card-header">
                  <h3>Registros de Ocorrências por Escola</h3>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Escola</th>
                          <th style={{ textAlign: 'center' }}>Registros</th>
                          <th style={{ width: '150px' }}>Visualização</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schools.map(s => {
                          const count = occurrences.filter(o => o.schoolId === s.id).length;
                          const maxCount = Math.max(...schools.map(sch => occurrences.filter(o => o.schoolId === sch.id).length), 1);
                          const percent = ((count / maxCount) * 100).toFixed(0);
                          return (
                            <tr key={s.id}>
                              <td style={{ fontWeight: '600' }}>{s.name}</td>
                              <td style={{ textAlign: 'center', fontWeight: 'bold', color: 'var(--primary)' }}>{count}</td>
                              <td>
                                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                                  <div style={{ width: `${percent}%`, height: '100%', backgroundColor: 'var(--accent-orange)', borderRadius: '4px' }}></div>
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
          </div>
        )}

      </main>

      {/* DETAIL MODAL (With Director's observation editing) */}
      {showDetailModal && selectedOccurrence && (
        <div className="modal-overlay" onClick={() => { setShowDetailModal(false); setSelectedOccurrence(null); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">
              <h3>Detalhes do Atendimento</h3>
              <button className="btn btn-secondary" onClick={() => { setShowDetailModal(false); setSelectedOccurrence(null); }}>
                Fechar
              </button>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
              <p><strong>Estudante:</strong> {selectedOccurrence.studentName} ({selectedOccurrence.gradeCycle} - {selectedOccurrence.className})</p>
              <p><strong>Responsável:</strong> {selectedOccurrence.guardianName} | <strong>Contato:</strong> {selectedOccurrence.contacts}</p>
              <p><strong>Professora Regente:</strong> {selectedOccurrence.teacherName}</p>
              <p><strong>Data da Ocorrência:</strong> {new Date(selectedOccurrence.date).toLocaleDateString('pt-BR')}</p>
              <p><strong>Tipo (SPSS Classificação):</strong> <span className="badge badge-primary">{selectedOccurrence.type}</span></p>
              
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                <strong>Assunto (Ocorrido):</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{selectedOccurrence.subject}</p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                <strong>Encaminhamentos tomados:</strong>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{selectedOccurrence.referrals}</p>
              </div>

              {selectedOccurrence.observations && (
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                  <strong>Observações do Pedagogo:</strong>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', whiteSpace: 'pre-wrap' }}>{selectedOccurrence.observations}</p>
                </div>
              )}

              {/* View/Edit Section for Director Notes */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', backgroundColor: 'var(--bg-app)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <strong>Observações da Diretoria (Visto/Acompanhamento)</strong>
                
                {user.role === 'diretor' || user.role === 'gestor' ? (
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

      {/* ----------------- HIDDEN PRINTABLE TEMPLATE (A4 PAGE SIZE) ----------------- */}
      {selectedOccurrence && (
        <div className="printable-report">
          <div className="print-header">
            <Logo style={{ width: '60px', height: '60px', marginRight: '10px' }} />
            <div className="print-title-block">
              <div className="print-school-name">
                {schools.find(s => s.id === selectedOccurrence.schoolId)?.name || 'ESCOLA MUNICIPAL'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', margin: '4px 0', lineHeight: '1.1' }}>
                <span style={{ fontSize: '10pt', fontWeight: 'bold', letterSpacing: '0.05em', color: '#1c355e' }}>PERTENCER</span>
                <span style={{ fontSize: '7pt', fontWeight: 'bold', color: '#246949' }}>AVALIADOR DE CLIMA ESCOLAR</span>
              </div>
              <div className="print-doc-title">REGISTRO DE ATENDIMENTO AOS PAIS</div>
            </div>
          </div>

          <div className="print-fields-grid">
            <div className="print-field col-6">
              <span className="print-field-label">Estudante:</span> {selectedOccurrence.studentName}
            </div>
            <div className="print-field col-2">
              <span className="print-field-label">Ano/Ciclo:</span> {selectedOccurrence.gradeCycle}
            </div>
            <div className="print-field col-2">
              <span className="print-field-label">Turma:</span> {selectedOccurrence.className}
            </div>
            <div className="print-field col-2">
              <span className="print-field-label">Profª:</span> {selectedOccurrence.teacherName}
            </div>
            <div className="print-field col-6">
              <span className="print-field-label">Nome do Responsável:</span> {selectedOccurrence.guardianName}
            </div>
            <div className="print-field col-2">
              <span className="print-field-label">Data:</span> {new Date(selectedOccurrence.date).toLocaleDateString('pt-BR')}
            </div>
            <div className="print-field col-4">
              <span className="print-field-label">Contatos:</span> {selectedOccurrence.contacts}
            </div>
          </div>

          <div className="print-section">
            <div className="print-section-title">Assunto (Relato do Ocorrido)</div>
            <div className="print-section-content">{selectedOccurrence.subject}</div>
          </div>

          <div className="print-section">
            <div className="print-section-title">Encaminhamentos Tomados</div>
            <div className="print-section-content">{selectedOccurrence.referrals}</div>
          </div>

          <div className="print-section">
            <div className="print-section-title">Observações Complementares</div>
            <div className="print-section-content short">
              {selectedOccurrence.observations || 'Nenhuma.'}
              {selectedOccurrence.directorNotes && (
                <div style={{ marginTop: '10px', borderTop: '1px dashed #cccccc', paddingTop: '5px' }}>
                  <strong>Acompanhamento da Diretoria:</strong> {selectedOccurrence.directorNotes}
                </div>
              )}
            </div>
          </div>

          <div className="print-signatures-block">
            <div className="print-signature-line">
              Responsável (Pai/Mãe/Tutor)
            </div>
            <div className="print-signature-line">
              Estudante
            </div>
            <div className="print-signature-line" style={{ marginTop: '30px' }}>
              Pedagoga Responsável
            </div>
            <div className="print-signature-line" style={{ marginTop: '30px' }}>
              Professora Regente
            </div>
          </div>
        </div>
      )}

      {/* ----------------- HIDDEN PRINTABLE CONSOLIDATED REPORT (A4) ----------------- */}
      {!selectedOccurrence && (
        <div className="printable-report-summary">
          <div className="print-header">
            <Logo style={{ width: '60px', height: '60px', marginRight: '10px' }} />
            <div className="print-title-block">
              <div className="print-school-name">REDE MUNICIPAL DE ENSINO</div>
              <div style={{ display: 'flex', flexDirection: 'column', margin: '4px 0', lineHeight: '1.1' }}>
                <span style={{ fontSize: '10pt', fontWeight: 'bold', letterSpacing: '0.05em', color: '#1c355e' }}>PERTENCER</span>
                <span style={{ fontSize: '7pt', fontWeight: 'bold', color: '#246949' }}>AVALIADOR DE CLIMA ESCOLAR</span>
              </div>
              <div className="print-doc-title">RELATÓRIO CONSOLIDADO DE GESTÃO</div>
            </div>
          </div>

          <div style={{ fontSize: '11pt', marginBottom: '20px', display: 'flex', gap: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
            <p style={{ margin: 0 }}><strong>Data de Emissão:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
            <p style={{ margin: 0 }}><strong>Total de Escolas:</strong> {schools.length}</p>
            <p style={{ margin: 0 }}><strong>Total de Ocorrências:</strong> {occurrences.length}</p>
          </div>

          <div className="print-section">
            <div className="print-section-title">Ocorrências por Tipo</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #1c355e' }}>
                  <th style={{ textAlign: 'left', padding: '5px', color: '#1c355e' }}>Classificação</th>
                  <th style={{ textAlign: 'center', padding: '5px', color: '#1c355e' }}>Registros</th>
                  <th style={{ textAlign: 'right', padding: '5px', color: '#1c355e' }}>Porcentagem</th>
                </tr>
              </thead>
              <tbody>
                {OCCURRENCE_TYPES.map(t => {
                  const count = occurrences.filter(o => o.type === t.label).length;
                  const percent = occurrences.length > 0 ? ((count / occurrences.length) * 100).toFixed(0) : 0;
                  return (
                    <tr key={t.label} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '8px 5px', fontWeight: 'bold' }}>{t.label}</td>
                      <td style={{ textAlign: 'center', padding: '8px 5px' }}>{count}</td>
                      <td style={{ textAlign: 'right', padding: '8px 5px' }}>{percent}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="print-section" style={{ marginTop: '30px' }}>
            <div className="print-section-title">Ocorrências por Escola</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #1c355e' }}>
                  <th style={{ textAlign: 'left', padding: '5px', color: '#1c355e' }}>Nome da Escola</th>
                  <th style={{ textAlign: 'center', padding: '5px', color: '#1c355e' }}>Total de Ocorrências</th>
                </tr>
              </thead>
              <tbody>
                {schools.map(s => {
                  const count = occurrences.filter(o => o.schoolId === s.id).length;
                  return (
                    <tr key={s.id} style={{ borderBottom: '1px solid #ddd' }}>
                      <td style={{ padding: '8px 5px', fontWeight: 'bold' }}>{s.name}</td>
                      <td style={{ textAlign: 'center', padding: '8px 5px' }}>{count}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TUTORIAL MODAL FOR LOGGED-IN USERS */}
      {showTutorialModal && (
        <div className="modal-overlay" onClick={() => setShowTutorialModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>💡 Tutorial e Guia do Sistema</h3>
              <button className="btn btn-secondary" onClick={() => setShowTutorialModal(false)}>
                Fechar
              </button>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', overflowY: 'auto', maxHeight: '75vh', padding: '1.5rem' }}>
              <div>
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Apresentação</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  O sistema <strong>PERTENCER</strong> é uma ferramenta de avaliação e monitoramento de clima escolar. Ele centraliza o registro de ocorrências (bullying, homofobia, racismo, conflitos) e o acompanhamento pedagógico e diretivo.
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Perfis de Acesso e Funcionalidades</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--accent-green)' }}>
                    <strong>🛡️ Gestor (Elisabette Leo)</strong>
                    <ul style={{ paddingLeft: '1.2rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                      <li>Cadastrar novas escolas na aba "Gerenciar Escolas".</li>
                      <li>Cadastrar e remover usuários na aba "Gerenciar Usuários".</li>
                      <li>Visualizar estatísticas consolidadas e relatórios gráficos.</li>
                      <li>Excluir qualquer ocorrência do sistema.</li>
                      <li>Exportar todos os dados em formato SPSS (.csv estruturado para estatística).</li>
                    </ul>
                  </div>

                  <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--accent-orange)' }}>
                    <strong>💼 Diretor (Diretor Wancleber)</strong>
                    <ul style={{ paddingLeft: '1.2rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                      <li>Visualizar todas as ocorrências de sua escola.</li>
                      <li>Inserir "Visto da Diretoria" e registrar planos de ação/observações no modal de detalhes.</li>
                      <li>Exportar os dados específicos de sua escola em formato SPSS.</li>
                    </ul>
                  </div>

                  <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--primary)' }}>
                    <strong>✏️ Pedagogo (Pedagoga Maria Silva / Ana Costa)</strong>
                    <ul style={{ paddingLeft: '1.2rem', marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                      <li>Registrar novas ocorrências através do formulário por etapas (Passos 1, 2 e 3).</li>
                      <li>Visualizar e filtrar ocorrências das turmas designadas a você.</li>
                      <li>Imprimir relatórios individuais em formato de folha A4 com campos de assinatura para pais e escola.</li>
                      <li>Excluir ocorrências que foram criadas por você mesmo.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Remoção e Adição de Dados</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Este app permite a manipulação em tempo real dos dados (salvos localmente no servidor):
                </p>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  <li>Para **adicionar** dados: utilize as opções "Nova Ocorrência", "Criar Escola" ou "Criar Usuário" em suas respectivas abas.</li>
                  <li>Para **remover** dados: clique no botão "Excluir" correspondente a usuários (Gestor), escolas (Gestor) ou ocorrências (Gestor ou o Pedagogo criador).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
