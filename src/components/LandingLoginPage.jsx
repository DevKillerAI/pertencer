import React, { useState } from 'react';

// ==========================================
// ÍCONES VETORIAIS SVG EM ALTA RESOLUÇÃO
// ==========================================

export const IconEscuta = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="white"/>
  </svg>
);

export const IconDados = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="12" width="4" height="9" rx="1" fill="white" />
    <rect x="10" y="7" width="4" height="14" rx="1" fill="white" />
    <rect x="17" y="3" width="4" height="18" rx="1" fill="white" />
  </svg>
);

export const IconSeguranca = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="white"/>
  </svg>
);

export const IconEscolasPiloto = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="#1b4d3e"/>
  </svg>
);

export const IconAlunosPiloto = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.66-3.3-1-4.5-1C5.17 13 2 14.17 2 16.5V19h15v-2.5c0-2.33-3.17-3.5-5.5-3.5zm-9-2a3 3 0 100-6 3 3 0 000 6zm9 0a3 3 0 100-6 3 3 0 000 6z" fill="#0284c7"/>
  </svg>
);

export const IconExpansaoPiloto = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" fill="#047857"/>
  </svg>
);

// ==========================================
// COMPONENTE PRINCIPAL: LANDING & LOGIN PAGE
// ==========================================

