import type { Metadata } from "next";
import { CableOtherModelsBlock } from "@/components/pages/shared/CableOtherModelsBlock";
import { CableModelHeroWithCarousel } from "@/components/pages/shared/hero-with-carousel/CableModelHeroWithCarousel";
import { cableGalleryFor } from "@/components/pages/shared/hero-with-carousel/gallery-media";

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
    route: `accesorios-${product.metadataKey}`,
    path: `/accesorios/${model}`,
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
    // Las fotos de la galeria; los videos no van.
    image: cableGalleryFor(product).flatMap((m) =>
      m.type === "image" ? [`${SITE.baseUrl}${m.src}`] : [],
    ),
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
        name: t("breadcrumb.accessories"),
        item: `${SITE.baseUrl}/accesorios`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.publicName,
        item: `${SITE.baseUrl}/accesorios/${model}`,
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
      {/* El mismo hero en los dos tamaños: trae el precio y la ficha. */}
      <div id="inicio">
        <CableModelHeroWithCarousel product={product} />
      </div>
      <section className="border-y border-neutral-900 bg-neutral-950 py-24 sm:py-32">
        <CableOtherModelsBlock
          product={product}
          className="mx-auto max-w-7xl px-6 lg:px-8"
        />
      </section>
      {/* El FAQ es el general de cables: lo que se pregunta antes de elegir
          largo y conector aplica igual a los tres modelos. */}
      <Footer
        faqNamespace="AccessoriesPage.Faq"
        faqId="faq"
        ctaSource={`cable_${model}`}
        theme={product.theme}
      />
      <ScrollDepthTracker page={`cable_${model}`} />
    </section>
  );
}
