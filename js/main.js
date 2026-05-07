// TechPro.tg — main.js

/* ── NAV MOBILE ── */
function initNav() {
  const btn = document.getElementById('navMobileBtn');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    links.classList.toggle('open');
    btn.innerHTML = links.classList.contains('open')
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
  });
  // Close on link click
  links.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => links.classList.remove('open'));
  });
}

/* ── ACTIVE NAV LINK ── */
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(l => {
    const href = l.getAttribute('href') || '';
    l.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
  });
}

/* ── MODAL ── */
const modal = {
  overlay: null,
  init() {
    this.overlay = document.getElementById('productModal');
    if (!this.overlay) return;
    this.overlay.addEventListener('click', e => {
      if (e.target === this.overlay) this.close();
    });
    document.getElementById('modalClose')?.addEventListener('click', () => this.close());
    document.addEventListener('keydown', e => { if (e.key === 'Escape') this.close(); });
  },
  open(product) {
    if (!this.overlay) return;
    const cat = CATEGORIES.find(c => c.id === product.category);
    document.getElementById('modalImg').src   = product.img;
    document.getElementById('modalImg').alt   = product.name;
    document.getElementById('modalCat').textContent   = cat?.label || '';
    document.getElementById('modalName').textContent  = product.name;
    document.getElementById('modalDesc').textContent  = product.desc;
    document.getElementById('modalPrice').textContent = formatPrice(product.price);
    const specsList = document.getElementById('modalSpecs');
    specsList.innerHTML = (product.specs || []).map(s => `<div class="spec-item">${s}</div>`).join('');
    document.getElementById('modalContactBtn').onclick = () => {
      this.close();
      window.location.href = `contact.html?product=${encodeURIComponent(product.name)}`;
    };
    this.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  },
  close() {
    this.overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }
};

/* ── TOAST ── */
function showToast(msg, color = 'var(--green)') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    t.innerHTML = `<div class="toast-dot"></div><span id="toastMsg"></span>`;
    document.body.appendChild(t);
  }
  t.querySelector('.toast-dot').style.background = color;
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(t._to);
  t._to = setTimeout(() => t.classList.remove('show'), 3000);
}

/* ── RENDER PRODUCT CARD ── */
function renderCard(p, mini = false) {
  const cat = CATEGORIES.find(c => c.id === p.category);
  const badgeHtml = p.badge
    ? `<span class="product-badge badge-${p.badgeColor || 'accent'}">${p.badge}</span>` : '';
  if (mini) {
    return `
    <div class="featured-mini product-card">
      <div class="product-img">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        ${badgeHtml}
      </div>
      <div class="product-body">
        <div class="product-cat">${cat?.label || ''}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-price">${formatPrice(p.price)}</div>
        <div class="product-footer">
          <button class="btn btn-primary btn-sm" onclick="modal.open(PRODUCTS.find(x=>x.id==${p.id}))">Voir détails</button>
        </div>
      </div>
    </div>`;
  }
  return `
  <div class="product-card">
    <div class="product-img">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      ${badgeHtml}
    </div>
    <div class="product-body">
      <div class="product-cat">${cat?.label || ''}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-desc">${p.desc}</div>
      <div class="product-price">${formatPrice(p.price)}</div>
      <div class="product-footer">
        <button class="btn btn-outline btn-sm" onclick="modal.open(PRODUCTS.find(x=>x.id==${p.id}))">Voir détails</button>
        <button class="btn btn-primary btn-sm" onclick="window.location.href='contact.html?product=${encodeURIComponent(p.name)}'">Demander un devis</button>
      </div>
    </div>
  </div>`;
}

/* ── CONTACT PREFILL ── */
function prefillContact() {
  const params = new URLSearchParams(location.search);
  const product = params.get('product');
  if (product) {
    const subjectField = document.getElementById('subject');
    const msgField = document.getElementById('message');
    if (subjectField) subjectField.value = `Demande de devis — ${product}`;
    if (msgField) msgField.value = `Bonjour,\n\nJe souhaite obtenir un devis pour : ${product}\n\nCordialement,`;
  }
}

/* ── CONTACT FORM ── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    btn.textContent = 'Envoi…'; btn.disabled = true;
    setTimeout(() => {
      showToast('Message envoyé avec succès !');
      form.reset();
      btn.textContent = 'Envoyer le message'; btn.disabled = false;
    }, 1000);
  });
  prefillContact();
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  setActiveNav();
  modal.init();
  initContactForm();
});
