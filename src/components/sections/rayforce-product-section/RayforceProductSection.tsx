"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useTranslations } from "next-intl";

import { RayforceProductSectionMobile } from "./RayforceProductSectionMobile";
import { ChargerShowcase } from "../../ChargerShowcase";
import { ComparisonTable } from "../../ComparisonTable";
import { Comparison } from "./Comparison";
import { chargerProduct } from "@/lib/data/product-data";

export function RayforceProductSection({ id }: { id?: string }) {
  const isMobile = useIsMobile();
  const t = useTranslations("HomePage.RayforceProductSection");

  // Avoid rendering anything until we know

  return (
    <section
      id={id}
      className="relative bg-linear-to-b from-neutral-950 to-neutral-900 text-white pt-38 pb-24 flex flex-col"
    >
      {/* Conditional rendering */}
      {isMobile ? (
        <div className="block md:hidden">
          <RayforceProductSectionMobile />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-32">
          {/* Header */}
          {/* <div className="mx-auto max-w-7xl px-6 text-center mt-10 sm:mt-20 xl:mt-40">
            <h2 className="text-4xl font-medium tracking-tight sm:text-5xl bg-linear-to-b pb-2 from-neutral-100 to-neutral-300 bg-clip-text text-transparent">
              {t("header.title")}
          </h2>
            <p className="mx-auto mt-4 max-w-md text-gray-400">
              {t("header.description")}
            </p>
          </div> */}
          <ChargerShowcase /> <Comparison product={chargerProduct} />
          {/* 
          <div className="border-t border-neutral-800 bg-neutral-950">
            <ComparisonTable />
          </div> */}
        </div>
      )}
    </section>
  );
}
