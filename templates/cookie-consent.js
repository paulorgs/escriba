/**
 * Cookie Consent Manager para Escriba
 * Gerencia o consentimento de cookies de acordo com LGPD/GDPR
 */

class CookieConsent {
  constructor(options = {}) {
    this.config = {
      cookieName: 'escriba_cookie_consent',
      expiryDays: 365,
      position: 'bottom',
      theme: 'light',
      showDeclineButton: true,
      showPreferences: true,
      analytics: false,
      marketing: false,
      ...options
    };
    
    this.consentGiven = false;
    this.preferences = {
      necessary: true, // Sempre true, não pode ser desabilitado
      analytics: false,
      marketing: false,
      functional: false
    };
    
    this.init();
  }

  init() {
    // Verifica se já existe consentimento
    const existingConsent = this.getCookie(this.config.cookieName);
    
    if (existingConsent) {
      this.preferences = JSON.parse(existingConsent);
      this.consentGiven = true;
      this.loadScripts();
    } else {
      this.showBanner();
    }
  }

  showBanner() {
    // Remove banner existente se houver
    const existingBanner = document.getElementById('cookie-consent-banner');
    if (existingBanner) {
      existingBanner.remove();
    }

    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = `cookie-consent-banner cookie-consent-${this.config.position} cookie-consent-${this.config.theme}`;
    
    banner.innerHTML = `
      <div class="cookie-consent-content">
        <div class="cookie-consent-text">
          <h4>🍪 Consentimento de Cookies</h4>
          <p>Este site utiliza cookies para melhorar sua experiência de navegação e análise de tráfego. Você pode escolher quais tipos de cookies aceitar.</p>
        </div>
        <div class="cookie-consent-actions">
          <button class="cookie-btn cookie-btn-primary" onclick="cookieConsent.acceptAll()">
            Aceitar Todos
          </button>
          ${this.config.showPreferences ? `
            <button class="cookie-btn cookie-btn-secondary" onclick="cookieConsent.showPreferences()">
              Configurar
            </button>
          ` : ''}
          ${this.config.showDeclineButton ? `
            <button class="cookie-btn cookie-btn-decline" onclick="cookieConsent.declineAll()">
              Recusar
            </button>
          ` : ''}
        </div>
      </div>
    `;

    document.body.appendChild(banner);
    
    // Adiciona animação de entrada
    setTimeout(() => {
      banner.classList.add('cookie-consent-show');
    }, 100);
  }

