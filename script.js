'use strict';

document.addEventListener('DOMContentLoaded', () => {
  atnaujintiRenginiuInformacija();
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
  const pranesimas = document.querySelector('.announcement-bar p');
  if (pranesimas) {
    pranesimas.innerHTML =
      '<strong>KAUBARIŠKINĖS 2026</strong> · rugpjūčio 29 d. · 18.00 val. · ' +
      'tradicinė Kaubariškio bendruomenės šventė.';
  }

  const pagrindineKortele = pagalId('artimiausi-renginiai');
  if (pagrindineKortele) {
    const pavadinimas = pagrindineKortele.querySelector('h2');
    const aprasymas = pagrindineKortele.querySelector('p:not(.event-label)');

    if (pavadinimas) {
      pavadinimas.textContent = 'KAUBARIŠKINĖS 2026';
      Object.assign(pavadinimas.style, {
        fontSize: 'clamp(2rem, 6vw, 3.4rem)',
        fontWeight: '800',
        letterSpacing: '0.03em',
        lineHeight: '1.05',
        marginBottom: '14px'
      });
    }

    if (aprasymas) {
      aprasymas.innerHTML = `
        <strong style="font-size:1.2em;">2026 m. rugpjūčio 29 d. · 18.00 val.</strong><br>
        Kaubariškio bendruomenės tradicinė šventė.<br>
        Gyva muzika · putų šou · bendrystės vakaras
      `;
    }
  }

  const artimiausi = document.querySelector(
    'section[aria-labelledby="artimiausi-renginiai-title"] .event-group-grid'
  );
  const ivykusios = document.querySelector(
    '#ivykusios-veiklos .event-group-grid'
  );

  const bagazinturgis = pagalId('bagazinturgis');
  if (bagazinturgis && ivykusios) {
    bagazinturgis.innerHTML = `
      <button
        class="event-poster-button gallery-item"
        type="button"
        aria-label="Atidaryti BagažinTurgio skelbimą"
        style="display:block;width:min(100%,300px);margin:0 auto 14px;"
      >
        <img
          src="images/bagazinturgis-2026-07-25.png"
          alt="Kaubariškio BagažinTurgio skelbimas"
          class="event-poster-image"
          loading="lazy"
        >
      </button>

      <span class="status-badge">RENGINYS ĮVYKO</span>

      <h3>BagažinTurgis Kaubariškyje</h3>

      <p><strong>Data:</strong> 2026 m. liepos 25 d.</p>
      <p><strong>Laikas:</strong> 10.00–14.00 val.</p>
      <p>
        <strong>Vieta:</strong>
        Paplūdimio al. 6, Kaubariškis, prie SB „Kaubariškis“
        pastato aikštelėje.
      </p>
      <p>
        BagažinTurgis subūrė gyventojus parduoti, mainyti ir
        padovanoti nebereikalingus, tačiau dar tinkamus naudoti daiktus.
      </p>
    `;

    ivykusios.insertBefore(bagazinturgis, ivykusios.firstElementChild);
  }

  if (artimiausi && !pagalId('kaubariskines-2026')) {
    const kaubariskines = document.createElement('article');
    kaubariskines.id = 'kaubariskines-2026';
    kaubariskines.className = 'content-card';
    kaubariskines.innerHTML = `
      <span class="status-badge">ARTĖJA</span>

      <h3
        style="
          margin:16px 0 18px;
          font-size:clamp(2rem,7vw,3.2rem);
          font-weight:800;
          line-height:1.05;
          letter-spacing:0.03em;
        "
      >
        KAUBARIŠKINĖS 2026
      </h3>

      <p
        style="
          margin-bottom:18px;
          font-size:clamp(1.15rem,3vw,1.45rem);
          font-weight:800;
          line-height:1.35;
        "
      >
        2026 m. rugpjūčio 29 d. · 18.00 val.
      </p>

      <p><strong>Tradicinė Kaubariškio bendruomenės šventė.</strong></p>

      <p style="font-size:1.08rem;line-height:1.7;">
        🎶 Gyva muzika<br>
        🫧 Putų šou<br>
        🤝 Bendrystė ir vasaros vakaras kartu
      </p>

      <p>
        Kviečiame susitikti, pabūti kartu ir pasidžiaugti
        Kaubariškio bendruomenės švente.
      </p>
    `;

    artimiausi.insertBefore(kaubariskines, artimiausi.firstElementChild);
  }

  const registracija = pagalId('bagazinturgio-registracija');
  if (registracija) {
    registracija.remove();
  }

  document.querySelectorAll('#naujienos .content-card').forEach((kortele) => {
    const pavadinimas = kortele.querySelector('h3');
    if (
      pavadinimas &&
      pavadinimas.textContent.includes('BagažinTurgis – liepos 25 d.')
    ) {
      kortele.innerHTML = `
        <span class="category-label">ĮVYKĘS RENGINYS</span>
        <h3>BagažinTurgis Kaubariškyje įvyko liepos 25 d.</h3>
        <p>
          Bendruomenės renginyje gyventojai galėjo parduoti, mainyti
          ar padovanoti nebereikalingus, tačiau dar tinkamus naudoti daiktus.
        </p>
      `;
    }
  });

  const kalendoriausSekcija = pagalId('kalendorius');
  if (kalendoriausSekcija) {
    kalendoriausSekcija.classList.add('compact-info-section');
    kalendoriausSekcija.innerHTML = `
      <div class="container">
        <div class="compact-dashboard">
          <section class="important-dates-card" aria-labelledby="svarbios-datos-title">
            <div class="compact-heading">
              <p class="eyebrow">Svarbios datos</p>
              <h2 id="svarbios-datos-title">Artimiausios datos</h2>
            </div>

            <div class="important-dates-list">
              <a class="important-date-item" href="#artimiausi-renginiai">
                <span class="important-date-day">RUG 29</span>
                <span class="important-date-copy">
                  <strong>Kaubariškinės 2026</strong>
                  <small>18.00 val.</small>
                </span>
              </a>

              <a class="important-date-item" href="#siauruko-gimtadienis-2026">
                <span class="important-date-day">RGS 26</span>
                <span class="important-date-copy">
                  <strong>Išvyka į Siauruko gimtadienį</strong>
                  <small>Išvykimas 12.00 val.</small>
                </span>
              </a>
            </div>
          </section>

          <nav class="quick-links-card" aria-label="Greitos nuorodos">
            <p class="eyebrow">Greitos nuorodos</p>
            <div class="quick-links-grid">
              <a class="quick-link" href="#naryste">
                <span class="quick-link-mark" aria-hidden="true">N</span>
                <span>
                  <strong>Narystė</strong>
                  <small>Tapti nariu</small>
                </span>
              </a>

              <a class="quick-link" href="#parama">
                <span class="quick-link-mark" aria-hidden="true">%</span>
                <span>
                  <strong>Parama</strong>
                  <small>Skirti 1,2 % GPM</small>
                </span>
              </a>

              <a class="quick-link" href="#dokumentai">
                <span class="quick-link-mark" aria-hidden="true">D</span>
                <span>
                  <strong>Dokumentai</strong>
                  <small>Vieši failai</small>
                </span>
              </a>

              <a class="quick-link" href="#atsiliepimai">
                <span class="quick-link-mark" aria-hidden="true">★</span>
                <span>
                  <strong>Atsiliepimai</strong>
                  <small>Nuomonės ir pasiūlymai</small>
                </span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    `;
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