// Configuración de EmailJS
(function() {
    // Inicializar EmailJS con tu User ID público (esto es seguro de exponer)
    emailjs.init("YOUR_PUBLIC_KEY"); // Reemplaza con tu clave pública de EmailJS
    
    // Función para mostrar mensajes al usuario
    function showMessage(message, isError = false) {
        const messageDiv = document.getElementById('form-message');
        const btnText = document.getElementById('btn-text');
        const btnIcon = document.getElementById('btn-icon');
        const submitBtn = document.getElementById('submit-btn');
        
        if (isError) {
            messageDiv.className = 'mt-4 p-4 rounded-lg bg-red-100 border border-red-400 text-red-700';
        } else {
            messageDiv.className = 'mt-4 p-4 rounded-lg bg-green-100 border border-green-400 text-green-700';
        }
        
        messageDiv.textContent = message;
        messageDiv.classList.remove('hidden');
        
        // Restaurar el botón
        submitBtn.disabled = false;
        btnText.textContent = 'Enviar';
        btnIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />';
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            messageDiv.classList.add('hidden');
        }, 5000);
    }
    
    // Función para validar el formulario
    function validateForm(formData) {
        const { name, phone, email, query } = formData;
        
        if (!name.trim()) {
            showMessage('Por favor, ingresa tu nombre.', true);
            return false;
        }
        
        if (!phone.trim()) {
            showMessage('Por favor, ingresa tu teléfono.', true);
            return false;
        }
        
        if (!email.trim()) {
            showMessage('Por favor, ingresa tu correo electrónico.', true);
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Por favor, ingresa un correo electrónico válido.', true);
            return false;
        }
        
        if (!query.trim()) {
            showMessage('Por favor, escribe tu consulta.', true);
            return false;
        }
        
        return true;
    }
    
    // Función para enviar el formulario
    function sendEmail(formData) {
        const templateParams = {
            from_name: formData.name,
            from_phone: formData.phone,
            from_email: formData.email,
            message: formData.query,
            to_email: 'ventas@solsombratoldos.com'
        };
        
        // Usar el Service ID y Template ID de EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.');
                document.getElementById('contact-form').reset();
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                showMessage('Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos por teléfono.', true);
            });
    }
    
    // Función para manejar el envío del formulario
    function handleFormSubmit(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = {
            name: form.name.value,
            phone: form.phone.value,
            email: form.email.value,
            query: form.query.value
        };
        
        // Validar formulario
        if (!validateForm(formData)) {
            return;
        }
        
        // Mostrar estado de carga
        const submitBtn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const btnIcon = document.getElementById('btn-icon');
        
        submitBtn.disabled = true;
        btnText.textContent = 'Enviando...';
        btnIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />';
        
        // Enviar email
        sendEmail(formData);
    }
    
    // Inicializar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', handleFormSubmit);
        }
    });
    
    // También inicializar cuando el header se cargue dinámicamente
    document.addEventListener('header:loaded', function() {
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', handleFormSubmit);
        }
    });
})();

