/* =====================================================
   TEKNIKO GLOBAL — script.js
   ===================================================== */

/* ===== STICKY HEADER ===== */
window.addEventListener('scroll', function () {
  document.getElementById('header').classList.toggle('sticky', window.scrollY > 50);
});

/* ===== MOBILE MENU ===== */
document.getElementById('menuToggle').addEventListener('click', function () {
  this.classList.toggle('active');
  document.getElementById('mainNav').classList.toggle('effect');
  document.body.classList.toggle('menu-open');
});

document.querySelectorAll('.has-drop > .main_link').forEach(function (link) {
  link.addEventListener('click', function (e) {
    if (window.innerWidth < 1199) {
      e.preventDefault();
      var dropdown = this.parentElement.querySelector('.mob-dropdown');
      if (dropdown) dropdown.classList.toggle('open');
    }
  });
});

/* ===== BANNER SLIDER ===== */
var currentSlide = 0;
var totalSlides   = 6;
var sliderTimer;
var isPaused      = false;

var slides = document.querySelectorAll('.banner-slide');
var thumbs = document.querySelectorAll('.thumbnail');
var dots   = document.querySelectorAll('.slider-dot');

function goTo(n) {
  slides[currentSlide].classList.remove('active');
  thumbs[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  currentSlide = ((n % totalSlides) + totalSlides) % totalSlides;

  slides[currentSlide].classList.add('active');
  thumbs[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');

  clearInterval(sliderTimer);
  if (!isPaused) {
    sliderTimer = setInterval(function () { goTo(currentSlide + 1); }, 6000);
  }
}

/* Auto-play */
sliderTimer = setInterval(function () { goTo(currentSlide + 1); }, 6000);

/* Pause on hover */
var bannerEl = document.querySelector('.banner');
bannerEl.addEventListener('mouseenter', function () {
  isPaused = true;
  clearInterval(sliderTimer);
});
bannerEl.addEventListener('mouseleave', function () {
  isPaused = false;
  sliderTimer = setInterval(function () { goTo(currentSlide + 1); }, 6000);
});

/* Touch swipe support */
var touchStartX = 0;
bannerEl.addEventListener('touchstart', function (e) {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

bannerEl.addEventListener('touchend', function (e) {
  var delta = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(delta) > 50) {
    goTo(delta > 0 ? currentSlide + 1 : currentSlide - 1);
  }
}, { passive: true });

/* ===== INTERSECTION OBSERVER — scroll animations ===== */
var animObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.anim-fade, .anim-scale').forEach(function (el) {
  animObserver.observe(el);
});

/* ===== TECHNOLOGIES BOX OBSERVER ===== */
var techBoxes    = document.querySelectorAll('.technologies-box');
var techObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

techBoxes.forEach(function (box) {
  techObserver.observe(box);
});

/* ===== ANIMATED COUNTERS ===== */
var counters = [
  { el: document.getElementById('c1'), target: 18, suffix: '+' },
  { el: document.getElementById('c2'), target: 61, suffix: '%' },
  { el: document.getElementById('c3'), target: 5,  suffix: '+' },
  { el: document.getElementById('c4'), target: 85, suffix: '+' }
];

var countersDone    = false;
var counterObserver = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting && !countersDone) {
    countersDone = true;

    counters.forEach(function (counter) {
      var value = 0;
      var step  = Math.max(1, Math.ceil(counter.target / 55));
      counter.el.parentElement.classList.add('in');

      var ticker = setInterval(function () {
        value += step;
        if (value >= counter.target) {
          value = counter.target;
          clearInterval(ticker);
        }
        counter.el.textContent = value + counter.suffix;
      }, 28);
    });
  }
}, { threshold: 0.3 });

var aboutSection = document.querySelector('.about-section');
if (aboutSection) {
  counterObserver.observe(aboutSection);
}