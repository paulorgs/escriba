# Escriba 🖋️

Um gerador de site estático simples e eficiente construído em Node.js. Escriba converte arquivos Markdown em um site estático completo usando templates Handlebars.

## ✨ Características

- 🚀 **Rápido e simples**: Gera sites estáticos a partir de arquivos Markdown
- 📝 **Front Matter**: Suporte para metadados YAML nos arquivos Markdown
- 🎨 **Múltiplos layouts**: Suporte para diferentes layouts por tipo de conteúdo
- 🎯 **Layout automático**: Sistema inteligente de seleção de layout
- 🎨 **Estilos padronizados**: CSS moderno e consistente em todos os layouts
- 📱 **Design responsivo**: Layouts otimizados para todos os dispositivos
- 🔍 **SEO otimizado**: Meta tags, Open Graph, Twitter Cards e dados estruturados
- 📊 **Configuração SEO global**: Valores padrão centralizados para todo o site
- 🍪 **Consentimento de Cookies**: Sistema completo LGPD/GDPR compatível
- 📁 **Estrutura recursiva**: Busca arquivos Markdown em todas as subpastas
- 📅 **Ordenação automática**: Posts ordenados por data automaticamente
- 🏠 **Página índice**: Geração automática de uma página inicial com lista de posts

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd escriba
```

2. Instale as dependências:
```bash
npm install
```

## 📖 Como usar

### 1. Estrutura do projeto

```
escriba/
├── content/           # Seus arquivos Markdown
│   ├── blog/
│   │   ├── post.md
│   │   └── tutorial-layouts.md
│   └── sobre.md
├── templates/         # Templates Handlebars
│   ├── layout.hbs        # Layout padrão
│   ├── layout-post.hbs   # Layout para posts
│   ├── layout-page.hbs   # Layout para páginas
│   ├── index.hbs         # Template da página inicial
│   ├── style.css         # Estilos CSS
│   └── cookie-consent.js # Sistema de cookies
├── public/            # Arquivos gerados (não editar)
├── site.config.json   # Configuração principal
└── package.json
```

### 2. Criar conteúdo

Crie arquivos `.md` na pasta `content/`. Exemplo:

```markdown
---
title: "Meu Primeiro Post"
date: "2024-01-15"
layout: "layout-post"
description: "Descrição do post para SEO"
author: "Seu Nome"
---

# Meu Primeiro Post

Este é o conteúdo do seu post em **Markdown**.
```

### 3. Gerar o site

```bash
npm run build
```

### 4. Visualizar o site

```bash
npm run serve
```

Acesse `http://localhost:3000` para ver seu site.

## 🍪 Sistema de Consentimento de Cookies

O Escriba inclui um sistema completo de consentimento de cookies em conformidade com LGPD e GDPR.

### Características
- ✅ Banner de consentimento responsivo
- ✅ Modal de configurações detalhadas
- ✅ 4 tipos de cookies (Necessários, Análise, Marketing, Funcionais)
- ✅ Integração com Google Analytics
- ✅ Temas claro e escuro
- ✅ Posicionamento configurável

### Configuração

No template, personalize através de `window.cookieConsentConfig`:

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

### Tipos de Cookies

| Tipo | Descrição | Pode Desabilitar |
|------|-----------|------------------|
| 🔧 **Necessários** | Essenciais para o funcionamento | ❌ Não |
| 📊 **Análise** | Google Analytics e métricas | ✅ Sim |
| 🎯 **Marketing** | Publicidade personalizada | ✅ Sim |
| ⚡ **Funcionais** | Widgets e recursos avançados | ✅ Sim |

Para mais detalhes, veja [COOKIE-CONSENT.md](./COOKIE-CONSENT.md).

## 📊 Configuração SEO

### Site.config.json Completo

```json
{
  "site": {
    "title": "Meu Blog",
    "description": "Descrição do site",
    "url": "https://meusite.com",
    "author": "Seu Nome",
    "language": "pt-BR",
    "twitterSite": "@meusite",
    "ogImage": "/images/og-default.jpg"
  },
  "defaults": {
    "robots": "index,follow",
    "ogType": "website",
    "twitterCard": "summary_large_image"
  },
  "social": {
    "twitter": "@meusite",
    "github": "https://github.com/usuario/repo"
  },
  "analytics": {
    "googleAnalytics": "GA_MEASUREMENT_ID"
  },
  "seo": {
    "sitemap": true,
    "robots": true
  }
}
```

