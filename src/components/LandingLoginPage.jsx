import React, { useState } from 'react';

// =========================================================================
// ÍCONES VETORIAIS SVG EM ALTA DEFINIÇÃO (FIÉIS À REFERÊNCIA DO DESIGN)
// =========================================================================

export const IconEscuta = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="white"/>
  </svg>
);

export const IconDados = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="12" width="4.5" height="9" rx="1.2" fill="white" />
    <rect x="9.75" y="7" width="4.5" height="14" rx="1.2" fill="white" />
    <rect x="16.5" y="3" width="4.5" height="18" rx="1.2" fill="white" />
  </svg>
);

export const IconSeguranca = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="white"/>
  </svg>
);

// Ícone 1: Escola Municipal (exato da imagem)
export const IconEscolaVertical = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2v3m0 0h2.5l-1-1.5 1-1.5H12" stroke="#0e6b34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="#0e6b34"/>
    <path d="M3 9l9-5 9 5" stroke="#0e6b34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9" stroke="#0e6b34" strokeWidth="2"/>
    <path d="M10 21v-5a1 1 0 011-1h2a1 1 0 011 1v5" fill="#0e6b34"/>
    <rect x="7" y="11" width="2.5" height="2.5" rx="0.5" fill="#0e6b34"/>
    <rect x="14.5" y="11" width="2.5" height="2.5" rx="0.5" fill="#0e6b34"/>
  </svg>
);

// Ícone 2: Grupo de Estudantes (exato da imagem)
export const IconAlunosVertical = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="#0077a8" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="7" r="3" />
    <path d="M12 11c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" />
    <circle cx="5" cy="9" r="2" />
    <path d="M5 12c-.55 0-1.07.08-1.56.22C2.56 12.5 2 13.2 2 14.05V17h3v-2.5c0-.85.34-1.63.92-2.22-.3-.18-.6-.28-.92-.28z" />
    <circle cx="19" cy="9" r="2" />
    <path d="M19 12c-.32 0-.62.1-.92.28.58.59.92 1.37.92 2.22V17h3v-2.95c0-.85-.56-1.55-1.44-1.83-.49-.14-1.01-.22-1.56-.22z" />
  </svg>
);

