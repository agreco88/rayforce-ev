import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { generateLocaleMetadata } from "@/lib/generate-locale-metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { HomeHeroSection } from "@/components/sections/home/hero/HomeHeroSection";
import HashScrollOnMount from "@/components/HashScrollOnMount";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
// Oculto — ver el comentario en el JSX. NO BORRAR.
// import { HomeChargersSection } from "@/components/sections/home/chargers/HomeChargersComparison";
// Oculto — ver el comentario en el JSX. El componente vive en disco como
// HomeWallboxSectionVariant. NO BORRAR.
// import { HomeWallboxSectionVariant } from "@/components/sections/home/wallbox/HomeWallboxSectionVariant";
import { WallboxIntroSection } from "@/components/sections/home/wallbox-intro/WallboxIntroSection";
import { WhatIsWallboxSection } from "@/components/pages/chargers/WhatIsWallboxSection";

/*
  Ocultos: todo el bloque de wallbox de la home (bento nuevo, la comparativa
  extraída y el explainer original). Se saca mientras se rearma la sección.
  Los componentes y sus traducciones quedan en disco. NO BORRAR.

const HomeWallboxSectionVariant = dynamic(() =>
  import(
    "@/components/sections/home/wallbox/HomeWallboxSectionVariant"
  ).then((m) => ({
    default: m.HomeWallboxSectionVariant,
  })),
);

const HomeComparisonSection = dynamic(() =>
  import("@/components/sections/home/comparison/HomeComparisonSection").then(
    (m) => ({ default: m.HomeComparisonSection }),
  ),
);

const WallboxIntroSection = dynamic(() =>
  import("@/components/sections/home/wallbox-intro/WallboxIntroSection").then(
    (m) => ({ default: m.WallboxIntroSection }),
  ),
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

const PublicChargingCableSection = dynamic(() =>
  import("@/components/sections/home/public-charging/PublicChargingCableSection").then(
    (m) => ({ default: m.PublicChargingCableSection }),
  ),
);

// HomeBenefitsSection ya no se monta acá: sus tres cards pasaron a ser el
// bloque de cierre de WallboxIntroSection, que heredó el ancla #beneficios.
// Con esa sección ahora oculta, #beneficios no existe en la home y el enlace
// del footer (FooterNavColumn) se queda sin destino hasta que se rearme.

// El lineup de wallboxes, solo desktop: la seccion no se monta en mobile.
const HomeLineupSection = dynamic(() =>
  import("@/components/sections/home/lineup/HomeLineupSection").then((m) => ({
    default: m.HomeLineupSection,
  })),
);

const HomeStandSection = dynamic(() =>
  import("@/components/sections/home/stand/HomeStandSection").then((m) => ({
    default: m.HomeStandSection,
  })),
);

// Las preguntas frecuentes. La compatibilidad la monta el footer, arriba de su
// CTA.
const HomeClosingSection = dynamic(() =>
  import("@/components/sections/home/closing/HomeClosingSection").then((m) => ({
    default: m.HomeClosingSection,
  })),
);

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
  const t = await getTranslations({ locale, namespace: "HomePage.Faq" });
  // El FAQ pasó de 6 categorías a una lista plana de preguntas de empresa, así
  // que el schema lee `items` directo (antes aplanaba `groups`).
  const faqItems = t.raw("items") as { title: string; answer: string }[];
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
        {/* Ocultas: la home va del hero directo al banner de cables mientras se
            rearma el bloque de wallbox. Los componentes quedan en disco. NO BORRAR.

            OJO: #beneficios vivía dentro de WallboxIntroSection, así que
            mientras esté oculta ese enlace del footer no tiene destino. */}
        <WhatIsWallboxSection id="que-es-un-wallbox" />

        {/* Oculto: el bento no va en la home. Se guardo como
            HomeWallboxSectionVariant para reusarlo en otra pagina. NO BORRAR. */}
        {/* <HomeWallboxSectionVariant id="wallbox-bento" /> */}
        {/* <HomeComparisonSection id="por-que-un-wallbox" /> */}

        {/* Oculto — ver el comentario del import. NO BORRAR. */}
        {/* <EnergyCostAndTrendSection id="ahorro" /> */}

        {/* Oculta: la grilla "Soluciones inteligentes de carga". La home queda
            más corta y los cargadores se siguen capturando por el flyout del
            header y por /cargadores, donde esta misma grilla sigue montada.
            El componente y sus traducciones quedan en disco. NO BORRAR.

            El ancla #cargadores la toma HomeLineupSection, acá abajo. */}
        {/* <HomeChargersSection id="cargadores" /> */}

        <HomeLineupSection id="cargadores" />

        <HomeStandSection id="columna" />
        <PublicChargingCableSection id="cables-carga-publica" />
        <HomeClosingSection faqId="faq" />
        <Footer compatibilityId="compatibilidad" />
      </Suspense>
      <ScrollDepthTracker page="home" />
    </main>
  );
}
