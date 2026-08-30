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
  { title: "Úvod", href: "bitcoin/uvod.html" },
  { title: "Vznik a historie", href: "bitcoin/vznik-a-historie.html" },
  { title: "Jak funguje Bitcoin", href: "bitcoin/jak-funguje-bitcoin.html" },
  { title: "Klíče, podpisy a adresy", href: "bitcoin/klice-podpisy-a-adresy.html" },
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

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function createSvgElement(tagName, attributes = {}, text = "") {
  const element = document.createElementNS(SVG_NAMESPACE, tagName);

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, String(value));
  });

  if (text) {
    element.textContent = text;
  }

  return element;
}

function getSiteRootPrefix() {
  const segments = decodeURIComponent(window.location.pathname)
    .split("/")
    .filter(Boolean);

  const sectionIndex = segments.findIndex((segment) =>
    ["bitcoin", "projekt"].includes(segment.toLowerCase())
  );

  if (sectionIndex === -1) {
    return "";
  }

  const lastSegment = segments.at(-1) || "";
  const isFile = /\.[a-z0-9]+$/i.test(lastSegment);
  const currentDirectoryDepth = isFile
    ? segments.length - sectionIndex - 1
    : segments.length - sectionIndex;

  return "../".repeat(Math.max(1, currentDirectoryDepth));
}

