import { ChargerStandSection } from "@/components/sections/ChargerStandSection";
import { ChargingSafetySection } from "@/components/sections/charging-safety-section/ChargingSafetySection";
import ContactFooter from "@/components/sections/contact-footer/Footer";
import { FaqSection } from "@/components/sections/faq-section/FaqSection";
import { Hero } from "@/components/sections/hero/Hero";
import { RayforceProductSection } from "@/components/sections/rayforce-product-section/RayforceProductSection";
import { RegulatorySection } from "@/components/sections/regulatory-section/RegulatoryBenefitsSection";
import { generateLocaleMetadata } from "@/lib/generate-locale-metadata";
import type { Metadata } from "next";

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
    <>
      <Hero />
      <ChargingSafetySection />
      <RayforceProductSection />
      <ChargerStandSection />
      <RegulatorySection />
      <FaqSection />
      <ContactFooter />
    </>
  );
}
