import ContactFooter from "@/components/sections/contact-footer/Footer";
import { EditorialValueSection } from "@/components/sections/EditorialValueSection";
import { Hero } from "@/components/sections/hero";
import { RayforceProductSection } from "@/components/sections/RayforceProductSection";
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
      <RayforceProductSection />
      <EditorialValueSection />
      <ContactFooter />
    </>
  );
}
