/**
 * Internationalisation config for the Masarat site.
 * Two locales ship day one: English (LTR) and Arabic (RTL).
 * The whole app renders under /[locale]/... so switching language is a
 * pure URL change and every page is statically renderable per-locale.
 */
export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Text direction for a locale — drives <html dir> and RTL-aware CSS. */
export function dir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

/**
 * The shape every dictionary must satisfy. Keeping this explicit means the
 * English and Arabic files can never drift out of sync — a missing key is a
 * TypeScript error, not a silent blank string in production.
 */
export interface Dictionary {
  nav: {
    solutions: string;
    build: string;
    equip: string;
    testMaintain: string;
    projects: string;
    about: string;
    contact: string;
    contactUs: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    lead: string;
    exploreCta: string;
    watchCta: string;
    cardTitle: string;
    cardBody: string;
  };
  common: {
    trustedBy: string;
    viewCaseStudy: string;
    viewAllProjects: string;
    seeProjects: string;
    discussProject: string;
    learnMore: string;
    exploreBuild: string;
    exploreEquip: string;
    exploreTest: string;
    backToTop: string;
    chatWithUs: string;
    ongoing: string;
    illustrative: string;
    requestOnly: string;
  };
  explorer: {
    eyebrow: string;
    title: string;
    lead: string;
    keepScrolling: string;
    fallback: string;
    steps: { title: string; body: string }[];
    hotspots: { diffusers: string; windows: string; door: string };
  };
  home: {
    whatWeDoEyebrow: string;
    whatWeDoTitle: string;
    whatWeDoLead: string;
    projectsEyebrow: string;
    projectsTitle: string;
    projectsLead: string;
    deliveryEyebrow: string;
    deliveryTitle: string;
    deliveryLead: string;
    whyEyebrow: string;
    whyTitle: string;
    standardsEyebrow: string;
    standardsTitle: string;
    ctaTitle: string;
    ctaBody: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    name: string;
    email: string;
    organisation: string;
    message: string;
    send: string;
    success: string;
    demoNote: string;
    phone: string;
    address: string;
    hours: string;
  };
  footer: {
    tagline: string;
    solutions: string;
    company: string;
    contact: string;
    rights: string;
    partnerLine: string;
  };
}
