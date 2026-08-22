# Website research: design, elegance & lead generation — recommendations

> Compiled 2026-08-10 from a 7-angle internet research sweep (~200 live web
> lookups: competitor sites fetched and analyzed, SERPs checked in English and
> Arabic, published conversion research), cross-checked against the flagship
> site code, m4acc.com, and the go-live checklists. A completeness critic then
> audited the findings for gaps, contradictions, and conflicts with the site's
> own rules.
>
> **Scope rule respected throughout:** the flagship site never claims anything
> m4acc.com does not already claim publicly, and never promises response times.
> Anything below that needs new facts is marked **[needs company confirmation]**.

---

## 0. The headline

The flagship site is already better than almost every competitor site analyzed
— including the US market leaders. Its copy discipline ("a spec chip carries
only a real figure"), its case-study anatomy, its fast-lane testing form, and
its refusal to bluff are exactly what the research says technical buyers trust.

The biggest opportunities are **not redesigns**. They are:

1. **Don't lose the SEO you already have** (301 redirects at launch — the only
   irreversible item on this list).
2. **Launch bilingual** — the Arabic SERP for this niche is unclaimed and the
   old site already has full Arabic.
3. **Surface proof you already own** (the m4acc.com client-logo wall, the
   films, verifiable accreditations).
4. **Fix the conversion plumbing** (header phone, mobile action bar, intent
   routing, analytics on every channel).
5. **A cheap elegance package** (mono spec type, hairlines, real film stills,
   motion restraint) that makes the site read "engineered", not "templated".

---

## 1. Top 5 priorities (in order)

### P1 — 301 redirects from every m4acc.com `/work/` URL (launch gate)

Live SERP checks show `m4acc.com/work/biosafety-cabinet-services/` ranks
**page 1** for "biosafety cabinet certification Saudi Arabia", and
`/work/cleanrooms-and-gmp-facilities/` ranks for turnkey GMP cleanroom
queries. These pages are the domain's only current ranking assets. If the new
site launches without redirects, ~10 years of equity 404s and the rankings go
to Ziebaq/SANA.

- **Do:** in `flagship-site/next.config.ts` add permanent redirects:
  `/work/biosafety-cabinet-services` → `/test/biological-safety-cabinet-certification`,
  `/work/cleanrooms-and-gmp-facilities` → `/build`, and map every other
  `/work/*` slug (crawl `m4acc.com/sitemap.xml` before cutover to enumerate).
- **Do:** add this as a hard gate in `docs/go-live-build-ops-checklist.md`.
- This is pure config work; it is the only recommendation that is
  irreversible if missed.

### P2 — Launch bilingual (Arabic/RTL), and treat Arabic as SEO, not translation

- m4acc.com already has a **complete professional Arabic site** (`/ar/`);
  an English-only relaunch is a visible regression for the government-heavy
  client base. (The `design-8-*-ar.html` mockups and `design-8-rtl.css` show
  the Arabic content work is largely done; the flagship app uses CSS logical
  properties, so the plumbing exists.)
- ~71% of Saudi search queries are in Arabic; Arabic commercial queries skew
  transactional and convert well via WhatsApp; English queries are the
  spec-research channel. So: **reuse the m4acc.com/ar/ terminology corpus**
  (الغرف النظيفة، كبائن السلامة الحيوية، التأهيل والتحقق) but **restructure**
  Arabic pages — Arabic H1/meta with الرياض/السعودية geo-modifiers,
  WhatsApp/phone CTAs placed higher; English pages stay standards-dense.
- The Arabic SERP for cleanroom qualification/testing in KSA is currently won
  by a **Chinese manufacturer's translated content hub** — no Saudi provider
  has claimed it. First-mover gap.
