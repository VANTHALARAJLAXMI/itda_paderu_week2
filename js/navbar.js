/* ==========================================================================
   ITDA PADERU - NAVBAR COMPONENT (js/navbar.js)
   Dynamically injects unified government header and navigation bar
   ========================================================================== */

function getLang() {
  return localStorage.getItem('itda_lang') || 'en';
}

function setLang(lang) {
  if (getLang() === lang) return;
  localStorage.setItem('itda_lang', lang);
  location.reload();
}

function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/templates/') || path.includes('\\templates\\') ||
      path.includes('/education/') || path.includes('\\education\\') ||
      path.includes('/health/') || path.includes('\\health\\') ||
      path.includes('/tribal-welfare/') || path.includes('\\tribal-welfare\\')) {
    return '../';
  }
  return './';
}

function resolveNavLink(itemPath) {
  const path = window.location.pathname;
  const inTemplates = path.includes('/templates/') || path.includes('\\templates\\');
  const inEducation = path.includes('/education/') || path.includes('\\education\\');
  const inHealth = path.includes('/health/') || path.includes('\\health\\');
  const inTribal = path.includes('/tribal-welfare/') || path.includes('\\tribal-welfare\\');
  if (inEducation || inHealth || inTribal) {
    if (itemPath === 'index.html') return '../index.html';
    return '../' + itemPath;
  }
  if (inTemplates) {
    if (itemPath === 'index.html') return '../index.html';
    if (itemPath.indexOf('education/') === 0 || itemPath.indexOf('health/') === 0 || itemPath.indexOf('tribal-welfare/') === 0) return '../' + itemPath;
    return itemPath.replace('templates/', '').replace('templates\\', '');
  }
  return itemPath;
}

function closeMobileMenu() {
  const strip = document.getElementById('navStrip');
  if (strip) {
    strip.classList.remove('open');
  }
}

function toggleMobileMenu() {
  const strip = document.getElementById('navStrip');
  if (strip) {
    strip.classList.toggle('open');
  }
}

