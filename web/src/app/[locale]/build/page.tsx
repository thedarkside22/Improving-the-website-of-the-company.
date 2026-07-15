import type { Metadata } from "next";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getSolution } from "@/content/solutions";
import SolutionPageView from "@/components/pages/SolutionPageView";

export const metadata: Metadata = { title: "Build & Engineer" };

export default async function BuildPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const solution = getSolution("build")!;
  return <SolutionPageView locale={locale} dict={dict} solution={solution} />;
}
