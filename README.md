# Improving the Masarat for Accreditation Website

A learning + operations workspace for safely improving the existing
**[Masarat for Accreditation](https://m4acc.com/)** website — a WordPress site
for a Riyadh-based biosafety & cleanroom services company.

**Goal of the website work:** look professional, showcase the company's
achievements and team, and give prospective clients confidence in what to
expect when working with Masarat.

**Goal of *this repo* (for now):** teach the maintainer how to develop an
already-built website **without crashing it**, with a heavy focus on
**staging**.

---

## Who this is for

You (the maintainer). You will do the development. You currently:
- don't have the production codebase or documentation yet,
- are new to working on an existing/live website,
- want to learn the safe workflow before touching anything real.

This repo meets you exactly there.

## ⭐ New: the Next.js + 3D rebuild (`/web`)

The approved design is now being built as a **separate, standalone Next.js
application** in [`web/`](web) — server-rendered, English/Arabic (RTL), with a
flagship **interactive 3D cleanroom** that assembles from the background as you
scroll through it. It runs **alongside** the live WordPress site and replaces it
only after staging review; production `m4acc.com` is untouched.

- **Run it:** `cd web && npm install && npm run dev` → http://localhost:3000
- **Why + how:** [`docs/10-architecture-decision-nextjs-rebuild.md`](docs/10-architecture-decision-nextjs-rebuild.md)
- **The 3D experience:** [`docs/11-flagship-explorer-brief-and-storyboard.md`](docs/11-flagship-explorer-brief-and-storyboard.md)
- **3D asset (Blender→GLB) brief:** [`web/public/models/README.md`](web/public/models/README.md)

Everything below concerns the original learning workspace and the live
WordPress site, which remain valid.

## What we already know about the live site

It's **WordPress** (PHP — a traditional server-rendered CMS, *not* a
React/Vue/Angular JavaScript app). It uses a premium theme with a page builder
(likely WPBakery or Elementor), a portfolio/`work` custom post type, a
contact form with reCAPTCHA, and is hosted on Google Cloud.

Full detail and the evidence: [`docs/01-how-the-site-is-built.md`](docs/01-how-the-site-is-built.md).

## How to use this repo

1. **Read in order**, starting at [`docs/00-START-HERE.md`](docs/00-START-HERE.md).
   It lays out a learning path from "what is WordPress" → "what is staging" →
   "how to change things safely."
2. **Take the self-assessment** ([`assessments/01-self-assessment-quiz.md`](assessments/01-self-assessment-quiz.md))
   to find your starting level. Re-take it later to measure progress.
3. **Do the hands-on tasks** ([`assessments/02-hands-on-tasks.md`](assessments/02-hands-on-tasks.md))
   on a *local* and *staging* copy — never on production.
4. **Run the discovery checklist** ([`docs/08-discovery-checklist.md`](docs/08-discovery-checklist.md))
   to fill in the unknowns about the real site (theme, plugins, host, backups).

## The golden rule

```
Edit locally → test on staging → only then promote to production (m4acc.com)
```

Never edit production directly. When in doubt, back up first and ask.

## Repository layout

```
.
├── CLAUDE.md                 # Guidance for AI assistants working here
├── README.md                 # This file
├── docs/                     # The lessons / guides
│   ├── 00-START-HERE.md
│   ├── 01-how-the-site-is-built.md
│   ├── 02-wordpress-fundamentals.md
│   ├── 03-staging-explained.md          ← the core lesson
│   ├── 04-safe-editing-playbook.md
│   ├── 05-backups-and-recovery.md
│   ├── 06-local-development-setup.md
│   ├── 07-deployment-and-promotion.md
│   ├── 08-discovery-checklist.md
│   └── 09-glossary.md
└── assessments/              # Measure and grow your level
    ├── 01-self-assessment-quiz.md
    ├── 02-hands-on-tasks.md
    └── 03-answer-key-and-rubric.md
```
