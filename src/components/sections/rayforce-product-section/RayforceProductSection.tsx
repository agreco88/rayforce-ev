"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { Comparison } from "./Comparison";
import { chargerProduct } from "@/lib/data/product-data";
import { ChargerShowcase } from "../../ChargerShowcase";
import { RayforceProductSectionMobile } from "./RayforceProductSectionMobile";

export function RayforceProductSection({ id }: { id?: string }) {
  const isMobile = useIsMobile();

  return (
    <section
      id={id}
      className="relative bg-linear-to-b from-neutral-950 to-neutral-900 text-white pt-0 sm:pt-38 sm:pb-24 flex flex-col"
    >
      {/* Conditional rendering */}
      {isMobile ? (
        <div className="block md:hidden">
          <RayforceProductSectionMobile />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-32">
          <ChargerShowcase />
          <Comparison product={chargerProduct} />
        </div>
      )}
    </section>
  );
}
