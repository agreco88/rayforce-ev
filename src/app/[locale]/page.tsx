import type { Metadata } from "next";
import { generateLocaleMetadata } from "@/lib/generate-locale-metadata";
import { CompatibilitySection } from "@/components/pages/shared/CompatibilitySection";
import { HomeHeroSection } from "@/components/sections/home/hero/HomeHeroSection";
import { HomeChargersSection } from "@/components/sections/home/chargers/HomeChargersComparison";
import { HomeBenefitsSection } from "@/components/sections/home/benefits/HomeBenefitsSection";
import { HomeStandSection } from "@/components/sections/home/stand/HomeStandSection";
import { HomeFaqSection } from "@/components/sections/home/faq/HomeFaqSection";
import { Footer } from "@/components/sections/contact-footer/Footer";

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
      <HomeHeroSection id="inicio" />
      <HomeChargersSection id="cargadores" />
      <HomeBenefitsSection id="beneficios" />
      <HomeStandSection id="columna" />
      <HomeFaqSection id="faq" />
      <CompatibilitySection id="compatibilidad" />
      <Footer />
    </main>
  );
}
