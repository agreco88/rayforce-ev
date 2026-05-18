import type { Metadata } from "next";
import ChargersGrid from "@/components/pages/chargers/ChargersGrid";
import { ChargersHero } from "@/components/pages/chargers/ChargersHero";
import { Footer } from "@/components/sections/contact-footer/Footer";
import { FeaturesRayforce } from "@/components/sections/home/FeaturesSection";
import { generateLocaleMetadata } from "@/lib/generate-locale-metadata";
import { HomeStandSection } from "@/components/sections/home/stand/HomeStandSection";
import { HomeBenefitsSection } from "@/components/sections/home/benefits/HomeBenefitsSection";
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return generateLocaleMetadata({
    locale,
    route: "cargadores",
    path: "/cargadores",
  });
}

export default function ChargersPage() {
  return (
    <div className="bg-neutral-950 flex justify-center">
      <section className="mt-40 pb-8 sm:mt-58 flex flex-col max-w-7xl px-2 sm:px-0">
        <ChargersHero />
        <ChargersGrid />
        <div
          className="absolute inset-0 -z-0 pointer-events-none opacity-80"
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
        <HomeStandSection />
        <HomeBenefitsSection id="beneficios" /> <Footer />
      </section>{" "}
    </div>
  );
}
