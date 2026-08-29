/**
 * NASERC Web Portal - Form Validation, JS-Driven 3-Step Complaint Screening Wizard, and File Previews
 */

document.addEventListener('DOMContentLoaded', () => {
  initComplaintScreeningWizard();
  initFormValidations();
  initFileUploadPreviews();
});

/* --------------------------------------------------------------------------
   1. JS-Driven 3-Step Complaint Screening Wizard & Guidance Modals
   -------------------------------------------------------------------------- */
function initComplaintScreeningWizard() {
  const btnDiscoContacts = document.getElementById('btnDiscoContacts');
  const btnForumContacts = document.getElementById('btnForumContacts');
  const btnStartWizard = document.getElementById('btnStartWizard');
  const btnStartScreeningCard = document.getElementById('btnStartScreeningCard');
  const btnDirectUnlock = document.getElementById('btnDirectUnlock');
  const btnRestartScreening = document.getElementById('btnRestartScreening');
  const complaintFormWrapper = document.getElementById('complaintFormWrapper');

  // Modal Launcher for DisCo Contacts
  function showDiscoContactsModal() {
    if (typeof openCustomModal === 'function') {
      openCustomModal({
        title: 'Step 1: Electricity Provider (DisCo) CCU Directory',
        bodyHTML: `
          <div style="color: var(--slate-700); line-height: 1.6;">
            <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.25rem;">
              <strong style="color: #1e40af; font-size: 0.95rem;"><i class="fas fa-info-circle" style="margin-right: 0.4rem;"></i> Statutory Requirement</strong>
              <p style="margin: 0.25rem 0 0 0; font-size: 0.875rem;">Under the Nasarawa State Electricity Law 2024, all consumer disputes must first be lodged with your electricity distribution company (DisCo CCU).</p>
            </div>

            <h4 style="font-family: var(--font-heading); color: var(--primary-navy); font-size: 1.05rem; margin-bottom: 0.75rem;">Abuja Electricity Distribution Company (AEDC)</h4>
            <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.25rem; font-size: 0.875rem;">
              <div style="margin-bottom: 0.5rem;"><strong>24/7 Customer Care Lines:</strong> <a href="tel:08039004030" style="color: var(--primary-green); font-weight: 700;">0803 900 4030</a> / <a href="tel:08152141414" style="color: var(--primary-green); font-weight: 700;">0815 214 1414</a></div>
              <div style="margin-bottom: 0.5rem;"><strong>Email:</strong> <a href="mailto:customercare@abujaelectricity.com" style="color: var(--primary-green);">customercare@abujaelectricity.com</a></div>
              <div style="margin-bottom: 0.5rem;"><strong>Lafia Area Office:</strong> Shendam Road, Opp. Police Command, Lafia, Nasarawa State.</div>
              <div><strong>Keffi / Karu Area Office:</strong> Abuja-Keffi Expressway, Mararaba/Keffi.</div>
            </div>

            <h4 style="font-family: var(--font-heading); color: var(--primary-navy); font-size: 1.05rem; margin-bottom: 0.75rem;">Licensed Mini-Grid Operators</h4>
            <p style="font-size: 0.875rem; color: var(--slate-600);">If your community is served by an off-grid mini-grid, lodge your dispute with the operator's local community customer care officer and obtain a formal complaint tracking number.</p>

            <div style="margin-top: 1.5rem; text-align: center;">
              <button onclick="document.getElementById('globalModalBackdrop').classList.remove('active')" class="btn btn-primary btn-sm">Understood, Close Directory</button>
            </div>
          </div>
        `
      });
    }
  }

  // Modal Launcher for Forum Office Guide
  function showForumOfficeModal() {
    if (typeof openCustomModal === 'function') {
      openCustomModal({
        title: 'Step 2: Electricity Consumer Forum Office Guide',
        bodyHTML: `
          <div style="color: var(--slate-700); line-height: 1.6;">
            <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.25rem;">
              <strong style="color: #92400e; font-size: 0.95rem;"><i class="fas fa-balance-scale" style="margin-right: 0.4rem;"></i> Independent Consumer Hearing Panel</strong>
              <p style="margin: 0.25rem 0 0 0; font-size: 0.875rem;">When a DisCo fails to resolve a dispute within 15 days or issues an unsatisfactory ruling, the consumer must appeal to the independent Forum Office before approaching NASERC.</p>
            </div>

            <h4 style="font-family: var(--font-heading); color: var(--primary-navy); font-size: 1.05rem; margin-bottom: 0.75rem;">Lafia Consumer Complaints Forum Office</h4>
            <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.25rem; font-size: 0.875rem;">
              <div style="margin-bottom: 0.5rem;"><strong>Secretariat Location:</strong> NERC / NASERC Forum Hearing Chambers, Shendam Road, Lafia, Nasarawa State.</div>
              <div style="margin-bottom: 0.5rem;"><strong>Hearing Schedule:</strong> Mondays to Thursdays (9:00 AM – 3:00 PM)</div>
              <div style="margin-bottom: 0.5rem;"><strong>Forum Email:</strong> <a href="mailto:forum.lafia@nerc.gov.ng" style="color: var(--primary-green);">forum.lafia@nerc.gov.ng</a></div>
              <div><strong>Filing Requirements:</strong> Copy of initial DisCo CCU complaint ticket, provider response letter, and electricity bills.</div>
            </div>

            <div style="margin-top: 1.5rem; text-align: center;">
              <button onclick="document.getElementById('globalModalBackdrop').classList.remove('active')" class="btn btn-accent btn-sm">Understood, Close Guide</button>
            </div>
          </div>
        `
      });
    }
  }

  // Interactive JS Question Wizard in Modal
  function startQuestionWizard(step = 1) {
    if (typeof openCustomModal !== 'function') return;

    if (step === 1) {
      openCustomModal({
        title: 'Dispute Eligibility Check (Step 1 of 2)',
        bodyHTML: `
          <div style="color: var(--slate-700); line-height: 1.6;" id="wizardModalContent">
            <div class="wizard-step-indicator">
              <span class="wizard-pill active">Step 1: DisCo CCU</span>
              <i class="fas fa-chevron-right" style="font-size: 0.75rem; color: var(--slate-400);"></i>
              <span class="wizard-pill pending">Step 2: Forum Office</span>
              <i class="fas fa-chevron-right" style="font-size: 0.75rem; color: var(--slate-400);"></i>
              <span class="wizard-pill pending">Step 3: NASERC</span>
            </div>

            <h3 class="wizard-question">
              Have you lodged this complaint with your electricity provider (e.g. AEDC or Mini-Grid) Customer Care Unit?
            </h3>
            <p class="wizard-hint">
              Nasarawa State Electricity Law 2024 requires that your Distribution Company must be given the first statutory opportunity to investigate and resolve your power or billing issue.
            </p>

            <div class="wizard-actions">
              <button class="btn btn-primary" id="mWizardStep1Yes">
                <i class="fas fa-check" style="margin-right: 0.4rem;"></i> Yes, I Lodged with DisCo
              </button>
              <button class="btn btn-outline" id="mWizardStep1No">
                <i class="fas fa-times" style="margin-right: 0.4rem;"></i> No, Not Yet
              </button>
            </div>
          </div>
        `
      });

      setTimeout(() => {
        const btnYes = document.getElementById('mWizardStep1Yes');
        const btnNo = document.getElementById('mWizardStep1No');

        if (btnYes) {
          btnYes.onclick = () => showStep1SubQuestion();
        }

        if (btnNo) {
          btnNo.onclick = () => showDiscoAdviceModal();
        }
      }, 50);
    }
  }

  // Step 1 Sub-question: Resolved or Not?
  function showStep1SubQuestion() {
    const container = document.getElementById('wizardModalContent');
    if (!container) return;

    container.innerHTML = `
      <div class="wizard-step-indicator">
        <span class="wizard-pill active">Step 1: DisCo Resolution</span>
        <i class="fas fa-chevron-right" style="font-size: 0.75rem; color: var(--slate-400);"></i>
        <span class="wizard-pill pending">Step 2: Forum Office</span>
        <i class="fas fa-chevron-right" style="font-size: 0.75rem; color: var(--slate-400);"></i>
        <span class="wizard-pill pending">Step 3: NASERC</span>
      </div>

      <h3 class="wizard-question">
        Was the complaint resolved satisfactorily by the DisCo?
      </h3>
      <p class="wizard-hint">
        If the DisCo provided an acceptable resolution, no further escalation is required. If unsatisfied or if they exceeded the 15-day timeline, proceed to Step 2.
      </p>

      <div class="wizard-actions">
        <button class="btn btn-outline" id="mWizardDisCoResolved">
          <i class="fas fa-smile" style="margin-right: 0.4rem;"></i> Yes, Issue is Resolved
        </button>
        <button class="btn btn-primary" id="mWizardDisCoUnresolved">
          <i class="fas fa-frown" style="margin-right: 0.4rem;"></i> No, Unsatisfied / Exceeded 15 Days
        </button>
      </div>
    `;

    setTimeout(() => {
      const btnResolved = document.getElementById('mWizardDisCoResolved');
      const btnUnresolved = document.getElementById('mWizardDisCoUnresolved');

      if (btnResolved) {
        btnResolved.onclick = () => {
          container.innerHTML = `
            <div style="text-align: center; padding: 1.5rem 0;">
              <div style="width: 60px; height: 60px; background: rgba(16, 185, 129, 0.15); color: var(--success); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 1.75rem; margin-bottom: 1rem;">
                <i class="fas fa-check"></i>
              </div>
              <h3 style="font-family: var(--font-heading); color: var(--primary-navy); font-size: 1.35rem;">Dispute Resolved at Step 1</h3>
              <p style="font-size: 0.95rem; color: var(--slate-600); max-width: 480px; margin: 0.5rem auto 1.5rem auto;">
                Since your electricity provider has resolved the matter satisfactorily, no further filing is needed with the Commission. Thank you for using the official civic complaint process.
              </p>
              <button onclick="document.getElementById('globalModalBackdrop').classList.remove('active')" class="btn btn-primary btn-sm">Done & Close</button>
            </div>
          `;
        };
      }

      if (btnUnresolved) {
        btnUnresolved.onclick = () => showStep2Question();
      }
    }, 50);
  }

  // Step 2 Question: Forum Office Appeal
  function showStep2Question() {
    const container = document.getElementById('wizardModalContent');
    if (!container) return;

    container.innerHTML = `
      <div class="wizard-step-indicator">
        <span class="wizard-pill" style="background: rgba(16, 185, 129, 0.2); color: var(--primary-green);">Step 1: Done ✓</span>
        <i class="fas fa-chevron-right" style="font-size: 0.75rem; color: var(--slate-400);"></i>
        <span class="wizard-pill active" style="background: var(--accent-gold); color: var(--primary-navy);">Step 2: Forum Office</span>
        <i class="fas fa-chevron-right" style="font-size: 0.75rem; color: var(--slate-400);"></i>
        <span class="wizard-pill pending">Step 3: NASERC</span>
      </div>

      <h3 class="wizard-question">
        Have you appealed the unresolved complaint to the Electricity Consumer Complaints Forum Office?
      </h3>
      <p class="wizard-hint">
        Under statutory procedure, when a DisCo fails to resolve a complaint, you must appeal to the independent Forum Office (Lafia / Zonal Forum) before escalating to NASERC commissioners.
      </p>

      <div class="wizard-actions">
        <button class="btn btn-accent" id="mWizardStep2Yes">
          <i class="fas fa-check" style="margin-right: 0.4rem;"></i> Yes, I Appealed to Forum
        </button>
        <button class="btn btn-outline" id="mWizardStep2No">
          <i class="fas fa-times" style="margin-right: 0.4rem;"></i> No, Not Yet
        </button>
      </div>
    `;

    setTimeout(() => {
      const btnYes = document.getElementById('mWizardStep2Yes');
      const btnNo = document.getElementById('mWizardStep2No');

      if (btnYes) {
        btnYes.onclick = () => showStep2SubQuestion();
      }

      if (btnNo) {
        btnNo.onclick = () => showForumAdviceModal();
      }
    }, 50);
  }

  // Step 2 Sub-question: Satisfied with Forum Ruling?
  function showStep2SubQuestion() {
    const container = document.getElementById('wizardModalContent');
    if (!container) return;

    container.innerHTML = `
      <div class="wizard-step-indicator">
        <span class="wizard-pill" style="background: rgba(16, 185, 129, 0.2); color: var(--primary-green);">Step 1: Done ✓</span>
        <i class="fas fa-chevron-right" style="font-size: 0.75rem; color: var(--slate-400);"></i>
        <span class="wizard-pill active" style="background: var(--accent-gold); color: var(--primary-navy);">Step 2: Forum Ruling</span>
        <i class="fas fa-chevron-right" style="font-size: 0.75rem; color: var(--slate-400);"></i>
        <span class="wizard-pill pending">Step 3: NASERC</span>
      </div>

      <h3 class="wizard-question">
        Are you satisfied with the Forum Office's ruling/decision?
      </h3>
      <p class="wizard-hint">
        If the Forum hearing resolved the issue, the case is concluded. If you dispute the Forum's determination, you are entitled to file a formal regulatory appeal with NASERC (Step 3).
      </p>

      <div class="wizard-actions">
        <button class="btn btn-outline" id="mWizardForumResolved">
          <i class="fas fa-smile" style="margin-right: 0.4rem;"></i> Yes, Satisfied with Forum
        </button>
        <button class="btn btn-accent" id="mWizardForumUnresolved">
          <i class="fas fa-gavel" style="margin-right: 0.4rem;"></i> No, Unsatisfied / Requesting NASERC Review
        </button>
      </div>
    `;

    setTimeout(() => {
      const btnResolved = document.getElementById('mWizardForumResolved');
      const btnUnresolved = document.getElementById('mWizardForumUnresolved');

      if (btnResolved) {
        btnResolved.onclick = () => {
          container.innerHTML = `
            <div style="text-align: center; padding: 1.5rem 0;">
              <div style="width: 60px; height: 60px; background: rgba(16, 185, 129, 0.15); color: var(--success); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 1.75rem; margin-bottom: 1rem;">
                <i class="fas fa-check"></i>
              </div>
              <h3 style="font-family: var(--font-heading); color: var(--primary-navy); font-size: 1.35rem;">Dispute Concluded at Step 2 (Forum)</h3>
              <p style="font-size: 0.95rem; color: var(--slate-600); max-width: 480px; margin: 0.5rem auto 1.5rem auto;">
                Since the Forum Office determination was satisfactory, your case is officially concluded. No further filing is needed with the Commission.
              </p>
              <button onclick="document.getElementById('globalModalBackdrop').classList.remove('active')" class="btn btn-primary btn-sm">Done & Close</button>
            </div>
          `;
        };
      }

      if (btnUnresolved) {
        btnUnresolved.onclick = () => showQualificationSuccessModal();
      }
    }, 50);
  }

  // Step 3 Qualification Screen: Reveals Form on Page
  function showQualificationSuccessModal() {
    const container = document.getElementById('wizardModalContent');
    if (!container) return;

    container.innerHTML = `
      <div style="text-align: center; padding: 1rem 0;">
        <div style="width: 65px; height: 65px; background: rgba(16, 185, 129, 0.15); color: var(--success); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 1rem;">
          <i class="fas fa-check-double"></i>
        </div>
        <h3 style="font-family: var(--font-heading); color: var(--primary-navy); font-size: 1.4rem;">Statutory Qualification Verified!</h3>
        <p style="font-size: 0.95rem; color: var(--slate-600); max-width: 500px; margin: 0.5rem auto 1.5rem auto;">
          You have completed <strong>Step 1 (DisCo CCU)</strong> and <strong>Step 2 (Forum Office)</strong>. You are now qualified to lodge a formal regulatory appeal directly with NASERC.
        </p>

        <div style="background: var(--slate-50); border: 1px dashed var(--primary-green); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.5rem; text-align: left; font-size: 0.85rem; color: var(--slate-700);">
          <strong>Required for the next screen:</strong><br>
          • Your DisCo Complaint Ticket Number<br>
          • Your Forum Office Docket Reference Number<br>
          • Copies of DisCo and Forum rulings
        </div>

        <button class="btn btn-primary btn-lg" id="mBtnOpenForm" style="width: 100%;">
          <i class="fas fa-file-signature" style="margin-right: 0.5rem;"></i> Proceed to NASERC Appeal Form
        </button>
      </div>
    `;

    setTimeout(() => {
      const btnOpen = document.getElementById('mBtnOpenForm');
      if (btnOpen) {
        btnOpen.onclick = () => {
          document.getElementById('globalModalBackdrop').classList.remove('active');
          unlockStep3Form();
        };
      }
    }, 50);
  }

  // Advice Modal: Step 1 Not Done
  function showDiscoAdviceModal() {
    const container = document.getElementById('wizardModalContent');
    if (!container) return;

    container.innerHTML = `
      <div style="color: var(--slate-700);">
        <div style="text-align: center; margin-bottom: 1.25rem;">
          <div style="width: 55px; height: 55px; background: rgba(206, 17, 38, 0.1); color: var(--primary-red); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 0.5rem;">
            <i class="fas fa-hand-paper"></i>
          </div>
          <h3 style="font-family: var(--font-heading); color: var(--primary-navy); margin-top: 0.25rem;">Please Complain to DisCo First (Step 1)</h3>
          <p style="font-size: 0.9rem; color: var(--slate-600);">
            By law, consumers cannot jump straight to NASERC. You must start with your electricity service provider.
          </p>
        </div>

        <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 1.25rem; font-size: 0.875rem; margin-bottom: 1.5rem;">
          <strong>Steps to Complete:</strong>
          <ol style="margin: 0.5rem 0 0 1.25rem; line-height: 1.6;">
            <li>Contact AEDC via 24/7 hotline <a href="tel:08039004030" style="color: var(--primary-green); font-weight: 700;">0803 900 4030</a> or visit your nearest Area Office.</li>
            <li>Obtain an official <strong>Complaint / Ticket Number</strong>.</li>
            <li>Give the DisCo up to 15 days to investigate and resolve.</li>
          </ol>
        </div>

        <div style="display: flex; justify-content: center; gap: 0.75rem;">
          <button onclick="document.getElementById('globalModalBackdrop').classList.remove('active')" class="btn btn-primary btn-sm">I Will Contact DisCo First</button>
        </div>
      </div>
    `;
  }

  // Advice Modal: Step 2 Not Done
  function showForumAdviceModal() {
    const container = document.getElementById('wizardModalContent');
    if (!container) return;

    container.innerHTML = `
      <div style="color: var(--slate-700);">
        <div style="text-align: center; margin-bottom: 1.25rem;">
          <div style="width: 55px; height: 55px; background: rgba(245, 158, 11, 0.15); color: var(--accent-gold-hover); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 0.5rem;">
            <i class="fas fa-balance-scale"></i>
          </div>
          <h3 style="font-family: var(--font-heading); color: var(--primary-navy); margin-top: 0.25rem;">Appeal to Forum Office First (Step 2)</h3>
          <p style="font-size: 0.9rem; color: var(--slate-600);">
            Before escalating to NASERC, the dispute must be reviewed by the independent Forum Office.
          </p>
        </div>

        <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 1.25rem; font-size: 0.875rem; margin-bottom: 1.5rem;">
          <strong>How to Petition the Forum Office:</strong>
          <ol style="margin: 0.5rem 0 0 1.25rem; line-height: 1.6;">
            <li>Visit the Lafia Forum Hearing Chambers (Shendam Road, Lafia) or email <a href="mailto:forum.lafia@nerc.gov.ng" style="color: var(--primary-green);">forum.lafia@nerc.gov.ng</a>.</li>
            <li>Present your DisCo Ticket Number and details of the grievance.</li>
            <li>The Forum panel will schedule a hearing with the DisCo and issue a formal ruling.</li>
          </ol>
        </div>

        <div style="display: flex; justify-content: center; gap: 0.75rem;">
          <button onclick="document.getElementById('globalModalBackdrop').classList.remove('active')" class="btn btn-accent btn-sm">I Will Lodge with Forum Office First</button>
        </div>
      </div>
    `;
  }

  // Helper to unlock Step 3 Form on the page
  function unlockStep3Form() {
    if (complaintFormWrapper) {
      complaintFormWrapper.style.display = 'block';
      complaintFormWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (typeof showToast === 'function') {
        showToast('Step 3 Form Unlocked! Please enter your DisCo Ticket # and Forum Docket #.', 'success');
      }
    }
  }

  // Event Listeners
  if (btnDiscoContacts) btnDiscoContacts.addEventListener('click', showDiscoContactsModal);
  if (btnForumContacts) btnForumContacts.addEventListener('click', showForumOfficeModal);

  if (btnStartWizard) {
    btnStartWizard.addEventListener('click', () => startQuestionWizard(1));
  }

  if (btnStartScreeningCard) {
    btnStartScreeningCard.addEventListener('click', () => startQuestionWizard(1));
  }

  if (btnDirectUnlock) {
    btnDirectUnlock.addEventListener('click', () => unlockStep3Form());
  }

  if (btnRestartScreening) {
    btnRestartScreening.addEventListener('click', () => startQuestionWizard(1));
  }
}

