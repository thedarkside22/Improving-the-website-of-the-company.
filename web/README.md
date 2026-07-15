# Masarat — Next.js website (separate rebuild)

A new, standalone **Next.js 15 + TypeScript + React Three Fiber** website for
[Masarat for Accreditation](https://m4acc.com/), built to run **alongside** the
live WordPress site and replace it only after staging review. Separate from the
static mockups in [`../designs`](../designs).

See the decision record: [`../docs/10-architecture-decision-nextjs-rebuild.md`](../docs/10-architecture-decision-nextjs-rebuild.md)
and the flagship brief: [`../docs/11-flagship-explorer-brief-and-storyboard.md`](../docs/11-flagship-explorer-brief-and-storyboard.md).

## Quick start

```bash
cd web
npm install
npm run dev            # http://localhost:3000  → redirects to /en
```

Other scripts: `npm run build` · `npm start` · `npm run typecheck`.

## What's here

- **Bilingual routing** — every page under `/[locale]` (`en`, `ar`), Arabic in
  full **RTL**. Language switch is a pure URL swap. `/` redirects via middleware.
- **Pages** — Home, Build & Engineer, Equip, Test & Maintain, Projects (+ case
  studies), About (real team), Contact. Real Masarat content in `src/content/*`.
- **Flagship 3D** — "Inside a Masarat controlled environment": a scroll-driven
  cleanroom that assembles from the background as the camera travels through.
  Lazy-mounted, reduced-motion aware, WebGL fallback. See `src/components/three`.
- **CMS seam** — Sanity client + GROQ + schema in `src/sanity` (drop-in; the
  site renders from typed local content until a project id is set).

## Configuration (env)

Copy `.env.example` → `.env.local` and fill in when ready:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=      # set to enable Sanity; empty = local content
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

## The 3D asset pipeline

The flagship renders a **procedural placeholder** today. To ship the real,
photo-accurate models:

1. Author each part in Blender (brief: [`public/models/README.md`](public/models/README.md)).
2. Export optimised **GLB** into `public/models/`.
3. Set `modelsReady = true` in `src/components/three/cleanroomManifest.ts`.

No other changes — the loader and choreography are already wired.

## Deploy (Vercel)

Import the repo, set **Root Directory = `web`**, add the env vars above, deploy.
Every branch gets a protected preview URL; production cutover is a DNS change
once staging review passes. WordPress stays live until then.

## Notes

- **Fonts** (Sora/Inter/IBM Plex Sans Arabic) and **Material Symbols** load via
  `<link>` at runtime — no build-time font fetch. In a fully offline/locked-down
  network they fall back to system fonts and icon names show as text; on the
  open web (and Vercel) they render normally. `next/font` self-hosting is a
  straightforward later upgrade.
- **Assets** in `public/brand`, `public/team`, `public/media` are carried over
  from the approved design. Real project/facility photos drop into
  `public/media` (and, for the 3D, `public/models`).
