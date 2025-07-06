---
title: "Guia Completo de SEO no Escriba"
date: 2025-07-02
layout: layout-post
author: "Paulo Silva"
category: "tutorial"
tags: ["seo", "tutorial", "escriba", "otimização"]

# SEO Meta Tags
description: "Aprenda a otimizar completamente o SEO do seu site gerado com Escriba. Guia completo com exemplos práticos de meta tags, Open Graph e Twitter Cards."
keywords: "SEO, otimização, meta tags, open graph, twitter cards, escriba, static site generator"
canonical: "https://meusite.com/guia-completo-seo-escriba.html"
robots: "index,follow"

# Open Graph (Facebook, LinkedIn, etc.)
ogTitle: "Guia Completo de SEO no Escriba - Otimize seu Site Estático"
ogDescription: "Domine todas as técnicas de SEO para sites estáticos criados com Escriba. Exemplos práticos e dicas avançadas."
ogImage: "/images/seo-guide-og.jpg"
ogType: "article"
ogLocale: "pt_BR"

# Twitter Cards
twitterCard: "summary_large_image"
twitterSite: "@escriba_ssg"
twitterCreator: "@paulo_dev"
twitterTitle: "Guia Completo de SEO no Escriba"
twitterDescription: "Domine todas as técnicas de SEO para sites estáticos"
twitterImage: "/images/seo-guide-twitter.jpg"

# Article-specific (para posts)
articleSection: "Tutorial"
articleTag: ["SEO", "Tutorial", "Escriba"]
articleAuthor: "Paulo Silva"
articlePublisher: "Escriba Blog"

# Dados estruturados (Schema.org)
schemaType: "BlogPosting"
schemaAuthor: "Paulo Silva"
schemaPublisher: "Escriba Blog"
schemaImage: "/images/seo-guide-schema.jpg"
schemaWordCount: 2500

# Configurações adicionais
featured: true
readingTime: "10 min"
difficulty: "intermediário"
---

# Guia Completo de SEO no Escriba

Bem-vindo ao guia definitivo de SEO para sites criados com **Escriba**! Este tutorial vai te ensinar a otimizar completamente seu site estático para mecanismos de busca.

## 🎯 O que você vai aprender

- Como configurar meta tags básicas
- Implementar Open Graph para redes sociais
- Configurar Twitter Cards
- Usar dados estruturados (Schema.org)
- Otimizar para performance e Core Web Vitals
- Configuração avançada de SEO

## 📋 Meta Tags Básicas

### 1. Title e Description

O **title** e **description** são fundamentais para o SEO:

```yaml
---
title: "Seu Título Otimizado (máx. 60 caracteres)"
description: "Uma descrição clara e atrativa do conteúdo (máx. 160 caracteres)"
---
```

### 2. Keywords e Author

```yaml
---
keywords: "palavra-chave1, palavra-chave2, palavra-chave3"
author: "Nome do Autor"
robots: "index,follow"
canonical: "https://seusite.com/url-canonica.html"
---
```

## 🌐 Open Graph (Facebook, LinkedIn)

Para otimizar o compartilhamento em redes sociais:

```yaml
---
ogTitle: "Título para redes sociais (pode ser diferente do title)"
ogDescription: "Descrição otimizada para redes sociais"
ogImage: "/images/imagem-1200x630.jpg"
ogType: "article"  # ou "website" para páginas
ogLocale: "pt_BR"
---
```

### Dicas importantes:
- **ogImage**: Use imagens de 1200x630 pixels
- **ogTitle**: Pode ser mais descritivo que o title da página
- **ogDescription**: Seja mais envolvente que a meta description

## 🐦 Twitter Cards

Para otimizar compartilhamentos no Twitter:

```yaml
---
twitterCard: "summary_large_image"
twitterSite: "@seusite"
twitterCreator: "@seuautor"
twitterTitle: "Título específico para Twitter"
twitterDescription: "Descrição específica para Twitter"
twitterImage: "/images/twitter-card-image.jpg"
---
```

## 📊 Dados Estruturados (Schema.org)

Para posts/artigos:

```yaml
---
schemaType: "BlogPosting"
schemaAuthor: "Nome do Autor"
schemaPublisher: "Nome do Site"
schemaImage: "/images/schema-image.jpg"
schemaWordCount: 1500
articleSection: "Categoria"
articleTag: ["tag1", "tag2"]
---
```

## 🔧 Configuração Global (seo.config.json)

O arquivo `seo.config.json` define valores padrão para todo o site:

```json
{
  "site": {
    "title": "Meu Site",
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
    "facebook": "meusite",
    "instagram": "@meusite"
  }
}
```

## 📈 Dicas Avançadas

### 1. Canonical URLs
Use URLs canônicas para evitar conteúdo duplicado:

```yaml
canonical: "https://seusite.com/url-principal.html"
```

### 2. Robots Meta Tag
Controle a indexação:

```yaml
robots: "index,follow"     # Indexar e seguir links
robots: "noindex,follow"   # Não indexar, mas seguir links
robots: "index,nofollow"   # Indexar, mas não seguir links
```

### 3. Layouts Específicos
Para diferentes tipos de conteúdo:

```yaml
# Para posts
layout: layout-post
ogType: "article"

# Para páginas
layout: layout-page
ogType: "website"
```

## 🎨 Exemplo Completo

Aqui está um exemplo completo de front matter otimizado:

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

# Article Data
articleSection: "Tutorial"
articleTag: ["Blog", "Escriba", "Tutorial"]
readingTime: "8 min"
difficulty: "iniciante"
---
```

## 🚀 Próximos Passos

1. **Teste seu SEO**: Use ferramentas como Google Search Console
2. **Monitore performance**: Core Web Vitals são importantes
3. **Atualize regularmente**: SEO é um processo contínuo
4. **Crie conteúdo de qualidade**: A base de tudo

## 📚 Recursos Úteis

- [Google Search Console](https://search.google.com/search-console)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Schema.org Validator](https://validator.schema.org/)

---

**Parabéns!** 🎉 Agora você domina o SEO no Escriba. Seus sites estáticos terão muito mais visibilidade nos mecanismos de busca e redes sociais!