function siteHref(path) {
  if (/^(?:[a-z]+:|#|\/)/i.test(path)) {
    return path;
  }

  return `${getSiteRootPrefix()}${path}`;
}

function currentSitePath() {
  const segments = decodeURIComponent(window.location.pathname)
    .split("/")
    .filter(Boolean);

  const sectionIndex = segments.findIndex((segment) =>
    ["bitcoin", "projekt"].includes(segment.toLowerCase())
  );

  if (sectionIndex !== -1) {
    return segments.slice(sectionIndex).join("/").toLowerCase();
  }

  return (segments.at(-1) || "index.html").toLowerCase();
}

function isCurrentSitePath(path) {
  return currentSitePath() === path.replace(/^\/+/, "").toLowerCase();
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
    <a class="brand" href="${siteHref("")}" aria-label="BYTKOJN – úvodní stránka">
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
          href="${siteHref(item.href)}"
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
        <a class="footer-brand" href="${siteHref("")}" aria-label="BYTKOJN – úvodní stránka">
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

function renderBitcoinNavigation() {
  const sidebar = document.querySelector("#sidebar");
  if (!document.body.classList.contains("page-bitcoin") || !sidebar) {
    return;
  }

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

    const active = isCurrentSitePath(item.href);

    return `
      <a
        class="bitcoin-nav-link${active ? " is-active" : ""}"
        href="${siteHref(item.href)}"
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
  const activeItem = navigation?.querySelector(".bitcoin-nav-link.is-active");
  const compactNavigation = window.matchMedia("(max-width: 820px)");

  if (!navigation || !activeItem) {
    return;
  }

  const centerActiveItem = (behavior = "auto") => {
    if (!compactNavigation.matches) {
      return;
    }

    const navigationRect = navigation.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const maxScrollLeft = Math.max(
      0,
      navigation.scrollWidth - navigation.clientWidth
    );

    const targetScrollLeft =
      navigation.scrollLeft +
      (itemRect.left - navigationRect.left) -
      (navigation.clientWidth - itemRect.width) / 2;

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
    // Navigace funguje i bez sessionStorage.
  }

  sidebar.querySelectorAll(".bitcoin-nav-link[href]").forEach((link) => {
    link.addEventListener("click", () => {
      if (!compactNavigation.matches) {
        return;
      }

      try {
        sessionStorage.setItem("bytkojn-bitcoin-nav-center", "1");
      } catch (error) {
        // Navigace funguje i bez sessionStorage.
      }
    });
  });

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      centerActiveItem(smoothCenter ? "smooth" : "auto");
    });
  });

  compactNavigation.addEventListener?.("change", () => {
    centerActiveItem("auto");
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
  const reduceMotion = prefersReducedMotion();
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
    const reduceMotion = prefersReducedMotion();
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
   Interaktivní kontrola a zobrazení hodnoty soukromého klíče
   Platnost se vyhodnocuje odděleně od samotného 256bitového rozsahu.
   -------------------------------------------------------------------------- */


/* --------------------------------------------------------------------------
   Eliptická křivka — ilustrační konečné pole modulo p
   Posuvník používá pouze malé prvočíselné moduly. Skutečné p secp256k1
   je pevné a v této ukázce se nemění.
   -------------------------------------------------------------------------- */

function initEllipticCurveFieldDemo() {
  const root = document.querySelector("[data-finite-field-demo]");

  if (!root) {
    return;
  }

  const slider = root.querySelector("[data-finite-field-slider]");
  const svg = root.querySelector("[data-finite-field-svg]");
  const pointsLayer = root.querySelector("[data-finite-field-points]");
  const scalePositionOutput = root.querySelector("[data-finite-field-scale-position]");
  const ticksLayer = root.querySelector("[data-finite-field-ticks]");

  if (
    !slider ||
    !svg ||
    !pointsLayer ||
    !scalePositionOutput ||
    !ticksLayer
  ) {
    return;
  }

  /*
    Pouze šest názorných úrovní.
    "visualPoints" je počet teček zobrazených v grafu, nikoli skutečný
    počet bodů celé křivky. Hodnota je záměrně nastavena tak, aby každá
    další úroveň byla na první pohled výrazně hustší než předchozí.
  */
  const levels = [
    {
      p: 5n,
      label: "5",
      htmlLabel: "5",
      visualPoints: 5
    },
    {
      p: 47n,
      label: "47",
      htmlLabel: "47",
      visualPoints: 30
    },
    {
      p: 2503n,
      label: "2 503",
      htmlLabel: "2&nbsp;503",
      visualPoints: 160
    },
    {
      p: 2147483647n,
      label: "2,15 × 10⁹",
      htmlLabel: "2,15 × 10<sup>9</sup>",
      visualPoints: 420
    },
    {
      p: 170141183460469231731687303715884105727n,
      label: "1,70 × 10³⁸",
      htmlLabel: "1,70 × 10<sup>38</sup>",
      visualPoints: 850
    },
    {
      p: 115792089237316195423570985008687907853269984665640564039457584007908834671663n,
      label: "2²⁵⁶ − 2³² − 977",
      htmlLabel: "2<sup>256</sup> − 2<sup>32</sup> − 977",
      visualPoints: 1500,
      secp256k1: true
    }
  ];

  const viewBoxSize = 600;
  const padding = 48;
  const usableSize = viewBoxSize - 2 * padding;
  const exactLimit = 2503n;
  const cache = new Map();

  const ratioToNumber = (value, modulus) => {
    const scale = 1000000n;
    return Number((value * scale) / (modulus - 1n)) / Number(scale);
  };

  const modPow = (base, exponent, modulus) => {
    let result = 1n;
    let value = base % modulus;
    let power = exponent;

    while (power > 0n) {
      if (power & 1n) {
        result = (result * value) % modulus;
      }

      value = (value * value) % modulus;
      power >>= 1n;
    }

    return result;
  };

  const findAllPoints = (pBigInt) => {
    const p = Number(pBigInt);
    const roots = Array.from({ length: p }, () => []);

    for (let y = 0; y < p; y += 1) {
      roots[(y * y) % p].push(y);
    }

    const points = [];

    for (let x = 0; x < p; x += 1) {
      const rightSide = ((x * x * x) + 7) % p;

      roots[rightSide].forEach((y) => {
        points.push({
          xRatio: x / (p - 1),
          yRatio: y / (p - 1)
        });
      });
    }

    return points;
  };

  /*
    Pro velmi velká p vybíráme pouze vzorek platných řešení rovnice.
    Použitá velká prvočísla mají p ≡ 3 (mod 4), takže lze pro vybrané x
    efektivně dopočítat modulární odmocninu y.
  */
  const sampleCurvePoints = (p, targetPoints) => {
    const points = [];
    const exponent = (p + 1n) / 4n;
    const multiplier = 6364136223846793005n;
    const increment = 1442695040888963407n;

    let state = 1n;
    let attempts = 0;
    const maxAttempts = targetPoints * 14;

    while (points.length < targetPoints && attempts < maxAttempts) {
      state = (state * multiplier + increment) % p;

      const x = state;
      const rightSide = ((x * x % p) * x + 7n) % p;
      const y = modPow(rightSide, exponent, p);

      if ((y * y) % p === rightSide) {
        points.push({
          xRatio: ratioToNumber(x, p),
          yRatio: ratioToNumber(y, p)
        });

        if (y !== 0n && points.length < targetPoints) {
          points.push({
            xRatio: ratioToNumber(x, p),
            yRatio: ratioToNumber(p - y, p)
          });
        }
      }

      attempts += 1;
    }

    return points;
  };

  const evenlyDownsample = (points, targetCount) => {
    if (points.length <= targetCount) {
      return points;
    }

    const sampled = [];

    for (let index = 0; index < targetCount; index += 1) {
      const sourceIndex = Math.round(
        (index * (points.length - 1)) / (targetCount - 1)
      );

      sampled.push(points[sourceIndex]);
    }

    return sampled;
  };

  const getPoints = (level) => {
    const key = `${level.p.toString()}:${level.visualPoints}`;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const pool =
      level.p <= exactLimit
        ? findAllPoints(level.p)
        : sampleCurvePoints(level.p, level.visualPoints);

    const points = evenlyDownsample(pool, level.visualPoints);

    cache.set(key, points);
    return points;
  };

  const pointRadius = (count) => {
    if (count <= 5) return 5;
    if (count <= 30) return 3.7;
    if (count <= 160) return 2.5;
    if (count <= 420) return 1.9;
    if (count <= 850) return 1.5;
    return 1.2;
  };


  const renderTicks = () => {
    const fragment = document.createDocumentFragment();

    levels.forEach((level, index) => {
      const tick = document.createElement("span");
      tick.className = "finite-field-slider-tick";

      if (index === 0 || index === levels.length - 1) {
        tick.classList.add("is-major");
      }

      tick.style.left = `${(index / (levels.length - 1)) * 100}%`;
      fragment.appendChild(tick);
    });

    ticksLayer.replaceChildren(fragment);
  };

  const render = (level, index) => {
    const points = getPoints(level);
    const fragment = document.createDocumentFragment();
    const radius = pointRadius(points.length);

    points.forEach((point) => {
      const cx = padding + point.xRatio * usableSize;
      const cy = viewBoxSize - padding - point.yRatio * usableSize;
      const circle = createSvgElement("circle", {
        cx: cx.toFixed(2),
        cy: cy.toFixed(2),
        r: radius
      });

      fragment.appendChild(circle);
    });

    pointsLayer.replaceChildren(fragment);

    const pText = level.secp256k1
      ? "p = 2²⁵⁶ − 2³² − 977"
      : `p = ${level.label}`;

    const pHtml = `<span class="math-inline"><var>p</var> = ${level.htmlLabel ?? level.label}</span>`;

    scalePositionOutput.innerHTML = pHtml;

    svg.setAttribute(
      "aria-label",
      `${pText}; názorná vizualizace bodů eliptické křivky`
    );
  };

  const updateProgress = (index) => {
    const progress = (index / (levels.length - 1)) * 100;
    slider.style.setProperty("--finite-field-progress", `${progress}%`);
  };

  slider.addEventListener("input", () => {
    const index = Math.max(
      0,
      Math.min(levels.length - 1, Number(slider.value))
    );

    updateProgress(index);
    render(levels[index], index);
  });

  renderTicks();

  const defaultIndex = 1;

  slider.value = String(defaultIndex);
  updateProgress(defaultIndex);
  render(levels[defaultIndex], defaultIndex);
}


/* --------------------------------------------------------------------------
   Veřejný klíč — malý výukový příklad skalárního násobení
   p = 17, G = (6, 6), k = 1 ... 5.
   Ukázka není secp256k1 parametricky; používá stejná algebraická pravidla
   na malých číslech, aby bylo možné zobrazit všechny body i ruční výpočet.
   -------------------------------------------------------------------------- */

function initPublicKeyDerivationDemo() {
  const root = document.querySelector("[data-public-key-derivation-demo]");

  if (!root) {
    return;
  }

  const svg = root.querySelector("[data-public-key-demo-svg]");
  const gridLayer = root.querySelector("[data-public-key-demo-grid]");
  const pointsLayer = root.querySelector("[data-public-key-demo-points]");
  const multiplesLayer = root.querySelector("[data-public-key-demo-multiples]");
  let constructionLayer = root.querySelector("[data-public-key-demo-construction]");
  const slider = root.querySelector("[data-public-key-demo-slider]");
  const sequence = root.querySelector("[data-public-key-demo-sequence]");
  const calculation = root.querySelector("[data-public-key-demo-calculation]");

  if (
    !svg ||
    !gridLayer ||
    !pointsLayer ||
    !multiplesLayer ||
    !slider ||
    !sequence ||
    !calculation
  ) {
    return;
  }

  const p = 17;
  const G = { x: 6, y: 6 };
  const size = 600;
  const padding = 52;
  const usable = size - 2 * padding;

  const mod = (value) => ((value % p) + p) % p;

  const inverse = (value) => {
    const normalized = mod(value);

    for (let candidate = 1; candidate < p; candidate += 1) {
      if (mod(normalized * candidate) === 1) {
        return candidate;
      }
    }

    throw new Error(`Modulární inverze pro ${value} modulo ${p} neexistuje.`);
  };

  const addPoints = (first, second) => {
    if (!first) return second;
    if (!second) return first;

    const xP = first.x;
    const yP = first.y;
    const xQ = second.x;
    const yQ = second.y;

    if (xP === xQ && mod(yP + yQ) === 0) {
      return null;
    }

    let m;

    if (xP === xQ && yP === yQ) {
      m = mod((3 * xP * xP) * inverse(2 * yP));
    } else {
      m = mod((yQ - yP) * inverse(xQ - xP));
    }

    const xR = mod(m * m - xP - xQ);
    const yR = mod(m * (xP - xR) - yP);

    return { x: xR, y: yR };
  };

  const multiplyPoint = (scalar) => {
    let result = null;

    for (let index = 0; index < scalar; index += 1) {
      result = addPoints(result, G);
    }

    return result;
  };

  const allCurvePoints = [];

  for (let x = 0; x < p; x += 1) {
    for (let y = 0; y < p; y += 1) {
      if (mod(y * y) === mod(x * x * x + 7)) {
        allCurvePoints.push({ x, y });
      }
    }
  }

  if (!constructionLayer) {
    constructionLayer = createSvgElement("g", { class: "public-key-demo-construction" });
    constructionLayer.setAttribute("data-public-key-demo-construction", "");
    svg.insertBefore(constructionLayer, multiplesLayer);
  }

  const toSvg = (point) => ({
    x: padding + (point.x / (p - 1)) * usable,
    y: size - padding - (point.y / (p - 1)) * usable
  });

  const fractionHtml = (numerator, denominator) => `
    <span class="math-frac">
      <span class="math-frac-num">${numerator}</span>
      <span class="math-frac-den">${denominator}</span>
    </span>
  `;

  const mathVar = (symbol) => `<var>${symbol}</var>`;
  const pointName = (scalar) => (scalar === 1 ? "G" : `${scalar}G`);
  const pointNameHtml = (scalar) =>
    scalar === 1 ? mathVar("G") : `${scalar}${mathVar("G")}`;

  const renderGrid = () => {
    const fragment = document.createDocumentFragment();
    const ticks = [0, 4, 8, 12, 16];

    ticks.forEach((value) => {
      const x = padding + (value / (p - 1)) * usable;
      const y = size - padding - (value / (p - 1)) * usable;

      fragment.appendChild(
        createSvgElement("line", {
          x1: x,
          x2: x,
          y1: padding,
          y2: size - padding,
          class: value === 0 ? "is-axis" : ""
        })
      );

      fragment.appendChild(
        createSvgElement("line", {
          x1: padding,
          x2: size - padding,
          y1: y,
          y2: y,
          class: value === 0 ? "is-axis" : ""
        })
      );

      const xLabel = createSvgElement("text", {
        x,
        y: size - 25,
        "text-anchor": "middle"
      });
      xLabel.textContent = String(value);
      fragment.appendChild(xLabel);

      const yLabel = createSvgElement("text", {
        x: 35,
        y: y + 4,
        "text-anchor": "end"
      });
      yLabel.textContent = String(value);
      fragment.appendChild(yLabel);
    });

    const xAxis = createSvgElement("text", {
      x: size - 24,
      y: size - 25,
      "text-anchor": "end",
      class: "is-axis-variable"
    });
    xAxis.textContent = "x";
    fragment.appendChild(xAxis);

    const yAxis = createSvgElement("text", {
      x: 34,
      y: 28,
      "text-anchor": "end",
      class: "is-axis-variable"
    });
    yAxis.textContent = "y";
    fragment.appendChild(yAxis);

    gridLayer.replaceChildren(fragment);
  };

  const renderAllPoints = () => {
    const fragment = document.createDocumentFragment();

    allCurvePoints.forEach((point) => {
      const position = toSvg(point);

      fragment.appendChild(
        createSvgElement("circle", {
          cx: position.x.toFixed(2),
          cy: position.y.toFixed(2),
          r: 6
        })
      );
    });

    pointsLayer.replaceChildren(fragment);
  };

  const renderConstruction = (scalar) => {
    const fragment = document.createDocumentFragment();

    if (scalar <= 1) {
      constructionLayer.replaceChildren();
      return;
    }

    /*
      Nezobrazujeme pouze body použité v právě počítané rovnici.
      Graf má ukazovat celou postupně vznikající cestu skalárního násobení:

          G → 2G → 3G → ... → kG

      Každý další krok proto přidá jeden nový úsek mezi dvěma po sobě
      jdoucími násobky G. Poslední úsek je zvýrazněný a krátce se dokreslí.
    */
    for (let value = 2; value <= scalar; value += 1) {
      const previousPoint = multiplyPoint(value - 1);
      const currentPoint = multiplyPoint(value);

      if (!previousPoint || !currentPoint) {
        continue;
      }

      const start = toSvg(previousPoint);
      const end = toSvg(currentPoint);
      const isCurrentSegment = value === scalar;

      fragment.appendChild(
        createSvgElement("line", {
          x1: start.x.toFixed(2),
          y1: start.y.toFixed(2),
          x2: end.x.toFixed(2),
          y2: end.y.toFixed(2),
          pathLength: 1,
          class: isCurrentSegment
            ? "is-multiplication-path is-current-segment"
            : "is-multiplication-path is-previous-segment"
        })
      );
    }

    constructionLayer.replaceChildren(fragment);
  };

  const multipleLabelPlacement = (value, isCurrent) => {
    const text = isCurrent ? `${pointName(value)} (${multiplyPoint(value).x}, ${multiplyPoint(value).y})` : pointName(value);

    switch (value) {
      case 2:
        return {
          dx: 10,
          dy: 26,
          anchor: "start",
          text
        };
      case 3:
        return {
          dx: -14,
          dy: -10,
          anchor: "end",
          text
        };
      case 4:
        return {
          dx: 0,
          dy: 34,
          anchor: "middle",
          text
        };
      case 5:
        return {
          dx: 12,
          dy: 18,
          anchor: "start",
          text
        };
      default:
        return {
          dx: 14,
          dy: -13,
          anchor: "start",
          text
        };
    }
  };

  const renderMultiples = (scalar) => {
    const fragment = document.createDocumentFragment();

    for (let value = 1; value <= scalar; value += 1) {
      const point = multiplyPoint(value);

      if (!point) {
        continue;
      }

      const position = toSvg(point);
      const isCurrent = value === scalar;
      const isGenerator = value === 1;

      fragment.appendChild(
        createSvgElement("circle", {
          cx: position.x.toFixed(2),
          cy: position.y.toFixed(2),
          r: isCurrent ? 12 : isGenerator ? 10 : 7,
          class: isCurrent
            ? "is-current"
            : isGenerator
              ? "is-generator"
              : "is-previous"
        })
      );

      const placement = multipleLabelPlacement(value, isCurrent || isGenerator);

      const label = createSvgElement("text", {
        x: (position.x + placement.dx).toFixed(2),
        y: (position.y + placement.dy).toFixed(2),
        "text-anchor": placement.anchor,
        class: isCurrent
          ? "is-current-label"
          : isGenerator
            ? "is-generator-label"
            : ""
      });

      label.textContent = placement.text;
      fragment.appendChild(label);
    }

    multiplesLayer.replaceChildren(fragment);
  };

  const renderSequence = (scalar) => {
    const fragment = document.createDocumentFragment();

    for (let value = 1; value <= 5; value += 1) {
      const point = multiplyPoint(value);
      const item = document.createElement("span");
      item.className = "public-key-demo-slider-label";

      if (value < scalar) item.classList.add("is-reached");
      if (value === scalar) item.classList.add("is-current");

      item.innerHTML = `
        <strong>${pointNameHtml(value)}</strong>
        <span class="math-inline">(${point.x}, ${point.y})</span>
      `;
      fragment.appendChild(item);
    }

    sequence.replaceChildren(fragment);
  };

  const renderCalculationRow = (title, math, note = "") => `
    <div class="public-key-demo-calc-row">
      <div>
        <b>${title}</b>
        <div class="public-key-demo-calc-math">${math}</div>
        ${note ? `<small>${note}</small>` : ""}
      </div>
    </div>
  `;

  const calculationForOne = () => {
    const R = G;

    return `
      <div class="public-key-demo-calc-title">
        <span>Krok 1 / 5</span>
        <strong>${mathVar("G")}</strong>
      </div>

      ${renderCalculationRow(
        "Výchozí generátorový bod",
        `${mathVar("G")} = (6, 6)`,
        "První člen posloupnosti je přímo zadaný generátorový bod."
      )}

      ${renderCalculationRow(
        "Kontrola bodu v rovnici",
        `6<sup>2</sup> = 36 ≡ 2 &nbsp;&nbsp; a &nbsp;&nbsp; 6<sup>3</sup> + 7 = 223 ≡ 2 (mod 17)`
      )}

      <div class="public-key-demo-calc-result">
        <span>výsledek</span>
        <strong>${mathVar("G")} = (${R.x}, ${R.y})</strong>
      </div>
    `;
  };

  const calculationForTwo = () => {
    const P = G;
    const R = multiplyPoint(2);

    const numerator = 3 * P.x * P.x;
    const denominator = 2 * P.y;
    const denominatorInverse = inverse(denominator);
    const m = mod(numerator * denominatorInverse);

    const xRaw = m * m - P.x - P.x;
    const yRaw = m * (P.x - R.x) - P.y;

    return `
      <div class="public-key-demo-calc-title">
        <span>Krok 2 / 5 · zdvojení bodu</span>
        <strong>2${mathVar("G")} = ${mathVar("G")} + ${mathVar("G")}</strong>
      </div>

      <div class="public-key-demo-calc-context">
        <span class="math-inline">${mathVar("P")} = ${mathVar("Q")} = ${mathVar("G")} = (${P.x}, ${P.y})</span>
      </div>

      ${renderCalculationRow(
        "Směrnice",
        `${mathVar("m")} ≡ ${fractionHtml(
          `3 · ${P.x}<sup>2</sup>`,
          `2 · ${P.y}`
        )} ≡ ${numerator} · ${denominator}<sup>−1</sup> ≡ ${numerator} · ${denominatorInverse} ≡ ${m} (mod 17)`,
        `${denominator}<sup>−1</sup> ≡ ${denominatorInverse} (mod 17).`
      )}

      ${renderCalculationRow(
        "x-ová souřadnice",
        `${mathVar("x")}<sub><var>R</var></sub> ≡ ${m}<sup>2</sup> − ${P.x} − ${P.x} = ${xRaw} ≡ ${R.x} (mod 17)`
      )}

      ${renderCalculationRow(
        "y-ová souřadnice",
        `${mathVar("y")}<sub><var>R</var></sub> ≡ ${m}(${P.x} − ${R.x}) − ${P.y} = ${yRaw} ≡ ${R.y} (mod 17)`
      )}

      <div class="public-key-demo-calc-result">
        <span>výsledek</span>
        <strong>2${mathVar("G")} = (${R.x}, ${R.y})</strong>
      </div>
    `;
  };

  const calculationForAddition = (scalar) => {
    const P = multiplyPoint(scalar - 1);
    const Q = G;
    const R = multiplyPoint(scalar);

    const numeratorRaw = Q.y - P.y;
    const denominatorRaw = Q.x - P.x;
    const numerator = mod(numeratorRaw);
    const denominator = mod(denominatorRaw);
    const denominatorInverse = inverse(denominator);
    const m = mod(numerator * denominatorInverse);

    const xRaw = m * m - P.x - Q.x;
    const yRaw = m * (P.x - R.x) - P.y;

    return `
      <div class="public-key-demo-calc-title">
        <span>Krok ${scalar} / 5 · součet různých bodů</span>
        <strong>${scalar}${mathVar("G")} = ${scalar - 1}${mathVar("G")} + ${mathVar("G")}</strong>
      </div>

      <div class="public-key-demo-calc-context">
        <span class="math-inline">${mathVar("P")} = ${scalar - 1}${mathVar("G")} = (${P.x}, ${P.y})</span>
        <span class="math-inline">${mathVar("Q")} = ${mathVar("G")} = (${Q.x}, ${Q.y})</span>
      </div>

      ${renderCalculationRow(
        "Směrnice",
        `${mathVar("m")} ≡ ${fractionHtml(
          `${Q.y} − ${P.y}`,
          `${Q.x} − ${P.x}`
        )} ≡ ${numerator} · ${denominator}<sup>−1</sup> ≡ ${numerator} · ${denominatorInverse} ≡ ${m} (mod 17)`,
        `${denominator}<sup>−1</sup> ≡ ${denominatorInverse} (mod 17).`
      )}

      ${renderCalculationRow(
        "x-ová souřadnice",
        `${mathVar("x")}<sub><var>R</var></sub> ≡ ${m}<sup>2</sup> − ${P.x} − ${Q.x} = ${xRaw} ≡ ${R.x} (mod 17)`
      )}

      ${renderCalculationRow(
        "y-ová souřadnice",
        `${mathVar("y")}<sub><var>R</var></sub> ≡ ${m}(${P.x} − ${R.x}) − ${P.y} = ${yRaw} ≡ ${R.y} (mod 17)`
      )}

      <div class="public-key-demo-calc-result">
        <span>výsledek</span>
        <strong>${scalar}${mathVar("G")} = (${R.x}, ${R.y})${scalar === 5 ? ` = ${mathVar("K")}` : ""}</strong>
      </div>
    `;
  };

  const renderCalculation = (scalar) => {
    if (scalar === 1) {
      calculation.innerHTML = calculationForOne();
      return;
    }

    if (scalar === 2) {
      calculation.innerHTML = calculationForTwo();
      return;
    }

    calculation.innerHTML = calculationForAddition(scalar);
  };

  const update = () => {
    const scalar = Math.max(1, Math.min(5, Number(slider.value)));
    const point = multiplyPoint(scalar);
    const progress = ((scalar - 1) / 4) * 100;

    slider.style.setProperty("--public-key-demo-progress", `${progress}%`);

    renderConstruction(scalar);
    renderMultiples(scalar);
    renderSequence(scalar);
    renderCalculation(scalar);

    svg.setAttribute(
      "aria-label",
      `Ilustrační křivka modulo 17; G = (6, 6); zobrazený krok ${pointName(scalar)} = (${point.x}, ${point.y})`
    );
  };

  slider.addEventListener("input", update);

  renderGrid();
  renderAllPoints();
  update();
}



/* --------------------------------------------------------------------------
   Eliptická křivka — interaktivní geometrie nad reálnými čísly
   y² = x³ + 7

   data-ec-mode="double":
   bod P lze táhnout po křivce; přepočítává se tečna, třetí průsečík
   a výsledný bod 2P.

   data-ec-mode="add":
   body P a Q lze táhnout nezávisle; přepočítává se jejich spojnice,
   třetí průsečík a výsledný bod R = P + Q.

   Jde pouze o geometrickou ilustraci nad reálnými čísly. Skutečné
   výpočty secp256k1 probíhají v konečném poli modulo p.
   -------------------------------------------------------------------------- */

function initEllipticCurveGeometryDemo() {
  const roots = [...document.querySelectorAll(".ec-interactive[data-ec-mode]")];

  if (!roots.length) {
    return;
  }

  const compactGeometry = window.matchMedia("(max-width: 560px)").matches;

  const viewWidth = compactGeometry ? 520 : 700;
  const viewHeight = compactGeometry ? 334 : 450;

  const world = {
    xMin: -2.05,
    xMax: 5,
    yMin: -7.5,
    yMax: 7.5
  };

  const dragLimits = {
    xMin: -1.55,
    xMax: 3.55,
    minimumSeparation: 0.10
  };

  const margin = compactGeometry
    ? {
        left: 16,
        right: 16,
        top: 14,
        bottom: 14
      }
    : {
        left: 26,
        right: 26,
        top: 22,
        bottom: 22
      };

  const plotWidth = viewWidth - margin.left - margin.right;
  const plotHeight = viewHeight - margin.top - margin.bottom;

  const curveY = (x) => {
    const value = x * x * x + 7;
    return value >= 0 ? Math.sqrt(value) : Number.NaN;
  };

  const toSvgX = (x) =>
    margin.left +
    ((x - world.xMin) / (world.xMax - world.xMin)) *
      plotWidth;

  const toSvgY = (y) =>
    margin.top +
    ((world.yMax - y) / (world.yMax - world.yMin)) *
      plotHeight;

  const toWorldX = (svgX) =>
    world.xMin +
    ((svgX - margin.left) / plotWidth) *
      (world.xMax - world.xMin);

  const createCurvePath = (sign) => {
    const curveStart = Math.cbrt(-7) + 0.0005;
    const steps = 520;
    let path = "";

    for (let index = 0; index <= steps; index += 1) {
      const x =
        curveStart +
        ((world.xMax - curveStart) * index) /
          steps;

      const y = sign * curveY(x);

      path +=
        `${index === 0 ? "M" : "L"}` +
        `${toSvgX(x).toFixed(2)},${toSvgY(y).toFixed(2)} `;
    }

    return path.trim();
  };

  const doublePoint = (point) => {
    const slope =
      (3 * point.x * point.x) /
      (2 * point.y);

    const resultX =
      slope * slope -
      2 * point.x;

    const resultY =
      slope * (point.x - resultX) -
      point.y;

    return {
      slope,
      thirdIntersection: {
        x: resultX,
        y: -resultY
      },
      result: {
        x: resultX,
        y: resultY
      }
    };
  };

  const addPoints = (first, second) => {
    const slope =
      (second.y - first.y) /
      (second.x - first.x);

    const resultX =
      slope * slope -
      first.x -
      second.x;

    const resultY =
      slope * (first.x - resultX) -
      first.y;

    return {
      slope,
      thirdIntersection: {
        x: resultX,
        y: -resultY
      },
      result: {
        x: resultX,
        y: resultY
      }
    };
  };

  const isVisiblePoint = (point) =>
    Number.isFinite(point.x) &&
    Number.isFinite(point.y) &&
    point.x >= world.xMin &&
    point.x <= world.xMax &&
    point.y >= world.yMin &&
    point.y <= world.yMax;

  const formatNumber = (value) => {
    if (!Number.isFinite(value)) {
      return "—";
    }

    const normalized =
      Math.abs(value) < 0.005
        ? 0
        : value;

    return normalized.toFixed(2);
  };

  roots.forEach((root, rootIndex) => {
    const svg =
      root.querySelector(".ec-interactive-svg");

    const readout =
      root.querySelector(".ec-interactive-readout");

    if (!svg || !readout) {
      return;
    }

    const mode =
      root.dataset.ecMode;

    const showCoordinates =
      root.hasAttribute("data-ec-coordinates");

    if (mode !== "double" && mode !== "add") {
      return;
    }

    const clipId =
      `ec-geometry-clip-${rootIndex + 1}`;

    let pointPX =
      Number(root.dataset.pX || 3);

    let pointQX =
      Number(root.dataset.qX || 3.5);

    let activeHandle = null;
    let activePointerId = null;

    svg.setAttribute(
      "viewBox",
      `0 0 ${viewWidth} ${viewHeight}`
    );

    svg.setAttribute(
      "preserveAspectRatio",
      "xMidYMid meet"
    );

    const pointOnCurve = (x) => ({
      x,
      y: curveY(x)
    });

    const appendText = (
      parent,
      point,
      label,
      className,
      anchor = "start"
    ) => {
      parent.appendChild(
        createSvgElement(
          "text",
          {
            x: toSvgX(point.x),
            y: toSvgY(point.y),
            class: className,
            "text-anchor": anchor
          },
          label
        )
      );
    };

    const appendPointCircle = (
      parent,
      point,
      className,
      handle = ""
    ) => {
      if (!isVisiblePoint(point)) {
        return null;
      }

      const circle =
        createSvgElement("circle", {
          cx: toSvgX(point.x),
          cy: toSvgY(point.y),
          r: handle
            ? compactGeometry
              ? 9
              : 7
            : compactGeometry
              ? 8
              : 6,
          class:
            `ec-point ${className}` +
            `${handle ? " ec-point-handle" : ""}`
        });

      if (handle) {
        circle.dataset.handle = handle;
        circle.setAttribute("tabindex", "0");
        circle.setAttribute("role", "slider");
        circle.setAttribute(
          "aria-label",
          `Bod ${handle}; táhni jej po eliptické křivce.`
        );
        circle.setAttribute(
          "aria-valuemin",
          String(dragLimits.xMin)
        );
        circle.setAttribute(
          "aria-valuemax",
          String(dragLimits.xMax)
        );
        circle.setAttribute(
          "aria-valuenow",
          point.x.toFixed(2)
        );
      }

      parent.appendChild(circle);
      return circle;
    };

    const boxesOverlap = (
      first,
      second,
      padding = 0
    ) =>
      !(
        first.right + padding <
          second.left ||
        first.left - padding >
          second.right ||
        first.bottom + padding <
          second.top ||
        first.top - padding >
          second.bottom
      );

    const pointToSegmentDistance = (
      pointX,
      pointY,
      x1,
      y1,
      x2,
      y2
    ) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const lengthSquared =
        dx * dx + dy * dy;

      if (lengthSquared === 0) {
        return Math.hypot(
          pointX - x1,
          pointY - y1
        );
      }

      const t =
        clamp(
          (
            (pointX - x1) * dx +
            (pointY - y1) * dy
          ) / lengthSquared,
          0,
          1
        );

      const nearestX =
        x1 + t * dx;

      const nearestY =
        y1 + t * dy;

      return Math.hypot(
        pointX - nearestX,
        pointY - nearestY
      );
    };

    const appendPointLabel = (
      parent,
      pointInfo,
      allPointInfos,
      placedLabelBoxes,
      constructionLine
    ) => {
      const { point, label, className } =
        pointInfo;

      if (!isVisiblePoint(point)) {
        return;
      }

      const pointX =
        toSvgX(point.x);

      const pointY =
        toSvgY(point.y);

      const estimatedWidth =
        Math.max(
          compactGeometry ? 18 : 12,
          label.length * (compactGeometry ? 11 : 8)
        );

      const estimatedHeight =
        compactGeometry ? 20 : 14;

      const candidates =
        label === "−R"
          ? [
              {
                dx: 0,
                dy: 24,
                anchor: "middle"
              },
              {
                dx: 14,
                dy: 22,
                anchor: "start"
              },
              {
                dx: -14,
                dy: 22,
                anchor: "end"
              }
            ]
          : [
              {
                dx: 12,
                dy: -12,
                anchor: "start"
              },
              {
                dx: -12,
                dy: -12,
                anchor: "end"
              },
              {
                dx: 12,
                dy: 18,
                anchor: "start"
              },
              {
                dx: -12,
                dy: 18,
                anchor: "end"
              },
              {
                dx: 15,
                dy: 4,
                anchor: "start"
              },
              {
                dx: -15,
                dy: 4,
                anchor: "end"
              }
            ];

      let bestCandidate =
        candidates[0];

      let bestBox = null;
      let bestScore = Infinity;

      candidates.forEach(
        (candidate, index) => {
          const textX =
            pointX + candidate.dx;

          const baselineY =
            pointY + candidate.dy;

          const left =
            candidate.anchor === "end"
              ? textX -
                estimatedWidth
              : textX;

          const right =
            candidate.anchor === "end"
              ? textX
              : textX +
                estimatedWidth;

          const top =
            baselineY -
            estimatedHeight +
            2;

          const bottom =
            baselineY + 3;

          const box = {
            left,
            right,
            top,
            bottom
          };

          let score = index * 0.15;

          if (
            left < margin.left + 4 ||
            right >
              viewWidth -
                margin.right -
                4 ||
            top < margin.top + 4 ||
            bottom >
              viewHeight -
                margin.bottom -
                4
          ) {
            score += 1000;
          }

          allPointInfos.forEach(
            (otherInfo) => {
              if (
                otherInfo === pointInfo ||
                !isVisiblePoint(
                  otherInfo.point
                )
              ) {
                return;
              }

              const otherX =
                toSvgX(
                  otherInfo.point.x
                );

              const otherY =
                toSvgY(
                  otherInfo.point.y
                );

              const pointBox = {
                left: otherX - 10,
                right: otherX + 10,
                top: otherY - 10,
                bottom: otherY + 10
              };

              if (
                boxesOverlap(
                  box,
                  pointBox,
                  3
                )
              ) {
                score += 500;
              }
            }
          );

          placedLabelBoxes.forEach(
            (placedBox) => {
              if (
                boxesOverlap(
                  box,
                  placedBox,
                  3
                )
              ) {
                score += 800;
              }
            }
          );

          const centerX =
            (left + right) / 2;

          const centerY =
            (top + bottom) / 2;

          if (constructionLine) {
            const distanceToLine =
              pointToSegmentDistance(
                centerX,
                centerY,
                constructionLine.x1,
                constructionLine.y1,
                constructionLine.x2,
                constructionLine.y2
              );

            if (
              distanceToLine < 10
            ) {
              score +=
                (10 -
                  distanceToLine) *
                18;
            }
          }

          const worldXAtLabel =
            toWorldX(centerX);

          const curveValue =
            curveY(worldXAtLabel);

          if (
            Number.isFinite(
              curveValue
            )
          ) {
            const upperCurveY =
              toSvgY(curveValue);

            const lowerCurveY =
              toSvgY(-curveValue);

            const distanceToCurve =
              Math.min(
                Math.abs(
                  centerY -
                    upperCurveY
                ),
                Math.abs(
                  centerY -
                    lowerCurveY
                )
              );

            if (
              distanceToCurve < 11
            ) {
              score +=
                (11 -
                  distanceToCurve) *
                14;
            }
          }

          if (score < bestScore) {
            bestScore = score;
            bestCandidate =
              candidate;
            bestBox = box;
          }
        }
      );

      let labelClass =
        "ec-label";

      if (
        className.includes(
          "ec-point-result"
        )
      ) {
        labelClass +=
          " ec-label-result";
      }

      if (
        className.includes(
          "ec-point-third"
        )
      ) {
        labelClass +=
          " ec-label-third";
      }

      parent.appendChild(
        createSvgElement(
          "text",
          {
            x:
              pointX +
              bestCandidate.dx,
            y:
              pointY +
              bestCandidate.dy,
            class: labelClass,
            "text-anchor":
              bestCandidate.anchor
          },
          label
        )
      );

      if (bestBox) {
        placedLabelBoxes.push(
          bestBox
        );
      }
    };

    const currentHandleX = (handle) =>
      handle === "Q"
        ? pointQX
        : pointPX;

    const moveHandle = (handle, requestedX) => {
      let x =
        clamp(
          requestedX,
          dragLimits.xMin,
          dragLimits.xMax
        );

      if (mode === "add") {
        if (
          handle === "P" &&
          Math.abs(x - pointQX) <
            dragLimits.minimumSeparation
        ) {
          x =
            x < pointQX
              ? pointQX -
                dragLimits.minimumSeparation
              : pointQX +
                dragLimits.minimumSeparation;
        }

        if (
          handle === "Q" &&
          Math.abs(x - pointPX) <
            dragLimits.minimumSeparation
        ) {
          x =
            x < pointPX
              ? pointPX -
                dragLimits.minimumSeparation
              : pointPX +
                dragLimits.minimumSeparation;
        }

        x =
          clamp(
            x,
            dragLimits.xMin,
            dragLimits.xMax
          );
      }

      if (handle === "Q") {
        pointQX = x;
      } else {
        pointPX = x;
      }

      render();
    };

    const bindHandle = (circle) => {
      if (!circle) {
        return;
      }

      circle.addEventListener(
        "pointerdown",
        (event) => {
          activeHandle =
            circle.dataset.handle;

          activePointerId =
            event.pointerId;

          svg.classList.add(
            "is-dragging"
          );

          try {
            svg.setPointerCapture(
              event.pointerId
            );
          } catch (error) {
            // Interakce funguje i bez pointer capture.
          }

          event.preventDefault();
        }
      );

      circle.addEventListener(
        "keydown",
        (event) => {
          if (
            event.key !== "ArrowLeft" &&
            event.key !== "ArrowRight"
          ) {
            return;
          }

          const direction =
            event.key === "ArrowLeft"
              ? -1
              : 1;

          moveHandle(
            circle.dataset.handle,
            currentHandleX(
              circle.dataset.handle
            ) +
              direction * 0.10
          );

          event.preventDefault();
        }
      );
    };

    const render = () => {
      svg.replaceChildren();

      const definitions =
        createSvgElement("defs");

      const clipPath =
        createSvgElement(
          "clipPath",
          { id: clipId }
        );

      clipPath.appendChild(
        createSvgElement("rect", {
          x: margin.left,
          y: margin.top,
          width: plotWidth,
          height: plotHeight
        })
      );

      definitions.appendChild(
        clipPath
      );

      svg.appendChild(
        definitions
      );

      const layer =
        document.createDocumentFragment();

      for (
        let x = -2;
        x <= 5;
        x += 1
      ) {
        layer.appendChild(
          createSvgElement("line", {
            x1: toSvgX(x),
            y1: toSvgY(world.yMin),
            x2: toSvgX(x),
            y2: toSvgY(world.yMax),
            class:
              x === 0
                ? "ec-axis"
                : "ec-grid-line"
          })
        );
      }

      for (
        let y = -6;
        y <= 6;
        y += 3
      ) {
        layer.appendChild(
          createSvgElement("line", {
            x1: toSvgX(world.xMin),
            y1: toSvgY(y),
            x2: toSvgX(world.xMax),
            y2: toSvgY(y),
            class:
              y === 0
                ? "ec-axis"
                : "ec-grid-line"
          })
        );
      }

      appendText(
        layer,
        { x: 4.85, y: 0.6 },
        "x",
        "ec-axis-label",
        "end"
      );

      appendText(
        layer,
        { x: 0.08, y: 6.85 },
        "y",
        "ec-axis-label"
      );

      const curves =
        createSvgElement(
          "g",
          {
            "clip-path":
              `url(#${clipId})`
          }
        );

      curves.appendChild(
        createSvgElement("path", {
          d: createCurvePath(1),
          class: "ec-curve"
        })
      );

      curves.appendChild(
        createSvgElement("path", {
          d: createCurvePath(-1),
          class: "ec-curve"
        })
      );

      layer.appendChild(
        curves
      );

      const pointP =
        pointOnCurve(pointPX);

      const pointQ =
        mode === "add"
          ? pointOnCurve(pointQX)
          : null;

      const calculation =
        mode === "double"
          ? doublePoint(pointP)
          : addPoints(
              pointP,
              pointQ
            );

      const construction =
        createSvgElement(
          "g",
          {
            "clip-path":
              `url(#${clipId})`
          }
        );

      const extendedXStart =
        world.xMin - 1;

      const extendedXEnd =
        world.xMax + 1;

      construction.appendChild(
        createSvgElement("line", {
          x1:
            toSvgX(
              extendedXStart
            ),
          y1:
            toSvgY(
              calculation.slope *
                (extendedXStart -
                  pointP.x) +
                pointP.y
            ),
          x2:
            toSvgX(
              extendedXEnd
            ),
          y2:
            toSvgY(
              calculation.slope *
                (extendedXEnd -
                  pointP.x) +
                pointP.y
            ),
          class:
            "ec-construction-line"
        })
      );

      if (
        Number.isFinite(
          calculation.thirdIntersection.x
        ) &&
        Number.isFinite(
          calculation.thirdIntersection.y
        ) &&
        Number.isFinite(
          calculation.result.x
        ) &&
        Number.isFinite(
          calculation.result.y
        )
      ) {
        construction.appendChild(
          createSvgElement("line", {
            x1:
              toSvgX(
                calculation
                  .thirdIntersection
                  .x
              ),
            y1:
              toSvgY(
                calculation
                  .thirdIntersection
                  .y
              ),
            x2:
              toSvgX(
                calculation.result.x
              ),
            y2:
              toSvgY(
                calculation.result.y
              ),
            class:
              "ec-reflection-line"
          })
        );
      }

      layer.appendChild(
        construction
      );

      if (
        showCoordinates &&
        mode === "add" &&
        isVisiblePoint(
          calculation.result
        ) &&
        isVisiblePoint(
          calculation.thirdIntersection
        )
      ) {
        const coordinateGuides =
          createSvgElement("g");

        coordinateGuides.appendChild(
          createSvgElement("line", {
            x1: toSvgX(0),
            y1:
              toSvgY(
                calculation.result.y
              ),
            x2:
              toSvgX(
                calculation.result.x
              ),
            y2:
              toSvgY(
                calculation.result.y
              ),
            class:
              "ec-coordinate-guide ec-coordinate-guide-y"
          })
        );

        coordinateGuides.appendChild(
          createSvgElement("line", {
            x1:
              toSvgX(
                calculation.result.x
              ),
            y1:
              toSvgY(
                calculation.result.y
              ),
            x2:
              toSvgX(
                calculation.result.x
              ),
            y2:
              toSvgY(0),
            class:
              "ec-coordinate-guide ec-coordinate-guide-x"
          })
        );

        layer.appendChild(
          coordinateGuides
        );

        const xLabelX =
          toSvgX(
            calculation.result.x
          );

        const xLabelY =
          toSvgY(0);

        const yLabelX =
          toSvgX(0);

        const yLabelY =
          toSvgY(
            calculation.result.y
          );

        const xLabelGroup =
          createSvgElement(
            "g",
            {
              class:
                "ec-coordinate-tag"
            }
          );

        const xLabelText =
          createSvgElement(
            "text",
            {
              x: xLabelX + 10,
              y: xLabelY - 8,
              class:
                "ec-coordinate-tag-text",
              "text-anchor":
                "start"
            }
          );

        xLabelText.appendChild(
          createSvgElement(
            "tspan",
            {},
            "x"
          )
        );

        xLabelText.appendChild(
          createSvgElement(
            "tspan",
            {
              class:
                "ec-coordinate-subscript",
              "baseline-shift":
                "sub"
            },
            "R"
          )
        );

        xLabelGroup.appendChild(
          xLabelText
        );

        const yLabelGroup =
          createSvgElement(
            "g",
            {
              class:
                "ec-coordinate-tag"
            }
          );

        const yLabelText =
          createSvgElement(
            "text",
            {
              x: yLabelX + 9,
              y: yLabelY - 7,
              class:
                "ec-coordinate-tag-text",
              "text-anchor":
                "start"
            }
          );

        yLabelText.appendChild(
          createSvgElement(
            "tspan",
            {},
            "y"
          )
        );

        yLabelText.appendChild(
          createSvgElement(
            "tspan",
            {
              class:
                "ec-coordinate-subscript",
              "baseline-shift":
                "sub"
            },
            "R"
          )
        );

        yLabelGroup.appendChild(
          yLabelText
        );

        layer.appendChild(
          xLabelGroup
        );

        layer.appendChild(
          yLabelGroup
        );
      }

      const pointInfos = [
        {
          point:
            calculation.thirdIntersection,
          label:
            mode === "double"
              ? "−2P"
              : "−R",
          className:
            "ec-point-third",
          handle: ""
        },
        {
          point:
            calculation.result,
          label:
            mode === "double"
              ? "2P"
              : "R",
          className:
            "ec-point-result",
          handle: ""
        },
        {
          point: pointP,
          label: "P",
          className: "",
          handle: "P"
        }
      ];

      if (pointQ) {
        pointInfos.push({
          point: pointQ,
          label: "Q",
          className:
            "ec-point-q",
          handle: "Q"
        });
      }

      const pointElements =
        new Map();

      pointInfos.forEach(
        (pointInfo) => {
          const circle =
            appendPointCircle(
              layer,
              pointInfo.point,
              pointInfo.className,
              pointInfo.handle
            );

          if (
            circle &&
            pointInfo.handle
          ) {
            pointElements.set(
              pointInfo.handle,
              circle
            );
          }
        }
      );

      const constructionLine = {
        x1:
          toSvgX(
            extendedXStart
          ),
        y1:
          toSvgY(
            calculation.slope *
              (extendedXStart -
                pointP.x) +
              pointP.y
          ),
        x2:
          toSvgX(
            extendedXEnd
          ),
        y2:
          toSvgY(
            calculation.slope *
              (extendedXEnd -
                pointP.x) +
              pointP.y
          )
      };

      const placedLabelBoxes = [];

      pointInfos.forEach(
        (pointInfo) => {
          appendPointLabel(
            layer,
            pointInfo,
            pointInfos,
            placedLabelBoxes,
            constructionLine
          );
        }
      );

      svg.appendChild(
        layer
      );

      bindHandle(
        pointElements.get("P")
      );

      bindHandle(
        pointElements.get("Q")
      );

      if (mode === "double") {
        readout.innerHTML = `
          <span><b>P</b> = (${formatNumber(pointP.x)}, ${formatNumber(pointP.y)})</span>
          <span><b>m</b> = ${formatNumber(calculation.slope)}</span>
          <span><b>−2P</b> = (${formatNumber(calculation.thirdIntersection.x)}, ${formatNumber(calculation.thirdIntersection.y)})</span>
          <span><b>2P</b> = (${formatNumber(calculation.result.x)}, ${formatNumber(calculation.result.y)})</span>
        `;
      } else if (showCoordinates) {
        readout.innerHTML = `
          <span><b>P</b> = (${formatNumber(pointP.x)}, ${formatNumber(pointP.y)})</span>
          <span><b>Q</b> = (${formatNumber(pointQ.x)}, ${formatNumber(pointQ.y)})</span>
          <span><b>x<sub>R</sub></b> = ${formatNumber(calculation.result.x)}</span>
          <span><b>y<sub>R</sub></b> = ${formatNumber(calculation.result.y)}</span>
          <span><b>R</b> = (${formatNumber(calculation.result.x)}, ${formatNumber(calculation.result.y)})</span>
        `;
      } else {
        readout.innerHTML = `
          <span><b>P</b> = (${formatNumber(pointP.x)}, ${formatNumber(pointP.y)})</span>
          <span><b>Q</b> = (${formatNumber(pointQ.x)}, ${formatNumber(pointQ.y)})</span>
          <span><b>m</b> = ${formatNumber(calculation.slope)}</span>
          <span><b>R</b> = (${formatNumber(calculation.result.x)}, ${formatNumber(calculation.result.y)})</span>
        `;
      }
    };

    svg.addEventListener(
      "pointermove",
      (event) => {
        if (!activeHandle) {
          return;
        }

        const rect =
          svg.getBoundingClientRect();

        const svgX =
          ((event.clientX -
            rect.left) /
            rect.width) *
          viewWidth;

        moveHandle(
          activeHandle,
          toWorldX(svgX)
        );

        event.preventDefault();
      }
    );

    const stopDragging = (event) => {
      if (
        activePointerId !== null &&
        event?.pointerId !== undefined &&
        event.pointerId !==
          activePointerId
      ) {
        return;
      }

      if (
        activePointerId !== null
      ) {
        try {
          svg.releasePointerCapture(
            activePointerId
          );
        } catch (error) {
          // Capture už mohl uvolnit prohlížeč.
        }
      }

      activeHandle = null;
      activePointerId = null;

      svg.classList.remove(
        "is-dragging"
      );
    };

    svg.addEventListener(
      "pointerup",
      stopDragging
    );

    svg.addEventListener(
      "pointercancel",
      stopDragging
    );

    render();
  });
}

