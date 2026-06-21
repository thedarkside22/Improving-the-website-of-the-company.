# 04 — Safe Editing Playbook (Change Without Crashing)

A blunt, practical list of what to do and what never to do. Print it. Pin it.

## The five commandments

1. **Back up before you touch.** Files **and** database. Every time, on
   production. (See `05-backups-and-recovery.md`.)
2. **Production is read-only to you for code/design.** Theme edits, plugin
   installs/updates, and core updates happen on **staging/local first**.
3. **One change at a time.** Change → test → confirm → next. If you update five
   plugins at once and the site breaks, you don't know which one did it.
4. **Always have a rollback.** Before any risky action, know *exactly* how you'd
   undo it. If you can't name the undo, don't do the action.
5. **When unsure, stop and ask.** "I'm not sure if this touches production" is a
   reason to pause, not to find out the hard way.

## Risk tiers (how much caution each action needs)

### 🟢 Low risk — generally safe, still do big ones on staging
- Editing page **text** or swapping an image in `/wp-admin`.
- Adding a new page or a new `work`/portfolio entry.
- Writing CSS in **Appearance → Customize → Additional CSS** (it's reversible and
  scoped; worst case you delete it).
- Adjusting menus.

> Even low-risk content work: for a major homepage rewrite, draft it on staging
> so a stakeholder can review before it's public.

### 🟡 Medium risk — staging first, backup taken
- Installing a **new plugin**.
- Changing **theme settings / page-builder layouts** on key pages.
- Editing widgets/footer/header globally.
- Changing **permalink** settings (can break every URL + SEO if done wrong).

### 🔴 High risk — staging + backup + low-traffic window + rollback plan ready
- **Updating** WordPress core, the theme, or plugins.
- **Editing PHP** (theme `functions.php`, child theme files, plugin code). A
  single typo here can cause the **White Screen of Death** (a fatal error that
  takes the whole site down).
- **Deactivating/deleting** a plugin the site depends on.
- **Switching or updating the theme.**
- Touching **`wp-config.php`**, `.htaccess`, DNS, SSL, or PHP version.
- Anything that runs a **database** change/migration.

## The "White Screen of Death" (and how not to cause it)

The most common WordPress catastrophe is a blank white page caused by a **PHP
fatal error** — usually from editing PHP directly in the browser admin, or a bad
plugin/theme update.

**Prevent it:**
- **Never** use **Appearance → Theme File Editor** or **Plugins → Plugin
  Editor** on production. These edit live PHP with no safety net and can instantly
  kill the site. (Many pros disable these editors entirely.)
- Edit PHP only in **local/staging**, via proper files, where you can see the
  error and undo.
- Keep a way to access files outside the browser (SFTP / host file manager) so
  you can revert a bad file even when the admin is down.

**Recover from it:** rename the offending plugin/theme folder via SFTP/file
manager to deactivate it, or restore the backup. (Details in lesson 05.)

## A safe procedure for the most common risky job: updates

```
On STAGING:
  1. Refresh staging from production.
  2. Take a backup of staging.
  3. Update ONE thing (core, or one plugin, or the theme).
  4. Click through the site. Test the contact form. Check mobile.
  5. Repeat 3–4 for the next item.
On PRODUCTION (only after staging is clean):
  6. Pick a low-traffic time.
  7. Take a FULL production backup.
  8. Apply the same updates.
  9. Immediately re-test the key pages live.
 10. If anything is wrong → restore the backup.
```

## Pre-change checklist (use every time)

- [ ] Do I have a current **backup** of production (files + DB)?
- [ ] Am I making this change on **staging/local**, not production?
- [ ] Am I changing **one thing** at a time?
- [ ] Do I know the **exact rollback** step?
- [ ] Have I noted the **date/time** and **what** I changed (a simple log)?
- [ ] For PHP/updates: am I avoiding the in-browser file editors?

## Post-change verification (use every time)

After any production change, immediately check:
- [ ] Homepage loads and looks right.
- [ ] `/about-us`, `/products`, `/consultancy-services` load.
- [ ] A few `/work/...` case-study pages load.
- [ ] `/contact` loads **and the form submits** (confirm the email arrives).
- [ ] It looks correct on **mobile** and **desktop**.
- [ ] No error messages, no broken images, no broken links in the header/footer.
- [ ] Site speed feels normal (a caching/optimization plugin misconfig can slow
      everything down).

## Keep a change log

A plain text or Markdown log saves you hours during an incident:

```
2026-06-21  Updated Contact Form 7 5.9 → 5.9.8 on staging, tested, promoted. OK.
2026-06-22  Added "Our Team" section to /about-us via page builder on staging.
            Pending stakeholder review.
```

When something breaks next week, the log tells you what changed and when.

## Golden rule, restated

> If you can't undo it in five minutes, you're not ready to do it on production
> yet. Back up, move to staging, and make undo possible first.
