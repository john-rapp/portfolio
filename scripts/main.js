function scrollToSection(el) {
  document.querySelector(el).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}
