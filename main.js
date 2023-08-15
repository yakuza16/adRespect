import anime from "animejs/lib/anime.es.js";
import "./style.css";

const offerMenu = document.getElementById("offer-menu");
const offerMenuList = document.getElementById("offer-menu-list");
const searchLoupBtn = document.getElementById("searchLoup");
const searchInput = document.getElementById("search-input");
let isSearchBarOpen = false;

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

searchLoupBtn.addEventListener("click", () => {
  if (!isSearchBarOpen) {
    anime({
      targets: searchInput,
      translateX: -500,
      easing: "easeInOutSine",
    });
    // searchInput.classList.remove("hidden");
  } else {
    anime({
      targets: searchInput,
      translateX: 500,
      easing: "linear",
    });
    // searchInput.classList.add("hidden");
  }
  isSearchBarOpen = !isSearchBarOpen;
});
