fetch('components/header.html')
  .then(res => res.text())
  .then(html => {
    // inserta el header justo después de <body>
    document.body.insertAdjacentHTML('afterbegin', html);
  });