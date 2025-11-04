# 🧪 Guía de Prueba del Formulario

## ✅ Servidor de Prueba Activo

El servidor está ejecutándose en: **http://localhost:3000**

## 🔧 Cómo Probar:

### 1. Abrir el Sitio:
- Ve a: `http://localhost:3000`
- El formulario debe cargar correctamente

### 2. Completar el Formulario:
- **Nombre:** Cualquier nombre
- **Teléfono:** Cualquier número
- **Email:** Cualquier email válido
- **Consulta:** Cualquier mensaje

### 3. Enviar:
- Haz clic en "Enviar"
- Deberías ver un mensaje de éxito verde
- Los datos aparecerán en la consola del servidor

## 🔍 Verificar Funcionamiento:

### ✅ Comportamiento Correcto:
1. **Formulario se carga** sin errores
2. **Validación funciona** (campos requeridos)
3. **Al enviar** aparece mensaje verde de éxito
4. **Datos aparecen** en la consola del servidor

### ❌ Si hay errores:
1. **Revisa la consola** del navegador (F12)
2. **Revisa la consola** del servidor
3. **Verifica** que el servidor esté en puerto 3000

## 🐛 Solución de Problemas:

### Error: "Failed to fetch"
- **Causa:** El servidor no está ejecutándose
- **Solución:** Ejecuta `node test-server.js`

### Error: "Network error"
- **Causa:** Puerto ocupado o servidor no iniciado
- **Solución:** Verifica que el puerto 3000 esté libre

### Error de validación:
- **Causa:** Campos vacíos o email inválido
- **Solución:** Completa todos los campos correctamente

## 📧 Próximos Pasos:

Una vez que el formulario funcione localmente:

1. **Configurar credenciales reales** en `.env.local`
2. **Instalar Vercel CLI** (ya hecho)
3. **Ejecutar `vercel dev`** para probar con SMTP real
4. **Desplegar a Vercel** para producción

## 🛑 Detener el Servidor:

Para detener el servidor de prueba:
- Presiona `Ctrl+C` en la terminal
- O cierra la ventana de terminal

---

**Estado:** ✅ Servidor de prueba activo en puerto 3000
**Formulario:** 🧪 Listo para probar
**SMTP:** 🔄 Pendiente de configuración real

