# Dr. Shimas Salih — MSK & Sports Medicine · Website (V2)

A single-page, mobile-first, bilingual (EN/AR · RTL-ready) professional site for a UK-trained Consultant in Physical Medicine & Rehabilitation / MSK & Sports Medicine, for Dubai (DISC, DHCC) and Abu Dhabi (SRH).

**Zero runtime dependencies.** One HTML file, one CSS file, one JS file, six self-hosted WOFF2 fonts, inline SVG icons, and static assets. No frameworks, no build step, no CDN, no tracking, no cookie banner.

```
index.html · css/main.css · js/main.js · site.webmanifest
assets/logo/ (seal SVG) · assets/icons/ (favicon + PWA) · assets/img/ (photos + OG) · fonts/ (WOFF2)
```

**Deliverables:**
- [1] Design-language brief → `DESIGN.md`
- [2] This working site (this folder, deploy as-is)
- [3] Mobile screen-by-screen (below)
- [4] Launch checklist (below)

---

## Run locally
Static — no build. Serve the folder and open `/`:
```
cd site
python -m http.server 8931
# → http://127.0.0.1:8931/
```
Arabic: click the ع/EN toggle (persists), or open `/?lang=ar`.

---

## 3 · Mobile — what changed vs desktop

The layout is the *same content, re-flowed*. Mobile-first: the base CSS is the mobile version; desktop is added at `≥ 960px` (with a 2-column card step at `≥ 640px`).

| Screen (top → bottom) | Mobile (default, ≤ 959px) | Desktop (≥ 960px) |
|---|---|---|
| **Header** | Brand mark + name + **Book** pill + hamburger. Full nav collapses into a slide-down panel; the phone/WhatsApp move to the sticky bottom bar. | Brand left, **full inline nav** centered, **Call + Book + ع/EN** right. Hamburger hidden. |
| **Hero** | Stacked: kicker → big serif H1 → lede → CTA (wraps to stacked) → 3-up stats → portrait. Portrait sits below the copy at ~90% width, offset hairline frame. | Two columns: copy (left, ~52%) + portrait (right, ~470px). CTAs sit on one row. |
| **Credentials** | Horizontal **scroll strip** (9 chips scroll with an edge-fade mask; label above). | Same scroll strip, full width. |
| **About** | Copy block, then timeline, stacked with 36px gaps. | Split: **copy + motto (1.4fr) · timeline (1fr)**, 60px gap. |
| **Conditions** | 1 column; each card full width, editorial serif initial (K · T · F · S · R · U) as the visual. | **2-column grid** of the 6 cards. |
| **Approach** | Dark band; 3 numbered steps stacked (01/02/03) with top/bottom hairlines. | At `≥ 1080px` the 3 steps sit **side by side** in a bordered, rounded panel with vertical dividers. |
| **Athletes** | Copy + credential list, then the DISC clinic photo with a caption pill. | 1.4fr copy / 1fr image, centered. |
| **Patients** | Reserved-review placeholder (dashed box + "verified via DISC or SRH"). | Same. *(No fabricated reviews by design.)* |
| **FAQ** | Accordion; full-width questions, chevron toggles to a filled disc + rotates. | Same behaviour; questions constrained to 72ch. |
| **Contact** | Two location cards stacked, each with Book/Call/Maps; then the pine Call/WhatsApp/Portal card. | Two location cards side by side; the Call card **becomes 3 columns** (Call · WhatsApp · Booking). |
| **Footer** | 3 columns stack (brand · links · credentials), disclaimer, © bar. | 3 columns in a row (1.3fr / 1fr / 1fr). |
| **Sticky action bar** | **Appears once the hero scrolls away** (bottom-anchored, notch-safe via `env(safe-area-inset-bottom)`, blur). Three cells: **Call** · **WhatsApp** (highlighted, pine) · **Book**. | Hidden — actions live in the header. |

**RTL (`lang="ar"`)** mirrors everything with logical properties (`inset-inline-*`, `text-align:start`, `flex-direction`): header, nav, timeline rail, card left-accent, chevron position, and scroll-strip fade are all right-side; the serif display voice switches to Cairo. No per-section overrides needed.

---

## 4 · Launch checklist