- Add `hreflang` ar-SA/en pairs; register both in Search Console.
- RTL craft rules (Saudi users read sloppy RTL as low trust): zero
  letter-spacing under `[dir=rtl]` (the site's no-letter-spacing rule already
  helps), no bold Arabic body text, mirror all directional graphics including
  the 8-phase strip, test with real Arabic content. Pair fonts as a family
  (e.g. IBM Plex Sans Arabic + Plex Mono keeps Latin figures consistent).

### P3 — Surface the proof envelope you already own

- **Client roster:** m4acc.com's About page already publicly shows ~16-18
  client logos (SFDA, Saudi MoH, KFSHRC, KAUST, King Saud University, IAU,
  King Fahd Medical City, Dallah, Al Habib, Fakeeh…). This is inside the
  claims envelope today. A regulator + the Ministry of Health as clients is a
  trust signal **no competitor analyzed can match** (FTS: no named clients;
  Ziebaq: generic logos).
  - Because the client has already rejected a band under the hero twice, use
    the **one-line text strip** pattern instead: *"Since 2016 · Riyadh —
    cleanrooms and containment labs for SFDA, KFSHRC, IAU, KFUPM and more"*
    (text-height, names link to /projects). A fuller monochrome logo wall can
    live further down or on /about.
- **/accreditations page:** the industry pattern (Technical Safety Services
  publishes certificate numbers + scope tables + honest exclusions; SGS has
  "Verify SGS Documents" in its footer) is: *a claim you can check beats a
  claim you must take on faith*. NSF runs a **public searchable directory of
  accredited BSC field certifiers** (info.nsf.org/Certified/Biosafety-Certifier/).
  - **[needs company confirmation]** Verify Masarat's/its certifiers' actual
    NSF listing exists before linking; list only what is checkable, with
    exact standard editions (ISO 14644-1:2015, NSF/ANSI 49).
