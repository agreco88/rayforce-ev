import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CablesShopGrid } from "@/components/pages/cables/CablesShopGrid";
import { CablesHero } from "@/components/pages/cables/CablesHero";
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
      <section className="mt-28 pb-8 sm:mt-58 flex flex-col w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 2xl:px-0">
        <CablesHero />
        <CablesShopGrid className="mt-16 lg:mt-0" />
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
      </section>{" "}
      <Footer />
      <ScrollDepthTracker page="cables" />
    </div>
  );
}
