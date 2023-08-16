import anime from "animejs/lib/anime.es.js";
import Aos from "aos";
import Masonry from "masonry-layout";
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
const masonryContainer = document.getElementById("masonry-container");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModalBtn = document.getElementById("closeModalBtn");

let currentImageIndex = 0;
const images = [
  "/public/garden-photos/garden1.png",
  "/public/garden-photos/garden2.png",
  "/public/garden-photos/garden3.png",
  "/public/garden-photos/garden4.png",
  "/public/garden-photos/garden5.png",
  "/public/garden-photos/garden6.png",
  "/public/garden-photos/garden7.png",
  "https://cdn.pixabay.com/photo/2014/07/31/17/39/meadow-406514_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/10/18/20/46/tea-plantation-1751369_1280.jpg",
  // Dodaj więcej linków do zdjęć
];

function openModal(index) {
  modalImage.src = images[index];
  imageModal.classList.remove("hidden");
}

function closeModal() {
  imageModal.classList.add("hidden");
}

function loadMoreImages() {
  const numImagesToAdd = 1; // Możesz zmienić ilość wczytywanych zdjęć
  for (
    let i = 0;
    i < numImagesToAdd && currentImageIndex < images.length;
    i++
  ) {
    const image = document.createElement("img");
    image.src = images[currentImageIndex];
    image.classList.add("masonry-item");
    masonryContainer.appendChild(image);
    currentImageIndex++;
  }

  // Inicjalizacja masonry po dodaniu nowych zdjęć
  new Masonry(masonryContainer, {
    itemSelector: ".masonry-item",
    columnWidth: ".masonry-item",
    percentPosition: true,
  });

  if (currentImageIndex >= images.length) {
    loadMoreBtn.disabled = true;
  }
}
window.addEventListener("DOMContentLoaded", loadMoreImages());

loadMoreBtn.addEventListener("click", loadMoreImages);

masonryContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("masonry-item")) {
    const index = Array.from(masonryContainer.children).indexOf(event.target);
    openModal(index);
  }
});

closeModalBtn.addEventListener("click", closeModal);
imageModal.addEventListener("click", closeModal);
modalImage.addEventListener("click", (event) => {
  event.stopPropagation(); // Zapobiegamy zamknięciu modala po kliknięciu w sam obrazek
});
