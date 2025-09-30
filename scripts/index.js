/* ---------- CARRUSEL ---------- */
const items   = document.querySelectorAll('.carrusel-item');
const buttons = document.querySelectorAll('.carrusel-indicadores button');
let currentIndex = 0;
let autoInterval = null;

function updateActiveSlide(index) {
  items.forEach((item, i) => item.classList.toggle('active', i === index));
}

window.goToSlide = function (index) {
  currentIndex = index;
  updateActiveSlide(currentIndex);
  buttons.forEach(btn => btn.classList.remove('active'));
  if (buttons[currentIndex]) buttons[currentIndex].classList.add('active');
};

function autoRotate() {
  clearInterval(autoInterval);
  autoInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    window.goToSlide(currentIndex);
  }, 3000);
}

/* ---------- ANCLAS SUAVES ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ---------- ARRANQUE CARRUSEL ---------- */
if (items.length) {
  window.goToSlide(0);
  autoRotate();
}

/* ---------- MENÚ HAMBURGUESA ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const btn  = document.getElementById('hamburger-button');
  const menu = document.getElementById('nav-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
  });

  menu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    })
  );
});

/* ---------- GALERÍA MODAL (se espera a que el header esté listo) ---------- */
document.addEventListener('header:loaded', () => {
  const galleryImages = document.querySelectorAll('#image-gallery img');
  if (!galleryImages.length) return;          // página sin galería
  const modal       = document.getElementById('image-modal');
  const modalImage  = document.getElementById('modal-image');
  const closeButton = document.querySelector('.close-button');

  galleryImages.forEach(img =>
    img.addEventListener('click', () => {
      modal.classList.add('active');
      modalImage.src = img.src;
    })
  );

  closeButton?.addEventListener('click', () => modal.classList.remove('active'));
  modal?.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });
});