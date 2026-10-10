import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

/* ------------------ Brand Config ------------------ */

const baseUrl =
  process.env.VERCEL_ENV === "production"
    ? "https://www.rayforce.uy"
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

export const SITE = {
  name: "Rayforce",
  baseUrl,
  localeMap: {
    es: "es_UY",
    en: "en_US",
  },
  country: "UY",
  city: "Montevideo",
};

/** El `@id` de la Organization del layout, para que los schemas de cada pagina
 *  la referencien. Fijo y no `baseUrl`: es un nombre, igual en preview y en prod. */
export const ORGANIZATION_ID = "https://www.rayforce.uy/#organization";

/* ------------------ Helpers ------------------ */

function splitKeywords(value: string): string[] {
  return value.split(",").map((k) => k.trim());
}

/* ------------------ Main Generator ------------------ */

export async function generateLocaleMetadata({
  locale,
  route,
  path = "/",
  image,
}: {
  locale: string;
  route: string;
  path?: string;
  /** Foto de 1200x630 para compartir, con `${route}.imageAlt` de alt. El
   * `openGraph` de abajo pisa la imagen de `[locale]/opengraph-image` en toda
   * ruta que no sea la home: sin esto, el link sale sin imagen. */
  image?: string;
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "metadata",
  });

  const title = t(`${route}.title`);
  const description = t(`${route}.description`);
  const ogDescription = t(`${route}.ogDescription`);
  const keywords = splitKeywords(t(`${route}.keywords`));
  const normalizedPath = path === "/" ? "" : path;
  const localizedPath = (l: string) =>
    l === routing.defaultLocale
      ? `${SITE.baseUrl}${normalizedPath}`
      : `${SITE.baseUrl}/${l}${normalizedPath}`;
  const fullUrl = localizedPath(locale);

  return {
    metadataBase: new URL(SITE.baseUrl),

    title: {
      default: title,
      template: `%s | ${SITE.name}`,
    },

    description,
    keywords,

    category: "technology",

    openGraph: {
      title,
      description: ogDescription,
      url: fullUrl,
      siteName: SITE.name,
      locale: SITE.localeMap[locale as keyof typeof SITE.localeMap],
      type: "website",
      ...(image && {
        images: [
          { url: image, width: 1200, height: 630, alt: t(`${route}.imageAlt`) },
        ],
      }),
    },

    twitter: {
      card: "summary_large_image",
      title,
      description: ogDescription,
    },

    alternates: {
      canonical: fullUrl,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, localizedPath(l)]),
      ),
    },

    robots: {
      index: process.env.VERCEL_ENV === "production",
      follow: process.env.VERCEL_ENV === "production",
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    other: {
      "geo.region": "UY",
      "geo.placename": SITE.city,
      "geo.position": "-34.9011;-56.1645",
      ICBM: "-34.9011, -56.1645",
      "theme-color": "#0a0a0a",
    },

    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}
