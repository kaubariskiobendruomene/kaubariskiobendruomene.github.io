document.addEventListener("DOMContentLoaded", () => {
  const emailAddress = "kaubariskiobendruomene@gmail.com";

  const readingProgress = document.getElementById("reading-progress");
  const backToTopButton = document.getElementById("back-to-top");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mainNavigation = document.getElementById("main-navigation");
  const copyEmailButton = document.getElementById("copy-email-button");
  const copyConfirmation = document.getElementById("copy-confirmation");
  const currentDateElement = document.getElementById("current-date");
  const currentTimeElement = document.getElementById("current-time");
  const currentYearElement = document.getElementById("current-year");

  const lightbox = document.getElementById("image-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeLightboxButton = document.getElementById("close-lightbox");
  const galleryItems = document.querySelectorAll(".gallery-item");

  /*
   * Lietuvos data ir laikas
   * Laiko juosta automatiškai prisitaiko prie vasaros ir žiemos laiko.
   */

  function updateLithuanianDateAndTime() {
    const now = new Date();

    const dateFormatter = new Intl.DateTimeFormat("lt-LT", {
      timeZone: "Europe/Vilnius",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const timeFormatter = new Intl.DateTimeFormat("lt-LT", {
      timeZone: "Europe/Vilnius",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    if (currentDateElement) {
      const formattedDate = dateFormatter.format(now);
      currentDateElement.textContent =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    if (currentTimeElement) {
      currentTimeElement.textContent = timeFormatter.format(now);
    }
  }

  updateLithuanianDateAndTime();
  window.setInterval(updateLithuanianDateAndTime, 1000);

  /*
   * Automatiškai rodomi einamieji metai poraštėje
   */

  if (currentYearElement) {
    const yearFormatter = new Intl.DateTimeFormat("lt-LT", {
      timeZone: "Europe/Vilnius",
      year: "numeric",
    });

    currentYearElement.textContent = yearFormatter.format(new Date());
  }

  /*
   * Skaitymo progreso juosta ir mygtukas „Grįžti į viršų“
   */

  function updateScrollFeatures() {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress =
      scrollHeight > 0 ? Math.min((scrollTop / scrollHeight) * 100, 100) : 0;

    if (readingProgress) {
      readingProgress.style.width = `${progress}%`;
    }

    if (backToTopButton) {
      backToTopButton.classList.toggle("is-visible", scrollTop > 500);
    }
  }

  window.addEventListener("scroll", updateScrollFeatures, {
    passive: true,
  });

  updateScrollFeatures();

  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /*
   * Telefono meniu
   */

  function closeMobileMenu() {
    if (!mainNavigation || !mobileMenuButton) {
      return;
    }

    mainNavigation.classList.remove("is-open");
    mobileMenuButton.setAttribute("aria-expanded", "false");
    mobileMenuButton.setAttribute("aria-label", "Atidaryti meniu");
    mobileMenuButton.textContent = "☰";
  }

  if (mobileMenuButton && mainNavigation) {
    mobileMenuButton.addEventListener("click", () => {
      const isOpen = mainNavigation.classList.toggle("is-open");

      mobileMenuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      mobileMenuButton.setAttribute(
        "aria-label",
        isOpen ? "Uždaryti meniu" : "Atidaryti meniu"
      );

      mobileMenuButton.textContent = isOpen ? "×" : "☰";
    });

    mainNavigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", (event) => {
      const clickedInsideNavigation = mainNavigation.contains(event.target);
      const clickedMenuButton = mobileMenuButton.contains(event.target);

      if (!clickedInsideNavigation && !clickedMenuButton) {
        closeMobileMenu();
      }
    });
  }

  /*
   * El. pašto kopijavimo mygtukas
   */

  async function copyEmailAddress() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(emailAddress);
      } else {
        const temporaryInput = document.createElement("textarea");

        temporaryInput.value = emailAddress;
        temporaryInput.setAttribute("readonly", "");
        temporaryInput.style.position = "fixed";
        temporaryInput.style.opacity = "0";

        document.body.appendChild(temporaryInput);
        temporaryInput.select();

        const copied = document.execCommand("copy");
        temporaryInput.remove();

        if (!copied) {
          throw new Error("Nepavyko nukopijuoti");
        }
      }

      if (copyConfirmation) {
        copyConfirmation.textContent = "El. pašto adresas nukopijuotas";
      }

      if (copyEmailButton) {
        copyEmailButton.textContent = "Nukopijuota ✓";
      }

      window.setTimeout(() => {
        if (copyConfirmation) {
          copyConfirmation.textContent = "";
        }

        if (copyEmailButton) {
          copyEmailButton.textContent = "Kopijuoti el. paštą";
        }
      }, 3000);
    } catch (error) {
      if (copyConfirmation) {
        copyConfirmation.textContent =
          "Nepavyko nukopijuoti. Pažymėkite adresą rankiniu būdu.";
      }
    }
  }

  if (copyEmailButton) {
    copyEmailButton.addEventListener("click", copyEmailAddress);
  }

  /*
   * Galerijos nuotraukų atidarymas didesniame lange
   */

  function openLightbox(image) {
    if (!lightbox || !lightboxImage || !image) {
      return;
    }

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.hidden = false;

    document.body.style.overflow = "hidden";

    if (closeLightboxButton) {
      closeLightboxButton.focus();
    }
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lightbox.hidden = true;
    lightboxImage.src = "";
    lightboxImage.alt = "";

    document.body.style.overflow = "";
  }

  galleryItems.forEach((item) => {
    const image = item.querySelector("img");

    item.addEventListener("click", () => {
      openLightbox(image);
    });
  });

  if (closeLightboxButton) {
    closeLightboxButton.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
      closeMobileMenu();
    }
  });

  /*
   * Pavyzdinės nuorodos su „#“ kol kas niekur neveda.
   * Neleidžiame joms perkelti puslapio į patį viršų.
   */

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });
});
