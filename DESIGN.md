# Design Language — Dr. Shimas Salih · MSK & Sports Medicine (V3)

> **Deliverable 1 of 4**: design-language brief (V3 graphic-design pass).
> V3 elevates V2 from a competent site to a **graphic-design piece**: a **metallic Rolls-Royce-grade SS crest**, a **Trajan-engraved (Cinzel) wordmark**, an **animated joint-study measurement motif** in the hero, a **clinical knee-anatomy panel** below the hero portrait (the "what this practice is about" anchor), **monogram-badge credentials** on a deep-pine band, explicit `[dir=rtl]` layout mirrors (works in every browser), and progressive-enhancement reveals that stay content-visible without JS.

## 1 · Palette (unchanged from V2 — deep, posh, established)
| Name  | Hex  | Use                                            |
|-------|------|-----------------------------------------------|
| pine  | `#0E2A24` | sections on "ink band" — Approach, Call card, Credentials, Footer |
| pine-2| `#0B231E` | footer / alt |
| bone  | `#F3EFE5` | primary background |
| bone-2| `#ECE7DB` | cards, About alt, "What patients say" section |
| card  | `#FBF9F4` | elevated cards, chips, condition cards |
| ink   | `#0F1B17` | text |
| ink-soft| `#41524B` | secondary text |
| ink-mute| `#65756E` | captions, labels |
| gold  | `#B9873E` | primary metallic |
| gold-2| `#D9B478` | highlight, CTAs on dark |
| gold-3| `#86642B` | engraved text, dark backgrounds |

## 2 · Type system (V3 adds CINZEL)
| Role | Font | Weight | Where |
|------|------|--------|-------|
| Display H1/H2 | **Fraunces** (opsz auto, 480-520) | 480–520 | Headings (both EN and AR) |
| UI/Body | **Manrope** | 450–700 | Default, lists, labels |
| **Wordmark** | **Cinzel** | 600 | Header brand name, `.brand-name`, `.sec-idx` numerals, `.cert-m` monograms, `.cc-lbl`, `.ftr-name` — the *engraved* register for the "establishment" voice |
| Arabic UI + display | **Cairo** | 500–700 | AR body + AR headings |

Self-hosted, no CDN, WOFF2, `@font-display: swap`.

## 3 · Logo / Crest
- **Monogram crest** (the Rolls-Royce ask): two Fraunces "S" letters interlocking, metallic gold (three-stop gradient from `#F0D9A2 → #CEA24F → #9A7430`), inside a **double hairline ring** + **compass ticks** at 12/3/6/9 + a **single gold precision dot** at bottom. Reads like a heraldic seal.
- Two variants: on-bone (dark outline of the smaller S via knockout) and on-pine (ivory knockout) — legible on both.
- A **flat monochrome `<symbol id="crest">`** is injected once at body top for **inline use anywhere** (header brand, footer crest, float chip, and — per the watermark ask — the knee-anatomy panel corner).
- The crest also serves as `favicon.svg` + `mask-icon` + the PWA icons (rendered at 16/32/48/96/128/180/192/512 + a `maskable-512`).

## 4 · Animated MSK motif (the graphic-design anchor)
- **`#jt` — joint-study** (240×240 symbol): concentric reference arcs, compass ticks, small anatomical dots, a rotating "ultrasound scan line" (sweeps 0→360° over ~14s), and a pulsing ping ring. Used as a *subtle top-right corner motif* of the hero portrait (opacity 0.22, behind the face, not on it). Reads as a "measurement dial," not a reticle.
- **`#knee` — knee anatomy** (300×340 symbol): femur + tibial shafts, femoral condyles, patella (animated to flex ±1.6° over 5.6s), cartilage layer (subtle pulse), ACL dashed, meniscus arcs, a radiating joint-space "ping" (3.4s ease-out), a 6.8s ultrasound sweep line, measurement ticks. Rendered in a **framed `.kn-panel`** beneath the hero portrait, titled *"Knee joint · clinical anatomy,"* with a caption *"Ultrasound-guided cartilage mapping · assessment, injection, PRP, rehab in one visit."*
- All animations honour `prefers-reduced-motion: reduce` (animations collapse to ~0ms and reveal state resolves to visible).

