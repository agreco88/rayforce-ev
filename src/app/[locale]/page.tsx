import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { generateLocaleMetadata } from "@/lib/generate-locale-metadata";
import { getCableProducts } from "@/lib/catalog/catalog.helpers";
import { JsonLd } from "@/components/seo/JsonLd";
import { HomeHeroSection } from "@/components/sections/home/hero/HomeHeroSection";
import HashScrollOnMount from "@/components/HashScrollOnMount";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
// Oculto — ver el comentario en el JSX. NO BORRAR.
// import { HomeChargersSection } from "@/components/sections/home/chargers/HomeChargersComparison";
// Oculto — ver el comentario en el JSX. El componente vive en disco como
// HomeWallboxSectionVariant. NO BORRAR.
// import { HomeWallboxSectionVariant } from "@/components/sections/home/wallbox/HomeWallboxSectionVariant";
import { WhatIsWallboxSection } from "@/components/pages/chargers/WhatIsWallboxSection";
import { brandList } from "@/components/pages/shared/compatibility/compatibility.data";

/*
  Oculto: el bento nuevo de wallbox. Se saca mientras se rearma la sección.
  El componente y sus traducciones quedan en disco. NO BORRAR.

const HomeWallboxSectionVariant = dynamic(() =>
  import(
    "@/components/sections/home/wallbox/HomeWallboxSectionVariant"
  ).then((m) => ({
    default: m.HomeWallboxSectionVariant,
  })),
);
*/

/*
  Oculto: el bloque de costos/tendencia (barras UTE vs nafta, contadores
  gigantes y grafico historico) se reutiliza en otro proyecto. El componente,
  sus charts y sus traducciones quedan en disco. NO BORRAR.

const EnergyCostAndTrendSection = dynamic(() =>
  import("@/components/sections/home/cost/EnergyCostAndTrendSection").then(
    (m) => ({ default: m.EnergyCostAndTrendSection }),
  ),
);
*/

/*
  Oculto: los cargadores se capturan por el flyout del header y por los CTAs de
  la seccion de wallbox. La grilla sigue montada en /cargadores. NO BORRAR.

const HomeChargersSection = dynamic(() =>
  import("@/components/sections/home/chargers/HomeChargersComparison").then(
    (m) => ({ default: m.HomeChargersSection }),
  ),
);
*/

const HomeAccessoriesSection = dynamic(() =>
  import("@/components/sections/home/accessories/HomeAccessoriesSection").then(
    (m) => ({ default: m.HomeAccessoriesSection }),
  ),
);

const GoogleReviewsBlock = dynamic(() =>
  import("@/components/shared/reviews/GoogleReviewsBlock").then((m) => ({
    default: m.GoogleReviewsBlock,
  })),
);

// HomeBenefitsSection ya no se monta acá, y con ella se fue el ancla
// #beneficios: el enlace del footer (FooterNavColumn) apunta a una sección que
// la home no tiene.

// El lineup de wallboxes, solo desktop: la seccion no se monta en mobile.
const HomeLineupSection = dynamic(() =>
  import("@/components/sections/home/lineup/HomeLineupSection").then((m) => ({
    default: m.HomeLineupSection,
  })),
);

const CompatibilitySection = dynamic(() =>
  import("@/components/pages/shared/CompatibilitySection").then((m) => ({
    default: m.CompatibilitySection,
  })),
);

// FAQ + CTA + navegacion: el cierre entero.
const Footer = dynamic(() =>
  import("@/components/sections/contact-footer/Footer").then((m) => ({
    default: m.Footer,
  })),
);

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateLocaleMetadata({ locale, route: "home", path: "/" });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Common.Faq" });
  // Mismas respuestas que muestra FooterFaq: pasan por `t` para que la de
  // compatibilidad reciba las marcas en `{brands}`.
  const brands = brandList(locale);
  const faqItems = (t.raw("items") as { title: string }[]).map((item, i) => ({
    title: item.title,
    answer: t(`items.${i}.answer`, { brands }),
  }));
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main className="bg-neutral-950">
      <JsonLd schema={faqSchema} />
      <HashScrollOnMount />
      <HomeHeroSection id="inicio" />
      <Suspense fallback={null}>
        <HomeLineupSection id="cargadores" />
        <WhatIsWallboxSection id="que-es-un-wallbox" />

        {/* Oculto: el bento no va en la home. Se guardo como
            HomeWallboxSectionVariant para reusarlo en otra pagina. NO BORRAR. */}
        {/* <HomeWallboxSectionVariant id="wallbox-bento" /> */}

        {/* Oculto — ver el comentario del import. NO BORRAR. */}
        {/* <EnergyCostAndTrendSection id="ahorro" /> */}

        {/* Oculta: la grilla "Soluciones inteligentes de carga". La home queda
            más corta y los cargadores se siguen capturando por el flyout del
            header y por /cargadores, donde esta misma grilla sigue montada.
            El componente y sus traducciones quedan en disco. NO BORRAR.

            El ancla #cargadores la toma HomeLineupSection, arriba. */}
        {/* <HomeChargersSection id="cargadores" /> */}

        {/* Es la seccion de los cables: sin ninguno a la venta, no va. */}
        {getCableProducts().length > 0 && (
          <HomeAccessoriesSection id="accesorios" />
        )}
        {/* Justo antes del cierre: se chequea que sirva para el auto propio
            y ahi ya aparecen las reseñas, el FAQ y el CTA. */}
        <CompatibilitySection id="compatibilidad" />
        {/* Mismo riel que en la pagina de modelo: compatibilidad ya cierra
            con su `pb-32`, por eso `lg:pt-0`. */}
        <section className="overflow-hidden bg-neutral-950 px-6 py-24 lg:px-16 lg:pt-0 lg:pb-32">
          <GoogleReviewsBlock className="mx-auto max-w-[1440px]" />
        </section>
        <Footer faqNamespace="Common.Faq" faqId="faq" />
      </Suspense>
      <ScrollDepthTracker page="home" />
    </main>
  );
}
