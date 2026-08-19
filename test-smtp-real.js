const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

const PORT = 3000;

// Configuración SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER || 'ventas@solsombratoldos.com',
        pass: process.env.SMTP_PASS
    }
});

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
    
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // Si es la raíz, servir index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    // Si es la API de envío de email, enviar email real
    if (pathname === '/api/send-email' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                console.log('📧 Enviando email real...');
                console.log('De:', data.name, '<' + data.email + '>');
                console.log('Para:', process.env.TO_EMAIL || 'ventas@solsombratoldos.com');
                
                // Configurar el email
                const mailOptions = {
                    from: `"${data.name}" <${process.env.SMTP_USER}>`,
                    to: process.env.TO_EMAIL || 'ventas@solsombratoldos.com',
                    replyTo: data.email,
                    subject: `Nueva consulta desde el sitio web - ${data.name}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">
                                Nueva consulta desde el sitio web
                            </h2>
                            
                            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px;">
                                <p style="margin: 10px 0;"><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
                                <p style="margin: 10px 0;"><strong>Teléfono:</strong> ${escapeHtml(data.phone)}</p>
                                <p style="margin: 10px 0;"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
                            </div>
                            
                            <div style="margin-top: 20px;">
                                <h3 style="color: #333;">Mensaje:</h3>
                                <div style="background-color: #fff; padding: 15px; border-left: 4px solid #000; margin-top: 10px;">
                                    <p style="white-space: pre-wrap; color: #555;">${escapeHtml(data.query)}</p>
                                </div>
                            </div>
                            
                            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #888; font-size: 12px;">
                                <p>Este email fue enviado desde el formulario de contacto del sitio web.</p>
                                <p>Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Caracas' })}</p>
                            </div>
                        </div>
                    `,
                    text: `
Nueva consulta desde el sitio web

Nombre: ${data.name}
Teléfono: ${data.phone}
Email: ${data.email}

Mensaje:
${data.query}

---
Enviado desde el formulario de contacto del sitio web.
Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Caracas' })}
                    `
                };
                
                // Enviar email
                const info = await transporter.sendMail(mailOptions);
                
                console.log('✅ Email enviado exitosamente!');
                console.log('Message ID:', info.messageId);
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: true,
                    message: '¡Email enviado correctamente! Te contactaremos pronto.',
                    messageId: info.messageId
                }));
                
            } catch (error) {
                console.error('❌ Error al enviar email:', error.message);
                
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: 'Error al enviar el email: ' + error.message
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

// Función para escapar HTML
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Verificar configuración
console.log('🔧 Configuración SMTP:');
console.log('Host:', process.env.SMTP_HOST || '');
console.log('Port:', process.env.SMTP_PORT || '587');
console.log('User:', process.env.SMTP_USER || 'ventas@solsombratoldos.com');
console.log('Secure:', process.env.SMTP_SECURE || 'false');
console.log('To:', process.env.TO_EMAIL || 'ventas@solsombratoldos.com');
console.log('');

server.listen(PORT, () => {
    console.log(`🚀 Servidor con envío real ejecutándose en http://localhost:${PORT}`);
    console.log('📧 Configurado para enviar emails reales por SMTP');
    console.log('🔍 Revisa la consola para ver el estado del envío');
    console.log('\nPresiona Ctrl+C para detener el servidor');
});