/* --------------------------------------------------------------------------
   2. File Upload Drag & Drop Preview
   -------------------------------------------------------------------------- */
function initFileUploadPreviews() {
  const fileZones = document.querySelectorAll('.file-upload-zone');

  fileZones.forEach(zone => {
    const fileInput = zone.querySelector('input[type="file"]');
    const previewText = zone.querySelector('.upload-preview-text');

    if (!fileInput || !previewText) return;

    zone.addEventListener('click', () => fileInput.click());

    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.style.borderColor = 'var(--primary-green)';
      zone.style.background = 'rgba(0, 104, 55, 0.05)';
    });

    zone.addEventListener('dragleave', () => {
      zone.style.borderColor = 'var(--slate-300)';
      zone.style.background = 'var(--slate-50)';
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.style.borderColor = 'var(--slate-300)';
      zone.style.background = 'var(--slate-50)';

      if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        updatePreview(fileInput.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length) {
        updatePreview(fileInput.files[0]);
      }
    });

    function updatePreview(file) {
      previewText.innerHTML = `
        <strong style="color: var(--primary-green);"><i class="fas fa-file-pdf" style="margin-right: 0.4rem;"></i> Selected: ${file.name}</strong>
        <div style="font-size: 0.8rem; color: var(--slate-500); margin-top: 0.25rem;">Size: ${(file.size / (1024 * 1024)).toFixed(2)} MB (Ready for upload)</div>
      `;
    }
  });
}

