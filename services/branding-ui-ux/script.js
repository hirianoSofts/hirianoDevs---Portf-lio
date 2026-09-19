const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

  menuBtn.addEventListener("click", () => {

    const open = navLinks.classList.toggle("open");

    menuBtn.setAttribute(
      "aria-expanded",
      open ? "true" : "false"
    );

    menuBtn.innerHTML = open
      ? '<i class="ri-close-line"></i>'
      : '<i class="ri-menu-4-line"></i>';

  });

  navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("open");

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

      menuBtn.innerHTML =
        '<i class="ri-menu-4-line"></i>';

    });

  });

}


/* HEADER SCROLL */

const header = document.querySelector(".site-header");

function updateHeader(){

  if(!header) return;

  if(window.scrollY > 40){
    header.classList.add("scrolled");
  }else{
    header.classList.remove("scrolled");
  }

}

window.addEventListener("scroll", updateHeader, {
  passive:true
});

updateHeader();


/* REVEAL */

const revealElements =
  document.querySelectorAll(".reveal");

if("IntersectionObserver" in window){

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if(entry.isIntersecting){

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold:.12
    }
  );

  revealElements.forEach(element => {
    observer.observe(element);
  });

}else{

  revealElements.forEach(element => {
    element.classList.add("visible");
  });

}


/* CURSOR GLOW */

const cursorGlow =
  document.querySelector(".cursor-glow");

if(cursorGlow){

  window.addEventListener("mousemove", event => {

    cursorGlow.style.left =
      `${event.clientX}px`;

    cursorGlow.style.top =
      `${event.clientY}px`;

  });

}


/* SMOOTH INTERNAL LINKS */

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", event => {

    const targetId =
      link.getAttribute("href");

    if(!targetId || targetId === "#") return;

    const target =
      document.querySelector(targetId);

    if(!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior:"smooth",
      block:"start"
    });

  });

});
