import anime from "animejs/lib/anime.es.js";
import "./style.css";

const offerMenu = document.getElementById("offer-menu");
const offerMenuList = document.getElementById("offer-menu-list");
const searchLoupBtn = document.getElementById("searchLoup");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchBar = document.getElementById("search");
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
