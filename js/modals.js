/**
 * NASERC Web Portal - Interactive Modals & Preview Engine
 * News modals, Document downloads, Chairman Speech reader, Licensee Verifier tool.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNewsModals();
  initDocDownloadSimulators();
  initChairmanModal();
  initLicenseeVerifier();
});

/* --------------------------------------------------------------------------
   1. News Article Full Modal Reader
   -------------------------------------------------------------------------- */
function initNewsModals() {
  const readMoreBtns = document.querySelectorAll('.read-news-btn');

  readMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const newsCard = btn.closest('.news-card');
      if (!newsCard) return;

      const title = newsCard.querySelector('.news-title') ? newsCard.querySelector('.news-title').textContent : 'News Article';
      const category = newsCard.querySelector('.news-category-tag') ? newsCard.querySelector('.news-category-tag').textContent : 'Commission News';
      const date = newsCard.querySelector('.news-date') ? newsCard.querySelector('.news-date').textContent : 'Recent';
      const imgSrc = newsCard.querySelector('.news-img') ? newsCard.querySelector('.news-img').src : '';
      const content = newsCard.getAttribute('data-full-content') || newsCard.querySelector('.news-excerpt').textContent;

      openNewsModal({
        title,
        category,
        date,
        imgSrc,
        content
      });
    });
  });
}

function openNewsModal(data) {
  const modalHTML = `
    <div class="modal-backdrop active" id="newsModal">
      <div class="modal-dialog" style="max-width: 800px;">
        <div class="modal-header">
          <div>
            <span class="section-badge" style="margin-bottom: 0.25rem;">${data.category}</span>
            <h3 class="modal-title">${data.title}</h3>
            <span style="font-size: 0.825rem; color: var(--slate-500);"><i class="far fa-calendar-alt"></i> Published: ${data.date}</span>
          </div>
          <button class="modal-close" onclick="closeNewsModal()">&times;</button>
        </div>
        <div class="modal-body">
          ${data.imgSrc ? `<img src="${data.imgSrc}" alt="${data.title}" style="width: 100%; height: 320px; object-fit: cover; border-radius: var(--radius-lg); margin-bottom: 1.5rem;">` : ''}
          <div style="font-size: 1.05rem; line-height: 1.8; color: var(--slate-700);">
            <p style="margin-bottom: 1.25rem;"><strong>Lafia, Nasarawa State —</strong> ${data.content}</p>
            <p style="margin-bottom: 1.25rem;">The Nasarawa State Electricity Regulatory Commission (NASERC) continues to drive robust regulatory standards under the Nasarawa State Electricity Law 2024. In alignment with Governor Abdullahi Sule's vision for sustainable industrialization and energy independence across all 13 Local Government Areas, this milestone underscores the Commission's commitment to grid reliability, investor confidence, and consumer protection.</p>
            <blockquote style="border-left: 4px solid var(--primary-green); padding-left: 1.25rem; font-style: italic; background: var(--slate-50); padding-top: 0.75rem; padding-bottom: 0.75rem; margin: 1.5rem 0; border-radius: 0 var(--radius-md) var(--radius-md) 0;">
              "Ensuring universal access to clean, affordable, and safe electricity for all citizens, commercial enterprises, and agricultural hubs in Nasarawa State."
            </blockquote>
            <p>For inquiries regarding this press briefing or public consultation schedules, please contact the NASERC Communications & Stakeholder Engagement Division via email at <code>media@naserc.na.gov.ng</code>.</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" onclick="showToast('Link copied to clipboard!', 'info')"><i class="fas fa-share-alt"></i> Share Article</button>
          <button class="btn btn-navy" onclick="closeNewsModal()">Close Reader</button>
        </div>
      </div>
    </div>
  `;

  const container = document.createElement('div');
  container.id = 'newsModalContainer';
  container.innerHTML = modalHTML;
  document.body.appendChild(container);
}

function closeNewsModal() {
  const modal = document.getElementById('newsModalContainer');
  if (modal) modal.remove();
}

/* --------------------------------------------------------------------------
   2. Executive Chairman Message Full Reader Modal
   -------------------------------------------------------------------------- */