### Prioridade de Configuração

1. **Front matter** do arquivo Markdown (maior prioridade)
2. **site.config.json** (configuração principal)
3. **seo.config.json** (fallback para compatibilidade)
4. **Valores padrão** do sistema

## 🎨 Layouts Disponíveis

### layout.hbs - Padrão
```markdown
---
title: "Página Básica"
# layout não especificado = layout padrão
---
```

### layout-post.hbs - Posts de Blog
```markdown
---
title: "Meu Post"
layout: "layout-post"
date: "2024-01-15"
author: "Seu Nome"
---
```

### layout-page.hbs - Páginas Estáticas
```markdown
---
title: "Sobre Nós"
layout: "layout-page"
subtitle: "Conheça nossa história"
---
```

## 📦 Dependências

```json
{
  "handlebars": "^4.7.8",
  "markdown-it": "^14.0.0",
  "gray-matter": "^4.0.3",
  "fs-extra": "^11.2.0"
}
```

## 🔧 Scripts NPM

```json
{
  "scripts": {
    "build": "node build.js",
    "serve": "node serve.js",
    "dev": "npm run build && npm run serve"
  }
}
```

## 📂 Exemplo de Conteúdo

### Post de Blog (content/blog/exemplo.md)
```markdown
---
title: "Como usar o Escriba"
date: "2024-01-15"
layout: "layout-post"
author: "Developer"
description: "Tutorial completo sobre como usar o gerador Escriba"
keywords: "escriba, markdown, gerador estático"
ogImage: "/images/tutorial.jpg"
---

# Como usar o Escriba

Escriba é um gerador de sites estáticos...
```

### Página Estática (content/sobre.md)
```markdown
---
title: "Sobre"
layout: "layout-page"
subtitle: "Conheça nosso projeto"
description: "Página sobre o projeto Escriba"
---

# Sobre o Escriba

O Escriba é um projeto...
```

## 🚀 Deploy

### Netlify
1. Conecte seu repositório
2. Configure build command: `npm run build`
3. Publish directory: `public`

### Vercel
1. Import do GitHub
2. Framework Preset: Other
3. Build Command: `npm run build`
4. Output Directory: `public`

### GitHub Pages
1. Configure GitHub Actions
2. Build e deploy automático
3. Servir pasta `public`

## 🔍 Ferramentas SEO

### Validadores Recomendados
- **Facebook**: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter**: [Card Validator](https://cards-dev.twitter.com/validator)
- **Google**: [Rich Results Test](https://search.google.com/test/rich-results)
- **Schema.org**: [Validator](https://validator.schema.org/)
- **Sitemap**: [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

## 🌟 Recursos Avançados

### Handlebars Helpers Customizados
- `{{eq a b}}` - Igualdade
- `{{ne a b}}` - Diferença  
- `{{{seoMeta this}}}` - Meta tags SEO completas

### Sitemap Automático
Gerado automaticamente em `/sitemap.xml` com:
- URLs de todas as páginas
- Data de modificação
- Frequência de mudança
- Prioridade de páginas

### Robots.txt
Gerado automaticamente com:
- Permissões para crawlers
- Link para sitemap
- Bloqueios opcionais

## 📄 Arquivos Gerados

Após `npm run build`, a pasta `public/` conterá:
- `index.html` - Página inicial
- `*.html` - Páginas geradas
- `style.css` - Estilos CSS
- `cookie-consent.js` - Sistema de cookies
- `sitemap.xml` - Mapa do site
- `robots.txt` - Instruções para crawlers

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

- 🐛 **Issues**: Para reportar bugs ou solicitar funcionalidades
- 📧 **Email**: Para questões sobre privacidade e LGPD
- 📖 **Docs**: Consulte [COOKIE-CONSENT.md](./COOKIE-CONSENT.md) para detalhes sobre cookies

---

**Escriba** - Criando sites estáticos com elegância e conformidade! 🖋️✨
