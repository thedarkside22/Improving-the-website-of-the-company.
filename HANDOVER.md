> ⚠️ **SUPERSEDED (2026-08-04).** This describes an earlier plan: porting
> Design H onto WordPress/Themify. The work actually in progress is the
> `flagship-site/` React app — see **`HANDOVER-FLAGSHIP.md`**. Keep this file
> for the WordPress stack facts in §1, which are still accurate, but do not
> start a session from it.

# HANDOVER — Build "Design H" in WordPress (Themify) locally

> **For the next session / developer.** This hands over the finished **Design H
> ("Definitive Precision")** front-end mockup and tells you exactly how to
> rebuild it in the client's real WordPress stack (**Themify Ultra + Themify
> Builder**) — starting **locally**, then staging, then production.
>
> Read `CLAUDE.md` first (repo rules + the golden safety rule), then this file.
> Last updated: 2026-07-05.

---

## 0. TL;DR

- The chosen, client-approved design is **Design H = the `designs/design-8-*`
  file set** (10 pages + shared `design-8.css` / `design-8.js` + real assets).
- It is a **front-end-only mockup** (plain semantic HTML/CSS/JS, no build step,
  no framework). It was deliberately authored to **port cleanly onto Themify**.
- The production site is **WordPress → Themify Ultra theme → Themify Builder**
  (confirmed from wp-admin). Your job: recreate Design H in Themify.
- **Never touch production directly.** Build local → staging → production, with a
  backup first (see §9 and `docs/03`, `docs/04`).
- Git: this work is on branch **`design-f-precision`**, pushed to remote
  **`origin/claude/blissful-feynman-cgkd2n`** (latest commit `eb97bf4`). Older
  directions A–G (`design-1..7`) are alternates; **ignore them — H is final.**

---

## 1. The production stack (what to match locally)

Confirmed from the live wp-admin (see `docs/01-how-the-site-is-built.md`):

| Piece | Value |
|---|---|
| Platform | WordPress (PHP, server-rendered) |
| Theme | **Themify Ultra** |
| Page builder | **Themify Builder** (bundled with the theme) |
| Project post type | **Portfolio** CPT (Themify) — this is the `/work/` content |
| Contact form | **Themify Builder Contact** addon (keeps reCAPTCHA) |
| Caching | **Themify Cache** |
| Multilingual | a translation plugin, **likely Polylang** (Arabic/RTL is a future project) |
| Migration | **All-in-One WP Migration** (use it to copy prod → local/staging) |
| Email | **WP Mail SMTP** — ⚠️ **Pro license expired, form emails were failing.** Ops fix needed before go-live. |

**Local environment:** use **LocalWP (Local by Flywheel)**, DevKinsta, or XAMPP.
Install the **same Themify Ultra + Themify Builder** you own, then either:
- Import a copy of production with **All-in-One WP Migration** (start from the
  real site), **or**
- Start a clean WordPress and install Themify Ultra + the Builder addons.

---

## 2. Design H — files & how to view

All under `designs/`:

```
design-8.css                 # shared styles: tokens, components, motifs, all page CSS
design-8.js                  # shared vanilla-JS interactions (no libraries)
design-8-home.html           # Home
design-8-build.html          # Solutions › Build & Engineer
design-8-equip.html          # Solutions › Equip (product catalog + quick-view)
design-8-test-maintain.html  # Solutions › Test & Maintain (services)
design-8-projects.html       # Projects gallery (filter + search)
design-8-project-sfda.html   # Case study — SFDA
design-8-project-kfshrc.html # Case study — KFSHRC
design-8-project-iau.html    # Case study — IAU
design-8-about.html          # About & Credentials (client-authored layout)
design-8-contact.html        # Contact (form + live Google Map)
assets/logo.png              # official full-colour logo lockup (transparent)
assets/hero-flag.png         # home hero background (flag)
assets/wwd-build.png / wwd-equip.png / wwd-test.png   # section + category-hero photos
assets/team-*.png            # 4 leadership photos
assets/videos/*.mp4          # 3 real workshop/project clips
assets/masarat-logo-*.png    # OLD logo variants (superseded by logo.png in H)
```

To preview: open `designs/design-8-home.html` in a browser (works offline except
Google Fonts + Material Symbols). Every nav link, CTA, filter, drawer and the
WhatsApp/map work.

Each `<section>` carries a **`data-wp="…"`** hint naming the Themify module to use
— your section-by-section build map is literally in the HTML.

---

## 3. Brand, structure & the decisions that are LOCKED

