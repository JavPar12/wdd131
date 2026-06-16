// ============================================
//  PORTFOLIO.JS 
// ============================================

// ==========================================
// DATOS — categories and photos
// ==========================================
const CATEGORIES = {
  portraits: {
    label: "PORTRAITS",
    photos: Array.from({ length: 20 }, (_, i) => i + 1),
  },
  events: {
    label: "EVENTS",
    photos: Array.from({ length: 20 }, (_, i) => i + 21),
  },
  cinematic: {
    label: "CINEMATIC",
    photos: Array.from({ length: 20 }, (_, i) => i + 41),
  },
  studio: {
    label: "STUDIO",
    photos: Array.from({ length: 18 }, (_, i) => i + 61),
  },
};

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // MOBILE NAV 
  // ==========================================
  const hamburger = document.querySelector(".navbar__hamburger");
  const mobileNav = document.getElementById("mobileNav");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("is-open");
      hamburger.setAttribute("aria-expanded", open);
    });

    mobileNav.querySelectorAll(".mobile-nav__link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  const savedCategory = localStorage.getItem("lastViewedCategory");
  if (savedCategory) {
    const card = document.querySelector(`.category-card[data-category="${savedCategory}"]`);
    if (card) card.click();
  }
  
  // ==========================================
  // HOME SLIDER (only in index.html)
  // ==========================================
  const track = document.getElementById("sliderTrack");

  if (track) {
    const featured = [18, 4, 12, 24, 30, 45, 46, 66, 75];
    let current = 0;

    featured.forEach((num, i) => {
      const img = document.createElement("img");
      img.src = `images/portrait${num}.jpg`;
      img.alt = `Portrait ${num}`;
      if (i === 0) img.classList.add("is-active");
      track.appendChild(img);
    });

    const imgs = track.querySelectorAll("img");
    const dotsContainer = document.getElementById("sliderDots");

    if (dotsContainer) {
      featured.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.classList.add("slider__dot");
        if (i === 0) dot.classList.add("is-active");
        dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
        dot.addEventListener("click", () => goTo(i));
        dotsContainer.appendChild(dot);
      });
    }

    const dots = dotsContainer
      ? dotsContainer.querySelectorAll(".slider__dot")
      : [];

    function goTo(index) {
      imgs[current].classList.remove("is-active");
      if (dots[current]) dots[current].classList.remove("is-active");
      current = (index + imgs.length) % imgs.length;
      imgs[current].classList.add("is-active");
      if (dots[current]) dots[current].classList.add("is-active");
    }

    document
      .querySelector(".slider__btn--prev")
      ?.addEventListener("click", () => goTo(current - 1));
    document
      .querySelector(".slider__btn--next")
      ?.addEventListener("click", () => goTo(current + 1));

    track.addEventListener("click", () => {
      window.location.href = "portfolio.html";
    });

    setInterval(() => goTo(current + 1), 4000);
  }

  // ==========================================
  // PORTFOLIO — Categories & Gallery
  // (only in portfolio.html)
  // ==========================================
  const viewCategories = document.getElementById("viewCategories");
  const viewGallery = document.getElementById("viewGallery");
  const galleryGrid = document.getElementById("galleryGrid");
  const galleryTitle = document.getElementById("galleryTitle");
  const btnBack = document.getElementById("btnBack");

  if (viewCategories && viewGallery) {
    let currentPhotos = [];
    let lightboxIndex = 0;

    document.querySelectorAll(".category-card").forEach((card) => {
      card.addEventListener("click", () => {
        const key = card.dataset.category;
        localStorage.setItem("lastViewedCategory", key);
        const cat = CATEGORIES[key];

        galleryTitle.textContent = cat.label;
        galleryGrid.innerHTML = "";
        currentPhotos = cat.photos;

        cat.photos.forEach((num, i) => {
          const img = document.createElement("img");
          img.src = `images/portrait${num}.jpg`;
          img.alt = `${cat.label} ${i + 1}`;
          img.addEventListener("click", () => openLightbox(i));
          galleryGrid.appendChild(img);
        });

        viewCategories.style.display = "none";
        viewGallery.style.display = "block";
        window.scrollTo(0, 0);
      });
    });

    // LIGHTBOX
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxPrev = document.getElementById("lightboxPrev");
    const lightboxNext = document.getElementById("lightboxNext");

    function openLightbox(index) {
      lightboxIndex = index;
      lightboxImg.src = `images/portrait${currentPhotos[index]}.jpg`;
      lightbox.style.display = "flex";
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.style.display = "none";
      document.body.style.overflow = "";
    }

    function lightboxGo(index) {
      lightboxIndex = (index + currentPhotos.length) % currentPhotos.length;
      lightboxImg.src = `images/portrait${currentPhotos[lightboxIndex]}.jpg`;
    }

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrev.addEventListener("click", () => lightboxGo(lightboxIndex - 1));
    lightboxNext.addEventListener("click", () => lightboxGo(lightboxIndex + 1));

    document.addEventListener("keydown", (e) => {
      if (lightbox.style.display === "flex") {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") lightboxGo(lightboxIndex - 1);
        if (e.key === "ArrowRight") lightboxGo(lightboxIndex + 1);
      }
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // ==========================================
  // CONTACT FORM (only in contact.html)
  // ==========================================
  const submitBtn = document.getElementById("submitBtn");
  const formFeedback = document.getElementById("formFeedback");

  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const category = document.getElementById("category").value;
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !category || !message) {
        formFeedback.textContent = "Please fill in all fields.";
        formFeedback.className = "contact-form__feedback error";
        return;
      }

      if (!email.includes("@")) {
        formFeedback.textContent = "Please enter a valid email.";
        formFeedback.className = "contact-form__feedback error";
        return;
      }

      submitBtn.textContent = "SENDING...";
      submitBtn.disabled = true;

      setTimeout(() => {
        formFeedback.textContent = "Message sent! I'll get back to you soon.";
        formFeedback.className = "contact-form__feedback success";
        submitBtn.textContent = "SEND";
        submitBtn.disabled = false;

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("category").value = "";
        document.getElementById("message").value = "";
      }, 1000);
    });
  }
});
