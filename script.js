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

window.onload = function () {
  var imgElements = document.getElementsByTagName("img");
  var imgCoordinates = [];
  var centerDiv = document.querySelector(".centered-div");
  var imageGroupDiv = document.querySelector(".carousel-text");

  // Function to calculate coordinates
  var calculateCoordinates = function () {
    imgCoordinates = []; // Reset coordinates array

    // Get center-div coordinates
    var centerRect = centerDiv.getBoundingClientRect();
    var centerCoordinates = {
      x: centerRect.left + window.scrollX,
      y: centerRect.top + window.scrollY,
      width: centerRect.width,
      height: centerRect.height,
      right: centerRect.right + window.scrollX,
      bottom: centerRect.bottom + window.scrollY,
    };

    for (let i = 0; i < imgElements.length; i++) {
      let rect = imgElements[i].getBoundingClientRect();
      let imgCoord = {
        imgIndex: i,
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
        width: rect.width,
        height: rect.height,
        right: rect.right + window.scrollX,
        bottom: rect.bottom + window.scrollY,
      };
      imgCoordinates.push(imgCoord);

      // Check if center-div is inside this image
      if (
        centerCoordinates.x >= imgCoord.x + imgElements[0].width / 5 &&
        centerCoordinates.y >= imgCoord.y &&
        centerCoordinates.right <= imgCoord.right &&
        centerCoordinates.bottom <= imgCoord.bottom
      ) {
        // Update text inside image-group div
        imageGroupDiv.innerText = imgElements[i].alt;
      }
    }
  };

  // Calculate coordinates when the page is loaded
  calculateCoordinates();

  // Calculate coordinates when the user scrolls
  slider.addEventListener("scroll", calculateCoordinates);
};