**Brand:** navy `#2E3192`, navy-deep `#1D2147`, navy-ink `#14183d`, orange
`#F7941E` (actions/accents only), white + neutral greys. Fonts **Sora**
(headings) + **Inter** (body); **Material Symbols** icons.

**Navigation (final IA):**
`Logo · Solutions ▾ (Build & Engineer / Equip / Test & Maintain) · Projects ·
About · Contact · [Contact us]`. The old "Products/Services/Solutions" split from
earlier directions is gone — Solutions now = the **three category pages**.

**Client decisions that MUST be preserved when rebuilding:**
1. **No "Request a Quote" everywhere.** CTAs are soft & varied: header button =
   **"Contact us"**; closing CTAs = "Discuss your project" / "Contact Masarat" /
   "Talk to our engineers/specialists". Don't reintroduce quote-spam.
2. **No certification PDF/badge anywhere.** The Standards & Credentials section
   shows the frameworks grid **only** — no "View credential" button, no PDF, and
   **do not** add "available on request" text. If a client wants a certificate,
   they contact and ask.
3. **No mention of the external cleanroom partner (MRC).** The GRP cleanroom
   system is described as **Masarat's own** capability. Keep it MRC-free.
4. **Honest product claims** (Equip page): a laminar clean bench is **not** a
   biological safety cabinet; a fume hood is **not** a BSC; don't call any product
   "certified" unless its own documentation supports it; items marked "subject to
   confirmation" (Class I/III BSC, ductless hoods, microbial samplers, ULPA/FFU)
   stay flagged until supplier data is confirmed.
