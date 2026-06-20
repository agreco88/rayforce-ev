import type { Metadata } from "next";
import RayforceComparison from "@/components/sections/home/RayforceComparison";
import { AppHighlightsInteractive } from "@/components/pages/shared/AppHighlightsStatic";
import { ChargerModelHero } from "@/components/pages/shared/ChargerModelHero";
import { ChargerModelHeroMobile } from "@/components/pages/shared/ChargerModelHeroMobile";
import { ChargerModelStats } from "@/components/pages/shared/ChargerModelStats";
import { CompatibilitySection } from "@/components/pages/shared/CompatibilitySection";


import { getAllChargerVariants } from "@/lib/chargers/chargers.helpers";
import { generateLocaleMetadata, SITE } from "@/lib/generate-locale-metadata";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Footer } from "@/components/sections/contact-footer/Footer";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { JsonLd } from "@/components/seo/JsonLd";

/* ------------------------------------------------------------------ */
/* Variant Config (LOCAL for now, keep it simple)                      */
/* ------------------------------------------------------------------ */

const VARIANT_CONFIG = {
  "7kw": {
    charger: {
      powerKw: 7.4,
      variant: "residential",
      mode: "single",
    },
    theme: {
      accentText: "text-sky-400",
      accentBg: "bg-sky-400",
      accentHover: "hover:bg-sky-400",
      divide: "divide-sky-400/10",
      gradientLine: "from-transparent s via-sky-400 to-transparent",
      accentSoft: "bg-sky-400/10",
      accentBorder: "border-sky-400/30",
      accentGradient: "from-sky-400 via-sky-400 to-teal-400",
      glow: "rgba(56,189,248,0.25)",
      glowStrong: "rgba(20,184,166,0.35)",
      accentRing: "ring-sky-400",
    },
  },

  "22kw": {
    charger: {
      powerKw: 22,
      variant: "pro",
      mode: "multi",
      phases: 3,
    },
    theme: {
      accentText: "text-green-500",
      accentBg: "bg-green-500",
      accentHover: "hover:bg-green-600",
      divide: "divide-green-500/10",
      gradientLine: "from-transparent  via-green-700 to-transparent",
      accentSoft: "bg-green-500/10",
      accentBorder: "border-green-500/30",
      accentGradient: "from-green-400 via-green-500 to-emerald-400",
      glow: "rgba(34,197,94,0.25)",
      glowStrong: "rgba(22,163,74,0.35)",
      accentRing: "ring-green-500",
    },
  },
} as const;

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type Props = {
  params: Promise<{
    locale: string;
    model: string;
  }>;
};

export async function generateStaticParams() {
  return getAllChargerVariants().map((v) => ({ model: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, model } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const variant = getAllChargerVariants().find((v) => v.slug === model);
  if (!variant) return {};
  const key = variant.shortName.toLowerCase();
  return generateLocaleMetadata({
    locale,
    route: `cargadores-${key}`,
    path: `/cargadores/${model}`,
  });
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default async function ChargerDetailPage({ params }: Props) {
  const { locale, model } = await params;

  /* ---------------- Resolve Variant ---------------- */

  const variants = getAllChargerVariants();
  const variant = variants.find((v) => v.slug === model);

  if (!variant) return notFound();

  /* ---------------- Resolve Config ---------------- */

  const variantKey =
    variant.shortName.toLowerCase() as keyof typeof VARIANT_CONFIG;

  const config = VARIANT_CONFIG[variantKey];

  if (!config) return notFound();

  /* ---------------- Product Schema ---------------- */

  const t = await getTranslations({ locale, namespace: "ChargerModelPage" });
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Rayforce ${variant.publicName}`,
    brand: { "@type": "Brand", name: "Rayforce" },
    description: t(`variants.${variant.slug}.description`),
    image: `${SITE.baseUrl}${variant.heroImage}`,
    ...(variant.price && {
      offers: {
        "@type": "Offer",
        price: String(variant.price.amount),
        priceCurrency: variant.price.currency,
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: "Rayforce" },
      },
    }),
  };

  /* ---------------- Render ---------------- */

  return (
    <section className="relative w-full z-0  overflow-hidden border-b border-neutral-900">
      <JsonLd schema={productSchema} />
      {/* Hero */}
      <div className="hidden lg:block" id="inicio">
        <ChargerModelHero variant={variant} config={config} />
      </div>
      <div className="block lg:hidden">
        <ChargerModelHeroMobile variant={variant} config={config} />
      </div>
      {/* Stats */}
      <ChargerModelStats model={variant.slug} theme={config.theme} />
      <RayforceComparison
        theme={config.theme}
        powerKw={config.charger.powerKw}
        price={variant.price}
        variantPublicName={variant.publicName}
      />{" "}
      {/* App Highlights Desktop */}
      <div className="">
        <AppHighlightsInteractive theme={config.theme} />
      </div>
      {/* Compatibility */}
      <CompatibilitySection theme={config.theme} id="compatibilidad" />
      {/* <ChargingHomeBanner /> */}
      <Footer />
      <ScrollDepthTracker page={`charger_${model}`} />
    </section>
  );
}
