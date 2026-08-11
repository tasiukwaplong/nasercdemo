/**
 * NASERC Web Portal - License & Permit Fee Calculator
 * Calculates regulatory requirements and estimated fees based on proposed capacity (kW/MW).
 * Mandate Threshold: Capacity <= 100kW requires PERMIT; Capacity > 100kW requires FULL LICENSE.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLicenseCalculator();
});

function initLicenseCalculator() {
  const calcForm = document.getElementById('licenseCalcForm');
  const capacityInput = document.getElementById('calcCapacityInput');
  const unitSelect = document.getElementById('calcUnitSelect');
  const categorySelect = document.getElementById('calcCategorySelect');

  // Result display elements
  const thresholdBadge = document.getElementById('calcThresholdBadge');
  const reqTitle = document.getElementById('calcReqTitle');
  const reqDesc = document.getElementById('calcReqDesc');
  const filingFeeElem = document.getElementById('calcFilingFee');
  const inspectionFeeElem = document.getElementById('calcInspectionFee');
  const grantFeeElem = document.getElementById('calcGrantFee');
  const totalFeeElem = document.getElementById('calcTotalFee');
  const timelineElem = document.getElementById('calcTimeline');
  const docChecklistElem = document.getElementById('calcDocChecklist');
  const prefillBtn = document.getElementById('calcApplyBtn');

  if (!capacityInput) return;

  function calculateFees() {
    let rawCapacity = parseFloat(capacityInput.value) || 0;
    const unit = unitSelect ? unitSelect.value : 'kW';
    const category = categorySelect ? categorySelect.value : 'minigrid';

    // Convert capacity to kW for calculation
    let capacityInKW = unit === 'MW' ? rawCapacity * 1000 : rawCapacity;
    let capacityInMW = capacityInKW / 1000;

    let isLicenseRequired = capacityInKW > 100;
    let filingFee = 0;
    let inspectionFee = 0;
    let grantFee = 0;
    let timeline = '7 Working Days';
    let checklist = [];

    if (capacityInKW <= 0) {
      if (thresholdBadge) thresholdBadge.className = 'section-badge';
      if (thresholdBadge) thresholdBadge.innerHTML = '<i class="fas fa-calculator"></i> Enter System Capacity';
      if (reqTitle) reqTitle.textContent = 'Specify Installed Capacity';
      if (reqDesc) reqDesc.textContent = 'Systems up to 100 kW require a Permit. Systems above 100 kW require a Full Statutory License.';
      updateFeeDisplays(0, 0, 0, 0, '--', []);
      return;
    }

    if (!isLicenseRequired) {
      // PERMIT REGISTRATION (Capacity <= 100 kW)
      if (thresholdBadge) {
        thresholdBadge.className = 'section-badge gold';
        thresholdBadge.innerHTML = '<i class="fas fa-check-circle"></i> PERMIT REGISTRATION REQUIRED (<= 100 kW)';
      }
      if (reqTitle) reqTitle.textContent = 'Simplified Permit Registration';
      if (reqDesc) reqDesc.textContent = `Your proposed ${rawCapacity} ${unit} capacity is within the 100 kW threshold. You qualify for the fast-track NASERC Permit Registration process.`;

      filingFee = 25000;
      inspectionFee = 50000;
      grantFee = 25000;
      timeline = '7 - 10 Working Days';

      checklist = [
        'CAC Business Registration Certificate',
        'Proof of Land Ownership / Lease Agreement',
        'Basic Electrical Single Line Diagram (SLD)',
        'Community Consent Letter'
      ];
    } else {
      // FULL REGULATORY LICENSE (Capacity > 100 kW)
      if (thresholdBadge) {
        thresholdBadge.className = 'section-badge';
        thresholdBadge.style.backgroundColor = 'rgba(0, 104, 55, 0.15)';
        thresholdBadge.style.color = 'var(--primary-green)';
        thresholdBadge.innerHTML = '<i class="fas fa-certificate"></i> FULL STATUTORY LICENSE REQUIRED (> 100 kW)';
      }

      if (capacityInKW <= 1000) { // 101 kW to 1 MW
        if (reqTitle) reqTitle.textContent = 'Class A Electricity License (> 100 kW to 1 MW)';
        if (reqDesc) reqDesc.textContent = `Your proposed capacity of ${rawCapacity} ${unit} exceeds 100 kW and requires a formal Class A NASERC Operational License.`;
        filingFee = 150000;
        inspectionFee = 350000;
        grantFee = 500000;
        timeline = '21 - 30 Working Days';
      } else if (capacityInKW <= 10000) { // 1 MW to 10 MW
        if (reqTitle) reqTitle.textContent = 'Class B Utility License (1 MW to 10 MW)';
        if (reqDesc) reqDesc.textContent = `Your proposed capacity of ${capacityInMW.toFixed(2)} MW requires a Class B Commercial Generating License with Grid Code Audit.`;
        filingFee = 300000;
        inspectionFee = 750000;
        grantFee = 1500000 + (Math.max(0, capacityInMW - 1) * 250000);
        timeline = '30 - 45 Working Days';
      } else { // > 10 MW
        if (reqTitle) reqTitle.textContent = 'Major Grid Generator License (> 10 MW)';
        if (reqDesc) reqDesc.textContent = `Major power utility generation of ${capacityInMW.toFixed(2)} MW requires full NASERC Commission Board approval and Transmission Interconnect Agreement.`;
        filingFee = 500000;
        inspectionFee = 1500000;
        grantFee = 4000000 + (Math.max(0, capacityInMW - 10) * 300000);
        timeline = '45 - 60 Working Days';
      }

      checklist = [
        'CAC Form 1.1 / Articles of Association',
        'Detailed Engineering Design & Single Line Diagram',
        'Environmental & Social Impact Assessment (ESIA) Report',
        'Power Purchase Agreement (PPA) / Off-taker Agreement',
        'Grid Connection Impact Study (for >1MW)',
        '3-Year Financial Model & Proof of Funding'
      ];
    }

    const totalFee = filingFee + inspectionFee + grantFee;
    updateFeeDisplays(filingFee, inspectionFee, grantFee, totalFee, timeline, checklist);

    // Pre-fill button action
    if (prefillBtn) {
      prefillBtn.onclick = () => {
        const licenseForm = document.getElementById('licenseApplicationForm');
        if (licenseForm) {
          const capInput = licenseForm.querySelector('[name="capacity"]');
          if (capInput) capInput.value = `${rawCapacity} ${unit}`;
          
          // Scroll to form and switch tab if on forms page
          const licenseTabBtn = document.querySelector('.tab-button[data-tab="license"]');
          if (licenseTabBtn) licenseTabBtn.click();
          licenseForm.scrollIntoView({ behavior: 'smooth' });
          showToast(`License form pre-filled with ${rawCapacity} ${unit} capacity!`, 'success');
        } else {
          window.location.href = `forms.html?tab=license&capacity=${encodeURIComponent(rawCapacity + ' ' + unit)}`;
        }
      };
    }
  }

  function updateFeeDisplays(filing, inspection, grant, total, timeline, checklist) {
    if (filingFeeElem) filingFeeElem.textContent = `₦${filing.toLocaleString()}`;
    if (inspectionFeeElem) inspectionFeeElem.textContent = `₦${inspection.toLocaleString()}`;
    if (grantFeeElem) grantFeeElem.textContent = `₦${grant.toLocaleString()}`;
    if (totalFeeElem) totalFeeElem.textContent = `₦${total.toLocaleString()}`;
    if (timelineElem) timelineElem.textContent = timeline;

    if (docChecklistElem) {
      if (checklist.length === 0) {
        docChecklistElem.innerHTML = '<li style="color: var(--slate-500);">Enter capacity above to view required documents</li>';
      } else {
        docChecklistElem.innerHTML = checklist.map(item => `
          <li style="display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--slate-700);">
            <i class="fas fa-check-square" style="color: var(--primary-green); margin-top: 0.2rem;"></i>
            <span>${item}</span>
          </li>
        `).join('');
      }
    }
  }

  if (capacityInput) capacityInput.addEventListener('input', calculateFees);
  if (unitSelect) unitSelect.addEventListener('change', calculateFees);
  if (categorySelect) categorySelect.addEventListener('change', calculateFees);

  // Trigger initial calculation if preset values exist
  calculateFees();
}
