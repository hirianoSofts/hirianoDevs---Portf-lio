const header = document.querySelector('.site-header');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const glow = document.querySelector('.cursor-glow');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 25);
});

menuBtn?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.innerHTML = open
    ? '<i class="ri-close-line"></i>'
    : '<i class="ri-menu-4-line"></i>';
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
    if (menuBtn) menuBtn.innerHTML = '<i class="ri-menu-4-line"></i>';
  });
});

document.addEventListener('mousemove', e => {
  if (glow) {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
