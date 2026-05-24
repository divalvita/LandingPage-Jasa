// ── LOADER ──
window.addEventListener('load', () => {
  const fill = document.getElementById('loaderFill');
  const loader = document.getElementById('loader');
  let w = 0;
  const iv = setInterval(() => {
    w += Math.random() * 30;
    if (w >= 100) {
      w = 100;
      clearInterval(iv);
      setTimeout(() => loader.classList.add('hidden'), 300);
    }
    fill.style.width = w + '%';
  }, 120);
});

// ── CUSTOM CURSOR ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let rx = 0, ry = 0, mx = 0, my = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a, button, .service-card, .slider-btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    ring.style.width = '56px';
    ring.style.height = '56px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    ring.style.width = '34px';
    ring.style.height = '34px';
  });
});

// ── NAVBAR SCROLL ──
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ── SCROLL REVEAL ──
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ── COUNTER ANIMATION ──
function animateCounter(el, target, duration = 1800) {
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
    el.textContent = Math.floor(ease * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target, parseInt(e.target.dataset.target));
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObs.observe(el));

// ── TESTIMONIALS SLIDER ──
let currentSlide = 0;
const track = document.getElementById('testiTrack');
const cards = track.querySelectorAll('.testi-card');
const visibleCards = 3;
const maxSlide = cards.length - visibleCards;

function slideTestimonials(dir) {
  currentSlide = Math.max(0, Math.min(maxSlide, currentSlide + dir));
  const cardW = cards[0].offsetWidth + 20;
  track.style.transform = `translateX(-${currentSlide * cardW}px)`;
}

// Auto-slide
setInterval(() => {
  slideTestimonials(currentSlide >= maxSlide ? -maxSlide : 1);
}, 4000);

// ── BOOKING HANDLER ──
function handleBooking() {
  const btn = document.querySelector('.btn-submit');
  btn.textContent = '✓ Pesanan Diterima! Kami akan menghubungi Anda segera.';
  btn.style.background = 'var(--sage-pale)';
  btn.style.color = 'var(--forest)';
  setTimeout(() => {
    btn.textContent = 'Pesan Sekarang — Gratis Konsultasi 🎉';
    btn.style.background = '#fff';
    btn.style.color = 'var(--forest)';
  }, 4000);
}

// ── SMOOTH PARALLAX HERO ──
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  document.querySelectorAll('.hero-bg-orb').forEach((o, i) => {
    o.style.transform = `translateY(${y * (i === 0 ? 0.1 : -0.08)}px)`;
  });
});