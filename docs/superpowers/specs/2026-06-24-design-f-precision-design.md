# Design F — "Precision" · Design Spec

> Status: **approved** (2026-06-24). Direction F for the Masarat for Accreditation
> website redesign. Front-end-only HTML mockup set, consistent with directions
> A–E in `designs/`, built to port 1:1 onto **Themify Ultra + Themify Builder**.
> Source facts: `docs/company-profile.md`, `docs/website-copy.md`,
> `docs/website-product-catalog-blueprint.md`, `docs/compact-website-structure.md`.

## 1. Goal & constraints

Build the most modern, trustworthy, interactive direction yet: a clinical-modern,
engineering-grade look on the **navy / orange / white** brand, with tasteful,
professional motion. It must:

- Read as **precise, clinical, credible** — appropriate for a biosafety/cleanroom
  firm whose clients are regulators, hospitals and universities.
- Use **interactivity + small, professional animation** (no gimmicks); all motion
  gated by `prefers-reduced-motion`.
- Be a **full connected direction**: every nav link and CTA wired.
- **Hybrid structure**: engineered *Solutions* and a *Products* catalog stay
  distinct.
- Port cleanly to **Themify Builder** → use a `:root` token block + semantic,
  section-based CSS (NOT Tailwind utility soup), a `data-wp="…"` hint on every
  `<section>`, and isolated, gracefully-degrading JS for bespoke flourishes.
- **No build step, no external JS libraries.** Vanilla JS only. Google Fonts +
  Material Symbols + the existing logo/video assets are the only external loads.

## 2. Design language

### Color tokens (in `:root`)
```
--navy:        #2E3192;   /* brand primary */
--navy-deep:   #1D2147;   /* anchor bands / hero */
--navy-ink:    #14183d;   /* deepest text-on-light / footers */
--orange:      #F7941E;   /* single action color */
--orange-deep: #e07d0a;   /* hover state for orange */
--white:       #FFFFFF;
--surface:     #F8F9FE;   /* page background */
--surface-2:   #F5F6FB;   /* alt section background */
--ink:         #191C1F;   /* body text */
--muted:       #46464E;   /* secondary text */
--line:        #E1E2E7;   /* hairline borders */
--danger:      #BA1A1A;   /* BSL-3/4 status chip only */
--radius:      14px;      /* card radius */
--maxw:        1280px;    /* content max width */
```
Orange is reserved for actions, eyebrows, and key accents — never large fills.

### Typography
- Headings: **Sora** (400/600/700/800) — geometric, modern, precise.
- Body/UI: **Inter** (400/500/600/700).
- Stats/numerals: Sora, tabular figures.
- Scale (clamped, responsive): display `clamp(2.4rem,5vw,3.5rem)`, h2
  `clamp(1.8rem,3.2vw,2.5rem)`, h3 `1.25rem`, body `1rem/1.65`, eyebrow
  `0.75rem` uppercase `letter-spacing:.18em`.

### Signature motifs
- **Tech grid**: hairline 24px grid (`linear-gradient` lines at `--line`) on
  navy and light sections, low opacity.
- **Airflow line**: thin orange SVG/CSS line that animates (slow dash-offset or a
  travelling highlight) in the hero — the brand's "clean, directed airflow."
- **Measurement tick-marks** as section/figure accents.

### Core components (defined once in `design-6.css`)
- `.eyebrow` — orange uppercase label with a short rule.
- `.btn-primary` (solid orange, arrow nudges on hover), `.btn-ghost` (outline on
  navy), `.btn-navy`.
- `.card` — white, hairline border, soft lift + orange border on hover.
- `.stat` — big Sora number + caption.
- `.chip` — small status/standard pill; `.chip--bsl` uses `--danger`.
- `.section` — vertical rhythm wrapper (`padding: clamp(64px,9vw,112px) 0`).
- `.reveal` — base state for scroll-reveal (JS adds `.is-in`).

## 3. Shared assets

### `designs/design-6.css`
Tokens, base/reset, typography, the components above, the motifs (tech-grid,
airflow keyframes), header/nav (sticky + scrolled state + dropdown + mobile
overlay), footer, and per-component responsive rules. One stylesheet, all pages
link it.

### `designs/design-6.js`
Self-contained, defensive (feature-detect, `prefers-reduced-motion` guard,
`DOMContentLoaded`). Modules:
1. **nav** — sticky shrink/shadow on scroll; mobile overlay open/close (focus
   trap, Esc, body-scroll-lock); Solutions dropdown (hover + keyboard).
2. **reveal** — IntersectionObserver adds `.is-in` to `.reveal` (staggered).
3. **counters** — count-up for `[data-count]` when in view.
4. **timeline** — scroll-linked progress fill + node activation for the 8-phase
   delivery timeline (`#delivery`).
