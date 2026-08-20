/**
 * NASERC Web Portal - Dynamic Modals, Speech Reader & Licensee Verifier Tool
 */

document.addEventListener('DOMContentLoaded', () => {
  initModalListeners();
});

function initModalListeners() {

  // 1. Speech Modal Reader for Executive Chairman Address
  const readSpeechBtn = document.getElementById('readSpeechBtn');
  if (readSpeechBtn) {
    readSpeechBtn.addEventListener('click', () => {
      openCustomModal({
        title: 'Executive Address — Engr. Muhammad Bello',
        bodyHTML: `
          <div style="line-height: 1.7; color: var(--slate-700);">
            <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem; background: var(--slate-100); padding: 1rem; border-radius: var(--radius-md);">
              <img src="assets/images/chairman.png" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover; border: 2px solid var(--accent-gold);">
              <div>
                <strong style="color: var(--primary-navy); font-size: 1.05rem;">Engr. Muhammad Bello</strong><br>
                <span style="color: var(--primary-green); font-size: 0.85rem; font-weight: 600;">Chairman / CEO, NASERC</span>
              </div>
            </div>

            <p style="margin-bottom: 1rem;">
              "It is with immense privilege that I welcome citizens, electricity customers, and mini-grid developers to the official e-governance portal of the Nasarawa State Electricity Regulatory Commission (NASERC).
            </p>
            <p style="margin-bottom: 1rem;">
              Enacted under the landmark Nasarawa State Electricity Law 2024, NASERC has assumed full regulatory jurisdiction over intrastate power generation, distribution networks, and off-grid renewable energy projects.
            </p>
            <p style="margin-bottom: 1rem;">
              Our mandatory 100 kW threshold rule provides clear direction: off-grid solar mini-grids up to 100 kW operate under fast-track permit registrations, while utility projects above 100 kW receive full regulatory licensing and technical support.
            </p>
            <p>
              We remain steadfast in defending electricity consumer rights, accelerating smart meter distribution, and making Nasarawa State the premier destination for sustainable energy investment in Nigeria."
            </p>
          </div>
        `
      });
    });
  }

  // 2. News Article Reader Modals
  document.querySelectorAll('.read-news-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.news-card');
      if (!card) return;

      const title = card.querySelector('.news-title') ? card.querySelector('.news-title').textContent : 'News Article';
      const meta = card.querySelector('.news-meta') ? card.querySelector('.news-meta').innerHTML : '';
      const content = card.dataset.fullContent || card.querySelector('.news-excerpt').textContent;
      const imgSrc = card.querySelector('.news-img') ? card.querySelector('.news-img').src : '';

      openCustomModal({
        title: title,
        bodyHTML: `
          <div>
            ${imgSrc ? `<img src="${imgSrc}" style="width: 100%; height: 260px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: 1.25rem;">` : ''}
            <div style="display: flex; gap: 1rem; font-size: 0.85rem; color: var(--slate-500); margin-bottom: 1rem;">${meta}</div>
            <p style="line-height: 1.7; color: var(--slate-700); font-size: 1rem;">${content}</p>
          </div>
        `
      });
    });
  });

  // 3. Licensee Verification Search Tool
  const verifierForm = document.getElementById('licenseeVerifyForm');
  if (verifierForm) {
    verifierForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const queryInput = document.getElementById('verifierQuery');
      const query = queryInput ? queryInput.value.trim() : '';

      if (!query) {
        showToast('Please enter a License Reference Code or Company Name.', 'warning');
        return;
      }

      // Mock License Database lookup
      const mockDatabase = [
        { code: 'NAS-LIC-2026-04', company: 'Lafia Solar Power Mini-Grid Ltd', status: 'ACTIVE & VALID', capacity: '2.5 MW', location: 'Lafia LGA', expiry: 'Jan 2036' },
        { code: 'NAS-LIC-2025-02', company: 'Karu Renewable Energy Cooperative', status: 'ACTIVE & VALID', capacity: '750 kW', location: 'Karu LGA', expiry: 'Aug 2035' },
        { code: 'NAS-LIC-2025-09', company: 'Keffi Green Power Off-Grid DisCo', status: 'ACTIVE & VALID', capacity: '1.2 MW', location: 'Keffi LGA', expiry: 'Nov 2035' }
      ];

      const match = mockDatabase.find(item => 
        item.code.toLowerCase().includes(query.toLowerCase()) || 
        item.company.toLowerCase().includes(query.toLowerCase())
      );

      if (match) {
        openCustomModal({
          title: 'Official Licensee Verification Report',
          bodyHTML: `
            <div style="text-align: center; padding: 1rem 0;">
              <span style="background: rgba(16, 185, 129, 0.15); color: var(--success); font-weight: 800; padding: 0.35rem 1rem; border-radius: var(--radius-full); font-size: 0.85rem;">${match.status}</span>
              <h3 style="font-family: var(--font-heading); color: var(--primary-navy); font-size: 1.4rem; margin-top: 1rem;">${match.company}</h3>
              <p style="color: var(--primary-green); font-weight: 700;">Ref Code: ${match.code}</p>
            </div>

            <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 1.25rem; margin-top: 1rem;">
              <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--slate-200);">
                <span style="color: var(--slate-600);">Capacity Rating:</span>
                <strong style="color: var(--primary-navy);">${match.capacity}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--slate-200);">
                <span style="color: var(--slate-600);">Operation Zone:</span>
                <strong style="color: var(--primary-navy);">${match.location}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.5rem 0;">
                <span style="color: var(--slate-600);">License Expiry Date:</span>
                <strong style="color: var(--primary-navy);">${match.expiry}</strong>
              </div>
            </div>
          `
        });
      } else {
        openCustomModal({
          title: 'Verification Search Result',
          bodyHTML: `
            <div style="text-align: center; padding: 1.5rem 0;">
              <h3 style="font-family: var(--font-heading); color: var(--primary-navy); font-size: 1.3rem;">No Active License Match Found</h3>
              <p style="color: var(--slate-600); margin-top: 0.5rem; font-size: 0.9rem;">
                No registered license match was found for "<strong>${query}</strong>". Please verify the operator name or contact NASERC Secretariat for official confirmation.
              </p>
            </div>
          `
        });
      }
    });
  }

  // 4. Track Complaint Modal
  const trackBtn = document.getElementById('trackComplaintModalBtn');
  if (trackBtn) {
    trackBtn.addEventListener('click', () => {
      openCustomModal({
        title: 'Track Consumer Dispute Status',
        bodyHTML: `
          <div>
            <p style="color: var(--slate-600); font-size: 0.9rem; margin-bottom: 1rem;">Enter your NASERC Complaint Reference Number (e.g. NAS-CMP-2026-8942) to view resolution status.</p>
            <div style="display: flex; gap: 0.5rem;">
              <input type="text" id="trackInputCode" class="form-control" placeholder="e.g. NAS-CMP-2026-8942">
              <button class="btn btn-primary" id="execTrackBtn">Track</button>
            </div>
            <div id="trackResultContainer" style="margin-top: 1.5rem; display: none;"></div>
          </div>
        `
      });

      setTimeout(() => {
        const execBtn = document.getElementById('execTrackBtn');
        if (execBtn) {
          execBtn.onclick = () => {
            const inputVal = document.getElementById('trackInputCode').value.trim();
            const resultBox = document.getElementById('trackResultContainer');
            if (!inputVal) return;

            resultBox.style.display = 'block';
            resultBox.innerHTML = `
              <div style="background: var(--slate-50); border: 1px solid var(--slate-200); padding: 1.25rem; border-radius: var(--radius-lg);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                  <strong style="color: var(--primary-navy);">${inputVal.toUpperCase()}</strong>
                  <span style="background: rgba(245, 158, 11, 0.2); color: var(--accent-gold-hover); font-weight: 700; padding: 0.2rem 0.6rem; border-radius: var(--radius-full); font-size: 0.75rem;">UNDER INVESTIGATION</span>
                </div>
                <p style="font-size: 0.875rem; color: var(--slate-600); margin: 0;">Dispute referred to Lafia Zonal Dispute Panel. Hearing officer assigned.</p>
              </div>
            `;
          };
        }
      }, 100);
    });
  }

}

function openCustomModal({ title, bodyHTML }) {
  let backdrop = document.getElementById('globalModalBackdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'globalModalBackdrop';
    backdrop.className = 'modal-backdrop';
    backdrop.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 class="modal-title" id="globalModalTitle"></h3>
          <button class="modal-close" id="globalModalClose">&times;</button>
        </div>
        <div class="modal-body" id="globalModalBody"></div>
      </div>
    `;
    document.body.appendChild(backdrop);

    backdrop.querySelector('#globalModalClose').onclick = () => {
      backdrop.classList.remove('active');
    };

    backdrop.onclick = (e) => {
      if (e.target === backdrop) backdrop.classList.remove('active');
    };
  }

  document.getElementById('globalModalTitle').textContent = title;
  document.getElementById('globalModalBody').innerHTML = bodyHTML;
  backdrop.classList.add('active');
}
