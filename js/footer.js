/* ==========================================================================
   ITDA PADERU - FOOTER COMPONENT (js/footer.js)
   Dynamically injects unified government footer & reference disclaimers
   ========================================================================== */

function renderFooter() {
  const footerContainer = document.getElementById('footer');
  if (!footerContainer) return;

  const L = getLang();
  const strings = UI_STRINGS[L] || UI_STRINGS.en;

  const footerHtml = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-col">
          <img src="${getBasePath()}images/itda-paderu-logo.png" alt="గిరిజన సంక్షేమ అభివృద్ధి శాఖ పాడేరు" class="footer-logo">
          <h4>${strings.siteTitle}</h4>
          <p>${L === 'en' ? 'Integrated Tribal Development Agency, Paderu, Alluri Sitharama Raju (ASR) District, Andhra Pradesh.' : 'సమీకృత గిరిజన అభివృద్ధి సంస్థ, పాడేరు, అల్లూరి సీతారామరాజు (ASR) జిల్లా, ఆంధ్రప్రదేశ్.'}</p>
          <span class="disclaimer-badge">📌 ${L === 'en' ? 'Reference Information Portal' : 'సమాచార రిఫరెన్స్ పోర్టల్'}</span>
        </div>

        <div class="footer-col">
          <h4>${L === 'en' ? 'Quick Links' : 'ముఖ్యమైన లింకులు'}</h4>
          <ul class="footer-links">
            <li><a href="${resolveNavLink('templates/about.html')}">${L === 'en' ? 'About ITDA' : 'ITDA గురించి'}</a></li>
            <li><a href="${resolveNavLink('templates/departments.html')}">${L === 'en' ? 'Departments' : 'విభాగాలు'}</a></li>
            <li><a href="${resolveNavLink('education/index.html')}">${L === 'en' ? 'Education Explorer' : 'విద్య'}</a></li>
            <li><a href="${resolveNavLink('health/index.html')}">${L === 'en' ? 'Health Services' : 'వైద్య సేవలు'}</a></li>
            <li><a href="${resolveNavLink('tribal-welfare/index.html')}">${L === 'en' ? 'Tribal Welfare & PVTG' : 'గిరిజన సంక్షేమం & PVTG'}</a></li>
            <li><a href="${resolveNavLink('templates/gallery.html')}">${L === 'en' ? 'Photo Gallery' : 'ఫోటో గ్యాలరీ'}</a></li>
            <li><a href="${resolveNavLink('templates/schemes.html')}">${L === 'en' ? 'Government Schemes' : 'సంక్షేమ పథకాలు'}</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>${L === 'en' ? 'Public Services' : 'ప్రజా సేవలు'}</h4>
          <ul class="footer-links">
            <li><a href="${resolveNavLink('templates/services.html')}">${L === 'en' ? 'Citizen Services' : 'పౌర సేవలు'}</a></li>
            <li><a href="${resolveNavLink('templates/scholarships.html')}">${L === 'en' ? 'Scholarship Guidance' : 'స్కాలర్‌షిప్ సహాయం'}</a></li>
            <li><a href="${resolveNavLink('templates/grievance.html')}">${L === 'en' ? 'Grievance Redressal' : 'ఫిర్యాదులు'}</a></li>
            <li><a href="${resolveNavLink('templates/officers.html')}">${L === 'en' ? 'Officers Directory' : 'అధికారుల జాబితా'}</a></li>
            <li><a href="${resolveNavLink('templates/contact.html')}">${L === 'en' ? 'Office Location' : 'కార్యాలయ చిరునామా'}</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>${L === 'en' ? 'Important Note' : 'ముఖ్య గమనిక'}</h4>
          <p>${strings.officialDisclaimerNote}</p>
          <p style="font-size: 0.8rem; color: #a4c4b5;">${L === 'en' ? 'Emergency Helpline: 112 / 108 / 104' : 'అత్యవసర సహాయం: 112 / 108 / 104'}</p>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container">
          <p>${strings.copyrightText}</p>
        </div>
      </div>
    </footer>
  `;

  footerContainer.innerHTML = footerHtml;
}
