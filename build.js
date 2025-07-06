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

// Helper para gerar meta tags SEO
Handlebars.registerHelper('seoMeta', function(data) {
  let metaTags = '';
  
  // Meta tags básicas
  if (data.description) {
    metaTags += `  <meta name="description" content="${data.description}">\n`;
  }
  
  if (data.keywords) {
    metaTags += `  <meta name="keywords" content="${data.keywords}">\n`;
  }
  
  if (data.author) {
    metaTags += `  <meta name="author" content="${data.author}">\n`;
  }
  
  if (data.robots) {
    metaTags += `  <meta name="robots" content="${data.robots}">\n`;
  }
  
  if (data.canonical) {
    metaTags += `  <link rel="canonical" href="${data.canonical}">\n`;
  }
  
  // Open Graph tags
  if (data.ogTitle) {
    metaTags += `  <meta property="og:title" content="${data.ogTitle}">\n`;
  }
  
  if (data.ogDescription) {
    metaTags += `  <meta property="og:description" content="${data.ogDescription}">\n`;
  }
  
  if (data.ogImage) {
    metaTags += `  <meta property="og:image" content="${data.ogImage}">\n`;
  }
  
  if (data.ogType) {
    metaTags += `  <meta property="og:type" content="${data.ogType}">\n`;
  }
  
  if (data.url) {
    metaTags += `  <meta property="og:url" content="${data.url}">\n`;
  }
  
  if (data.ogLocale) {
    metaTags += `  <meta property="og:locale" content="${data.ogLocale}">\n`;
  }
  
  // Twitter Card tags
  if (data.twitterCard) {
    metaTags += `  <meta name="twitter:card" content="${data.twitterCard}">\n`;
  }
  
  if (data.twitterSite) {
    metaTags += `  <meta name="twitter:site" content="${data.twitterSite}">\n`;
  }
  
  if (data.twitterCreator) {
    metaTags += `  <meta name="twitter:creator" content="${data.twitterCreator}">\n`;
  }
  
  if (data.twitterTitle) {
    metaTags += `  <meta name="twitter:title" content="${data.twitterTitle}">\n`;
  }
  
  if (data.twitterDescription) {
    metaTags += `  <meta name="twitter:description" content="${data.twitterDescription}">\n`;
  }
  
  if (data.twitterImage) {
    metaTags += `  <meta name="twitter:image" content="${data.twitterImage}">\n`;
  }
  
  // Article specific (para posts)
  if (data.layout === 'layout-post') {
    if (data.date) {
      const dateObj = new Date(data.date);
      const isoDate = dateObj.toISOString();
      metaTags += `  <meta property="article:published_time" content="${isoDate}">\n`;
    }
    if (data.author) {
      metaTags += `  <meta property="article:author" content="${data.author}">\n`;
    }
    if (data.articleSection) {
      metaTags += `  <meta property="article:section" content="${data.articleSection}">\n`;
    }
    if (data.articleTag) {
      const tags = Array.isArray(data.articleTag) ? data.articleTag : [data.articleTag];
      tags.forEach(tag => {
        metaTags += `  <meta property="article:tag" content="${tag}">\n`;
      });
    }
  }
  
  // JSON-LD Structured Data (Schema.org)
  if (data.schemaType) {
    let schemaData = {
      "@context": "https://schema.org",
      "@type": data.schemaType,
      "name": data.title,
      "headline": data.title,
      "description": data.description,
      "url": data.canonical || data.url,
      "datePublished": data.date ? new Date(data.date).toISOString() : undefined,
      "dateModified": data.date ? new Date(data.date).toISOString() : undefined,
      "author": {
        "@type": "Person",
        "name": data.schemaAuthor || data.author
      },
      "publisher": {
        "@type": "Organization",
        "name": data.schemaPublisher || "Escriba Blog"
      }
    };
    
    if (data.schemaImage) {
      schemaData.image = data.schemaImage;
    }
    
    if (data.schemaWordCount) {
      schemaData.wordCount = data.schemaWordCount;
    }
    
    metaTags += `  <script type="application/ld+json">\n${JSON.stringify(schemaData, null, 2)}\n  </script>\n`;
  }
  
  return new Handlebars.SafeString(metaTags);
});

const contentDir = path.join(__dirname, 'content');
const templatesDir = path.join(__dirname, 'templates');
const indexPath = path.join(__dirname, 'templates/index.hbs');
const outputDir = path.join(__dirname, 'public');
const seoConfigPath = path.join(__dirname, 'seo.config.json');

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

  // Carrega configuração SEO
  let seoConfig = {};
  try {
    const seoConfigContent = await fs.readFile(seoConfigPath, 'utf-8');
    seoConfig = JSON.parse(seoConfigContent);
  } catch (error) {
    console.warn('⚠️  Arquivo seo.config.json não encontrado. Usando valores padrão.');
    seoConfig = {
      site: {
        title: "Meu Blog",
        description: "Um blog criado com Escriba",
        url: "https://localhost:3000",
        author: "",
        language: "pt-BR"
      },
      defaults: {
        robots: "index,follow",
        ogType: "website",
        twitterCard: "summary_large_image"
      }
    };
  }

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
      // SEO data com fallbacks da configuração
      description: frontmatter.description || seoConfig.site?.description || '',
      keywords: frontmatter.keywords || '',
      author: frontmatter.author || seoConfig.site?.author || '',
      image: frontmatter.image || seoConfig.site?.ogImage || '',
      canonical: frontmatter.canonical || `${seoConfig.site?.url || ''}/${slug}`,
      robots: frontmatter.robots || seoConfig.defaults?.robots || 'index,follow',
      // Open Graph
      ogTitle: frontmatter.ogTitle || frontmatter.title || path.basename(file, '.md'),
      ogDescription: frontmatter.ogDescription || frontmatter.description || seoConfig.site?.description || '',
      ogImage: frontmatter.ogImage || frontmatter.image || seoConfig.site?.ogImage || '',
      ogType: frontmatter.ogType || (layoutName === 'layout-post' ? 'article' : seoConfig.defaults?.ogType || 'website'),
      ogLocale: frontmatter.ogLocale || seoConfig.site?.language || 'pt-BR',
      // Twitter Cards
      twitterCard: frontmatter.twitterCard || seoConfig.defaults?.twitterCard || 'summary_large_image',
      twitterSite: frontmatter.twitterSite || seoConfig.site?.twitterSite || '',
      twitterCreator: frontmatter.twitterCreator || seoConfig.social?.twitter || '',
      twitterTitle: frontmatter.twitterTitle || frontmatter.title,
      twitterDescription: frontmatter.twitterDescription || frontmatter.description,
      twitterImage: frontmatter.twitterImage || frontmatter.image,
      // Article-specific fields
      articleSection: frontmatter.articleSection || frontmatter.category || '',
      articleTag: frontmatter.articleTag || frontmatter.tags || [],
      // Schema.org structured data
      schemaType: frontmatter.schemaType || (layoutName === 'layout-post' ? 'BlogPosting' : undefined),
      schemaAuthor: frontmatter.schemaAuthor || frontmatter.author,
      schemaPublisher: frontmatter.schemaPublisher || seoConfig.site?.title || 'Escriba Blog',
      schemaImage: frontmatter.schemaImage || frontmatter.image,
      schemaWordCount: frontmatter.schemaWordCount,
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