### Before you publish
- [ ] **Domain** — point `www.drshimassalih.com` (or the chosen domain) at the host. Update the `<link rel="canonical">`, all `https://www.drshimassalih.com/...` OG/JSON-LD values, and `site.webmanifest` `start_url` to the final domain. (They are currently set to `drshimassalih.com` as a working default.)
- [ ] **Hosting** — any static host works (Netlify, Vercel, Cloudflare Pages, S3, or a plain vhost). Serve over **HTTPS** (browsers gate `backdrop-filter`, `fetchpriority`, and PWA install on secure origin). No server-side needed.
- [ ] **WhatsApp Business** — confirm **+971 4 561 6870** is the correct, *business-verified* number before launch (it is hard-coded in ~6 places: header, hero, contact, sticky bar, and the pre-filled `wa.me/97145616870?text=...` deep links).
- [ ] **Booking links** — verify both external links resolve and belong to practice:
  - DISC: `https://booking.disc-me.com/`
  - SRH: `https://srh.ae/contact-us/`
  - Okadoc profile: `https://www.okadoc.com/en-ae/doctor/rehabilitation/abu-dhabi/shimas-salih`
- [ ] **Hours** — the DISC "Mon–Sat 7am–7pm · Sun 9am–6pm" and SRH lines are explicitly labelled "(confirm at booking)". Replace with the real published hours + the clinic's own maps.
- [ ] **Addresses** — DISC "Unit 304, Block B, Building 27, Ibn Sina Street, DHCC" and the SRH street line are from the dossier; confirm the exact building/road once before go-live.
- [ ] **Claims review** — every credential and line traces to the research dossier; the "Mubadala Abu Dhabi Open 2025" line is worded as *official medical partner, part of the Healthpoint team* (the safe phrasing). Add any award / publication **only if you can verify it** — do not invent.
- [ ] **Reviews** — the "What patients say" section is an empty reserved placeholder on purpose. Populate only with genuine, consented, verifiable reviews before promoting the section.
- [ ] **Email** — an `mailto`/contact form is intentionally **not** included (call + WhatsApp are the conversion channels). Add one only if the practice wants it.

### Post-launch verification
- [ ] Lighthouse (mobile) — the targets are **Performance ≥ 95, A11y ≥ 95, Best Practices 100, SEO 100**. Single file, no CLS, LCP = the preloaded hero portrait; all should clear comfortably. Run: `npx lighthouse http://localhost:8931 --only-categories=performance,accessibility,best-practices,seo --form-factor=mobile --chrome-flags="--headless=new"` (or the Lighthouse extension against the live domain).
- [ ] Google Search Console — submit the domain, confirm canonical + `hreflang` en/ar resolve, submit the site URL. No sitemap is shipped; add one if you list multiple pages later.
- [ ] **Bing / AI readiness** — content already ships: a full **`Physician` schema** (name, `medicalSpecialty`, `knowsAbout`, work locations, `sameAs`), **`MedicalClinic`** for both clinics, a **`FAQPage`** block, `WebSite`, plus keyword-rich `<title>`/`meta description`, Open Graph/Twitter cards, `geo.region`/`meta author`. Plain-text headings + visible EN/AR content means LLM crawlers (GPTBot/ClaudeBot/PerplexityBot) can index the practice — **do not add `noindex` or bot-blocks**.
- [ ] PWA install — check the manifest/icons show as installable in Chrome/Edge mobile.
- [ ] EN ↔ AR toggle — switch, reload (persists in `localStorage`), verify RTL layout, title, and that no LTR string is left untranslated.
- [ ] Call / WhatsApp / Book deep links — tap-test on a real device (iOS Safari + Android Chrome + an Android phone with an iPhone in the pocket for the notch-safe sticky bar).

### Files you may want to localise
- All copy lives in `<span data-en="…" data-ar="…">…</span>` pairs in `index.html`.
- JSON-LD is in the `<head>` (one `<script type="application/ld+json">`).
- Phone/WhatsApp: search-replace `97145616870` (display) and `971 4 561 6870`.

---

## Design & claims discipline
See `DESIGN.md` for the full brief. In one line: **deep-pine / bone-ivory / honey-gold · Fraunces + Manrope (+ Cairo for AR) · a single "precision cross" seal as the brand mark.**
No fabricated reviews, awards, or numbers — the review section is a reserved placeholder and every clinical statement traces to the dossier.
