# Homepage Design Mockups — Masarat for Accreditation

Three **front-end-only** homepage concepts to help us pick a visual direction
for the redesigned [m4acc.com](https://m4acc.com/). No backend, no build step —
just open the files in a browser.

> **These are design blueprints, not the live website.** The direction you pick
> gets *implemented* (not redesigned) in WordPress later — the look, layout, and
> content transfer 1:1. See **[`WORDPRESS-MAPPING.md`](WORDPRESS-MAPPING.md)**.

## How to view them

1. **Open [`index.html`](index.html)** in any modern browser — it's a chooser
   that links to all three.
2. Or open a design directly:
   - **[`design-1-clinical.html`](design-1-clinical.html)** — Direction A
   - **[`design-2-bold.html`](design-2-bold.html)** — Direction B
   - **[`design-3-editorial.html`](design-3-editorial.html)** — Direction C
3. Try them at **desktop and mobile width** (resize the window or use your
   browser's device toolbar), hover the video tiles, and click a video to open
   the lightbox.

> The videos load from `assets/videos/`, so keep the folder structure intact
> (open the actual files on disk, not copied-out HTML).

## The three directions

| | Direction | Vibe | Best if you want… |
|---|---|---|---|
| **A** | **Clinical Corporate** | Light, blue-teal, badge-led | The safest, most conventional "medical-grade trust" B2B look |
| **B** | **Bold Modern Dark** | Dark navy + cyan, video hero | Maximum impact; lead with the SFDA workshop film |
| **C** | **Editorial Premium** | Serif + whitespace, green/gold | To feel established, premium, and understated |

All three cover the **same three goals you asked for**:
1. **Identity** — who Masarat is (founded 2016, Saudi expertise, end-to-end
   biosafety & cleanroom solutions, SFDA/CBAHI/WHO/CAP/CDC compliance, MRC partner).
2. **Videos** — your real project/workshop films, with the **SFDA workshop**
   featured, to prove credibility.
3. **The team** — a "Meet our experts" section framing Masarat as a serious,
   dedicated company with an expert network — not a couple of freelancers.

## What's real vs. placeholder

| Element | Status |
|---|---|
| Company identity, mission, services | ✅ **Real** (from your LinkedIn text + public sources) |
| Accreditation bodies (SFDA, CBAHI, WHO, CAP, CDC, GMP, NIH/BMBL) | ✅ **Real** |
| MRC Solutions partnership (35+ yrs) | ✅ **Real** |
| Videos (3 clips, self-hosted) | ✅ **Real** — your uploaded files |
| Which video is the SFDA workshop | ⚠️ **Needs your confirmation** (see below) |
| Team photos, names, titles | 🔧 **Placeholder** — marked "PHOTO" |
| Logo | 🔧 **Placeholder** — simple "M" mark |
| Phone, email, hours, exact stats | 🔧 **Placeholder** — drop in real values |
| Contact form | 🔧 **Front-end only** — shows a demo alert; no email is sent |

## Easy things to change

- **Which video is featured:** all designs feature `assets/videos/workshop-sfda.mp4`.
  If a different file is the real SFDA workshop, just rename the files in
  `assets/videos/` (or tell me which is which and I'll swap it).
- **Brand colors:** each file starts with a `:root { --... }` block of CSS
  variables — change those few values to re-skin the whole page.
- **Team:** replace the placeholder `PHOTO` blocks and the name/title text.
- **Real text/contact details:** search for `+966 00 000 0000` and
  `info@m4acc.com` and update.

## Files

```
designs/
├── index.html                 # chooser / comparison page
├── design-1-clinical.html     # Direction A — Clinical Corporate
├── design-2-bold.html         # Direction B — Bold Modern Dark
├── design-3-editorial.html    # Direction C — Editorial Premium
├── assets/videos/             # your 3 real clips (self-hosted)
│   ├── workshop-sfda.mp4       (featured — confirm this is the SFDA one)
│   ├── project-2.mp4
│   └── project-3.mp4
├── README.md                  # this file
└── WORDPRESS-MAPPING.md       # how each section becomes a WordPress build
```

## Notes & caveats

- **No external dependencies** — fonts are system fonts; icons are inline SVG/emoji;
  nothing is fetched from the internet, so the files work fully offline.
- **Videos in git:** the 3 clips (~22 MB total) are committed so the mockups
  "just work." For the real site we'd serve video from the host/CDN (or Git LFS),
  not the repo — noted for later.
- **Bilingual (Arabic/RTL):** each design includes an "العربية" language-toggle
  placeholder in the header. Full Arabic + right-to-left is a later project
  (it's on the improvements roadmap).
