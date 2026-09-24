import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CablesShopGrid } from "@/components/pages/cables/CablesShopGrid";
import { CablesHero } from "@/components/pages/cables/CablesHero";
import { CablesIncludedSection } from "@/components/pages/cables/CablesIncludedSection";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { Footer } from "@/components/sections/contact-footer/Footer";
import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { CABLE_THEME } from "@/lib/catalog/cables.catalog";
import { generateLocaleMetadata, SITE } from "@/lib/generate-locale-metadata";
import { JsonLd } from "@/components/seo/JsonLd";
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateLocaleMetadata({
    locale,
    route: "cables",
    path: "/cables",
  });
}

export default async function CablesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "CablesPage.Hero.breadcrumb",
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("home"), item: SITE.baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: t("cables"),
        item: `${SITE.baseUrl}/cables`,
      },
    ],
  };

  return (
    <div className="bg-neutral-950">
      <JsonLd schema={breadcrumbSchema} />

      {/* Hero + grilla sobre el mismo fondo, igual que /cargadores. */}
      <section className="relative overflow-hidden">
        <GridBackground
          cellSize={64}
          lineOpacity={0.3}
          className="opacity-30"
          maskImage="radial-gradient(ellipse 80% 80% at 100% 0%, #000 20%, transparent 80%)"
        />

        {/* El degrade que levanta el hero. Ambar y no verde: es el color de la
            linea de cables, el mismo que tiñe las tarjetas y el FAQ. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[900px] bg-[radial-gradient(ellipse_75%_65%_at_78%_-5%,rgba(251,191,36,0.28),rgba(251,191,36,0.07)_45%,transparent_72%)]"
        />

        <div className="page-shell relative z-10 flex flex-col pb-24 lg:pb-32">
          <CablesHero />

          {/* Tres columnas: son tres modelos y entran en una fila. */}
          <CablesShopGrid className="mt-16 grid-cols-1 sm:grid-cols-2 lg:mt-0 lg:grid-cols-3" />
        </div>
      </section>

      {/* Que incluye + el ensayo del conector: valen para los tres modelos. */}
      <CablesIncludedSection id="incluye" />

      <Footer
        faqNamespace="CablesPage.Faq"
        faqId="faq"
        ctaSource="cables"
        theme={CABLE_THEME}
      />
      <ScrollDepthTracker page="cables" />
    </div>
  );
}
