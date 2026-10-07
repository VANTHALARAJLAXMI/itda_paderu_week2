/* ==========================================================================
   ITDA PADERU - SEARCH FUNCTIONALITY (js/search.js)
   Fast, client-side website search overlay & matching algorithm
   ========================================================================== */

function injectSearchModalDOM() {
  if (document.getElementById('searchModalOverlay')) return;

  const L = getLang();
  const strings = UI_STRINGS[L] || UI_STRINGS.en;

  const modalHtml = `
    <div class="search-modal-overlay" id="searchModalOverlay" onclick="handleModalOverlayClick(event)">
      <div class="search-modal-box">
        <div class="search-modal-header">
          <span>🔍</span>
          <input type="text" id="searchInput" placeholder="${strings.searchPlaceholder}" onkeyup="handleSearchKeyup(event)">
          <button type="button" class="search-close-btn" onclick="closeSearchModal()">✕</button>
        </div>
        <div class="search-results-list" id="searchResultsList">
          <p style="color: var(--text-muted); font-size: 0.9rem;">${L === 'en' ? 'Type keywords like "education", "coffee", "schemes", "pvtg", "health"...' : 'విద్య, కాఫీ, పథకాలు, పివిటిజి వంటి పదాలను వెతకండి...'}</p>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function openSearchModal() {
  injectSearchModalDOM();
  const modal = document.getElementById('searchModalOverlay');
  const input = document.getElementById('searchInput');
  if (modal) {
    modal.classList.add('active');
    if (input) {
      input.value = '';
      input.focus();
    }
  }
}

function closeSearchModal() {
  const modal = document.getElementById('searchModalOverlay');
  if (modal) {
    modal.classList.remove('active');
  }
}

function handleModalOverlayClick(e) {
  if (e.target.id === 'searchModalOverlay') {
    closeSearchModal();
  }
}

function handleSearchKeyup(e) {
  const query = e.target.value.trim().toLowerCase();
  const resultsContainer = document.getElementById('searchResultsList');
  if (!resultsContainer) return;

  if (!query || query.length < 2) {
    const L = getLang();
    resultsContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">${L === 'en' ? 'Type at least 2 characters to search...' : 'కనీసం 2 అక్షరాలను నమోదు చేయండి...'}</p>`;
    return;
  }

  const L = getLang();
  const base = getBasePath();
  const matches = [];

  // Search through ALL_PAGES and itdaKnowledge
  ALL_PAGES.forEach(page => {
    const pageTitle = (L === 'en' ? page.en : page.te).toLowerCase();
    const pageKey = page.id;
    const knowledgeData = itdaKnowledge[pageKey];
    
    let contentSnippet = '';
    let isMatch = false;

    if (pageTitle.includes(query)) {
      isMatch = true;
    }

    if (knowledgeData) {
      const textEn = (knowledgeData.en || '').toLowerCase();
      const textTe = (knowledgeData.te || '').toLowerCase();
      if (textEn.includes(query) || textTe.includes(query)) {
        isMatch = true;
        contentSnippet = L === 'en' ? knowledgeData.en : knowledgeData.te;
      }
    }

    if (isMatch) {
      matches.push({
        title: L === 'en' ? page.en : page.te,
        path: base + page.path,
        snippet: contentSnippet || (L === 'en' ? `Explore ${page.en} services and information.` : `${page.te} సేవల వివరాలు చూడండి.`)
      });
    }
  });

  if (matches.length === 0) {
    resultsContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">${L === 'en' ? 'No matching pages found for "' + query + '". Try asking our AI Assistant!' : '"' + query + '" సంబంధిత వివరాలు దొరకలేదు.'}</p>`;
  } else {
    resultsContainer.innerHTML = matches.map(m => `
      <div class="search-result-item">
        <a href="${m.path}" onclick="closeSearchModal()">${m.title}</a>
        <p>${m.snippet}</p>
      </div>
    `).join('');
  }
}
