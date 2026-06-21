# 01 — How the Site Is Built (What We Know)

You asked: *"can you get any information of how the website is built?"* Here is
the honest, evidence-based answer.

## TL;DR

**m4acc.com is a WordPress website.** It is PHP, server-rendered. It is **not**
a JavaScript single-page app (React/Vue/Angular/Next/Nuxt). It uses a premium
theme with a drag-and-drop **page builder** (most likely WPBakery or Elementor),
a portfolio-style **custom post type** for project pages, a contact form with
**reCAPTCHA**, and is served via **Google Cloud**.

## How we know (the evidence)

We could not pull the live HTML from the build environment (its network policy
blocks outbound requests to that domain — that's a sandbox restriction, not the
site blocking us). So this is assembled from public tech-fingerprint data and
the site's own URL structure:

1. **Technology fingerprint** reports: *WordPress.org, PHP, reCAPTCHA, Google
   Cloud web serving.*
2. **URL structure screams WordPress**:
   - Clean "pretty permalinks": `/about-us/`, `/contact/`, `/products/`,
     `/consultancy-services/` — the default tidy WordPress page URL style.
   - A custom post type at **`/work/...`**, e.g.
     `/work/biosafety-laboratories/`, `/work/glp-laboratory/`,
     `/work/cleanrooms-and-gmp-facilities/`. A dedicated `work` slug is the
     fingerprint of a **premium business/portfolio theme** (the kind sold on
     ThemeForest), which almost always ships with a page builder.
3. **reCAPTCHA** on the contact page → a forms plugin such as **Contact Form 7**
   or **WPForms**.

## What this means for you (why it's good news)

- **WordPress is the most documented platform in existence.** Almost any problem
  you hit has a known, safe solution.
- **The "staging" path is paved.** WordPress hosts and plugins make staging
  copies a one-click, normal operation (see `03-staging-explained.md`).
- **You usually won't write much code.** A lot of "development" here is
  configuring the theme, editing pages in the page builder, managing plugins,
  and small CSS/PHP tweaks. The skills you need are **WordPress skills**, not
  JavaScript-bundler skills.
- **The risky actions are well-known and avoidable** (see
  `04-safe-editing-playbook.md`).

## What we still DON'T know (and must confirm)

These can't be seen reliably from outside. You'll confirm them with
`08-discovery-checklist.md`:

| Unknown                         | Why it matters                                        |
|---------------------------------|-------------------------------------------------------|
| Exact **theme** name + version  | Determines where design lives and how to edit safely  |
| Whether it's a **child theme**  | Editing a parent theme directly = changes lost on update |
| **Page builder** (WPBakery/Elementor/other) | Each edits pages very differently             |
| Full **plugin** list + versions | Plugins are the #1 cause of conflicts/outages         |
| **Host / control panel** (cPanel, Plesk, managed WP, raw GCP VM) | Decides how you get staging, backups, SSH/SFTP |
| **PHP / WordPress versions**    | Affects compatibility and security                    |
| Existing **backups**            | Your safety net — must exist before you touch anything |
| **Who has admin access**        | You need credentials to do real work                  |
| **Bilingual / Arabic + RTL?**   | Saudi audience; may need right-to-left support later   |

## A note on "is it JS-rendered?"

You specifically wondered whether the front end is JavaScript-rendered. Short
answer: the **page itself is rendered by PHP on the server** (classic
WordPress). There is JavaScript on the page (there always is — for menus,
sliders, the page-builder front end, reCAPTCHA), but the content is **not**
assembled client-side by a JS framework. So when you "view source" you'll see
the real content in the HTML, not an empty `<div id="root">`. That's the
WordPress signature.

> Keep this file updated. As you run the discovery checklist and learn the real
> theme/plugins/host, replace the "unknowns" above with confirmed facts.
