/* =========================================================
   HIRIANOLABS — INTRO
   ========================================================= */

document.body.classList.add('intro-active');

const siteIntro = document.querySelector('#siteIntro');
const introPercent = document.querySelector('#introPercent');
const introBar = document.querySelector('.intro-line span');

let progress = 0;

const introTimer = setInterval(() => {

  progress += Math.floor(Math.random() * 8) + 4;

  if(progress >= 100){
    progress = 100;
  }

  if(introPercent){
    introPercent.textContent = progress + '%';
  }

  if(introBar){
    introBar.style.width = progress + '%';
  }

  if(progress >= 100){

    clearInterval(introTimer);

    setTimeout(() => {

      siteIntro.classList.add('hide');

      document.body.classList.remove('intro-active');
      document.body.classList.add('intro-ready');

      setTimeout(() => {
        siteIntro.remove();
      }, 1000);

    }, 350);
  }

}, 80);


/* =========================================================
   HEADER
   ========================================================= */

const header = document.querySelector('.site-header');
const menuBtn = document.querySelector('#menuBtn');
const navLinks = document.querySelector('#navLinks');
const glow = document.querySelector('.cursor-glow');

window.addEventListener('scroll', () => {

  header.classList.toggle(
    'scrolled',
    window.scrollY > 25
  );

  const sections = [
    ...document.querySelectorAll('main section[id]')
  ];

  const pos = window.scrollY + 180;

  let current = 'inicio';

  sections.forEach(section => {

    if(pos >= section.offsetTop){
      current = section.id;
    }

  });

  document.querySelectorAll('.nav-links a').forEach(a => {

    a.classList.toggle(
      'active',
      a.getAttribute('href') === '#' + current
    );

  });

});


/* =========================================================
   MOBILE MENU
   ========================================================= */

menuBtn.addEventListener('click', () => {

  const open = navLinks.classList.toggle('open');

  menuBtn.setAttribute(
    'aria-expanded',
    open
  );

  menuBtn.innerHTML = open
    ? '<i class="ri-close-line"></i>'
    : '<i class="ri-menu-4-line"></i>';

});


navLinks.querySelectorAll('a').forEach(a => {

  a.addEventListener('click', () => {

    navLinks.classList.remove('open');

    menuBtn.setAttribute(
      'aria-expanded',
      'false'
    );

    menuBtn.innerHTML =
      '<i class="ri-menu-4-line"></i>';

  });

});


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if(entry.isIntersecting){

        entry.target.classList.add('visible');

        observer.unobserve(entry.target);

      }

    });

  },
  {
    threshold:.12
  }
);


document
  .querySelectorAll('.reveal')
  .forEach(el => observer.observe(el));


/* =========================================================
   CURSOR GLOW
   ========================================================= */

window.addEventListener('pointermove', e => {

  if(glow){

    glow.style.left =
      e.clientX + 'px';

    glow.style.top =
      e.clientY + 'px';

  }

});
