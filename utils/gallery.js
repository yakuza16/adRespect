import macy from "macy"
import imagesPath from "./imagesPaths"
const closeModalButton = document.getElementById("closeModalButton")
const masonryGridContainer = document.getElementById("masonryContainer")
const moreImagesBtn = document.getElementById("generateMoreImagesBtn")
const galleryModal = document.getElementById("galleryModal")
const modalImage = document.getElementById("modalImage")
const galleryBtns = document.querySelectorAll(".galleryBtn")

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
    imageElement.setAttribute("loading", "lazy")
    imageElement.classList.add("masonryChild")
    parentElement.appendChild(imageElement)
  })
  const allMasonryItems = document.querySelectorAll(".masonryChild")
  allMasonryItems.forEach((image) => {
    image.addEventListener("click", () => {
      galleryModal.showModal()
      galleryModal.classList.add("overlay")
      modalImage.src = image.src
    })
  })
}

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

galleryBtns.forEach((button) =>
  button.addEventListener("click", () => {
    const randomNum = generateRandomNumber(0, imagesPath.length - 1)
    modalImage.src = imagesPath[randomNum]
  })
)

moreImagesBtn.addEventListener("click", () => {
  createGallery(imagesPath, masonryGridContainer)
  masonry.recalculate()
})

window.addEventListener("DOMContentLoaded", () =>
  createGallery(imagesPath, masonryGridContainer)
)
window.addEventListener("scroll", () => masonry.recalculate())
window.addEventListener("touchmove", () => masonry.recalculate())

closeModalButton.addEventListener("click", () => {
  galleryModal.classList.remove("overlay")
  galleryModal.close()
})
