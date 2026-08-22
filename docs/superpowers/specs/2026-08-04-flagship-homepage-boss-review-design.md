# Flagship homepage — boss review revision (design)

Date: 2026-08-04
Target: `flagship-site/` (vinext + React, the "flagship model" rebuild)
Scope: the homepage (`app/page.tsx` and the components it renders), plus the
site-wide strings those changes touch.

---

## 1. Where the notes came from

The client's boss reviewed the running flagship homepage and left 13 notes.
The notes are terse and were written while scrolling, so each one is recorded
below **verbatim**, followed by the change it maps to and the evidence for that
reading.

The boss also said: *"the main website is m4acc.com — the content it has and the
industries that it serves is helpful to be inspired from."* So m4acc.com is the
content authority for anything about scope and industries. A content inventory
was harvested from ten live pages (see §5).

---

## 2. Note-by-note mapping

| # | Note (verbatim) | Change |
|---|---|---|
| 1 | "change the talk to an engineer and make it contact us." | `cta.primary` becomes **"Contact us"**. Changes header, mobile menu and the Why Masarat button from one constant. |
| 2 | "change the manifactureing to the white and red color." | The hero spec chips. Today two chips are dim translucent ghosts and one (BSL-3/4) renders as a solid white pill with red text — so the row looks inconsistent. All three become solid white pills; **Manufacturing (GLP/GMP) gets red value text** as asked. |
| 3 | "remove the engineers will contact us in one business day." | Delete every response-time promise site-wide (8 occurrences). |
| 4 | "remove the limitation to a specific industry." | Hero lede said "for Saudi hospitals, laboratories and manufacturers" — that names three industries and excludes eleven the live site actually claims. Replaced with a scope statement that is not industry-bounded. |
| 5 | "rephrase the big to the inform thee company about the company and what it do. Clean rooms containment labs solutions." | New H1: **"Cleanroom and containment laboratory solutions."** New lede introduces the company itself. |
| 6 | "expand the scope I rooms and chemo rooms." | Read as **IV rooms and chemo rooms**. The live site lists "IV pharmacy/Chemo preparation Cleanroom"; the repo already has a Care Medical IV-pharmacy/chemo project. Added to the healthcare scope list. |
| 7 | "cleanrooms And Containment labs with a little details." | New **What we do** section: the two core offers, each with a short paragraph and the room types under it. |
| 8 | "we need to complete the industries that we serve" | New **Industries we serve** section carrying the complete list from the live site. |
| 9 | "We remove the contact form in the main page at the end." | `<EnquiryForm />` removed from the homepage contact band. Details and CTA stay; the form remains on `/contact` and the pillar pages. |
| 10 | "so make the guide to be future improvements on the website so for now we keep the content and we have references." | Guides preview removed from the homepage. `/guides` and all six guide articles stay live and linked from the footer. Logged as a planned improvement with its references. |
| 11 | "so in the why masaart it should have bulit points" | Why Masarat becomes a bulleted list instead of four title+paragraph blocks. |
| 12 | "have the videos of the selected projects to be at the end of the page and only the links to the youtube page that has these projects." | Project cards stop embedding MP4s. New **Project films** section near the end links out to YouTube. |
| 13 | "if you think a redesign would be better then do it." | Structural reorder, not a visual redesign. Rationale in §4. |

---

## 3. Copy decisions

### Hero (notes 4, 5)

Before:

> **Cleanrooms, containment labs, and the testing that keeps them compliant.**
> We design, build, equip and certify controlled environments for Saudi
> hospitals, laboratories and manufacturers.

After:

> **Cleanroom and containment laboratory solutions.**
> Masarat is a Saudi company specialised in infection and contamination
> control. Since 2016 we have designed, built, equipped, certified and
> maintained controlled environments across Saudi Arabia and the GCC.

