import ChargersGrid from "@/components/pages/chargers/ChargersGrid";
import { ChargersHero } from "@/components/pages/chargers/ChargersHero";
import { Footer } from "@/components/sections/contact-footer/Footer";
import { FeaturesRayforce } from "@/components/sections/home/FeaturesSection";

import { getChargerFamilies } from "@/lib/chargers/chargers.helpers";

export default function ChargersPage() {
  const families = getChargerFamilies();
  const variants = families.flatMap((f) => f.variants);

  return (
    <div className="bg-neutral-950 flex justify-center">
      <section className="mt-40 pb-8 sm:mt-58 flex flex-col max-w-[1440px] px-2 sm:px-0">
        <ChargersHero variants={variants} />
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
        <Footer />
      </section>{" "}
    </div>
  );
}
