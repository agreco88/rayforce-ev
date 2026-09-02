import type { Metadata } from "next";
import RayforceComparison from "@/components/sections/home/RayforceComparison";
import { AppHighlightsInteractive } from "@/components/pages/shared/AppHighlightsStatic";
import { ChargerModelHero } from "@/components/pages/shared/ChargerModelHero";
import { ChargerModelHeroMobile } from "@/components/pages/shared/ChargerModelHeroMobile";
import { ChargerModelStats } from "@/components/pages/shared/ChargerModelStats";
import { ChargerPricingSection } from "@/components/pages/shared/ChargerPricingSection";
import { CompatibilitySection } from "@/components/pages/shared/CompatibilitySection";

import { getChargerProductBySlug, getChargerProducts } from "@/lib/catalog/catalog.helpers";
import { generateLocaleMetadata, SITE } from "@/lib/generate-locale-metadata";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Footer } from "@/components/sections/contact-footer/Footer";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { JsonLd } from "@/components/seo/JsonLd";

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
  return getChargerProducts().map((product) => ({ model: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, model } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const product = getChargerProductBySlug(model);
  if (!product) return {};
  return generateLocaleMetadata({
    locale,
    route: `cargadores-${product.metadataKey}`,
    path: `/cargadores/${model}`,
  });
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default async function ChargerDetailPage({ params }: Props) {
  const { locale, model } = await params;

  const product = getChargerProductBySlug(model);
  if (!product) return notFound();

  /* ---------------- Product Schema ---------------- */

  const t = await getTranslations({ locale, namespace: "ChargerModelPage" });
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Rayforce ${product.publicName}`,
    sku: product.modelCode,
    mpn: product.modelCode,
    brand: { "@type": "Brand", name: "Rayforce" },
    description: t(`variants.${product.slug}.description`),
    image: `${SITE.baseUrl}${product.heroImage}`,
    offers: {
      "@type": "Offer",
      price: String(product.price.amount),
      priceCurrency: product.price.currency,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "Rayforce" },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: SITE.baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: t("breadcrumb.chargers"),
        item: `${SITE.baseUrl}/cargadores`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.publicName,
        item: `${SITE.baseUrl}/cargadores/${model}`,
      },
    ],
  };

  /* ---------------- Render ---------------- */

  return (
    <section className="relative w-full z-0  overflow-hidden border-b border-neutral-900">
      <JsonLd schema={productSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {/* Hero */}
      <div className="hidden lg:block" id="inicio">
        <ChargerModelHero product={product} />
      </div>
      <div className="block lg:hidden">
        <ChargerModelHeroMobile product={product} />
      </div>
      {/* Stats strip */}
      <div className="relative z-20 bg-neutral-950">
        {/* Mobile: own section, normal flow (hero is too tall to straddle) */}
        <div className="block lg:hidden mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] px-4 py-6 shadow-2xl shadow-black/40 backdrop-blur-2xl">
            <ChargerModelStats product={product} theme={product.theme} />
          </div>
        </div>

        {/* Desktop: floats over the Hero/App Highlights seam, full hero width */}
        <div className="hidden lg:block h-0 overflow-visible">
          <div className="-translate-y-1/2">
            <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-16 2xl:px-0">
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] px-10 py-10 shadow-2xl shadow-black/40 backdrop-blur-2xl">
                <ChargerModelStats product={product} theme={product.theme} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* App Highlights (includes wallbox intro + certification blocks) */}
      <div className="">
        <AppHighlightsInteractive theme={product.theme} />
      </div>
      {/* Compatibility */}
      <CompatibilitySection theme={product.theme} id="compatibilidad" />
      {/* Pricing + social proof */}
      <ChargerPricingSection product={product} id="precios" />
      <RayforceComparison
        theme={product.theme}
        powerKw={product.specs.maxPowerKw}
        mercadopagoUrl={product.mercadopagoUrl}
        productSlug={product.slug}
        title={t(`comparisonSection.${product.slug}.title`)}
      />
      <Footer />
      <ScrollDepthTracker page={`charger_${model}`} />
    </section>
  );
}