function initChairmanModal() {
  const btn = document.getElementById('readChairmanSpeechBtn');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const modalHTML = `
      <div class="modal-backdrop active" id="chairmanSpeechModal">
        <div class="modal-dialog" style="max-width: 800px;">
          <div class="modal-header" style="background: var(--primary-navy); color: var(--white);">
            <div>
              <span class="section-badge gold" style="margin-bottom: 0.25rem;">Executive Address</span>
              <h3 class="modal-title" style="color: var(--white);">Welcome Message from the Executive Chairman</h3>
            </div>
            <button class="modal-close" style="color: var(--white);" onclick="closeChairmanModal()">&times;</button>
          </div>
          <div class="modal-body">
            <div style="display: flex; gap: 1.5rem; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap;">
              <img src="assets/images/chairman.png" alt="Executive Chairman" style="width: 110px; height: 110px; border-radius: var(--radius-full); object-fit: cover; border: 3px solid var(--accent-gold);">
              <div>
                <h4 style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--primary-navy);">Engr. Dr. Ibrahim A. Abdullahi, FNSE</h4>
                <p style="color: var(--primary-green); font-weight: 700; font-size: 0.9rem;">Executive Chairman / Chief Executive Officer</p>
                <p style="color: var(--slate-500); font-size: 0.85rem;">Nasarawa State Electricity Regulatory Commission (NASERC)</p>
              </div>
            </div>
            <div style="font-size: 1rem; line-height: 1.8; color: var(--slate-700);">
              <p style="margin-bottom: 1rem;">It is my distinct honor and privilege to welcome you to the official web portal of the Nasarawa State Electricity Regulatory Commission (NASERC).</p>
              <p style="margin-bottom: 1rem;">Following the historic devolution of power sector regulation to sub-national authorities in Nigeria, Nasarawa State positioned itself at the forefront of sub-national energy governance through the enactment of the Nasarawa State Electricity Law 2024. NASERC was created with a clear mandate: to establish a transparent, competitive, and robust regulatory environment that attracts private sector investment while safeguarding the rights of electricity consumers across all 13 Local Government Areas.</p>
              <p style="margin-bottom: 1rem;">Our regulatory philosophy rests on three fundamental pillars:</p>
              <ul style="list-style: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; color: var(--slate-800);">
                <li style="margin-bottom: 0.5rem;"><strong>Energy Access Expansion:</strong> Accelerating off-grid and mini-grid deployment to power rural communities, agricultural processing hubs, and solid mineral industrial clusters.</li>
                <li style="margin-bottom: 0.5rem;"><strong>Fair & Cost-Reflective Tariffs:</strong> Striking a healthy balance between investor returns and consumer affordability through rigorous Multi-Year Tariff Orders (MYTO).</li>
                <li style="margin-bottom: 0.5rem;"><strong>Consumer Rights & Standards:</strong> Enforcing strict service standards, metering mandates, and fast-track dispute resolution mechanisms.</li>
              </ul>
              <p>We invite investors, developers, distribution companies, and electricity consumers to engage with our digital services—whether filing license applications, exploring regulatory frameworks, or submitting feedback. Together, we are building a vibrant, resilient, and sustainable power market for Nasarawa State.</p>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-navy" onclick="closeChairmanModal()">Close Address</button>
          </div>
        </div>
      </div>
    `;

    const div = document.createElement('div');
    div.id = 'chairmanModalContainer';
    div.innerHTML = modalHTML;
    document.body.appendChild(div);
  });
}

function closeChairmanModal() {
  const modal = document.getElementById('chairmanModalContainer');
  if (modal) modal.remove();
}

/* --------------------------------------------------------------------------
   3. Document PDF Download Simulator with Toast
   -------------------------------------------------------------------------- */
