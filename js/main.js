/**
 * NASERC Web Portal - Core JavaScript Application
 * Global UI initializations, Mobile Navigation, Accessibility, and Utilities.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initStickyHeader();
  initAccessibilityControls();
  initQuickSearch();
  setActiveNavLink();
});

/* --------------------------------------------------------------------------
   1. Mobile Navigation & Drawer Toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const drawer = document.getElementById('mobileDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const submenuToggles = document.querySelectorAll('.mobile-submenu-toggle');

  if (!drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const submenu = toggle.nextElementSibling;
      if (submenu) {
        submenu.classList.toggle('open');
        const icon = toggle.querySelector('i');
        if (icon) icon.classList.toggle('fa-chevron-up');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   2. Sticky Header Shadow Dynamics
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 10px 25px -5px rgba(10, 25, 47, 0.12)';
      header.style.padding = '0.2rem 0';
    } else {
      header.style.boxShadow = 'var(--shadow-sm)';
      header.style.padding = '0';
    }
  });
}

/* --------------------------------------------------------------------------
   3. Navigation Active Link Handler
   -------------------------------------------------------------------------- */
function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-item, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      const navItem = link.closest('.nav-item');
      if (navItem) navItem.classList.add('active');
    }
  });
}

/* --------------------------------------------------------------------------
   4. Quick Search Popup / Search Modal
   -------------------------------------------------------------------------- */
function initQuickSearch() {
  const searchInputs = document.querySelectorAll('.quick-search-input');
  searchInputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const query = input.value.trim();
        if (query) {
          window.location.href = `regulations.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Accessibility Controls (High Contrast / Text Sizing)
   -------------------------------------------------------------------------- */
function initAccessibilityControls() {
  const contrastBtn = document.getElementById('toggleContrastBtn');
  const fontIncreaseBtn = document.getElementById('fontIncreaseBtn');
  const fontResetBtn = document.getElementById('fontResetBtn');

  let currentFontSize = 16;

  if (contrastBtn) {
    contrastBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.toggle('high-contrast');
      const isHighContrast = document.body.classList.contains('high-contrast');
      showToast(isHighContrast ? 'High Contrast Mode Enabled' : 'Standard View Restored', 'info');
    });
  }

  if (fontIncreaseBtn) {
    fontIncreaseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentFontSize < 20) {
        currentFontSize += 1;
        document.documentElement.style.fontSize = `${currentFontSize}px`;
      }
    });
  }

  if (fontResetBtn) {
    fontResetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentFontSize = 16;
      document.documentElement.style.fontSize = '16px';
    });
  }
}

/* --------------------------------------------------------------------------
   6. Global Toast Notification System
   -------------------------------------------------------------------------- */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let iconClass = 'fa-check-circle';
  if (type === 'warning') iconClass = 'fa-exclamation-triangle';
  if (type === 'danger') iconClass = 'fa-times-circle';
  if (type === 'info') iconClass = 'fa-info-circle';

  toast.innerHTML = `
    <i class="fas ${iconClass}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 50);

  // Auto remove after 3.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
