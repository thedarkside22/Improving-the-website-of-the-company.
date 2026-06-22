# Homepage Design Mockups — Masarat for Accreditation

Three **front-end-only** homepage concepts to help pick a visual direction for the
redesigned [m4acc.com](https://m4acc.com/). No backend, no build step — just open
the files in a browser. All three now use the **real Masarat brand** (navy +
orange logo), the real identity copy, real contact details, the real project
roster, and your workshop videos.

> **These are design blueprints, not the live website.** The direction you pick
> gets *implemented* (not redesigned) in WordPress later — look, layout, and
> content transfer 1:1. See **[`WORDPRESS-MAPPING.md`](WORDPRESS-MAPPING.md)**.

## How to view them

1. **Open [`index.html`](index.html)** — a chooser that links to all three.
2. Or open a design directly:
   - **[`design-1-clinical.html`](design-1-clinical.html)** — Direction A
   - **[`design-2-bold.html`](design-2-bold.html)** — Direction B
   - **[`design-3-editorial.html`](design-3-editorial.html)** — Direction C
3. Try them at **desktop and mobile width**, hover the video tiles, and click a
   video to open the lightbox. Videos load from `assets/videos/`, so keep the
   folder structure intact.

## The three directions (all on the navy + orange brand)

| | Direction | Vibe | Best if you want… |
|---|---|---|---|
| **A** | **Clinical Corporate** | Light body, **purple hero** (like the live site), navy + orange | The safest, most conventional "medical-grade trust" B2B look |
| **B** | **Bold Modern Dark** | Deep indigo + orange, video hero | Maximum impact; lead with the SFDA workshop film |
| **C** | **Editorial Premium** | Serif + whitespace, navy + orange | To feel established, premium, and understated |

All three cover the three goals: **identity** (the real "MASARAT FOR
ACCREDITATION" headline + tagline, founded 2016, Cleanrooms & GMP, BSL-3 & 4,
SFDA/CBAHI/WHO/CAP/CDC), **videos** (the real workshop/project films, SFDA
featured), and **the team** (a "Meet our experts" section), plus a real
**Our Projects** section.

## What's real vs. placeholder

| Element | Status |
|---|---|
| Brand colors (navy `#2e3192` + orange `#f7941e`), purple hero | ✅ **Real** (from the live site) |
| Logo | ✅ **Faithful SVG re-creation** — exact official PNG can be swapped in (1-line change) |
| Identity copy, tagline, nav menu, contact (+966 1148 70 043 · info@m4acc.com) | ✅ **Real** |
| Accreditation bodies (SFDA, CBAHI, WHO, CAP, CDC, GMP, NIH/BMBL) | ✅ **Real** |
| **Our Projects** (SFDA, KFSHRC, IAU, ABMI, NAMI, Care Medical, KFUH) | ✅ **Real** clients/locations |
| MRC Solutions partnership (35+ yrs) | ✅ **Real** |
| Videos (3 clips, self-hosted) | ✅ **Real** — your uploaded files |
| Which clip is the SFDA workshop | ⚠️ **Confirm** — currently `assets/videos/workshop-sfda.mp4` |
| Team photos, lab/hero photos | 🔧 **Placeholder** — marked "PHOTO"; attach as files to drop in |
| Project client logos | 🔧 **Monogram stand-ins** — real logos can replace them |
| Contact form | 🔧 **Front-end only** — demo alert; no email is sent |

## Easy things to change

- **Brand colors:** each file starts with a `:root { --navy / --orange / --purple … }`
  block — change those values to re-skin the whole page.
- **The real logo:** replace the inline `<svg class="mark">…</svg>` (header +
  footer) with an `<img src="assets/logo.svg">` once you upload the official file.
- **Featured video:** all designs feature `assets/videos/workshop-sfda.mp4`;
  rename the files in `assets/videos/` to change which is featured.
- **Team / photos:** replace the placeholder `PHOTO` blocks once you attach real
  images as files.

## Files

```
designs/
├── index.html                      # chooser / comparison page
├── design-1-clinical.html          # Direction A — Clinical Corporate (homepage)
├── design-2-bold.html              # Direction B — Bold Modern Dark (homepage)
├── design-3-editorial.html         # Direction C — Editorial Premium (homepage)
├── design-1-projects.html          # A — full "Our Projects" page (11 projects)
├── design-2-projects.html          # B — full "Our Projects" page
├── design-3-projects.html          # C — full "Our Projects" page
├── design-1-project-*.html         # A — a detail page for EACH of the 11 projects
├── design-2-project-example.html   # B — one example project detail page
├── design-3-project-example.html   # C — one example project detail page
├── assets/videos/                  # your 3 real clips (self-hosted)
│   ├── workshop-sfda.mp4            (featured — confirm this is the SFDA one)
│   ├── project-2.mp4
│   └── project-3.mp4
├── README.md                       # this file
└── WORDPRESS-MAPPING.md            # how each section becomes a WordPress build
```

## Projects pages (new)

Each direction has a full **Our Projects** page (linked from the nav and a
"View all projects →" button on the homepage). It lists **11 projects** — the
8 real ones (SFDA, KFSHRC, IAU ×2, ABMI, NAMI, Care Medical, KFUH) plus **3
clearly-marked placeholders** for upcoming case studies. Each project opens its
own **detail page** (overview, photo gallery, project facts, certificates &
reports). **Direction A** has a real page for all 11; **B & C** link to one
example each. Photos, the certificate files, and the placeholder-project text
are **placeholders** — the real project descriptions/images/certs can be dropped
in later.

## Notes & caveats

- **No external dependencies** — system fonts, inline SVG/emoji icons; nothing is
  fetched from the internet, so the files work fully offline.
- **Logo / photos:** the official logo PNG and team/lab photos couldn't be pulled
  automatically (the live site and LinkedIn block automated access). The logo is
  recreated as crisp SVG; attach the real logo + photos as files to finalize.
- **Bilingual (Arabic/RTL):** each design has an "AR" toggle placeholder. Full
  Arabic + right-to-left is a later project (on the improvements roadmap).
