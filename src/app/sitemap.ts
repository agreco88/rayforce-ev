import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://www.rayforce.uy";
const DEFAULT_LOCALE = routing.defaultLocale || "es";

const CHARGERS = [
  { slug: "bs20-bc-7kw", priority: 0.9 },
  { slug: "bs20-bc-22kw", priority: 0.8 },
];

function localeUrl(locale: string, path: string): string {
  const base =
    locale === DEFAULT_LOCALE
      ? `${BASE_URL}${path}`
      : `${BASE_URL}/${locale}${path}`;
  return base.replace(/\/+$/, "") || BASE_URL;
}

function buildEntry(
  path: string,
  priority: number,
  changeFrequency: "monthly" | "weekly",
): MetadataRoute.Sitemap[number] {
  return {
    url: localeUrl(DEFAULT_LOCALE, path),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, localeUrl(l, path)]),
      ),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const chargerEntries = CHARGERS.map(({ slug, priority }) =>
    buildEntry(`/cargadores/${slug}`, priority, "monthly"),
  );

  return [
    buildEntry("/", 1.0, "weekly"),
    buildEntry("/cargadores", 0.9, "monthly"),
    ...chargerEntries,
  ];
}
