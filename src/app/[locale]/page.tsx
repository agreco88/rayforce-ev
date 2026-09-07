import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { generateLocaleMetadata } from "@/lib/generate-locale-metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { HomeHeroSection } from "@/components/sections/home/hero/HomeHeroSection";
import HashScrollOnMount from "@/components/HashScrollOnMount";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";

const WhatIsWallboxSection = dynamic(() =>
  import("@/components/sections/home/wallbox-intro/WhatIsWallboxSection").then(
    (m) => ({ default: m.WhatIsWallboxSection }),
  ),
);

const HomeChargersSection = dynamic(() =>
  import("@/components/sections/home/chargers/HomeChargersComparison").then(
    (m) => ({ default: m.HomeChargersSection }),
  ),
);

const PublicChargingCableSection = dynamic(() =>
  import(
    "@/components/sections/home/public-charging/PublicChargingCableSection"
  ).then((m) => ({ default: m.PublicChargingCableSection })),
);

const HomeBenefitsSection = dynamic(() =>
  import("@/components/sections/home/benefits/HomeBenefitsSection").then(
    (m) => ({ default: m.HomeBenefitsSection }),
  ),
);

const ChargerGallery = dynamic(() =>
  import("@/components/sections/home/gallery/ChargerGallery").then((m) => ({
    default: m.ChargerGallery,
  })),
);

const HomeStandSection = dynamic(() =>
  import("@/components/sections/home/stand/HomeStandSection").then((m) => ({
    default: m.HomeStandSection,
  })),
);

const InstallationSection = dynamic(() =>
  import("@/components/sections/home/installation/InstallationSection").then(
    (m) => ({ default: m.InstallationSection }),
  ),
);

const HomeFaqSection = dynamic(() =>
  import("@/components/sections/home/faq/HomeFaqSection").then((m) => ({
    default: m.HomeFaqSection,
  })),
);

const CompatibilitySection = dynamic(() =>
  import("@/components/pages/shared/CompatibilitySection").then((m) => ({
    default: m.CompatibilitySection,
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
  const t = await getTranslations({ locale, namespace: "HomePage.FaqSection" });
  const groups = t.raw("groups") as Record<string, { title: string; answer: string }[]>;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: Object.values(groups)
      .flat()
      .map((item) => ({
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
        <WhatIsWallboxSection id="que-es-un-wallbox" />
        <HomeChargersSection id="cargadores" />
        <ChargerGallery id="galeria" />

        <PublicChargingCableSection id="cables-carga-publica" />
        <HomeStandSection id="columna" />
        <InstallationSection id="instalacion" />
        <HomeFaqSection id="faq" />
        <HomeBenefitsSection id="beneficios" />
        <CompatibilitySection id="compatibilidad" />
        <Footer />
      </Suspense>
      <ScrollDepthTracker page="home" />
    </main>
  );
}
