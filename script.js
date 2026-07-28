document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) window.lucide.createIcons();

  const menuButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  const closeMenu = () => {
    mobileMenu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("menu-open");
    menuButton.innerHTML = '<i data-lucide="menu" aria-hidden="true"></i>';
    if (window.lucide) window.lucide.createIcons();
  };

  menuButton.addEventListener("click", () => {
    const opening = !mobileMenu.classList.contains("open");
    mobileMenu.classList.toggle("open", opening);
    menuButton.setAttribute("aria-expanded", String(opening));
    menuButton.setAttribute("aria-label", opening ? "Close menu" : "Open menu");
    document.body.classList.toggle("menu-open", opening);
    menuButton.innerHTML = opening
      ? '<i data-lucide="x" aria-hidden="true"></i>'
      : '<i data-lucide="menu" aria-hidden="true"></i>';
    if (window.lucide) window.lucide.createIcons();
  });

  mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -40px" });

  document.querySelectorAll(".reveal").forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
    observer.observe(element);
  });

  document.getElementById("year").textContent = new Date().getFullYear();
});
