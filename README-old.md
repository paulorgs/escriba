# Escriba- 🎯 **Layout automático**: Sistema inteligente de seleção de layout
- 🎨 **Estilos padronizados**: CSS moderno e consistente em todos os layouts
- 📱 **Design responsivo**: Layouts otimizados para todos os dispositivos
- � **SEO otimizado**: Meta tags, Open Graph, Twitter Cards e dados estruturados
- 📊 **Configuração SEO global**: Valores padrão centralizados para todo o site
- 📁 **Estrutura recursiva**: Busca arq- **Twitter**: [Card Validator](https://cards-dev.twitter.com/validator)
- **Google**: [Rich Results Test](https://search.google.com/test/rich-results)
- **Schema.org**: [Validator](https://validator.schema.org/)
- **Sitemap**: [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

## 📊 Configuração Avançada

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
    "ogImage": "/images/og-default.jpg",
    "favicon": "/favicon.ico"
  },
  "defaults": {
    "robots": "index,follow",
    "ogType": "website",
    "twitterCard": "summary_large_image"
  },
  "social": {
    "twitter": "@meusite",
    "github": "https://github.com/usuario/repo",
    "linkedin": "https://linkedin.com/company/empresa",
    "email": "contato@meusite.com"
  },
  "analytics": {
    "googleAnalytics": "UA-XXXXXXXXX-X",
    "googleTagManager": "GTM-XXXXXXX"
  },
  "seo": {
    "sitemap": true,
    "robots": true,
    "canonicalUrl": {
      "enforce": true,
      "trailingSlash": false
    }
  }
}
```

### Prioridade de Configuração

1. **Front matter** do arquivo Markdown (maior prioridade)
2. **site.config.json** (configuração principal)
3. **seo.config.json** (fallback para compatibilidade)
4. **Valores padrão** do sistema

## 📦 Dependências Markdown em todas as subpastas
Um gerador de site estático simples e eficiente construído em Node.js. Escriba converte arquivos Markdown em um site estático completo usando templates Handlebars.

## ✨ Características

- 🚀 **Rápido e simples**: Gera sites estáticos a partir de arquivos Markdown
- 📝 **Front Matter**: Suporte para metadados YAML nos arquivos Markdown
- 🎨 **Múltiplos layouts**: Suporte para diferentes layouts por tipo de conteúdo
- 🎯 **Layout automático**: Sistema inteligente de seleção de layout
- � **Estilos padronizados**: CSS moderno e consistente em todos os layouts
- 📱 **Design responsivo**: Layouts otimizados para todos os dispositivos
- �📁 **Estrutura recursiva**: Busca arquivos Markdown em todas as subpastas
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
│   └── style.css         # Estilos CSS (copiado para public/)
├── seo.config.json   # Configuração global de SEO
├── site.config.json  # Configuração avançada do site
├── public/           # Site gerado (pasta de saída)
├── build.js          # Script de build
└── package.json
```

### 2. Criando conteúdo

Crie arquivos Markdown na pasta `content/` com front matter:

#### Para Posts (aparece no índice):
```markdown
---
title: Meu Post
date: 2025-07-01
layout: layout-post
author: Seu Nome
description: "Descrição do post para SEO"
keywords: "palavra-chave1, palavra-chave2"
---

Conteúdo do seu post em **Markdown**!
```

#### Para Páginas Estáticas (não aparece no índice):
```markdown
---
title: Sobre Nós
layout: layout-page
subtitle: Conheça nossa história
description: "Página sobre a nossa empresa"
---

Conteúdo da página estática...
```

#### Layout Padrão:
```markdown
---
title: Conteúdo Básico
# layout não especificado = usa layout.hbs
---

Conteúdo com layout padrão...
```

### 3. Gerando o site

Execute o comando de build:

```bash
# Gerar o site estático
npm run build

# OU usando node diretamente
node build.js
```

### 4. Servindo localmente para testes

Para testar o site localmente:

```bash
# Opção 1: Build + servir automaticamente
npm run dev
# ou
npm start

# Opção 2: Apenas servir (se já fez o build)
npm run serve

# Opção 3: Servir diretamente
node serve.js
```

O servidor será iniciado em `http://localhost:3000` e você poderá testar todas as páginas geradas!

## 🎨 Templates e Layouts

O Escriba agora suporta **múltiplos layouts** para diferentes tipos de conteúdo:

### Layout Padrão (`templates/layout.hbs`)
- Layout básico original
- Usado quando nenhum layout é especificado no front matter
- Variáveis: `{{title}}`, `{{date}}`, `{{{content}}}`

### Layout para Posts (`templates/layout-post.hbs`)
- Design otimizado para artigos de blog
- Exibe metadados como data e autor
- Estilo focado na leitura
- Badge identificadora de "POST"
- Variáveis: `{{title}}`, `{{date}}`, `{{author}}`, `{{{content}}}`

### Layout para Páginas (`templates/layout-page.hbs`)
- Design para páginas estáticas (sobre, contato, etc.)
- Header com gradiente colorido
- **Não aparece na listagem de posts**
- Badge identificadora de "PÁGINA"
- Variáveis: `{{title}}`, `{{subtitle}}`, `{{{content}}}`

### Página Inicial (`templates/index.hbs`)
Template para a página inicial com lista de posts:
- `{{siteTitle}}` - Título do site
- `{{#each posts}}` - Lista de posts (excluindo páginas estáticas)

### Como Especificar o Layout

No front matter do arquivo Markdown:

```yaml
---
title: Título do Conteúdo
layout: layout-post    # ou layout-page, ou omitir para usar o padrão
date: 2025-07-01
author: Seu Nome
---
```

### Sistema de Fallback

- Se o layout especificado não existir, usa automaticamente o `layout.hbs`
- Mostra aviso no console para layouts não encontrados
- Permite criação de layouts customizados

## 🎨 Sistema de Estilos

O Escriba utiliza um **sistema de CSS padronizado** para manter consistência visual:

### Características do Design:
- **CSS Variables**: Esquema de cores e espaçamentos consistentes
- **Design responsivo**: Otimizado para desktop e mobile
- **Tipografia moderna**: Fontes do sistema para melhor performance
- **Componentes reutilizáveis**: Badges, botões e cards padronizados

### Personalização:
- Edite `templates/style.css` para customizar o design
- CSS é automaticamente copiado para `public/` durante o build
- Variáveis CSS facilitam mudanças globais de tema

### Layouts Visuais:
- **Posts**: Design focado na leitura com metadados destacados
- **Páginas**: Header com gradiente e layout em card
- **Índice**: Grid de posts com estatísticas e badges
- **Navegação**: Botões consistentes entre todas as páginas

## � Sistema de SEO

O Escriba inclui um **sistema completo de SEO** que gera automaticamente meta tags otimizadas para mecanismos de busca e redes sociais.

### Características do SEO:
- **Meta tags básicas**: title, description, keywords, author, robots
- **Open Graph**: Otimização para Facebook, LinkedIn e outras redes sociais
- **Twitter Cards**: Compartilhamento otimizado no Twitter
- **Dados estruturados**: Schema.org JSON-LD para melhor indexação
- **URLs canônicas**: Evita problemas de conteúdo duplicado
- **Configuração global**: Valores padrão centralizados

### Configuração Global (site.config.json)

O Escriba agora usa `site.config.json` como configuração principal (com fallback para `seo.config.json`):

```json
{
  "site": {
    "title": "Meu Blog",
    "description": "Um blog criado com Escriba - gerador de sites estáticos",
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
    "facebook": "meusite",
    "instagram": "@meusite"
  },
  "seo": {
    "sitemap": true,
    "robots": true,
    "canonicalUrl": {
      "enforce": true,
      "trailingSlash": false
    }
  }
}
```

### Configuração Legacy (seo.config.json)

Para compatibilidade, ainda é possível usar `seo.config.json`:

```json
{
  "site": {
    "title": "Meu Blog",
    "description": "Um blog criado com Escriba - gerador de sites estáticos",
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
    "facebook": "meusite",
    "instagram": "@meusite"
  }
}
```

### Front Matter SEO

Adicione campos de SEO ao front matter dos seus arquivos Markdown:

#### SEO Básico:
```yaml
---
title: "Título da Página"
description: "Descrição para mecanismos de busca (máx. 160 caracteres)"
keywords: "palavra-chave1, palavra-chave2, palavra-chave3"
author: "Nome do Autor"
canonical: "https://seusite.com/url-canonica.html"
robots: "index,follow"
---
```

#### Open Graph (Facebook, LinkedIn):
```yaml
---
# Open Graph
ogTitle: "Título para redes sociais"
ogDescription: "Descrição para redes sociais"
ogImage: "/images/imagem-1200x630.jpg"
ogType: "article"  # ou "website"
ogLocale: "pt_BR"
---
```

#### Twitter Cards:
```yaml
---
# Twitter Cards
twitterCard: "summary_large_image"
twitterSite: "@seusite"
twitterCreator: "@seuautor"
twitterTitle: "Título específico para Twitter"
twitterDescription: "Descrição específica para Twitter"
twitterImage: "/images/twitter-card.jpg"
---
```

#### Dados Estruturados (Schema.org):
```yaml
---
# Schema.org
schemaType: "BlogPosting"  # ou "AboutPage", "WebPage"
schemaAuthor: "Nome do Autor"
schemaPublisher: "Nome do Site"
schemaImage: "/images/schema-image.jpg"
schemaWordCount: 1500
articleSection: "Categoria"
articleTag: ["tag1", "tag2"]
---
```

### Exemplo Completo de SEO

```yaml
---
title: "Como Criar um Blog com Escriba"
date: 2025-07-02
layout: layout-post
author: "Paulo Silva"
category: "tutorial"
tags: ["blog", "escriba", "tutorial"]

# SEO Básico
description: "Aprenda passo a passo como criar um blog incrível usando o Escriba"
keywords: "blog, escriba, tutorial, static site generator"
canonical: "https://meusite.com/como-criar-blog-escriba.html"
robots: "index,follow"

# Open Graph
ogTitle: "Como Criar um Blog com Escriba - Tutorial Completo"
ogDescription: "Passo a passo para criar um blog profissional"
ogImage: "/images/tutorial-blog-og.jpg"
ogType: "article"

# Twitter
twitterCard: "summary_large_image"
twitterCreator: "@paulo_dev"
twitterImage: "/images/tutorial-blog-twitter.jpg"

# Schema.org
schemaType: "BlogPosting"
articleSection: "Tutorial"
articleTag: ["Blog", "Escriba", "Tutorial"]
readingTime: "8 min"
---
```

### Meta Tags Geradas

O sistema gera automaticamente:

- `<meta name="description" content="...">`
- `<meta name="keywords" content="...">`
- `<meta name="author" content="...">`
- `<meta name="robots" content="...">`
- `<link rel="canonical" href="...">`
- `<meta property="og:title" content="...">`
- `<meta property="og:description" content="...">`
- `<meta property="og:image" content="...">`
- `<meta name="twitter:card" content="...">`
- `<meta name="twitter:title" content="...">`
- `<script type="application/ld+json">` (Schema.org)

### Sistema de Fallback

Se um campo SEO não for especificado no front matter, o sistema usa:
1. Valores do `seo.config.json`
2. Valores padrão apropriados
3. Campos derivados (ex: ogTitle = title)

### Sitemap e Robots.txt

O Escriba gera automaticamente:

#### Sitemap.xml
- Lista todas as páginas do site com metadados SEO
- Inclui `lastmod`, `changefreq` e `priority`
- Pode ser desabilitado com `"sitemap": false` no `site.config.json`

#### Robots.txt
- Permite crawling de todas as páginas
- Referencia o sitemap.xml
- Permite acesso a arquivos CSS/JS
- Pode ser desabilitado com `"robots": false` no `site.config.json`

### URLs Canônicas

O sistema automaticamente gera URLs canônicas para evitar conteúdo duplicado:

```yaml
---
# URL canônica automática: https://seusite.com/nome-do-arquivo.html
title: "Meu Post"

# URL canônica personalizada
canonical: "https://seusite.com/url-preferida.html"
---
```

**Configuração global**:
```json
{
  "seo": {
    "canonicalUrl": {
      "enforce": true,        // Sempre incluir canonical
      "trailingSlash": false  // Remove / no final das URLs
    }
  }
}
```

Para testar seu SEO:
- **Facebook**: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter**: [Card Validator](https://cards-dev.twitter.com/validator)
- **Google**: [Rich Results Test](https://search.google.com/test/rich-results)
- **Schema.org**: [Validator](https://validator.schema.org/)

## �📦 Dependências

- **fs-extra**: Utilitários para sistema de arquivos
- **gray-matter**: Parser para front matter YAML
- **handlebars**: Motor de templates
- **markdown-it**: Parser e renderizador Markdown

## 🔧 Configuração

O projeto pode ser facilmente personalizado:

1. **Templates**: Modifique os arquivos em `templates/` para alterar o design
2. **Conteúdo**: Adicione arquivos Markdown em `content/`
3. **Build**: Personalize o script `build.js` conforme necessário

## 🛠️ Comandos Disponíveis

```bash
npm run build    # Gera o site estático na pasta public/
npm run serve    # Inicia servidor local em http://localhost:3000
npm run dev      # Build + serve (desenvolvimento completo)
npm start        # Alias para npm run dev
```

### Servidor de Desenvolvimento

O servidor local oferece:
- 🌐 Acesso em `http://localhost:3000`
- 📋 Lista automática de páginas disponíveis
- 🔄 Suporte a URLs limpos (sem .html)
- ❌ Páginas de erro personalizadas (404, 500)
- 🛑 Parada graciosa com Ctrl+C

## 📂 Estrutura de saída

Após o build, a pasta `public/` conterá:

```
public/
├── index.html              # Página inicial com lista de posts
├── post.html              # Post com layout-post
├── tutorial-layouts.html  # Post com layout-post  
└── sobre.html             # Página estática (layout-page)
```

**Nota**: Páginas com `layout: layout-page` não aparecem na lista de posts do `index.html`.

## 🚀 Deploy

O site gerado na pasta `public/` pode ser hospedado em qualquer serviço de hosting estático:

- **Netlify**: Drag & drop da pasta `public/`
- **Vercel**: Deploy direto do repositório
- **GitHub Pages**: Commit da pasta `public/`
- **Servidor próprio**: Upload via FTP/SFTP

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

---

**Escriba** - Transformando Markdown em sites estáticos com simplicidade e elegância.