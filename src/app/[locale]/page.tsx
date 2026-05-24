import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { generateLocaleMetadata } from "@/lib/generate-locale-metadata";
import { HomeHeroSection } from "@/components/sections/home/hero/HomeHeroSection";
import HashScrollOnMount from "@/components/HashScrollOnMount";
import { FooterCTA } from "@/components/sections/contact-footer/FooterCTA";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return generateLocaleMetadata({
    locale,
    route: "home",
    path: "/",
  });
}

export default function HomePage() {
  return (
    <main className="bg-neutral-950">
      <HashScrollOnMount />
      <HomeHeroSection id="inicio" />
      <Suspense fallback={null}>
        <HomeChargersSection id="cargadores" />
        <FooterCTA />
        <HomeStandSection id="columna" />
        <InstallationSection />
        <CompatibilitySection id="compatibilidad" />
        <HomeBenefitsSection id="beneficios" />
        <HomeFaqSection id="faq" />
        <Footer />
      </Suspense>
      <ScrollDepthTracker page="home" />
    </main>
  );
}
