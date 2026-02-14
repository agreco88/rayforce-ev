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

const SITE = {
  name: "Rayforce",
  baseUrl,
  localeMap: {
    es: "es_ES",
    en: "en_US",
  },
  country: "UY",
  city: "Montevideo",
};

/* ------------------ OG Image ------------------ */

const DEFAULT_OG_IMAGE = {
  url: `${SITE.baseUrl}/images/og-rayforce.jpg`, // create this
  width: 1200,
  height: 630,
};

/* ------------------ Helpers ------------------ */

function splitKeywords(value: string): string[] {
  return value.split(",").map((k) => k.trim());
}

/* ------------------ Main Generator ------------------ */

export async function generateLocaleMetadata({
  locale,
  route,
  path = "/",
}: {
  locale: string;
  route: string;
  path?: string;
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
  const fullUrl = `${SITE.baseUrl}/${locale}${normalizedPath}`;

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
      images: [
        {
          ...DEFAULT_OG_IMAGE,
          alt: "Rayforce EV – Cargadores eléctricos en Uruguay",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description: ogDescription,
      images: [DEFAULT_OG_IMAGE.url],
    },

    alternates: {
      canonical: fullUrl,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `${SITE.baseUrl}/${l}${normalizedPath}`,
        ]),
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
