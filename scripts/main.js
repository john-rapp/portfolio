function scrollToSection(el) {
  document.querySelector(el).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

let images = [...document.querySelectorAll('[data-src]')];
images.forEach(img => {
  img.setAttribute('src', img.getAttribute('data-src'));
  img.onload = function() {
    img.removeAttribute('data-src');
  };
});
