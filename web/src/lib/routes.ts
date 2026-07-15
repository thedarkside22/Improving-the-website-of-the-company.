import type { Locale } from "@/i18n/config";

/** Canonical, locale-agnostic route paths (appended after /[locale]). */
export const paths = {
  home: "",
  build: "/build",
  equip: "/equip",
  testMaintain: "/test-maintain",
  projects: "/projects",
  about: "/about",
  contact: "/contact",
} as const;

/** Build a locale-prefixed href, e.g. localePath("ar", paths.build) → "/ar/build". */
export function localePath(locale: Locale, path: string): string {
  return `/${locale}${path}`;
}

/** Href for a single project case study. */
export function projectPath(locale: Locale, slug: string): string {
  return `/${locale}${paths.projects}/${slug}`;
}