5. **projects** — live category filter + text search on the projects grid;
   play/pause `<video>` on card hover.
6. **drawer** — products quick-view slide-in panel (open from card, close on
   overlay/Esc, focus management).
7. **contact** — front-end form validation + success state (no email sent).
8. **misc** — smooth anchor scroll, back-to-top button, current-year in footer.

Each module no-ops gracefully if its target elements are absent (pages only wire
what they use).

## 4. Global header & footer (identical on every page)

**Header** (`<header data-wp="theme-header (Appearance → Menus)">`): logo
(`assets/masarat-logo-light.png`) left; nav center — **Solutions ▾ · Products ·
Projects · About · Contact**; **Request a Quote** orange button right; mobile
hamburger. Solutions dropdown links to the Solutions page section anchors. Active
page gets `aria-current="page"` + an orange underline. Sticky; gains shadow +
slight shrink on scroll.

**Footer** (`<footer data-wp="theme-footer widget areas">`): logo + tagline,
nav columns (Solutions / Products / Company), contact block (📞 +966 1148 70 043
· ✉️ info@m4acc.com · 📍 Riyadh, KSA · Sun–Thu 08:00–17:00 AST), compliance strip
(SFDA · CBAHI · WHO · CAP · CDC · GMP · ISO 14644 · NSF), an assurance line, AR toggle placeholder, copyright with JS year.

> Build rule for parallel page authors: **copy the header/footer markup verbatim
> from `design-6-home.html`**; change only the `aria-current`/active-nav state.

## 5. Pages & sections

All files live in `designs/`, prefix `design-6-`. Content must come from the
source docs above — no invented specs, model numbers, or unconfirmed claims.

### 5.1 `design-6-home.html` — Home (the reference page)
1. **Hero** (navy band, tech-grid + airflow motif): eyebrow "Precision Biosafety
   & Cleanroom Engineering"; H1 "Infection & Contamination **Control Solutions**"
   (orange accent); subhead from website-copy; CTAs **Request a Quote** /
   **Watch our work**; glass trust card "ISO 14644 Certified". `data-wp="hero row"`.
2. **Compliance strip** — SFDA · CBAHI · WHO · CAP · CDC · GMP · ISO 14644 · NSF.
3. **Stats band** — Founded 2016 · 8 capability areas · 10+ standards/bodies ·
   BSL-3 & 4 (count-up). `data-wp="Counter modules"`.
4. **What we do** — refined **bento** of the 8 categories grouped Build · Equip ·
   Test & Maintain; hover + scroll-reveal. `data-wp="Row + Feature modules"`.
5. **Modular Cleanroom spotlight** — GRP value props + image placeholder +
   Design » Supply » Construct » Install » Commission mini value-chain.
6. **8-phase delivery timeline** (`#delivery`) — scroll-linked progress.
7. **Why Masarat** — value pillars.
8. **Selected projects** — 3–4 cards, video-on-hover, → case studies & gallery.
9. **Standards & NSF credential** — strip + NSF credential card (View PDF).
10. **Training/workshop** — `assets/videos/workshop-sfda.mp4` teaser.
11. **Final CTA** (navy band) → Request a Quote. 12. Footer.

### 5.2 `design-6-solutions.html` — Solutions (engineered services)
Slim navy hero + intro. Anchored sections (match the Solutions dropdown):
`#cleanrooms` Turnkey Cleanroom & GMP · `#biocontainment` BSL-3/4 · `#air-quality`
Air Quality Validation Testing (areas + test list from company-profile §8) ·
`#cqv` Commissioning, Qualification & Validation · `#bsc` BSC Testing &
Certification (test list from §9) · `#installation` Installation · `#consultancy`
Consultancy · `#training` Training. Include the **8-phase "How we deliver"**
method. Each block: title, one-liner, what's included (3 key points), applicable
standards (chips), **Request a Quote** CTA. Cross-link Products & Projects.
`data-wp="Rows + Feature/Accordion modules"`.

### 5.3 `design-6-products.html` — Products catalog
Slim hero + intro. **Filter tabs** (All · Safety Cabinets & Hoods · Lab Equipment
· Cleanroom Systems · Monitoring) + **search**. Product-family cards with the
**three headline criteria** from the catalog blueprint §4 and **Quick view** →
drawer (overview, applications, standards, Request a Quote). Launch-first families
live (GRP **featured**; Biological Safety Cabinets; Laminar Flow Clean
Benches; Laboratory Fume Hoods); "expanding range" families clearly marked as such
(Autoclaves, Freezers, Centrifuges, CO₂ Incubators, Lab Furniture, Environmental
Monitoring Instruments) per blueprint §10. Include the blueprint §4 **safety
callouts** (BSC vs laminar bench vs fume hood; the NSF-claim caution).
`data-wp="Portfolio module (filter) or Row grid + Code module (drawer)"`.

