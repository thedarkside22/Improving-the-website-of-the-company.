# Go-Live Content Checklist

Everything that needs to be **gathered, confirmed, or created** before Design H
(the `designs/design-8-*` mockups) can go live as the real site. This is a
content/asset list, not a build list — see `go-live-build-ops-checklist.md` for
the WordPress/technical side.

## Photography & video
- [ ] **A photograph of Masarat's own people on site** — gowned engineers
      working, not an empty room. The "Why Masarat" section on the flagship
      homepage ran beside `panels.webp`, a wide tilted shot of a bench and a
      ceiling captioned as wall panels; at that section's crop the centre of
      the frame was a blank worktop and the dark gap behind it, and it argued
      nothing for a section about who is accountable. The image was removed
      (2026-08-04) and the four values now run full width. Restoring imagery
      there needs a new shot, not a re-crop. `panels.webp` is left in
      `public/media/` and is currently referenced by nothing.
- [ ] Real project photos for each case study (SFDA, KFSHRC, IAU, ABMI, NAMI,
      Care Medical, KFUH) to replace the `PHOTO · <CLIENT>` placeholders.
- [ ] Hover/background videos for project cards, labelled per project (the
      mockup currently reuses generic placeholder clips for some cards).
- [ ] Equip product photos (currently placeholder imagery on the Equip page).
- [ ] Team photos — **already done**, confirm final crops/sizes are supplied.

## What imagery m4acc.com actually has (audited 2026-08-04)

**The projects gallery page shows only client logos — but each project's own
page behind it carries real facility photography and a full written scope.**
Those pages are the source for everything below; the tiles are not.

Individual project pages (WordPress `work` CPT):

| Project | Page | Facility photos |
|---|---|---|
| SFDA BSL-3 | `/work/bsl-3-project/` | none (partner logos only) |
| IAU BSL-3 | `/work/bsl-3-project-iau-dammam/` | none (partner logos only) |
| IAU GLP | `/work/glp-laboratory/` | none (partner logos only) |
| KFSHRC | `/work/cleanroom-project-kfshrc/` | **6** |
| ABMI | `/work/cleanroom-project/` | **4** |
| Care Medical | `/work/iv-pharmacy-chemo-preparation-cleanroom/` | **3** |
| NAMI | `/work/clean-not-classified/` | **2** |
| KFUH TB lab | `/work/tb-lab-certification/` | 1 — a scanned certificate, not a photo |

15 facility photos were imported, converted to WebP (2.6 MB of JPEG → 424 KB)
and wired to their projects as `image` + `gallery` in `content/masarat.ts`.

- [ ] **The KFUH TB-lab certificate was deliberately not imported.** It is a
      scanned World BioHazTec certificate carrying three certifiers'
      signatures and a certificate serial number. Republishing it is a
      decision for the client, not a content import. KFUH is also not yet a
      project record on the flagship site — add it if wanted (2020, testing
      and certification of a TB high-containment laboratory to WHO, CDC and
      BMBL, with WBHT).

The tiles on the gallery page itself are client logos, verified by viewing
each one:

| Tile | File | What it actually is |
|---|---|---|
| SFDA – Riyadh | `الهيئة-العامة-للغذاء-والدواء.png` | Saudi Food & Drug Authority logo |
| KFSHRC | `مستشفى-الملك-فيصل-التخصصي.png` | King Faisal Specialist Hospital logo |
| IAU – Dammam | `Imam_Abdulrahman_Bin_Faisal_University_Logo.png` | IAU logo |
| ABMI Factory | `nbmi.png` | ABMI company logo |
| NAMI 3D Facility | `NAMI-3d-printer.png` | NAMI company logo |
| Care Medical | `care-medical.png` | Care Medical logo |

- ⚠️ **Bug on the live site, worth telling the client:** the "KFUH, Khobar"
  tile serves `Imam_Abdulrahman_Bin_Faisal_University_Logo.png` — IAU's logo,
  not KFUH's.
- Separately, the service pages carry **generic capability shots**:
  `Cleanroom-testing.jpg` (650×325), `Biosafety-Cabinet-Testing-1.jpg`
  (500×300), `Fume-Hood-Testing.jpg`, `Laminar-Airflow-Hood-Testing.jpg`,
  `Decontamination-Services.jpg`, `Mobile-BSL3-lab-1.png`. All are low
  resolution and none is attributable to a named client. **These must not be
  attached to named projects** — putting a photograph of a different facility
  on the SFDA or KFSHRC card is the exact problem
  `components/ProjectMedia.tsx` was written to end. They were not imported.

### Years corrected against the live project pages
Three records carried years that were not sourced from anywhere and were wrong:

| Project | Was | Now (per m4acc.com) |
|---|---|---|
| ABMI | 2023 | **2022** |
| NAMI | 2024 | **2023** |
| Care Medical | 2024 | **2023** |
| KFSHRC | (none) | **2021** |
| SFDA, IAU BSL-3, IAU GLP | (none) | **2022** |

- [ ] Confirm these years with the client — they are taken from the live site,
      which is the best available source but is not a contract record.
