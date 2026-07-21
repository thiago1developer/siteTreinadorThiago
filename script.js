const WHATSAPP_NUMBER = "5562992118162";

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const active = menuToggle.classList.toggle("active");

    nav.classList.toggle("active");
    document.body.classList.toggle("menu-open", active);

    menuToggle.setAttribute(
      "aria-expanded",
      active ? "true" : "false"
    );
  });
}

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    if (!menuToggle || !nav) return;

    menuToggle.classList.remove("active");
    nav.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
  });
});

/* =========================================================
   LINKS DO WHATSAPP
========================================================= */

document.querySelectorAll(".whatsapp-link").forEach((link) => {
  const message =
    link.dataset.message || "Olá! Vim pelo site.";

  link.href =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  link.rel = "noopener noreferrer";
});

/* =========================================================
   ANIMAÇÕES AO ROLAR A PÁGINA
========================================================= */

const revealElements =
  document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

/* =========================================================
   CONTADORES
========================================================= */

const counters =
  document.querySelectorAll(".counter");

let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;

  countersStarted = true;

  counters.forEach((counter) => {
    const target =
      Number(counter.dataset.target) || 0;

    const duration = 1200;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;

      const progress = Math.min(
        elapsed / duration,
        1
      );

      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      const value = Math.floor(
        easedProgress * target
      );

      counter.textContent = value;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

const stats = document.querySelector(".stats");

if (stats && "IntersectionObserver" in window) {
  const counterObserver =
    new IntersectionObserver(
      (entries, observer) => {
        const firstEntry = entries[0];

        if (!firstEntry?.isIntersecting) return;

        animateCounters();
        observer.disconnect();
      },
      {
        threshold: 0.35
      }
    );

  counterObserver.observe(stats);
} else if (stats) {
  animateCounters();
}

/* =========================================================
   DEPOIMENTOS
========================================================= */

const testimonials = [
  ...document.querySelectorAll(".testimonial")
];

const dotsContainer =
  document.querySelector(".slider-dots");

const prevButton =
  document.querySelector(".slider-btn.prev");

const nextButton =
  document.querySelector(".slider-btn.next");

let currentTestimonial = 0;
let testimonialInterval = null;

if (dotsContainer && testimonials.length) {
  testimonials.forEach((_, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className =
      `slider-dot ${index === 0 ? "active" : ""}`;

    dot.setAttribute(
      "aria-label",
      `Ir para depoimento ${index + 1}`
    );

    dot.addEventListener("click", () => {
      showTestimonial(index);
    });

    dotsContainer.appendChild(dot);
  });
}

const dots = [
  ...document.querySelectorAll(".slider-dot")
];

function showTestimonial(index) {
  if (!testimonials.length || !dots.length) return;

  testimonials[currentTestimonial]
    ?.classList.remove("active");

  dots[currentTestimonial]
    ?.classList.remove("active");

  currentTestimonial =
    (index + testimonials.length) %
    testimonials.length;

  testimonials[currentTestimonial]
    ?.classList.add("active");

  dots[currentTestimonial]
    ?.classList.add("active");

  restartAutoSlide();
}

function restartAutoSlide() {
  if (!testimonials.length) return;

  clearInterval(testimonialInterval);

  testimonialInterval = setInterval(() => {
    showTestimonial(
      currentTestimonial + 1
    );
  }, 5500);
}

if (
  prevButton &&
  nextButton &&
  testimonials.length
) {
  prevButton.addEventListener("click", () => {
    showTestimonial(
      currentTestimonial - 1
    );
  });

  nextButton.addEventListener("click", () => {
    showTestimonial(
      currentTestimonial + 1
    );
  });

  restartAutoSlide();
}

/* =========================================================
   FAQ
========================================================= */

const faqItems =
  document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button =
    item.querySelector(".faq-question");

  const answer =
    item.querySelector(".faq-answer");

  if (!button || !answer) return;

  button.setAttribute(
    "aria-expanded",
    "false"
  );

  button.addEventListener("click", () => {
    const isOpen =
      item.classList.contains("open");

    faqItems.forEach((otherItem) => {
      const otherButton =
        otherItem.querySelector(".faq-question");

      const otherAnswer =
        otherItem.querySelector(".faq-answer");

      otherItem.classList.remove("open");

      otherButton?.setAttribute(
        "aria-expanded",
        "false"
      );

      if (otherAnswer) {
        otherAnswer.style.maxHeight = null;
      }
    });

    if (!isOpen) {
      item.classList.add("open");

      button.setAttribute(
        "aria-expanded",
        "true"
      );

      answer.style.maxHeight =
        `${answer.scrollHeight}px`;
    }
  });
});

/* =========================================================
   ANO AUTOMÁTICO NO RODAPÉ
========================================================= */

const yearElement =
  document.getElementById("year");

if (yearElement) {
  yearElement.textContent =
    new Date().getFullYear();
}

/* =========================================================
   AJUSTES DO MENU MOBILE
========================================================= */

window.addEventListener("resize", () => {
  if (
    window.innerWidth > 980 &&
    menuToggle &&
    nav
  ) {
    menuToggle.classList.remove("active");
    nav.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );
  }

  document
    .querySelectorAll(".faq-item.open .faq-answer")
    .forEach((answer) => {
      answer.style.maxHeight =
        `${answer.scrollHeight}px`;
    });
});

document.addEventListener(
  "keydown",
  (event) => {
    if (
      event.key === "Escape" &&
      nav?.classList.contains("active")
    ) {
      menuToggle?.classList.remove("active");
      nav.classList.remove("active");

      document.body.classList.remove(
        "menu-open"
      );

      menuToggle?.setAttribute(
        "aria-expanded",
        "false"
      );
    }
  }
);