/* ══════════════════════════════════════════════════════════════
   LINTEL NY v3 FINAL — JavaScript
   ══════════════════════════════════════════════════════════════ */

const BASE = (() => {
  const p = window.location.pathname;
  if (p.includes('/services/') || p.includes('/locations/') || p.includes('/blog/')) return '../';
  return '';
})();

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initCounters();
  initFAQ();
  initContactSuccess();
  initCalculator();
  loadBlogPreviews();
  loadBlogListing();
  loadBlogPost();
  loadGallery();
  loadReviews();
});

/* ── Nav ────────────────────────────────────────────────────── */
function initNav() {
  const nav = document.querySelector('.nav');
  const btn = document.querySelector('.nav__hamburger');
  const links = document.querySelector('.nav__links');
  if (!nav) return;
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));
  if (btn && links) {
    btn.addEventListener('click', () => { btn.classList.toggle('active'); links.classList.toggle('open'); });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { btn.classList.remove('active'); links.classList.remove('open'); }));
    document.addEventListener('click', e => { if (!nav.contains(e.target)) { btn.classList.remove('active'); links.classList.remove('open'); } });
  }
}

/* ── Scroll Reveal ──────────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.15 });
  els.forEach(el => obs.observe(el));
}

/* ── Counter Animation ──────────────────────────────────────── */
function initCounters() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        let current = 0;
        const step = target / 40;
        const interval = setInterval(() => {
          current += step;
          if (current >= target) { el.textContent = prefix + target + suffix; clearInterval(interval); }
          else el.textContent = prefix + Math.floor(current) + suffix;
        }, 37);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  els.forEach(c => obs.observe(c));
}

/* ── FAQ ────────────────────────────────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const answer = item.querySelector('.faq-a');
      const inner = answer.querySelector('.faq-a__inner');
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('active'); i.querySelector('.faq-a').style.maxHeight = '0'; });
      if (!wasActive) { item.classList.add('active'); answer.style.maxHeight = inner.scrollHeight + 'px'; }
    });
  });
}

/* ── Contact Success ────────────────────────────────────────── */
function initContactSuccess() {
  if (window.location.search.includes('success=true')) {
    const b = document.getElementById('success-banner');
    const f = document.getElementById('contact-form');
    if (b) b.style.display = 'block';
    if (f) f.style.display = 'none';
    window.scrollTo(0, 0);
  }
}

/* ── Calculator ─────────────────────────────────────────────── */
function initCalculator() {
  const form = document.getElementById('calc-form');
  if (!form) return;
  const data = {
    bathroom:   { standard: [200,300], midrange: [350,500], premium: [550,900] },
    kitchen:    { standard: [150,250], midrange: [280,450], premium: [500,750] },
    coop:       { standard: [180,280], midrange: [300,480], premium: [500,800] },
    brownstone: { standard: [120,200], midrange: [220,380], premium: [400,650] },
    electrical: { standard: [3500,8000], midrange: [8000,20000], premium: [20000,45000] },
    roofing:    { standard: [6000,12000], midrange: [12000,20000], premium: [20000,28000] }
  };
  const flat = ['electrical','roofing'];
  function calc() {
    const svc = document.getElementById('calc-service').value;
    const sqft = parseInt(document.getElementById('calc-sqft').value) || 100;
    const fin = document.getElementById('calc-finish').value;
    const el = document.getElementById('calc-result-value');
    if (!data[svc] || !data[svc][fin]) return;
    const r = data[svc][fin];
    const lo = flat.includes(svc) ? r[0] : r[0] * sqft;
    const hi = flat.includes(svc) ? r[1] : r[1] * sqft;
    el.innerHTML = '$' + lo.toLocaleString() + ' <span>&ndash;</span> $' + hi.toLocaleString();
  }
  ['calc-service','calc-sqft','calc-finish','calc-location'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.addEventListener('change', calc); el.addEventListener('input', calc); }
  });
  const svcEl = document.getElementById('calc-service');
  const sqftGrp = document.getElementById('calc-sqft-group');
  if (svcEl && sqftGrp) svcEl.addEventListener('change', () => { sqftGrp.style.display = flat.includes(svcEl.value) ? 'none' : 'block'; calc(); });
  calc();
}

