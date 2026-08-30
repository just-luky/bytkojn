/*
 * BYTKOJN – interaktivní pojmy
 *
 * Použití v HTML:
 * <button class="term" type="button" data-term="bitcoin-symbol">₿</button>
 *
 * Data:
 * /assets/data/terms-data.js
 *
 * Databáze je načtena před tímto skriptem do window.BYTKOJN_TERMS.
 * Každá definice používá pouze vlastnost "text".
 * Definice mohou obsahovat jednoduché HTML formátování, například <sup>
 * pro matematický horní index.
 */

(() => {
  "use strict";

  const terms = window.BYTKOJN_TERMS || {};
  let activeTrigger = null;

  /* ------------------------------------------------------------
     VYTVOŘENÍ JEDNOHO SPOLEČNÉHO POPUPU
     ------------------------------------------------------------ */

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

    <p
      class="term-popup-text"
      id="termPopupText"
    ></p>

    <a
      class="term-popup-link"
      id="termPopupLink"
      href="#"
      hidden
    >
      Podrobněji →
    </a>
  `;

  document.body.appendChild(popup);

  const titleElement = popup.querySelector("#termPopupTitle");
  const textElement = popup.querySelector("#termPopupText");
  const linkElement = popup.querySelector("#termPopupLink");

  /* ------------------------------------------------------------
     ZAVŘENÍ POPUPU
     ------------------------------------------------------------ */

  function closePopup() {
    if (activeTrigger) {
      activeTrigger.setAttribute("aria-expanded", "false");
    }

    popup.classList.remove("is-open");
    popup.setAttribute("aria-hidden", "true");
    popup.dataset.currentTerm = "";

    activeTrigger = null;
  }

  /* ------------------------------------------------------------
     UMÍSTĚNÍ POPUPU
     ------------------------------------------------------------ */

  function positionPopup(trigger) {
    /*
     * Na telefonu pozici kompletně řídí CSS.
     */
    if (window.matchMedia("(max-width: 600px)").matches) {
      popup.style.left = "";
      popup.style.top = "";
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();

    const gap = 10;
    const viewportPadding = 16;

    let left = triggerRect.left;
    let top = triggerRect.bottom + gap;

    if (
      left + popupRect.width >
      window.innerWidth - viewportPadding
    ) {
      left =
        window.innerWidth -
        popupRect.width -
        viewportPadding;
    }

    if (left < viewportPadding) {
      left = viewportPadding;
    }

    if (
      top + popupRect.height >
      window.innerHeight - viewportPadding
    ) {
      top =
        triggerRect.top -
        popupRect.height -
        gap;
    }

    if (top < viewportPadding) {
      top = viewportPadding;
    }

    popup.style.left = `${Math.round(left)}px`;
    popup.style.top = `${Math.round(top)}px`;
  }

  /* ------------------------------------------------------------
     OTEVŘENÍ POPUPU
     ------------------------------------------------------------ */

  function openPopup(trigger, termId) {
    const item = terms[termId];

    if (!item) {
      console.warn(
        `[BYTKOJN terms] Pojem "${termId}" nebyl nalezen v terms-data.js.`
      );
      return;
    }

    if (
      activeTrigger &&
      activeTrigger !== trigger
    ) {
      activeTrigger.setAttribute("aria-expanded", "false");
    }

    titleElement.textContent = item.title || termId;
    textElement.innerHTML = item.text || "";

    if (item.href) {
      linkElement.href = item.href;
      linkElement.textContent =
        item.linkText || "Podrobněji →";
      linkElement.hidden = false;
    } else {
      linkElement.hidden = true;
      linkElement.removeAttribute("href");
    }

    popup.dataset.currentTerm = termId;
    popup.classList.add("is-open");
    popup.setAttribute("aria-hidden", "false");

    trigger.setAttribute("aria-controls", popup.id);
    trigger.setAttribute("aria-expanded", "true");

    activeTrigger = trigger;

    requestAnimationFrame(() => {
      positionPopup(trigger);
    });
  }

  /* ------------------------------------------------------------
     KLIKNUTÍ NA POJEM
     ------------------------------------------------------------ */

  document.addEventListener("click", (event) => {
    const trigger =
      event.target.closest(".term[data-term]");

    if (trigger) {
      event.preventDefault();
      event.stopPropagation();

      const termId = trigger.dataset.term;

      const isSameOpen =
        popup.classList.contains("is-open") &&
        popup.dataset.currentTerm === termId &&
        activeTrigger === trigger;

      if (isSameOpen) {
        closePopup();
      } else {
        openPopup(trigger, termId);
      }

      return;
    }

    if (!event.target.closest(".term-popup")) {
      closePopup();
    }
  });

  /* ------------------------------------------------------------
     ESCAPE
     ------------------------------------------------------------ */

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      popup.classList.contains("is-open")
    ) {
      const triggerToFocus = activeTrigger;

      closePopup();
      triggerToFocus?.focus();
    }
  });

  /* ------------------------------------------------------------
     PŘEPOČÍTÁNÍ POZICE
     ------------------------------------------------------------ */

  window.addEventListener(
    "resize",
    () => {
      if (
        activeTrigger &&
        popup.classList.contains("is-open")
      ) {
        positionPopup(activeTrigger);
      }
    },
    { passive: true }
  );

  window.addEventListener(
    "scroll",
    () => {
      if (
        activeTrigger &&
        popup.classList.contains("is-open")
      ) {
        positionPopup(activeTrigger);
      }
    },
    { passive: true }
  );
})();