// api/send-email.js - Vercel Serverless Function
// Maneja el envío seguro de emails desde el formulario de contacto

export default async function handler(req, res) {
  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Validar CORS para seguridad
  const allowedOrigins = [
    'https://solsombratoldos.com',
    'https://www.solsombratoldos.com',
    'http://localhost:3000'
  ];
  
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Validar campos requeridos
  const { name, phone, email, query } = req.body;

  if (!name || !phone || !email || !query) {
    return res.status(400).json({ 
      error: 'Todos los campos son requeridos' 
    });
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'Formato de email inválido' 
    });
  }

  // Configuración de email usando variables de entorno
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true para 465, false para otros puertos
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  // Configurar el email
  const mailOptions = {
    from: `"Formulario Web" <${process.env.SMTP_USER}>`,
    to: process.env.TO_EMAIL || 'ventas@solsombratoldos.com',
    replyTo: email,
    subject: `Nueva consulta desde el sitio web - ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">
          Nueva consulta desde el sitio web
        </h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px;">
          <p style="margin: 10px 0;"><strong>Nombre:</strong> ${escapeHtml(name)}</p>
          <p style="margin: 10px 0;"><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
        </div>
        
        <div style="margin-top: 20px;">
          <h3 style="color: #333;">Mensaje:</h3>
          <div style="background-color: #fff; padding: 15px; border-left: 4px solid #000; margin-top: 10px;">
            <p style="white-space: pre-wrap; color: #555;">${escapeHtml(query)}</p>
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

Nombre: ${name}
Teléfono: ${phone}
Email: ${email}

Mensaje:
${query}

---
Enviado desde el formulario de contacto del sitio web.
Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Caracas' })}
    `
  };

  try {
    // Enviar email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email enviado exitosamente:', info.messageId);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Email enviado correctamente',
      messageId: info.messageId
    });
    
  } catch (error) {
    console.error('Error al enviar email:', error);
    
    return res.status(500).json({ 
      error: 'Error al enviar el email. Por favor, inténtalo de nuevo o contáctanos por teléfono.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Función auxiliar para escapar HTML y prevenir XSS
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
