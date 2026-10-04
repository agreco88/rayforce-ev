import type { Metadata } from "next";
import { ChargerModelHero } from "@/components/pages/shared/ChargerModelHero";
import { ChargerModelHeroMobile } from "@/components/pages/shared/ChargerModelHeroMobile";
import { ChargerPricingSection } from "@/components/pages/shared/ChargerPricingSection";
import { ChargerUnboxingSection } from "@/components/pages/shared/ChargerUnboxingSection";
import { CompatibilitySection } from "@/components/pages/shared/CompatibilitySection";
import { ProductSpecsTable } from "@/components/pages/shared/ProductSpecsTable";

import { getChargerProductBySlug } from "@/lib/catalog/catalog.helpers";
import { notFound } from "next/navigation";
import { Footer } from "@/components/sections/contact-footer/Footer";

/**
 * La pagina de modelo anterior al hero con galeria, entera: queda de
 * referencia y para reusar piezas. Fuera del indice, sin schema ni tracking.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

type Props = {
  params: Promise<{ locale: string; model: string }>;
};

export default async function ChargerPreviousVersionPage({ params }: Props) {
  const { model } = await params;
  const product = getChargerProductBySlug(model);
  if (!product) return notFound();

  return (
    // `overflow-x-clip` y no `overflow-hidden`: recorta el desborde lateral de
    // los glows igual, pero sin volverse contenedor de scroll — `hidden` lo
    // hace, y eso rompe cualquier `sticky` que cuelgue de adentro.
    <section className="relative w-full z-0 overflow-x-clip border-b border-neutral-900">
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
    </section>
  );
}
