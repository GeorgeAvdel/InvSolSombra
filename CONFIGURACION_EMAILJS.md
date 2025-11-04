# ⚠️ SOLUCIÓN LEGACY - EmailJS

> **NOTA:** Este proyecto ahora usa **Vercel Serverless Functions** para mayor seguridad. 
> Ver [`CONFIGURACION_VERCEL.md`](./CONFIGURACION_VERCEL.md) para la configuración actual.
> 
> Esta documentación se mantiene como referencia alternativa.

# Configuración de EmailJS para Formulario de Contacto (Alternativa)

## Pasos para configurar el envío seguro de emails:

### 1. Crear cuenta en EmailJS
1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Verifica tu email

### 2. Configurar el servicio de email
1. En el dashboard de EmailJS, ve a "Email Services"
2. Agrega un nuevo servicio (Gmail, Outlook, etc.)
3. Conecta tu cuenta de email `ventas@solsombratoldos.com`
4. Anota el **Service ID** generado

### 3. Crear template de email
1. Ve a "Email Templates"
2. Crea un nuevo template con este contenido:

**Subject:** Nueva consulta desde el sitio web - {{from_name}}

**Body:**
```
Hola,

Has recibido una nueva consulta desde el sitio web:

Nombre: {{from_name}}
Teléfono: {{from_phone}}
Email: {{from_email}}

Mensaje:
{{message}}

---
Enviado desde el formulario de contacto del sitio web.
```

3. Anota el **Template ID** generado

### 4. Obtener la clave pública
1. Ve a "Account" > "General"
2. Anota tu **Public Key** (User ID)

### 5. Actualizar el código
En el archivo `scripts/contact-form.js`, reemplaza:

- `YOUR_PUBLIC_KEY` con tu Public Key
- `YOUR_SERVICE_ID` con tu Service ID  
- `YOUR_TEMPLATE_ID` con tu Template ID

### 6. Configurar dominio (opcional pero recomendado)
1. En "Account" > "General"
2. Agrega tu dominio en "Authorized Origins"
3. Esto previene el uso no autorizado de tu cuenta

## Características de seguridad implementadas:

✅ **Validación del lado del cliente** - Previene envíos vacíos
✅ **Validación de email** - Verifica formato correcto
✅ **Rate limiting** - EmailJS limita envíos automáticamente
✅ **Sin credenciales expuestas** - Solo se usa la clave pública
✅ **Feedback visual** - El usuario sabe si el envío fue exitoso
✅ **Prevención de spam** - Validación de campos requeridos

## Límites del plan gratuito:
- 200 emails por mes
- 2 servicios de email
- 2 templates
- Soporte por email

## Para aumentar límites:
- Plan Personal: $15/mes - 1000 emails
- Plan Business: $25/mes - 5000 emails
