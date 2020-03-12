import "./styles/app/scss/styles.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./images/color-game.jpg";

const images = [...document.querySelectorAll("[data-src]")];
const downArrow = document.querySelector(".fa-angle-double-down");

const scrollToSection = el => {
  document.querySelector(el).scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
};

downArrow.addEventListener("click", () => {
  scrollToSection("#about");
});

downArrow.addEventListener("keypress", event => {
  if (event.key === "Enter" || event.key === " ") {
    scrollToSection("#about");
  }
});

// simple lazy load for images (could be improved to wait until images are on screen)
images.forEach(img => {
  img.setAttribute("src", img.getAttribute("data-src"));
  img.addEventListener("load", () => {
    img.removeAttribute("data-src");
  });
});