  showPreferences() {
    const modal = document.createElement('div');
    modal.id = 'cookie-preferences-modal';
    modal.className = 'cookie-preferences-modal';
    
    modal.innerHTML = `
      <div class="cookie-preferences-content">
        <div class="cookie-preferences-header">
          <h3>⚙️ Configurações de Cookies</h3>
          <button class="cookie-close-btn" onclick="cookieConsent.closePreferences()">×</button>
        </div>
        
        <div class="cookie-preferences-body">
          <p>Escolha quais tipos de cookies você deseja aceitar. Os cookies necessários são sempre habilitados para garantir o funcionamento básico do site.</p>
          
          <div class="cookie-category">
            <div class="cookie-category-header">
              <h4>🔧 Cookies Necessários</h4>
              <label class="cookie-switch">
                <input type="checkbox" checked disabled>
                <span class="cookie-slider"></span>
              </label>
            </div>
            <p class="cookie-category-description">
              Essenciais para o funcionamento básico do site. Incluem preferências de idioma, sessões de login e carrinho de compras.
            </p>
          </div>

          <div class="cookie-category">
            <div class="cookie-category-header">
              <h4>📊 Cookies de Análise</h4>
              <label class="cookie-switch">
                <input type="checkbox" id="analytics-cookies" ${this.preferences.analytics ? 'checked' : ''}>
                <span class="cookie-slider"></span>
              </label>
            </div>
            <p class="cookie-category-description">
              Coletam informações sobre como você usa o site para ajudar a melhorar o desempenho e a experiência do usuário.
            </p>
          </div>

          <div class="cookie-category">
            <div class="cookie-category-header">
              <h4>🎯 Cookies de Marketing</h4>
              <label class="cookie-switch">
                <input type="checkbox" id="marketing-cookies" ${this.preferences.marketing ? 'checked' : ''}>
                <span class="cookie-slider"></span>
              </label>
            </div>
            <p class="cookie-category-description">
              Utilizados para exibir anúncios personalizados e medir a eficácia das campanhas publicitárias.
            </p>
          </div>

          <div class="cookie-category">
            <div class="cookie-category-header">
              <h4>⚡ Cookies Funcionais</h4>
              <label class="cookie-switch">
                <input type="checkbox" id="functional-cookies" ${this.preferences.functional ? 'checked' : ''}>
                <span class="cookie-slider"></span>
              </label>
            </div>
            <p class="cookie-category-description">
              Permitem funcionalidades aprimoradas como vídeos incorporados, mapas interativos e recursos sociais.
            </p>
          </div>
        </div>
        
        <div class="cookie-preferences-footer">
          <button class="cookie-btn cookie-btn-primary" onclick="cookieConsent.savePreferences()">
            Salvar Preferências
          </button>
          <button class="cookie-btn cookie-btn-secondary" onclick="cookieConsent.closePreferences()">
            Cancelar
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    
    // Adiciona animação de entrada
    setTimeout(() => {
      modal.classList.add('cookie-preferences-show');
    }, 100);
  }

  closePreferences() {
    const modal = document.getElementById('cookie-preferences-modal');
    if (modal) {
      modal.classList.remove('cookie-preferences-show');
      setTimeout(() => {
        modal.remove();
      }, 300);
    }
  }

  savePreferences() {
    // Coleta as preferências do modal
    this.preferences = {
      necessary: true,
      analytics: document.getElementById('analytics-cookies')?.checked || false,
      marketing: document.getElementById('marketing-cookies')?.checked || false,
      functional: document.getElementById('functional-cookies')?.checked || false
    };

    this.saveConsent();
    this.closePreferences();
    this.hideBanner();
    this.loadScripts();
  }

  acceptAll() {
    this.preferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    
    this.saveConsent();
    this.hideBanner();
    this.loadScripts();
  }

  declineAll() {
    this.preferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    
    this.saveConsent();
    this.hideBanner();
  }

  saveConsent() {
    const consent = JSON.stringify(this.preferences);
    this.setCookie(this.config.cookieName, consent, this.config.expiryDays);
    this.consentGiven = true;
    
    // Dispara evento customizado
    window.dispatchEvent(new CustomEvent('cookieConsentGiven', {
      detail: this.preferences
    }));
  }

  hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.classList.remove('cookie-consent-show');
      setTimeout(() => {
        banner.remove();
      }, 300);
    }
  }

  loadScripts() {
    // Carrega scripts baseado nas preferências
    if (this.preferences.analytics && this.config.analytics) {
      this.loadAnalyticsScripts();
    }
    
    if (this.preferences.marketing && this.config.marketing) {
      this.loadMarketingScripts();
    }
    
    if (this.preferences.functional) {
      this.loadFunctionalScripts();
    }
  }

  loadAnalyticsScripts() {
    // Exemplo: Google Analytics
    if (this.config.analytics.googleAnalytics) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.analytics.googleAnalytics}`;
      document.head.appendChild(script);
      
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', this.config.analytics.googleAnalytics);
    }
  }

  loadMarketingScripts() {
    // Carrega scripts de marketing/publicidade
    console.log('Carregando scripts de marketing...');
  }

  loadFunctionalScripts() {
    // Carrega scripts funcionais
    console.log('Carregando scripts funcionais...');
  }

  // Métodos utilitários para cookies
  setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  }

  getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  }

  deleteCookie(name) {
    this.setCookie(name, '', -1);
  }

  // Método público para resetar consentimento
  resetConsent() {
    this.deleteCookie(this.config.cookieName);
    this.consentGiven = false;
    this.preferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    this.showBanner();
  }

  // Método para verificar se um tipo específico foi aceito
  hasConsent(type) {
    return this.consentGiven && this.preferences[type];
  }
}

// Inicializa automaticamente quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  // Configuração pode ser personalizada via variável global
  const config = window.cookieConsentConfig || {
    analytics: {
      googleAnalytics: null // Adicione seu ID do GA aqui se necessário
    }
  };
  
  window.cookieConsent = new CookieConsent(config);
});
