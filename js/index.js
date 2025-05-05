document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 0;
  const slides = document.querySelectorAll(".slide-container");
  const slideCount = slides.length;

  function showSlides() {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    slideIndex++;
    if (slideIndex > slideCount) {
      slideIndex = 1;
    }

    slides[slideIndex - 1].classList.add("active");
    setTimeout(showSlides, 3000); // Changed to 3 seconds
  }

  if (slides.length > 0) {
    slides[0].classList.add("active");
    setTimeout(showSlides, 3000);
  }
});
