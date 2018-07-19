const images = [...document.querySelectorAll('[data-src]')];

const scrollToSection = (el) => {
  document.querySelector(el).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

// simple lazy load for images (could be improved to wait until images are on screen)
images.forEach((img) => {
  img.setAttribute('src', img.getAttribute('data-src'));
  img.onload = () => {
    img.removeAttribute('data-src');
  };
});