// Ícone 3: Barras e Seta de Crescimento (exato da imagem)
export const IconExpansaoVertical = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="14" width="3.5" height="7" rx="1" fill="#0e6b34" />
    <rect x="9" y="10" width="3.5" height="11" rx="1" fill="#0e6b34" />
    <rect x="15" y="6" width="3.5" height="15" rx="1" fill="#0e6b34" />
    <path d="M4 10l6-5 4 4 6-6" stroke="#0e6b34" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 3h5v5" stroke="#0e6b34" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
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
          
          {/* Seção Superior Dividida: Conteúdo à Esquerda e Coluna de Parceiro/Métricas à Direita */}
          <div className="landing-main-split-row">
            
            {/* Lado Esquerdo do Bloco Principal */}
            <div className="landing-content-column">
              
              {/* Logo Oficial POME com Slogan Integrado */}
              <div className="landing-pome-logo-wrap">
                <img 
                  src="/logo-vetor.svg" 
                  alt="POME - Plataforma de Observação da Melhoria do Clima Escolar" 
                  className="pome-main-logo"
                />
              </div>

              {/* Headline de Impacto com Destaque nas 3 Cores Exatas da Imagem */}
              <div className="landing-hero-text">
                <h1 className="hero-title">
                  <span className="hero-line-navy">Clima escolar melhor,</span><br />
                  <span className="hero-line-teal">com escuta, registro e</span><br />
                  <span className="hero-line-green">acompanhamento.</span>
                </h1>
                <p className="hero-subtitle">
                  Uma plataforma para apoiar o registro de ocorrências, a mediação e a análise do clima escolar.
                </p>
              </div>

              {/* 3 Cards de Benefícios Horizontais */}
              <div className="benefit-cards-grid">
                
                {/* Card 1: Escuta e Comunicação */}
                <div className="benefit-card benefit-green">
                  <div className="benefit-icon-badge" style={{ backgroundColor: '#10753d' }}>
                    <IconEscuta />
                  </div>
                  <h3 className="benefit-title">Escuta e<br />Comunicação</h3>
                  <p className="benefit-desc">
                    Registra ocorrências, apoia a escuta ativa e orienta a comunicação não violenta.
                  </p>
                </div>

                {/* Card 2: Dados que orientam */}
                <div className="benefit-card benefit-blue">
                  <div className="benefit-icon-badge" style={{ backgroundColor: '#0284c7' }}>
                    <IconDados />
                  </div>
                  <h3 className="benefit-title">Dados que<br />orientam</h3>
                  <p className="benefit-desc">
                    Acompanha indicadores, organiza informações e orienta decisões mais assertivas.
                  </p>
                </div>

                {/* Card 3: Ambiente seguro */}
                <div className="benefit-card benefit-orange">
                  <div className="benefit-icon-badge" style={{ backgroundColor: '#ea580c' }}>
                    <IconSeguranca />
                  </div>
                  <h3 className="benefit-title">Ambiente<br />seguro</h3>
                  <p className="benefit-desc">
                    Restringe acessos, protege dados e fortalece a privacidade.
                  </p>
                </div>

              </div>

            </div>

            {/* Lado Direito do Bloco Principal: Coluna com Card da Prefeitura + 3 Métricas */}
            <div className="landing-partner-and-metrics-column">
              
              {/* Card da Prefeitura de Contagem + PROJETO PILOTO */}
              <div className="landing-partner-badge-card">
                <span className="partner-label">Em parceria com</span>
                <img 
                  src="/prefeitura-contagem.png" 
                  alt="Prefeitura de Contagem" 
                  className="prefeitura-logo-main"
                  onError={(e) => {
                    e.target.src = '/prefeitura de contagem.png';
                  }}
                />
                <span className="pilot-pill-badge">PROJETO PILOTO</span>
              </div>

              {/* Lista Vertical de Métricas Centradas com Divisórias */}
              <div className="pilot-metrics-vertical-list">
                
                {/* Métrica 1 */}
                <div className="metric-item-centered">
                  <div className="metric-icon-circle green">
                    <IconEscolaVertical />
                  </div>
                  <strong className="metric-value green">10</strong>
                  <span className="metric-label blue-link">escolas<br />participando</span>
                </div>

                <div className="metric-divider-line"></div>

                {/* Métrica 2 */}
                <div className="metric-item-centered">
                  <div className="metric-icon-circle blue">
                    <IconAlunosVertical />
                  </div>
                  <span className="metric-prefix blue-link">mais de</span>
                  <strong className="metric-value blue">1.000</strong>
                  <span className="metric-label blue-link">alunos<br />atendidos</span>
                </div>

                <div className="metric-divider-line"></div>

                {/* Métrica 3 */}
                <div className="metric-item-centered">
                  <div className="metric-icon-circle cream">
                    <IconExpansaoVertical />
                  </div>
                  <strong className="metric-label-highlight">uso inicial<br />em expansão</strong>
                </div>

              </div>

            </div>

          </div>

          {/* Imagem Panorâmica: Estudantes a Caminho da Escola */}
          <div className="landing-illustration-wrap">
            <img 
              src="/caminho-para-a-escola.png" 
              alt="Estudantes a caminho da Escola Municipal" 
              className="caminho-escola-img"
              onError={(e) => {
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
            
            {/* Banner Ilustrado Superior da Sala de Aula (SVG ultra fiel) */}
            <div className="login-card-banner">
              <img 
                src="/sala_de_aula_svg_ultra_fiel.svg" 
                alt="Sala de aula com professora e estudantes" 
                className="login-classroom-img"
              />
            </div>

            {/* Conteúdo e Formulário de Login */}
            <div className="login-card-content">
              
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
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

                {/* Botão Entrar no sistema */}
                <button 
                  type="submit" 
                  className="btn-login-submit"
                  disabled={loading}
                >
                  <span className="btn-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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

      </div>

      {/* Rodapé Institucional DevKiller */}
      <footer className="pome-landing-footer">
        <span>© 2026 DevKiller. Todos os direitos reservados.</span>
      </footer>
    </div>
  );
}
