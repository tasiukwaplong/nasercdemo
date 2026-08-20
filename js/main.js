/**
 * NASERC Web Portal - Core Global Logic
 * Handles Sticky Nav, Mobile Drawer, Accessibility Toggles, and Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initAccessibilityControls();
});

/* Mobile Drawer Navigation */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  
  if (!toggleBtn) return;

  // Create backdrop if not exists
  let backdrop = document.querySelector('.drawer-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'drawer-backdrop';
    document.body.appendChild(backdrop);
  }

  // Create drawer element if not exists
  let drawer = document.querySelector('.mobile-drawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.className = 'mobile-drawer';
    drawer.innerHTML = `
      <div class="drawer-header">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <img src="https://naserc.na.gov.ng/logo.png" style="height: 32px;" alt="Logo">
          <strong style="font-family: var(--font-heading); font-size: 1.1rem; color: var(--white);">NASERC Portal</strong>
        </div>
        <button class="drawer-close" id="drawerCloseBtn">&times;</button>
      </div>
      <div class="drawer-body">
        <ul class="mobile-nav-list">
          <li class="mobile-nav-item"><a href="index.html" class="mobile-nav-link">Home</a></li>
          <li class="mobile-nav-item">
            <a href="about.html" class="mobile-nav-link">About Us</a>
            <div class="mobile-submenu open">
              <a href="about.html#mandate" class="mobile-submenu-item">Statutory Mandate</a><br>
              <a href="about.html#vision" class="mobile-submenu-item">Vision & Mission</a><br>
              <a href="about.html#governance" class="mobile-submenu-item">Governance Structure</a>
            </div>
          </li>
          <li class="mobile-nav-item">
            <a href="regulations.html" class="mobile-nav-link">Regulatory Instruments</a>
            <div class="mobile-submenu open">
              <a href="regulations.html?category=regulations" class="mobile-submenu-item">Electricity Regulations</a><br>
              <a href="regulations.html?category=licenses" class="mobile-submenu-item">Licenses & Permits</a><br>
              <a href="regulations.html?category=guidelines" class="mobile-submenu-item">Codes & Frameworks</a>
            </div>
          </li>
          <li class="mobile-nav-item"><a href="activities.html" class="mobile-nav-link">Activities</a></li>
          <li class="mobile-nav-item">
            <a href="forms.html" class="mobile-nav-link">Forms & Services</a>
            <div class="mobile-submenu open">
              <a href="forms.html?tab=complaint" class="mobile-submenu-item">Customer Complaint Form</a><br>
              <a href="forms.html?tab=license" class="mobile-submenu-item">License Calculator & Form</a>
            </div>
          </li>
          <li class="mobile-nav-item"><a href="contact.html" class="mobile-nav-link">Contact Us</a></li>
        </ul>
        <div style="margin-top: 2rem;">
          <a href="forms.html?tab=complaint" class="btn btn-accent" style="width: 100%; text-align: center;">File Complaint</a>
        </div>
      </div>
    `;
    document.body.appendChild(drawer);
  }

  const closeBtn = document.getElementById('drawerCloseBtn');

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

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);
}

/* Accessibility Control Features */
function initAccessibilityControls() {
  const contrastBtn = document.getElementById('toggleContrastBtn');
  const fontIncBtn = document.getElementById('fontIncreaseBtn');
  const fontResetBtn = document.getElementById('fontResetBtn');

  if (contrastBtn) {
    contrastBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.toggle('high-contrast');
      const isContrast = document.body.classList.contains('high-contrast');
      showToast(isContrast ? 'High Contrast Mode Enabled' : 'Standard View Restored', 'info');
    });
  }

  let currentFontSize = 16;
  if (fontIncBtn) {
    fontIncBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentFontSize < 20) {
        currentFontSize += 1;
        document.documentElement.style.fontSize = `${currentFontSize}px`;
        showToast(`Text Size Increased (${currentFontSize}px)`, 'info');
      }
    });
  }

  if (fontResetBtn) {
    fontResetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentFontSize = 16;
      document.documentElement.style.fontSize = '16px';
      showToast('Text Size Reset to Default', 'info');
    });
  }
}

/* Global Custom Toast System */
function showToast(message, type = 'info') {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  toast.innerHTML = `
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 50);

  // Auto dismiss after 3.5s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
