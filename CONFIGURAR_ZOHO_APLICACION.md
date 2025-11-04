# 🔐 Configurar Contraseña de Aplicación en Zoho Mail

## ❌ Problema Actual:
El formulario funciona pero no envía emails porque Zoho requiere una **contraseña de aplicación** en lugar de tu contraseña normal.

## 📋 Pasos para Crear Contraseña de Aplicación:

### 1. Acceder a Zoho Mail:
1. Ve a [mail.zoho.com](https://mail.zoho.com)
2. Inicia sesión con tu cuenta `ventas@solsombratoldos.com`

### 2. Ir a Configuración de Seguridad:
1. Haz clic en el **icono de configuración** (⚙️) en la esquina superior derecha
2. Selecciona **"Configuración"** o **"Settings"**
3. Ve a **"Seguridad"** o **"Security"**

### 3. Habilitar Verificación en 2 Pasos (si no está habilitada):
1. Busca **"Verificación en 2 pasos"** o **"Two-Factor Authentication"**
2. Si no está habilitada, actívala primero
3. Sigue las instrucciones para configurar (SMS, app autenticador, etc.)

### 4. Crear Contraseña de Aplicación:
1. En la sección de Seguridad, busca **"Contraseñas de aplicaciones"** o **"App Passwords"**
2. Haz clic en **"Generar nueva contraseña"** o **"Generate New Password"**
3. **Nombre de la aplicación:** "Formulario Web" o "Website Form"
4. **Copia la contraseña generada** (algo como: `abcd1234efgh5678ijkl9012mnop3456`)

### 5. Actualizar .env.local:
Reemplaza la contraseña en tu archivo `.env.local`:

```env
# ANTES
SMTP_PASS=sopor70lDos545*

# DESPUÉS (con tu contraseña de aplicación)
SMTP_PASS=abcd1234efgh5678ijkl9012mnop3456
```

## 🧪 Probar el Envío Real:

### Opción 1: Con Vercel (Recomendado)
```bash
vercel dev
```
Luego ve a `http://localhost:3000` y prueba el formulario.

### Opción 2: Con Servidor de Prueba (Alternativa)
```bash
node test-server.js
```
Esto simula el envío pero no envía emails reales.

## 🔍 Verificar que Funciona:

### ✅ Si funciona correctamente:
1. **Formulario se envía** sin errores
2. **Aparece mensaje verde** de éxito
3. **Recibes el email** en `ventas@solsombratoldos.com`
4. **No hay errores** en la consola

### ❌ Si hay errores:
1. **"Authentication failed"** → Contraseña de aplicación incorrecta
2. **"Connection timeout"** → Problema de red o puerto
3. **"Invalid login"** → Email o contraseña incorrectos

## 🛠️ Configuración Alternativa (Si la anterior no funciona):

### Puerto 465 con SSL:
```env
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_SECURE=true
```

### Puerto 25 (menos común):
```env
SMTP_HOST=smtp.zoho.com
SMTP_PORT=25
SMTP_SECURE=false
```

## 📧 Configuración DNS (Opcional pero Recomendada):

Para mejor entrega de emails, configura estos registros DNS:

### SPF Record:
```
v=spf1 include:zoho.com ~all
```

### DKIM:
Configura DKIM en tu panel de Zoho Mail.

## 🚀 Próximos Pasos:

1. **Crear contraseña de aplicación** en Zoho
2. **Actualizar .env.local** con la nueva contraseña
3. **Probar con Vercel** (`vercel dev`)
4. **Verificar que llegue el email**
5. **Desplegar a producción** en Vercel

## 📞 Si Necesitas Ayuda:

- **Zoho Support:** [help.zoho.com](https://help.zoho.com)
- **Documentación SMTP:** [zoho.com/mail/help/smtp-settings.html](https://www.zoho.com/mail/help/smtp-settings.html)

---

**Estado:** ⏳ Pendiente de configurar contraseña de aplicación
**Próximo paso:** 🔐 Crear contraseña de aplicación en Zoho

