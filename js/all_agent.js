document.addEventListener("DOMContentLoaded", () => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    document.querySelectorAll("video").forEach((video) => {
      video.controls = true;
    });
  }

  const abilityButtons = document.querySelectorAll(".ability-btn");
  const abilityContents = document.querySelectorAll(".ability-content");
  const videos = document.querySelectorAll("video");

  abilityButtons.forEach((button) => {
    button.addEventListener("click", function () {
      abilityButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      abilityContents.forEach((content) => {
        content.style.opacity = "0";
        content.style.transform = "translateY(10px)";
        setTimeout(() => {
          content.classList.add("hidden");
        }, 300);
      });

      videos.forEach((video) => video.pause());

      const abilityId = this.id.replace("-btn", "");
      const abilityContent = document.getElementById(abilityId);

      setTimeout(() => {
        abilityContent.classList.remove("hidden");
        setTimeout(() => {
          abilityContent.style.opacity = "1";
          abilityContent.style.transform = "translateY(0)";
        }, 50);
      }, 300);

      const video = document.getElementById(`${abilityId}-v`);
      if (video) {
        video.currentTime = 0;
        if (!isMobile) {
          setTimeout(() => {
            video.play().catch((error) => {
              console.log("Video play failed:", error);
              if (!video.controls) {
                video.controls = true;
              }
            });
          }, 400);
        }
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    });
  });

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.3)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });

  const banner = document.querySelector(".agent-banner-bg");
  if (banner) {
    window.addEventListener("scroll", function () {
      const scrollPosition = window.scrollY;
      if (scrollPosition < 500) {
        banner.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      }
    });
  }

  document.getElementById("a1-btn").click();

  document.addEventListener("click", function (event) {
    const navbar = document.querySelector(".navbar");
    const menuToggle = document.getElementById("menu-toggle");

    if (!navbar.contains(event.target) && menuToggle.checked) {
      menuToggle.checked = false;
    }
  });
});