/* --------------------------------------------------------------------------
   Soukromý klíč — pohyblivý indikátor horizontální tabulky
   -------------------------------------------------------------------------- */

function initPrivateKeyPracticeTableScrollIndicators() {
  const tableWraps = [
    ...document.querySelectorAll(".private-key-practice-table-wrap")
  ];

  if (!tableWraps.length) {
    return;
  }

  tableWraps.forEach((tableWrap) => {
    let indicator = tableWrap.nextElementSibling;

    if (
      !indicator?.classList.contains(
        "private-key-practice-scroll-indicator"
      )
    ) {
      indicator = document.createElement("div");
      indicator.className = "private-key-practice-scroll-indicator";
      indicator.setAttribute("aria-hidden", "true");

      const thumb = document.createElement("span");
      thumb.className = "private-key-practice-scroll-thumb";

      indicator.appendChild(thumb);
      tableWrap.insertAdjacentElement("afterend", indicator);
    }

    const thumb = indicator.querySelector(
      ".private-key-practice-scroll-thumb"
    );

    if (!thumb) {
      return;
    }

    let animationFrame = null;

    const updateIndicator = () => {
      animationFrame = null;

      const viewportWidth = tableWrap.clientWidth;
      const contentWidth = tableWrap.scrollWidth;
      const maxScroll = Math.max(0, contentWidth - viewportWidth);
      const isScrollable = maxScroll > 1;

      indicator.classList.toggle("is-scrollable", isScrollable);

      if (!isScrollable || contentWidth <= 0) {
        thumb.style.width = "100%";
        thumb.style.left = "0%";
        return;
      }

      const visibleRatio = Math.min(1, viewportWidth / contentWidth);
      const thumbWidthPercent = Math.max(18, visibleRatio * 100);
      const scrollProgress = clamp(tableWrap.scrollLeft / maxScroll, 0, 1);
      const thumbLeftPercent =
        (100 - thumbWidthPercent) * scrollProgress;

      thumb.style.width = `${thumbWidthPercent.toFixed(3)}%`;
      thumb.style.left = `${thumbLeftPercent.toFixed(3)}%`;
    };

    const requestUpdate = () => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateIndicator);
    };

    tableWrap.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(requestUpdate);

      resizeObserver.observe(tableWrap);

      const table = tableWrap.querySelector(".private-key-practice-table");

      if (table) {
        resizeObserver.observe(table);
      }
    }

    updateIndicator();
  });
}

