import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

/* ------------------ Brand Config ------------------ */

const baseUrl =
  process.env.VERCEL_ENV === "production"
    ? "https://www.windoors.uy"
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

const SITE = {
  name: "Windoors",
  baseUrl,
  localeMap: {
    es: "es_ES",
    en: "en_US",
  },
};

/* ------------------ OG Image ------------------ */

type OgImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

const DEFAULT_OG_IMAGE = {
  url: `${SITE.baseUrl}/images/windoors-og-image.webp`,
  width: 1200,
  height: 630,
};

/* ------------------ Types ------------------ */

type GenerateLocaleMetadataOptions = {
  locale: string;
  route: string;
  path?: string;
  image?: Partial<OgImage>;
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
  image,
}: GenerateLocaleMetadataOptions): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: "metadata",
  });

  const title = t(`${route}.title`);
  const description = t(`${route}.description`);
  const ogDescription = t(`${route}.ogDescription`);
  const keywords = splitKeywords(t(`${route}.keywords`));
  const imageAlt = t(`${route}.imageAlt`);

  const finalImage: OgImage = {
    ...DEFAULT_OG_IMAGE,
    alt: imageAlt,
    ...image,
  };

  const normalizedPath = path === "/" ? "" : path;
  const fullUrl = `${SITE.baseUrl}/${locale}${normalizedPath}`;

  return {
    metadataBase: new URL(SITE.baseUrl),

    title,
    description,
    keywords,

    openGraph: {
      title,
      description: ogDescription,
      url: fullUrl,
      siteName: SITE.name,
      locale: SITE.localeMap[locale as keyof typeof SITE.localeMap],
      type: "website",
      images: [
        {
          url: finalImage.url,
          width: finalImage.width,
          height: finalImage.height,
          alt: finalImage.alt,
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: ogDescription,
      images: [finalImage.url],
    },

    alternates: {
      canonical: fullUrl,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE.baseUrl}/${l}${normalizedPath}`])
      ),
    },

    robots: {
      index: process.env.VERCEL_ENV === "production",
      follow: process.env.VERCEL_ENV === "production",
    },

    icons: {
      icon: "/favicon.ico",
    },
  };
}
