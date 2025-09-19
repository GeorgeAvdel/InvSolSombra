// Lógica del carrusel
const items = document.querySelectorAll('.carrusel-item');
const buttons = document.querySelectorAll('.carrusel-indicadores button');
let currentIndex = 0;
let autoInterval = null;

function updateActiveSlide(index) {
    items.forEach((item, i) => {
        item.classList.remove('active');
    });
    items[index].classList.add('active');
}

window.goToSlide = function(index) {
    currentIndex = index;
    updateActiveSlide(currentIndex);
    buttons.forEach(btn => btn.classList.remove('active'));
    if (buttons[currentIndex]) {
        buttons[currentIndex].classList.add('active');
    }
}

function autoRotate() {
    clearInterval(autoInterval);
    autoInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        window.goToSlide(currentIndex);
    }, 3000);
}

// Desplazamiento suave para los enlaces de anclaje
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Inicialización del carrusel
if (items.length > 0) {
    window.goToSlide(0);
    autoRotate();
}

// Cerrar menú móvil al hacer clic en enlaces internos
document.addEventListener('DOMContentLoaded', () => {
    // Cerrar menú móvil al hacer clic en enlaces internos
    const toggleBtn = document.getElementById('productos-toggle');
    const dropdown = document.getElementById('productos-dropdown');

    toggleBtn?.addEventListener('click', (e) => {
        e.stopPropagation(); // evita cerrar al clickear el propio botón
        const isOpen = dropdown.style.display === 'block';
        dropdown.style.display = isOpen ? 'none' : 'block';
    });

    // Cerrar si se hace clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#productos-toggle') && !e.target.closest('#productos-dropdown')) {
            dropdown.style.display = 'none';
        }
    });

    // Lógica para la galería de imágenes y el modal
    const imageGallery = document.getElementById('image-gallery');
    
    // Verificamos si la galería existe en la página actual
    if (imageGallery) {
        const modal = document.getElementById('image-modal');
        const modalImage = document.getElementById('modal-image');
        const closeButton = document.querySelector('.close-button');
        const galleryImages = document.querySelectorAll('#image-gallery img');

        galleryImages.forEach(image => {
            image.addEventListener('click', () => {
                modal.classList.add('active');
                modalImage.src = image.src;
            });
        });

        closeButton.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Opcional: Cerrar el modal al hacer clic fuera de la imagen
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});