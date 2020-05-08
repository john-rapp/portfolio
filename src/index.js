import "./styles/app/scss/styles.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./images/color-game.png";
import "./images/portfolio.png";

const images = [...document.querySelectorAll("[data-src]")];

images.forEach((img) => {
  img.setAttribute("src", img.getAttribute("data-src"));
  img.addEventListener("load", () => {
    img.removeAttribute("data-src");
  });
});
