"use strict";

/* ========================================================================== 
   BYTKOJN — společné chování webu
   --------------------------------------------------------------------------
   HTML obsahuje obsah stránek, CSS jejich vzhled a tento soubor pouze
   společné interakce a komponenty. Nejsou zde žádné maketové texty článků.
   ========================================================================== */

const SITE_CONFIG = {
  brand: "bytkojn",
  status: "ONLINE",
  topNavigation: [
    { id: "bitcoin", label: "Bitcoin", href: "bitcoin/home.html" },
    { id: "pending-1", label: "ERR://CONTENT_PENDING" },
    { id: "pending-2", label: "ERR://CONTENT_PENDING" },
    { id: "pending-3", label: "ERR://CONTENT_PENDING" }
  ],
  socials: [
    {
      id: "x",
      label: "justluky na síti X",
      title: "X",
      href: "https://x.com/justluky_"
    },
    {
      id: "github",
      label: "BYTKOJN na GitHubu",
      title: "GitHub",
      href: "https://github.com/just-luky/bytkojn"
    }
  ],
  footerLinks: [
    { label: "O projektu", href: "projekt/o-projektu.html" },
    { label: "Disclaimer", href: "projekt/disclaimer.html" },
    { label: "Podpořit projekt", href: "projekt/podpora.html" }
  ]
};

const BITCOIN_NAVIGATION = [
  { title: "Úvod", href: "uvod.html" },
  { title: "Vznik a historie", href: "vznik-a-historie.html" },
  { title: "Jak funguje Bitcoin", href: "jak-funguje-bitcoin.html" },
  { title: "ERR://CONTENT_PENDING" },
  { title: "ERR://CONTENT_PENDING" },
  { title: "ERR://CONTENT_PENDING" },
  { title: "ERR://CONTENT_PENDING" },
  { title: "ERR://CONTENT_PENDING" },
  { title: "ERR://CONTENT_PENDING" },
  { title: "ERR://CONTENT_PENDING" }
];

const HOME_ROTATING_WORDS = [
  "polopravd",
  "prostředníků",
  "humbuku",
  "technického strašení",
  "mýtů",
  "rychlého bohatství",
  "zmatku",
  "marketingu",
  "slepé poslušnosti",
  "hádanek",
  "cenových predikcí",
  "balastu",
  "cenzury",
  "falešných slibů",
  "nejasností",
  "korporátní řeči",
  "iluzí",
  "zaručených tipů",
  "pozlátka",
  "finančních guru",
  "povrchnosti",
  "dogmat",
  "bankovní omáčky",
  "strachu",
  "zkratek",
  "ekonomických kouzel",
  "zamlčování",
  "FOMO",
  "kompromisů",
  "slepé víry",
  "investičních pohádek",
  "zkreslení",
  "tajemství",
  "složitých řečí",
  "frází",
  "centrální autority",
  "paniky",
  "nepochopení",
  "výmluv",
  "předsudků",
  "omáčky",
  "dozoru",
  "senzací",
  "chaosu",
  "zbytečné teorie",
  "klišé",
  "hranic",
  "lží",
  "zkreslených představ"
];

/* --------------------------------------------------------------------------
   Cesty a společné UI
   -------------------------------------------------------------------------- */

function getSiteRootPrefix() {
  const body = document.body;
  return body.classList.contains("page-bitcoin") || body.classList.contains("page-project")
    ? "../"
    : "";
}

