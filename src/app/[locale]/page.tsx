import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-cta-section";
import DefaultHero from "@/components/sections/hero";
import StatsSection from "@/components/sections/stats-section";
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
      <DefaultHero />
      <AboutSection />
      <StatsSection />
      <ContactSection />
    </>
  );
}
