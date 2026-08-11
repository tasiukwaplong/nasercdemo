/**
 * NASERC Web Portal - Slider & Carousel Module
 * Powers the Homepage Hero Fade Slider and the Regulatory Documents Horizontal Slider
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initDocumentCarousel();
});

/* --------------------------------------------------------------------------
   1. Homepage Hero Fade & Slide Controller
   -------------------------------------------------------------------------- */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.indicator-dot');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');

  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval;
  const autoPlayDelay = 5000;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(nextSlide, autoPlayDelay);
  }

  function stopAutoPlay() {
    if (slideInterval) clearInterval(slideInterval);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoPlay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoPlay(); });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAutoPlay();
    });
  });

  const heroSection = document.querySelector('.hero-slider-section');
  if (heroSection) {
    heroSection.addEventListener('mouseenter', stopAutoPlay);
    heroSection.addEventListener('mouseleave', startAutoPlay);
  }

  startAutoPlay();
}

/* --------------------------------------------------------------------------
   2. Horizontal Document Carousel (3-second auto-delay requirement)
   -------------------------------------------------------------------------- */
function initDocumentCarousel() {
  const track = document.getElementById('docsTrack');
  const prevBtn = document.getElementById('docsPrevBtn');
  const nextBtn = document.getElementById('docsNextBtn');

  if (!track) return;

  const docCards = track.querySelectorAll('.doc-card');
  if (docCards.length === 0) return;

  let currentIndex = 0;
  let carouselInterval;
  const autoDelay = 3000; // 3-second auto delay as specified in requirements

  function getCardWidth() {
    const card = docCards[0];
    const gap = 24; // 1.5rem = 24px
    return card.offsetWidth + gap;
  }

  function getMaxIndex() {
    const visibleCards = window.innerWidth > 992 ? 3 : (window.innerWidth > 640 ? 2 : 1);
    return Math.max(0, docCards.length - visibleCards);
  }

  function moveCarousel(index) {
    const maxIndex = getMaxIndex();
    if (index > maxIndex) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = maxIndex;
    } else {
      currentIndex = index;
    }

    const offset = currentIndex * getCardWidth();
    track.style.transform = `translateX(-${offset}px)`;
  }

  function startAutoCarousel() {
    stopAutoCarousel();
    carouselInterval = setInterval(() => {
      moveCarousel(currentIndex + 1);
    }, autoDelay);
  }

  function stopAutoCarousel() {
    if (carouselInterval) clearInterval(carouselInterval);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      moveCarousel(currentIndex + 1);
      startAutoCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      moveCarousel(currentIndex - 1);
      startAutoCarousel();
    });
  }

  const carouselContainer = document.querySelector('.docs-slider-wrapper');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoCarousel);
    carouselContainer.addEventListener('mouseleave', startAutoCarousel);
  }

  window.addEventListener('resize', () => {
    moveCarousel(currentIndex);
  });

  startAutoCarousel();
}
