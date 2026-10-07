(function () {
  const topBtn = document.getElementById('backTop');
  if (topBtn) {
    window.addEventListener('scroll', function () {
      topBtn.hidden = window.scrollY < 360;
    }, { passive: true });
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll('[data-animate]').forEach(function (el) {
      el.classList.add('in-view');
    });
  }

  const input = document.getElementById('mandalQuery') || document.getElementById('pageFind');
  if (input) {
    const blocks = document.querySelectorAll('.find-block');
    function applyFind() {
      const q = input.value.trim().toLowerCase();
      blocks.forEach(function (block) {
        if (!q) {
          block.classList.remove('is-hit', 'is-dim');
          return;
        }
        const keys = (block.getAttribute('data-keys') || '') + ' ' + block.textContent;
        const hit = keys.toLowerCase().indexOf(q) !== -1;
        block.classList.toggle('is-hit', hit);
        block.classList.toggle('is-dim', !hit);
      });
    }
    input.addEventListener('input', applyFind);
    input.addEventListener('change', applyFind);
    const form = document.getElementById('pageFindForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        applyFind();
        const first = document.querySelector('.find-block.is-hit');
        if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }

  const tocLinks = document.querySelectorAll('.page-toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    const sections = [];
    tocLinks.forEach(function (link) {
      const id = link.getAttribute('href');
      const sec = id ? document.querySelector(id) : null;
      if (sec) sections.push({ link: link, sec: sec });
    });
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tocLinks.forEach(function (a) { a.classList.remove('is-current'); });
        const match = sections.find(function (s) { return s.sec === entry.target; });
        if (match) match.link.classList.add('is-current');
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s.sec); });
  }
})();
