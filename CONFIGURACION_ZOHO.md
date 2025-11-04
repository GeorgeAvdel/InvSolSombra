# 📧 Configuración SMTP para Zoho Mail

## ✅ Configuración Actualizada para Zoho

Tu archivo `.env.local` ya está configurado para usar Zoho Mail con las siguientes configuraciones:

```env
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_USER=ventas@solsombratoldos.com
SMTP_PASS=tu_contraseña_de_zoho
SMTP_SECURE=false
TO_EMAIL=ventas@solsombratoldos.com
```

## 🔧 Pasos para Completar la Configuración:

### 1. Obtener Contraseña de Aplicación de Zoho

1. **Inicia sesión** en tu cuenta de Zoho Mail
2. Ve a **Configuración** > **Seguridad** > **Contraseñas de aplicaciones**
3. **Genera una nueva contraseña** para "Aplicación web"
4. **Copia la contraseña generada** (no tu contraseña normal)

### 2. Actualizar .env.local

Edita el archivo `.env.local` y reemplaza:
```env
SMTP_PASS=tu_contraseña_de_zoho
```

Con tu contraseña de aplicación real:
```env
SMTP_PASS=abcd1234efgh5678ijkl9012mnop3456
```

### 3. Configuración Alternativa (Si la anterior no funciona)

Si tienes problemas con el puerto 587, prueba con:

```env
# Opción 1: Puerto 465 con SSL
SMTP_HOST=smtp.zoho.com
SMTP_PORT=465
SMTP_SECURE=true

# Opción 2: Puerto 25 (menos común)
SMTP_HOST=smtp.zoho.com
SMTP_PORT=25
SMTP_SECURE=false
```

## 🌐 Configuración para Producción en Vercel

### Variables de Entorno en Vercel:

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. **Settings** > **Environment Variables**
4. Agrega estas variables:

| Variable | Valor |
|----------|-------|
| `SMTP_HOST` | `smtp.zoho.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `ventas@solsombratoldos.com` |
| `SMTP_PASS` | `tu_contraseña_de_aplicación` |
| `SMTP_SECURE` | `false` |
| `TO_EMAIL` | `ventas@solsombratoldos.com` |

## 🔍 Verificar Configuración

### Probar Localmente:
```bash
vercel dev
```

### Probar el Formulario:
1. Completa el formulario en tu sitio
2. Verifica que recibas el email en `ventas@solsombratoldos.com`
3. Revisa la consola para errores

### Verificar Logs en Vercel:
1. Vercel Dashboard > Tu Proyecto > **Functions**
2. Selecciona `/api/send-email`
3. Ve a **Logs** para ver cualquier error

## ⚠️ Solución de Problemas Comunes

### Error: "Authentication failed"
- **Causa**: Contraseña incorrecta o no es contraseña de aplicación
- **Solución**: Genera una nueva contraseña de aplicación en Zoho

### Error: "Connection timeout"
- **Causa**: Puerto bloqueado o configuración incorrecta
- **Solución**: Prueba con puerto 465 y `SMTP_SECURE=true`

### Error: "Invalid login"
- **Causa**: Email incorrecto o cuenta no configurada para SMTP
- **Solución**: Verifica que `ventas@solsombratoldos.com` esté configurado en Zoho

### Error: "Relay access denied"
- **Causa**: Zoho no permite envío desde tu IP
- **Solución**: Usa contraseña de aplicación y verifica configuración DNS

## 📋 Configuración DNS Recomendada

Para mejor entrega de emails, configura estos registros DNS:

### SPF Record:
```
v=spf1 include:zoho.com ~all
```

### DKIM (Opcional):
Configura DKIM en tu panel de Zoho Mail para mejor autenticación.

## 🚀 Listo para Usar

Una vez configuradas las credenciales:

1. **Desarrollo**: El formulario funcionará con `vercel dev`
2. **Producción**: Despliega a Vercel y funcionará automáticamente
3. **Emails**: Se enviarán a `ventas@solsombratoldos.com`

## 📞 Soporte

Si tienes problemas:
1. Verifica que la contraseña de aplicación sea correcta
2. Prueba diferentes puertos (587, 465, 25)
3. Revisa los logs en Vercel Dashboard
4. Contacta soporte de Zoho si persisten los problemas

