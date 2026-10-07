/* ==========================================================================
   ITDA PADERU - MAIN ENTRY SCRIPT (js/main.js)
   Initializes components, accordions, demo forms, and site listeners
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render Common Header/Navbar & Footer
  if (typeof renderNavbar === 'function') renderNavbar();
  if (typeof renderFooter === 'function') renderFooter();

  // 2. Setup Accordion Click Event Listeners
  initAccordions();

  // 3. Setup Grievance Demo Form Handler
  initGrievanceForm();

  // 4. Setup Initiatives Realtime Carousel Slider
  initInitiativesCarousel();

  // 5. Initialize Chatbot DOM after slight delay for smooth page load
  setTimeout(() => {
    if (typeof injectChatbotDOM === 'function') injectChatbotDOM();
  }, 300);
});

/**
 * Initializes FAQ Accordion items
 */
function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('active');

      // Close all accordions in current list
      const allItems = item.parentElement.querySelectorAll('.accordion-item');
      allItems.forEach(i => i.classList.remove('active'));

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * Initializes Grievance Demo Form submission warning
 */
function initGrievanceForm() {
  const form = document.getElementById('grievanceDemoForm');
  const alertBox = document.getElementById('grievanceFormAlert');
  if (!form || !alertBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const L = getLang();
    alertBox.style.display = 'block';
    alertBox.innerHTML = `
      <div class="info-note" style="border-left-color: #d9534f; background-color: #fdf7f7; color: #a94442;">
        <strong>⚠️ ${L === 'en' ? 'Demo Form Notice' : 'డెమో ఫారమ్ గమనిక'}:</strong> 
        ${L === 'en' 
          ? 'Demo form only — backend integration required for actual submission to ITDA Paderu.' 
          : 'ఇది డెమో ఫారమ్ మాత్రమే — అసలు ఫిర్యాదు నమోదుకు ప్రభుత్వం బ్యాకెండ్ ఇంటిగ్రేషన్ అవసరం.'}
      </div>
    `;
    form.reset();
  });
}

/**
 * Initializes Realtime Initiatives Carousel Slider
 */
function initInitiativesCarousel() {
  const track = document.getElementById('initiativesTrack');
  const prevBtn = document.getElementById('initPrevBtn');
  const nextBtn = document.getElementById('initNextBtn');
  const dotsContainer = document.getElementById('initiativesDots');

  if (!track) return;

  const items = track.children;
  let currentIndex = 0;
  let autoTimer = null;
  let isHovered = false;

  function getItemsPerPage() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
  }

  function getMaxIndex() {
    return Math.max(0, items.length - getItemsPerPage());
  }

  function updateCarouselPosition() {
    const itemWidth = items[0] ? items[0].getBoundingClientRect().width + 20 : 300;
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    updateDots();
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const totalDots = getMaxIndex() + 1;
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = `carousel-dot-btn ${i === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Slide page ${i + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateCarouselPosition();
        resetTimer();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
      if (dots[i]) dots[i].classList.toggle('active', i === currentIndex);
    }
  }

  function nextSlide() {
    const maxIdx = getMaxIndex();
    if (currentIndex >= maxIdx) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateCarouselPosition();
  }

  function prevSlide() {
    const maxIdx = getMaxIndex();
    if (currentIndex <= 0) {
      currentIndex = maxIdx;
    } else {
      currentIndex--;
    }
    updateCarouselPosition();
  }

  function startTimer() {
    stopTimer();
    autoTimer = setInterval(() => {
      if (!isHovered) nextSlide();
    }, 4000);
  }

  function stopTimer() {
    if (autoTimer) clearInterval(autoTimer);
  }

  function resetTimer() {
    startTimer();
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

  const container = document.getElementById('initiativesTrackContainer');
  if (container) {
    container.addEventListener('mouseenter', () => { isHovered = true; });
    container.addEventListener('mouseleave', () => { isHovered = false; });

    let touchStartX = 0;
    container.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    container.addEventListener('touchend', (e) => {
      const diffX = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) nextSlide();
        else prevSlide();
        resetTimer();
      }
    }, { passive: true });
  }

  window.addEventListener('resize', () => {
    renderDots();
    if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
    updateCarouselPosition();
  });

  renderDots();
  updateCarouselPosition();
  startTimer();
}
