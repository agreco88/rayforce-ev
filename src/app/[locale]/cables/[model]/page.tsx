import type { Metadata } from "next";
import { CableModelHero } from "@/components/pages/shared/CableModelHero";
import { CableModelHeroMobile } from "@/components/pages/shared/CableModelHeroMobile";
import { CableDurabilitySection } from "@/components/pages/shared/CableDurabilitySection";
import { CablePricingSection } from "@/components/pages/shared/CablePricingSection";
import { CompatibilitySection } from "@/components/pages/shared/CompatibilitySection";
import { ProductSpecsTable } from "@/components/pages/shared/ProductSpecsTable";

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
    // `overflow-x-clip` y no `overflow-hidden`: recorta el desborde lateral de
    // los glows igual, pero sin volverse contenedor de scroll — `hidden` lo
    // hace, y eso rompe cualquier `sticky` que cuelgue de adentro.
    <section className="relative w-full z-0 overflow-x-clip border-b border-neutral-900 bg-[#0a0a0a]">
      <JsonLd schema={productSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {/* Hero */}
      <div className="hidden lg:block" id="inicio">
        <CableModelHero product={product} />
      </div>
      <div className="block lg:hidden">
        <CableModelHeroMobile product={product} />
      </div>
      {/* Durabilidad: va en los tres modelos. El ensayo es sobre el conector,
          que es el mismo en toda la linea, asi que el video aplica igual al
          recto y al espiralado. */}
      <CableDurabilitySection product={product} id="durabilidad" />
      {/* Ficha tecnica */}
      <ProductSpecsTable product={product} id="especificaciones" />
      {/* Compatibilidad: despues de la ficha y antes del precio — se chequea
          que el cable sirva para el auto propio antes de mirar cuanto sale. */}
      <CompatibilitySection theme={product.theme} id="compatibilidad" />
      {/* Pricing + otros modelos */}
      <CablePricingSection product={product} id="precio" />
      {/* El FAQ es el general de cables: lo que se pregunta antes de elegir
          largo y conector aplica igual a los tres modelos. */}
      <Footer
        faqNamespace="CablesPage.Faq"
        faqId="faq"
        ctaSource={`cable_${model}`}
        theme={product.theme}
      />
      <ScrollDepthTracker page={`cable_${model}`} />
    </section>
  );
}
