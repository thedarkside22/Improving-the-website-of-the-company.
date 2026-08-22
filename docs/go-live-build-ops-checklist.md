# Go-Live Build & Ops Checklist

The WordPress build and operational steps needed to turn Design H
(`designs/design-8-*`) into the live site, safely. Pair with
`docs/03-staging-explained.md` and `docs/04-safe-editing-playbook.md`, and
follow the class/asset mapping in `designs/WORDPRESS-MAPPING.md`.

## Theme setup
- [ ] Build a **Themify Ultra child theme** (never edit the parent theme
      directly).
- [ ] Enqueue `design-8.css`, `design-8-rtl.css`, and `design-8.js` from the
      child theme.
- [ ] Enqueue the Google Fonts used by the design: Sora, Inter, IBM Plex Sans
      Arabic, and Material Symbols.

## Global structure
- [ ] Build the global header and footer to match the mockup (logo, nav,
      "Contact us" button, footer columns, social icons, compliance strip).
- [ ] Build the **Solutions** dropdown menu (Build & Engineer / Equip / Test &
      Maintain) and the primary nav menu.
- [ ] Wire the **"Contact us"** button as a menu/theme button, not a plain link.

## Portfolio / Projects
- [ ] Create the Portfolio custom post type (or confirm the existing `work`
      CPT) with categories: **Cleanroom**, **BSL**, **GLP**, and
      **Workshops/Training** (renamed from the old "Certification" category).
- [ ] Re-file the KFUH entry under **BSL**, not Certification/Training.
- [ ] Recreate the filter bar + search behavior (data-driven filtering, no
      custom JS logic beyond what's already in `design-8.js`).

## Forms & contact
- [ ] Build the Contact page/section with the page builder, including the
      reCAPTCHA-protected contact form.
- [ ] **Renew WP Mail SMTP** — outgoing form emails were previously failing in
      production; confirm SMTP credentials are current before go-live.
- [ ] Confirm the live Google Map embed and click-to-chat WhatsApp button
      carry over from the mockup.

## Arabic / multilingual
- [ ] Install and configure **Polylang** for EN/AR content pairing.
- [ ] Wire RTL rendering for Arabic pages using `design-8-rtl.css`.
- [ ] Confirm the language toggle round-trips correctly between English and
      Arabic versions of every page.

## Accessibility / QA
- [ ] **Fix orange-on-white contrast** on `.eyebrow` and other small orange
      text — current combination fails WCAG AA and must be darkened or given
      a heavier weight/background before launch.
- [ ] Cross-browser and mobile QA pass on all pages, both languages.

## Backups & environments
- [ ] Confirm backup tooling (**All-in-One WP Migration** or equivalent) is
      installed and a backup is taken before every promotion step.
- [ ] Promote **local → staging → production** in that order; get sign-off at
      staging before touching production (see `docs/03-staging-explained.md`).
- [ ] Set up **redirects** from old URLs to new ones where page structure has
      changed, to protect SEO.

## Analytics & performance
- [ ] Reinstall/confirm analytics tracking (e.g. Google Analytics/Tag Manager)
      on the rebuilt site.
- [ ] Enable **Themify Cache** (or equivalent caching) for production
      performance.

## Sign-off
- [ ] Final stakeholder review on staging before the production promotion.
- [ ] Confirm all items in `go-live-content-checklist.md` are complete or
      explicitly deferred before flipping production DNS/traffic.
