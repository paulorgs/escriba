# Escriba 📝

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
---

Conteúdo do seu post em **Markdown**!
```

#### Para Páginas Estáticas (não aparece no índice):
```markdown
---
title: Sobre Nós
layout: layout-page
subtitle: Conheça nossa história
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

## 📦 Dependências

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