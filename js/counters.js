/**
 * NASERC Web Portal - Statistics Animated Counter Module
 * Animates key metrics when scrolled into view.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAnimatedCounters();
});

function initAnimatedCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.getAttribute('data-target'), 10);
        const prefix = target.getAttribute('data-prefix') || '';
        const suffix = target.getAttribute('data-suffix') || '';

        animateCounter(target, targetValue, prefix, suffix);
        obs.unobserve(target);
      }
    });
  }, observerOptions);

  statNumbers.forEach(num => observer.observe(num));
}

function animateCounter(element, targetValue, prefix = '', suffix = '') {
  let startValue = 0;
  const duration = 2000;
  const steps = 60;
  const stepTime = duration / steps;
  const increment = targetValue / steps;

  const timer = setInterval(() => {
    startValue += increment;
    if (startValue >= targetValue) {
      startValue = targetValue;
      clearInterval(timer);
    }
    
    // Format large numbers with commas if needed
    const formattedNumber = Math.floor(startValue).toLocaleString();
    element.textContent = `${prefix}${formattedNumber}${suffix}`;
  }, stepTime);
}
