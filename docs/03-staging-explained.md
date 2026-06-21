# 03 — Staging Explained (The Core Lesson)

This is the lesson you specifically asked for. Read it slowly. Staging is the
single most important habit that separates "I broke the company website" from
"I ship improvements with confidence."

## The problem staging solves

The live site (m4acc.com) is being visited by real prospective clients **right
now**. If you change something directly on it and it breaks, customers see the
break immediately. There's no "undo" for the impression a broken site makes.

You need a place to **try changes, see them fully working, and click around**
before any of it reaches a customer. That place is **staging**.

## The three environments

Think of it as three copies of the same site, each with a different job:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│     LOCAL       │ ──▶ │    STAGING      │ ──▶ │   PRODUCTION    │
│  your computer  │     │  private copy   │     │   m4acc.com     │
│                 │     │  on a server    │     │  real customers │
│ experiment      │     │ realistic test  │     │  the real thing │
│ freely; break   │     │ + client review │     │  never edited   │
│ things; it's    │     │ on real-ish     │     │  directly       │
│ only you        │     │ infrastructure  │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
   safe to break          safe to break           must never break
```

| Environment    | Where it runs            | Who sees it        | Purpose                                   |
|----------------|--------------------------|--------------------|-------------------------------------------|
| **Local**      | Your own laptop          | Only you           | Fast, free experimentation; learning      |
| **Staging**    | A server (often the host)| You + people you invite | Final realistic test before going live |
| **Production** | The live host            | The whole world    | The real website; the source of truth for content |

### Why both local AND staging?

- **Local** is fast and private but *not identical* to the real server (different
  PHP version, no real caching/CDN, no production data quirks). Great for "does
  this idea work at all?"
- **Staging** runs on infrastructure that **matches production** (often a clone
  on the same host). It's where you catch "works on my laptop but not on the real
  server" problems, and where a stakeholder can review before launch.

You can start with *just* staging if you want — but local makes the
trial-and-error loop much faster and risk-free.

## What "a staging site" really is

A **full copy** of production — **files + database** (remember lesson 02: a site
is both). Crucially, staging is configured so that:

- It has its **own URL** (e.g. `staging.m4acc.com`, or a host-provided URL).
- It is **blocked from search engines** (so Google never indexes the copy).
- It is often **password-protected** so the public can't stumble onto it.
- It can be **kept in sync** with production and **pushed back** to production
  when you're happy.

## How you'll most likely get a staging site

The exact method depends on the host (see `08-discovery-checklist.md` to find
out which you have). In rough order of "easiest first":

### Option A — Managed WordPress host "1-click staging" (best, if available)
Hosts like Kinsta, WP Engine, SiteGround, Cloudways, and others have a
**"Create staging environment"** button. It clones files + DB, gives you a
staging URL, and offers **"Push to live"** when you're done. This is the gold
standard: safe, reversible, built for exactly this.

### Option B — A staging plugin
Plugins such as **WP Staging** create a staging copy *inside* your existing
hosting. Good when the host has no native staging. You still test on the copy and
push selectively.

### Option C — Manual staging (most control, most steps)
On a generic host (cPanel/Plesk) or a raw Google Cloud VM you (or a developer)
manually:
1. Create a subdomain (`staging.m4acc.com`).
2. Copy all files to it.
3. Export the production database and import it into a new staging database.
4. Update `wp-config.php` to point to the staging DB.
5. Run a **search-replace** to change the site URL from `m4acc.com` to
   `staging.m4acc.com` *inside the database* (URLs are stored in the DB — this
   step is essential or the copy will misbehave).
6. Block search engines + password-protect it.

> Because the live site is on **Google Cloud**, you may be in Option C unless a
> managed layer (like Cloudways/managed WP) sits on top. The discovery checklist
> will tell you. Don't worry — you'll likely lean on Option A/B by choosing a
> friendly host, or have a developer set up Option C once.

## The everyday staging workflow

This is the loop you'll repeat for almost every improvement:

```
1. SYNC      Refresh staging from production so it matches what's live.
2. BACKUP    Take a backup of production (your safety net) before anything.
3. CHANGE    Make your improvement on LOCAL and/or STAGING — never production.
4. TEST      Click through every affected page on staging:
             - homepage, /about-us, /work/*, /products, /contact
             - submit the contact form (does the email arrive?)
             - check on mobile width and desktop
             - check it still looks right, links work, nothing errors
5. REVIEW    Share the staging URL with the stakeholder for sign-off.
6. PROMOTE   Push the change to production (see 07-deployment-and-promotion.md),
             ideally during low-traffic hours.
7. VERIFY    Immediately re-check the same pages on the LIVE site.
8. ROLLBACK  If anything is wrong, restore the backup from step 2.
```

### The content-drift gotcha (read this twice)

**Content** (pages, work items, form entries) is edited on **production** by
whoever runs the site day to day. **Code/design** changes are made on **staging**.

If you clone staging from production in January and "push staging to live" in
March, you can **overwrite three months of content edits** that happened on
production. This is the classic staging disaster.

**How to avoid it:**
- Refresh staging from production *right before* you start a change.
- When promoting, push **only what you changed** (e.g. theme files, a specific
  plugin) rather than blindly overwriting the whole production database.
- Coordinate: ask whoever edits content to pause major edits during a promotion
  window, or do promotions for code/design only and leave content edits to
  production.

This single gotcha is why many teams keep **code/design changes** and **content
changes** in separate lanes.

## What staging protects you from (concretely)

- A plugin update that white-screens the homepage → you see it on staging,
  customers never do.
- A theme tweak that looks great on desktop but collapses on mobile → caught in
  staging testing.
- A "small CSS change" that accidentally hides the contact button → caught in
  review.
- A PHP edit with a typo that triggers a fatal error → contained to the copy.

## What staging does NOT protect you from

Be aware of its limits:

- **DNS / domain / SSL changes** affect production directly — staging can't fully
  rehearse those.
- **Email deliverability** can differ between staging and production.
- **Things that depend on real traffic/scale** (caching at load, CDN behavior)
  may differ.
- **Content drift** (above) — staging can *cause* harm if you push it carelessly.

So staging is necessary, not magic. Pair it with **backups** (lesson 05).

## Minimum viable safety (if you do nothing else)

Even before you have a perfect setup, never violate these:

1. **Take a full backup (files + DB) before touching production.**
2. **Never edit theme/plugin code or run updates directly on production.**
3. **Have a written rollback step you could execute in 5 minutes.**

If all three are true, you are already far safer than most people editing live
WordPress sites.

## Where to go next

- `04-safe-editing-playbook.md` — the specific do/don't rules while editing.
- `05-backups-and-recovery.md` — how to actually back up and restore.
- `06-local-development-setup.md` — build the local copy.
- `07-deployment-and-promotion.md` — the careful staging→production push.
