document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close-btn');

    // Escucha los clics en todas las imágenes de la cuadrícula
    document.querySelectorAll('.image-grid img').forEach(image => {
        image.addEventListener('click', function() {
            modal.style.display = 'flex'; // Muestra el modal
            modalImage.src = this.src; // Carga la imagen seleccionada en el modal
        });
    });

    // Escucha el clic en el botón de cerrar
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none'; // Oculta el modal
    });

    // Oculta el modal si el usuario hace clic fuera de la imagen
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});