export default function LandingLoginPage({
  credentials,
  setCredentials,
  onLogin,
  loading,
  error,
  onOpenRegister
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(e);
    }
  };

  return (
    <div className="pome-landing-page">
      <div className="pome-landing-container">
        
        {/* =========================================================================
            COLUNA DA ESQUERDA: APRESENTAÇÃO INSTITUCIONAL & PROJETO PILOTO
            ========================================================================= */}
        <div className="pome-landing-left">
          
          {/* Header Institucional: Logo POME Ampliada + Card Parceria Prefeitura */}
          <div className="landing-top-bar">
            
            {/* Logo Oficial POME com Slogan Integrado em Alta Resolução */}
            <div className="landing-pome-logo-wrap">
              <img 
                src="/logo-vetor.svg" 
                alt="POME - Plataforma de Observação e Melhoria do Clima Escolar" 
                className="pome-main-logo"
              />
            </div>

            {/* Caixa Parceria Oficial Prefeitura de Contagem */}
            <div className="landing-partner-badge-card">
              <span className="partner-label">Em parceria com</span>
              <img 
                src="/prefeitura-contagem.png" 
                alt="Prefeitura de Contagem" 
                className="prefeitura-logo-main"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="pilot-pill-badge">PROJETO PILOTO</span>
            </div>

          </div>

          {/* Headline de Impacto com Destaque nas Cores Oficiais */}
          <div className="landing-hero-text">
            <h1 className="hero-title">
              Clima escolar melhor,<br />
              com escuta, registro e <span className="highlight-green">acompanhamento.</span>
            </h1>
            <p className="hero-subtitle">
              Uma plataforma para apoiar o registro de ocorrências, a escuta ativa e a análise do clima escolar.
            </p>
          </div>

          {/* Grid de Benefícios e Métricas */}
          <div className="landing-features-and-stats">
            
            {/* 3 Cards de Benefícios */}
            <div className="benefit-cards-grid">
              
              {/* Card 1: Escuta e Comunicação */}
              <div className="benefit-card benefit-green">
                <div className="benefit-icon-badge" style={{ backgroundColor: '#15803d' }}>
                  <IconEscuta />
                </div>
                <h3 className="benefit-title">Escuta e Comunicação</h3>
                <p className="benefit-desc">
                  Registra ocorrências, apoia a escuta ativa e orienta a comunicação não violenta.
                </p>
              </div>

              {/* Card 2: Dados que orientam */}
              <div className="benefit-card benefit-blue">
                <div className="benefit-icon-badge" style={{ backgroundColor: '#0284c7' }}>
                  <IconDados />
                </div>
                <h3 className="benefit-title">Dados que orientam</h3>
                <p className="benefit-desc">
                  Acompanha indicadores, organiza informações e orienta decisões mais assertivas.
                </p>
              </div>

              {/* Card 3: Ambiente seguro */}
              <div className="benefit-card benefit-orange">
                <div className="benefit-icon-badge" style={{ backgroundColor: '#ea580c' }}>
                  <IconSeguranca />
                </div>
                <h3 className="benefit-title">Ambiente seguro</h3>
                <p className="benefit-desc">
                  Restringe acessos, protege dados e fortalece a privacidade.
                </p>
              </div>

            </div>

            {/* Coluna Lateral de Métricas do Projeto Piloto */}
            <div className="pilot-metrics-list">
              
              <div className="metric-item">
                <div className="metric-icon-circle green">
                  <IconEscolasPiloto />
                </div>
                <div className="metric-content">
                  <strong className="metric-value green">10</strong>
                  <span className="metric-label">escolas participantes</span>
                </div>
              </div>

              <div className="metric-item">
                <div className="metric-icon-circle blue">
                  <IconAlunosPiloto />
                </div>
                <div className="metric-content">
                  <span className="metric-prefix">mais de</span>
                  <strong className="metric-value blue">1.000</strong>
                  <span className="metric-label">alunos atendidos</span>
                </div>
              </div>

              <div className="metric-item">
                <div className="metric-icon-circle light-green">
                  <IconExpansaoPiloto />
                </div>
                <div className="metric-content">
                  <strong className="metric-label-highlight">uso inicial<br />em expansão</strong>
                </div>
              </div>

            </div>

          </div>

          {/* Imagem Oficial do Caminho para a Escola (Arquivo criado pelo usuário) */}
          <div className="landing-illustration-wrap">
            <img 
              src="/caminho-para-a-escola.png" 
              alt="Estudantes a caminho da Escola Municipal" 
              className="caminho-escola-img"
              onError={(e) => {
                // Fallback caso a imagem precise de recarregamento
                e.target.src = '/caminho_para_a_escola_vector_300_sem_falhas_preview.png';
              }}
            />
          </div>

        </div>

        {/* =========================================================================
            COLUNA DA DIREITA: CARD DE LOGIN E ACESSO AO SISTEMA
            ========================================================================= */}
        <div className="pome-landing-right">
          
          <div className="login-card-elevated">
            
            <div className="login-card-header">
              <h2 className="login-card-title">Acesse sua conta</h2>
              <p className="login-card-subtitle">
                Ambiente de acesso para escolas participantes do projeto piloto.
              </p>
            </div>

            {error && (
              <div className="login-error-alert" role="alert">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              
              {/* Campo: E-mail Institucional ou CPF */}
              <div className="login-form-group">
                <label className="login-field-label" htmlFor="input-username">
                  E-mail institucional ou CPF
                </label>
                <div className="login-input-with-icon">
                  <span className="input-leading-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </span>
                  <input
                    id="input-username"
                    type="text"
                    placeholder="seu.email@edu.contagem.mg.gov.br"
                    className="login-input-field"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Campo: Senha */}
              <div className="login-form-group">
                <label className="login-field-label" htmlFor="input-password">
                  Senha
                </label>
                <div className="login-input-with-icon">
                  <span className="input-leading-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </span>
                  <input
                    id="input-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    className="login-input-field"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="input-trailing-action"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                    aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Opções adicionais: Lembrar meu acesso */}
              <div className="login-options-row">
                <label className="remember-me-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="remember-checkbox"
                  />
                  <span>Lembrar meu acesso</span>
                </label>
              </div>

              {/* Botão Entrar */}
              <button 
                type="submit" 
                className="btn-login-submit"
                disabled={loading}
              >
                <span className="btn-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <span>{loading ? 'Validando acesso...' : 'Entrar no sistema'}</span>
              </button>

              {/* Divisor */}
              <div className="login-divider">
                <span>ou</span>
              </div>

              {/* Botão Cadastre-se */}
              <button 
                type="button" 
                className="btn-register-outline"
                onClick={onOpenRegister}
              >
                <span className="btn-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="8.5" cy="7" r="4"/>
                    <line x1="20" y1="8" x2="20" y2="14"/>
                    <line x1="23" y1="11" x2="17" y2="11"/>
                  </svg>
                </span>
                <span>Cadastre-se</span>
              </button>

            </form>

            {/* Aviso Informativo do Projeto Piloto */}
            <div className="pilot-disclaimer-box">
              <span className="disclaimer-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
              </span>
              <p className="disclaimer-text">
                Este é um projeto piloto. O uso e os dados são restritos às escolas participantes e utilizados para aprimoramento da plataforma.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Rodapé Institucional */}
      <footer className="pome-landing-footer">
        <span>© 2026 devKiller</span>
      </footer>
    </div>
  );
}