The headline states what the company sells; the lede states who the company is
and what it does — which is what note 5 asked for. Neither line names an
industry, which is what note 4 asked for. "Saudi Arabia and the GCC" is the
live site's own geographic claim, not an expansion of it.

### Scope detail (notes 6, 7)

The **What we do** section carries the two offers:

- **Cleanrooms and controlled environments** — pharmaceutical and GMP
  production, compounding laboratories, IV pharmacy and chemotherapy
  preparation rooms, operating rooms, isolation rooms, CSSD, sterile areas,
  modular cleanroom systems.
- **Containment and biosafety laboratories** — BSL-2, BSL-3 and BSL-4
  facilities, biocontainment and animal facilities, TB laboratories, mobile
  BSL-2/BSL-3 units.

Every room type traces to a verbatim phrase on m4acc.com (§5). Nothing is
invented, and no classification is claimed for a project that has not been
verified.

### Industries (note 8)

Twelve industries, each traceable to the live site. They are presented as a
plain list of names, not as cards with invented descriptions, because the live
site names them without describing them and inventing descriptions would be
inventing claims.

---

## 4. Structure

Before (7 sections) → After (9 sections):

| Before | After |
|---|---|
| Hero | Hero |
| Credentials strip | Credentials strip |
| Featured projects | **What we do** (new) |
| Why Masarat | **Industries we serve** (new) |
| Delivery phases | Featured projects |
| Guides preview | Why Masarat (bulleted) |
| Contact + form | Delivery phases |
| | **Project films** (new) |
| | Contact (no form) |

Why this order: say what you sell, say who you sell it to, prove it, explain
why you, show the method, show the films, give the contact details. The four
"doors" in the hero still let a visitor who already knows what they want skip
all of it — that property is preserved and was the point of the original design.

Not changed: the visual system (navy/orange on light, spec chips, dark delivery
band, one photograph per section). It is coherent, accessible and documented,
and the notes were about content and emphasis, not about how the page looks. A
visual redesign would have thrown away work the notes did not object to.

---

## 5. Content sources

Harvested 2026-08-04 from the live site. Every industry and room type used on
the homepage traces to one of these:

- `m4acc.com/work/cleanrooms-and-gmp-facilities/` — the six named industries
  (Pharmaceutical, Hospitals, Aerospace, Containment (BSL), Micro-Electronics,
  Medical Devices) and the room list (operating rooms, isolation rooms,
  compounding laboratories, CSSD, satellite assembly, aircraft panel
  manufacturing)
