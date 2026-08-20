if (!window.__headerLoaded) {
  window.__headerLoaded = true;
  fetch('components/header.html')
    .then(res => res.text())
    .then(html => {
      if (!document.querySelector('header')) {
        document.body.insertAdjacentHTML('afterbegin', html);
      }
      document.dispatchEvent(new CustomEvent('header:loaded'));
    })
    .catch(err => console.error('Error loading header:', err));
}
