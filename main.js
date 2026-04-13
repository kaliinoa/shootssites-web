/* ─────────────────────────────────────────────
   ShootsSites — Shared Scripts
   ───────────────────────────────────────────── */

// ── SCROLL REVEAL ────────────────────────────
document.documentElement.classList.add('js-loaded');

const reveals  = document.querySelectorAll('.reveal');
const revealOb = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealOb.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(r => revealOb.observe(r));

// ── NAV SCROLL SHRINK ────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (!nav) return;
  nav.style.padding = window.scrollY > 60 ? '1rem 3rem' : '1.5rem 3rem';
});

// ── MOBILE NAV TOGGLE ────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── ACTIVE NAV LINK ──────────────────────────
(function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ── FAQ ACCORDION ────────────────────────────
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // close all
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── PORTFOLIO FILTER ─────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.portfolio-card').forEach(card => {
      if (filter === 'all' || card.dataset.trade === filter) {
        delete card.dataset.hidden;
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
