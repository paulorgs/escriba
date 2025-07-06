---
title: Tutorial de Layouts
date: 2025-07-02
layout: layout-post
author: Escriba Team
---

# Como Usar Múltiplos Layouts no Escriba

Agora o Escriba suporta **múltiplos layouts**! 🎉

## Layouts Disponíveis

### 1. Layout Padrão (`layout.hbs`)
- Layout básico original
- Usado quando nenhum layout é especificado

### 2. Layout para Posts (`layout-post.hbs`)
- Design otimizado para artigos de blog
- Mostra data, autor e metadados
- Estilo focado na leitura

### 3. Layout para Páginas (`layout-page.hbs`)
- Design para páginas estáticas
- Header com gradiente
- Não aparece na listagem de posts

## Como Usar

No **front matter** do seu arquivo Markdown:

```yaml
---
title: Meu Post
layout: layout-post
date: 2025-07-02
author: Seu Nome
---
```

## Fallback Inteligente

Se um layout não for encontrado, o sistema automaticamente usa o `layout.hbs` padrão e mostra um aviso no console.

## Próximos Passos

Você pode criar seus próprios layouts! Basta adicionar arquivos `.hbs` na pasta `templates/` e referenciar pelo nome no front matter.
