import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Handlebars from 'handlebars';
import MarkdownIt from 'markdown-it';
import matter from 'gray-matter';
import fse from 'fs-extra';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const md = new MarkdownIt({
  html: true,        // Permite HTML nos arquivos Markdown
  breaks: true,      // Converte quebras de linha em <br>
  linkify: true      // Converte URLs em links automaticamente
});

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

// Helper para gerar botão de gerenciamento de cookies
Handlebars.registerHelper('cookieButton', function(text, className) {
  const buttonText = text || 'Configurar Cookies';
  const buttonClass = className || 'cookie-manage-btn';
  
  return new Handlebars.SafeString(`
    <button class="${buttonClass}" onclick="if(window.cookieConsent) window.cookieConsent.resetConsent(); else alert('Sistema de cookies carregando...');">
      🍪 ${buttonText}
    </button>
  `);
});

const contentDir = path.join(__dirname, 'content');
const templatesDir = path.join(__dirname, 'templates');
const indexPath = path.join(__dirname, 'templates/index.hbs');
const outputDir = path.join(__dirname, 'public');
const seoConfigPath = path.join(__dirname, 'seo.config.json');
const siteConfigPath = path.join(__dirname, 'site.config.json');

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

  // Carrega configuração do site
  let siteConfig = {};
  try {
    const siteConfigContent = await fs.readFile(siteConfigPath, 'utf-8');
    siteConfig = JSON.parse(siteConfigContent);
  } catch (error) {
    console.warn('⚠️  Arquivo site.config.json não encontrado. Usando configuração padrão.');
    siteConfig = {
      site: {
        title: "Meu Blog",
        description: "Um blog criado com Escriba",
        url: "https://localhost:3000",
        author: "",
        language: "pt-BR"
      }
    };
  }

  // Carrega configuração SEO (mantém compatibilidade)
  let seoConfig = {};
  try {
    const seoConfigContent = await fs.readFile(seoConfigPath, 'utf-8');
    seoConfig = JSON.parse(seoConfigContent);
  } catch (error) {
    console.warn('⚠️  Arquivo seo.config.json não encontrado. Usando valores do site.config.json.');
    seoConfig = {
      site: siteConfig.site || {
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

  // Merge das configurações (site.config.json tem prioridade)
  const finalConfig = {
    site: { ...seoConfig.site, ...siteConfig.site },
    defaults: { ...seoConfig.defaults, ...siteConfig.defaults },
    social: { ...seoConfig.social, ...siteConfig.social },
    seo: siteConfig.seo || {}
  };

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

  // Copia o arquivo JavaScript do consentimento de cookies
  const cookieConsentJsPath = path.join(__dirname, 'templates/cookie-consent.js');
  const publicCookieConsentJsPath = path.join(outputDir, 'cookie-consent.js');
  
  try {
    if (fsSync.existsSync(cookieConsentJsPath)) {
      await fs.copyFile(cookieConsentJsPath, publicCookieConsentJsPath);
      console.log('🍪 Cookie consent JS copiado para public/');
    }
  } catch (error) {
    console.warn('⚠️  Não foi possível copiar o arquivo cookie-consent.js:', error.message);
  }

  const indexTemplate = Handlebars.compile(await fs.readFile(indexPath, 'utf-8'));

  const files = await getMarkdownFiles(contentDir);
  const posts = [];
  const allPages = []; // Para o sitemap

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
      description: frontmatter.description || finalConfig.site?.description || '',
      keywords: frontmatter.keywords || '',
      author: frontmatter.author || finalConfig.site?.author || '',
      image: frontmatter.image || finalConfig.site?.ogImage || '',
      canonical: frontmatter.canonical || `${finalConfig.site?.url || ''}/${slug}`,
      robots: frontmatter.robots || finalConfig.defaults?.robots || 'index,follow',
      // Open Graph
      ogTitle: frontmatter.ogTitle || frontmatter.title || path.basename(file, '.md'),
      ogDescription: frontmatter.ogDescription || frontmatter.description || finalConfig.site?.description || '',
      ogImage: frontmatter.ogImage || frontmatter.image || finalConfig.site?.ogImage || '',
      ogType: frontmatter.ogType || (layoutName === 'layout-post' ? 'article' : finalConfig.defaults?.ogType || 'website'),
      ogLocale: frontmatter.ogLocale || finalConfig.site?.language || 'pt-BR',
      // Twitter Cards
      twitterCard: frontmatter.twitterCard || finalConfig.defaults?.twitterCard || 'summary_large_image',
      twitterSite: frontmatter.twitterSite || finalConfig.site?.twitterSite || '',
      twitterCreator: frontmatter.twitterCreator || finalConfig.social?.twitter || '',
      twitterTitle: frontmatter.twitterTitle || frontmatter.title,
      twitterDescription: frontmatter.twitterDescription || frontmatter.description,
      twitterImage: frontmatter.twitterImage || frontmatter.image,
      // Article-specific fields
      articleSection: frontmatter.articleSection || frontmatter.category || '',
      articleTag: frontmatter.articleTag || frontmatter.tags || [],
      // Schema.org structured data
      schemaType: frontmatter.schemaType || (layoutName === 'layout-post' ? 'BlogPosting' : undefined),
      schemaAuthor: frontmatter.schemaAuthor || frontmatter.author,
      schemaPublisher: frontmatter.schemaPublisher || finalConfig.site?.title || 'Escriba Blog',
      schemaImage: frontmatter.schemaImage || frontmatter.image,
      schemaWordCount: frontmatter.schemaWordCount,
      // Adiciona todos os campos do frontmatter
      ...frontmatter,
    };

    const html = layoutTemplate(postData);
    await fs.writeFile(outputPath, html, 'utf-8');

    // Adiciona à lista de todas as páginas para o sitemap
    allPages.push({
      url: slug,
      lastmod: frontmatter.date ? new Date(frontmatter.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      changefreq: layoutName === 'layout-post' ? 'monthly' : 'yearly',
      priority: layoutName === 'layout-post' ? '0.8' : '0.6'
    });

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
    siteTitle: finalConfig.site?.title || 'Meu Blog',
    posts,
  });

  await fs.writeFile(path.join(outputDir, 'index.html'), indexHtml, 'utf-8');

  // Adiciona index.html ao sitemap
  allPages.unshift({
    url: 'index.html',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '1.0'
  });

  // Gera sitemap.xml se habilitado
  if (finalConfig.seo?.sitemap !== false) {
    await generateSitemap(allPages, finalConfig.site?.url || 'https://localhost:3000');
  }

  // Gera robots.txt se habilitado
  if (finalConfig.seo?.robots !== false) {
    await generateRobotsTxt(finalConfig.site?.url || 'https://localhost:3000');
  }

  console.log('✅ Site gerado com sucesso!');
  console.log(`📁 ${files.length} arquivos processados`);
  console.log(`📝 ${posts.length} posts adicionados ao índice`);
  if (finalConfig.seo?.sitemap !== false) {
    console.log('🗺️  Sitemap gerado em /sitemap.xml');
  }
  if (finalConfig.seo?.robots !== false) {
    console.log('🤖 Robots.txt gerado em /robots.txt');
  }
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

// Gera sitemap.xml
async function generateSitemap(pages, baseUrl) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}/${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  await fs.writeFile(path.join(outputDir, 'sitemap.xml'), sitemap, 'utf-8');
}

// Gera robots.txt
async function generateRobotsTxt(baseUrl) {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin areas (if any)
# Disallow: /admin/
# Disallow: /.env

# Allow search engines to crawl CSS and JS files
Allow: /style.css
Allow: /*.css
Allow: /*.js

# Crawl-delay (optional)
# Crawl-delay: 1`;

  await fs.writeFile(path.join(outputDir, 'robots.txt'), robotsTxt, 'utf-8');
}

buildSite().catch(console.error);
