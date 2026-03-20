/* ============================================
   PURE SALON — FULL FIXED JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* 1. NAV — scroll effect */
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /* 2. MOBILE MENU */
  var hamburger  = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }

  window.closeMobile = function () {
    if (hamburger)  hamburger.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
  };

  /* 3. SCROLL REVEAL */
  var revealEls = document.querySelectorAll('.reveal');

  if (revealEls.length > 0) {
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add('visible');
      });
    }
  }

  /* 4. PRICING TABS */
  window.switchTab = function (id, btn) {
    var lists = document.querySelectorAll('.price-list');
    var tabs  = document.querySelectorAll('.ptab');
    var target = document.getElementById('tab-' + id);

    if (!target) return;

    lists.forEach(el => el.classList.remove('active'));
    tabs.forEach(el => el.classList.remove('active'));

    target.classList.add('active');
    if (btn) btn.classList.add('active');
  };

  /* 5. TESTIMONIALS */
  var track = document.getElementById('testiTrack');
  var dotsContainer = document.getElementById('testiDots');

  if (track && dotsContainer) {
    var cards = track.querySelectorAll('.testi-card');
    var current = 0;

    if (cards.length > 0) {
      cards.forEach((_, i) => {
        let dot = document.createElement('button');
        dot.className = 'testi-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goTo(i);
        dotsContainer.appendChild(dot);
      });

      function goTo(n) {
        current = n;
        track.style.transform = `translateX(-${n * 100}%)`;
        document.querySelectorAll('.testi-dot').forEach((d, i) =>
          d.classList.toggle('active', i === n)
        );
      }

      setInterval(() => goTo((current + 1) % cards.length), 4500);
    }
  }

  /* 6. BOOKING FORM */
  (function () {
    const btn = document.getElementById('whatsappBtn');
    const form = document.getElementById('bookingForm');
    const success = document.getElementById('formSuccess');

    if (!btn || !form || !success) return;

    const dateInput = document.getElementById('fdate');
    if (dateInput) {
      try {
        dateInput.min = new Date().toISOString().split('T')[0];
      } catch {}
    }

    btn.addEventListener('click', () => {
      const name = document.getElementById('fname')?.value.trim();
      const phone = document.getElementById('fphone')?.value.trim();
      const date = document.getElementById('fdate')?.value;
      const service = document.getElementById('fservice')?.value;
      const notes = document.getElementById('fnotes')?.value.trim();

      if (!name || !phone || !date || !service) {
        alert("Please fill all required fields!");
        return;
      }

      const formattedDate = new Date(date).toLocaleDateString('en-KE');

      const msg = `Hello! I would like to book:%0A%0A` +
                  `Name: ${name}%0APhone: ${phone}%0A` +
                  `Date: ${formattedDate}%0AService: ${service}%0A` +
                  `Notes: ${notes}`;

      btn.disabled = true;
      window.open(`https://wa.me/254741593962?text=${msg}`, '_blank');

      success.classList.add('visible');
      form.reset();

      setTimeout(() => {
        success.classList.remove('visible');
        btn.disabled = false;
      }, 5000);
    });
  })();

  /* 7. REVIEW SYSTEM */
  const stars = document.querySelectorAll('#starRating span');
  const reviewBtn = document.getElementById('sendReviewBtn');
  let rating = 0;

  if (stars.length > 0) {
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        rating = index + 1;

        stars.forEach(s => s.classList.remove('active'));
        for (let i = 0; i < rating; i++) {
          stars[i].classList.add('active');
        }
      });
    });
  }

  if (reviewBtn) {
    reviewBtn.addEventListener('click', () => {
      const name = document.getElementById('rname')?.value.trim();
      const message = document.getElementById('rmessage')?.value.trim();

      if (!name || rating === 0 || !message) {
        alert("Please complete the review!");
        return;
      }

      const starsText = "⭐".repeat(rating);

      const text = `New Review:%0A%0A` +
                   `Name: ${name}%0A` +
                   `Rating: ${starsText}%0A` +
                   `Review: ${message}`;

      window.open(`https://wa.me/254741593962?text=${text}`, '_blank');
    });
  }

  /* 8. BOSS-LEVEL GALLERY LIGHTBOX */
  (function() {
    const galleryImages = document.querySelectorAll(".gallery-item img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    const closeBtn = document.querySelector(".close");

    if (!galleryImages.length || !lightbox || !lightboxImg) return;

    let currentIndex = 0;
    const imagesArray = Array.from(galleryImages).map(img => img.src);

    galleryImages.forEach((img, i) => {
      img.parentElement.addEventListener("click", () => {
        currentIndex = i;
        lightbox.style.display = "flex";
        lightboxImg.src = imagesArray[currentIndex];
      });
    });

    function showImage() {
      lightboxImg.src = imagesArray[currentIndex];
    }

    function closeLightbox() {
      lightbox.style.display = "none";
    }

    function changeSlide(dir) {
      currentIndex += dir;
      if (currentIndex < 0) currentIndex = imagesArray.length - 1;
      if (currentIndex >= imagesArray.length) currentIndex = 0;
      showImage();
    }

    nextBtn?.addEventListener("click", () => changeSlide(1));
    prevBtn?.addEventListener("click", () => changeSlide(-1));
    closeBtn?.addEventListener("click", closeLightbox);

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") changeSlide(1);
      if (e.key === "ArrowLeft") changeSlide(-1);
      if (e.key === "Escape") closeLightbox();
    });

    let startX = 0;
    lightbox.addEventListener("touchstart", e => startX = e.touches[0].clientX);
    lightbox.addEventListener("touchend", e => {
      let endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) changeSlide(1);
      if (endX - startX > 50) changeSlide(-1);
    });
  })();

});
