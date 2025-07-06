# Configuração do Google Analytics com Consentimento de Cookies

## Como configurar o Google Analytics com o sistema de cookies

### 1. Obtenha seu ID do Google Analytics
- Acesse [Google Analytics](https://analytics.google.com/)
- Crie uma nova propriedade ou use uma existente
- Copie o ID de medição (formato: `G-XXXXXXXXXX`)

### 2. Configure no template
Edite os templates para incluir seu ID:

```javascript
window.cookieConsentConfig = {
  position: 'bottom',
  theme: 'light',
  showDeclineButton: true,
  showPreferences: true,
  analytics: {
    googleAnalytics: 'G-XXXXXXXXXX' // Substitua pelo seu ID
  }
};
```

### 3. Como funciona
- O Google Analytics só será carregado se o usuário aceitar cookies de análise
- Se o usuário recusar ou não decidir, o GA não será carregado
- As preferências são salvas e respeitadas em futuras visitas

### 4. Testando
1. Acesse o site em modo incógnito
2. Observe o banner de cookies
3. Aceite apenas cookies necessários
4. Verifique no console do navegador que o GA não foi carregado
5. Mude as preferências para aceitar cookies de análise
6. Verifique que o GA foi carregado

### 5. Exemplo prático
```javascript
// Após aceitar cookies de análise, você verá no console:
// "Carregando Google Analytics..."
// E o script do GA será inserido na página
```

Este sistema garante conformidade com LGPD e GDPR ao respeitar as escolhas do usuário.
