/**
 * NASERC Web Portal - License & Permit Fee Calculator
 * Enforces the 100 kW Statutory Regulatory Threshold Rules
 */

document.addEventListener('DOMContentLoaded', () => {
  initFeeCalculator();
});

function initFeeCalculator() {
  const capInput = document.getElementById('calcCapacityInput');
  const unitSelect = document.getElementById('calcUnitSelect');
  const catSelect = document.getElementById('calcCategorySelect');

  if (!capInput || !unitSelect || !catSelect) return;

  function calculateFees() {
    let rawValue = parseFloat(capInput.value) || 0;
    const unit = unitSelect.value;
    const category = catSelect.value;

    // Convert capacity to kW for uniform logic evaluation
    let capacityInKW = unit === 'MW' ? rawValue * 1000 : rawValue;

    const reqTitle = document.getElementById('calcReqTitle');
    const reqDesc = document.getElementById('calcReqDesc');
    const timeline = document.getElementById('calcTimeline');
    const badge = document.getElementById('calcThresholdBadge');

    const filingFeeEl = document.getElementById('calcFilingFee');
    const inspectionFeeEl = document.getElementById('calcInspectionFee');
    const grantFeeEl = document.getElementById('calcGrantFee');
    const totalFeeEl = document.getElementById('calcTotalFee');
    const checklistEl = document.getElementById('calcDocChecklist');

    let filingFee = 0;
    let inspectionFee = 0;
    let grantFee = 0;
    let titleText = '';
    let descText = '';
    let timelineText = '';
    let checklistItems = [];

    // Evaluate 100 kW Statutory Threshold Rule
    if (capacityInKW <= 100 && (category === 'minigrid' || category === 'captive')) {
      // PERMIT REGISTRATION (<= 100 kW)
      titleText = `Fast-Track Permit Registration (<= 100 kW)`;
      descText = `Your capacity of ${rawValue} ${unit} (${capacityInKW} kW) falls below the 100 kW statutory license threshold. You qualify for streamlined NASERC Permit Registration.`;
      timelineText = '5 - 7 Working Days';

      filingFee = 25000;
      inspectionFee = 50000;
      grantFee = 75000;

      checklistItems = [
        'Certificate of Company / Enterprise Incorporation (CAC)',
        'Detailed Site Layout & Land Ownership / Lease Agreement',
        'Basic Single-Line Diagram (SLD) & Equipment Specifications',
        'Community Consent Agreement / LGA Endorsement'
      ];
    } else {
      // FULL REGULATORY LICENSE (> 100 kW)
      timelineText = '21 - 30 Working Days';

      if (capacityInKW <= 1000) { // 101 kW to 1 MW (Class A)
        titleText = `Class A Electricity License (101 kW - 1 MW)`;
        descText = `Your capacity of ${rawValue} ${unit} (${capacityInKW} kW) exceeds the 100 kW threshold and requires a formal Class A NASERC Operational License.`;

        filingFee = 150000;
        inspectionFee = 350000;
        grantFee = 500000;
      } else if (capacityInKW <= 10000) { // 1 MW to 10 MW (Class B Utility)
        titleText = `Class B Utility Electricity License (1 MW - 10 MW)`;
        descText = `Your capacity of ${rawValue} ${unit} (${rawValue} MW) is a major grid-connected or utility off-grid installation requiring a Class B License.`;

        filingFee = 300000;
        inspectionFee = 750000;
        grantFee = 1500000;
      } else { // > 10 MW Major State Grid License
        titleText = `Major State Grid Generation License (> 10 MW)`;
        descText = `Large-scale utility power generation requiring full board approval, grid interconnectivity audit, and environmental clearance.`;

        filingFee = 500000;
        inspectionFee = 1500000;
        grantFee = 3000000;
      }

      checklistItems = [
        'CAC Certified Memorandum & Articles of Association',
        'Comprehensive Environmental Impact Assessment (EIA) Approval',
        'Technical Feasibility Study & Grid Impact Interconnection Audit',
        'Bank Credit Guarantee & Financial Projection Model',
        'Land Title Deed (C of O) from Nasarawa State Geographic Information System (NAGIS)'
      ];
    }

    const totalFee = filingFee + inspectionFee + grantFee;

    // Render calculated values into UI
    if (reqTitle) reqTitle.textContent = titleText;
    if (reqDesc) reqDesc.textContent = descText;
    if (timeline) timeline.textContent = timelineText;

    if (filingFeeEl) filingFeeEl.textContent = `₦${filingFee.toLocaleString()}`;
    if (inspectionFeeEl) inspectionFeeEl.textContent = `₦${inspectionFee.toLocaleString()}`;
    if (grantFeeEl) grantFeeEl.textContent = `₦${grantFee.toLocaleString()}`;
    if (totalFeeEl) totalFeeEl.textContent = `₦${totalFee.toLocaleString()}`;

    if (checklistEl) {
      checklistEl.innerHTML = checklistItems.map(item => `
        <li style="display: flex; align-items: flex-start; gap: 0.6rem; padding: 0.5rem 0; font-size: 0.875rem; color: var(--slate-700); border-bottom: 1px solid var(--slate-100);">
          <span style="color: var(--primary-green); font-weight: bold; font-size: 1rem; line-height: 1;">•</span>
          <span>${item}</span>
        </li>
      `).join('');
    }
  }

  capInput.addEventListener('input', calculateFees);
  unitSelect.addEventListener('change', calculateFees);
  catSelect.addEventListener('change', calculateFees);

  // Transfer calculation directly into Application Form inputs
  const applyBtn = document.getElementById('calcApplyBtn');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const rawValue = capInput.value;
      const unit = unitSelect.value;
      const capacityStr = `${rawValue} ${unit}`;

      // Populate License Application form fields
      const capacityFormInput = document.querySelector('input[name="capacity"]');
      const licenseTypeSelect = document.querySelector('select[name="licenseType"]');

      if (capacityFormInput) capacityFormInput.value = capacityStr;

      let capacityInKW = unit === 'MW' ? parseFloat(rawValue) * 1000 : parseFloat(rawValue);
      if (licenseTypeSelect) {
        if (capacityInKW <= 100) {
          licenseTypeSelect.value = "Permit: Off-Grid Generation (<= 100 kW)";
        } else if (capacityInKW <= 1000) {
          licenseTypeSelect.value = "License Class A: Mini-Grid (101 kW - 1 MW)";
        } else {
          licenseTypeSelect.value = "License Class B: Utility Mini-Grid (1 MW - 10 MW)";
        }
      }

      showToast(`Calculated capacity (${capacityStr}) pre-filled into application!`, 'success');

      // Scroll to application form
      const appForm = document.getElementById('licenseApplicationForm');
      if (appForm) {
        appForm.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Initial calculation trigger
  calculateFees();
}
