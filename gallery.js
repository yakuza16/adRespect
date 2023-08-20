import macy from "macy";
import imagesPath from "./imagesPaths";
const masonryGridContainer = document.getElementById("masonryContainer");
const moreImagesBtn = document.getElementById("generateMoreImagesBtn");

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
moreImagesBtn.addEventListener("click", () => {
  createGallery(imagesPath, masonryGridContainer);
  masonry.recalculate();
});

window.addEventListener("DOMContentLoaded", () =>
  createGallery(imagesPath, masonryGridContainer)
);
window.addEventListener("scroll", () => masonry.recalculate());
window.addEventListener("touchmove", () => masonry.recalculate());
