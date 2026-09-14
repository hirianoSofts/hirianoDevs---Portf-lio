document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const form = document.getElementById("contactForm");
  const success = document.getElementById("success");
  const successClose = document.getElementById("successClose");
  const submitBtn = document.getElementById("submitBtn");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  setTimeout(() => intro?.classList.add("hide"), 1700);

  menuToggle?.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.innerHTML = open
      ? '<i class="ri-close-line"></i>'
      : '<i class="ri-menu-4-line"></i>';
  });

  navMenu?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      if (menuToggle) menuToggle.innerHTML = '<i class="ri-menu-4-line"></i>';
    });
  });

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitBtn.disabled = true;
    const original = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>A enviar...</span><i class="ri-loader-4-line ri-spin"></i>';

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      });

      if (!response.ok) throw new Error("Falha no envio");

      form.reset();
      success.classList.add("show");
      document.body.style.overflow = "hidden";
    } catch (error) {
      // Fallback: envia normalmente para o FormSubmit caso o fetch seja bloqueado.
      form.submit();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = original;
    }
  });

  const closeSuccess = () => {
    success.classList.remove("show");
    document.body.style.overflow = "";
  };

  successClose?.addEventListener("click", closeSuccess);

  success?.addEventListener("click", (event) => {
    if (event.target === success) closeSuccess();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSuccess();
  });
});
