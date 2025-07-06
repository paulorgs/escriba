# Sistema de Consentimento de Cookies - Escriba

Este documento explica como usar e configurar o sistema de consentimento de cookies implementado no Escriba, em conformidade com LGPD e GDPR.

## 🍪 Funcionalidades

- ✅ Banner de consentimento responsivo
- ✅ Modal de configurações detalhadas
- ✅ 4 tipos de cookies (Necessários, Análise, Marketing, Funcionais)
- ✅ Integração com Google Analytics
- ✅ Temas claro e escuro
- ✅ Posicionamento configurável (top/bottom)
- ✅ Armazenamento seguro das preferências
- ✅ Eventos JavaScript para integração

## 🚀 Uso Básico

O sistema é automaticamente incluído em todos os templates do Escriba. Quando um usuário visita o site pela primeira vez, verá um banner de consentimento.

### Configuração Básica

No template, você pode personalizar as configurações através do objeto `window.cookieConsentConfig`:

```javascript
window.cookieConsentConfig = {
  position: 'bottom',        // 'top' ou 'bottom'
  theme: 'light',           // 'light' ou 'dark'
  showDeclineButton: true,  // Mostrar botão "Recusar"
  showPreferences: true,    // Mostrar botão "Configurar"
  analytics: {
    googleAnalytics: 'GA_MEASUREMENT_ID' // Seu ID do Google Analytics
  }
};
```

## 📋 Tipos de Cookies

### 1. Cookies Necessários 🔧
- **Sempre habilitados** (não podem ser desabilitados)
- Essenciais para o funcionamento básico do site
- Incluem: preferências de idioma, sessões, carrinho de compras

### 2. Cookies de Análise 📊
- Coletam dados sobre o uso do site
- Ajudam a melhorar a experiência do usuário
- Exemplo: Google Analytics

### 3. Cookies de Marketing 🎯
- Utilizados para publicidade personalizada
- Rastreamento de campanhas
- Remarketing

### 4. Cookies Funcionais ⚡
- Funcionalidades avançadas do site
- Vídeos incorporados, mapas, recursos sociais
- Widgets externos

## ⚙️ Configuração Avançada

### Integração com Google Analytics

```javascript
window.cookieConsentConfig = {
  analytics: {
    googleAnalytics: 'G-XXXXXXXXXX' // Substitua pelo seu ID
  }
};
```

### Temas Personalizados

O sistema suporta temas claro e escuro:

```javascript
window.cookieConsentConfig = {
  theme: 'dark' // ou 'light'
};
```

### Posicionamento

```javascript
window.cookieConsentConfig = {
  position: 'top' // ou 'bottom'
};
```

## 🔧 API JavaScript

### Métodos Públicos

```javascript
// Verificar se o usuário deu consentimento para um tipo específico
cookieConsent.hasConsent('analytics'); // retorna true/false

// Resetar consentimento (mostra banner novamente)
cookieConsent.resetConsent();

// Verificar preferências atuais
console.log(cookieConsent.preferences);
```

### Eventos

O sistema dispara eventos que você pode escutar:

```javascript
// Escutar quando o consentimento for dado
window.addEventListener('cookieConsentGiven', function(event) {
  console.log('Preferências salvas:', event.detail);
  
  // Carregar scripts baseado nas preferências
  if (event.detail.analytics) {
    // Carregar Google Analytics ou outros scripts de análise
  }
  
  if (event.detail.marketing) {
    // Carregar scripts de marketing
  }
});
```

## 🎨 Personalização Visual

### CSS Personalizado

Você pode personalizar a aparência editando as variáveis CSS:

```css
:root {
  --cookie-banner-bg: #ffffff;
  --cookie-primary-color: #667eea;
  --cookie-text-color: #333333;
}
```

### Classes CSS Principais

- `.cookie-consent-banner` - Banner principal
- `.cookie-preferences-modal` - Modal de configurações
- `.cookie-btn` - Botões do sistema
- `.cookie-switch` - Switches de toggle

## 📱 Responsividade

O sistema é totalmente responsivo e se adapta a:
- ✅ Desktop
- ✅ Tablet  
- ✅ Mobile
- ✅ Touch devices

## 🔒 Segurança e Privacidade

### Conformidade
- ✅ **LGPD** (Lei Geral de Proteção de Dados)
- ✅ **GDPR** (General Data Protection Regulation)
- ✅ **CCPA** (California Consumer Privacy Act)

### Práticas de Segurança
- Cookies definidos com `SameSite=Lax`
- Dados armazenados localmente no navegador
- Nenhum dado enviado para servidores externos
- Expiração configurável dos cookies

## 🛠️ Desenvolvimento

### Estrutura de Arquivos

```
templates/
├── cookie-consent.js    # Script principal
├── style.css           # Estilos (inclui CSS do cookie consent)
├── layout.hbs          # Template principal
├── layout-post.hbs     # Template de posts
├── layout-page.hbs     # Template de páginas
└── index.hbs           # Template do índice
```

### Integração Personalizada

Para adicionar novos tipos de scripts baseados no consentimento:

```javascript
// No arquivo cookie-consent.js, método loadScripts()
if (this.preferences.analytics) {
  // Seu código personalizado aqui
  this.loadCustomAnalytics();
}
```

## 🔄 Atualizações

### Como Atualizar Configurações

1. Edite `window.cookieConsentConfig` nos templates
2. Execute `npm run build` para recompilar
3. As mudanças serão aplicadas automaticamente

### Limpar Consentimento Existente

Para testar ou limpar consentimentos existentes:

```javascript
// No console do navegador
cookieConsent.resetConsent();

// Ou deletar o cookie manualmente
document.cookie = 'escriba_cookie_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
```

## 🆘 Suporte

### Problemas Comuns

**1. Banner não aparece**
- Verifique se o JavaScript foi carregado
- Confirme que não há erros no console
- Verifique se já existe consentimento armazenado

**2. Estilos não aparecem**
- Confirme que o CSS foi compilado corretamente
- Verifique se não há conflitos com outros estilos

**3. Google Analytics não funciona**
- Verifique se o ID do GA está correto
- Confirme que o usuário aceitou cookies de análise

### Debug

Para debugar o sistema:

```javascript
// Verificar estado atual
console.log('Consentimento dado:', cookieConsent.consentGiven);
console.log('Preferências:', cookieConsent.preferences);

// Verificar cookie armazenado
console.log('Cookie:', cookieConsent.getCookie('escriba_cookie_consent'));
```

## 📄 Licença

Este sistema é parte do projeto Escriba e segue a mesma licença do projeto principal.
