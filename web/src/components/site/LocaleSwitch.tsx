"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";

/** Swaps the leading /[locale] segment of the current path to the other language. */
export default function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname() || `/${locale}`;
  const other: Locale = locale === "en" ? "ar" : "en";
  const parts = pathname.split("/");
  parts[1] = other;
  const href = parts.join("/") || `/${other}`;
  return (
    <Link className="ar-toggle" href={href} lang={other} hrefLang={other}>
      {other === "ar" ? "العربية · AR" : "English · EN"}
    </Link>
  );
}
