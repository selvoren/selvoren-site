// Mobile-Menü
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Gelegentlicher Glitch-Blip im Signal-Ticker
const glitchSpans = document.querySelectorAll('.status-strip .track span');
if (glitchSpans.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setInterval(() => {
    const el = glitchSpans[Math.floor(Math.random() * glitchSpans.length)];
    el.classList.add('glitch');
    setTimeout(() => el.classList.remove('glitch'), 200);
  }, 2600);
}

// Cursor-reaktiver Parallax-Effekt (Hero-Hintergrund und Arc-Hero-Bilder)
const parallaxEls = document.querySelectorAll('[data-parallax], .arc-hero .frame img');
if (parallaxEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(min-width: 720px)').matches) {
  window.addEventListener('mousemove', (e) => {
    const xRatio = (e.clientX / window.innerWidth) - 0.5;
    const yRatio = (e.clientY / window.innerHeight) - 0.5;
    parallaxEls.forEach(el => {
      const strength = el.hasAttribute('data-parallax') ? 18 : 10;
      el.style.transform = `translate(${xRatio * -strength}px, ${yRatio * -strength}px) scale(1.04)`;
    });
  }, { passive: true });
}

// Scroll-Reveal via IntersectionObserver
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));
