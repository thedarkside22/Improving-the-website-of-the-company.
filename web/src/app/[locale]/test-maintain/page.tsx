import type { Metadata } from "next";
import { type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getSolution } from "@/content/solutions";
import SolutionPageView from "@/components/pages/SolutionPageView";

export const metadata: Metadata = { title: "Test & Maintain" };

export default async function TestMaintainPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const dict = await getDictionary(locale);
  const solution = getSolution("test-maintain")!;
  return <SolutionPageView locale={locale} dict={dict} solution={solution} />;
}
