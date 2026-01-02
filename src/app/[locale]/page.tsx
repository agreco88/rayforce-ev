import GradientBlinds from "@/components/GradientBlinds";
import ContactFooter from "@/components/sections/contact-footer/Footer";
import { EditorialValueSection } from "@/components/sections/EditorialValueSection";
import DefaultHero from "@/components/sections/hero";
import MostSoldSection from "@/components/sections/most-sold-section/MostSoldSection";
import ProductsSection from "@/components/sections/products-section/ProductsSection";
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
      <ProductsSection />
      <MostSoldSection />
      <EditorialValueSection />
      <ContactFooter />
    </>
  );
}
