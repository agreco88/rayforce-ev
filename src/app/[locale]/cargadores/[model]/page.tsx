import type { Metadata } from "next";
// TODO(cleanup): PROMOVER — ver el comentario en el JSX.
// import { ChargerPricingSection } from "@/components/pages/shared/ChargerPricingSection";
import { CompatibilitySection } from "@/components/pages/shared/CompatibilitySection";
import { InstallationsSection } from "@/components/pages/shared/InstallationsSection";
import { ChargerModelHeroWithCarousel } from "@/components/pages/shared/hero-with-carousel/ChargerModelHeroWithCarousel";
import { galleryFor } from "@/components/pages/shared/hero-with-carousel/gallery-media";
import { BackToTopButton } from "@/components/shared/BackToTopButton";
import { GoogleReviewsBlock } from "@/components/shared/reviews/GoogleReviewsBlock";

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
    // La homologacion URSEA, con su numero: es lo que habilita venderlo en
    // Uruguay y la señal de confianza mas fuerte que tiene la pagina.
    hasCertification: {
      "@type": "Certification",
      name: "Homologación URSEA",
      certificationIdentification: product.ursea.authNumber,
      certificationStatus: "https://schema.org/CertificationActive",
      issuedBy: {
        "@type": "Organization",
        name: "URSEA",
        url: "https://www.ursea.gub.uy",
      },
    },
    description: t(`variants.${product.slug}.description`),
    // La del hero primero (la que Google toma de portada) y despues las fotos
    // de la galeria; los videos no van. `Set`: el BA repite su placeholder.
    image: [
      ...new Set([
        product.heroImage,
        ...galleryFor(product).flatMap((m) => (m.type === "image" ? [m.src] : [])),
      ]),
    ].map((src) => `${SITE.baseUrl}${src}`),
    offers: {
      "@type": "Offer",
      price: String(product.price.amount),
      priceCurrency: product.price.currency,
      availability: "https://schema.org/InStock",
      url: `${SITE.baseUrl}/cargadores/${model}`,
      seller: { "@type": "Organization", name: "Rayforce" },
      // Lo mismo que promete la caja de envios del hero: gratis a todo el
      // pais, sale en el dia o al siguiente habil y llega en 1 a 3 dias.
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0,
          currency: product.price.currency,
        },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "UY" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitCode: "DAY" },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "UY",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
      },
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
      {/* El mismo hero en los dos tamaños: trae el precio y la ficha. */}
      <div id="inicio">
        <ChargerModelHeroWithCarousel product={product} />
      </div>
      <CompatibilitySection theme={product.theme} id="compatibilidad" />
      {/* Gutter de 64px en desktop, el mismo riel que la caja de
          compatibilidad. En mobile lleva su propio `pt-24`: compatibilidad
          cierra con borde y fondo propios, y sin el quedaba pegada. */}
      <section className="bg-neutral-950 px-6 py-24 lg:px-16 lg:pt-0 lg:pb-32">
        <GoogleReviewsBlock
          accentText={product.theme.accentText}
          className="mx-auto max-w-[1440px]"
        />
      </section>
      {/* Las fotos son todas de BC: el BA, que viene con toma, no las lleva. */}
      {product.specs.cableType !== "socket" && (
        <InstallationsSection theme={product.theme} />
      )}
      {/* TODO(cleanup): PROMOVER ChargerPricingSection. Salio de mobile para
          igualar las secciones de desktop, pero el toggle de instalacion /
          columna / cable con el precio animado vale la pena rescatarlo. */}
      {/* <ChargerPricingSection product={product} id="precios" /> */}
      {/* El FAQ es por variante: lo que se pregunta de un 22kW trifasico no es
          lo que se pregunta de un 7,2kW con cable. */}
      <Footer
        faqNamespace={`ChargerModelPage.Faq.${product.slug}`}
        faqId="faq"
        ctaSource={`charger_${model}`}
        theme={product.theme}
      />
      <ScrollDepthTracker page={`charger_${model}`} />
      <BackToTopButton />
    </section>
  );
}
