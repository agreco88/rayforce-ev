import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getCableProducts, getChargerProducts } from "@/lib/catalog/catalog.helpers";

const BASE_URL = "https://www.rayforce.uy";
const DEFAULT_LOCALE = routing.defaultLocale || "es";

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
    // Sin `lastModified`: con `new Date()` cada pedido decia "cambio hoy", y
    // Google aprende a ignorar un lastmod que nunca es cierto.
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
  const chargerEntries = getChargerProducts().map((product) =>
    buildEntry(
      `/cargadores/${product.slug}`,
      product.featured ? 0.9 : 0.8,
      "monthly",
    ),
  );

  const cableEntries = getCableProducts().map((product) =>
    buildEntry(`/accesorios/${product.slug}`, 0.8, "monthly"),
  );

  return [
    buildEntry("/", 1.0, "weekly"),
    buildEntry("/cargadores", 0.9, "monthly"),
    ...chargerEntries,
    buildEntry("/accesorios", 0.9, "monthly"),
    ...cableEntries,
    buildEntry("/accesorios/columna-para-cargador", 0.8, "monthly"),
    buildEntry("/empresas", 0.8, "monthly"),
  ];
}