/* --------------------------------------------------------------------------
   Veřejný klíč — pohyblivý indikátor posloupnosti násobků G
   -------------------------------------------------------------------------- */

function initPublicKeyMathSequenceScrollIndicators() {
  const sequences = [
    ...document.querySelectorAll(".public-key-math-sequence")
  ];

  if (!sequences.length) {
    return;
  }

  sequences.forEach((sequence) => {
    let shell = sequence.parentElement;

    if (
      !shell?.classList.contains(
        "public-key-math-sequence-shell"
      )
    ) {
      shell = document.createElement("div");
      shell.className = "public-key-math-sequence-shell";

      sequence.parentNode.insertBefore(shell, sequence);
      shell.appendChild(sequence);
    }

    let indicator = shell.querySelector(
      ":scope > .public-key-math-sequence-scroll-indicator"
    );

    if (!indicator) {
      indicator = document.createElement("div");
      indicator.className = "public-key-math-sequence-scroll-indicator";
      indicator.setAttribute("aria-hidden", "true");

      const thumb = document.createElement("span");
      thumb.className = "public-key-math-sequence-scroll-thumb";

      indicator.appendChild(thumb);
      shell.appendChild(indicator);
    }

    const thumb = indicator.querySelector(
      ".public-key-math-sequence-scroll-thumb"
    );

    if (!thumb) {
      return;
    }

    let animationFrame = null;

    const updateIndicator = () => {
      animationFrame = null;

      const viewportWidth = sequence.clientWidth;
      const contentWidth = sequence.scrollWidth;
      const maxScroll = Math.max(0, contentWidth - viewportWidth);
      const isScrollable = maxScroll > 1;

      indicator.classList.toggle("is-scrollable", isScrollable);

      if (!isScrollable || contentWidth <= 0) {
        thumb.style.width = "100%";
        thumb.style.left = "0%";
        return;
      }

      const visibleRatio = Math.min(1, viewportWidth / contentWidth);
      const thumbWidthPercent = Math.max(18, visibleRatio * 100);
      const scrollProgress = clamp(sequence.scrollLeft / maxScroll, 0, 1);
      const thumbLeftPercent =
        (100 - thumbWidthPercent) * scrollProgress;

      thumb.style.width = `${thumbWidthPercent.toFixed(3)}%`;
      thumb.style.left = `${thumbLeftPercent.toFixed(3)}%`;
    };

    const requestUpdate = () => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateIndicator);
    };

    sequence.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(requestUpdate);
      resizeObserver.observe(sequence);
    }

    updateIndicator();
  });
}