/* ── Blog Previews (Homepage) ───────────────────────────────── */
async function loadBlogPreviews() {
  const c = document.getElementById('blog-previews');
  if (!c) return;
  try {
    const res = await fetch(BASE + '_data/blog/_manifest.json');
    if (!res.ok) return;
    const m = await res.json();
    const posts = [];
    for (const f of m.files.slice(0, 3)) {
      try { const r = await fetch(BASE + '_data/blog/' + f); if (r.ok) { const p = await r.json(); if (p.published !== false) posts.push(p); } } catch(e) {}
    }
    if (!posts.length) return;
    c.innerHTML = posts.map(p => `<a href="${BASE}blog/post.html?slug=${p.slug}" class="blog-card"><div class="blog-card__date">${p.date||''}</div><div class="blog-card__title">${p.title}</div><div class="blog-card__excerpt">${(p.excerpt||'').substring(0,140)}...</div><span class="btn-secondary" style="font-size:12px;">Read →</span></a>`).join('');
  } catch(e) {}
}

/* ── Blog Listing ───────────────────────────────────────────── */
async function loadBlogListing() {
  const c = document.getElementById('blog-listing');
  if (!c) return;
  try {
    const res = await fetch(BASE + '_data/blog/_manifest.json');
    if (!res.ok) { c.innerHTML = '<div class="empty"><div class="empty__title">Articles coming soon.</div></div>'; return; }
    const m = await res.json();
    const posts = [];
    for (const f of m.files) {
      try { const r = await fetch(BASE + '_data/blog/' + f); if (r.ok) { const p = await r.json(); if (p.published !== false) posts.push(p); } } catch(e) {}
    }
    posts.sort((a,b) => (b.date||'').localeCompare(a.date||''));
    if (!posts.length) { c.innerHTML = '<div class="empty"><div class="empty__title">Articles coming soon.</div></div>'; return; }
    c.innerHTML = '<div class="blog-grid">' + posts.map(p => `<a href="${BASE}blog/post.html?slug=${p.slug}" class="blog-card"><div class="blog-card__date">${p.date||''}</div><div class="blog-card__title">${p.title}</div><div class="blog-card__excerpt">${(p.excerpt||'').substring(0,160)}</div><span class="btn-secondary" style="font-size:12px;">Read →</span></a>`).join('') + '</div>';
  } catch(e) { c.innerHTML = '<div class="empty"><div class="empty__title">Articles coming soon.</div></div>'; }
}

