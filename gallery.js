import macy from "macy"

const masonryGridContainer = document.getElementById("masonryContainer")
const moreImagesBtn = document.getElementById("generateMoreImagesBtn")

const imagesPath = [
  "/public/garden-photos/garden1.png",
  "/public/garden-photos/garden2.png",
  "/public/garden-photos/garden3.png",
  "/public/garden-photos/garden4.png",
  "/public/garden-photos/garden5.png",
  "/public/garden-photos/garden6.png",
  "/public/garden-photos/garden7.png",
  "/public/garden-photos/garden1.png",
  "/public/garden-photos/garden2.png",
]

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
})

function createGallery(images, parentElement) {
  images.forEach((image) => {
    const imageElement = document.createElement("img")
    imageElement.setAttribute("src", image)
    parentElement.appendChild(imageElement)
  })
}
moreImagesBtn.addEventListener("click", () => {
  createGallery(imagesPath, masonryGridContainer)
  masonry.recalculate()
})

window.addEventListener("DOMContentLoaded", () =>
  createGallery(imagesPath, masonryGridContainer)
)
window.addEventListener("scroll", () => masonry.recalculate())
