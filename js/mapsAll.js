document.addEventListener("DOMContentLoaded", function () {
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const slides = document.querySelectorAll(".slider");
  let currentIndex = 0;

  function showSlide(index) {
    if (index >= slides.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slides.length - 1;
    } else {
      currentIndex = index;
    }

    slides.forEach((slide) => {
      slide.classList.remove("show");
    });

    slides[currentIndex].classList.add("show");
  }

  nextBtn.addEventListener("click", function () {
    showSlide(currentIndex + 1);
  });

  prevBtn.addEventListener("click", function () {
    showSlide(currentIndex - 1);
  });

  showSlide(0);
});