- `/about-us/` carries a 16-logo client wall (Fakeeh, National Pharmaceutical
  Factory, King Abdullah Medical City, King Hamad University Hospital, Dr
  Suleiman Al Habib, King Saud University, KFSHRC, NAMI, Arxium, Saudi MoH,
  SFDA, Dalla, KAUST, King Fahd Medical City, ABMI). If a clients strip is
  wanted on the flagship site, that is the source — **subject to the written
  permissions below.**

## Permissions
- [ ] Client-name and logo publication permissions for every project shown,
      **especially SFDA and other regulators** — confirm in writing which
      names/logos may be published publicly before launch.
- [ ] Written sign-off for the "Client names per the company profile" line on
      the Projects page (or remove it once confirmed).

## Logos (Trusted-by strip)
- [ ] `assets/logos/sfda.png` (transparent PNG/SVG)
- [ ] `assets/logos/kfshrc.png` (transparent PNG/SVG)
- [ ] `assets/logos/iau.png` (transparent PNG/SVG)
- [ ] `assets/logos/kfuh.png` (transparent PNG/SVG)
- [ ] Confirm each logo file is cleared for use (see Permissions above) — until
      then the strip gracefully falls back to the client name only.

## Arabic content
- [ ] Native-speaker proofread of all Arabic (MSA) copy before go-live — every
      Arabic page is marked "pending native proofread" until this is done.

## Case studies
- [ ] Confirm the **year** for each case study (current copy uses
      placeholders where the year isn't yet confirmed).
- [ ] Supplier data for the Equip items currently marked "subject to
      confirmation."

## Branding
- [ ] Optional: a tagline-free, horizontal version of the logo for the nav
      header (current logo lockup includes the tagline).

## Project films (YouTube)
- [x] **Per-project YouTube URLs — supplied by the client 2026-08-04.** Each is
      set on `ProjectRecord.youtube` in `flagship-site/content/masarat.ts`.
      Every URL was matched to its project by reading the video's own title,
      not by the order they arrived in:

      | Project | Video title | URL |
      |---|---|---|
      | SFDA BSL-3 | "BSL-3 Laboratory for the Saudi Food & Drug Authority (SFDA)" | `watch?v=FhoHQoRtv1s` |
      | KFUPM cleanrooms | "ISO Class 4 & 5 Cleanroom Project \| Masarat for Accreditation" | `watch?v=cKV4wu1o9NQ` |
      | Al Hamadi pharmacy | "Turnkey Compounding Pharmacy Cleanroom \| USP & ISO Compliant" | `watch?v=mNpxI8XEXeQ` |
      | KFSHRC cleanroom | "USP & ISO Compliant Cleanroom for KFSH&RC \| Turnkey Handover" | `watch?v=WmeqeKpoH84` |
      | IAU BSL-3 | "BSL-3 Laboratory Handover \| Turnkey Project in Dammam" | `watch?v=VWfFMpsxpXQ` |

- [ ] **Confirm the KFSHRC film is cleared for publication.** It was not in the
      repo before and KFSHRC's project record still reads "pending verification
      and publication approval" — the film is now linked from the homepage, so
      that approval matters. See Permissions above.
- [ ] Confirm **Al Hamadi's project location** — recorded as "To be confirmed",
      so the film card and case study omit the location line.
- [ ] Optional: the two training films (`kfupm-workshop.mp4`,
      `workshop-sfda.mp4`) have no YouTube URL yet. They are not on the
      homepage, so nothing is broken — supply them if the training page should
      link out too.

## Standards and credentials
- [ ] The standards band was removed from the homepage and `/contact`
      (2026-08-04) after two designs were rejected in that position. The
      content now lives in the site footer (`content/site.ts` → `credentials`),
      the hero chips, `/about` and each service page. Nothing was lost —
      confirm the footer treatment is acceptable before launch.

## Future improvements (deliberately deferred)
Content that exists and is good, but is not being featured yet. Nothing here is
missing — these are decisions to revisit, not gaps to fill.

- [ ] **Technical guides on the homepage.** The homepage carried a three-card
      preview of the guides ("Answers before you call"). Removed on the
      client's instruction, 2026-08-04: keep the content, defer the promotion.
      - The six guides remain published at `/guides` and `/guides/<slug>` and
        are linked from the footer and the mobile menu — no content was lost.
      - Source content: `flagship-site/content/guides.ts`.
      - The removed component is recoverable from git history
        (`components/home/GuidePreview.tsx`), or the section can simply be
        re-added to `app/page.tsx`.
      - Why it was there: Gartner (Mar 2026) found 67% of B2B buyers prefer a
        rep-free experience for at least part of a purchase, so answering a
        technical question before anyone calls is cheap trust. Worth
        reconsidering once the rest of the homepage content is signed off.

## Workshops / Training
- [ ] Confirm the identity of the SFDA workshop clip currently used as a
      placeholder video.
- [ ] Finalize the real workshop/training entries (dates, titles, audience) to
      replace the two "Upcoming Workshop / Training" placeholder cards on the
      Projects page.
