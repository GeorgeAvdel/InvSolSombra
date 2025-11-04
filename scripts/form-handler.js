// Manejador genérico de formularios para todas las páginas
// Usa Vercel Serverless Functions para envío seguro de emails
(function() {
    // Endpoint de la API de Vercel
    const API_ENDPOINT = '/api/send-email';
    
    // Función para mostrar mensajes
    function showMessage(formId, message, isError = false) {
        let messageDiv = document.querySelector(`#${formId} #form-message`);
        
        if (!messageDiv) {
            // Crear elemento de mensaje si no existe
            const form = document.getElementById(formId);
            if (form) {
                messageDiv = document.createElement('div');
                messageDiv.id = 'form-message';
                messageDiv.className = 'hidden mt-4 p-4 rounded-lg';
                form.appendChild(messageDiv);
            }
        }
        
        if (messageDiv) {
            const btnText = document.querySelector(`#${formId} #btn-text`);
            const btnIcon = document.querySelector(`#${formId} #btn-icon`);
            const submitBtn = document.querySelector(`#${formId} #submit-btn`);
            
            if (isError) {
                messageDiv.className = 'mt-4 p-4 rounded-lg bg-red-100 border border-red-400 text-red-700';
            } else {
                messageDiv.className = 'mt-4 p-4 rounded-lg bg-green-100 border border-green-400 text-green-700';
            }
            
            messageDiv.textContent = message;
            messageDiv.classList.remove('hidden');
            
            // Restaurar el botón
            if (submitBtn) {
                submitBtn.disabled = false;
                if (btnText) btnText.textContent = 'Enviar';
                if (btnIcon) btnIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />';
            }
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                messageDiv.classList.add('hidden');
            }, 5000);
        }
    }
    
    // Función para validar formulario
    function validateForm(formData) {
        const { name, phone, email, query } = formData;
        
        if (!name || !name.trim()) {
            return 'Por favor, ingresa tu nombre.';
        }
        
        if (!phone || !phone.trim()) {
            return 'Por favor, ingresa tu teléfono.';
        }
        
        if (!email || !email.trim()) {
            return 'Por favor, ingresa tu correo electrónico.';
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Por favor, ingresa un correo electrónico válido.';
        }
        
        if (!query || !query.trim()) {
            return 'Por favor, escribe tu consulta.';
        }
        
        return null; // Sin errores
    }
    
    // Función para enviar email usando la API de Vercel
    async function sendEmail(formId, formData) {
        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    query: formData.query
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Error al enviar el mensaje');
            }
            
            showMessage(formId, '¡Mensaje enviado correctamente! Te contactaremos pronto.');
            document.getElementById(formId).reset();
            
        } catch (error) {
            console.error('Error al enviar email:', error);
            showMessage(formId, 'Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos por teléfono.', true);
        }
    }
    
    // Función para manejar envío de formulario
    function handleFormSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const formId = form.id;
        
        const formData = {
            name: form.name?.value || '',
            phone: form.phone?.value || '',
            email: form.email?.value || '',
            query: form.query?.value || ''
        };
        
        // Validar formulario
        const validationError = validateForm(formData);
        if (validationError) {
            showMessage(formId, validationError, true);
            return;
        }
        
        // Mostrar estado de carga
        const submitBtn = document.querySelector(`#${formId} #submit-btn`);
        const btnText = document.querySelector(`#${formId} #btn-text`);
        const btnIcon = document.querySelector(`#${formId} #btn-icon`);
        
        if (submitBtn) {
            submitBtn.disabled = true;
            if (btnText) btnText.textContent = 'Enviando...';
            if (btnIcon) btnIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />';
        }
        
        // Enviar email
        sendEmail(formId, formData);
    }
    
    // Función para inicializar formularios
    function initForms() {
        const forms = document.querySelectorAll('form[id$="-form"], form:has(input[name="name"])');
        
        forms.forEach(form => {
            // Agregar IDs si no los tienen
            if (!form.id) {
                form.id = 'contact-form-' + Math.random().toString(36).substr(2, 9);
            }
            
            // Agregar atributos required si no los tienen
            const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
            inputs.forEach(input => {
                if (!input.hasAttribute('required')) {
                    input.setAttribute('required', '');
                }
            });
            
            // Agregar event listener
            form.addEventListener('submit', handleFormSubmit);
        });
    }
    
    // Inicializar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', initForms);
    
    // Reinicializar cuando el header se cargue
    document.addEventListener('header:loaded', initForms);
})();