## 5 · Section-by-section treatment (what makes V3 different from V2)
| Section | V2 (competent) | V3 (graphic-design) |
|---------|----------------|---------------------|
| Header | Crest + wordmark + nav + EN toggle | Cinzel engraved brand, metallic crest, hairline scroll shadow, clean EN/ع pill |
| Hero | Serif H1 + CTAs + portrait | Kicker + big serif H1 with gold italic second line (underlined) + dual CTA + **joint-study corner motif** behind portrait + **knee-anatomy panel** with animated diagram + crest + caption |
| Credentials | Pills scrolling horizontally | **Deep-pine band** with 9 monogram badges in a responsive grid, gold ring + Cinzel monogram, full-name in a small line — wraps 2-up on mobile, 3-up at 601-960px, 9-up on desktop, all fully visible |
| About | Copy + timeline | Same content, editorial `.p1` lead + *motto with gold rule* + language chips; timeline rail with gold dots, years in Cinzel |
| Conditions | Numbered cards | Editorial serif initials (K/T/F/S/R/U), gold left-bar reveal on hover, Cinzel icon tile with gold ring |
| Approach | 3-step dark band | Dark ink band, gold-stroked 01/02/03 (hollow Fraunces numerals), gold hairlines, watermarked crest top-right |
| Athletes | Copy + photo + credentials | Joint-study motif faintly in background, DISC portrait photo with crest caption pill, gold diamond markers for credentials |
| What patients say | Reserved placeholder | Big gold Fraunces opening-quote glyph, italic display quote, gold "verified via DISC or SRH" pill — *zero fabricated reviews* |
| FAQ | Accordion | Chevron → gold-filled disc on open, smooth open/close, first-openable on mobile |
| Contact | Two location cards + call card | Two location cards (crest + sub-label in gold, hours with a confirm-at-booking note, Book/Call/Maps row), then the pine **Call-WhatsApp-Booking** card with Cinzel eyebrow, big serif phone, gold WhatsApp CTA |
| Footer | Cream on pine | Crest watermark 420px behind at 0.04 opacity, crest in the brand block, Cinzel name in small caps |
| Sticky bar | Call / WhatsApp / Book | Same, notch-safe via `env(safe-area-inset-bottom)` |

## 6 · Language switch (V3 fix)
V2's `<button>ع | EN</button>` read as a cramped divider+icon. V3 replaces it with a **segmented pill toggle** (two buttons in a bordered group; active one is pine-filled with ivory text). The toggle is wired in JS to `?lang=en`/`?lang=ar` + `localStorage`, swaps `data-en`/`data-ar` in place, and persists. Explicit `[dir="rtl"]` CSS mirrors every section (hero, about, approach, athletes, contact, footer) so the RTL layout works even in headless Edge and other browsers that don't invert grid order automatically.

## 7 · SEO + AI-crawlability (V3 reinforced)
- `<title>` and `meta description` rewritten for "MSK & Sports Medicine UAE Dubai Abu Dhabi" + physician first.
- `hreflang` en + ar, `geo.region=AE`, canonical, Open Graph + Twitter cards, PWA manifest, apple-touch-icon.
- **JSON-LD** `Physician` (name, `medicalSpecialty`, `knowsAbout`, `sameAs` → Okadoc), `MedicalClinic` ×2 (DISC DHCC + SRH Abu Dhabi), `FAQPage` ×5 real questions, `WebSite`.
- No `noindex`, no bot-blocks — GPTBot / ClaudeBot / PerplexityBot can index the full content (visible EN + visible AR strings both in the DOM).
- Progressive-enhancement reveals: **content-visible without JS** (the `.js .rv-pending` class gates the hidden state; if JS fails, no hidden class, everything is visible = crawlable).

## 8 · Accessibility / motion
- `::selection` in gold, `:focus-visible` a 2.5px gold outline with 3px offset, skip-link, all interactive controls `role`/`aria` correct.
- `prefers-reduced-motion: reduce` collapses all animations to ~0ms and makes reveals instant.
- Contrast (WCAG AA): pine on bone = 8.4:1, gold-3 on bone = 5.8:1, gold-2 on pine = ~5.6:1.
- `scroll-behavior: smooth` + `scroll-margin-top` for sticky-header anchor targets.
