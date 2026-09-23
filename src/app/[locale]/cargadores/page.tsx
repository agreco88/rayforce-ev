import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ChargersHero } from "@/components/pages/chargers/ChargersHero";
import { ChargersLineupGuideSection } from "@/components/pages/chargers/ChargersLineupGuideSection";
import { ChargersFaqSection } from "@/components/pages/chargers/ChargersFaqSection";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { Footer } from "@/components/sections/contact-footer/Footer";
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
      <section className="mt-28 pb-8 sm:mt-58 flex flex-col w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-16 2xl:px-0">
        <ChargersHero />
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
        />
        <ChargersCardGrid className="mt-16 lg:mt-0 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" />
      </section>

      <ChargersCommonStats />
      <ChargersLineupGuideSection />
      <ChargersFaqSection />

      <Footer />
      <ScrollDepthTracker page="chargers" />
    </div>
  );
}