/* ── Blog Post ──────────────────────────────────────────────── */
async function loadBlogPost() {
  const c = document.getElementById('blog-post-content');
  if (!c) return;
  const slug = new URLSearchParams(window.location.search).get('slug');
  if (!slug) { c.innerHTML = '<p>Post not found.</p>'; return; }
  try {
    const res = await fetch(BASE + '_data/blog/' + slug + '.json');
    if (!res.ok) { c.innerHTML = '<p>Post not found.</p>'; return; }
    const post = await res.json();
    document.title = (post.meta_title || post.title) + ' | Lintel NY';
    const md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', post.meta_description || post.excerpt || '');
    let body = post.body || '';
    if (!body.includes('<p>') && !body.includes('<h2>')) {
      body = body.replace(/^### (.+)$/gm,'<h3>$1</h3>').replace(/^## (.+)$/gm,'<h2>$1</h2>').replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\n\n/g,'</p><p>');
      body = '<p>' + body + '</p>';
      body = body.replace(/<p><h/g,'<h').replace(/<\/h([23])><\/p>/g,'</h$1>');
    }
    c.innerHTML = `<div class="page-hero"><div class="grid-bg"></div><div class="page-hero__inner"><div class="page-hero__crumb"><a href="${BASE}index.html">Home</a><span>→</span><a href="${BASE}blog.html">Journal</a><span>→</span>${post.title}</div><p class="label" style="margin-top:16px">${post.date||''}</p><h1>${post.title}</h1></div></div><div class="section"><div class="container"><div class="post-body">${body}</div><div class="post-body mt-lg text-center"><p class="text-gray" style="margin-bottom:24px;">Ready to start your renovation?</p><a href="${BASE}contact.html" class="btn btn-primary">Get Free Estimate</a></div></div></div>`;
  } catch(e) { c.innerHTML = '<div class="section"><div class="container"><p>Unable to load post.</p></div></div>'; }
}

/* ── Gallery ────────────────────────────────────────────────── */
async function loadGallery() {
  const c = document.getElementById('gallery-grid');
  if (!c) return;
  try {
    const res = await fetch(BASE + '_data/projects/_manifest.json');
    if (!res.ok) { showEmpty(c); return; }
    const m = await res.json();
    const projects = [];
    for (const f of m.files) {
      try { const r = await fetch(BASE + '_data/projects/' + f); if (r.ok) { const p = await r.json(); if (p.published !== false) projects.push(p); } } catch(e) {}
    }
    if (!projects.length) { showEmpty(c); return; }
    const filtersEl = document.getElementById('gallery-filters');
    const services = [...new Set(projects.map(p => p.service))];
    if (filtersEl) {
      filtersEl.innerHTML = '<button class="gallery-filter active" data-filter="all">All</button>' + services.map(s => `<button class="gallery-filter" data-filter="${s}">${s}</button>`).join('');
      filtersEl.addEventListener('click', e => { if (!e.target.classList.contains('gallery-filter')) return; filtersEl.querySelectorAll('.gallery-filter').forEach(f => f.classList.remove('active')); e.target.classList.add('active'); render(projects, e.target.dataset.filter); });
    }
    render(projects, 'all');
    function render(p, filter) {
      const f = filter === 'all' ? p : p.filter(x => x.service === filter);
      c.innerHTML = f.map(x => `<div class="gallery-card">${x.cover ? `<img src="${x.cover}" alt="${x.title}" loading="lazy">` : ''}<div class="gallery-card__overlay"><div class="gallery-card__title">${x.title}</div><div class="gallery-card__loc">${x.location} · ${x.service}</div></div></div>`).join('');
    }
  } catch(e) { showEmpty(c); }
  function showEmpty(el) { el.innerHTML = `<div class="empty"><div class="empty__title">Projects coming soon.</div><p>Contact us to discuss yours.</p><a href="${BASE}contact.html" class="btn btn-primary mt-md">Get in Touch</a></div>`; }
}

/* ── Reviews ────────────────────────────────────────────────── */
async function loadReviews() {
  const c = document.getElementById('reviews-section');
  if (!c) return;
  try {
    const res = await fetch(BASE + '_data/reviews/_manifest.json');
    if (!res.ok) return;
    const m = await res.json();
    const reviews = [];
    for (const f of m.files) {
      try { const r = await fetch(BASE + '_data/reviews/' + f); if (r.ok) { const rv = await r.json(); if (rv.published !== false) reviews.push(rv); } } catch(e) {}
    }
    if (!reviews.length) return;
    c.style.display = 'block';
    const g = c.querySelector('#reviews-grid');
    if (!g) return;
    g.innerHTML = reviews.map(r => `<div class="blog-card"><div class="blog-card__date">${'★'.repeat(r.rating||5)}</div><div class="blog-card__title">${r.name}</div><div class="blog-card__excerpt">"${r.body}"</div><div style="font-size:13px;color:var(--gray);margin-top:8px">${r.project} · ${r.location}</div></div>`).join('');
  } catch(e) {}
}
