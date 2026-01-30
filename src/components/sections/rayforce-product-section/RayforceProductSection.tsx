"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { useTranslations } from "next-intl";

import { RayforceProductSectionMobile } from "./RayforceProductSectionMobile";
import { ChargerShowcase } from "../ChargerSwocase";
import { ComparisonTable } from "../ComparisonTable";

export function RayforceProductSection() {
  const isMobile = useIsMobile();
  const t = useTranslations("HomePage.RayforceProductSection");

  // Avoid rendering anything until we know
  if (isMobile === null) return null;

  return (
    <section
      id="productos"
      className="relative bg-linear-to-b from-neutral-950 to-neutral-900 text-white py-24 sm:pt-24 sm:pb-0 flex flex-col gap-32"
    >
      {/* Conditional rendering */}
      {isMobile ? (
        <RayforceProductSectionMobile />
      ) : (
        <>
          {/* Header */}
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-4xl font-medium tracking-tight sm:text-5xl bg-linear-to-b pb-2 from-neutral-100 to-neutral-300 bg-clip-text text-transparent">
              {t("header.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              {t("header.description")}
            </p>
          </div>

          <ChargerShowcase />

          <div className="border-t border-neutral-800 bg-neutral-950">
            <ComparisonTable />
          </div>
        </>
      )}
    </section>
  );
}
