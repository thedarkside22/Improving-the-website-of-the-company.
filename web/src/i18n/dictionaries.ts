import type { Dictionary, Locale } from "./config";

/**
 * Server-side dictionary loader. Each locale is a lazily-imported module so
 * only the active language ships to a given render.
 */
const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  ar: () => import("./dictionaries/ar").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
