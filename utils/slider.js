import imagesPath from "./imagesPaths"

const prevSlideBtn = document.getElementById("prevSlideBtn")
const nextSlideBtn = document.getElementById("nextSlideBtn")
let active = 4
let intervalId = null

const sliderContainer = document.getElementById("slider-image-container")
sliderContainer.style.backgroundImage = `url('${imagesPath[active]}')`

const handleClickRight = () => {
  if (active < imagesPath.length - 1) {
    active++
    prevSlideBtn.style.opacity = "100%"
    sliderContainer.style.backgroundImage = `url('${imagesPath[active]}')`
    if (active === imagesPath.length - 1) {
      active = 0
      sliderContainer.style.backgroundImage = `url('${imagesPath[active]}')`
    }
  }
}

const handleClickLeft = () => {
  clearInterval(intervalId)
  if (active === 0) {
    active = imagesPath.length - 1
    sliderContainer.style.backgroundImage = `url('${imagesPath[active]}')`
  } else {
    active--
    sliderContainer.style.backgroundImage = `url('${imagesPath[active]}')`
  }
}

nextSlideBtn.addEventListener("click", () => {
  clearInterval(intervalId)
  handleClickRight()
  setTimeout(() => {
    clearInterval(intervalId)
    intervalId = setInterval(handleClickRight, 3000)
  }, 8000)
})
prevSlideBtn.addEventListener("click", () => {
  clearInterval(intervalId)
  handleClickLeft()
  setTimeout(() => {
    clearInterval(intervalId)
    intervalId = setInterval(handleClickRight, 3000)
  }, 8000)
})

window.addEventListener("DOMContentLoaded", () => {
  intervalId = setInterval(handleClickRight, 3000)
})

window.addEventListener("scroll", () => {
  if (window.scrollY > 3) {
    sliderContainer.classList.remove("blur-lg")
  } else if (window.scrollY <= 3) {
    sliderContainer.classList.add("blur-lg")
  }
})
