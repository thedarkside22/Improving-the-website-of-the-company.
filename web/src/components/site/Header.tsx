"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/i18n/config";
import { paths, localePath } from "@/lib/routes";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [acc, setAcc] = useState(false);
  const p = (path: string) => localePath(locale, path);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solutionLinks = [
    { href: p(paths.build), icon: "architecture", label: dict.nav.build },
    { href: p(paths.equip), icon: "science", label: dict.nav.equip },
    { href: p(paths.testMaintain), icon: "fact_check", label: dict.nav.testMaintain },
  ];

  return (
    <>
      <header className="site-header">
        <div className="nav-inner">
          <Link className="brand" href={p(paths.home)} aria-label={`${site.name} — home`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-navy.png" alt={site.name} width={150} height={40} />
          </Link>

          <nav aria-label="Primary">
            <ul className="nav-links">
              <li className="has-dropdown">
                <Link href={p(paths.build)}>
                  {dict.nav.solutions} <Icon name="expand_more" />
                </Link>
                <div className="dropdown" role="menu">
                  {solutionLinks.map((s) => (
                    <Link key={s.href} href={s.href} role="menuitem">
                      <Icon name={s.icon} /> {s.label}
                    </Link>
                  ))}
                </div>
              </li>
              <li>
                <Link href={p(paths.projects)}>{dict.nav.projects}</Link>
              </li>
              <li>
                <Link href={p(paths.about)}>{dict.nav.about}</Link>
              </li>
              <li>
                <Link href={p(paths.contact)}>{dict.nav.contact}</Link>
              </li>
            </ul>
          </nav>

          <Link className="btn btn-primary nav-cta desktop" href={p(paths.contact)}>
            {dict.nav.contactUs} <Icon name="arrow_forward" />
          </Link>
          <button
            className="nav-toggle"
            aria-label={dict.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="mobile-top">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-white.png" alt={site.name} width={140} height={34} />
          <button className="mobile-close" onClick={() => setOpen(false)} aria-label={dict.nav.closeMenu}>
            <Icon name="close" />
          </button>
        </div>
        <nav aria-label="Mobile">
          <button className="m-acc-toggle" aria-expanded={acc} onClick={() => setAcc((a) => !a)}>
            {dict.nav.solutions} <Icon name="expand_more" />
          </button>
          <div className={`m-acc-panel ${acc ? "open" : ""}`}>
            {solutionLinks.map((s) => (
              <Link key={s.href} href={s.href} onClick={() => setOpen(false)}>
                {s.label}
              </Link>
            ))}
          </div>
          <Link href={p(paths.projects)} onClick={() => setOpen(false)}>
            {dict.nav.projects}
          </Link>
          <Link href={p(paths.about)} onClick={() => setOpen(false)}>
            {dict.nav.about}
          </Link>
          <Link href={p(paths.contact)} onClick={() => setOpen(false)}>
            {dict.nav.contact}
          </Link>
        </nav>
        <Link className="btn btn-primary" href={p(paths.contact)} onClick={() => setOpen(false)}>
          {dict.nav.contactUs} <Icon name="arrow_forward" />
        </Link>
      </div>
    </>
  );
}
