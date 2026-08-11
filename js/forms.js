/**
 * NASERC Web Portal - Forms & Verification Module
 * Handles Complaint & License Application Forms, tab switching, client validation,
 * reference generation, and submission receipt modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  initFormTabs();
  initComplaintForm();
  initLicenseForm();
  initFileUploadPreviews();
});

/* --------------------------------------------------------------------------
   1. Tab Switcher Controller
   -------------------------------------------------------------------------- */
function initFormTabs() {
  const tabBtns = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.form-tab-content');

  if (tabBtns.length === 0) return;

  function switchTab(tabId) {
    tabBtns.forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    tabContents.forEach(content => {
      if (content.id === `${tabId}Tab`) {
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    });
  }

  // Parse URL query parameter (e.g. forms.html?tab=license)
  const urlParams = new URLSearchParams(window.location.search);
  const activeTab = urlParams.get('tab') || 'complaint';
  switchTab(activeTab);

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });
}

/* --------------------------------------------------------------------------
   2. Customer Complaint Form Handler
   -------------------------------------------------------------------------- */
function initComplaintForm() {
  const form = document.getElementById('customerComplaintForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(form)) {
      showToast('Please correct the errors in the form before submitting.', 'danger');
      return;
    }

    const refNumber = `NAS-CMP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullName = form.querySelector('[name="fullName"]').value;
    const provider = form.querySelector('[name="provider"]').value;
    const category = form.querySelector('[name="complaintCategory"]').value;

    showSubmissionSuccessModal({
      title: 'Complaint Submitted Successfully!',
      reference: refNumber,
      details: [
        { label: 'Complainant', value: fullName },
        { label: 'Electricity DisCo / Provider', value: provider },
        { label: 'Category', value: category },
        { label: 'Date Submitted', value: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
        { label: 'Expected Resolution Timeline', value: '7 Working Days' }
      ],
      notice: 'Our Consumer Protection Unit will investigate your complaint. You will receive SMS & Email notifications on the resolution status.'
    });

    form.reset();
  });
}

/* --------------------------------------------------------------------------
   3. License Application Form Handler
   -------------------------------------------------------------------------- */
function initLicenseForm() {
  const form = document.getElementById('licenseApplicationForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm(form)) {
      showToast('Please fill all required fields correctly.', 'danger');
      return;
    }

    const refNumber = `NAS-LIC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const companyName = form.querySelector('[name="companyName"]').value;
    const licenseType = form.querySelector('[name="licenseType"]').value;
    const capacity = form.querySelector('[name="capacity"]').value;

    showSubmissionSuccessModal({
      title: 'License Application Submitted!',
      reference: refNumber,
      details: [
        { label: 'Applicant / Business', value: companyName },
        { label: 'License Class', value: licenseType },
        { label: 'Proposed Capacity', value: `${capacity} kW/MW` },
        { label: 'Filing Date', value: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) },
        { label: 'Status', value: 'Under Technical & Legal Review' }
      ],
      notice: 'Your application has been received by the NASERC Licensing & Technical Committee. Payment instructions for processing fees will be dispatched to your registered email.'
    });

    form.reset();
  });
}

/* --------------------------------------------------------------------------
   4. Live Form Validation Engine
   -------------------------------------------------------------------------- */
function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');

  inputs.forEach(input => {
    const value = input.value.trim();
    if (!value) {
      setError(input, 'This field is required');
      isValid = false;
    } else if (input.type === 'email' && !validateEmail(value)) {
      setError(input, 'Please enter a valid email address');
      isValid = false;
    } else if (input.type === 'tel' && value.length < 10) {
      setError(input, 'Please enter a valid phone number');
      isValid = false;
    } else {
      clearError(input);
    }
  });

  return isValid;
}

function setError(input, message) {
  input.classList.add('error');
  let errElem = input.nextElementSibling;
  if (!errElem || !errElem.classList.contains('error-message')) {
    errElem = document.createElement('div');
    errElem.className = 'error-message';
    input.parentNode.insertBefore(errElem, input.nextSibling);
  }
  errElem.textContent = message;
}

function clearError(input) {
  input.classList.remove('error');
  const errElem = input.nextElementSibling;
  if (errElem && errElem.classList.contains('error-message')) {
    errElem.remove();
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* --------------------------------------------------------------------------
   5. Drag & Drop File Upload Preview
   -------------------------------------------------------------------------- */
function initFileUploadPreviews() {
  const uploadZones = document.querySelectorAll('.file-upload-zone');

  uploadZones.forEach(zone => {
    const fileInput = zone.querySelector('input[type="file"]');
    const previewText = zone.querySelector('.upload-preview-text');

    if (!fileInput) return;

    zone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        const fileSize = (fileInput.files[0].size / (1024 * 1024)).toFixed(2);
        if (previewText) {
          previewText.innerHTML = `<strong>Selected:</strong> ${fileName} (${fileSize} MB)`;
          zone.style.borderColor = 'var(--primary-green)';
          zone.style.backgroundColor = 'var(--success-bg)';
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Submission Confirmation Modal Dialog
   -------------------------------------------------------------------------- */
function showSubmissionSuccessModal(data) {
  const modalHTML = `
    <div class="modal-backdrop active" id="successModal">
      <div class="modal-dialog">
        <div class="modal-header" style="background: var(--primary-green); color: var(--white);">
          <h3 class="modal-title" style="color: var(--white);"><i class="fas fa-check-circle"></i> ${data.title}</h3>
          <button class="modal-close" style="color: var(--white);" onclick="closeSuccessModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <span style="font-size: 0.85rem; color: var(--slate-500); text-transform: uppercase; font-weight: 700;">Official Reference ID</span>
            <div style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; color: var(--primary-navy); letter-spacing: 0.05em; margin-top: 0.25rem;">
              ${data.reference}
            </div>
          </div>
          
          <div style="background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
            ${data.details.map(item => `
              <div style="display: flex; justify-content: space-between; padding: 0.4rem 0; border-bottom: 1px solid var(--slate-200); font-size: 0.9rem;">
                <span style="color: var(--slate-600); font-weight: 600;">${item.label}:</span>
                <span style="color: var(--slate-900); font-weight: 700;">${item.value}</span>
              </div>
            `).join('')}
          </div>

          <p style="font-size: 0.9rem; color: var(--slate-600); background: var(--warning-bg); padding: 1rem; border-left: 4px solid var(--accent-gold); border-radius: var(--radius-sm);">
            <i class="fas fa-info-circle" style="color: var(--accent-gold); margin-right: 0.5rem;"></i> ${data.notice}
          </p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" onclick="window.print()"><i class="fas fa-print"></i> Print Receipt</button>
          <button class="btn btn-primary" onclick="closeSuccessModal()">Done</button>
        </div>
      </div>
    </div>
  `;

  const div = document.createElement('div');
  div.id = 'modalContainer';
  div.innerHTML = modalHTML;
  document.body.appendChild(div);
}

function closeSuccessModal() {
  const modal = document.getElementById('modalContainer');
  if (modal) modal.remove();
}