function initDocDownloadSimulators() {
  document.addEventListener('click', (e) => {
    const downloadBtn = e.target.closest('.download-doc-btn');
    if (!downloadBtn) return;

    e.preventDefault();
    const docTitle = downloadBtn.getAttribute('data-doc-title') || 'NASERC Regulatory Document';
    const docFile = downloadBtn.getAttribute('data-doc-file') || 'document.pdf';

    showToast(`Downloading: "${docTitle}"...`, 'info');

    // Create dynamic downloadable blob text document preview
    setTimeout(() => {
      const blob = new Blob([
        `OFFICIAL REGULATORY DOCUMENT - NASARAWA STATE ELECTRICITY REGULATORY COMMISSION (NASERC)\n` +
        `Title: ${docTitle}\n` +
        `Reference Code: NASERC/REG/2026/DOC-0492\n` +
        `Authority: Executive Chairman & Board of Commissioners, NASERC\n` +
        `Primary Context: https://naserc.na.gov.ng/\n\n` +
        `--------------------------------------------------------------------------------\n` +
        `SUMMARY & MANDATE:\n` +
        `This official regulatory instrument prescribes the operational standards, license terms, grid rules,\n` +
        `and consumer protection guidelines applicable within Nasarawa State under the State Electricity Law 2024.\n\n` +
        `Downloaded from NASERC Web Portal on: ${new Date().toLocaleString()}\n` +
        `Contact: info@naserc.na.gov.ng | Emergency Hotline: 0800-NASERC-HOT`
      ], { type: 'text/plain;charset=utf-8' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${docTitle.replace(/[^a-zA-Z0-9]/g, '_')}_NASERC.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      showToast(`Download completed for "${docTitle}"`, 'success');
    }, 1000);
  });
}

/* --------------------------------------------------------------------------
   4. Licensee Verification Quick Tool
   -------------------------------------------------------------------------- */
function initLicenseeVerifier() {
  const form = document.getElementById('licenseeVerifierForm');
  if (!form) return;

  const mockDatabase = [
    { code: 'NAS-MG-2025-014', name: 'Lafia Solar Power Mini-Grid Ltd', capacity: '2.5 MW', location: 'Lafia LGA', status: 'ACTIVE', category: 'Mini-Grid Generation' },
    { code: 'NAS-MG-2025-022', name: 'Karu Renewable Energy Cooperative', capacity: '1.2 MW', location: 'Karu LGA', status: 'ACTIVE', category: 'Embedded Generation' },
    { code: 'NAS-DIS-2024-001', name: 'Abuja Electricity Distribution Plc (Nasarawa DisCo)', capacity: 'Regional Provider', location: 'State-wide', status: 'ACTIVE', category: 'Distribution & Trading' },
    { code: 'NAS-MAP-2026-088', name: 'Keffi Smart Metering Assets Solutions Ltd', capacity: '50,000 Meters', location: 'Keffi Zonal Area', status: 'ACTIVE', category: 'Meter Asset Provider (MAP)' }
  ];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.verifier-input').value.trim().toLowerCase();
    if (!input) {
      showToast('Please enter a License Number or Business Name.', 'warning');
      return;
    }

    const match = mockDatabase.find(item => 
      item.code.toLowerCase().includes(input) || item.name.toLowerCase().includes(input)
    );

    if (match) {
      openVerifierResultModal(match);
    } else {
      showToast(`No active licensee found for keyword "${input}". Please check the ID or contact Licensing Desk.`, 'danger');
    }
  });
}

function openVerifierResultModal(data) {
  const modalHTML = `
    <div class="modal-backdrop active" id="verifierModal">
      <div class="modal-dialog">
        <div class="modal-header" style="background: var(--primary-navy); color: var(--white);">
          <h3 class="modal-title" style="color: var(--white);"><i class="fas fa-certificate" style="color: var(--accent-gold);"></i> License Verification Result</h3>
          <button class="modal-close" style="color: var(--white);" onclick="closeVerifierModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div style="text-align: center; margin-bottom: 1.25rem;">
            <span style="background: var(--success-bg); color: var(--success); border: 1px solid var(--success); padding: 0.35rem 1rem; border-radius: var(--radius-full); font-weight: 800; font-size: 0.9rem; text-transform: uppercase;">
              <i class="fas fa-check-circle"></i> VERIFIED & AUTHORIZED LICENSEE
            </span>
          </div>

          <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.5rem;">
            <div style="margin-bottom: 0.75rem; border-bottom: 1px solid var(--slate-200); padding-bottom: 0.5rem;">
              <span style="font-size: 0.8rem; color: var(--slate-500); text-transform: uppercase; font-weight: 700;">Entity Name</span>
              <div style="font-size: 1.2rem; font-weight: 800; color: var(--primary-navy);">${data.name}</div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; font-size: 0.9rem;">
              <div>
                <span style="color: var(--slate-500); font-size: 0.8rem; font-weight: 600;">License ID:</span>
                <div style="font-weight: 700; color: var(--slate-800);">${data.code}</div>
              </div>
              <div>
                <span style="color: var(--slate-500); font-size: 0.8rem; font-weight: 600;">Category:</span>
                <div style="font-weight: 700; color: var(--slate-800);">${data.category}</div>
              </div>
              <div>
                <span style="color: var(--slate-500); font-size: 0.8rem; font-weight: 600;">Capacity / Scope:</span>
                <div style="font-weight: 700; color: var(--slate-800);">${data.capacity}</div>
              </div>
              <div>
                <span style="color: var(--slate-500); font-size: 0.8rem; font-weight: 600;">Operational Zone:</span>
                <div style="font-weight: 700; color: var(--slate-800);">${data.location}</div>
              </div>
            </div>
          </div>

          <p style="font-size: 0.85rem; color: var(--slate-600); text-align: center;">
            Issued under authority of the Nasarawa State Electricity Regulatory Commission (NASERC).
          </p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-navy" onclick="closeVerifierModal()">Close Window</button>
        </div>
      </div>
    </div>
  `;

  const container = document.createElement('div');
  container.id = 'verifierModalContainer';
  container.innerHTML = modalHTML;
  document.body.appendChild(container);
}

function closeVerifierModal() {
  const modal = document.getElementById('verifierModalContainer');
  if (modal) modal.remove();
}
