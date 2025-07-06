import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';
import MarkdownIt from 'markdown-it';
import matter from 'gray-matter';
import fse from 'fs-extra';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const md = new MarkdownIt();

// Registra helpers do Handlebars
Handlebars.registerHelper('eq', function(a, b) {
  return a === b;
});

Handlebars.registerHelper('ne', function(a, b) {
  return a !== b;
});

const contentDir = path.join(__dirname, 'content');
const templatesDir = path.join(__dirname, 'templates');
const indexPath = path.join(__dirname, 'templates/index.hbs');
const outputDir = path.join(__dirname, 'public');

// Cache para templates compilados
const templateCache = new Map();

async function getTemplate(layoutName) {
  if (templateCache.has(layoutName)) {
    return templateCache.get(layoutName);
  }

  const layoutPath = path.join(templatesDir, `${layoutName}.hbs`);
  
  try {
    const templateContent = await fs.readFile(layoutPath, 'utf-8');
    const compiledTemplate = Handlebars.compile(templateContent);
    templateCache.set(layoutName, compiledTemplate);
    return compiledTemplate;
  } catch (error) {
    console.warn(`⚠️  Template "${layoutName}.hbs" não encontrado. Usando layout padrão.`);
    // Fallback para layout padrão
    return await getTemplate('layout');
  }
}

async function buildSite() {
  await fse.emptyDir(outputDir);

  // Copia o arquivo CSS se existir na pasta templates
  const templateCssPath = path.join(__dirname, 'templates/style.css');
  const publicCssPath = path.join(outputDir, 'style.css');
  
  // Se não existir o CSS nos templates, usa o da pasta public como source
  const sourceCssPath = fsSync.existsSync(templateCssPath) ? templateCssPath : path.join(__dirname, 'public/style.css');
  
  try {
    if (fsSync.existsSync(sourceCssPath)) {
      await fs.copyFile(sourceCssPath, publicCssPath);
      console.log('📄 CSS copiado para public/');
    }
  } catch (error) {
    console.warn('⚠️  Não foi possível copiar o arquivo CSS:', error.message);
  }

  const indexTemplate = Handlebars.compile(await fs.readFile(indexPath, 'utf-8'));

  const files = await getMarkdownFiles(contentDir);
  const posts = [];

  for (const file of files) {
    const rawContent = await fs.readFile(file, 'utf-8');
    const { data: frontmatter, content: markdownContent } = matter(rawContent);
    const contentHtml = md.render(markdownContent);

    const slug = path.basename(file, '.md') + '.html';
    const outputPath = path.join(outputDir, slug);

    // Determina o layout a ser usado
    const layoutName = frontmatter.layout || 'layout';
    const layoutTemplate = await getTemplate(layoutName);

    const postData = {
      title: frontmatter.title || path.basename(file, '.md'),
      date: frontmatter.date || '',
      url: slug,
      content: contentHtml,
      layout: layoutName,
      // Adiciona todos os campos do frontmatter
      ...frontmatter,
    };

    const html = layoutTemplate(postData);
    await fs.writeFile(outputPath, html, 'utf-8');

    // Adiciona à lista de posts apenas se não for uma página estática
    if (layoutName !== 'layout-page') {
      posts.push({
        title: postData.title,
        date: postData.date,
        url: postData.url,
        layout: layoutName,
      });
    }

    console.log(`📄 Gerado: ${slug} (layout: ${layoutName})`);
  }

  // Ordena por data (se quiser)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Gera o index.html
  const indexHtml = indexTemplate({
    siteTitle: 'Meu Blog',
    posts,
  });

  await fs.writeFile(path.join(outputDir, 'index.html'), indexHtml, 'utf-8');

  console.log('✅ Site gerado com sucesso!');
  console.log(`📁 ${files.length} arquivos processados`);
  console.log(`📝 ${posts.length} posts adicionados ao índice`);
}

async function getMarkdownFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getMarkdownFiles(fullPath);
    } else if (entry.name.endsWith('.md')) {
      return fullPath;
    } else {
      return null;
    }
  }));
  return files.flat().filter(Boolean);
}

buildSite().catch(console.error);