- **Stat strip:** every top competitor leads with numbers (Germfree: "64
  years · 1000+ projects"; AES: "4,000+ facilities"). m4acc.com's own
  homepage counters currently show **labels without numbers** — so any figure
  is a new public claim. **[needs company confirmation]** Collect real
  figures (projects delivered, cabinets certified/year) in writing first;
  ship the component only with confirmed numbers. "Since 2016" is already safe.
- **Named certifiers/engineers** on /about with credentials (and LinkedIn
  links — LinkedIn has ~11M Saudi users and is where Gulf buying committees
  vet vendors). Requires individual consent (also a PDPL matter — see §6).

### P4 — Conversion plumbing (one coherent package)

This resolves three cross-angle contradictions with one set of decisions:

- **Keep `/contact` as the single destination** (don't build separate
  request pages). The existing "What do you need?" dropdown is already the
  intent selector; keep the field count frozen (the current 5-field form
  sits exactly in the evidence sweet spot — conversion collapses past ~7
  fields: 23.1% @ 3 fields → 17.0% @ 5 → 11.4% @ 7). Route/tag enquiries by
  the selected need so build leads and testing leads triage differently.
- **Header phone:** visible `tel:` number in the persistent header (desktop:
  full number, mobile: icon), like AES and Angstrom. Phone leads convert
  30–50% higher than forms for high-value complex purchases; professional
  services split ~53% calls / 47% forms.
- **Mobile bottom action bar** replacing the floating WhatsApp bubble on
  mobile: three buttons — **Call · WhatsApp · Enquiry** — with reserved
  layout space (padding-bottom on body) so it never overlaps content. This
  also fixes the known WhatsApp-button-overlap bug (HANDOVER-FLAGSHIP §5).
  On desktop, keep the float but auto-hide it when a form/footer is in view.
- **Per-page prefilled wa.me deep links** (AR + EN): e.g. from /test —
  "مرحباً، أود الاستفسار عن اختبار واعتماد الغرف النظيفة". Register the
  number on WhatsApp Business with a completed bilingual profile. Do **not**
  use widget chips that show "typically replies within X minutes" (violates
  the no-response-time rule).
- **"What happens next" block** under every submit button (the
  constraint-safe substitute for the "24-hour reply" promises Germfree/TSS
  make): "1. A Masarat engineer reviews your request. 2. We call or message
  you to understand the scope. 3. You receive a written proposal." No clocks.
- **Analytics from day one:** events on form submits **and** `tel:` /
  `mailto:` / `wa.me` clicks, with per-page attribution. Roughly half of
  conversions in this sector happen off-form; without these events the site
  will be optimized against wrong data. Benchmarks to review monthly:
  3–5% all-channel conversion; ~13% median form completion.
- **Thank-you page as a next step, not a dead end:** after submit, show 2–3
  case studies filtered by the selected need + repeat call/WhatsApp.
- **Contact page extras:** embedded map (static image linking out is fine)
  instead of the bare "Open in Google Maps" link; the existing privacy line
  is good — link it to the real privacy policy (§6).

### P5 — Case studies as spec-block landing pages (the highest-intent pages)

The current project-page anatomy (facts panel, jump bar, related work,
closing CTA) is already right. Upgrade each featured case study to the
Germfree pattern — the closest peer, which currently **owns the Saudi BSL-3
SERP from Florida** with exactly one well-titled case-study page:

- **Keyword-bearing titles/H1s:** e.g. "BSL-3 Laboratory Design &
  Construction for SFDA, Riyadh". No Saudi firm ranks for BSL-3
  design/construction in KSA today; Masarat's SFDA + IAU pages can take that
  SERP as the local incumbent.
- **Spec block:** client / location / year / classification & standard /
  scope — **every cell needs a documented public source or client sign-off**
  (areas in m², dates beyond what m4acc.com states are new claims).
- **Outcome line** in the facts strip ("Commissioned, qualified and handed
  over, 2022") where the record supports it.
- **Embed the project film in the case page** (click-to-load
  youtube-nocookie facade or modal) instead of only linking out — a YouTube
  tab hands a warm visitor to the recommendation engine, possibly to
  competitors' videos. Same fix on the homepage film shelf, with a CTA under
  it: "These are our sites. Yours next —" + enquiry link.
- **Structured data:** BreadcrumbList + Article/CreativeWork on
  /projects/[slug] (copy the existing guides pattern).
- **OG preview cards:** per-page `og:title/description` + 1200×630 real
  project photo, server-rendered — in a WhatsApp-first market, the forwarded
  link's preview card *is* the first impression the rest of the 8–13 person
  buying committee gets. Test top URLs with an OG checker before launch.
- Canonical set: the 3 featured case studies (SFDA, KFUPM, KFSHRC) plus the
  IAU BSL-3 page treated as a first-class SEO landing page.

---

## 2. Elegance package (mostly CSS-level, high perceived-quality per hour)

What separates "engineered" from "templated" per 2025–26 design analysis and
the premium exemplars (Automata, Commonwealth Fusion, Path Robotics, Acht
Engineering):

1. **Real project photography/film as the visual backbone.** Real photos
   convert ~35% better than stock (Marketing Experiments) and carry ~4.5×
   credibility (Stanford). Masarat already owns the material — pull
   high-res frame grabs from `IAU_BSL3_Lab.mp4`, `KFUPM_cleanroom.mp4`,
   `Hamadi_turnkey_room.mp4`, the SFDA footage. Full-bleed stills with a
   small **mono metadata caption**: "SFDA · BSL-3 · Riyadh". Reserve 3D
   renders for the design-phase story only ("what we model before we
   build"), never as substitutes for delivered rooms.
2. **"Technical Mono" accent type** (IBM Plex Mono / JetBrains Mono / Geist
   Mono — all free): spec figures, standard references, metadata captions,
   methodology step numbers 01–08, form labels, footer CR line. Accent only —
   never body copy. Reads like instrument readouts; precision is the product.
3. **Hairlines over shadows.** Replace box-shadows/rounded-SaaS-card styling
   with 1px rules (`rgba(255,255,255,0.12)` on dark). Left-align headlines.
   Tighten the type scale to ~4 sizes with a big display-to-body jump.
   Render the 8-phase strip as a ruled table with mono numerals — Acht
   Engineering built an Awwwards-level brand on numbered sections 01–08, and
   Masarat's methodology maps 1:1 onto that device.
4. **Motion restraint policy** (NN/g): no scroll-jacking, no scroll-triggered
   reveals on primary text, entrance animations ≤ 400ms once per session,
   everything honors `prefers-reduced-motion`. Spend the budget on 2–3
   moments: an ambient muted 4–6s real-cleanroom loop in the hero,
   counter ticks, hover states. The WhatsApp button never pulses.
5. **Hybrid dark/light:** keep dark for hero/galleries/film shelf (photography
   glows), lighter panels for long-form pillar content and forms; audit every
   text token to WCAG 4.5:1 (thin Arabic glyphs on dark fail sooner than Latin).
6. **One Swiss system:** 12-column grid, 8pt spacing scale
   (8/16/24/32/48/64/96/128), one container max-width everywhere. Logical
   properties mean the grid survives RTL for free.
7. **Film shelf upgrade** (post-launch nice-to-have): 3–5s muted hover-loops
   (~1–2MB webm, poster-first, in-viewport only, disabled under
   reduced-motion/Save-Data) instead of static YouTube thumbnails.

---

## 3. Lead generation additions (beyond P4)

- **Two intent-specific request flows** (framing, not new pages): /build's
  CTA language = "Request a project consultation"; /test's = "Request
  testing & certification". The existing Test fast-lane form ("Working to a
  deadline?") is already best-practice — keep it.
- **Recertification capture** (open differentiator — no competitor does it):
  on /test, a secondary CTA "Certification coming due? Tell us what and
  when" → 3 fields (organization, equipment type, contact). Framed as
  scheduling convenience, no dates promised. Feeds a follow-up list ordered
  by due month — pipeline for the recurring service line.
- **Gating policy:** proof stays ungated (case studies, films, brochures,
  guides). Gate **at most one asset per funnel**, name+org+email only:
  - Build funnel: "Cleanroom/containment lab project planning checklist"
    (mirrors the 8-phase methodology).
  - Test funnel: "Annual testing & recertification schedule template".
  76% of B2B buyers will share info for genuinely useful planning assets vs
  28% for blog content.
- **Champion enablement:** ungated one-page PDF per featured case study
  (AR + EN once RTL ships) + a company-profile PDF in the footer. The
  visitor is usually a researcher assembling a case for an 8–13 person
  committee; a PDF travels into that committee, a web page often doesn't.
- **Homepage embedded form:** research says construction/engineering
  converts ~78% via forms and the homepage currently has none — but the
  client explicitly removed it. **Present as a proposal to revisit** with
  that data, not as a change to make now.
- **Speed-to-lead (operational, off-site):** leads answered in 5 minutes are
  ~21× more likely to qualify than at 30; 35–50% of B2B sales go to the
  first responder. Route form submissions to an on-duty engineer's
  WhatsApp/email immediately. The site work is wasted if leads sit for days.

---

## 4. SEO & content plan

- **Money pages:** one dedicated ~1,500–2,000-word geo-targeted page per
  service. The "cleanroom validation Saudi Arabia" SERP is won by exactly
  this format (Ziebaq holds 3 of 7 page-1 slots with separate
  validation/certification/HVAC pages; SANA ranks with the country in the
  slug). Masarat needs added routes under /test: **cleanroom-validation
  (DQ/IQ/OQ/PQ — distinct intent from "testing"), hepa-filter-integrity,
  fume-hood-testing.** Each page: "Saudi Arabia"/"KSA" in title + H1
  region, every individual test listed, exact standard editions, 6–8
  on-page FAQ, quote CTA.
- **Guides cluster** (the /guides section already exists — feed it):
  requalification frequency table (ISO 14644-2: the 6/12-month table is the
  exact content that ranks in this niche), BSC certification in KSA
  (NSF/ANSI 49 + CBAHI), cleanroom classification explained, USP 797/800
  for hospital IV rooms, BSL-1→4 explained. Bylined by named engineers
  (E-E-A-T) — anonymous marketing copy doesn't rank or persuade.
- **Equipment × certification cross-sell page:** expand
  /equip/biological-safety-cabinets into a class-selection buyer guide
  (Class I / II A2 / III keyed to BSL level) with a cross-link block —
  "Every cabinet we supply is commissioned and certified to NSF/ANSI 49".
  No competitor combines both intents on one domain.
- **Schema:** add `Service` nodes to every /test/* and /build page;
  `sameAs` (LinkedIn, YouTube) + `hasOfferCatalog` on the existing
  LocalBusiness node; BreadcrumbList on projects. **Skip FAQPage JSON-LD**
  — Google deprecated FAQ rich results (write visible FAQs anyway).
- **Google Business Profile:** claim/verify for the Al Woroud address,
  categories + services matching the site, real photos, AR+EN descriptions.
  **Fix NAP inconsistency:** directories currently show two different
  Riyadh addresses for Masarat (Al Wurud vs Al Yasmin) — correct
  SaudiaYP/ArabLocal/ZoomInfo to match the site and schema exactly.

---

## 5. Saudi-specific trust signals

- **Footer legal block (AR+EN):** full legal name in both languages, **CR
  number**, national address. The CR is what every Saudi procurement officer
  checks first; neither m4acc.com nor any competitor shows one — cheap,
  verifiable differentiation. **[needs company confirmation: CR number and
  official address]**
- **Etimad:** add "Registered supplier on the Etimad platform" only if
  confirmed. **[needs company confirmation]**
- **Vision 2030 framing:** 1–2 sentences of body copy on /about and Why
  Masarat tying the work to the National Biotechnology Strategy and
  healthcare localization (the way Alfanar does) — **not** the official
  Vision 2030 logo (government-owned mark, requires permission).
- **Made in Saudi program:** worth applying for the products line
  (authorized logo use + government-connection benefits). Business action
  first; nothing on the site until membership is approved.
- **LinkedIn parity:** icon in header/footer (the live site has it), team
  names linked to profiles, "follow our projects" prompt near the film shelf.

---

## 6. Gaps the critique caught (none of the 7 angles covered these)

1. **Performance budget as a launch gate:** LCP < 2.5s / INP < 200ms on
   throttled 4G for homepage, both pillars, one case study — *before* any
   video-heavy recommendation ships. B2B averages ~7s mobile LCP; a slow
   "precision" site contradicts the brand. Poster-first lazy video,
   youtube-nocookie facades, next/image everywhere, subset + self-host fonts
   (Arabic families are heavy). Add Lighthouse runs to the go-live checklist.
2. **Saudi PDPL compliance:** enforced by SDAIA since Sept 2024; every
   recommended lead flow collects personal data. Add a bilingual /privacy
   page (what each form collects, purpose, routing, retention, deletion) and
   a one-line notice under every form. A privacy lapse would be a brand
   contradiction for a compliance company — and a correct posture is itself
   a trust signal for government buyers.
3. **Accessibility (WCAG 2.1 AA) as the acceptance bar:** the Saudi DGA's
   accessibility guidelines are WCAG-based and Masarat's buyers are the
   organizations that operate under them. Keyboard/focus rings on the dark
   theme, labeled form errors, **AR+EN captions on the films** (serves the
   Arabic audience and SEO simultaneously), alt text, correct lang/dir.
4. **Pricing transparency substitute:** NN/g finds price info is the #1
   requested B2B content and hiding it reads evasive. Constraint-safe fix:
   a "What determines the cost" block on /build (the 5–6 real drivers: ISO
   class, area, containment level, room/cabinet count, qualification scope)
   and a pricing-unit line on /test ("quoted per facility, based on room and
   cabinet count"). Figures/ranges only with sign-off.
5. **Careers page (light):** answers "will this company exist in 3 years?" —
   which is literally the "Still there after handover" value. 2–3
   paragraphs + LinkedIn apply link; cross-link from the values card.
6. **OG/link-preview metadata** — covered in P5; elevated here because
   WhatsApp forwarding is the committee's first impression and WhatsApp
   executes no JS (tags must be in the initial HTML).

---

## 7. Standing exclusions (so future copywriting doesn't reintroduce them)

- No response-time promises anywhere: not "24-hour reply" (Germfree/TSS
  pattern), not NN/g's "state expected response times", not WhatsApp
  "typically replies within X minutes" chips, and check any booking tool's
  confirmation emails for implied SLAs.
- No stat/spec figure without a documented public source or written client
  sign-off (m4acc.com's own counters currently show no numbers).
- No "free consultation" wording without sign-off (new public offer).
- No Vision 2030 / Saudi Made / client logos without the respective
  permissions.
- No risk-reversal claims ("$0 capex"-style, "100% compliant") unless
  m4acc.com already states them verbatim.

---

## 8. Exemplar sites worth studying (all fetched and analyzed)

| Site | Why it matters |
|---|---|
| germfree.com | Closest peer (cleanrooms + BSL). Steal: spec-block case studies with Challenge→Answer, embedded walkthrough films, proof strip after hero. It markets a Saudi BSL-3 delivery (KAU) on its own site — out-detail them on home turf. |
| techsafety.com | The testing/certification playbook: certificate numbers on the homepage, accreditations page with scope tables and honest exclusions, accreditor-anchored superlatives, closing FAQ. |
| aesclean.com | Build-side benchmark: stat strip, pharma logo wall, three-pathway contact (general/project/service). |
| angstromtechnology.com | Lead-gen mechanics: dedicated request-a-quote page, persistent "Call an expert", gated Design Guide + ungated resource hub. |
| automata.tech | Premium restraint for a lab brand: dark graphite, prestige-client logos early, bold stat callouts, zero gratuitous animation. |
| cfs.energy | Honest media split: real photos for what exists, renders only for future state. |
| path-robotics.com | Dark industrial theme done right (contrast rigor, real equipment video). Do not copy its risk-reversal claims. |
| acht.at | Elegance from structure alone: numbered sections 01–08, strict grid — maps directly onto Masarat's 8-phase methodology. |
| ziebaq.com / ftscleanrooms.com | The regional competition. Their gaps = Masarat's openings: no Arabic, no named clients, no verifiable accreditations, no CR number. |
| m4acc.com/ar/ | The Arabic parity baseline and terminology corpus for the /ar/ build. |

---

## 9. Suggested sequencing

| Phase | Work | Depends on |
|---|---|---|
| Now (code) | 301 redirect map · header tel: link · mobile bottom action bar (fixes WhatsApp overlap) · prefilled wa.me per page · "what happens next" blocks · analytics events · OG tags · elegance CSS pass (mono accents, hairlines, 8pt scale, motion policy) · film embeds on case pages · Service/sameAs schema · /privacy page | Nothing |
| Now (asks to client) | Written figures for stat strip · CR number + official address · logo/name permissions (reconfirm; m4acc.com wall is the envelope) · NSF listing verification · film approvals (KFSHRC) · pricing-driver sign-off | Client |
| Pre-launch | Arabic/RTL full parity + hreflang · expanded money pages (validation, HEPA, fume hood) · case-study spec blocks + keyword titles · performance + accessibility gates · GBP claim + NAP cleanup | Both above |
| Post-launch | Guides cluster with bylines · gated checklist/template (one per funnel) · recertification-due capture · case-study PDFs · careers page · hover-loop film shelf · Made in Saudi application | Launch |
