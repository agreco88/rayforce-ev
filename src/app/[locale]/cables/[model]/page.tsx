import type { Metadata } from "next";
import { CableModelHero } from "@/components/pages/shared/CableModelHero";
import { CableModelHeroMobile } from "@/components/pages/shared/CableModelHeroMobile";
import { CableModelStats } from "@/components/pages/shared/CableModelStats";
import { CablePricingSection } from "@/components/pages/shared/CablePricingSection";
import { CableProofVideoSection } from "@/components/pages/shared/CableProofVideoSection";
import { CableWhatsAppCtaSection } from "@/components/pages/shared/CableWhatsAppCtaSection";
import { CablesComparisonTable } from "@/components/sections/home/chargers/charger-comparison/CablesComparisonTable";

import { getCableProductBySlug, getCableProducts } from "@/lib/catalog/catalog.helpers";
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
  return getCableProducts().map((product) => ({ model: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, model } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const product = getCableProductBySlug(model);
  if (!product) return {};
  return generateLocaleMetadata({
    locale,
    route: `cables-${product.metadataKey}`,
    path: `/cables/${model}`,
  });
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default async function CableDetailPage({ params }: Props) {
  const { locale, model } = await params;

  const product = getCableProductBySlug(model);
  if (!product) return notFound();

  /* ---------------- Product Schema ---------------- */

  const t = await getTranslations({ locale, namespace: "CableModelPage" });
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
        name: t("breadcrumb.cables"),
        item: `${SITE.baseUrl}/cables`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.publicName,
        item: `${SITE.baseUrl}/cables/${model}`,
      },
    ],
  };

  /* ---------------- Render ---------------- */

  return (
    <section className="relative w-full z-0 overflow-hidden border-b border-neutral-900 bg-[#0a0a0a]">
      <JsonLd schema={productSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {/* Hero */}
      <div className="hidden lg:block" id="inicio">
        <CableModelHero product={product} />
      </div>
      <div className="block lg:hidden">
        <CableModelHeroMobile product={product} />
      </div>
      {/* Stats */}
      <CableModelStats product={product} theme={product.theme} />
      {/* Proof video — car driving over the coiled cable */}
      {product.slug === "bs-chc003-s" && (
        <CableProofVideoSection theme={product.theme} />
      )}
      {/* Pricing — cable, or bundled with wallbox + installation */}
      <CablePricingSection product={product} id="precio" />
      {/* Comparison table — highlights the currently viewed model */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 2xl:px-0">
        <CablesComparisonTable
          products={getCableProducts()}
          selectedSlug={product.slug}
        />
      </div>
      {/* WhatsApp CTA */}
      <CableWhatsAppCtaSection product={product} />
      <Footer />
      <ScrollDepthTracker page={`cable_${model}`} />
    </section>
  );
}
