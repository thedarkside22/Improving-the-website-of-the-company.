# HANDOVER — Flagship site (`flagship-site/`)

> **Read this first if you are picking up the flagship site.**
> Last updated: 2026-08-04.
>
> ⚠️ **`HANDOVER.md` (the other one) is about a different, older job** — porting
> Design H onto WordPress/Themify. That work is not what has been happening.
> This file supersedes it for anything touching `flagship-site/`.

---

## 0. TL;DR

- The live work is **`flagship-site/`** — a vinext (Next.js-style) React app,
  **not** the `designs/design-8-*.html` mockups and **not** WordPress.
- It is deployed for colleague review at
  **https://masarat-review.iizeyadxxx91.workers.dev**.
- **Everything is uncommitted.** 115 changed/untracked paths sit on top of
  commit `57d55dd`. The deployed site is currently the only other copy.
- Production (m4acc.com) has **not** been touched and must not be. It is still
  the old WordPress site.

---

## 1. The single most important thing to do next

**Commit the work.** `flagship-site/` is its own git repo and every change from
this session is uncommitted, with no messages explaining any of it. If the
directory is lost, so is all of it.

```bash
git -c safe.directory="C:/Users/iizey/Documents/Improving_company_website/flagship-site" \
  -C flagship-site status
```

`flagship-site/` is a **nested repo owned by a different Windows account**, so
every git command there needs the `-c safe.directory=...` prefix or it fails
with "detected dubious ownership". The parent repo shows `flagship-site/` as a
single untracked entry, so the parent's `git status` hides all of it.

---

## 2. What this session changed

### Round 1 — the boss's 13 review notes

All applied. Full note-by-note mapping in
`docs/superpowers/specs/2026-08-04-flagship-homepage-boss-review-design.md` §2.
Summary:

- `cta.primary` is **"Contact us"** (was "Talk to an engineer").
- Every **response-time promise removed** site-wide ("engineers reply within
  one business day"), including one hiding in `TestFastLane.tsx` that a
  line-wrapped grep missed.
- Hero rewritten: **"Cleanroom and containment laboratory solutions."** plus a
  company description. No industry limitation anywhere, including the
  site-wide meta description.
- Hero chips are solid white pills; **Manufacturing (GLP/GMP) is red** by
  client request. Note red is otherwise reserved for biosafety hazard levels —
  one CSS rule reverts it.
- New **What we do** section (cleanrooms + containment, with IV/chemo,
  operating, isolation rooms and CSSD).
- New **Industries we serve** — 12 sectors, every one traceable to m4acc.com.
- **Contact form removed** from the homepage (still on `/contact` and pillar
  pages). **Guides preview removed** (guides still live at `/guides`).
- **Why Masarat** values restructured (see round 3).
- **Project films** moved to the end of the page as links, not embeds.

### Round 2 — second review pass

- The four hero **"I need…" doors became named solution cards**: Cleanrooms,
  Containment & BSL labs, Equipment, Testing & certification.
- The **standards band was deleted** from the homepage and `/contact` after two
  rejected designs. Its content moved to the **footer** as fine print
  (`content/site.ts` → `credentials`).
- **Project films became a real video shelf** — five thumbnails, play badges,
  per-video YouTube links.

### Round 3 — Why Masarat + project pages

- **Why Masarat**: image removed (a tilted shot of a bench, off-message and
  badly cropped), four values now full width as **heading + detail**.
- **Project photos harvested from m4acc.com** — 15 images in
  `public/media/project-*.webp`, mapped to ABMI, Care Medical, KFSHRC and NAMI.
- **Individual project page rebuilt** (`app/projects/[slug]/page.tsx`): a facts
  panel plus a **jump bar** ("On this page") that is built from the sections
  that project actually has, then `#scope` → `#gallery` → `#related`.

### Deployment

Deployed to Cloudflare Workers. Redeploy with:

```bash
npm --prefix flagship-site run deploy:review
```

The review site is **deliberately gated from search**: `worker/seo.ts` serves
`Disallow: /` and the layout emits `noindex` for any host that is not
m4acc.com. Flip the `SITE_INDEXABLE=true` worker variable only once client-name
publication permissions are confirmed in writing.

---

## 3. Where things live

| What | Where |
|---|---|
| Homepage composition | `app/page.tsx` (7 sections) |
| Homepage sections | `components/home/*.tsx` |
| Project detail page | `app/projects/[slug]/page.tsx` |
| Projects, scope, industries, films | `content/masarat.ts` |
| Company, nav, CTAs, credentials | `content/site.ts` |
| Design tokens | `app/tokens.css` |
| Styles | `app/base.css`, `home.css`, `pages.css`, `chrome.css` |

Rules the code enforces, stated in the files themselves: never claim anything
m4acc.com does not already claim publicly; a spec chip carries only a real
standard/class/figure; each photograph appears in exactly one place; the hero
guarantees all four cards clear the fold at 375×667; CSS logical properties
throughout so an Arabic/RTL pass is a flag flip; no letter-spacing.

---

## 4. Open items — needing the client, not code

These are the real blockers. Full list in
`docs/go-live-content-checklist.md`.

1. **KFSHRC film publication approval.** Its record still says "pending
   verification and publication approval", but its film is now linked from the
   homepage. Confirm before this is shown widely.
2. **Client-name and logo permissions** for every named project, especially
   SFDA and other regulators.
3. **Al Hamadi's location** — recorded as "To be confirmed"; the UI omits the
   line rather than printing that.
4. **A photograph of Masarat's own people on site** — the Why Masarat section
   is intentionally image-free until this exists. It is a photography brief,
   not a crop.
5. **Two training films** have no YouTube URL yet.

---

## 5. Known issue, already scoped

The floating **WhatsApp button overlaps page content** at various scroll
positions on every page — including the office address and the "Open in Google
Maps" link on `/contact`. Pre-existing, site-wide, not caused by this session's
work. Verified by measuring rects at multiple scroll positions.

---

## 6. Verification commands

```bash
npm --prefix flagship-site run build
```

Typecheck shows **3 pre-existing errors** in `db/index.ts` and `worker/index.ts`
(Cloudflare `cloudflare:workers`, `Fetcher`, `D1Database` types). They are not
from this work — ignore them, but do not add more.

Preview locally via the Browser pane's `masarat-flagship` config (port 3000).
Never start a dev server with a raw shell command.
