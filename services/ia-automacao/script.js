document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const intro = document.getElementById("siteIntro");
  const introPercent = document.getElementById("introPercent");
  const introLine = document.querySelector(".intro-line span");

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 25);
  }, {passive:true});

  menuBtn?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.innerHTML = open
      ? '<i class="ri-close-line"></i>'
      : '<i class="ri-menu-4-line"></i>';
  });

  navLinks?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn?.setAttribute("aria-expanded", "false");
      if (menuBtn) menuBtn.innerHTML = '<i class="ri-menu-4-line"></i>';
    });
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold:.12});

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  let progress = 0;
  const progressTimer = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressTimer);

      setTimeout(() => {
        intro?.classList.add("done");
        document.body.classList.add("loaded");
      }, 250);
    }
    if (introPercent) introPercent.textContent = `${progress}%`;
    if (introLine) introLine.style.width = `${progress}%`;
  }, 70);

  const cursor = document.querySelector(".cursor-glow");
  if (cursor && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }, {passive:true});
  }
});
