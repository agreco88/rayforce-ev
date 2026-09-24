import type { Metadata } from "next";
import { ChargerModelHero } from "@/components/pages/shared/ChargerModelHero";
import { ChargerModelHeroMobile } from "@/components/pages/shared/ChargerModelHeroMobile";
import { ChargerPricingSection } from "@/components/pages/shared/ChargerPricingSection";
import { ChargerUnboxingSection } from "@/components/pages/shared/ChargerUnboxingSection";
import { CompatibilitySection } from "@/components/pages/shared/CompatibilitySection";
import { ProductSpecsTable } from "@/components/pages/shared/ProductSpecsTable";

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
    name: `Rayforce ${product.familyName} ${t(`variants.${product.slug}.fullName`)}`,
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
        name: t(`variants.${product.slug}.fullName`),
        item: `${SITE.baseUrl}/cargadores/${model}`,
      },
    ],
  };

  /* ---------------- Render ---------------- */

  return (
    // `overflow-x-clip` y no `overflow-hidden`: recorta el desborde lateral de
    // los glows igual, pero sin volverse contenedor de scroll — `hidden` lo
    // hace, y eso rompe cualquier `sticky` que cuelgue de adentro.
    <section className="relative w-full z-0 overflow-x-clip border-b border-neutral-900">
      <JsonLd schema={productSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {/* Hero */}
      <div className="hidden lg:block" id="inicio">
        <ChargerModelHero product={product} />
      </div>
      <div className="block lg:hidden">
        <ChargerModelHeroMobile product={product} />
      </div>
      {/* Qué viene en la caja */}
      <ChargerUnboxingSection product={product} id="unboxing" />
      {/* Ficha tecnica */}
      <ProductSpecsTable product={product} id="especificaciones" />
      {/* Compatibilidad: despues de la ficha y antes del precio — se chequea
          que el equipo sirva para el auto propio antes de mirar cuanto sale. */}
      <CompatibilitySection theme={product.theme} id="compatibilidad" />
      {/* Pricing + social proof */}
      <ChargerPricingSection product={product} id="precios" />
      {/* El FAQ es por variante: lo que se pregunta de un 22kW trifasico no es
          lo que se pregunta de un 7,2kW con cable. Sin `compatibilityId`: la
          compatibilidad ya va arriba, entre la ficha y el precio. */}
      <Footer
        faqNamespace={`ChargerModelPage.Faq.${product.slug}`}
        faqId="faq"
        ctaSource={`charger_${model}`}
        theme={product.theme}
      />
      <ScrollDepthTracker page={`charger_${model}`} />
    </section>
  );
}
