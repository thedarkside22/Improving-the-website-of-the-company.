# CLAUDE.md

> Guidance for Claude Code (and any AI assistant) working in this repository.
> Read this first, every session.

## What this repository is

This repo supports the **improvement of the existing Masarat for Accreditation
website** (https://m4acc.com/). The company provides **biosafety and cleanroom
testing, certification, training, and consultancy** services from Riyadh, Saudi
Arabia. The business goal of the website work is to look **professional**,
showcase **achievements and the team**, and **build trust with prospective
clients**.

At the moment this repo is primarily a **learning + operations workspace**: it
holds documentation, guides, and assessments that teach the maintainer how to
safely develop an already-built site. The website source code itself is **not
yet in this repo** (we don't yet have the production codebase or hosting
credentials).

## The single most important rule

**The production website is live and serving real customers. Never make
untested changes against production.** Every change flows:

```
local (your computer)  →  staging (a private copy)  →  production (m4acc.com)
```

If you are ever unsure whether an action touches production, **stop and ask**.

## Confirmed facts about the live site

| Aspect            | Finding                                                        |
|-------------------|---------------------------------------------------------------|
| Platform          | **WordPress** (PHP, server-rendered — NOT a JS SPA)           |
| Page building     | A premium theme + page builder, likely **WPBakery or Elementor** |
| Custom content    | A `work`/portfolio custom post type (`/work/...`)             |
| Forms             | reCAPTCHA present → a contact-form plugin (e.g. Contact Form 7) |
| Hosting           | Google Cloud (serving layer)                                  |
| Language/region   | English content, Saudi Arabia (consider Arabic/RTL later)     |

Items still **unknown** (theme name, full plugin list, host/control panel,
backup setup): see `docs/08-discovery-checklist.md`.

## How to work in this repo

- **Branch:** develop on the branch you were assigned for the session; never
  push directly to `main`/`master` without explicit permission.
- **Docs are the product (for now):** keep `docs/` and `assessments/` accurate.
  If you learn a new fact about the live site, update `docs/01-how-the-site-is-built.md`.
- **Commit style:** small, descriptive commits. Explain *why*, not just *what*.
- **Do not invent stack details.** If something about the live site is unknown,
  mark it clearly as unconfirmed and point to the discovery checklist.

## When the actual website code lands here

Once we obtain the production codebase (theme, `wp-content`, etc.), update this
file with:
- Local dev commands (how to start the site locally)
- Build/lint/test commands (if any)
- The real theme + plugin inventory
- Deployment/promotion steps for this specific host

Until then, treat anything about the live site as "observed from outside,"
not "verified from the code."

## Tone for teaching

The maintainer is **new to working on already-built websites** and to
WordPress. Favor: plain language, concrete steps, "why it matters," and
explicit "do this / never do that" guidance. Safety over cleverness.

## Document map

- **`HANDOVER.md` — ⭐ current priority: rebuild the chosen design (Design H = `designs/design-8-*`) in WordPress (Themify Ultra + Builder), locally first. Read this before any build work.**
- `README.md` — start here, overview of everything
- `docs/00-START-HERE.md` — the learning path, in order
- `docs/01-how-the-site-is-built.md` — what we know about the live stack
- `docs/02-wordpress-fundamentals.md` — mental model of WordPress
- `docs/03-staging-explained.md` — **the core lesson: staging**
- `docs/04-safe-editing-playbook.md` — change without crashing
- `docs/05-backups-and-recovery.md` — backups + rollback
- `docs/06-local-development-setup.md` — build a copy on your machine
- `docs/07-deployment-and-promotion.md` — staging → production
- `docs/08-discovery-checklist.md` — find the remaining unknowns
- `docs/09-glossary.md` — terms to know
- `assessments/01-self-assessment-quiz.md` — gauge your level
- `assessments/02-hands-on-tasks.md` — practical exercises
- `assessments/03-answer-key-and-rubric.md` — answers + scoring
