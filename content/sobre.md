---
title: Sobre o Blog
layout: layout-page
subtitle: Conheça mais sobre este projeto
description: "Conheça o Escriba, um gerador de sites estáticos moderno e eficiente criado com Node.js"
keywords: "sobre, escriba, gerador de sites, static site generator, node.js"
author: "Equipe Escriba"
# SEO para página estática
robots: "index,follow"
canonical: "https://meusite.com/sobre.html"
# Open Graph
ogTitle: "Sobre o Escriba - Gerador de Sites Estáticos"
ogDescription: "Descubra como o Escriba pode revolucionar sua criação de sites estáticos"
ogType: "website"
# Schema.org structured data
schemaType: "AboutPage"
---

## Bem-vindo ao Escriba! 👋

Este é um exemplo de **página estática** usando o layout `layout-page.hbs`. 

### O que é o Escriba?

Escriba é um gerador de sites estáticos simples e poderoso que permite:

- ✅ Converter Markdown em HTML
- 🎨 Usar diferentes layouts para diferentes tipos de conteúdo
- 📝 Suporte a front matter YAML
- 🚀 Build rápido e eficiente

### Características desta página

Esta página usa o layout `layout-page` que oferece:

1. **Design diferenciado**: Header com gradiente colorido
2. **Estilo próprio**: Tipografia e espaçamentos otimizados para páginas
3. **Não aparece no índice**: Páginas estáticas não são listadas como posts

### Como usar layouts diferentes

No front matter do seu arquivo Markdown, simplesmente especifique:

```yaml
---
title: Título da Página
layout: layout-page
---
```

> **Dica**: Se você não especificar um layout, o sistema usará o layout padrão (`layout.hbs`).
