import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';
import MarkdownIt from 'markdown-it';
import matter from 'gray-matter';
import fse from 'fs-extra';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const md = new MarkdownIt();

const contentDir = path.join(__dirname, 'content');
const layoutPath = path.join(__dirname, 'templates/layout.hbs');
const indexPath = path.join(__dirname, 'templates/index.hbs');
const outputDir = path.join(__dirname, 'public');

async function buildSite() {
  await fse.emptyDir(outputDir);

  const layoutTemplate = Handlebars.compile(await fs.readFile(layoutPath, 'utf-8'));
  const indexTemplate = Handlebars.compile(await fs.readFile(indexPath, 'utf-8'));

  const files = await getMarkdownFiles(contentDir);
  const posts = [];

  for (const file of files) {
    const rawContent = await fs.readFile(file, 'utf-8');
    const { data: frontmatter, content: markdownContent } = matter(rawContent);
    const contentHtml = md.render(markdownContent);

    const slug = path.basename(file, '.md') + '.html';
    const outputPath = path.join(outputDir, slug);

    const postData = {
      title: frontmatter.title || path.basename(file, '.md'),
      date: frontmatter.date || '',
      url: slug,
      content: contentHtml,
    };

    const html = layoutTemplate(postData);
    await fs.writeFile(outputPath, html, 'utf-8');

    posts.push({
      title: postData.title,
      date: postData.date,
      url: postData.url,
    });
  }

  // Ordena por data (se quiser)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Gera o index.html
  const indexHtml = indexTemplate({
    siteTitle: 'Meu Blog',
    posts,
  });

  await fs.writeFile(path.join(outputDir, 'index.html'), indexHtml, 'utf-8');

  console.log('✅ Site gerado com index.html!');
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
