/**
 * NASERC Web Portal - Regulatory Documents Dynamic Search & Filter
 * Performs dynamic real-time filtering without page reloads.
 */

document.addEventListener('DOMContentLoaded', () => {
  initDocumentFilters();
});

function initDocumentFilters() {
  const searchInput = document.getElementById('regSearchInput');
  const categoryPills = document.querySelectorAll('.category-pill');
  const yearSelect = document.getElementById('regYearSelect');
  const docItems = document.querySelectorAll('.doc-item-card');
  const noResultsMsg = document.getElementById('noResultsMessage');
  const resultCount = document.getElementById('resultCount');

  if (docItems.length === 0) return;

  let currentCategory = 'all';
  let currentSearch = '';
  let currentYear = 'all';

  // Check URL query parameters for initial search or category filter
  const urlParams = new URLSearchParams(window.location.search);
  const paramSearch = urlParams.get('search');
  const paramCat = urlParams.get('category');

  if (paramSearch) {
    currentSearch = paramSearch;
    if (searchInput) searchInput.value = paramSearch;
  }

  if (paramCat) {
    currentCategory = paramCat.toLowerCase();
    categoryPills.forEach(pill => {
      if (pill.getAttribute('data-category') === currentCategory) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  function applyFilters() {
    let visibleCount = 0;

    docItems.forEach(card => {
      const title = card.getAttribute('data-title').toLowerCase();
      const code = card.getAttribute('data-code').toLowerCase();
      const cat = card.getAttribute('data-category').toLowerCase();
      const year = card.getAttribute('data-year');

      const matchesSearch = !currentSearch || title.includes(currentSearch) || code.includes(currentSearch);
      const matchesCategory = currentCategory === 'all' || cat === currentCategory;
      const matchesYear = currentYear === 'all' || year === currentYear;

      if (matchesSearch && matchesCategory && matchesYear) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (resultCount) {
      resultCount.textContent = `${visibleCount} Document${visibleCount !== 1 ? 's' : ''} Found`;
    }

    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Category Pills Event
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.getAttribute('data-category').toLowerCase();
      applyFilters();
    });
  });

  // Search Input Event
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // Year Dropdown Select Event
  if (yearSelect) {
    yearSelect.addEventListener('change', (e) => {
      currentYear = e.target.value;
      applyFilters();
    });
  }

  // Initial Filter Apply
  applyFilters();
}
