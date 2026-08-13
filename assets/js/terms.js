/* =========================================================================
   BYTKOJN – INTERAKTIVNÍ POJMY

   Data se načítají z:
   /assets/data/terms-data.js

   Tento soubor neobsahuje definice pojmů, pouze obsluhu popupu.
   ========================================================================= */

(() => {
  "use strict";

  const terms = window.BYTKOJN_TERMS || {};

  if (!window.BYTKOJN_TERMS) {
    console.error(
      "[BYTKOJN terms] Databáze pojmů nebyla načtena. " +
      "Zkontroluj, že assets/data/terms-data.js je v HTML vložen před assets/js/terms.js."
    );
  }

  let activeTrigger = null;

  /* -----------------------------------------------------------------------
     VYTVOŘENÍ JEDNOHO SPOLEČNÉHO POPUPU
     ----------------------------------------------------------------------- */

  const popup = document.createElement("aside");

  popup.className = "term-popup";
  popup.id = "termPopup";
  popup.setAttribute("role", "dialog");
  popup.setAttribute("aria-modal", "false");
  popup.setAttribute("aria-hidden", "true");
  popup.setAttribute("aria-labelledby", "termPopupTitle");

  popup.innerHTML = `

    <h2
      class="term-popup-title"
      id="termPopupTitle"
    ></h2>

    <span
      class="term-popup-subtitle"
      id="termPopupSubtitle"
    ></span>

    <p
      class="term-popup-text"
      id="termPopupText"
    ></p>

    <a
      class="term-popup-link"
      id="termPopupLink"
      hidden
    >
      Přejít na podrobné vysvětlení →
    </a>
  `;

  document.body.appendChild(popup);

  const titleElement =
    popup.querySelector("#termPopupTitle");

  const subtitleElement =
    popup.querySelector("#termPopupSubtitle");

  const textElement =
    popup.querySelector("#termPopupText");

  const linkElement =
    popup.querySelector("#termPopupLink");


  /* -----------------------------------------------------------------------
     ZAVŘENÍ POPUPU
     ----------------------------------------------------------------------- */

  function closePopup() {
    if (activeTrigger) {
      activeTrigger.setAttribute(
        "aria-expanded",
        "false"
      );
    }

    popup.classList.remove("is-open");

    popup.setAttribute(
      "aria-hidden",
      "true"
    );

    popup.dataset.currentTerm = "";

    activeTrigger = null;
  }


  /* -----------------------------------------------------------------------
     UMÍSTĚNÍ POPUPU
     ----------------------------------------------------------------------- */

  function positionPopup(trigger) {

    /*
      Na telefonu pozici kompletně řídí CSS
      jako spodní informační panel.
    */
    if (
      window.matchMedia(
        "(max-width: 620px)"
      ).matches
    ) {
      popup.style.left = "";
      popup.style.top = "";
      return;
    }

    const triggerRect =
      trigger.getBoundingClientRect();

    const popupRect =
      popup.getBoundingClientRect();

    const gap = 10;
    const viewportPadding = 16;

    let left =
      triggerRect.left;

    let top =
      triggerRect.bottom + gap;


    /* Pokud popup přetéká doprava, posuneme jej doleva. */
    if (
      left + popupRect.width >
      window.innerWidth - viewportPadding
    ) {
      left =
        window.innerWidth -
        popupRect.width -
        viewportPadding;
    }

    left =
      Math.max(
        viewportPadding,
        left
      );


    /* Pokud se nevejde pod pojem, zobrazí se nad ním. */
    if (
      top + popupRect.height >
      window.innerHeight - viewportPadding
    ) {
      top =
        triggerRect.top -
        popupRect.height -
        gap;
    }

    top =
      Math.max(
        viewportPadding,
        top
      );


    popup.style.left =
      `${Math.round(left)}px`;

    popup.style.top =
      `${Math.round(top)}px`;
  }


  /* -----------------------------------------------------------------------
     OTEVŘENÍ POPUPU
     ----------------------------------------------------------------------- */

  function openPopup(trigger) {

    const termId =
      trigger.dataset.term;

    const item =
      terms[termId];


    if (!item) {
      console.warn(
        `[BYTKOJN terms] Pojem "${termId}" není v assets/data/terms-data.js.`
      );

      return;
    }


    if (
      activeTrigger &&
      activeTrigger !== trigger
    ) {
      activeTrigger.setAttribute(
        "aria-expanded",
        "false"
      );
    }


    titleElement.textContent =
      item.title || termId;

    subtitleElement.textContent =
      item.subtitle || "";

    textElement.textContent =
      item.text || "";


    /* Odkaz je volitelný. */
    if (item.href) {

      linkElement.href =
        item.href;

      linkElement.textContent =
        item.linkText ||
        "Přejít na podrobné vysvětlení →";

      linkElement.hidden =
        false;

    } else {

      linkElement.hidden =
        true;

      linkElement.removeAttribute(
        "href"
      );
    }


    popup.dataset.currentTerm =
      termId;

    popup.classList.add(
      "is-open"
    );

    popup.setAttribute(
      "aria-hidden",
      "false"
    );


    trigger.setAttribute(
      "aria-controls",
      popup.id
    );

    trigger.setAttribute(
      "aria-expanded",
      "true"
    );


    activeTrigger =
      trigger;


    requestAnimationFrame(() => {
      positionPopup(trigger);
    });
  }


  /* -----------------------------------------------------------------------
     KLIKNUTÍ NA POJEM
     ----------------------------------------------------------------------- */

  document.addEventListener(
    "click",
    (event) => {

      const trigger =
        event.target.closest(
          ".term[data-term]"
        );


      if (trigger) {

        event.preventDefault();
        event.stopPropagation();


        const isSameOpen =
          popup.classList.contains(
            "is-open"
          ) &&
          activeTrigger === trigger;


        if (isSameOpen) {

          closePopup();

        } else {

          openPopup(
            trigger
          );

        }

        return;
      }


      /* Kliknutí mimo popup jej zavře. */
      if (
        !event.target.closest(
          ".term-popup"
        )
      ) {
        closePopup();
      }

    }
  );


  /* -----------------------------------------------------------------------
     ESCAPE
     ----------------------------------------------------------------------- */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        popup.classList.contains(
          "is-open"
        )
      ) {

        const triggerToFocus =
          activeTrigger;

        closePopup();

        triggerToFocus?.focus();
      }

    }
  );


  /* -----------------------------------------------------------------------
     SCROLL / RESIZE

     Popup je kontextová vysvětlivka k právě viditelnému pojmu.
     Při posunu stránky nebo změně velikosti okna se zavře.
     ----------------------------------------------------------------------- */

  window.addEventListener(
    "scroll",
    closePopup,
    {
      passive: true
    }
  );

  window.addEventListener(
    "resize",
    closePopup
  );


  console.info(
    `[BYTKOJN terms] Připraveno ${Object.keys(terms).length} pojmů.`
  );

})();
