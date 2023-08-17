import anime from "animejs/lib/anime.es.js";
import Aos from "aos";
import macy from "macy";
import "aos/dist/aos.css";
import "./style.css";

Aos.init();

const offerMenu = document.getElementById("offer-menu");
const offerMenuList = document.getElementById("offer-menu-list");
const searchLoupBtn = document.getElementById("searchLoup");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchBar = document.getElementById("search");
const sliderImg = document.getElementById("slider-image");
const prevSlideBtn = document.getElementById("prevSlideBtn");
const nextSlideBtn = document.getElementById("nextSlideBtn");
let isSearchBarOpen = false;

function initializeCardsAnimation() {
  const ANGLE = 45;
  let customCards = document.querySelectorAll(".customCard");
  let colors = ["white", "white", "white"];

  customCards.forEach((element, i) => {
    floatable(element, colors[i]);
  });

  function floatable(panel, color) {
    let content = panel.querySelector(".customCardContent");
    content.style.backgroundColor = color;

    panel.addEventListener("mouseout", (e) => {
      content.style.transform = `perspective(1200px)
                 rotateX(0deg)
                 rotateY(0deg)
                 rotateZ(0deg)`;
    });
    panel.addEventListener("mousemove", (e) => {
      let w = panel.clientWidth;
      let h = panel.clientHeight;
      let y = ((e.offsetX - w * 0.4) / w) * ANGLE;
      let x = ((1 - (e.offsetY - h * 0.4)) / h) * ANGLE;

      content.style.transform = `perspective(300px)
                 rotateX(${x}deg)
                 rotateY(${y}deg)`;
    });
  }
}

window.addEventListener("DOMContentLoaded", initializeCardsAnimation);

window.addEventListener("scroll", () => {
  if (window.scrollY > 5) {
    sliderImg.classList.remove("blur-lg");
  } else if (window.scrollY <= 5) {
    sliderImg.classList.add("blur-lg");
  }
});

offerMenu.addEventListener("mouseover", () =>
  offerMenuList.classList.remove("hidden")
);
offerMenu.addEventListener("touchstart", () =>
  offerMenuList.classList.remove("hidden")
);
offerMenu.addEventListener("mouseleave", () =>
  offerMenuList.classList.add("hidden")
);
offerMenu.addEventListener("touchend", () =>
  offerMenuList.classList.add("hidden")
);

function hideSearchBar() {
  searchBar.value = "";
  anime({
    targets: searchInput,
    translateX: 550,
    easing: "linear",
  });
  setTimeout(() => searchInput.classList.add("hidden"), 400);
  isSearchBarOpen = false;
}

searchLoupBtn.addEventListener("click", () => {
  if (!isSearchBarOpen) {
    searchInput.classList.remove("hidden");
    anime({
      targets: searchInput,
      translateX: -550,
      easing: "easeInOutSine",
    });
    isSearchBarOpen = !isSearchBarOpen;
  } else {
    hideSearchBar();
  }
});

searchBtn.addEventListener("click", hideSearchBar);
searchBar.addEventListener("keyup", (e) =>
  e.key === "Enter" ? hideSearchBar() : null
);

// MASONRY
const masonryGridContainer = document.getElementById("masonryContainer");
const moreImagesBtn = document.getElementById("generateMoreImagesBtn");
moreImagesBtn.addEventListener("click", () => {
  createGallery(images, masonryGridContainer);
  masonry.recalculate();
});

const masonry = macy({
  container: masonryGridContainer,
  trueOrder: false,
  waitForImages: false,
  margin: 36,
  columns: 3,
  breakAt: {
    1200: 5,
    940: 3,
    520: 2,
    400: 1,
  },
});

function createGallery(images, parentElement) {
  images.forEach((image) => {
    const imageElement = document.createElement("img");
    imageElement.setAttribute("src", image);
    parentElement.appendChild(imageElement);
  });
}

window.addEventListener("DOMContentLoaded", () =>
  createGallery(images, masonryGridContainer)
);
window.addEventListener("scroll", () => masonry.recalculate());

const images = [
  "/public/garden-photos/garden1.png",
  "/public/garden-photos/garden2.png",
  "/public/garden-photos/garden3.png",
  "/public/garden-photos/garden4.png",
  "/public/garden-photos/garden5.png",
  "/public/garden-photos/garden6.png",
  "/public/garden-photos/garden7.png",
  "/public/garden-photos/garden1.png",
  "/public/garden-photos/garden2.png",
];