function renderNavbar() {
  const navContainer = document.getElementById('navbar');
  if (!navContainer) return;

  const L = getLang();
  const strings = UI_STRINGS[L] || UI_STRINGS.en;

  let currentFile = window.location.pathname.split('/').pop();
  if (!currentFile || currentFile === '') currentFile = 'index.html';
  const pathHasEducation = window.location.pathname.indexOf('/education/') !== -1 ||
    window.location.pathname.indexOf('\\education\\') !== -1;
  const pathHasHealth = window.location.pathname.indexOf('/health/') !== -1 ||
    window.location.pathname.indexOf('\\health\\') !== -1;
  const pathHasTribal = window.location.pathname.indexOf('/tribal-welfare/') !== -1 ||
    window.location.pathname.indexOf('\\tribal-welfare\\') !== -1;
  const deptPages = ['departments.html', 'education.html', 'health.html', 'tribal-welfare.html', 'agriculture.html', 'horticulture.html'];
  const deptActive = pathHasEducation || pathHasHealth || pathHasTribal || deptPages.indexOf(currentFile) !== -1;

  const faqLink = resolveNavLink('templates/faq.html');
  const contactLink = resolveNavLink('templates/contact.html');
  const homeLink = resolveNavLink('index.html');

  const navHtml = `
    <div class="gov-top-bar">
      <div class="container">
        <div class="gov-title">
          <span class="gov-flag">🏛️</span> ${strings.govLabel}
        </div>
        <div>
          <a href="${faqLink}" onclick="closeMobileMenu()" style="color: #cce3d8; font-size: 0.78rem;">FAQ</a> · 
          <a href="${contactLink}" onclick="closeMobileMenu()" style="color: #cce3d8; font-size: 0.78rem;">Contact</a>
        </div>
      </div>
    </div>

    <header class="site-header">
      <div class="container header-main">
        <a href="${homeLink}" class="brand-wrapper" onclick="closeMobileMenu()">
          <div class="brand-emblem">
            <img src="${getBasePath()}images/itda-paderu-logo.png" alt="గిరిజన సంక్షేమ అభివృద్ధి శాఖ పాడేరు" width="50" height="50">
          </div>
          <div class="brand-text">
            <h1>${strings.siteTitle}</h1>
            <p>${strings.siteSubtitle}</p>
          </div>
        </a>

        <div class="header-actions">
          <button type="button" class="search-trigger-btn" onclick="openSearchModal()">
            🔍 <span>${strings.searchBtn}</span>
          </button>

          <div class="lang-switcher" role="group" aria-label="Language Selector">
            <button type="button" class="lang-btn ${L === 'en' ? 'active' : ''}" onclick="setLang('en')">English</button>
            <button type="button" class="lang-btn ${L === 'te' ? 'active' : ''}" onclick="setLang('te')">తెలుగు</button>
          </div>

          <button type="button" class="mobile-nav-toggle" aria-label="Toggle menu" onclick="toggleMobileMenu()">
            ☰
          </button>
        </div>
      </div>

      <nav class="nav-strip" id="navStrip">
        <div class="container">
          <ul class="nav-menu">
            <li><a href="${homeLink}" class="${currentFile === 'index.html' && !pathHasEducation && !pathHasHealth && !pathHasTribal ? 'active' : ''}" onclick="closeMobileMenu()">${L === 'en' ? 'Home' : 'హోమ్'}</a></li>
            
            <!-- Government District Portal Styled Dropdown Menu -->
            <li class="nav-item-dropdown">
              <a href="${resolveNavLink('templates/about.html')}" class="dropdown-btn">
                <span>${L === 'en' ? 'About District' : 'జిల్లా గురించి'}</span>
                <span class="arrow-icon">▼</span>
              </a>
              <ul class="dropdown-content">
                <li><a href="${resolveNavLink('templates/history.html')}">${L === 'en' ? 'History' : 'చరిత్ర'}</a></li>
                <li><a href="${resolveNavLink('templates/whos-who.html')}">${L === 'en' ? "Who's Who" : 'అధికారులు'}</a></li>
                <li><a href="${resolveNavLink('templates/district-map.html')}">${L === 'en' ? 'District Map' : 'జిల్లా మ్యాప్'}</a></li>
                <li class="has-sub">
                  <a href="${resolveNavLink('templates/administration.html')}">
                    <span>${L === 'en' ? 'Administrative Setup' : 'పరిపాలనా వ్యవస్థ'}</span>
                    <span class="sub-arrow" aria-hidden="true">›</span>
                  </a>
                  <ul class="sub-dropdown">
                    <li><a href="${resolveNavLink('templates/collectorate.html')}">${L === 'en' ? 'Collectorate' : 'కలెక్టరేట్'}</a></li>
                    <li><a href="${resolveNavLink('templates/revenue-division.html')}">${L === 'en' ? 'Revenue Division' : 'రెవెన్యూ డివిజన్'}</a></li>
                    <li><a href="${resolveNavLink('templates/mandals.html')}">${L === 'en' ? 'Mandals' : 'మండలాలు'}</a></li>
                    <li><a href="${resolveNavLink('templates/villages-panchayats.html')}">${L === 'en' ? 'Village & Panchayats' : 'గ్రామాలు & పంచాయతీలు'}</a></li>
                  </ul>
                </li>
                <li><a href="${resolveNavLink('templates/about.html')}">${L === 'en' ? 'Demography' : 'జనాభా'}</a></li>
                <li><a href="${resolveNavLink('templates/agriculture.html')}">${L === 'en' ? 'Economy' : 'ఆర్థిక వ్యవస్థ'}</a></li>
              </ul>
            </li>

            <li class="nav-item-dropdown">
              <a href="${resolveNavLink('templates/helpline.html')}" class="dropdown-btn">
                <span>${L === 'en' ? 'Directory' : 'డైరెక్టరీ'}</span>
                <span class="arrow-icon">▼</span>
              </a>
              <ul class="dropdown-content">
                <li><a href="${resolveNavLink('templates/disaster-management.html')}">${L === 'en' ? 'Disaster Management' : 'విపత్తు నిర్వహణ'}</a></li>
                <li><a href="${resolveNavLink('templates/collectors-history.html')}">${L === 'en' ? 'History of Collectors' : 'కలెక్టర్ల చరిత్ర'}</a></li>
                <li><a href="${resolveNavLink('templates/helpline.html')}">${L === 'en' ? 'Helpline' : 'హెల్ప్‌లైన్'}</a></li>
                <li><a href="${resolveNavLink('templates/public-utilities.html')}">${L === 'en' ? 'Public Utilities' : 'ప్రజా సౌకర్యాలు'}</a></li>
              </ul>
            </li>

            <li class="nav-item-dropdown ${deptActive ? 'active' : ''}">
              <a href="${resolveNavLink('templates/departments.html')}" class="dropdown-btn">
                <span>${L === 'en' ? 'Departments' : 'విభాగాలు'}</span>
                <span class="arrow-icon">▼</span>
              </a>
              <ul class="dropdown-content">
                ${DEPARTMENT_PAGES.map(function (item) {
                  const linkPath = resolveNavLink(item.path);
                  const targetFile = item.path.split('/').pop();
                  const isActive = (item.id === 'education' && pathHasEducation) || (item.id === 'health' && pathHasHealth) || (item.id === 'tribal-welfare' && pathHasTribal) || currentFile === targetFile;
                  return '<li><a href="' + linkPath + '" class="' + (isActive ? 'active' : '') + '" onclick="closeMobileMenu()">' + (L === 'en' ? item.en : item.te) + '</a></li>';
                }).join('')}
              </ul>
            </li>

            <li class="nav-item-dropdown ${currentFile === 'gallery.html' ? 'active' : ''}">
              <a href="${resolveNavLink('templates/gallery.html')}" class="dropdown-btn">
                <span>${L === 'en' ? 'Gallery' : 'గ్యాలరీ'}</span>
                <span class="arrow-icon">▼</span>
              </a>
              <ul class="dropdown-content">
                <li><a href="${resolveNavLink('templates/gallery.html')}" class="${currentFile === 'gallery.html' ? 'active' : ''}" onclick="closeMobileMenu()">${L === 'en' ? 'Photo Gallery' : 'ఫోటో గ్యాలరీ'}</a></li>
                <li><a href="${resolveNavLink('templates/gallery.html')}#cultural" onclick="closeMobileMenu()">${L === 'en' ? 'Cultural programmes' : 'సాంస్కృతిక కార్యక్రమాలు'}</a></li>
                <li><a href="${resolveNavLink('templates/gallery.html')}#attire" onclick="closeMobileMenu()">${L === 'en' ? 'Traditional attire' : 'సాంప్రదాయ వస్త్రధారణ'}</a></li>
                <li><a href="${resolveNavLink('templates/gallery.html')}#staff" onclick="closeMobileMenu()">${L === 'en' ? 'Staff & escorts' : 'సిబ్బంది'}</a></li>
              </ul>
            </li>

            ${NAV_ITEMS.filter(item => item.id !== 'home' && item.id !== 'about').map(item => {
              const linkPath = resolveNavLink(item.path);
              const targetFile = item.path.split('/').pop();
              const isActive = currentFile === targetFile;
              return `<li><a href="${linkPath}" class="${isActive ? 'active' : ''}" onclick="closeMobileMenu()">${L === 'en' ? item.en : item.te}</a></li>`;
            }).join('')}
          </ul>
        </div>
      </nav>
    </header>
  `;

  navContainer.innerHTML = navHtml;
  initNavMenus();
  setSiteFavicon();
}

function setSiteFavicon() {
  const href = getBasePath() + "images/itda-paderu-logo.png";
  let link = document.querySelector('link[rel="icon"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.type = "image/png";
  link.href = href;
}

function initNavMenus() {
  document.querySelectorAll('.nav-item-dropdown').forEach(function (drop) {
    const btn = drop.querySelector(':scope > a.dropdown-btn, :scope > .dropdown-btn');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        drop.classList.toggle('open');
      }
    });
  });

  document.querySelectorAll('.has-sub > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });
}
