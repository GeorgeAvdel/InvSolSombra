const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;

// MIME types
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // Si es la raíz, servir index.html
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  // Si es la API de envío de email, simular respuesta
  if (pathname === '/api/send-email' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('📧 Datos del formulario recibidos:');
        console.log('Nombre:', data.name);
        console.log('Teléfono:', data.phone);
        console.log('Email:', data.email);
        console.log('Consulta:', data.query);
        
        // Simular envío exitoso
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type'
        });
        res.end(JSON.stringify({
          success: true,
          message: 'Email enviado correctamente (simulado)',
          messageId: 'test-' + Date.now()
        }));
      } catch (error) {
        console.error('Error al procesar datos:', error);
        res.writeHead(400, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify({
          error: 'Error al procesar los datos del formulario'
        }));
      }
    });
    return;
  }
  
  // Servir archivos estáticos
  const filePath = path.join(__dirname, pathname);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Archivo no encontrado</h1>');
      } else {
        res.writeHead(500);
        res.end('Error del servidor: ' + err.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Servidor de prueba ejecutándose en http://localhost:${PORT}`);
  console.log('📧 El formulario está configurado para simular el envío de emails');
  console.log('🔍 Revisa la consola para ver los datos del formulario');
  console.log('\nPresiona Ctrl+C para detener el servidor');
});

