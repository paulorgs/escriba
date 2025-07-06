---
title: "Exemplo de SEO Avançado"
date: 2025-07-03
layout: layout-post
author: "Paulo Silva"
category: "exemplo"

# SEO Básico
description: "Este é um exemplo completo de como usar todas as funcionalidades de SEO do Escriba com URLs canônicas automáticas"
keywords: "seo, canonical urls, sitemap, robots.txt, escriba"
# canonical: URL automática será gerada como https://escriba.dev/exemplo-seo-avancado.html
robots: "index,follow"

# Open Graph
ogTitle: "Exemplo de SEO Avançado - Escriba"
ogDescription: "Demonstração completa do sistema de SEO do Escriba"
ogType: "article"

# Twitter
twitterCard: "summary_large_image"
twitterCreator: "@paulo_dev"

# Schema.org
schemaType: "BlogPosting"
articleSection: "Exemplo"
articleTag: ["SEO", "Canonical", "Sitemap"]
---

# Exemplo de SEO Avançado

Este post demonstra todas as novas funcionalidades de SEO implementadas no Escriba:

## 🔗 URLs Canônicas Automáticas

Este post não especifica uma URL canônica no front matter, então o sistema automaticamente gera:
```
https://escriba.dev/exemplo-seo-avancado.html
```

## 🗺️ Sitemap.xml

Este post será automaticamente incluído no `sitemap.xml` com:
- **URL**: https://escriba.dev/exemplo-seo-avancado.html
- **Last Modified**: 2025-07-03
- **Change Frequency**: monthly (posts)
- **Priority**: 0.8 (posts)

## 🤖 Robots.txt

O arquivo `robots.txt` é gerado automaticamente e referencia o sitemap:
```
User-agent: *
Allow: /

Sitemap: https://escriba.dev/sitemap.xml
```

## ⚙️ Configuração Global

Este post usa configurações do `site.config.json`:
- **URL base**: `https://escriba.dev` (do site.url)
- **Autor padrão**: `Equipe Escriba` (fallback)
- **Twitter Site**: `@escriba_dev` (do site.twitterSite)

## 📊 Prioridade de Configuração

1. **Front matter** (este arquivo): título, descrição, autor específico
2. **site.config.json**: URL base, autor padrão, configurações sociais
3. **seo.config.json**: fallback para compatibilidade
4. **Valores padrão**: robots, ogType, etc.

## ✅ Meta Tags Geradas

Este post gera automaticamente:
- Meta description
- Open Graph tags
- Twitter Cards
- Schema.org JSON-LD
- URL canônica
- Article metadata

Tudo isso sem configuração manual! 🎉