/* --------------------------------------------------------------------------
   3. Form Submissions & Receipt Modal Generators
   -------------------------------------------------------------------------- */
function initFormValidations() {
  const complaintForm = document.getElementById('customerComplaintForm');

  if (complaintForm) {
    complaintForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const discoTicketNo = complaintForm.querySelector('[name="discoTicketNo"]').value.trim();
      const forumRefNo = complaintForm.querySelector('[name="forumRefNo"]').value.trim();
      const name = complaintForm.querySelector('[name="fullName"]').value.trim();
      const phone = complaintForm.querySelector('[name="phone"]').value.trim();
      const email = complaintForm.querySelector('[name="email"]').value.trim();
      const lga = complaintForm.querySelector('[name="lga"]').value;
      const provider = complaintForm.querySelector('[name="provider"]').value.trim();
      const account = complaintForm.querySelector('[name="accountNumber"]').value.trim();
      const cat = complaintForm.querySelector('[name="complaintCategory"]').value;
      const desc = complaintForm.querySelector('[name="description"]').value.trim();

      if (!discoTicketNo || !forumRefNo || !name || !phone || !email || !lga || !provider || !account || !cat || !desc) {
        if (typeof showToast === 'function') {
          showToast('Please fill all statutory fields, including DisCo Ticket # and Forum Docket #.', 'danger');
        }
        return;
      }

      const adjRefCode = `NAS-ADJ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      if (typeof openCustomModal === 'function') {
        openCustomModal({
          title: 'Formal Regulatory Appeal Lodged with NASERC',
          bodyHTML: `
            <div style="text-align: center; padding: 1rem 0;">
              <div style="width: 60px; height: 60px; background: rgba(206, 17, 38, 0.1); color: var(--primary-red); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 1.75rem; margin-bottom: 0.75rem;">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h3 style="font-family: var(--font-heading); color: var(--primary-navy); font-size: 1.35rem;">NASERC Regulatory Adjudication Docket</h3>
              <p style="color: var(--slate-600); font-size: 0.9rem;">Your appeal has been formally registered with the Commission's Legal & Technical Directorate under Step 3.</p>
              
              <div style="background: var(--slate-100); border: 2px dashed var(--primary-red); padding: 1rem; border-radius: var(--radius-md); margin: 1.25rem 0;">
                <span style="font-size: 0.75rem; color: var(--slate-500); text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px;">Official Commission Docket Number</span>
                <div style="font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; color: var(--primary-red); letter-spacing: 0.05em; margin-top: 0.2rem;">${adjRefCode}</div>
              </div>
            </div>

            <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 1.25rem; font-size: 0.875rem; color: var(--slate-700); line-height: 1.6;">
              <strong>Adjudication Docket Metadata:</strong><br>
              • <strong>Appellant:</strong> ${name}<br>
              • <strong>DisCo Ticket No (Step 1):</strong> ${discoTicketNo}<br>
              • <strong>Forum Docket Ref (Step 2):</strong> ${forumRefNo}<br>
              • <strong>Service Provider:</strong> ${provider}<br>
              • <strong>Account/Meter ID:</strong> ${account} (${lga} LGA)<br>
              • <strong>Dispute Subject:</strong> ${cat}
            </div>

            <div style="margin-top: 1.5rem; text-align: center; display: flex; justify-content: center; gap: 1rem;">
              <button onclick="window.print()" class="btn btn-outline btn-sm"><i class="fas fa-print" style="margin-right: 0.4rem;"></i> Print Formal Docket</button>
              <button onclick="document.getElementById('globalModalBackdrop').classList.remove('active')" class="btn btn-primary btn-sm">Close Receipt</button>
            </div>
          `
        });
      }

      complaintForm.reset();
    });
  }
}
