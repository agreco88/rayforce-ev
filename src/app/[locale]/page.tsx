import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { generateLocaleMetadata } from "@/lib/generate-locale-metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { HomeHeroSection } from "@/components/sections/home/hero/HomeHeroSection";
import HashScrollOnMount from "@/components/HashScrollOnMount";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";

const HomeCostSection = dynamic(() =>
  import("@/components/sections/home/cost/HomeCostSection").then((m) => ({
    default: m.HomeCostSection,
  })),
);

const HomeChargersSection = dynamic(() =>
  import("@/components/sections/home/chargers/HomeChargersComparison").then(
    (m) => ({ default: m.HomeChargersSection }),
  ),
);

const HomeBenefitsSection = dynamic(() =>
  import("@/components/sections/home/benefits/HomeBenefitsSection").then(
    (m) => ({ default: m.HomeBenefitsSection }),
  ),
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
        <HomeCostSection />
        <HomeChargersSection id="cargadores" />

        <HomeStandSection id="columna" />
        <InstallationSection id="instalacion" />
        <CompatibilitySection id="compatibilidad" />
        <HomeFaqSection id="faq" />
        <HomeBenefitsSection id="beneficios" />
        <Footer />
      </Suspense>
      <ScrollDepthTracker page="home" />
    </main>
  );
}
