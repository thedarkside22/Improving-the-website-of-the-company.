# ADR-01 — Rebuild the Masarat website as a separate Next.js + 3D application

> **Status:** Accepted · **Date:** 2026-07-15 · **Supersedes:** the "port Design H
> into WordPress/Themify" plan in `HANDOVER.md` (kept for reference).
> **Where the code lives:** [`/web`](../web) · **Deploy target:** Vercel.

## Context

The approved design direction ("Definitive Precision", `designs/design-8-*`) was
originally going to be rebuilt inside the existing **WordPress + Themify** stack.
Two things changed the calculus:

1. We want a **flagship interactive 3D experience** ("Inside a Masarat controlled
   environment") as the centrepiece — a scroll-driven cleanroom that assembles
   from the background and the viewer travels through it. Embedding a serious
   WebGL application inside Themify makes optimisation, testing, versioning and
   maintenance unnecessarily hard.
2. We want clean **English/Arabic (RTL)** routing, first-class SEO, fast preview
   deployments, and staff-editable content.

## Decision

Build a **new, separate application** in [`/web`](../web) and run it **alongside**
the live WordPress site. WordPress stays live and untouched until the new site
passes staging review; only then do we cut over. Nothing here touches
production `m4acc.com`.

### Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router) + TypeScript** | Server-rendered, SEO-friendly, clean `/[locale]` routing |
| 3D | **React Three Fiber + three.js** (drei) | The flagship explorer; adaptive quality, lazy-mounted |
| 3D assets | **Blender → optimised GLB/glTF** (Draco) | Marketing derivatives, not raw CAD — see the loader pipeline |
| CMS | **Sanity** (schemas + client scaffolded) | Staff edit projects/team/SEO per-locale without code |
| Hosting | **Vercel** | Protected preview URLs per branch, instant rollback |

### What we kept from the existing work

The content strategy is unchanged — only its *implementation* moved off
WordPress. Retained: the **Build & Engineer / Equip / Test & Maintain**
pathways; projects & case studies; the relationship-first About + real team;
soft, varied CTAs (no "Request a Quote" spam); honest product distinctions; no
unsupported claims; Phase 8 = "Ongoing Support & Partnership"; full EN + AR/RTL;
and the navy/orange clinical-engineering identity.

## Architecture of `/web`

```
web/src/
├── app/[locale]/            # every route under /en or /ar (RTL-aware)
│   ├── layout.tsx           # <html lang dir>, header/footer, fonts, metadata
│   ├── page.tsx             # home (hero, stats, flagship explorer, …)
│   ├── build|equip|test-maintain/   # the three solution pathways
│   ├── projects/ + [slug]/  # index + case studies
│   ├── about/ · contact/
├── components/
│   ├── site/                # header, footer, locale switch, WhatsApp, …
│   ├── three/               # ★ flagship 3D (see ADR-02 / doc 11)
│   ├── pages/ · ui/         # shared views + primitives (Reveal, CountUp)
├── content/                 # typed local content (seed / fallback for CMS)
├── i18n/                    # locales, dictionaries (en/ar), Dictionary type
├── sanity/                  # client + GROQ + schema (drop-in CMS)
└── middleware.ts            # `/` → `/en`, locale detection
```

### The 3D loader pipeline (key decision)

The flagship renders a **procedural placeholder** today and swaps to **real GLB
models** with a one-line flag flip — no choreography changes:

- `cleanroomManifest.ts` — the part list + transforms + assembly timing. This
  doubles as the **spec the Blender team builds against**
  (`web/public/models/README.md`).
- `cleanroomRig.ts` — shared assembly + camera rig used by both paths.
- `CleanroomModels.tsx` — Draco-enabled `useGLTF` loader, only mounted when
  `modelsReady === true`.
- `CleanroomScene.tsx` — the R3F scene (placeholder ⟷ models switch).

The **biggest dependency is not the framework — it's obtaining accurate,
approved 3D source material.** Use representative models, never real client
facility layouts or sensitive BSL plans.

## Migration & launch (unchanged from the agreed build order)

1. Build the full Next.js site + CMS (normal pages first, then the 3D).
2. Migrate content safely: inventory WP pages, `/work/...` URLs, media,
   metadata, forms, analytics, bilingual content. Preserve addresses; add 1-to-1
   redirects where needed ([Google site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)).
3. Controlled launch: keep WordPress live throughout; private staging; test
   forms by confirming **actual receipt**; full backup; DNS rollback ready;
   retain the old site during the launch window.

## Consequences

- **+** Clean separation, testable 3D, fast previews, real bilingual SEO.
- **+** CMS-editable content without risking a live PHP site.
- **−** A new stack for the maintainer to learn (mitigated: docs + typed content).
- **−** Requires a Sanity project + a Blender asset pipeline to reach full
  fidelity; both are scaffolded so they slot in without rework.
