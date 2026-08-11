/**
 * NASERC Web Portal - Document Repository Search & Filter Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initDocumentFilters();
});

function initDocumentFilters() {
  const searchInput = document.getElementById('regSearchInput');
  const yearSelect = document.getElementById('regYearSelect');
  const categoryPills = document.querySelectorAll('.category-pill');
  const docCards = document.querySelectorAll('.doc-item-card');
  const resultCount = document.getElementById('resultCount');
  const noResultsMsg = document.getElementById('noResultsMessage');

  if (!docCards.length) return;

  let currentCategory = 'all';
  let currentSearch = '';
  let currentYear = 'all';

  // Check URL parameters for preset category (e.g. regulations.html?category=licenses)
  const urlParams = new URLSearchParams(window.location.search);
  const presetCategory = urlParams.get('category');
  if (presetCategory) {
    currentCategory = presetCategory.toLowerCase();
    categoryPills.forEach(pill => {
      if (pill.dataset.category === currentCategory) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });
  }

  function filterDocuments() {
    let visibleCount = 0;

    docCards.forEach(card => {
      const title = (card.dataset.title || '').toLowerCase();
      const code = (card.dataset.code || '').toLowerCase();
      const category = (card.dataset.category || '').toLowerCase();
      const year = card.dataset.year || 'all';

      const matchesSearch = !currentSearch || title.includes(currentSearch) || code.includes(currentSearch);
      const matchesCategory = currentCategory === 'all' || category === currentCategory;
      const matchesYear = currentYear === 'all' || year === currentYear;

      if (matchesSearch && matchesCategory && matchesYear) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (resultCount) {
      resultCount.textContent = `Showing ${visibleCount} Document${visibleCount !== 1 ? 's' : ''}`;
    }

    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase().trim();
      filterDocuments();
    });
  }

  if (yearSelect) {
    yearSelect.addEventListener('change', (e) => {
      currentYear = e.target.value;
      filterDocuments();
    });
  }

  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.category;
      filterDocuments();
    });
  });

  // Attach PDF download simulation listeners
  document.querySelectorAll('.download-doc-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const docTitle = btn.dataset.docTitle || 'Regulatory Document';
      showToast(`Downloading PDF: ${docTitle}...`, 'success');
    });
  });

  // Initial filter run
  filterDocuments();
}
