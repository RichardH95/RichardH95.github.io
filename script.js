const slider = document.querySelector("#carousel");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
});

slider.addEventListener("mouseup", () => {
  isDown = false;
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = x - startX;
  slider.scrollLeft = scrollLeft - walk;
});

// Adjust images based on scroll position
slider.addEventListener("scroll", (e) => {
  const images = slider.querySelectorAll("img");
  images.forEach((img) => {
    img.style.transform = "translateX(" + slider.scrollLeft * 0.1 + "px)";
  });
});

// Scroll to the last image on page load
window.addEventListener("load", (e) => {
  const carouselItems = slider.querySelectorAll(".carousel-item");
  const itemWidth = carouselItems[0].offsetWidth; // assuming all items are the same width
  const totalWidth = itemWidth * carouselItems.length;
  slider.scrollLeft = totalWidth + slider.offsetWidth;
});

window.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("carousel");
  const carouselItems = document.querySelectorAll(".carousel-item");

  function setCarouselItemWidth() {
    const carouselHeight = carousel.offsetHeight;
    const itemWidth = `${carouselHeight / 3}px`;

    carouselItems.forEach((item) => {
      item.style.width = itemWidth;
    });
  }

  // Initial width calculation
  setCarouselItemWidth();

  // Recalculate width on window resize
  window.addEventListener("resize", setCarouselItemWidth);
});

slider.addEventListener("scroll", () => {
  const carouselWidth = slider.offsetWidth;
  const carouselCenter = slider.scrollLeft + carouselWidth / 2;

  const extraWidth = 0; // adjust this to change the additional space considered

  const carouselItems = slider.querySelectorAll(".carousel-item");
  carouselItems.forEach((item) => {
    const itemWidth = item.offsetWidth;
    const itemLeft = item.offsetLeft - slider.scrollLeft;
    const itemRight = itemLeft + itemWidth;
    const itemCenter = itemLeft + itemWidth / 2;

    if (
      itemCenter > carouselCenter - itemWidth / 2 - extraWidth &&
      itemCenter < carouselCenter + itemWidth / 2 + extraWidth
    ) {
      const img = item.querySelector("img");
      const src = img.src;
      const fileName = src.substring(src.lastIndexOf("/") + 1);
      console.log(fileName);
    }
  });
});
