// ── IMAGE DATA ──
  // Using picsum.photos for demo imagery (nature, urban, portrait, abstract palettes)
  const images = [
    { id:1,  src:'https://picsum.photos/seed/lumiere01/800/600',  title:'Morning Fog',       category:'nature',   w:800, h:600 },
    { id:2,  src:'https://picsum.photos/seed/lumiere02/600/800',  title:'City Silence',      category:'urban',    w:600, h:800 },
    { id:3,  src:'https://picsum.photos/seed/lumiere03/900/600',  title:'Golden Hour',       category:'nature',   w:900, h:600 },
    { id:4,  src:'https://picsum.photos/seed/lumiere04/700/700',  title:'Soft Light',        category:'portrait', w:700, h:700 },
    { id:5,  src:'https://picsum.photos/seed/lumiere05/800/550',  title:'Iron & Glass',      category:'urban',    w:800, h:550 },
    { id:6,  src:'https://picsum.photos/seed/lumiere06/600/900',  title:'Dissolution',       category:'abstract', w:600, h:900 },
    { id:7,  src:'https://picsum.photos/seed/lumiere07/850/600',  title:'Still Waters',      category:'nature',   w:850, h:600 },
    { id:8,  src:'https://picsum.photos/seed/lumiere08/700/500',  title:'Concrete Garden',   category:'urban',    w:700, h:500 },
    { id:9,  src:'https://picsum.photos/seed/lumiere09/600/800',  title:'Gaze',              category:'portrait', w:600, h:800 },
    { id:10, src:'https://picsum.photos/seed/lumiere10/750/500',  title:'Refraction',        category:'abstract', w:750, h:500 },
    { id:11, src:'https://picsum.photos/seed/lumiere11/800/600',  title:'Wild Bloom',        category:'nature',   w:800, h:600 },
    { id:12, src:'https://picsum.photos/seed/lumiere12/650/850',  title:'Neon Rain',         category:'urban',    w:650, h:850 },
    { id:13, src:'https://picsum.photos/seed/lumiere13/900/650',  title:'Drift',             category:'abstract', w:900, h:650 },
    { id:14, src:'https://picsum.photos/seed/lumiere14/600/750',  title:'Reverie',           category:'portrait', w:600, h:750 },
    { id:15, src:'https://picsum.photos/seed/lumiere15/800/500',  title:'Last Light',        category:'nature',   w:800, h:500 },
    { id:16, src:'https://picsum.photos/seed/lumiere16/700/700',  title:'Symmetry',          category:'urban',    w:700, h:700 },
    { id:17, src:'https://picsum.photos/seed/lumiere17/850/600',  title:'Fragment',          category:'abstract', w:850, h:600 },
    { id:18, src:'https://picsum.photos/seed/lumiere18/600/800',  title:'Presence',          category:'portrait', w:600, h:800 },
    { id:19, src:'https://picsum.photos/seed/lumiere19/900/600',  title:'Forest Floor',      category:'nature',   w:900, h:600 },
    { id:20, src:'https://picsum.photos/seed/lumiere20/700/500',  title:'Grid',              category:'urban',    w:700, h:500 },
    { id:21, src:'https://picsum.photos/seed/lumiere21/600/900',  title:'Cascade',           category:'nature',   w:600, h:900 },
    { id:22, src:'https://picsum.photos/seed/lumiere22/750/600',  title:'Haze',              category:'abstract', w:750, h:600 },
    { id:23, src:'https://picsum.photos/seed/lumiere23/800/550',  title:'Threshold',         category:'urban',    w:800, h:550 },
    { id:24, src:'https://picsum.photos/seed/lumiere24/600/800',  title:'Quiet',             category:'portrait', w:600, h:800 },
  ];

  // ── STATE ──
  let activeFilter = 'all';
  let activeFx = 'none';
  let currentIndex = 0;
  let visibleImages = [...images];

  // ── RENDER GRID ──
  const grid = document.getElementById('galleryGrid');

  function renderGrid() {
    visibleImages = activeFilter === 'all'
      ? [...images]
      : images.filter(img => img.category === activeFilter);

    document.getElementById('headerCount').textContent = `${visibleImages.length} FRAMES`;

    grid.innerHTML = '';
    visibleImages.forEach((img, i) => {
      const item = document.createElement('div');
      item.className = 'gallery-item' + (activeFx !== 'none' ? ` fx-${activeFx}` : '');
      item.style.animationDelay = `${i * 0.04}s`;
      item.innerHTML = `
        <img src="${img.src}" alt="${img.title}" loading="lazy">
        <div class="item-overlay">
          <div class="item-title">${img.title}</div>
          <div class="item-meta cat-${img.category}">${img.category.toUpperCase()}</div>
        </div>
        <div class="item-expand">⤢</div>
      `;
      item.addEventListener('click', () => openLightbox(i));
      grid.appendChild(item);
    });
  }

  // ── LIGHTBOX ──
  const lightbox = document.getElementById('lightbox');
  const lbMedia  = document.getElementById('lbMedia');
  const lbImg    = document.getElementById('lbImg');
  const lbTitle  = document.getElementById('lbTitle');
  const lbCounter = document.getElementById('lbCounter');

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const img = visibleImages[currentIndex];
    lbImg.src = img.src.replace('/800/600', '/1200/900');
    lbTitle.textContent = img.title;
    lbCounter.textContent = `${String(currentIndex+1).padStart(2,'0')} / ${String(visibleImages.length).padStart(2,'0')}`;
    lbMedia.className = 'lb-media animating' + (activeFx !== 'none' ? ` fx-${activeFx}` : '');
    setTimeout(() => lbMedia.classList.remove('animating'), 400);
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + visibleImages.length) % visibleImages.length;
    updateLightbox();
  }

  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbBackdrop').addEventListener('click', closeLightbox);
  document.getElementById('lbPrev').addEventListener('click', () => navigate(-1));
  document.getElementById('lbNext').addEventListener('click', () => navigate(1));

  // ── KEYBOARD ──
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowRight') navigate(1);
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'Escape')     closeLightbox();
  });

  // Touch swipe
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
  });

  // ── CATEGORY FILTERS ──
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderGrid();
    });
  });

  // ── FX FILTERS ──
  document.querySelectorAll('.fx-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.fx-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFx = btn.dataset.fx;
      // Apply to grid items
      document.querySelectorAll('.gallery-item').forEach(item => {
        item.className = item.className.replace(/fx-\w+/g, '').trim();
        if (activeFx !== 'none') item.classList.add(`fx-${activeFx}`);
      });
      // Apply to open lightbox
      if (lightbox.classList.contains('open')) {
        lbMedia.className = 'lb-media' + (activeFx !== 'none' ? ` fx-${activeFx}` : '');
      }
    });
  });

  // ── INIT ──
  renderGrid();