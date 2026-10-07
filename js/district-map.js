/* District map viewer: fullscreen modal with zoom, pan, pinch and keyboard close. */
(function () {
  const modal = document.getElementById('mapModal');
  const viewport = document.getElementById('mapViewport');
  const stage = document.getElementById('mapStage');
  const openBtn = document.getElementById('openMapViewer');
  if (!modal || !viewport || !stage || !openBtn) return;

  const MIN_SCALE = 1;
  const MAX_SCALE = 6;
  const STEP = 0.28;

  let scale = 1;
  let x = 0;
  let y = 0;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let pointers = new Map();
  let pinchStartDist = 0;
  let pinchStartScale = 1;
  let lastFocus = null;

  function apply() {
    stage.style.transform = 'translate(' + x + 'px, ' + y + 'px) scale(' + scale + ')';
  }

  function clampPan() {
    const rect = viewport.getBoundingClientRect();
    const w = stage.naturalWidth || stage.offsetWidth;
    const h = stage.naturalHeight || stage.offsetHeight;
    const fit = Math.min(rect.width / w, rect.height / h);
    const drawnW = w * fit * scale;
    const drawnH = h * fit * scale;
    const maxX = Math.max(0, (drawnW - rect.width) / 2 + 40);
    const maxY = Math.max(0, (drawnH - rect.height) / 2 + 40);
    x = Math.min(maxX, Math.max(-maxX, x));
    y = Math.min(maxY, Math.max(-maxY, y));
  }

  function setScale(next, cx, cy) {
    const prev = scale;
    scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
    if (cx != null && cy != null && prev !== scale) {
      const rect = viewport.getBoundingClientRect();
      const px = cx - rect.left - rect.width / 2;
      const py = cy - rect.top - rect.height / 2;
      const ratio = scale / prev;
      x = px - (px - x) * ratio;
      y = py - (py - y) * ratio;
    }
    if (scale === MIN_SCALE) {
      x = 0;
      y = 0;
    }
    clampPan();
    apply();
  }

  function resetView() {
    scale = 1;
    x = 0;
    y = 0;
    apply();
  }

  function openModal() {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('map-modal-open');
    resetView();
    document.getElementById('mapClose').focus();
  }

  function closeModal() {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(function () {});
    }
    modal.hidden = true;
    document.body.classList.remove('map-modal-open');
    dragging = false;
    pointers.clear();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      modal.requestFullscreen().catch(function () {});
    } else {
      document.exitFullscreen().catch(function () {});
    }
  }

  openBtn.addEventListener('click', openModal);
  document.getElementById('mapClose').addEventListener('click', closeModal);
  document.getElementById('mapZoomIn').addEventListener('click', function () {
    setScale(scale + STEP);
  });
  document.getElementById('mapZoomOut').addEventListener('click', function () {
    setScale(scale - STEP);
  });
  document.getElementById('mapReset').addEventListener('click', resetView);
  document.getElementById('mapFullscreen').addEventListener('click', toggleFullscreen);

  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
    }
    if (e.key === '+' || e.key === '=') setScale(scale + STEP);
    if (e.key === '-') setScale(scale - STEP);
  });

  viewport.addEventListener('wheel', function (e) {
    if (modal.hidden) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? -STEP : STEP;
    setScale(scale + delta, e.clientX, e.clientY);
  }, { passive: false });

  viewport.addEventListener('pointerdown', function (e) {
    if (e.target.closest && e.target.closest('button')) return;
    viewport.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1) {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    } else if (pointers.size === 2) {
      dragging = false;
      const pts = Array.from(pointers.values());
      pinchStartDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      pinchStartScale = scale;
    }
  });

  viewport.addEventListener('pointermove', function (e) {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      const pts = Array.from(pointers.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      if (pinchStartDist > 0) {
        const midX = (pts[0].x + pts[1].x) / 2;
        const midY = (pts[0].y + pts[1].y) / 2;
        setScale(pinchStartScale * (dist / pinchStartDist), midX, midY);
      }
      return;
    }
    if (!dragging) return;
    x += e.clientX - lastX;
    y += e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    clampPan();
    apply();
  });

  function endPointer(e) {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) {
      pinchStartDist = 0;
    }
    if (pointers.size === 0) dragging = false;
  }

  viewport.addEventListener('pointerup', endPointer);
  viewport.addEventListener('pointercancel', endPointer);
  viewport.addEventListener('pointerleave', function (e) {
    if (dragging) endPointer(e);
  });

  window.addEventListener('resize', function () {
    if (!modal.hidden) {
      clampPan();
      apply();
    }
  });
})();
