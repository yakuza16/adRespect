import Aos from "aos"
import "aos/dist/aos.css"
import "./style.css"

Aos.init()

const offerMenu = document.getElementById("offer-menu")
const offerMenuList = document.getElementById("offer-menu-list")
const customSiblingFilteredElement = document.getElementById(
  "customSiblingFilteredElement"
)
const customFilteredElement = document.getElementById("customFilteredElement")

const searchLoupBtn = document.getElementById("searchLoup")
const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const searchBar = document.getElementById("search")

function toggleSearchBar() {
  searchInput.classList.toggle("-translate-y-[350%]")
  searchInput.classList.toggle("md:-translate-y-[200%]")
  searchBar.value = ""
}

searchLoupBtn.addEventListener("click", toggleSearchBar) /
  searchBtn.addEventListener("click", toggleSearchBar)
searchBar.addEventListener("keyup", (e) =>
  e.key === "Enter" ? toggleSearchBar() : null
)

function initializeCardsAnimation() {
  const ANGLE = 45
  let customCards = document.querySelectorAll(".customCard")
  let colors = ["white", "white", "white"]

  customCards.forEach((element, i) => {
    floatable(element, colors[i])
  })

  function floatable(panel, color) {
    let content = panel.querySelector(".customCardContent")
    content.style.backgroundColor = color

    panel.addEventListener("mouseout", (e) => {
      content.style.transform = `perspective(1200px)
      rotateX(0deg)
      rotateY(0deg)
      rotateZ(0deg)`
    })
    panel.addEventListener("mousemove", (e) => {
      let w = panel.clientWidth
      let h = panel.clientHeight
      let y = ((e.offsetX - w * 0.4) / w) * ANGLE
      let x = ((1 - (e.offsetY - h * 0.4)) / h) * ANGLE

      content.style.transform = `perspective(300px)
      rotateX(${x}deg)
      rotateY(${y}deg)`
    })
  }
}

window.addEventListener("DOMContentLoaded", () => {
  initializeCardsAnimation
  setTimeout(() => searchInput.classList.remove("hidden"), 1000)
})

offerMenu.addEventListener("mouseover", () =>
  offerMenuList.classList.remove("hidden")
)
offerMenu.addEventListener("touchstart", () =>
  offerMenuList.classList.remove("hidden")
)
offerMenu.addEventListener("mouseleave", () =>
  offerMenuList.classList.add("hidden")
)
offerMenu.addEventListener("touchend", () =>
  offerMenuList.classList.add("hidden")
)

customSiblingFilteredElement.addEventListener("mouseenter", () =>
  customFilteredElement.classList.add("filterEffect")
)
customSiblingFilteredElement.addEventListener("mouseleave", () =>
  customFilteredElement.classList.remove("filterEffect")
)