/* --------------------------------------------------------------------------
   Tabulky výstupů a adres — pohyblivý mobilní indikátor horizontálního posunu
   -------------------------------------------------------------------------- */

function initAddressExampleTableScrollIndicators() {
  const tableWraps = [
    ...document.querySelectorAll(".address-example-table-wrap")
  ];

  if (!tableWraps.length) {
    return;
  }

  tableWraps.forEach((tableWrap) => {
    let indicator = tableWrap.nextElementSibling;

    if (
      !indicator?.classList.contains(
        "address-example-scroll-indicator"
      )
    ) {
      indicator = document.createElement("div");
      indicator.className =
        "address-example-scroll-indicator private-key-practice-scroll-indicator";
      indicator.setAttribute("aria-hidden", "true");

      const thumb = document.createElement("span");
      thumb.className =
        "address-example-scroll-thumb private-key-practice-scroll-thumb";

      indicator.appendChild(thumb);
      tableWrap.insertAdjacentElement("afterend", indicator);
    }

    const thumb = indicator.querySelector(
      ".address-example-scroll-thumb"
    );

    if (!thumb) {
      return;
    }

    let animationFrame = null;

    const updateIndicator = () => {
      animationFrame = null;

      const viewportWidth = tableWrap.clientWidth;
      const contentWidth = tableWrap.scrollWidth;
      const maxScroll = Math.max(0, contentWidth - viewportWidth);
      const isScrollable = maxScroll > 1;

      indicator.classList.toggle("is-scrollable", isScrollable);

      if (!isScrollable || contentWidth <= 0) {
        thumb.style.width = "100%";
        thumb.style.left = "0%";
        return;
      }

      const visibleRatio = Math.min(1, viewportWidth / contentWidth);
      const thumbWidthPercent = Math.max(18, visibleRatio * 100);
      const scrollProgress = clamp(tableWrap.scrollLeft / maxScroll, 0, 1);
      const thumbLeftPercent =
        (100 - thumbWidthPercent) * scrollProgress;

      thumb.style.width = `${thumbWidthPercent.toFixed(3)}%`;
      thumb.style.left = `${thumbLeftPercent.toFixed(3)}%`;
    };

    const requestUpdate = () => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updateIndicator);
    };

    tableWrap.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(requestUpdate);

      resizeObserver.observe(tableWrap);

      const table = tableWrap.querySelector(".address-example-table");

      if (table) {
        resizeObserver.observe(table);
      }
    }

    updateIndicator();
  });
}

