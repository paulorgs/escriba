import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');
let port = 3000;

// MIME types para diferentes arquivos
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Função para encontrar uma porta disponível
async function findAvailablePort(startPort) {
  return new Promise((resolve) => {
    const server = http.createServer();
    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    server.on('error', () => {
      resolve(findAvailablePort(startPort + 1));
    });
  });
}

const server = http.createServer(async (req, res) => {
  try {
    let filePath = path.join(publicDir, req.url === '/' ? 'index.html' : req.url);
    
    // Verifica se o arquivo existe
    if (!fs.existsSync(filePath)) {
      // Se não existe, tenta adicionar .html
      if (!path.extname(filePath)) {
        filePath += '.html';
      }
      
      // Se ainda não existe, retorna 404
      if (!fs.existsSync(filePath)) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>404 - Página não encontrada</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; text-align: center; padding: 50px; }
              h1 { color: #e74c3c; }
              a { color: #3498db; text-decoration: none; }
            </style>
          </head>
          <body>
            <h1>404 - Página não encontrada</h1>
            <p>A página <code>${req.url}</code> não foi encontrada.</p>
            <a href="/">← Voltar para o início</a>
          </body>
          </html>
        `);
        return;
      }
    }

    // Determina o MIME type
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'text/plain';

    // Lê e serve o arquivo
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);

  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>500 - Erro interno</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; text-align: center; padding: 50px; }
          h1 { color: #e74c3c; }
        </style>
      </head>
      <body>
        <h1>500 - Erro interno do servidor</h1>
        <p>Ocorreu um erro: ${error.message}</p>
      </body>
      </html>
    `);
  }
});

// Função principal para iniciar o servidor
async function startServer() {
  port = await findAvailablePort(port);
  
  server.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    console.log(`📁 Servindo arquivos da pasta: ${publicDir}`);
    console.log(`⏹️  Para parar o servidor, pressione Ctrl+C`);
    console.log('');
    console.log('📖 Páginas disponíveis:');
    
    // Lista os arquivos HTML disponíveis
    try {
      const files = fs.readdirSync(publicDir).filter(file => file.endsWith('.html'));
      files.forEach(file => {
        const url = file === 'index.html' ? '/' : `/${file.replace('.html', '')}`;
        console.log(`   http://localhost:${port}${url}`);
      });
    } catch (error) {
      console.log('   ⚠️  Pasta public/ não encontrada. Execute "npm run build" primeiro.');
    }
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Parando o servidor...');
    server.close(() => {
      console.log('✅ Servidor parado com sucesso!');
      process.exit(0);
    });
  });
}

// Inicia o servidor
startServer();
