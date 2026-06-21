# 02 — WordPress Fundamentals (The Mental Model)

You don't need to be a WordPress expert to start. You need a **correct mental
model** so you know *what you're touching* and *what can break*. Here it is.

## What WordPress actually is

WordPress is a **PHP application** that, on every page request:

1. Receives the URL (e.g. `/work/glp-laboratory/`).
2. Looks up the matching content in a **MySQL database**.
3. Picks a **template** from the active **theme** to display it.
4. Lets **plugins** and the theme modify the result via "hooks."
5. Sends finished **HTML** to the browser.

So a WordPress site is really **four things working together**:

```
   FILES (code & assets)              DATABASE (content & settings)
   ──────────────────────             ─────────────────────────────
   WordPress core                     Pages, posts, "work" items
   Theme (the design)                 Menus, widgets
   Plugins (added features)           Plugin/theme settings & options
   Uploads (images, PDFs)             Users
```

**Why this split matters for you:** a full backup or a full copy of the site is
**files + database**. Copying only one is a half-copy that won't work. Keep this
in mind every time you back up, clone, or restore.

## The three layers you'll touch

### 1. Content (lives in the database)
Pages, the `work`/portfolio entries, products, menus, text, and which images go
where. **You edit this in the WordPress admin dashboard (`/wp-admin`).** Editing
content is the *lowest-risk* work — but it's still done on staging first for big
changes.

### 2. Design / layout (theme + page builder)
The theme controls the overall look. The **page builder** (WPBakery or
Elementor) is the drag-and-drop tool used to lay out individual pages. Most of
your "make it look professional" work happens here.

- **Critical concept — the child theme:** you should *never* edit the purchased
  ("parent") theme's files directly, because the next theme update **overwrites
  your changes**. Instead, customizations go in a **child theme** or in the
  theme's built-in "Additional CSS" / custom-code areas. Confirm whether a child
  theme exists (see discovery checklist). If it doesn't, creating one is often
  step zero.

### 3. Behavior / features (plugins)
Plugins add functionality: contact forms, SEO, caching, security, backups,
sliders, etc. **Plugins are the #1 cause of WordPress problems** because:
- two plugins can conflict,
- a plugin update can break a page,
- a poorly-made plugin can slow or crash the site.

This is exactly why staging exists: you test plugin and update changes on a copy
*before* they reach customers.

## The WordPress admin dashboard (`/wp-admin`)

This is the control room. Key sections:

| Menu            | What it does                                              |
|-----------------|----------------------------------------------------------|
| **Dashboard**   | Overview, update notices                                 |
| **Posts / Pages** | Edit content                                           |
| **Work / Portfolio** (custom) | The project case studies you saw at `/work/` |
| **Media**       | Uploaded images, PDFs                                     |
| **Appearance**  | Themes, menus, widgets, "Customize," Additional CSS      |
| **Plugins**     | Install / activate / update / deactivate features        |
| **Users**       | Accounts and roles (Admin, Editor, etc.)                 |
| **Settings**    | Site title, permalinks, reading options                  |
| **Tools**       | Import/export, site health                               |

> **Tools → Site Health** is your friend: it flags PHP version issues, missing
> updates, and configuration problems. Check it early.

## Updates: the thing that quietly causes most outages

WordPress core, the theme, and every plugin get updates. Updates are **good**
(security!) but **risky** if applied blindly to production:

- An update can introduce an incompatibility that white-screens the site.
- "Auto-update everything on the live site" is how people wake up to a broken
  homepage.

**The rule:** apply updates on **staging** first, click through the site,
confirm nothing broke, *then* apply on production (with a backup taken first).
This is covered in `04-safe-editing-playbook.md` and `07-deployment-and-promotion.md`.

## Where "code" actually lives (for when you get the files)

```
wp-config.php            ← site config + DB credentials (SECRET — never commit)
wp-content/
  themes/
    <parent-theme>/      ← the purchased theme (don't edit directly)
    <child-theme>/       ← YOUR safe place for theme customizations
  plugins/               ← each plugin in its own folder
  uploads/               ← images, PDFs (organized by year/month)
wp-admin/  wp-includes/  ← WordPress core (don't edit; updated by WP)
```

> **Security note:** `wp-config.php` contains database passwords and secret
> keys. If the real codebase ever lands in this repo, that file (and any
> backups/DB dumps) must be **git-ignored** and never pushed.

## The one-paragraph summary

WordPress builds each page from **files** (core + theme + plugins) and a
**database** (your content and settings). You'll mostly edit content and layout
through `/wp-admin` and a page builder, occasionally tweak CSS/PHP in a **child
theme**, and manage **plugins/updates** carefully. The things most likely to
break the site are **plugin/theme/core updates and plugin conflicts** — which is
the entire reason the next lesson, **staging**, exists.
