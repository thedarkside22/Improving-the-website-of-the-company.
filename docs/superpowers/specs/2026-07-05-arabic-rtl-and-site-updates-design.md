# Spec — Arabic/RTL build + Projects filter + Trusted-by logos + Go-live checklists

> Design H ("Definitive Precision") = the `designs/design-8-*` file set.
> Date: 2026-07-05. Branch: `design-f-precision`.
> **Roles:** Opus (this spec + decisions + final review). **Sonnet 5** makes all file
> edits. A native Arabic speaker proofreads the Arabic copy before go-live.

---

## 0. Locked decisions

1. **Arabic copy source:** Sonnet drafts professional **Modern Standard Arabic**; every
   Arabic page is marked "pending native proofread." User proofreads before go-live.
2. **Arabic scope:** **all 10 pages**, full RTL mirror, this pass.
3. **Projects filter:** rename **Certification → Workshops / Training** (new category
   `training`); re-file the KFUH TB-Lab job under **Biocontainment (BSL)**.
4. **Trusted-by:** replace the client **names** row with a **logo strip** (real logos
   cleared; user drops files into `assets/logos/`). Names kept as graceful fallback.

**Dependency / order:** Arabic pages must mirror the *updated* English pages, so the
English edits (B, C) land **before** the Arabic build. Sequence: Wave 1 (English + docs)
→ Wave 2 (RTL foundation) → Wave 3 (remaining Arabic pages) → Opus review.

---

## A. Arabic / RTL build

### A.1 Structure
- One Arabic twin per page — **10 new files**, same folder (`designs/`):
  `design-8-home-ar.html`, `-build-ar`, `-equip-ar`, `-test-maintain-ar`,
  `-projects-ar`, `-project-sfda-ar`, `-project-kfshrc-ar`, `-project-iau-ar`,
  `-about-ar`, `-contact-ar`.
- Each Arabic page is a **content translation of the finished English page** — same
  structure, same section order, same `id`/`data-*`/class hooks, same asset paths.
  Only the human-readable text changes (+ the RTL attributes/CSS below).
- Root element: `<html lang="ar" dir="rtl">`.
- `<title>` and `<meta name="description">` translated to Arabic.

### A.2 CSS approach — override layer (do NOT edit `design-8.css`)
- New stylesheet **`designs/design-8-rtl.css`**. Arabic pages link **both**, base first:
  ```html
  <link rel="stylesheet" href="design-8.css">
  <link rel="stylesheet" href="design-8-rtl.css">
  ```
- `design-8.css` stays byte-for-byte unchanged so the English site cannot regress.

### A.3 Arabic typography (correctness-critical)
- Font: **IBM Plex Sans Arabic** (Google Fonts), used for **both** headings and body in
  Arabic (Sora/Inter have no Arabic). Add the Google Fonts `<link>` to each Arabic page.
- In `design-8-rtl.css`: set `body, h1, h2, h3, h4 { font-family: "IBM Plex Sans Arabic", "Segoe UI", Tahoma, sans-serif; }`.
- **Remove `letter-spacing` on all Arabic text** — negative/positive tracking breaks
  Arabic letter-joining. Set `letter-spacing: normal` for headings, `.eyebrow`, `.btn`,
  `.chip`, `.stat-label`, `.nav-links`, `.compliance span`, `.filter-btn`, footer labels.
- Arabic has no letter case: `text-transform:uppercase` is harmless but ensure eyebrows/
  chips still read well; keep the small-caps look only via weight/color, not casing.
- Headings: drop the `-0.02em` tracking (handled by the `letter-spacing:normal` rule).

### A.4 Directional flips (make it a true mirror, not just flipped text)
Handle all of these in `design-8-rtl.css` (prefer CSS; **do not fork `design-8.js`**):
- **Header:** logo sits right, nav flows right→left, "Contact us" button on the left.
- **Dropdown + mobile menu:** mirror open side / alignment.
- **Directional arrow icons** (`arrow_forward`, `arrow_right_alt`) in buttons and
  `.link-arrow`: point **left**. Flip with `transform: scaleX(-1)`, and flip the hover
  nudge so the arrow still moves *toward* its edge (RTL hover = move left).
- **`.eyebrow::before`** accent bar: ends up on the right of the label (inline-flex +
  RTL usually handles this — verify).
- **8-phase timeline** (`#delivery`): progress must fill from the **right**; check
  `.timeline-progress` origin and any `left/right` offsets on `.node`.
- **Equip quick-view drawer** (`.drawer`): slides in from the **left** (flip its
  `translateX` and its `left/right` anchoring).
- **Floating buttons:** `.wa-fab` and `.back-to-top` move to the **bottom-left**
  (`right:auto; left:24px`).
