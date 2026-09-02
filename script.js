'use strict';

document.addEventListener('DOMContentLoaded', () => {
  atnaujintiRenginiuInformacija();
  paleistiKompaktiskasSekcijas();
  nustatytiMetus();
  paleistiLaikrodi();
  paleistiSlinkimoElementus();
  paleistiMobilujiMeniu();
  paleistiElPastoKopijavima();
  paleistiGalerija();
  paleistiBagazinturgioForma();
  paleistiNarystesForma();
});

function pagalId(id) {
  return document.getElementById(id);
}

function atnaujintiRenginiuInformacija() {
  const registracija = pagalId('bagazinturgio-registracija');
  if (registracija) {
    registracija.remove();
  }

  const administravimoIrasas = Array.from(
    document.querySelectorAll('.site-footer p')
  ).find((elementas) =>
    elementas.textContent.includes('Svetainės techninis parengimas')
  );

  if (administravimoIrasas) {
    administravimoIrasas.remove();
  }
}

function paleistiKompaktiskasSekcijas() {
  if (!pagalId('compact-sections-stage6')) {
    const stiliai = document.createElement('style');
    stiliai.id = 'compact-sections-stage6';
    stiliai.textContent = `
      #naryste.compact-membership-section,
      #parama.compact-support-section,
      #atsiliepimai.compact-feedback-section,
      #dokumentai.compact-documents-section {
        padding-top: 52px;
        padding-bottom: 52px;
      }

      #naryste.compact-membership-section .registration-layout {
        gap: 18px;
        grid-template-columns: 1fr;
      }

      #naryste.compact-membership-section .registration-information {
        position: static;
        max-width: 920px;
        margin: 0 auto;
        padding: 24px 28px;
        border: 1px solid rgba(35, 77, 60, 0.1);
        border-radius: var(--radius-medium);
        background: var(--white);
        box-shadow: 0 6px 18px rgba(35, 77, 60, 0.06);
      }

      #naryste.compact-membership-section .registration-information h2 {
        margin: 4px 0 12px;
        font-size: clamp(1.7rem, 3.5vw, 2.35rem);
      }

      #naryste.compact-membership-section .registration-intro {
        max-width: 760px;
        margin-bottom: 0;
        font-size: 1rem;
      }

      #naryste.compact-membership-section .registration-event-details,
      #naryste.compact-membership-section .registration-rules {
        display: none;
      }

      #naryste.compact-membership-section .registration-form-card[hidden],
      #parama.compact-support-section .support-steps[hidden] {
        display: none !important;
      }

      #naryste.compact-membership-section .registration-form-card {
        width: min(100%, 760px);
        margin: 4px auto 0;
        padding: 28px;
      }

      .compact-section-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 18px;
      }

      .compact-toggle-button {
        min-height: 44px;
        padding: 10px 18px;
      }

      #parama.compact-support-section .support-card {
        max-width: 1040px;
        margin: 0 auto;
        gap: 14px;
        padding: 26px;
        grid-template-columns: 1fr;
      }

      #parama.compact-support-section .support-content h2 {
        margin: 4px 0 12px;
        font-size: clamp(1.7rem, 3.5vw, 2.35rem);
      }

      #parama.compact-support-section .support-intro {
        margin-bottom: 16px;
        font-size: 1rem;
      }

      #parama.compact-support-section .support-details {
        gap: 10px;
        margin: 14px 0;
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      #parama.compact-support-section .support-details p {
        padding: 14px;
        font-size: 0.92rem;
      }

      #parama.compact-support-section .support-note {
        margin-top: 14px;
        padding: 14px 16px;
        font-size: 0.9rem;
      }

      #parama.compact-support-section .support-actions {
        margin-top: 16px;
      }

      #parama.compact-support-section .support-steps {
        min-height: 0;
        margin-top: 2px;
        padding: 22px;
      }

      #parama.compact-support-section .support-steps h3 {
        margin-bottom: 14px;
        font-size: 1.3rem;
      }

      #parama.compact-support-section .support-steps li {
        margin-bottom: 8px;
        font-size: 0.94rem;
      }

      #atsiliepimai.compact-feedback-section .section-heading {
        margin-bottom: 18px;
      }

      #atsiliepimai.compact-feedback-section .support-card {
        gap: 0;
        padding: 24px;
        grid-template-columns: 1fr;
      }

      #atsiliepimai.compact-feedback-section .support-content h2 {
        margin: 4px 0 10px;
        font-size: clamp(1.55rem, 3vw, 2.1rem);
      }

      #atsiliepimai.compact-feedback-section .support-intro {
        margin-bottom: 8px;
        font-size: 0.96rem;
      }

      #atsiliepimai.compact-feedback-section .support-content > p[aria-label] {
        margin: 8px 0 !important;
        font-size: 1.55rem !important;
      }

      #atsiliepimai.compact-feedback-section .support-note,
      #atsiliepimai.compact-feedback-section .support-steps {
        display: none;
      }

      #atsiliepimai.compact-feedback-section .support-actions {
        margin-top: 14px;
      }

      #atsiliepimai.compact-feedback-section .support-card + .section-heading {
        margin-top: 26px !important;
        margin-bottom: 12px;
      }

      #atsiliepimai.compact-feedback-section .support-card + .section-heading h2 {
        margin-bottom: 0;
        font-size: clamp(1.4rem, 3vw, 1.9rem);
      }

      #atsiliepimai.compact-feedback-section .card-grid {
        max-width: 940px;
        grid-template-columns: 1fr;
      }

      #atsiliepimai.compact-feedback-section .content-card {
        min-height: 0;
        padding: 20px;
      }

      #atsiliepimai.compact-feedback-section .content-card p {
        font-size: 0.94rem;
        line-height: 1.5;
      }

      #dokumentai.compact-documents-section .section-heading {
        margin-bottom: 20px;
      }

      #dokumentai.compact-documents-section .document-list {
        gap: 14px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      #dokumentai.compact-documents-section .document-item {
        min-height: 100%;
        align-items: flex-start;
        flex-direction: column;
        padding: 20px;
      }

      #dokumentai.compact-documents-section .document-item h3 {
        margin: 10px 0 6px;
        font-size: 1.08rem;
        line-height: 1.35;
      }

      #dokumentai.compact-documents-section .document-item p {
        font-size: 0.9rem;
        line-height: 1.45;
      }

      #dokumentai.compact-documents-section .document-actions {
        width: 100%;
        margin-top: auto;
        padding-top: 12px;
      }

      #dokumentai.compact-documents-section .document-actions .button {
        width: 100%;
        min-height: 42px;
        padding: 9px 14px;
      }

      @media (max-width: 760px) {
        #naryste.compact-membership-section,
        #parama.compact-support-section,
        #atsiliepimai.compact-feedback-section,
        #dokumentai.compact-documents-section {
          padding-top: 42px;
          padding-bottom: 42px;
        }

        #naryste.compact-membership-section .registration-information,
        #naryste.compact-membership-section .registration-form-card,
        #parama.compact-support-section .support-card,
        #atsiliepimai.compact-feedback-section .support-card {
          padding: 20px;
        }

        #parama.compact-support-section .support-details,
        #dokumentai.compact-documents-section .document-list {
          grid-template-columns: 1fr;
        }

        .compact-section-actions,
        #parama.compact-support-section .support-actions {
          align-items: stretch;
          flex-direction: column;
        }

        .compact-section-actions .button,
        #parama.compact-support-section .support-actions .button,
        #parama.compact-support-section .support-actions .text-link {
          width: 100%;
          text-align: center;
        }
      }
    `;
    document.head.appendChild(stiliai);
  }

  const naryste = pagalId('naryste');
  if (naryste) {
    naryste.classList.add('compact-membership-section');

    const informacija = naryste.querySelector('.registration-information');
    const formosKortele = naryste.querySelector('.registration-form-card');

    if (informacija && formosKortele && !pagalId('membership-form-toggle')) {
      formosKortele.id = 'membership-form-card';
      formosKortele.hidden = true;

      const veiksmai = document.createElement('div');
      veiksmai.className = 'compact-section-actions';

      const mygtukas = document.createElement('button');
      mygtukas.id = 'membership-form-toggle';
      mygtukas.className = 'button button-primary compact-toggle-button';
      mygtukas.type = 'button';
      mygtukas.setAttribute('aria-controls', 'membership-form-card');
      mygtukas.setAttribute('aria-expanded', 'false');
      mygtukas.textContent = 'Pildyti narystės paraišką';

      veiksmai.appendChild(mygtukas);
      informacija.appendChild(veiksmai);

      const nustatytiForma = (atidaryta, slinkti = false) => {
        formosKortele.hidden = !atidaryta;
        naryste.classList.toggle('is-form-open', atidaryta);
        mygtukas.setAttribute('aria-expanded', String(atidaryta));
        mygtukas.textContent = atidaryta
          ? 'Uždaryti paraišką'
          : 'Pildyti narystės paraišką';

        if (atidaryta && slinkti) {
          window.setTimeout(() => {
            formosKortele.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 50);
        }
      };

      mygtukas.addEventListener('click', () => {
        nustatytiForma(formosKortele.hidden, !formosKortele.hidden);
      });

      const atvertiPagalAdresa = () => {
        if (window.location.hash === '#naryste') {
          nustatytiForma(true, false);
        }
      };

      atvertiPagalAdresa();
      window.addEventListener('hashchange', atvertiPagalAdresa);
    }
  }

  const parama = pagalId('parama');
  if (parama) {
    parama.classList.add('compact-support-section');

    const zingsniai = parama.querySelector('.support-steps');
    const veiksmai = parama.querySelector('.support-actions');

    if (zingsniai && veiksmai && !pagalId('support-steps-toggle')) {
      zingsniai.id = 'support-steps-card';
      zingsniai.hidden = true;

      const mygtukas = document.createElement('button');
      mygtukas.id = 'support-steps-toggle';
      mygtukas.className = 'button button-secondary compact-toggle-button';
      mygtukas.type = 'button';
      mygtukas.setAttribute('aria-controls', 'support-steps-card');
      mygtukas.setAttribute('aria-expanded', 'false');
      mygtukas.textContent = 'Kaip skirti 1,2 %';
      veiksmai.appendChild(mygtukas);

      mygtukas.addEventListener('click', () => {
        const atidaryti = zingsniai.hidden;
        zingsniai.hidden = !atidaryti;
        mygtukas.setAttribute('aria-expanded', String(atidaryti));
        mygtukas.textContent = atidaryti
          ? 'Uždaryti instrukciją'
          : 'Kaip skirti 1,2 %';
      });
    }
  }

  const atsiliepimai = pagalId('atsiliepimai');
  if (atsiliepimai) {
    atsiliepimai.classList.add('compact-feedback-section');
  }

  const dokumentai = pagalId('dokumentai');
  if (dokumentai) {
    dokumentai.classList.add('compact-documents-section');
  }
}

function nustatytiMetus() {
  const elementas = pagalId('current-year');
  if (elementas) {
    elementas.textContent = String(new Date().getFullYear());
  }
}

function paleistiLaikrodi() {
  const datosElementas = pagalId('current-date');
  const laikoElementas = pagalId('current-time');
  if (!datosElementas || !laikoElementas) {
    return;
  }

  const atnaujinti = () => {
    const dabar = new Date();
    const data = new Intl.DateTimeFormat('lt-LT', {
      timeZone: 'Europe/Vilnius',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(dabar);
    const laikas = new Intl.DateTimeFormat('lt-LT', {
      timeZone: 'Europe/Vilnius',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(dabar);

    datosElementas.textContent =
      data.charAt(0).toUpperCase() + data.slice(1);
    laikoElementas.textContent = laikas;
  };

  atnaujinti();
  window.setInterval(atnaujinti, 1000);
}

function paleistiSlinkimoElementus() {
  const progresoJuosta = pagalId('reading-progress');
  const virsausMygtukas = pagalId('back-to-top');

  const atnaujinti = () => {
    const galimasSlinkimas =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    if (progresoJuosta) {
      const procentai = galimasSlinkimas > 0
        ? (window.scrollY / galimasSlinkimas) * 100
        : 0;
      progresoJuosta.style.width =
        `${Math.min(100, Math.max(0, procentai))}%`;
    }

    if (virsausMygtukas) {
      virsausMygtukas.classList.toggle(
        'is-visible',
        window.scrollY > 550
      );
    }
  };

  atnaujinti();
  window.addEventListener('scroll', atnaujinti, { passive: true });
  window.addEventListener('resize', atnaujinti);

  if (virsausMygtukas) {
    virsausMygtukas.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function paleistiMobilujiMeniu() {
  const mygtukas = pagalId('mobile-menu-button');
  const navigacija = pagalId('main-navigation');
  const uzdanga = pagalId('mobile-menu-overlay');
  const uzdarymoMygtukas = pagalId('mobile-menu-close');

  if (!mygtukas || !navigacija || !uzdanga || !uzdarymoMygtukas) {
    return;
  }

  const grupes = Array.from(navigacija.querySelectorAll('.nav-group'));

  const uzdarytiGrupes = () => {
    grupes.forEach((grupe) => {
      grupe.classList.remove('is-open');
      const grupesMygtukas = grupe.querySelector('.nav-group-toggle');
      if (grupesMygtukas) {
        grupesMygtukas.setAttribute('aria-expanded', 'false');
      }
    });
  };

  const atidarytiGrupe = (aktyviGrupe) => {
    grupes.forEach((grupe) => {
      const atidaryta = grupe === aktyviGrupe;
      grupe.classList.toggle('is-open', atidaryta);
      const grupesMygtukas = grupe.querySelector('.nav-group-toggle');
      if (grupesMygtukas) {
        grupesMygtukas.setAttribute('aria-expanded', String(atidaryta));
      }
    });
  };

  const uzdarytiMeniu = (grazintiFokusa = false) => {
    navigacija.classList.remove('is-open');
    uzdanga.classList.remove('is-open');
    uzdanga.hidden = true;
    document.body.classList.remove('menu-open');
    uzdarytiGrupes();

    mygtukas.setAttribute('aria-expanded', 'false');
    mygtukas.setAttribute('aria-label', 'Atidaryti meniu');

    if (grazintiFokusa) {
      window.setTimeout(() => {
        mygtukas.focus({ preventScroll: true });
      }, 0);
    }
  };

  const atidarytiMeniu = () => {
    uzdanga.hidden = false;
    navigacija.classList.add('is-open');
    uzdanga.classList.add('is-open');
    document.body.classList.add('menu-open');
    mygtukas.setAttribute('aria-expanded', 'true');
    mygtukas.setAttribute('aria-label', 'Uždaryti meniu');
  };

  mygtukas.addEventListener('click', () => {
    if (navigacija.classList.contains('is-open')) {
      uzdarytiMeniu(true);
    } else {
      atidarytiMeniu();
    }
  });

  uzdarymoMygtukas.addEventListener('click', () => uzdarytiMeniu(true));
  uzdanga.addEventListener('click', () => uzdarytiMeniu(true));

  grupes.forEach((grupe) => {
    const grupesMygtukas = grupe.querySelector('.nav-group-toggle');
    if (!grupesMygtukas) {
      return;
    }

    grupesMygtukas.addEventListener('pointerdown', () => {
      grupesMygtukas.dataset.pelesPaspaudimas = 'true';
    });

    grupesMygtukas.addEventListener('click', () => {
      if (grupe.classList.contains('is-open')) {
        grupe.classList.remove('is-open');
        grupesMygtukas.setAttribute('aria-expanded', 'false');
      } else {
        atidarytiGrupe(grupe);
      }
    });

    grupe.addEventListener('focusin', (ivykis) => {
      if (
        ivykis.target === grupesMygtukas &&
        (
          grupesMygtukas.dataset.neatidaryti === 'true' ||
          grupesMygtukas.dataset.pelesPaspaudimas === 'true'
        )
      ) {
        delete grupesMygtukas.dataset.neatidaryti;
        delete grupesMygtukas.dataset.pelesPaspaudimas;
        return;
      }
      atidarytiGrupe(grupe);
    });

    grupe.addEventListener('focusout', () => {
      window.setTimeout(() => {
        if (!grupe.contains(document.activeElement)) {
          grupe.classList.remove('is-open');
          grupesMygtukas.setAttribute('aria-expanded', 'false');
        }
      }, 0);
    });
  });

  navigacija.querySelectorAll('a').forEach((nuoroda) => {
    nuoroda.addEventListener('click', () => {
      if (navigacija.classList.contains('is-open')) {
        uzdarytiMeniu(true);
      } else {
        uzdarytiGrupes();
      }
    });
  });

  document.addEventListener('click', (ivykis) => {
    const meniuViduje = navigacija.contains(ivykis.target);
    const mygtukoViduje = mygtukas.contains(ivykis.target);

    if (!meniuViduje && !mygtukoViduje) {
      if (navigacija.classList.contains('is-open')) {
        uzdarytiMeniu(true);
      } else {
        uzdarytiGrupes();
      }
    }
  });

  document.addEventListener('keydown', (ivykis) => {
    if (ivykis.key !== 'Escape') {
      return;
    }

    const aktyviGrupe = grupes.find((grupe) =>
      grupe.contains(document.activeElement)
    );

    if (aktyviGrupe) {
      const grupesMygtukas =
        aktyviGrupe.querySelector('.nav-group-toggle');
      uzdarytiGrupes();

      if (grupesMygtukas) {
        grupesMygtukas.dataset.neatidaryti = 'true';
        grupesMygtukas.focus({ preventScroll: true });
      }
    }

    if (navigacija.classList.contains('is-open')) {
      uzdarytiMeniu(true);
    }
  });
}

function paleistiElPastoKopijavima() {
  const mygtukas = pagalId('copy-email-button');
  const zinute = pagalId('copy-confirmation');
  if (!mygtukas) {
    return;
  }

  const elPastas = 'kaubariskiobendruomene@gmail.com';

  mygtukas.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(elPastas);
      } else {
        const laukas = document.createElement('textarea');
        laukas.value = elPastas;
        laukas.style.position = 'fixed';
        laukas.style.left = '-9999px';
        document.body.appendChild(laukas);
        laukas.select();
        document.execCommand('copy');
        laukas.remove();
      }

      if (zinute) {
        zinute.textContent = 'El. pašto adresas nukopijuotas.';
      }
    } catch (klaida) {
      console.error(klaida);
      if (zinute) {
        zinute.textContent = elPastas;
      }
    }

    window.setTimeout(() => {
      if (zinute) {
        zinute.textContent = '';
      }
    }, 4000);
  });
}

function paleistiGalerija() {
  const langas = pagalId('image-lightbox');
  const nuotrauka = pagalId('lightbox-image');
  const uzdarymoMygtukas = pagalId('close-lightbox');

  if (!langas || !nuotrauka || !uzdarymoMygtukas) {
    return;
  }

  const uzdaryti = () => {
    langas.hidden = true;
    document.body.style.overflow = '';
    nuotrauka.src = '';
    nuotrauka.alt = '';
  };

  document.querySelectorAll('.gallery-item img').forEach((vaizdas) => {
    const mygtukas = vaizdas.closest('.gallery-item');
    if (!mygtukas) {
      return;
    }

    mygtukas.addEventListener('click', () => {
      nuotrauka.src = vaizdas.currentSrc || vaizdas.src;
      nuotrauka.alt = vaizdas.alt || 'Padidinta nuotrauka';
      langas.hidden = false;
      document.body.style.overflow = 'hidden';
      uzdarymoMygtukas.focus();
    });
  });

  uzdarymoMygtukas.addEventListener('click', uzdaryti);
  langas.addEventListener('click', (ivykis) => {
    if (ivykis.target === langas) {
      uzdaryti();
    }
  });
  document.addEventListener('keydown', (ivykis) => {
    if (ivykis.key === 'Escape' && !langas.hidden) {
      uzdaryti();
    }
  });
}

function paleistiBagazinturgioForma() {
  paleistiForma({
    formosId: 'bagazinturgio-registration-form',
    iframeId: 'registration-response-frame',
    mygtukoId: 'registration-submit-button',
    zinutesId: 'registration-form-message',
    siuntimoTekstas: 'Registracija siunčiama…',
    sekmesTekstas: 'Registracija sėkmingai pateikta.'
  });
}

function paleistiNarystesForma() {
  paleistiForma({
    formosId: 'membership-application-form',
    iframeId: 'membership-response-frame',
    mygtukoId: 'membership-submit-button',
    zinutesId: 'membership-form-message',
    siuntimoTekstas: 'Paraiška siunčiama…',
    sekmesTekstas: 'Paraiška gauta. Susisieksime dėl prašymo.'
  });
}

function paleistiForma(nustatymai) {
  const forma = pagalId(nustatymai.formosId);
  const iframe = pagalId(nustatymai.iframeId);
  const mygtukas = pagalId(nustatymai.mygtukoId);
  const zinute = pagalId(nustatymai.zinutesId);

  if (!forma || !iframe || !mygtukas || !zinute) {
    return;
  }

  let siunciama = false;
  let laikmatis = null;
  const pradinisTekstas = mygtukas.textContent.trim();

  const rodytiZinute = (tekstas, klase) => {
    zinute.textContent = tekstas;
    zinute.classList.remove('is-loading', 'is-success', 'is-error');
    if (klase) {
      zinute.classList.add(klase);
    }
  };

  const baigtiSiuntima = () => {
    siunciama = false;
    mygtukas.disabled = false;
    mygtukas.textContent = pradinisTekstas;

    if (laikmatis) {
      window.clearTimeout(laikmatis);
      laikmatis = null;
    }
  };

  forma.addEventListener('submit', (ivykis) => {
    if (siunciama) {
      ivykis.preventDefault();
      return;
    }

    if (!forma.checkValidity()) {
      ivykis.preventDefault();
      forma.reportValidity();
      return;
    }

    if (!navigator.onLine) {
      ivykis.preventDefault();
      rodytiZinute('Nėra interneto ryšio.', 'is-error');
      return;
    }

    siunciama = true;
    mygtukas.disabled = true;
    mygtukas.textContent = nustatymai.siuntimoTekstas;
    rodytiZinute(
      'Duomenys siunčiami. Prašome palaukti…',
      'is-loading'
    );

    laikmatis = window.setTimeout(() => {
      if (!siunciama) {
        return;
      }

      baigtiSiuntima();
      rodytiZinute(
        'Sistema neatsakė. Bandykite dar kartą.',
        'is-error'
      );
    }, 30000);
  });

  iframe.addEventListener('load', () => {
    if (!siunciama) {
      return;
    }

    baigtiSiuntima();
    forma.reset();
    rodytiZinute(nustatymai.sekmesTekstas, 'is-success');
  });
}