/* --------------------------------------------------------------------------
   Pojmy v článku — první výskyt v každé H2 sekci
   Každá .article-text-section představuje jednu sekci začínající <h2>.
   Stejný data-term se v ní smí zobrazit jako popup pouze jednou.
   V další sekci se seznam použitých pojmů resetuje.
   -------------------------------------------------------------------------- */

function normalizeArticleTermOccurrences() {
  if (!document.body.classList.contains("article-text-page")) {
    return;
  }

  document
    .querySelectorAll(".article-content .article-text-section")
    .forEach((section) => {
      const seenTerms = new Set();

      section.querySelectorAll("button.term[data-term]").forEach((termButton) => {
        const key = termButton.dataset.term?.trim();

        if (!key) {
          return;
        }

        if (!seenTerms.has(key)) {
          seenTerms.add(key);
          return;
        }

        termButton.replaceWith(document.createTextNode(termButton.textContent || ""));
      });
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
   SHA-256 — vizuální transformace text -> hash
   -------------------------------------------------------------------------- */

function initHashExampleMorph() {
  const example = document.querySelector(".hash-example");
  if (!example) {
    return;
  }

  const reduceMotion = prefersReducedMotion();
  if (reduceMotion) {
    return;
  }

  const HEX = "0123456789abcdef";
  const HOLD_SOURCE = 1600;
  const MORPH_TO_HASH = 950;
  const HOLD_HASH = 2100;
  const MORPH_TO_SOURCE = 950;
  const HOLD_BETWEEN = 650;

  const sleep = (milliseconds) =>
    new Promise((resolve) => window.setTimeout(resolve, milliseconds));

  const randomHex = () => HEX[Math.floor(Math.random() * HEX.length)];

  function morphText(element, from, to, duration) {
    return new Promise((resolve) => {
      const startedAt = performance.now();
      const maxLength = Math.max(from.length, to.length);
      const settleAt = Array.from(
        { length: maxLength },
        () => 0.25 + Math.random() * 0.66
      );

      function frame(now) {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const visibleLength = Math.max(
          1,
          Math.round(from.length + (to.length - from.length) * eased)
        );

        let rendered = "";

        for (let index = 0; index < visibleLength; index += 1) {
          const targetCharacter = to[index] ?? "";

          if (progress >= settleAt[index] && index < to.length) {
            rendered += targetCharacter;
          } else if (targetCharacter === " ") {
            rendered += " ";
          } else {
            rendered += randomHex();
          }
        }

        element.textContent = rendered;

        if (progress < 1) {
          window.requestAnimationFrame(frame);
          return;
        }

        element.textContent = to;
        resolve();
      }

      window.requestAnimationFrame(frame);
    });
  }

  const items = [...example.querySelectorAll(".hash-example-item")]
    .map((item) => {
      const labels = item.querySelectorAll(".hash-example-label");
      const input = item.querySelector(".hash-example-input");
      const process = item.querySelector(".hash-example-process");
      const output = item.querySelector(".hash-example-output");

      if (!input || !process || !output || labels.length < 2) {
        return null;
      }

      labels[0].classList.add("hash-example-source-label");
      labels[1].classList.add("hash-example-result-label");

      return {
        item,
        label: labels[0],
        input,
        source: input.textContent.trim(),
        hash: output.textContent.trim()
      };
    })
    .filter(Boolean);

  if (!items.length) {
    return;
  }

  example.classList.add("is-hash-animated");

  async function run(entry, initialDelay) {
    await sleep(initialDelay);

    while (true) {
      entry.item.className = "hash-example-item is-source";
      entry.label.textContent = "TEXTOVÝ VSTUP";
      entry.input.textContent = entry.source;
      await sleep(HOLD_SOURCE);

      entry.item.className = "hash-example-item is-hashing";
      entry.label.textContent = "HASHING...";
      await morphText(entry.input, entry.source, entry.hash, MORPH_TO_HASH);

      entry.item.className = "hash-example-item is-hash";
      entry.label.textContent = "HASH";
      entry.input.textContent = entry.hash;
      await sleep(HOLD_HASH);

      /* Vizuální návrat používá stejný scramble efekt opačným směrem.
         Nejde o reverzi SHA-256; je to pouze návrat animace do výchozího stavu. */
      entry.item.className = "hash-example-item is-returning";
      entry.label.removeAttribute("aria-hidden");
      entry.label.textContent = "RESETTING...";
      await morphText(entry.input, entry.hash, entry.source, MORPH_TO_SOURCE);

      entry.item.className = "hash-example-item is-source";
      entry.label.textContent = "TEXTOVÝ VSTUP";
      entry.input.textContent = entry.source;
      await sleep(HOLD_BETWEEN);
    }
  }

  items.forEach((entry, index) => {
    run(entry, index * 320);
  });
}

/* --------------------------------------------------------------------------
   Inicializace webu
   Všechny komponenty se spouštějí na jednom místě. Každá inicializační
   funkce si sama ověří, zda její prvek na aktuální stránce existuje.
   -------------------------------------------------------------------------- */

function initializeSite() {
  renderGlobalHeader();
  renderGlobalFooter();
  renderBitcoinNavigation();
  initHomeRotatingTitle();
  initBackToTop();
  initSupportCopy();
  initBitcoinFlowMap();
  initHistoryTimeline();
  initEllipticCurveFieldDemo();
  initPublicKeyDerivationDemo();
  initEllipticCurveGeometryDemo();
  initPrivateKeyPracticeTableScrollIndicators();
  initPublicKeyMathSequenceScrollIndicators();
  initAddressExampleTableScrollIndicators();
  normalizeArticleTermOccurrences();
  initArticleHeadingLinks();
  initHashExampleMorph();
}

initializeSite();
