import Link from "next/link";
import type { Dictionary, Locale } from "@/i18n/config";
import { paths, localePath } from "@/lib/routes";
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import LocaleSwitch from "@/components/site/LocaleSwitch";
import Year from "@/components/site/Year";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const p = (path: string) => localePath(locale, path);

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-main">
          <div className="footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-white.png" alt={site.name} width={150} height={40} />
            <p>{dict.footer.tagline}</p>
            <div className="footer-social">
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href={site.social.x} target="_blank" rel="noopener noreferrer" aria-label="X">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>{dict.footer.solutions}</h4>
            <Link href={p(paths.build)}>{dict.nav.build}</Link>
            <Link href={p(paths.equip)}>{dict.nav.equip}</Link>
            <Link href={p(paths.testMaintain)}>{dict.nav.testMaintain}</Link>
            <Link href={p(paths.projects)}>{dict.nav.projects}</Link>
          </div>

          <div className="footer-col">
            <h4>{dict.footer.company}</h4>
            <Link href={p(paths.about)}>{dict.nav.about}</Link>
            <Link href={p(paths.projects)}>{dict.nav.projects}</Link>
            <Link href={p(paths.contact)}>{dict.nav.contact}</Link>
          </div>

          <div className="footer-col footer-contact">
            <h4>{dict.footer.contact}</h4>
            <div>
              <Icon name="call" /> {site.phone}
            </div>
            <div>
              <Icon name="mail" /> {site.email}
            </div>
            <div>
              <Icon name="location_on" />{" "}
              <a href={site.mapUrl} target="_blank" rel="noopener noreferrer">
                {locale === "ar" ? site.addressAr : site.address}
              </a>
            </div>
            <div>
              <Icon name="schedule" /> {site.hours}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © <Year /> {site.name}. {dict.footer.rights}
          </span>
          <span className="muted">{dict.footer.partnerLine}</span>
          <LocaleSwitch locale={locale} />
        </div>
      </div>
    </footer>
  );
}
