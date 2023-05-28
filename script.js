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
  const images = slider.querySelectorAll("img");
  const lastImage = images[images.length - 1];
  const scrollPos =
    lastImage.offsetLeft - slider.offsetWidth / 2 + lastImage.offsetWidth / 2;
  slider.scrollLeft = scrollPos;
});
