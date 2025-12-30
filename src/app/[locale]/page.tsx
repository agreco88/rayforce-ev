import ContactFooter from "@/components/sections/contact-footer/Footer";
import DefaultHero from "@/components/sections/hero";
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
      <ContactFooter />
    </>
  );
}
