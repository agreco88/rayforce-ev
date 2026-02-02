import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

/**
 * Global constants
 */
const BASE_URL = "https://www.rayforce.uy";
const DEFAULT_LOCALE = routing.defaultLocale || "es";

/**
 * If you ever need to fetch data (blog posts, services, etc.),
 * you can turn this into `async function sitemap()` later.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // --- STEP 1: define which routes you want indexed ---
  // For now it's just the homepage per locale (landing page)
  const staticRoutes = [""]; // add "about-us", "contact" later if needed

  // --- STEP 2: generate URLs for each locale ---
  const urls: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    staticRoutes.map((path) => {
      const localizedPath =
        locale === DEFAULT_LOCALE
          ? `${BASE_URL}/${path}`.replace(/\/+$/, "")
          : `${BASE_URL}/${locale}/${path}`.replace(/\/+$/, "");

      return {
        url: localizedPath,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: path === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((alt) => [
              alt,
              alt === DEFAULT_LOCALE
                ? `${BASE_URL}/${path}`.replace(/\/+$/, "")
                : `${BASE_URL}/${alt}/${path}`.replace(/\/+$/, ""),
            ]),
          ),
        },
      };
    }),
  );

  return urls;
}
