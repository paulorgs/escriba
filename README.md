# Escriba 📝

Um gerador de site estático simples e eficiente construído em Node.js. Escriba converte arquivos Markdown em um site estático completo usando templates Handlebars.

## ✨ Características

- 🚀 **Rápido e simples**: Gera sites estáticos a partir de arquivos Markdown
- 📝 **Front Matter**: Suporte para metadados YAML nos arquivos Markdown
- 🎨 **Templates Handlebars**: Sistema de templates flexível e poderoso
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
│   └── blog/
│       ├── post.md
│       └── post1.md
├── templates/         # Templates Handlebars
│   ├── layout.hbs    # Layout principal
│   └── index.hbs     # Template da página inicial
├── public/           # Site gerado (pasta de saída)
├── build.js          # Script de build
└── package.json
```

### 2. Criando conteúdo

Crie arquivos Markdown na pasta `content/` com front matter:

```markdown
---
title: Meu Primeiro Post
date: 2025-07-01
---

Conteúdo do seu post em **Markdown**!

## Subtítulo

Mais conteúdo aqui...
```

### 3. Gerando o site

Execute o comando de build:

```bash
node build.js
```

O site será gerado na pasta `public/` e estará pronto para ser servido!

## 🎨 Templates

### Layout Principal (`templates/layout.hbs`)

Template base para todas as páginas. Variáveis disponíveis:
- `{{title}}` - Título da página
- `{{date}}` - Data do post
- `{{{content}}}` - Conteúdo HTML renderizado

### Página Inicial (`templates/index.hbs`)

Template para a página inicial. Variáveis disponíveis:
- `{{siteTitle}}` - Título do site
- `{{#each posts}}` - Lista de posts com `title`, `date` e `url`

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

## 📂 Estrutura de saída

Após o build, a pasta `public/` conterá:

```
public/
├── index.html        # Página inicial com lista de posts
├── post.html         # Página do primeiro post
└── post1.html        # Página do segundo post
```

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