- **Directional gradients/overlays** (`.hero-overlay`, `.hero-glow`): mirror so text stays
  on the readable side.
- **Filter bar + search** and **category sub-nav** (`.cat-subnav`, scroll-spy): mirror
  alignment.
- Verify `design-8.js` has no hardcoded left/right that breaks in RTL; if it does, fix via
  CSS. Only touch the JS if genuinely unavoidable, and note it in the handback.

### A.5 Language toggle
- Today `.ar-toggle` is a `<button>` placeholder. Make it a real `<a>`:
  - On **English** pages: `<a class="ar-toggle" href="design-8-<page>-ar.html">العربية · AR</a>`.
  - On **Arabic** pages: `<a class="ar-toggle" href="design-8-<page>.html">English · EN</a>`.
- Wire the correct counterpart href on **every** page (both directions), footer of each.

### A.6 Copy rules
- Professional **MSA**. Warm, relationship-first tone matching the English (see §3 of
  `HANDOVER.md`). Keep the same client-decision guardrails (no quote-spam, no cert PDF,
  no MRC mention, honest product claims, phase 08 = "Ongoing Support & Partnership").
- Add at the very top of each Arabic page an HTML comment:
  `<!-- ⚠ Arabic copy is a draft (MSA) — pending native proofread before go-live. -->`
- **Do NOT translate** (keep Latin, inline, with correct bidi): SFDA, CBAHI, WHO, CAP,
  CDC, GMP, ISO 14644, NSF, BSL-3, BSL-4, GLP, USP, JCIA, NIH, BMBL, CQV, HVAC, GRP,
  KFSHRC, IAU, KFUH, ABMI, NAMI, Care Medical, m4acc.com, email, phone.
- **Western numerals** (0-9) throughout — standards, years, phone, stats (`data-count`
  values unchanged).
- Assets, ids, classes, `data-*`, video/logo/photo paths: identical to the English page.

### A.7 Arabic glossary (draft — proofread later; MUST be identical across all pages)
| English | Arabic (draft) |
|---|---|
| Masarat for Accreditation | مسارات للاعتماد |
| Solutions | الحلول |
| Build & Engineer | البناء والهندسة |
| Equip | التجهيز |
| Test & Maintain | الاختبار والصيانة |
| Projects | المشاريع |
| About / About & Credentials | من نحن / من نحن والاعتمادات |
| Contact (nav) / Contact us (button) | اتصل بنا / تواصل معنا |
| What we do | ما نقوم به |
| Selected projects | مشاريع مختارة |
| How we deliver | منهجية عملنا |
| Why Masarat | لماذا مسارات |
| Standards & credentials | المعايير والاعتمادات |
| Trusted by | موضع ثقة |
| Workshops / Training | ورش العمل والتدريب |
| All | الكل |
| Cleanroom | الغرف النظيفة |
| Biocontainment (BSL) | الاحتواء الحيوي (BSL) |
| Explore our solutions | استكشف حلولنا |
| Watch our work | شاهد أعمالنا |
| Discuss your project | ناقش مشروعك |
| View case study | عرض دراسة الحالة |
| View all projects | عرض كل المشاريع |
| Chat with us (WhatsApp) | تحدّث معنا |
| Back to top | العودة إلى الأعلى |
| Protecting what matters most (hero H1) | نحمي ما هو أهمّ |

---

## B. Projects filter → Workshops / Training  (`design-8-projects.html`)

- Filter button: `data-filter="certification"` → `data-filter="training"`;
  label `Certification` → `Workshops / Training`; keep `aria-pressed`/roles correct.
- **KFUH card** (currently `data-cat="certification"`, chip "Certification"): re-file to
  `data-cat="bsl"`, chip → `chip--bsl` "BSL-3" (TB containment lab). Title stays
  "KFUH — TB Lab Certification"; update `data-search` to drop "certification"-only intent.
- **Placeholder cards:** the `data-cat="certification"` placeholder → `data-cat="training"`,
  relabelled as a workshop/training placeholder ("Upcoming Workshop / Training"). Add one
  **more** `data-cat="training"` placeholder so the new tab shows content. Give them a
  "Training" chip using existing `.chip--std` styling (no new CSS).
- Hero lead currently mentions projects only — widen slightly to acknowledge the workshops
  & training we run (one clause), without overclaiming.
- No JS/CSS changes needed (filter is data-driven).

---

## C. Trusted-by → logo strip  (`design-8-home.html` + `design-8.css`)