function siteHref(path) {
  if (/^(?:[a-z]+:|#|\/)/i.test(path)) {
    return path;
  }

  return `${getSiteRootPrefix()}${path}`;
}

function socialIcon(id) {
  if (id === "x") {
    return `
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"></path>
      </svg>
    `;
  }

  if (id === "github") {
    return `
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 .7C5.73.7.65 5.78.65 12.05c0 5.02 3.25 9.28 7.76 10.78.57.1.78-.25.78-.55v-2.17c-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.71.08-.7.08-.7 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.31.95.1-.74.4-1.24.72-1.52-2.52-.29-5.17-1.26-5.17-5.61 0-1.24.44-2.25 1.17-3.05-.12-.29-.51-1.44.11-3 0 0 .95-.3 3.12 1.16a10.8 10.8 0 0 1 5.68 0C17.03 5.95 17.98 6.25 17.98 6.25c.62 1.56.23 2.71.11 3 .73.8 1.17 1.81 1.17 3.05 0 4.36-2.66 5.31-5.19 5.59.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.78.55a11.36 11.36 0 0 0 7.73-10.78C23.35 5.78 18.27.7 12 .7Z"></path>
      </svg>
    `;
  }

  return "";
}

function renderGlobalHeader() {
  const header = document.querySelector("#siteHeader");
  if (!header) {
    return;
  }

  const bitcoinActive = document.body.classList.contains("page-bitcoin");
  const navigation = SITE_CONFIG.topNavigation
    .map((item) => {
      if (!item.href) {
        return `<span class="top-tab is-disabled" aria-disabled="true">${item.label}</span>`;
      }

      const active = item.id === "bitcoin" && bitcoinActive;
      return `
        <a
          class="top-tab${active ? " is-active" : ""}"
          href="${siteHref(item.href)}"
          ${active ? 'aria-current="page"' : ""}
        >${item.label}</a>
      `;
    })
    .join("");

  header.innerHTML = `
    <a class="brand" href="/" aria-label="BYTKOJN – úvodní stránka">
      <span class="brand-bracket" aria-hidden="true">&lt;</span>
      <span class="brand-name">${SITE_CONFIG.brand}</span>
      <span class="brand-slash" aria-hidden="true">/</span>
      <span class="brand-bracket" aria-hidden="true">&gt;</span>
    </a>

    <nav class="top-navigation" aria-label="Hlavní navigace">
      ${navigation}
    </nav>

    <div class="node-status" title="Stav webu">
      <span class="status-dot" aria-hidden="true"></span>
      <span>${SITE_CONFIG.status}</span>
    </div>
  `;
}

function renderGlobalFooter() {
  const footer = document.querySelector("#siteFooter");
  if (!footer) {
    return;
  }

  const socials = SITE_CONFIG.socials
    .map(
      (item) => `
        <a
          class="footer-social-link"
          href="${item.href}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="${item.label}"
          title="${item.title}"
        >${socialIcon(item.id)}</a>
      `
    )
    .join("");

  const projectLinks = SITE_CONFIG.footerLinks
    .map((item) => `<a href="${siteHref(item.href)}">${item.label}</a>`)
    .join("");

  footer.innerHTML = `
    <div class="footer-main">
      <div class="footer-identity">
        <a class="footer-brand" href="/" aria-label="BYTKOJN – úvodní stránka">
          <span class="brand-bracket" aria-hidden="true">&lt;</span>
          <span class="footer-brand-name">${SITE_CONFIG.brand}</span>
          <span class="brand-slash" aria-hidden="true">/</span>
          <span class="brand-bracket" aria-hidden="true">&gt;</span>
        </a>
        <div class="footer-socials">${socials}</div>
      </div>

      <nav class="footer-project" aria-label="Informace o projektu">
        <p class="footer-heading">// PROJEKT</p>
        ${projectLinks}
      </nav>
    </div>

    <div class="statusbar">
      <span>Copyright © ${new Date().getFullYear()} &lt;${SITE_CONFIG.brand}/&gt;</span>
      <span class="footer-signature">//all_rights_reserved</span>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   Navigace sekce Bitcoin
   -------------------------------------------------------------------------- */

function currentFileName() {
  return (window.location.pathname.split("/").pop() || "home.html").toLowerCase();
}

function renderBitcoinNavigation() {
  const sidebar = document.querySelector("#sidebar");
  if (!document.body.classList.contains("page-bitcoin") || !sidebar) {
    return;
  }

  const currentPage = currentFileName();

  const items = BITCOIN_NAVIGATION.map((item, index) => {
    const number = String(index + 1).padStart(2, "0");

    if (!item.href) {
      return `
        <span class="bitcoin-nav-link is-disabled" aria-disabled="true">
          <span class="bitcoin-nav-number">${number}</span>
          <span class="bitcoin-nav-title">${item.title}</span>
        </span>
      `;
    }

    const active = currentPage === item.href.toLowerCase();
    return `
      <a
        class="bitcoin-nav-link${active ? " is-active" : ""}"
        href="${item.href}"
        ${active ? 'aria-current="page"' : ""}
      >
        <span class="bitcoin-nav-number">${number}</span>
        <span class="bitcoin-nav-title">${item.title}</span>
      </a>
    `;
  }).join("");

  sidebar.innerHTML = `
    <div class="sidebar-navigation-content">
      <nav class="bitcoin-section-nav" aria-label="Obsah sekce Bitcoin">${items}</nav>
    </div>
  `;

  const navigation = sidebar.querySelector(".bitcoin-section-nav");
  const activeLink = navigation?.querySelector(".bitcoin-nav-link.is-active");

  if (!navigation || !activeLink) {
    return;
  }

  /*
    Mobilní horizontální navigace:
    aktivní kapitolu držíme přibližně uprostřed lišty. Po kliknutí na jinou
    kapitolu si krátce uložíme informaci do sessionStorage a na nově otevřené
    stránce provedeme plynulé vystředění. Uživatel tak zároveň přirozeně
    zahlédne, že před i za aktivní položkou jsou další kapitoly.
  */
  const mobileNavigation = window.matchMedia("(max-width: 820px)");

  const centerActiveNavigationItem = (behavior = "auto") => {
    if (!mobileNavigation.matches) {
      return;
    }

    const maxScrollLeft = Math.max(0, navigation.scrollWidth - navigation.clientWidth);
    const targetScrollLeft =
      activeLink.offsetLeft -
      (navigation.clientWidth - activeLink.offsetWidth) / 2;

    navigation.scrollTo({
      left: Math.min(maxScrollLeft, Math.max(0, targetScrollLeft)),
      behavior
    });
  };

  let smoothCenter = false;

  try {
    smoothCenter = sessionStorage.getItem("bytkojn-bitcoin-nav-center") === "1";
    sessionStorage.removeItem("bytkojn-bitcoin-nav-center");
  } catch (error) {
    // sessionStorage může být v některých režimech prohlížeče nedostupné.
  }

  navigation.querySelectorAll(".bitcoin-nav-link[href]").forEach((link) => {
    link.addEventListener("click", () => {
      if (!mobileNavigation.matches) {
        return;
      }

      try {
        sessionStorage.setItem("bytkojn-bitcoin-nav-center", "1");
      } catch (error) {
        // Navigace funguje i bez sessionStorage, pouze bez plynulé animace.
      }
    });
  });

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      centerActiveNavigationItem(smoothCenter ? "smooth" : "auto");
    });
  });

  mobileNavigation.addEventListener?.("change", () => {
    centerActiveNavigationItem("auto");
  });
}

/* --------------------------------------------------------------------------
   Úvodní rotující nadpis
   -------------------------------------------------------------------------- */

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

function initHomeRotatingTitle() {
  if (!document.body.classList.contains("page-home")) {
    return;
  }

  const word = document.querySelector("#rotatingWord");
  const title = document.querySelector("#contentTitle");
  if (!word || !title) {
    return;
  }

  const words = shuffle(HOME_ROTATING_WORDS);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;

  word.textContent = words[index];
  title.setAttribute("aria-label", `Bitcoin bez ${words[index]}`);

  if (reduceMotion) {
    return;
  }

  window.setInterval(() => {
    word.classList.add("is-changing");

    window.setTimeout(() => {
      index = (index + 1) % words.length;
      word.textContent = words[index];
      word.classList.remove("is-changing");
    }, 220);
  }, 1500);
}

/* --------------------------------------------------------------------------
   Tlačítko nahoru
   -------------------------------------------------------------------------- */

function initBackToTop() {
  const statusbar = document.querySelector(".statusbar");
  const button = document.createElement("button");

  button.type = "button";
  button.className = "back-to-top";
  button.setAttribute("aria-label", "Vrátit se na začátek stránky");
  button.setAttribute("title", "Nahoru");
  button.innerHTML = '<span aria-hidden="true">↑</span>';
  document.body.appendChild(button);

  const updatePosition = () => {
    button.classList.toggle("is-visible", window.scrollY > 450);

    const baseOffset =
      Number.parseFloat(getComputedStyle(button).getPropertyValue("--back-to-top-offset")) || 22;

    if (!statusbar) {
      button.style.bottom = `${baseOffset}px`;
      return;
    }

    const overlap = Math.max(0, window.innerHeight - statusbar.getBoundingClientRect().top);
    button.style.bottom = `${overlap > 0 ? Math.max(baseOffset, overlap + 10) : baseOffset}px`;
  };

  button.addEventListener("click", () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  window.addEventListener("scroll", updatePosition, { passive: true });
  window.addEventListener("resize", updatePosition);
  updatePosition();
}

/* --------------------------------------------------------------------------
   Kopírování textu do schránky
   -------------------------------------------------------------------------- */

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // Fallback níže je záměrný: clipboard API nemusí být dostupné např. přes file://.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } finally {
    textarea.remove();
  }

  return copied;
}

function initSupportCopy() {
  document.querySelectorAll(".support-copy[data-copy-target]").forEach((button) => {
    button.addEventListener("click", async () => {
      const target = document.getElementById(button.dataset.copyTarget);
      if (!target) {
        return;
      }

      const originalText = button.textContent;
      const copied = await copyText(target.textContent.trim());
      if (!copied) {
        return;
      }

      button.textContent = "Zkopírováno";
      button.classList.add("is-copied");

      window.setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove("is-copied");
      }, 1600);
    });
  });
}

/* --------------------------------------------------------------------------
   Interaktivní mapa toku bitcoinové transakce
   -------------------------------------------------------------------------- */

function initBitcoinFlowMap() {
  const root = document.querySelector("[data-btc-map]");
  if (!root) {
    return;
  }

  const viewport = root.querySelector("[data-btc-map-viewport]");
  const stage = root.querySelector("[data-btc-map-stage]");
  const zoomIn = root.querySelector("[data-btc-map-zoom-in]");
  const zoomOut = root.querySelector("[data-btc-map-zoom-out]");
  const reset = root.querySelector("[data-btc-map-reset]");
  const detailIndex = root.querySelector("[data-btc-map-detail-index]");
  const detailTitle = root.querySelector("[data-btc-map-detail-title]");
  const detailText = root.querySelector("[data-btc-map-detail-text]");
  const stepGroups = [...root.querySelectorAll(".map-group[data-map-step]")];

  if (!viewport || !stage || !detailIndex || !detailTitle || !detailText) {
    return;
  }

  const stageWidth = 3120;
  const stageHeight = 720;
  const minScale = 0.28;
  const maxScale = 2.4;

  const details = {
    1: {
      index: "01",
      title: "Peněženka vytvoří a podepíše transakci",
      text: "Peněženka vybere UTXO, která chce uživatel utratit, sestaví nové výstupy a pomocí příslušných soukromých klíčů transakci podepíše. Nedochází přitom k přesunu digitálních mincí mezi zařízeními – původní UTXO budou spotřebována a transakce vytvoří výstupy nové."
    },
    2: {
      index: "02",
      title: "Transakce se šíří mezi uzly",
      text: "Podepsaná transakce je předána bitcoinovému uzlu, který ji ověří. Pokud ji přijme, může ji uložit do svého lokálního mempoolu a oznámit dalším uzlům. Ty provedou vlastní kontrolu a mohou ji šířit dál."
    },
    3: {
      index: "03",
      title: "Těžař vybírá nepotvrzené transakce",
      text: "Těžař vybírá platné nepotvrzené transakce, které zná jeho vlastní uzel a uchovává ve svém mempoolu. Z vybraných transakcí následně sestavuje kandidátní blok."
    },
    4: {
      index: "04",
      title: "Vzniká kandidátní blok a probíhá proof-of-work",
      text: "Kandidátní blok obsahuje coinbase transakci a vybrané běžné transakce. Těžař opakovaně mění nonce v hlavičce bloku a pokaždé počítá nový hash. Pokud žádná hodnota nonce nevyhovuje, vytvoří další variantu hlavičky a pokračuje v hledání. Cílem je získat hash menší nebo rovný aktuálnímu targetu."
    },
    5: {
      index: "05",
      title: "Nový blok se šíří sítí a transakce získává potvrzení",
      text: "Po nalezení vyhovujícího proof-of-work těžař rozešle nový blok do sítě. Ostatní uzly samostatně ověří jeho proof-of-work, strukturu, návaznost na předchozí blok i obsažené transakce. Pokud blok přijmou jako součást své aktivní historie, získají transakce v něm obsažené první potvrzení."
    }
  };

  let scale = 1;
  let translateX = 0;
  let translateY = 0;
  let dragState = null;
  let pinchState = null;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const applyTransform = () => {
    stage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  };

  const fitMap = () => {
    const width = viewport.clientWidth;
    const height = viewport.clientHeight;

    scale = clamp(Math.min(width / stageWidth, height / stageHeight) * 0.96, minScale, 1);
    translateX = (width - stageWidth * scale) / 2;
    translateY = (height - stageHeight * scale) / 2;
    applyTransform();
  };

  const zoomAt = (clientX, clientY, factor) => {
    const rect = viewport.getBoundingClientRect();
    const pointerX = clientX - rect.left;
    const pointerY = clientY - rect.top;
    const worldX = (pointerX - translateX) / scale;
    const worldY = (pointerY - translateY) / scale;
    const nextScale = clamp(scale * factor, minScale, maxScale);

    translateX = pointerX - worldX * nextScale;
    translateY = pointerY - worldY * nextScale;
    scale = nextScale;
    applyTransform();
  };

  const zoomAtCenter = (factor) => {
    const rect = viewport.getBoundingClientRect();
    zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, factor);
  };

  viewport.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      zoomAt(event.clientX, event.clientY, event.deltaY < 0 ? 1.12 : 0.89);
    },
    { passive: false }
  );

  viewport.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    viewport.setPointerCapture?.(event.pointerId);
    dragState = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      translateX,
      translateY
    };
    viewport.classList.add("is-dragging");
  });

  viewport.addEventListener("pointermove", (event) => {
    if (!dragState || event.pointerId !== dragState.id) {
      return;
    }

    translateX = dragState.translateX + (event.clientX - dragState.x);
    translateY = dragState.translateY + (event.clientY - dragState.y);
    applyTransform();
  });

  const stopDrag = (event) => {
    if (!dragState || (event?.pointerId !== undefined && event.pointerId !== dragState.id)) {
      return;
    }

    dragState = null;
    viewport.classList.remove("is-dragging");
  };

  viewport.addEventListener("pointerup", stopDrag);
  viewport.addEventListener("pointercancel", stopDrag);

  viewport.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 2) {
      return;
    }

    const [first, second] = event.touches;
    pinchState = {
      distance: Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY),
      scale
    };
  }, { passive: true });

  viewport.addEventListener("touchmove", (event) => {
    if (event.touches.length !== 2 || !pinchState) {
      return;
    }

    event.preventDefault();
    const [first, second] = event.touches;
    const distance = Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY);
    const centerX = (first.clientX + second.clientX) / 2;
    const centerY = (first.clientY + second.clientY) / 2;
    const targetScale = clamp(pinchState.scale * (distance / pinchState.distance), minScale, maxScale);
    zoomAt(centerX, centerY, targetScale / scale);
  }, { passive: false });

  viewport.addEventListener("touchend", () => {
    pinchState = null;
  });

  zoomIn?.addEventListener("click", () => zoomAtCenter(1.2));
  zoomOut?.addEventListener("click", () => zoomAtCenter(0.83));
  reset?.addEventListener("click", fitMap);

  const selectStep = (step) => {
    const data = details[step];
    if (!data) {
      return;
    }

    stepGroups.forEach((group) => {
      group.classList.toggle("is-active", group.dataset.mapStep === step);
    });

    detailIndex.textContent = data.index;
    detailTitle.textContent = data.title;
    detailText.textContent = data.text;
  };

  const stepHitAreas = [...root.querySelectorAll(".map-hit[data-map-step]")];

  stepHitAreas.forEach((hitArea) => {
    /*
      Desktop:
      detail se mění při najetí myší / perem.

      Mobil a dotyková zařízení:
      hover neexistuje, proto krok aktivujeme také při klepnutí.
      pointerdown používáme záměrně, protože viewport mapy používá
      pointer capture kvůli posouvání a klasický click se na některých
      mobilních prohlížečích nemusí vždy doručit přímo SVG hit-area.
    */
    hitArea.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse" || event.pointerType === "pen") {
        selectStep(hitArea.dataset.mapStep);
      }
    });

    hitArea.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch") {
        selectStep(hitArea.dataset.mapStep);
      }
    });

    hitArea.addEventListener("click", () => {
      selectStep(hitArea.dataset.mapStep);
    });
  });

  viewport.addEventListener("keydown", (event) => {
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      zoomAtCenter(1.2);
    } else if (event.key === "-") {
      event.preventDefault();
      zoomAtCenter(0.83);
    } else if (event.key === "0") {
      event.preventDefault();
      fitMap();
    }
  });

  window.addEventListener("resize", fitMap);
  selectStep("1");
  fitMap();
}

/* --------------------------------------------------------------------------
   Interaktivní časová osa — vznik a historie Bitcoinu
   -------------------------------------------------------------------------- */

const historyTimelineEvents = [
  {
    id: "shannon",
    date: "1949-01-01",
    dateLabel: "1949",
    category: "bitcoin",
    title: "Moderní kryptografie",
    description:
      "Claude Shannon položil matematické základy moderní kryptografie a ukázal, jak lze bezpečnost šifer popisovat a analyzovat pomocí matematických principů. Kryptografie je samozřejmě mnohem starší, právě od tohoto období však můžeme sledovat její moderní vývoj, na který později navázaly technologie využité v Bitcoinu."
  },
  {
  id: "dollar-gold",
  date: "1971-08-15",
  dateLabel: "1971",
  category: "context",
  title: "Dolar a zlato",
  description:
    "V srpnu 1971 Spojené státy ukončily směnitelnost amerického dolaru za zlato pro zahraniční měnové autority. Tento krok zásadně narušil fungování brettonwoodského měnového systému a přispěl k přechodu k dnešnímu systému nekrytých měn a plovoucích směnných kurzů."
},
  {
    id: "diffie-hellman",
    date: "1976-01-01",
    dateLabel: "1976",
    category: "bitcoin",
    title: "Veřejný klíč",
    description:
      "Whitfield Diffie a Martin Hellman představili koncept kryptografie s veřejným klíčem, který umožnil bezpečnou komunikaci bez nutnosti předem sdílet tajný klíč. Tento princip otevřel cestu také k digitálním podpisům, které jsou jedním ze základních kryptografických prvků Bitcoinu."
  },
  {
    id: "chaum",
    date: "1982-01-01",
    dateLabel: "1982",
    category: "bitcoin",
    title: "Blind signatures",
    description:
      "David Chaum představil koncept blind signatures, při kterém lze digitálně podepsat data bez znalosti jejich samotného obsahu. Tato myšlenka se později stala základem jeho systémů elektronické hotovosti zaměřených na ochranu soukromí uživatelů."
  },
  {
    id: "internet",
    date: "1983-01-01",
    dateLabel: "1983",
    category: "context",
    title: "Internet / TCP-IP",
    description:
      "Přechod sítě ARPANET na protokoly TCP/IP představuje jeden z klíčových milníků ve vývoji dnešního internetu. Postupně tak vznikala otevřená globální komunikační infrastruktura, bez které by pozdější decentralizované digitální systémy v dnešní podobě nemohly fungovat."
  },
  {
    id: "www",
    date: "1989-03-12",
    dateLabel: "1989",
    category: "context",
    title: "World Wide Web",
    description:
      "Tim Berners-Lee navrhl systém World Wide Web, který zásadně usnadnil publikování, propojování a vyhledávání informací na internetu. Web se v následujících letech stal jedním z hlavních důvodů masového rozšíření internetu mezi běžné uživatele."
  },
  {
    id: "timestamp",
    date: "1991-01-01",
    dateLabel: "1991",
    category: "bitcoin",
    title: "Časová razítka",
    description:
      "Stuart Haber a W. Scott Stornetta popsali způsob kryptografického časového razítkování digitálních dokumentů. Jejich systém umožňoval prokázat existenci dokumentu v určitém čase a současně odhalit jeho případnou dodatečnou změnu; řetězení takových záznamů patří mezi významné předchůdce pozdějšího blockchainu."
  },
  {
    id: "hashcash",
    date: "1997-03-28",
    dateLabel: "1997",
    category: "bitcoin",
    title: "Hashcash",
    description:
      "Adam Back navrhl Hashcash jako mechanismus, který vyžadoval před provedením určité operace vykonání výpočetní práce. Původně měl sloužit především jako ochrana proti spamu, jeho princip proof-of-work však později našel zásadní využití právě v Bitcoinu."
  },
  {
    id: "bmoney",
    date: "1998-11-01",
    dateLabel: "1998",
    category: "bitcoin",
    title: "b-money",
    description:
      "Wei Dai popsal návrh decentralizovaných digitálních peněz fungujících mezi pseudonymními účastníky bez potřeby centrální autority. Přestože b-money nebylo realizováno jako fungující síť, některé jeho myšlenky se později objevily také v návrhu Bitcoinu."
  },
  {
    id: "dotcom",
    date: "2000-03-10",
    dateLabel: "2000",
    category: "context",
    title: "Dot-com krize",
    description:
      "Na přelomu tisíciletí skončilo období mimořádného růstu cen internetových a technologických společností prudkým propadem trhu. Dot-com krize ukázala, že rychlý rozvoj internetu doprovázela nejen technologická transformace, ale také výrazná spekulace a nové ekonomické cykly."
  },
  {
    id: "rpow",
    date: "2004-08-01",
    dateLabel: "2004",
    category: "bitcoin",
    title: "RPOW",
    description:
      "Hal Finney vytvořil systém Reusable Proofs of Work, který umožňoval převádět mezi uživateli digitální tokeny reprezentující již vykonanou výpočetní práci. RPOW představovalo jeden z dalších experimentů na cestě k digitální hodnotě nezávislé na tradičním platebním systému."
  },
  {
    id: "bit-gold",
    date: "2005-01-01",
    dateLabel: "1998–2005",
    category: "bitcoin",
    title: "Bit Gold",
    description:
      "Nick Szabo navrhl koncept Bit Gold, který spojoval proof-of-work, kryptografické řetězení záznamů a vlastnictví digitálních jednotek bez centrálního emitenta. Přestože systém nebyl v navržené podobě realizován, svou konstrukcí se řadí mezi nejvýznamnější předchůdce Bitcoinu."
  },
  {
    id: "iphone",
    date: "2007-01-09",
    dateLabel: "2007",
    category: "context",
    title: "První iPhone",
    description:
      "Apple představil první iPhone, který významně urychlil přesun internetu a digitálních služeb z osobních počítačů do mobilních zařízení. Přístup k internetu se postupně stal běžnou součástí každodenního života prakticky odkudkoliv."
  },
  {
    id: "financial-crisis",
    date: "2008-09-15",
    dateLabel: "2008",
    category: "context",
    title: "Finanční krize",
    description:
      "V roce 2008 vyvrcholila globální finanční krize, která vedla k pádu významných finančních institucí, rozsáhlým státním zásahům a oslabení důvěry ve finanční systém. Ve stejném období byl zveřejněn také návrh Bitcoinu, přesto nelze finanční krizi jednoduše označit za jedinou příčinu jeho vzniku."
  },
  {
    id: "whitepaper",
    date: "2008-10-31",
    dateLabel: "31. 10. 2008",
    category: "bitcoin",
    title: "Bitcoin whitepaper",
    description:
      "Satoshi Nakamoto zveřejnil dokument Bitcoin: A Peer-to-Peer Electronic Cash System, ve kterém popsal návrh decentralizovaného systému elektronických peněz fungujícího bez centrální autority. Bitcoin spojil několik již existujících kryptografických a distribuovaných technologií do jednoho funkčního systému.",
    link: "https://bitcoin.org/bitcoin.pdf",
    linkLabel: "Přečíst whitepaper"
  },
  {
    id: "network-launch",
    date: "2009-01-03",
    dateLabel: "2009",
    category: "bitcoin",
    title: "Spuštění sítě Bitcoinu",
    description:
      "Dne 3. ledna 2009 vytvořil Satoshi Nakamoto Genesis block a tím zahájil fungování bitcoinového blockchainu. O devět dní později odeslal Halovi Finneymu 10 BTC v první známé bitcoinové transakci mezi dvěma uživateli."
  },
  {
    id: "pizza",
    date: "2010-05-22",
    dateLabel: "22. 5. 2010",
    category: "bitcoin",
    title: "Bitcoin Pizza",
    description:
      "Laszlo Hanyecz zaplatil 10 000 BTC za dvě pizzy, čímž vznikla jedna z prvních známých transakcí, při níž byl bitcoin použit k nákupu reálného zboží. Událost se později stala symbolem počátků praktického používání bitcoinu jako prostředku směny."
  },
  {
    id: "satoshi-leaves",
    date: "2011-04-23",
    dateLabel: "2011",
    category: "bitcoin",
    title: "Satoshi odchází",
    description:
      "V průběhu let 2010 a 2011 Satoshi Nakamoto postupně omezil svou veřejnou aktivitu a komunikaci s ostatními vývojáři. Projekt Bitcoin poté pokračoval bez jeho přímého vedení a další vývoj převzala širší komunita."
  }
];


function historyTimelineDateValue(dateString) {
  const [year, month = "01", day = "01"] = dateString
    .split("-")
    .map(Number);

  return Date.UTC(year, month - 1, day);
}


function historyTimelineYear(dateString) {
  return Number(dateString.slice(0, 4));
}


function historyTimelineLongDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Intl.DateTimeFormat("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(Date.UTC(year, month - 1, day)));
}


function initHistoryTimeline() {
  const section = document.querySelector("#history-timeline");
  const shell = document.querySelector("#historyTimelineShell");
  const viewport = document.querySelector("#historyTimelineViewport");
  const canvas = document.querySelector("#historyTimelineCanvas");
  const anchorsLayer = document.querySelector("#historyTimelineAnchors");
  const bitcoinLayer = document.querySelector("#historyTimelineBitcoinEvents");
  const contextLayer = document.querySelector("#historyTimelineContextEvents");
  const prevButton = document.querySelector("#historyTimelinePrev");
  const nextButton = document.querySelector("#historyTimelineNext");
  const filterButtons = document.querySelectorAll("[data-timeline-filter]");


  const detail = document.querySelector("#historyTimelineDetail");
  const detailDate = document.querySelector("#historyTimelineDetailDate");
  const detailCategory = document.querySelector("#historyTimelineDetailCategory");
  const detailTitle = document.querySelector("#historyTimelineDetailTitle");
  const detailText = document.querySelector("#historyTimelineDetailText");
  const detailLink = document.querySelector("#historyTimelineDetailLink");

  if (
    !section ||
    !shell ||
    !viewport ||
    !canvas ||
    !anchorsLayer ||
    !bitcoinLayer ||
    !contextLayer ||
    !detail ||
    !detailDate ||
    !detailCategory ||
    !detailTitle ||
    !detailText ||
    !detailLink
  ) {
    return;
  }

  const sortedEvents = [...historyTimelineEvents].sort(
    (a, b) => historyTimelineDateValue(a.date) - historyTimelineDateValue(b.date)
  );

  if (sortedEvents.length === 0) {
    return;
  }

  /* ------------------------------------------------------------------
     ZÁKLADNÍ NELINEÁRNÍ MAPA ROKŮ
     ------------------------------------------------------------------ */

  const yearsWithEvents = [
    ...new Set(sortedEvents.map((event) => historyTimelineYear(event.date)))
  ].sort((a, b) => a - b);

  const normalPixelsPerYear = 26;
  const minimumEventGap = 118;
  const maximumEventGap = 190;
  const denseEventGap = 142;
  const denseStartYear = 2008;
  const denseEndYear = 2011;
  const baseHorizontalPadding = 145;

  const baseYearPositions = new Map();
  let currentBaseX = baseHorizontalPadding;

  baseYearPositions.set(yearsWithEvents[0], currentBaseX);

  for (let index = 1; index < yearsWithEvents.length; index += 1) {
    const previousYear = yearsWithEvents[index - 1];
    const currentYear = yearsWithEvents[index];
    const yearDifference = currentYear - previousYear;

    const naturalGap =
      yearDifference * normalPixelsPerYear;

    const isDensePeriod =
      currentYear >= denseStartYear &&
      currentYear <= denseEndYear;

    const minimumGap =
      isDensePeriod
        ? denseEventGap
        : minimumEventGap;

    const editorialGap =
      isDensePeriod
        ? Math.max(
            naturalGap,
            minimumGap
          )
        : Math.min(
            maximumEventGap,
            Math.max(
              naturalGap,
              minimumGap
            )
          );

    currentBaseX +=
      editorialGap;

    baseYearPositions.set(currentYear, currentBaseX);
  }

  const baseCanvasWidth =
    currentBaseX + baseHorizontalPadding;


  /* ------------------------------------------------------------------
     RENDER BODY A UDÁLOSTÍ
     ------------------------------------------------------------------ */

  const anchorElements = new Map();

  yearsWithEvents.forEach((year) => {
    const anchor = document.createElement("span");

    anchor.className = "history-timeline-anchor";
    anchor.dataset.timelineYear = String(year);

    anchorsLayer.appendChild(anchor);
    anchorElements.set(year, anchor);
  });


  const eventElements = new Map();

  sortedEvents.forEach((event) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "history-timeline-event";
    button.dataset.timelineId = event.id;
    button.dataset.category = event.category;
    button.dataset.timelineYear = String(historyTimelineYear(event.date));

    button.setAttribute(
      "aria-label",
      `${event.dateLabel || historyTimelineLongDate(event.date)} – ${event.title}`
    );

    button.innerHTML = `
      <span class="history-timeline-event-copy">
        <span class="history-timeline-event-date">${historyTimelineYear(event.date)}</span>
        <span class="history-timeline-event-title">${event.title}</span>
      </span>
    `;

    const targetLayer =
      event.category === "context" ? contextLayer : bitcoinLayer;

    targetLayer.appendChild(button);
    eventElements.set(event.id, button);
  });


  /* ------------------------------------------------------------------
     VÝCHOZÍ MĚŘÍTKO

     Zoom je záměrně odstraněný.

     Na běžném desktopu se celá osa automaticky vměstná do dostupné šířky.
     Na malých displejích by stejné chování udělalo text nečitelný, proto
     tam držíme minimální měřítko a uživatel timeline horizontálně posouvá.
     ------------------------------------------------------------------ */

  let currentScale = 1;

  const placements = {
    bitcoin: [],
    context: []
  };


  function getDefaultScale() {
    if (baseCanvasWidth <= 0) {
      return 1;
    }

    const fitScale =
      Math.min(
        1,
        viewport.clientWidth /
        baseCanvasWidth
      );

    /*
      Desktop:
      celá osa se vejde.

      Tablet / mobil:
      raději necháme část osy mimo viewport, než abychom popisky
      zmenšili natolik, že by přestaly být čitelné.
    */
    if (viewport.clientWidth <= 520) {
      return Math.max(
        fitScale,
        0.52
      );
    }

    if (viewport.clientWidth <= 760) {
      return Math.max(
        fitScale,
        0.48
      );
    }

    return fitScale;
  }


  function getScaledX(year) {
    return (
      baseYearPositions.get(year) ??
      baseHorizontalPadding
    ) * currentScale;
  }


  function chooseLevel(category, x) {
    const levels =
      placements[category];

    const minimumDistance =
      currentScale < 0.78 ? 82 : 116;

    const levelCount =
      currentScale < 0.7 ? 3 : 2;

    for (
      let level = 0;
      level < levelCount;
      level += 1
    ) {
      const lastX =
        levels[level] ?? -Infinity;

      if (
        x - lastX >=
        minimumDistance
      ) {
        levels[level] = x;
        return level;
      }
    }

    let oldestLevel = 0;
    let oldestX =
      levels[0] ?? -Infinity;

    for (
      let level = 1;
      level < levelCount;
      level += 1
    ) {
      const levelX =
        levels[level] ?? -Infinity;

      if (levelX < oldestX) {
        oldestX = levelX;
        oldestLevel = level;
      }
    }

    levels[oldestLevel] = x;
    return oldestLevel;
  }


  function layoutTimeline() {
    currentScale =
      getDefaultScale();

    const scaledCanvasWidth =
      Math.max(
        viewport.clientWidth,
        Math.round(
          baseCanvasWidth *
          currentScale
        )
      );

    canvas.style.setProperty(
      "--timeline-canvas-width",
      `${scaledCanvasWidth}px`
    );

    section.classList.toggle(
      "is-compact",
      currentScale < 0.78
    );

    placements.bitcoin.length = 0;
    placements.context.length = 0;

    anchorElements.forEach(
      (anchor, year) => {
        anchor.style.left =
          `${getScaledX(year)}px`;
      }
    );

    sortedEvents.forEach((event) => {
      const element =
        eventElements.get(event.id);

      if (!element) {
        return;
      }

      const x =
        getScaledX(
          historyTimelineYear(
            event.date
          )
        );

      const level =
        chooseLevel(
          event.category,
          x
        );

      element.style.left =
        `${x}px`;

      element.style.setProperty(
        "--timeline-event-level",
        String(level)
      );
    });
  }


  /* ------------------------------------------------------------------
     DETAIL A AKTIVNÍ UDÁLOST
     ------------------------------------------------------------------ */

  let activeEventId = null;
  let activeFilter = "all";


  function updateDetailPointer(eventElement) {
    if (!eventElement || window.innerWidth <= 520) {
      return;
    }

    const eventRect = eventElement.getBoundingClientRect();
    const detailRect = detail.getBoundingClientRect();

    const rawX =
      eventRect.left +
      eventRect.width / 2 -
      detailRect.left;

    const clampedX = Math.max(
      18,
      Math.min(detailRect.width - 18, rawX)
    );

    detail.style.setProperty(
      "--timeline-detail-pointer-x",
      `${clampedX}px`
    );
  }


  function renderDetail(event, eventElement) {
    if (!event) {
      return;
    }

    detailDate.textContent =
      event.dateLabel || historyTimelineLongDate(event.date);

    detailCategory.textContent =
      event.category === "bitcoin"
        ? "Bitcoin"
        : "Kontext";

    detailTitle.textContent =
      event.title;

    detailText.textContent =
      event.meta
        ? `${event.meta} — ${event.description}`
        : event.description;

    if (event.link) {
      detailLink.hidden = false;
      detailLink.href = event.link;

      detailLink.replaceChildren(
        document.createTextNode(
          event.linkLabel || "související odkaz"
        )
      );

      const externalIcon =
        document.createElement("span");

      externalIcon.setAttribute(
        "aria-hidden",
        "true"
      );

      externalIcon.textContent = "↗";

      detailLink.append(
        " ",
        externalIcon
      );

      if (/^https?:\/\//i.test(event.link)) {
        detailLink.target = "_blank";
        detailLink.rel = "noopener noreferrer";
      } else {
        detailLink.removeAttribute("target");
        detailLink.removeAttribute("rel");
      }
    } else {
      detailLink.hidden = true;
      detailLink.removeAttribute("href");
      detailLink.removeAttribute("target");
      detailLink.removeAttribute("rel");
      detailLink.textContent = "";
    }

    updateDetailPointer(eventElement);
  }


  function centerEvent(eventElement, behavior = "smooth") {
    if (!eventElement) {
      return;
    }

    const targetLeft =
      eventElement.offsetLeft -
      viewport.clientWidth / 2;

    viewport.scrollTo({
      left: Math.max(0, targetLeft),
      behavior
    });
  }


  function selectEvent(eventId, options = {}) {
    const event =
      sortedEvents.find(
        (item) => item.id === eventId
      );

    const eventElement =
      eventElements.get(eventId);

    if (!event || !eventElement) {
      return;
    }

    activeEventId = eventId;

    eventElements.forEach((element, id) => {
      element.classList.toggle(
        "is-active",
        id === activeEventId
      );
    });

    anchorElements.forEach((anchor, year) => {
      anchor.classList.toggle(
        "is-active",
        year === historyTimelineYear(event.date)
      );
    });

    renderDetail(
      event,
      eventElement
    );

    if (options.center === true) {
      centerEvent(
        eventElement,
        options.behavior || "smooth"
      );
    }
  }


  function applyFilter(filter) {
    activeFilter = filter;

    filterButtons.forEach((button) => {
      const isActive =
        button.dataset.timelineFilter === activeFilter;

      button.classList.toggle(
        "is-active",
        isActive
      );

      button.setAttribute(
        "aria-pressed",
        String(isActive)
      );
    });

    eventElements.forEach((element) => {
      const shouldMute =
        activeFilter !== "all" &&
        element.dataset.category !== activeFilter;

      element.classList.toggle(
        "is-muted",
        shouldMute
      );
    });
  }


  eventElements.forEach((element, id) => {
    element.addEventListener("mouseenter", () => {
      if (
        window.matchMedia(
          "(hover: hover) and (pointer: fine)"
        ).matches
      ) {
        selectEvent(id);
      }
    });

    element.addEventListener("focus", () => {
      selectEvent(id);
    });

    element.addEventListener("click", () => {
      selectEvent(
        id,
        { center: true }
      );
    });
  });


  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(
        button.dataset.timelineFilter || "all"
      );
    });
  });


  /* ------------------------------------------------------------------
     BOČNÍ ŠIPKY
     ------------------------------------------------------------------ */

  function scrollTimeline(direction) {
    const distance =
      Math.max(
        300,
        viewport.clientWidth * 0.82
      );

    viewport.scrollBy({
      left: direction * distance,
      behavior: "smooth"
    });
  }


  if (prevButton) {
    prevButton.addEventListener(
      "click",
      () => scrollTimeline(-1)
    );
  }

  if (nextButton) {
    nextButton.addEventListener(
      "click",
      () => scrollTimeline(1)
    );
  }


  function updateScrollControls() {
    const maxScroll =
      viewport.scrollWidth -
      viewport.clientWidth;

    const canScrollLeft =
      viewport.scrollLeft > 3;

    const canScrollRight =
      viewport.scrollLeft < maxScroll - 3;

    shell.classList.toggle(
      "can-scroll-left",
      canScrollLeft
    );

    shell.classList.toggle(
      "can-scroll-right",
      canScrollRight
    );

    if (prevButton) {
      prevButton.disabled =
        !canScrollLeft;
    }

    if (nextButton) {
      nextButton.disabled =
        !canScrollRight;
    }

    const activeElement =
      activeEventId
        ? eventElements.get(activeEventId)
        : null;

    if (activeElement) {
      updateDetailPointer(
        activeElement
      );
    }
  }


  /* ------------------------------------------------------------------
     PLYNULÉ TAŽENÍ MYŠÍ

     Pointermove pouze uloží cílovou hodnotu.
     Skutečný zápis scrollLeft probíhá nejvýše jednou za vykreslovací
     snímek pomocí requestAnimationFrame.
     ------------------------------------------------------------------ */

  let isDragging = false;
  let dragPointerId = null;
  let dragStartX = 0;
  let dragStartScrollLeft = 0;
  let pendingScrollLeft = 0;
  let dragFrameId = null;
  let dragMoved = false;


  function renderDragFrame() {
    dragFrameId = null;

    if (!isDragging) {
      return;
    }

    viewport.scrollLeft =
      pendingScrollLeft;
  }


  viewport.addEventListener(
    "pointerdown",
    (event) => {
      if (
        event.pointerType !== "mouse" ||
        event.button !== 0 ||
        event.target.closest(".history-timeline-event")
      ) {
        return;
      }

      isDragging = true;
      dragMoved = false;
      dragPointerId = event.pointerId;
      dragStartX = event.clientX;
      dragStartScrollLeft = viewport.scrollLeft;
      pendingScrollLeft = viewport.scrollLeft;

      viewport.classList.add(
        "is-dragging"
      );

      viewport.setPointerCapture(
        event.pointerId
      );
    }
  );


  viewport.addEventListener(
    "pointermove",
    (event) => {
      if (
        !isDragging ||
        event.pointerId !== dragPointerId
      ) {
        return;
      }

      const deltaX =
        event.clientX - dragStartX;

      if (Math.abs(deltaX) > 3) {
        dragMoved = true;
      }

      pendingScrollLeft =
        dragStartScrollLeft - deltaX;

      if (dragFrameId === null) {
        dragFrameId =
          window.requestAnimationFrame(
            renderDragFrame
          );
      }
    }
  );


  function stopTimelineDrag(event) {
    if (!isDragging) {
      return;
    }

    if (
      event.pointerId !== undefined &&
      dragPointerId !== null &&
      event.pointerId !== dragPointerId
    ) {
      return;
    }

    isDragging = false;

    viewport.classList.remove(
      "is-dragging"
    );

    if (dragFrameId !== null) {
      window.cancelAnimationFrame(
        dragFrameId
      );

      dragFrameId = null;
    }

    viewport.scrollLeft =
      pendingScrollLeft;

    if (
      dragPointerId !== null &&
      viewport.hasPointerCapture(
        dragPointerId
      )
    ) {
      viewport.releasePointerCapture(
        dragPointerId
      );
    }

    dragPointerId = null;
  }


  viewport.addEventListener(
    "pointerup",
    stopTimelineDrag
  );

  viewport.addEventListener(
    "pointercancel",
    stopTimelineDrag
  );


  /* Klávesové šipky při focusu na viewportu. */
  viewport.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollTimeline(-1);
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollTimeline(1);
      }
    }
  );


  viewport.addEventListener(
    "scroll",
    updateScrollControls,
    { passive: true }
  );


  window.addEventListener(
    "resize",
    () => {
      const oldMaxScroll =
        Math.max(
          0,
          viewport.scrollWidth -
          viewport.clientWidth
        );

      const oldRatio =
        oldMaxScroll > 0
          ? viewport.scrollLeft /
            oldMaxScroll
          : 0;

      layoutTimeline();

      const newMaxScroll =
        Math.max(
          0,
          viewport.scrollWidth -
          viewport.clientWidth
        );

      viewport.scrollLeft =
        oldRatio *
        newMaxScroll;

      updateScrollControls();
    }
  );


  /* ------------------------------------------------------------------
     VÝCHOZÍ STAV
     ------------------------------------------------------------------ */

  applyFilter("all");
  layoutTimeline();

  viewport.scrollLeft = 0;

  const defaultEventId =
    sortedEvents[0]?.id;

  if (defaultEventId) {
    selectEvent(defaultEventId);
  }

  window.requestAnimationFrame(() => {
    viewport.scrollLeft = 0;
    updateScrollControls();
  });
}


/* --------------------------------------------------------------------------
   Přímé odkazy na nadpisy článků
   -------------------------------------------------------------------------- */

function initArticleHeadingLinks() {
  if (!document.body.classList.contains("article-text-page")) {
    return;
  }

  const headings = document.querySelectorAll(
    ".article-content .article-text-section > h2[id]"
  );

  const linkIcon = `
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  `;

  const checkIcon = `
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M5 12.5 9.2 17 19 7"></path>
    </svg>
  `;

  headings.forEach((heading) => {
    if (heading.querySelector(":scope > .article-heading-link")) {
      return;
    }

    const button = document.createElement("button");
    const headingText = heading.textContent.trim();

    button.type = "button";
    button.className = "article-heading-link";
    button.innerHTML = linkIcon;
    button.setAttribute("aria-label", `Zkopírovat odkaz na sekci ${headingText}`);
    button.setAttribute("title", "Zkopírovat odkaz na tuto sekci");

    button.addEventListener("click", async () => {
      const url = new URL(window.location.href);
      url.hash = heading.id;

      if (!(await copyText(url.toString()))) {
        return;
      }

      button.classList.add("is-copied");
      button.innerHTML = checkIcon;
      button.setAttribute("title", "Odkaz zkopírován");

      window.setTimeout(() => {
        button.classList.remove("is-copied");
        button.innerHTML = linkIcon;
        button.setAttribute("title", "Zkopírovat odkaz na tuto sekci");
      }, 1200);
    });

    heading.prepend(button);
  });
}

/* --------------------------------------------------------------------------
   Inicializace
   -------------------------------------------------------------------------- */

renderGlobalHeader();
renderGlobalFooter();
renderBitcoinNavigation();
initHomeRotatingTitle();
initBackToTop();
initSupportCopy();
initBitcoinFlowMap();
initHistoryTimeline();
initArticleHeadingLinks();