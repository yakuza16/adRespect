import imagesPath from "./imagesPaths";

const sliderImg = document.getElementById("slider-image");
const prevSlideBtn = document.getElementById("prevSlideBtn");
const nextSlideBtn = document.getElementById("nextSlideBtn");
let active = 4;
let intervalId = null;

sliderImg.src = imagesPath[active];

const handleClickRight = () => {
  if (active < imagesPath.length - 1) {
    active++;
    prevSlideBtn.style.opacity = "100%";
    sliderImg.src = imagesPath[active];
    if (active === imagesPath.length - 1) {
      active = 0;
      sliderImg.src = imagesPath[active];
    }
  }
};

const handleClickLeft = () => {
  clearInterval(intervalId);
  if (active === 0) {
    active = imagesPath.length - 1;
    sliderImg.src = imagesPath[active];
  } else {
    active--;
    sliderImg.src = imagesPath[active];
  }
};

nextSlideBtn.addEventListener("click", handleClickRight);
prevSlideBtn.addEventListener("click", handleClickLeft);

window.addEventListener("DOMContentLoaded", () => {
  intervalId = setInterval(handleClickRight, 5000);
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 3) {
    sliderImg.classList.remove("blur-lg");
  } else if (window.scrollY <= 3) {
    sliderImg.classList.add("blur-lg");
  }
});
