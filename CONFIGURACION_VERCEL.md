# Configuración de Formulario de Contacto con Vercel Serverless Functions

## ✅ Ventajas de usar Vercel Serverless Functions:

- 🔒 **Máxima seguridad**: Las credenciales están en variables de entorno del servidor, nunca expuestas al cliente
- 🚀 **Rendimiento**: Funciones serverless escalables automáticamente
- 💰 **Sin costos adicionales**: Vercel incluye Serverless Functions en su plan gratuito
- 🛡️ **Protección XSS**: Sanitización automática de datos
- 📧 **Control total**: Puedes usar cualquier proveedor de email SMTP

## 📋 Pasos para Configurar:

### 1. Instalar dependencias

```bash
npm install
```

o

```bash
npm install nodemailer
```

### 2. Configurar Variables de Entorno en Vercel

1. Ve a tu proyecto en el [Dashboard de Vercel](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** > **Environment Variables**
4. Agrega las siguientes variables:

#### Variables Requeridas:

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `SMTP_HOST` | Servidor SMTP de tu proveedor de email | `smtp.gmail.com` o `smtp.office365.com` |
| `SMTP_PORT` | Puerto SMTP (generalmente 587 para TLS o 465 para SSL) | `587` |
| `SMTP_USER` | Tu email completo que enviará los mensajes | `ventas@solsombratoldos.com` |
| `SMTP_PASS` | Contraseña de aplicación o contraseña del email | `tu_contraseña` |
| `SMTP_SECURE` | `true` para puerto 465 (SSL), `false` para otros (TLS) | `false` |
| `TO_EMAIL` | Email destino (opcional, por defecto usa ventas@solsombratoldos.com) | `ventas@solsombratoldos.com` |

### 3. Configuración según Proveedor de Email

#### Gmail (con contraseña de aplicación):
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_contraseña_de_aplicacion
SMTP_SECURE=false
```

**Cómo obtener contraseña de aplicación de Gmail:**
1. Ve a tu cuenta de Google
2. Seguridad > Verificación en 2 pasos > Contraseñas de aplicaciones
3. Genera una nueva contraseña para "Mail"

#### Outlook/Office 365:
```
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=ventas@solsombratoldos.com
SMTP_PASS=tu_contraseña
SMTP_SECURE=false
```

#### Otros proveedores SMTP:
Consulta la documentación de tu proveedor de email para obtener los valores correctos.

### 4. Desplegar en Vercel

```bash
# Si usas Git
git add .
git commit -m "Configurar formulario de contacto con Vercel Functions"
git push

# Vercel detectará automáticamente los cambios y desplegará
```

O usa el CLI de Vercel:

```bash
vercel
```

### 5. Verificar que funciona

1. Completa el formulario en tu sitio web
2. Verifica que recibes el email en `ventas@solsombratoldos.com`
3. Revisa los logs en Vercel Dashboard > Functions para ver si hay errores

## 🔍 Verificación y Debugging

### Ver logs en Vercel:
1. Ve a tu proyecto en Vercel Dashboard
2. Clic en **Functions**
3. Selecciona `/api/send-email`
4. Ve a **Logs** para ver cualquier error

### Probar localmente:

Crea un archivo `.env.local` (no lo subas a Git):

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_contraseña
SMTP_SECURE=false
TO_EMAIL=ventas@solsombratoldos.com
```

Luego ejecuta:

```bash
vercel dev
```

## 🛡️ Seguridad Implementada:

✅ **Validación de CORS** - Solo permite peticiones desde tu dominio
✅ **Validación de datos** - Verifica formato de email y campos requeridos
✅ **Sanitización XSS** - Escapa HTML para prevenir ataques
✅ **Rate limiting** - Vercel limita automáticamente las funciones
✅ **Variables de entorno** - Credenciales nunca expuestas al cliente
✅ **Validación de método** - Solo acepta POST requests

## 📧 Formato del Email Enviado:

El email incluye:
- Nombre del contacto
- Teléfono
- Email (como reply-to)
- Mensaje completo
- Fecha y hora (zona horaria de Caracas)

## 🔧 Troubleshooting:

### Error: "SMTP Connection failed"
- Verifica que las credenciales sean correctas
- Asegúrate de usar contraseña de aplicación para Gmail
- Verifica que el puerto sea correcto para tu proveedor

### Error: "Timeout"
- Algunos proveedores tienen límites de rate
- Verifica que el email no esté bloqueado por spam

### Error: "Unauthorized"
- Verifica que `SMTP_USER` y `SMTP_PASS` sean correctos
- Para Gmail, asegúrate de usar contraseña de aplicación

## 📝 Notas Importantes:

- Las variables de entorno solo se aplican después de un nuevo deploy
- Para desarrollo local, usa `.env.local` (no lo subas a Git)
- El límite de funciones serverless en Vercel es muy generoso (100GB-horas/mes gratis)
- Los emails se envían desde el servidor, no desde el cliente

## 🚀 Listo para usar!

Una vez configuradas las variables de entorno y desplegado, el formulario funcionará automáticamente en todas las páginas del sitio.