### 5.4 `design-6-projects.html` — Projects gallery
Slim hero + intro. **Filter** (All · Cleanroom · BSL · GLP · Certification) +
**search**. Grid of cards (image/video-on-hover, client, location, type chips).
8 real projects (SFDA, KFSHRC, IAU ×2, ABMI, NAMI, Care Medical, KFUH) + 3 marked
placeholders. Real case studies link to detail pages; others to a clearly-marked
"detail coming soon". `data-wp="Portfolio module (filterable)"`.

### 5.5 Case studies — `design-6-project-sfda.html`, `-kfshrc.html`, `-iau.html`
Consistent template, distinct hero treatments. Sections: hero with project facts
(client · location · type · year · standards chips); overview; scope of work;
photo gallery (placeholders, marked); video where available; standards met;
certificates & reports (placeholders); related/next project; CTA. `data-wp="Portfolio
single template"`.

### 5.6 `design-6-about.html` — About & Credentials
Story (founded 2016, specialization), our people/team (placeholders), our GRP cleanroom systems, **Our Value** pillars, the **value chain** (Design→Commission),
**Standards & Credentials** grid (ISO 14644-1/2, GLP/GMP, USP <797>/<800>,
WHO/CDC/NIH/BMBL, SFDA, CBAHI, JCIA, CAP, NSF) + the **NSF credential card** with
**View NSF Credential (PDF)** (exact-title placeholder; no blanket "NSF certified"
claim), sustainability note, CTA. `data-wp="Rows + Feature/Accordion modules"`.

### 5.7 `design-6-contact.html` — Contact / Request a Quote
Split layout: left = contact details + map placeholder; right = form (Name ·
Organization · Email · Phone · Service of interest [dropdown of the 8 categories]
· Project details · reCAPTCHA placeholder · Send). Front-end validation + success
message only (no email). "We reply within one business day."
`data-wp="Builder Contact module"`.

## 6. Interactivity & animation (acceptance)
Scroll-reveal (staggered) · sticky shrink nav + scroll-spy on Solutions ·
count-up stats · hero airflow motif · scroll-linked 8-phase timeline · bento
hover · video-on-hover project cards · live product/project filter + search ·
quick-view drawer · smooth anchor scroll · back-to-top · accessible mobile
overlay & drawer (focus trap, Esc, `aria-*`). **All motion respects
`prefers-reduced-motion: reduce` (reveals become instant, loops stop).**

## 7. Accessibility & performance
Semantic landmarks; one `<h1>` per page; visible `:focus-visible`; ≥4.5:1 text
contrast; alt text / `aria-label`s; keyboard operability for nav/dropdown/drawer/
filters; `<video muted playsinline preload="none" loading="lazy">`; images lazy
where possible; no layout shift from reveals; works offline except fonts/icons.

## 8. WordPress / Themify mapping (summary)
Header/footer → Themify Ultra (child theme for global chrome) + Menus. Sections →
Themify Builder **Row/Column + Feature**; stats → **Counter**; projects/case
studies → **Portfolio** CPT (filter built in); products → Portfolio or Row grid +
**Code module** drawer; accordions → **Accordion**; videos → **Video**; contact →
**Builder Contact**. Bespoke motion (hero motif, timeline, drawer) → **Code
module / Custom CSS** reusing `design-6.css`/`design-6.js` verbatim. Full table in
`designs/WORDPRESS-MAPPING.md`.

## 9. File manifest
```
designs/design-6.css                 # shared styles (tokens, components, motifs)
designs/design-6.js                  # shared interactions
designs/design-6-home.html           # reference page
designs/design-6-solutions.html
designs/design-6-products.html
designs/design-6-projects.html
designs/design-6-project-sfda.html
designs/design-6-project-kfshrc.html
designs/design-6-project-iau.html
designs/design-6-about.html
designs/design-6-contact.html
designs/index.html                   # UPDATE: add Direction F card
designs/README.md                    # UPDATE: document Direction F
```

## 10. Acceptance criteria
- All 9 pages share an identical header/footer and the same look/tokens.
- Every nav link, dropdown item, CTA, project card and quick-view works.
- Real brand, logo, copy, contacts, projects, videos; placeholders clearly marked.
- Interactions in §6 function and degrade with reduced-motion.
- Every `<section>` carries a `data-wp` hint.
- No external JS libraries; no build step; files open directly in a browser.
- Direction F appears in `designs/index.html` and is documented in README.