- Replace `<p class="trusted-by">Trusted by <b>SFDA</b> · <b>KFSHRC</b> · <b>IAU</b> · <b>KFUH</b></p>`
  with a graceful logo strip. Use the **background-image** pattern (same as `.hero-photo`)
  so a **missing** logo file shows nothing broken (no broken-image icon), and the name
  below always shows as fallback:
  ```html
  <div class="trusted-logos" aria-label="Trusted by SFDA, KFSHRC, IAU and KFUH">
    <span class="tl-lead">Trusted by</span>
    <span class="tl-item"><span class="tl-logo" style="background-image:url('assets/logos/sfda.png')"></span><span class="tl-name">SFDA</span></span>
    <!-- kfshrc.png / iau.png / kfuh.png … -->
  </div>
  ```
- Add `.trusted-logos` styles to `design-8.css` (append; don't disturb existing rules):
  centered flex row, even logo height (~34–40px), `.tl-logo` muted (opacity ~.65,
  grayscale) → full colour/opacity on hover, `.tl-name` small uppercase muted caption.
- Real files (user provides): `assets/logos/sfda.png`, `kfshrc.png`, `iau.png`, `kfuh.png`
  (transparent PNG/SVG). Note these in the content checklist.

---

## D. Go-live checklists (two new docs in `docs/`)

### D.1 `docs/go-live-content-checklist.md` — content & assets to gather
Group as checkboxes: real project photos + hover videos (labelled per project), equip
product photos, team photos already done, **client-name + logo publication permissions**
(esp. SFDA/regulators), Arabic **native proofread**, case-study **years** (placeholders),
supplier data for the "subject to confirmation" Equip items, tagline-free horizontal nav
logo (optional), confirm SFDA workshop clip identity, finalize workshop/training entries.

### D.2 `docs/go-live-build-ops-checklist.md` — WordPress build + ops
Themify Ultra **child theme**; enqueue `design-8.css` + `design-8-rtl.css` + `design-8.js`
+ Google Fonts (Sora, Inter, IBM Plex Sans Arabic, Material Symbols); global header/footer;
menus (Solutions dropdown + "Contact us" button); Portfolio CPT + categories (Cleanroom /
BSL / GLP / **Workshops-Training**); Builder Contact + reCAPTCHA; **renew WP Mail SMTP**
(forms were failing); Polylang EN/AR wiring + RTL; **fix orange-on-white contrast** on
`.eyebrow`/small orange text (fails WCAG AA); backups (All-in-One WP Migration);
local → staging → production promotion + sign-off; redirects; analytics; caching (Themify
Cache). Reference `docs/03`, `docs/04`, `designs/WORDPRESS-MAPPING.md`.

---

## E. Build sequence (agents)

- **Wave 1 — English + docs** (1 Sonnet agent): B, C, and D. Files: `design-8-projects.html`,
  `design-8-home.html`, `design-8.css`, `docs/go-live-content-checklist.md`,
  `docs/go-live-build-ops-checklist.md`.
- **Wave 2 — RTL foundation** (1 Sonnet agent): `design-8-rtl.css` + `design-8-home-ar.html`
  (reference implementation, built from the *updated* English home). Establishes the pattern.
- **Wave 3 — remaining Arabic pages** (parallel Sonnet agents): the other 9 `-ar` pages,
  each following the home-ar pattern + `design-8-rtl.css` + this glossary.
- **Review** (Opus): §F below.

---

## F. Acceptance criteria (Opus review)

**English edits**
- [ ] Projects filter shows "Workshops / Training"; KFUH re-filed to BSL and still visible
      under "All" and "Biocontainment (BSL)"; two training placeholders appear under the tab.
- [ ] Home Trusted-by is a logo strip that degrades to names with no broken-image icon.
- [ ] `design-8.css` diff is additive only (no changes to existing rules); English pages
      otherwise unchanged.
- [ ] Both checklist docs exist and cover the items in §D.

**Arabic**
- [ ] All 10 `-ar` pages exist; `<html lang="ar" dir="rtl">`; both stylesheets linked (base
      first); IBM Plex Sans Arabic loaded.
- [ ] `design-8-rtl.css` exists; `design-8.css` unchanged.
- [ ] No `letter-spacing` artifacts on Arabic; Arabic joins render correctly.
- [ ] Nav mirrored; directional arrows point left; timeline fills from right; drawer slides
      from left; `.wa-fab`/`.back-to-top` bottom-left.
- [ ] Language toggle round-trips EN↔AR on every page (correct counterpart href both ways).
- [ ] No English leakage in Arabic body except the allowed Latin tokens (§A.6); Western
      numerals; proofread-pending comment present.
- [ ] `design-8.js` unchanged (or a single justified, documented fix).
- [ ] Glossary terms identical across all Arabic pages.
