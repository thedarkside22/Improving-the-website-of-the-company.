import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./i18n/config";

/** Pick a locale from the Accept-Language header, defaulting to English. */
function detectLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language")?.toLowerCase() ?? "";
  if (header.split(",").some((part) => part.trim().startsWith("ar"))) {
    return "ar";
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except Next internals, API routes and files with an extension.
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
