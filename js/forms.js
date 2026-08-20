/**
 * NASERC Web Portal - Form Validation, File Previews, and Tab Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  initFormTabs();
  initFormValidations();
  initFileUploadPreviews();
});

/* Tab Switching Logic on Forms Page */
function initFormTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const complaintTab = document.getElementById('complaintTab');
  const licenseTab = document.getElementById('licenseTab');

  if (!tabButtons.length) return;

  function switchTab(targetTab) {
    tabButtons.forEach(btn => {
      if (btn.dataset.tab === targetTab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (targetTab === 'complaint') {
      if (complaintTab) complaintTab.style.display = 'block';
      if (licenseTab) licenseTab.style.display = 'none';
    } else if (targetTab === 'license') {
      if (complaintTab) complaintTab.style.display = 'none';
      if (licenseTab) licenseTab.style.display = 'block';
    }
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  // Handle URL query parameters (e.g., forms.html?tab=license)
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab');
  if (tabParam && (tabParam === 'complaint' || tabParam === 'license')) {
    switchTab(tabParam);
  }
}

/* File Upload Drag & Drop Preview */
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
        <strong style="color: var(--primary-green);">File Selected: ${file.name}</strong>
        <div style="font-size: 0.8rem; color: var(--slate-500); margin-top: 0.25rem;">Size: ${(file.size / (1024 * 1024)).toFixed(2)} MB</div>
      `;
    }
  });
}

/* Form Submissions & Receipt Modal Generators */
function initFormValidations() {
  const complaintForm = document.getElementById('customerComplaintForm');
  const licenseForm = document.getElementById('licenseApplicationForm');

  if (complaintForm) {
    complaintForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = complaintForm.querySelector('[name="fullName"]').value.trim();
      const phone = complaintForm.querySelector('[name="phone"]').value.trim();
      const email = complaintForm.querySelector('[name="email"]').value.trim();
      const lga = complaintForm.querySelector('[name="lga"]').value;
      const provider = complaintForm.querySelector('[name="provider"]').value;
      const account = complaintForm.querySelector('[name="accountNumber"]').value.trim();
      const cat = complaintForm.querySelector('[name="complaintCategory"]').value;
      const desc = complaintForm.querySelector('[name="description"]').value.trim();

      if (!name || !phone || !email || !lga || !provider || !account || !cat || !desc) {
        showToast('Please fill all required fields before submitting.', 'danger');
        return;
      }

      const refCode = `NAS-CMP-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      openCustomModal({
        title: 'Complaint Lodged Successfully',
        bodyHTML: `
          <div style="text-align: center; padding: 1rem 0;">
            <h3 style="font-family: var(--font-heading); color: var(--primary-navy); font-size: 1.4rem;">Official Receipt</h3>
            <p style="color: var(--slate-600); font-size: 0.9rem;">Your customer dispute has been logged with the NASERC Consumer Advocacy Desk.</p>
            <div style="background: var(--slate-100); border: 1px dashed var(--primary-green); padding: 1rem; border-radius: var(--radius-md); margin: 1.25rem 0;">
              <span style="font-size: 0.8rem; color: var(--slate-500); text-transform: uppercase;">Tracking Reference Code</span>
              <div style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--primary-green); letter-spacing: 0.05em;">${refCode}</div>
            </div>
          </div>
          <div style="font-size: 0.875rem; color: var(--slate-600); line-height: 1.5;">
            <strong>Filing Details:</strong><br>
            • Complainant: ${name}<br>
            • Service Provider: ${provider}<br>
            • Account/Meter ID: ${account}<br>
            • LGA: ${lga} LGA<br>
            • Category: ${cat}
          </div>
          <div style="margin-top: 1.5rem; text-align: center;">
            <button onclick="window.print()" class="btn btn-outline btn-sm">Print Receipt</button>
          </div>
        `
      });

      complaintForm.reset();
    });
  }

  if (licenseForm) {
    licenseForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const company = licenseForm.querySelector('[name="companyName"]').value.trim();
      const cac = licenseForm.querySelector('[name="cacNumber"]').value.trim();
      const person = licenseForm.querySelector('[name="contactPerson"]').value.trim();
      const phone = licenseForm.querySelector('[name="phone"]').value.trim();
      const email = licenseForm.querySelector('[name="email"]').value.trim();
      const type = licenseForm.querySelector('[name="licenseType"]').value;
      const capacity = licenseForm.querySelector('[name="capacity"]').value.trim();
      const location = licenseForm.querySelector('[name="location"]').value.trim();
      const summary = licenseForm.querySelector('[name="projectSummary"]').value.trim();

      if (!company || !cac || !person || !phone || !email || !type || !capacity || !location || !summary) {
        showToast('Please complete all statutory application fields.', 'danger');
        return;
      }

      const refCode = `NAS-LIC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      openCustomModal({
        title: 'License Application Docket Created',
        bodyHTML: `
          <div style="text-align: center; padding: 1rem 0;">
            <h3 style="font-family: var(--font-heading); color: var(--primary-navy); font-size: 1.4rem;">Docket Acknowledgement</h3>
            <p style="color: var(--slate-600); font-size: 0.9rem;">Your statutory license application has been filed with the NASERC Technical & Legal Division.</p>
            <div style="background: var(--slate-100); border: 1px dashed var(--accent-gold-hover); padding: 1rem; border-radius: var(--radius-md); margin: 1.25rem 0;">
              <span style="font-size: 0.8rem; color: var(--slate-500); text-transform: uppercase;">Application Reference Docket</span>
              <div style="font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: var(--primary-navy); letter-spacing: 0.05em;">${refCode}</div>
            </div>
          </div>
          <div style="font-size: 0.875rem; color: var(--slate-600); line-height: 1.5;">
            <strong>Application Metadata:</strong><br>
            • Applicant: ${company} (${cac})<br>
            • Authorized Rep: ${person}<br>
            • Permit / License Class: ${type}<br>
            • Proposed Capacity: ${capacity}<br>
            • Location: ${location}
          </div>
          <div style="margin-top: 1.5rem; text-align: center;">
            <button onclick="window.print()" class="btn btn-outline btn-sm">Print Docket Receipt</button>
          </div>
        `
      });

      licenseForm.reset();
    });
  }
}