5. **8-phase delivery ends in "Ongoing Support & Partnership"** (not "Project
   Closure") — the message is "we stay with you after handover."
6. **Marketing-led, relationship-first tone** on Home & About (talk about *who we
   are and why we care*, not just the transaction).

**Company facts** (already in the mockup): founded **2016**, Riyadh; phone
**+966 1148 70 043**; email **info@m4acc.com**; hours **Sun–Thu 08:00–17:00
(AST)**; address **6776 Al Ulaya، الورود، الرياض 12215**; standards SFDA · CBAHI ·
WHO · CAP · CDC · GMP · ISO 14644 · NSF (+ GLP/GMP, USP, NIH/BMBL, JCIA).

**Team (About page):** Faisal Alrasheedi — CEO & Founder · Turki bin Saud —
Director of Operations · Fawaz Kekya — Administrative Manager (مدير اداري) ·
Khalid Alzuwayyid — Manager of Service & Maintenance.

**Social:** LinkedIn `linkedin.com/company/m4acc-company` · X `x.com/masarat4acc`
· YouTube `youtube.com/@MasaratforAccreditation`.
**WhatsApp:** `wa.me/966114870043`. **Google Maps:** place = "Masarat for
Accreditation" at `24.718324, 46.6710433`.

---

## 4. Page-by-page (what each page contains)

- **Home** — photo hero (flag) + brand promise "Protecting what matters most";
  trust bar (standards + "Trusted by SFDA·KFSHRC·IAU·KFUH"); brand line
  "Saudi-founded. Standards-obsessed. Trusted where it matters most."; count-up
  **stats**; **What We Do** = 3 photo group-cards → Build/Equip/Test; **Selected
  Projects** (video-on-hover) → case studies; **8-phase delivery** (scroll-linked
  timeline, ends Ongoing Support); **Why Masarat**; **Standards grid** (no PDF);
  final CTA. Floating **WhatsApp** button (bottom-right).
- **Build & Engineer** — "Create the environment": 5 solution cards, "components
  we supply & integrate" (framed as engineered-solution components), 8 services
  checklist, compact 8-phase strip, related projects, pathway cross-links (Equip /
  Test), CTA.
- **Equip** — "Supply the products": filterable **product catalog** (9 families)
  with 3 comparison criteria each + **quick-view drawer** (variants), Equip
  services checklist, honest-claims callout, pathway cross-links, CTA.
- **Test & Maintain** — "Prove and protect performance": 4 grouped service cards
  (CQV & Validation / Cleanroom & Air-Quality Testing / Cabinet & Hood
  Certification / Maintenance & Support), "what we cover" tags, deliverables
  checklist + no-universal-interval note, pathway cross-links, CTA.
- **Projects** — filter (All/Cleanroom/BSL/GLP/Certification) + search; 8 real
  projects (SFDA, KFSHRC, IAU×2, ABMI, NAMI, Care Medical, KFUH) + 3 placeholders;
  video-on-hover; SFDA/KFSHRC/IAU link to case studies.
- **Case studies** (SFDA / KFSHRC / IAU) — hero facts, overview + video, scope,
  gallery (PHOTO placeholders), standards met, certificates line ("available on
  request", no PDF), related projects, CTA.
- **About** — client-authored layout: Why our work matters → What we do (trimmed,
  links to Build/Equip/Test) → How we work → **People** (4 real photos) → Values
  (Integrity/Quality/Responsibility/Partnership) → Standards grid (no PDF) → Why
  clients trust → CTA.
- **Contact** — details + **live embedded Google Map** + "Open in Google Maps";
  Request-a-Quote-style **form** (Name/Org/Email/Phone/Area of interest [Build/
  Equip/Test/General]/details + reCAPTCHA placeholder), front-end validation only.

---

## 5. The shared system (what to port once, globally)

### `design-8.css` (one stylesheet, all pages link it)
- `:root` **design tokens** (colours/spacing/type/radius) — paste into the child
  theme's stylesheet or Themify **Custom CSS**; everything keys off these.
- Components: `.btn-primary/.btn-ghost/.btn-navy/.btn-outline`, `.card`, `.chip`
  (+`--bsl`/`--std`), `.eyebrow`, `.section`, `.reveal`, `.tech-grid`, hero
  (`.hero--slim`, `.hero--photo`, `.hero-overlay`, `.glass-card`), `.compliance`,
  `.stats-band`, `.wwd-grid` (home group cards), `.solgrid`, `.comp-grid`,
  `.checklist`, `.phasemini-grid`, `.timeline`, `.pillars`, `.filter-bar`,
  `.project-card`, `.product-card` + `.drawer`, `.callout`, `.standards-grid`,
  `.facts`, `.gallery`, `.related`, `.pathway-*`, `.contact-grid`/form,
  `.cta-band`, footer + **`.footer-social`**, `.map-embed`, **`.wa-fab`**
  (WhatsApp), `.back-to-top`, `.cat-subnav` (category sub-nav). Logo rules render
  it **colour on the white header, white-knockout on the navy footer/menu**.
- A `@media (prefers-reduced-motion: reduce)` block disables all motion.

### `design-8.js` (vanilla, no dependencies, self-guarding)
Modules (each no-ops if its elements aren't present): sticky/shrinking **nav** +
mobile overlay (focus-trap, Esc) + accordion; **scroll-reveal**; **count-up
stats**; **scroll-linked 8-phase timeline** (`#delivery`); **filter + search**
(`[data-filter-group]`) for Projects/Equip; **quick-view drawer** (`#drawer`,
`.qv-trigger`, `.qv-content`); **contact form** validation; **scroll-spy**
(`[data-spy]` category sub-navs); **hover-video** on project cards; smooth
anchors; **back-to-top**; footer year. All gated by reduced-motion.

---

## 6. WordPress / Themify build plan

**Recommended overall approach — a Themify Ultra *child theme* + Builder pages:**

1. **Child theme** (`themify-ultra-child`): never edit the parent (updates wipe
   it — see `docs/02`, `docs/04`).
   - Enqueue **`design-8.css`** and **`design-8.js`**, plus Google Fonts (Sora +
     Inter) and Material Symbols, in `functions.php` (`wp_enqueue_style/script`).
   - Put the **global header & footer** here (or via Themify header + a custom
     footer) so the logo, nav, footer social row, address link, and the WhatsApp
     button are identical site-wide. Copy the markup verbatim from
     `design-8-home.html`.
2. **Menus:** Appearance → Menus. Primary menu = Solutions (parent) with
   Build/Equip/Test as sub-items, then Projects, About, Contact. "Contact us"
   button = a menu item with a button class.
3. **Pages** via **Themify Builder**. Each mockup `<section>` has a `data-wp` hint
   → build it with that module. Two ways to reproduce a section (pick per
   section):
   - **Builder-native** (staff-editable): Row/Column + **Feature** (icon cards),
     **Counter/Numbers** (stats), **Portfolio** (projects/case studies + Equip
     catalog — filter is built in), **Accordion**, **Video**, **Image/Gallery**,
     **Buttons**, **Map** (Contact), **Builder Contact** (the form). Add the
     matching CSS class from `design-8.css` in each module's *Additional CSS
     Class* field.
   - **Code/HTML module** (fastest, pixel-perfect): paste the section's mockup
     HTML directly; `design-8.css`/`js` style and animate it as-is. Best for the
     **bespoke interactive bits**: photo hero + overlay, the scroll-linked
     **timeline**, the Equip **quick-view drawer**, the **filter bars**, the
     **WhatsApp FAB**, and the **footer social row**.
   - **Hybrid is recommended:** native modules for plain content (editable),
     Code modules for the interactive flourishes.

### Section → Themify module quick map
| Design H piece | Themify implementation |
|---|---|
| Header + Solutions dropdown + "Contact us" | Theme header + **Menus** (button class) |
| Photo hero / slim hero + overlay | Builder **Row** with background image + Row overlay, or a Code module |
| Trust bar / compliance strip | Styled Text row or logo carousel |
| Count-up stats | **Counter / Numbers** module |
| What We Do (3 photo cards) | **Row + Feature/Image** modules (link each to its page) |
| Projects gallery + case studies | **Portfolio** CPT (filter built in) + Portfolio single template |
| Equip catalog + quick-view | **Portfolio**/Row grid + **Code module** for the drawer |
| 8-phase timeline | **Code module** (uses `#delivery` + `design-8.js`) or Accordion |
| Standards grid | **Row + Feature** modules |
| Contact form | **Builder Contact** module (reCAPTCHA + WP Mail SMTP) |
| Google Map | Themify **Map** module or a Code module `<iframe>` |
| WhatsApp button / social icons / address link | **Code module** or child-theme snippet |
| Footer | Theme footer / child-theme footer widget areas |

4. **Projects & case studies → use the existing Portfolio CPT.** Create a
   Portfolio category per type (Cleanroom / BSL / GLP / Certification) so the
   filterable Portfolio module reproduces the gallery; each case study is a
   Portfolio post using a single template styled to match.
5. **Assets → Media Library.** Upload `logo.png`, `hero-flag.png`, `wwd-*.png`,
   `team-*.png`, the videos; reference by their WP URLs (the mockup paths become
   `/wp-content/uploads/…`). The Media Library replaces the `PHOTO`/placeholder
   blocks with real project/team photos.
6. **WhatsApp button:** a small floating snippet in the child theme (or a
   "click-to-chat" plugin). Currently home-only in the mockup — decide if it
   should be **site-wide** (recommended for a chat button).
7. **Interactions:** most of `design-8.js` runs as-is once enqueued. Themify's
   own **row/module Animation** effects, sticky header, parallax and
   background-video can substitute for some effects if you prefer native.

---

## 7. Assets & content still needed (placeholders in the mockup)

- **Project photos & certificates** for the 8 real projects + the 3 case studies
  (currently `PHOTO`/PLACEHOLDER blocks). Confirm which **client names** may be
  shown publicly.
- Confirm the **SFDA workshop clip** identity (`assets/videos/workshop-sfda.mp4`).
- **Case-study years** are `PLACEHOLDER`.
- Optional: a **tagline-free horizontal logo** for the nav (the current lockup's
  descriptor line renders small at nav height — cosmetic only).
- Optional: a purely-English or all-Arabic version of the **address** (it
  currently mixes English + Arabic, renders bidi-correctly but you may prefer one
  script).
- Supplier data before publishing detailed specs for the "subject to
  confirmation" Equip items.

---

## 8. Multilingual / Arabic (future)

A translation plugin (likely Polylang) is already installed. Arabic + full RTL is
a **later project** (there's an "AR" toggle placeholder in the footer). When
tackled: mirror layout with `dir="rtl"`, an Arabic font, and translated Portfolio/
page content per language.

---

## 9. The golden rule (do not skip)

**The live site serves real customers.** Work **local → staging → production**;
take a **backup** before any production change (All-in-One WP Migration helps);
promote only after review & sign-off. If unsure whether an action touches
production, **stop and ask.** Full workflow: `docs/03-staging-explained.md`,
`docs/04-safe-editing-playbook.md`, and `designs/WORDPRESS-MAPPING.md`.

Also on the ops list: **renew/replace WP Mail SMTP** so contact-form emails
actually send (they were failing on the live site).

---

## 10. Key references in this repo

- `CLAUDE.md` — repo rules + safety.
- `docs/01-how-the-site-is-built.md` — confirmed stack (Themify).
- `designs/WORDPRESS-MAPPING.md` — mockup → Themify module mapping.
- `docs/company-profile.md`, `docs/website-copy.md` — source facts & copy.
- `docs/masarat-build-equip-test-maintain-map.md` — the Build/Equip/Test content map.
- `docs/masarat-about-page-layout-and-content.md` — the About page brief.
- `designs/design-8-*` — **the design to build.**
- `designs/index.html` — the "Direction H" chooser card.
