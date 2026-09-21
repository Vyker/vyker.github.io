/* Dr. Shimas Salih — V3
   scroll-reveal · header · mobile menu · FAQ · EN/AR segmented toggle · sticky action bar
   No dependencies. Respects prefers-reduced-motion. */
(() => {
  "use strict";
  const doc = document, root = doc.documentElement;
  root.classList.add("js"); // enables JS-gated CSS motion (reveals, scans, figure)
  const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- apply language (URL ?lang= > persisted > default en) ---- */
  function setLang(lang, persist = true) {
    if (lang !== "ar") lang = "en";
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    doc.body.setAttribute("lang", lang);
    const active = doc.getElementById("langActive") // (set below)
    // swap text content from data-*
    doc.querySelectorAll("[data-en][data-ar]").forEach((el) => {
      el.textContent = lang === "ar" ? el.getAttribute("data-ar") : el.getAttribute("data-en");
    });
    // toggle pressed state
    doc.querySelectorAll(".lang-b").forEach((b) => {
      const on = b.getAttribute("data-lang") === lang;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      if (on) b.setAttribute("data-active", ""); else b.removeAttribute("data-active");
    });
    // title
    doc.title = lang === "ar"
      ? "\u062f. \u0634\u064a\u0645\u0627\u0633 \u0635\u0627\u0644\u062d — \u0637\u0628 \u0627\u0644\u0639\u0638\u0627\u0645 \u0648\u0627\u0644\u0637\u0628 \u0627\u0644\u0631\u064a\u0627\u0636\u064a \u00b7 \u062f\u0628\u064a \u0648\u0623\u0628\u0648 \u0630\u0628\u0649"
      : "Dr. Shimas Salih — MSK & Sports Medicine Consultant · Dubai & Abu Dhabi";
    if (persist) { try { localStorage.setItem("salih-lang", lang); } catch (e) {} }
    // re-run reveal for freshly-sized content
    if (typeof window.__refreshReveal === 'function') window.__refreshReveal();
  }

  /* ---- language segmented toggle ---- */
  let wired = false;
  function wireLangs() {
    if (wired) return; wired = true;
    const btns = doc.querySelectorAll(".lang-b");
    btns.forEach((b) => {
      if (b.getAttribute("data-lang") === "en") b.setAttribute("id", "langActive");
      b.addEventListener("click", () => setLang(b.getAttribute("data-lang")));
    });
  }

  /* ---- reveal — in-view shown instantly; below-fold fades in on scroll ---- */
  let io = null;
  function setupReveal() {
    const els = Array.prototype.slice.call(doc.querySelectorAll(".rv"));
    if (rm || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      window.__refreshReveal = () => {};
      return;
    }
    if (!io) io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) {
        en.target.classList.add("in");
        en.target.classList.remove("rv-pending");
        // also light up any child reveal cards (e.g. reel cards that live offscreen horizontally)
        en.target.querySelectorAll(".rv-rv-pending, .rcard.rv-pending").forEach(c => c.classList.remove("rv-pending"));
        en.target.querySelectorAll(".rcard").forEach(c => { c.classList.add("in"); c.classList.remove("rv-pending"); });
        io.unobserve(en.target);
      } });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.1 });
    const vh = innerHeight || 900;
    els.forEach((e) => {
      if (e.classList.contains("in")) return;
      const r = e.getBoundingClientRect();
      if (r.bottom > 0 && r.top < vh * 1.05) { e.classList.add("in"); }
      else { e.classList.add("rv-pending"); io.observe(e); }
    });
    window.__refreshReveal = () => els.forEach((e) => {
      if (e.classList.contains("in")) return;
      const r = e.getBoundingClientRect();
      if (r.bottom > 0 && r.top < vh * 1.05) { e.classList.add("in"); e.classList.remove("rv-pending"); }
      else { e.classList.add("rv-pending"); io.observe(e); }
    });
  }

  /* ---- header scroll + V5 progress hairline + hero-flow parallax ---- */
  function wireHeader() {
    const hdr = doc.querySelector(".hdr"); if (!hdr) return;
    const prog = doc.querySelector(".scroll-prog");
    const fg = doc.querySelectorAll(".hero-flow .fg-b, .hero-flow .fg-c");
    const ticking = { v:false };
    const onScroll = () => {
      hdr.classList.toggle("is-scrolled", scrollY > 12);
      if (prog) {
        const h = doc.documentElement;
        const max = Math.max(1, h.scrollHeight - innerHeight);
        prog.style.width = (Math.min(1, scrollY / max) * 100) + "%";
      }
      if (fg.length && scrollY < 1400) {           // only while hero is on screen
        fg.forEach((el, i) => {
          el.style.transform = "translateX(" + (scrollY * (i === 0 ? -0.09 : 0.14)) + "px)";
        });
      }
      ticking.v = false;
    };
    const schedule = () => { if (!ticking.v) { ticking.v = true; requestAnimationFrame(onScroll); } };
    onScroll(); addEventListener("scroll", schedule, { passive: true });
  }

  /* ---- mobile menu ---- */
  function wireBurger() {
    const b = doc.getElementById("burger"); const hdr = doc.querySelector(".hdr");
    if (!b || !hdr) return;
    b.addEventListener("click", () => {
      const open = hdr.classList.toggle("is-open");
      b.setAttribute("aria-expanded", open ? "true" : "false");
      b.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    });
    hdr.querySelectorAll(".nav a").forEach((a) => a.addEventListener("click", () => {
      hdr.classList.remove("is-open"); if (b) { b.setAttribute("aria-expanded", "false"); }
    }));
  }

  /* ---- FAQ accordion (panel uses [hidden]) ---- */
  function wireFaq() {
    const items = doc.querySelectorAll(".faq-i");
    items.forEach((item) => {
      const btn = item.querySelector(".faq-q"); const panel = item.querySelector(".faq-ans");
      if (!btn) return;
      btn.addEventListener("click", () => {
        const was = !panel.hidden;
        items.forEach((o) => { const p2 = o.querySelector(".faq-ans"); const b2 = o.querySelector(".faq-q");
          if (o !== item) { o.classList.remove("open"); if (p2) p2.hidden = true; if (b2) b2.setAttribute("aria-expanded", "false"); } });
        if (!was) { panel.hidden = false; item.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
        else { item.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); requestAnimationFrame(()=>{ panel.hidden = true; }); }
      });
    });
  }

  /* ---- sticky mobile action bar (show when past hero) ---- */
  function wireSticky() {
    const bar = doc.querySelector(".sm-bar"); const hero = doc.querySelector(".hero");
    if (!bar || !hero) return;
    const on = () => {
      const past = hero.getBoundingClientRect().bottom < 90;
      bar.classList.toggle("show", past && matchMedia("(max-width:959px)").matches);
    };
    on(); addEventListener("scroll", on, { passive: true });
  }

  /* ---- anchor smoothness + focus ---- */
  function wireAnchors() {
    doc.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href"); if (id.length < 2) return;
        const el = doc.querySelector(id); if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: rm ? "auto" : "smooth", block: "start" });
        el.setAttribute("tabindex", "-1"); el.focus({ preventScroll: true });
      });
    });
  }

  /* ---- init ---- */
  function init() {
    let initial = "en";
    try { initial = localStorage.getItem("salih-lang") || "en"; } catch (e) {}
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "ar" || q === "en") initial = q;
    // defer one tick so DOM text is present
    requestAnimationFrame(() => {
      setLang(initial, q === null);
      wireLangs(); setupReveal(); wireHeader(); wireBurger(); wireFaq(); wireSticky(); wireAnchors(); wireReel();
    });
  }

  /* ---- v4: video reel (play / stop, one at a time) ---- */
  function wireReel() {
    const row = doc.getElementById("reelRow");
    if (!row) return;
    const cards = Array.prototype.slice.call(row.querySelectorAll(".rcard"));
    const stopAll = (skip) => cards.forEach((c) => {
      if (c === skip) return;
      const v = c.querySelector("video"); if (v) { try { v.pause(); } catch (e) {} }
      c.classList.remove("is-playing");
    });
    cards.forEach((c) => {
      const v = c.querySelector("video");
      const btn = c.querySelector(".rplay");
      if (!v || !btn) return;
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (v.paused) {
          stopAll(c);
          const p = v.muted ? v.play() : v.play().catch(() => {});
          v.muted = true;
          c.classList.add("is-playing");
        } else {
          v.pause();
          c.classList.remove("is-playing");
        }
      });
      v.addEventListener("click", () => { if (!v.paused) { v.pause(); c.classList.remove("is-playing"); } });
      v.addEventListener("ended", () => { c.classList.remove("is-playing"); v.playbackRate = 1; v.currentTime = 0; });
      // auto-pause when it scrolls far out of view (battery / bandwidth)
      if ("IntersectionObserver" in window) {
        const io2 = new IntersectionObserver((en) => {
          en.forEach((x) => { if (!x.isIntersecting && !v.paused) { v.pause(); c.classList.remove("is-playing"); } });
        }, { threshold: 0.15 });
        io2.observe(c);
      }
    });
    // nav buttons
    const nav = doc.querySelector(".reel-nav");
    if (nav) {
      nav.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
        const dir = b.getAttribute("data-dir") === "next" ? 1 : -1;
        row.scrollBy({ left: dir * (row.clientWidth * 0.72), behavior: "smooth" });
      }));
    }
  }


  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", init);
  else init();
})();
