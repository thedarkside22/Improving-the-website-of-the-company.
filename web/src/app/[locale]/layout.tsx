import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { type Locale, dir, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import WhatsAppFab from "@/components/site/WhatsAppFab";
import BackToTop from "@/components/site/BackToTop";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    metadataBase: new URL("https://www.m4acc.com"),
    title: {
      default: isAr
        ? "مسارات للاعتماد | حلول مكافحة العدوى والتلوث"
        : "Masarat for Accreditation | Biosafety & Cleanroom Engineering",
      template: `%s | ${isAr ? "مسارات للاعتماد" : "Masarat for Accreditation"}`,
    },
    description: isAr
      ? "شركة سعودية تهندس الغرف النظيفة ومختبرات السلامة الحيوية المبنية لاجتياز أدق عمليات التفتيش."
      : "A Saudi company engineering cleanrooms and biosafety labs built to pass the strictest inspection — since 2016.",
    alternates: {
      languages: { en: "/en", ar: "/ar" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: isAr ? "ar_SA" : "en_US",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const dict = await getDictionary(typedLocale);

  return (
    <html lang={typedLocale} dir={dir(typedLocale)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header locale={typedLocale} dict={dict} />
        <main>{children}</main>
        <Footer locale={typedLocale} dict={dict} />
        <WhatsAppFab label={dict.common.chatWithUs} />
        <BackToTop label={dict.common.backToTop} />
      </body>
    </html>
  );
}
