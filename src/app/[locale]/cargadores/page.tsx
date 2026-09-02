import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ChargersGrid from "@/components/pages/chargers/ChargersGrid";
import { ChargersHero } from "@/components/pages/chargers/ChargersHero";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { FeaturesRayforce } from "@/components/sections/home/FeaturesSection";
import { Footer } from "@/components/sections/contact-footer/Footer";
import { generateLocaleMetadata, SITE } from "@/lib/generate-locale-metadata";
import { JsonLd } from "@/components/seo/JsonLd";
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateLocaleMetadata({
    locale,
    route: "cargadores",
    path: "/cargadores",
  });
}

export default async function ChargersPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ChargersPage.Hero.breadcrumb" });

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
      <section className="mt-28 pb-8 sm:mt-58 flex flex-col max-w-7xl mx-auto px-2 sm:px-0">
        <ChargersHero />
        <ChargersGrid />
        <div
          className="absolute inset-0 -z-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(64,64,64,0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(64,64,64,0.3) 1px, transparent 1px)


              
            `,
            backgroundSize: "60px 60px",
            maskImage: `
            radial-gradient(ellipse 80% 80% at 100% 0%, #000 20%, transparent 80%)
          `,
          }}
        />{" "}
        <FeaturesRayforce />
        {/* <HomeStandSection />
        <HomeBenefitsSection id="beneficios" /> */}
      </section>{" "}
      <Footer />
      <ScrollDepthTracker page="chargers" />
    </div>
  );
}
