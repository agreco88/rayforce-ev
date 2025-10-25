import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

/* ------------------ Constants ------------------ */

// ✅ Root URL (no /es or /en at the end)
const BASE_URL = "https://next-landing-template-drab.vercel.app";
const SITE_NAME = "HelloWorld Landing Template";

type OgImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

const DEFAULT_OG_IMAGE: OgImage = {
  url: `${BASE_URL}/images/og/macaque-isotype.png`,
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

/* ------------------ Types ------------------ */

type GenerateLocaleMetadataOptions = {
  locale: string;
  route: string; // e.g. "home", "aboutUs", "contactUs"
  path?: string; // URL path ("/", "/about-us", etc.)
  image?: Partial<OgImage>; // optional OG override
};

/* ------------------ Main Generator ------------------ */

export async function generateLocaleMetadata({
  locale,
  route,
  path = "/",
  image,
}: GenerateLocaleMetadataOptions): Promise<Metadata> {
  // ✅ Pull translations from /messages/metadata/[locale].json
  const t = await getTranslations({ locale, namespace: "metadata" });

  // Localized fields
  const title = t(`${route}.title`);
  const description = t(`${route}.description`);
  const ogDescription = t(`${route}.ogDescription`);
  const rawKeywords = t(`${route}.keywords`);
  const keywords = rawKeywords.split(",").map((k) => k.trim());

  // Merge custom OG image if provided
  const finalImage: OgImage = { ...DEFAULT_OG_IMAGE, ...image };

  // ✅ Ensure proper locale prefix and no trailing slashes
  const fullUrl = `${BASE_URL}/${locale}${path}`.replace(/\/+$/, "");

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    keywords,
    openGraph: {
      title,
      description: ogDescription,
      url: fullUrl,
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [finalImage],
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
        routing.locales.map((l) => [
          l,
          `${BASE_URL}/${l}${path}`.replace(/\/+$/, ""),
        ])
      ),
    },
    robots: {
      // ✅ Index only in production
      index: process.env.VERCEL_ENV === "production",
      follow: process.env.VERCEL_ENV === "production",
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}