- `m4acc.com/about-us/` — the mission ("medical, pharmaceuticals,
  micro-electronics, food and beverage industries") and founding year
- `m4acc.com/solutions/` — Pharmaceutical, Biotechnology, Electronic and
  Nanotechnology, Biosafety Laboratories (BSL3/4)
- `m4acc.com/work/biosafety-laboratories/` — diagnostic, clinical and research
  laboratories, animal facilities; BSL 3 and BSL 4
- `m4acc.com/work/mobile-bsl2-and-bsl3-labs/` — mobile BSL-2/BSL-3 units
- `m4acc.com/work/cleanrooms-testing-and-qualifications/` — "Saudi Arabia and
  GCC countries"
- `m4acc.com/work/pharmaceutical-industries/`, `/our-projects/`, `/products/`,
  `/work/decontamination_services/`

---

## 6b. Case-study page (third round)

`/projects/[slug]` was reshaped so a buyer can orient in one screen. Structure
taken from the Design H case-study mockups (`designs/design-8-project-*.html`),
which had the running order right: slim header → facts strip → narrative →
gallery.

- **Header** now carries the client name under the title and the project's
  standards as spec chips.
- **Facts strip** on the air tint directly beneath: client, location, year,
  facility type, delivering pillar — the whole record in one pass.
- **"On this page"** jump bar, built from what the record actually has, so a
  project with no photography never advertises a gallery. This is the direct
  answer to "tell me early where to read the scope and where the photos are".
- **Scope section** (`#scope`) splits the narrative from a pulled-out
  "In one line" scope card, so the scope is readable without reading the
  narrative.
- **Gallery** (`#gallery`) is now a titled section with a photo count, not an
  unlabelled grid buried in the media band.

Per-project `standards` were added to `content/masarat.ts`, transcribed from
each project's own page on m4acc.com. NAMI deliberately has none — its rooms
are clean-not-classified, and inventing a code for it would be the exact thing
the SpecChip contract forbids.

## 6a. Second review round (same day)

Three further changes after the client reviewed the running page:

- **The four hero "doors" became four solution cards.** They were phrased as
  the visitor's sentence ("I need a cleanroom or containment lab built") and
  the client rejected the framing. They are now named as products —
  Cleanrooms, Containment & BSL labs, Equipment, Testing & certification —
  styled to match the scope cards below. Cleanrooms and containment separated
  because a BSL buyer scanning the old hero found no card saying "BSL". The
  detail line hides below 520px to keep the four-cards-above-the-fold promise.
  Training is no longer a hero card; `pillars` is unchanged and still drives
  navigation, routes and the enquiry form.
- **The standards band was removed.** Tried as plain text, then as a bracketed
  tape; rejected both times. The position was the problem — between the
  routing cards and the first real section, any treatment reads as an
  interruption. The content moved to the footer as fine print
  (`content/site.ts` → `credentials`), and it was removed from `/contact` too.
- **Project films became a real video shelf.** See §6.

## 6. YouTube links — resolved

The client supplied six links, which were five unique videos — one was sent
twice. **None was labelled with its project.** Each was therefore matched by
fetching the video and reading its own title; nothing was inferred from the
order they arrived in. The mapping table is in
`docs/go-live-content-checklist.md`.

One outcome worth flagging: `WmeqeKpoH84` turned out to be **KFSHRC**, a
featured project that had no media of any kind in this repo. It now has a film
— and it is the one project whose record still says publication approval is
pending, so that approval now matters more than it did.

The section is a video shelf: each card carries that film's own YouTube poster
frame, a play badge, the client, the project and the location. The posters are
**downloaded and served from this site**, not hot-linked to `i.ytimg.com`, so
reading the homepage sends no request to Google. Two of the five posters are
4:3 with letterbox bars baked in; `object-fit: cover` on a 16:9 box crops
exactly those bars off, so the shelf is visually consistent.

Side effect worth noting: the homepage was shipping about 30 MB of MP4 in the
featured-projects section. It now ships five JPEGs totalling about 180 KB, all
lazy-loaded below the fold.

---

## 8. Fixed during review

An adversarial review of the change raised 19 findings; 13 were refuted and
these survived verification:

- **The response-time promise survived on `/test`.** `TestFastLane.tsx` carried
  it in its post-submit success state — the one place a visitor reads it
  *after* committing. It was missed by a `grep` because the sentence wraps
  across two source lines. Removed, and the two hard-coded phone numbers in
  that file now read from `content/site.ts` like everywhere else.
- **KFSHRC's spec chip read "Healthcare cleanroom"** — a category, not a
  standard, class or figure, which SpecChip's own contract forbids. It mattered
  more once the cards lost their media, because the chip became the most
  prominent object on the card of the one featured project whose scope is still
  pending verification. Chip removed; the card renders correctly without it.
- **The delivery strip kept the browser's default `<ol>` styling** — a 40px
  indent that pushed all eight phases in from their own section heading, plus
  decimal markers competing with the phases' "01"…"08" numerals. Pre-existing,
  but visible: measured 40px against every other section on the page. Reset.

---

## 7. Out of scope

- The Arabic/RTL pass (`designs/design-8-*-ar.html`) — unrelated work.
- The WordPress/Themify port described in `HANDOVER.md`.
- The `/guides` articles themselves, which stay exactly as written.
