fetch('components/header.html')
  .then(res => res.text())
  .then(html => document.body.insertAdjacentHTML('afterbegin', html));