# From Mockup → WordPress: How These Designs Get Built on the Live Site

> **Read this if you're worried about compatibility.** A static HTML mockup is
> never "dropped into" WordPress as-is — WordPress builds every page through its
> **theme + page builder**. But that does **not** mean redoing the design. There
> are two separate things:
>
> - **Design** (layout, sections, colors, type, the videos, the team block) →
>   **transfers 100%.** That's what these mockups lock in.
> - **Implementation** (recreating that design with your builder or a child
>   theme) → done once, in WordPress, regardless of how we prototyped.
>
> So you implement the agreed design *once*; you don't "design it twice." This
> file maps every section of the mockups to the exact WordPress building block.

## First: confirm the stack (one quick discovery step)

The live site is **WordPress** with a premium theme + page builder, **likely
WPBakery or Elementor** — but that's **not yet confirmed**. Confirm it before the
real build (see `../docs/08-discovery-checklist.md`). The exact builder changes
*which widget* you use, not the design. Once confirmed, replace "page-builder
section" below with the concrete widget names.

## Three ways to implement (pick per section)

1. **Page builder** (Elementor / WPBakery) — best for most sections; the client
   can edit content later without code.
2. **Child theme** (`style.css` + a template/template-part) — best for the global
   header/footer and any custom layout the builder can't do cleanly. **Never edit
   the parent theme** (updates would wipe it) — see `../docs/02` and `../docs/04`.
3. **Gutenberg blocks / block patterns** — a no-builder option if the site moves
   to the block editor.

## Section-by-section mapping

Each mockup `<section>` carries a `data-wp="…"` hint in the HTML. Here's the full
map (applies to all three designs — they share the same content structure):

| Mockup section | WordPress implementation | Content source |
|---|---|---|
| **Top bar** (phone/email/lang) | Theme option / a small child-theme template part, or builder header row | Theme/Customizer |
| **Header + nav** | Theme header + **Appearance → Menus**; CTA button = menu item w/ button class | Menus |
| **Hero** | Page-builder hero section (2 columns / background-video widget) | Page content |
| **Accreditation strip/marquee** | "Image logos" / "logo carousel" widget, or a styled rich-text row | Media library (badge logos) |
| **Stats / counters** | Builder "counter" widgets in a columns row | Page content |
| **Services** (grid / numbered list) | Repeater of icon-boxes, **or** link each to the existing `/work/` items | Pages, or `work` CPT |
| **Video showcase** | "Video" widgets + a lightbox (built-in to most builders, or a plugin) | **Self-hosted media** or a video CDN |
| **Team** ("Meet our experts") | A **Team** custom post type or a team plugin → "team grid" widget | New `team` CPT |
| **Partner (MRC)** | 2-column "image + text" section | Page content |
| **CTA band** | Full-width "call to action" widget | Page content |
| **Contact** | **Existing form plugin** (Contact Form 7 / WPForms) embedded via shortcode | Form plugin |
| **Footer** | Theme footer widget areas | Widgets |
| **WhatsApp button** | A "click-to-chat" plugin or a small floating-button snippet in the child theme | Plugin/child theme |

## Reusing the design code directly

You don't have to rebuild the CSS from scratch:

- **Design tokens:** each file's top `:root { --brand / --green / --cyan … }`
  block is the palette + spacing. Paste it into the **child theme stylesheet** so
  the live site uses the same colors and rhythm.
- **Section CSS** can move into the child theme or **Appearance → Customize →
  Additional CSS** (low-risk; reversible — see `../docs/04`).
- **Markup is semantic and section-based**, so each block maps cleanly to a
  builder row/columns. No framework, no utility-class soup to untangle.

## Dynamic content (so it's editable, not hard-coded)

The mockups hard-code text for preview. On the live site, wire these to editable
WordPress content so staff can update without a developer:

- **Services** → pages or the existing `work` custom post type (`/work/...`).
- **Projects/videos** → the `work` CPT, or a simple "videos" CPT, with the MP4 /
  embed as a field.
- **Team** → a `team` CPT (name, role, photo, bio).
- **Contact** → the site's existing contact-form plugin (keeps reCAPTCHA).

## The golden rule still applies

Build and preview the chosen design on **local → staging**, never directly on
production. Take a backup first. Promote only when it's reviewed and signed off.
Full safe-change workflow: `../docs/03-staging-explained.md` and
`../docs/04-safe-editing-playbook.md`.

## TL;DR

- Nothing here is throwaway: **the design is the deliverable**, and it carries
  over 1:1.
- The only "redo" is normal WordPress implementation work, done once.
- Confirm the page builder first (`../docs/08`), then build section-by-section
  using the table above — reusing the mockup's CSS tokens and structure.
