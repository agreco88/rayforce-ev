import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ChargersHero } from "@/components/pages/chargers/ChargersHero";
import { ChargersLineupGuideSection } from "@/components/pages/chargers/ChargersLineupGuideSection";
import { AppHighlightsInteractive } from "@/components/pages/shared/AppHighlightsStatic";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { Footer } from "@/components/sections/contact-footer/Footer";
import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { ChargersCardGrid } from "@/components/sections/home/chargers/ChargersCardGrid";
import { ChargersCommonStats } from "@/components/sections/home/chargers/ChargersCommonStats";
import { generateLocaleMetadata, SITE } from "@/lib/generate-locale-metadata";
import { JsonLd } from "@/components/seo/JsonLd";
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateLocaleMetadata({
    locale,
    route: "cargadores",
    path: "/cargadores",
    image: "/images/og/que-es-un-wallbox.jpg",
  });
}

export default async function ChargersPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "ChargersPage.Hero.breadcrumb",
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("home"), item: SITE.baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: t("chargers"),
        item: `${SITE.baseUrl}/cargadores`,
      },
    ],
  };

  return (
    <div className="bg-neutral-950">
      <JsonLd schema={breadcrumbSchema} />

      {/*
        Hero + grilla + consejos son un solo bloque sobre el mismo fondo: se
        leen como una unidad ("estos son los modelos, asi se elige"). El
        `relative` es el que ancla la grilla de fondo — antes era `absolute`
        sin ancestro posicionado y se estiraba a toda la pagina.
      */}
      <section className="relative overflow-hidden">
        <GridBackground
          cellSize={64}
          lineOpacity={0.3}
          className="opacity-30"
          maskImage="radial-gradient(ellipse 80% 80% at 100% 0%, #000 20%, transparent 80%)"
        />

        {/* El degrade que levanta el hero: el verde entra arriba a la derecha,
            donde la grilla esta mas viva, y se apaga antes de la grilla de
            productos para no teñir las tarjetas. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[900px] bg-[radial-gradient(ellipse_75%_65%_at_78%_-5%,rgba(34,197,94,0.30),rgba(34,197,94,0.08)_45%,transparent_72%)]"
        />

        {/* Mismo ancho y padding que el header (`navigation-scroll.tsx`): el
            h1 y el logo tienen que caer en la misma linea. */}
        <div className="page-shell relative z-10 flex flex-col pb-24 lg:pb-32">
          <ChargersHero />

          {/* Con 2 cargadores, a todo el ancho la card se estira: entre las dos
              ocupan 3/4, como 3 columnas de 4. Alineadas a la izquierda, bajo el h1.
              En celular, en filas como el lineup de la home. */}
          <ChargersCardGrid
            variant={{ base: "horizontal-3", sm: "vertical-2" }}
            className="mt-8 sm:mt-16 lg:mt-0 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:w-3/4"
          />
          <hr className="sm:mt-22 border-white/10 " />

          {/* Los consejos van pegados a la grilla: primero ves los modelos, y
              recien cuando no sabes cual elegir bajas a la guia. */}
          <div className="sm:mt-22 ">
            <ChargersLineupGuideSection />
          </div>

          {/* El divider corta el bloque de eleccion y abre el de la linea
              entera; sin el, el panel de stats quedaba pegado al borde
              superior de la seccion de la app. */}
          <hr className="sm:mt-22 border-white/10 " />

          <div className="sm:mt-22 ">
            <ChargersCommonStats />
          </div>
        </div>
      </section>

      {/* Costos + certificacion URSEA/UTE + app EVSEMaster: aplican a toda la
          linea, no a un modelo — venian de la pagina de producto. */}
      <AppHighlightsInteractive id="app" />

      <Footer faqNamespace="ChargersPage.Faq" faqId="faq" />
      <ScrollDepthTracker page="chargers" />
    </div>
  );
}
