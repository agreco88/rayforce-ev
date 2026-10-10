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

/** Una entrada por idioma: Google pide un `<url>` por version, cada una con
 *  el set completo de alternates (ella incluida). */
function buildEntries(
  path: string,
  priority: number,
  changeFrequency: "monthly" | "weekly",
): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(routing.locales.map((l) => [l, localeUrl(l, path)])),
    "x-default": localeUrl(DEFAULT_LOCALE, path),
  };

  return routing.locales.map((locale) => ({
    url: localeUrl(locale, path),
    // Sin `lastModified`: con `new Date()` cada pedido decia "cambio hoy", y
    // Google aprende a ignorar un lastmod que nunca es cierto.
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const chargerEntries = getChargerProducts().flatMap((product) =>
    buildEntries(
      `/cargadores/${product.slug}`,
      product.featured ? 0.9 : 0.8,
      "monthly",
    ),
  );

  const cableEntries = getCableProducts().flatMap((product) =>
    buildEntries(`/accesorios/${product.slug}`, 0.8, "monthly"),
  );

  return [
    ...buildEntries("/", 1.0, "weekly"),
    ...buildEntries("/cargadores", 0.9, "monthly"),
    ...chargerEntries,
    // Sin cables, /accesorios redirige a la columna.
    ...(cableEntries.length > 0
      ? [...buildEntries("/accesorios", 0.9, "monthly"), ...cableEntries]
      : []),
    ...buildEntries("/accesorios/columna-para-cargador", 0.8, "monthly"),
    ...buildEntries("/empresas", 0.8, "monthly"),
  ];
}
