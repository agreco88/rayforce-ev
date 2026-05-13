"use client";

import { useIsMobile } from "@/hooks/useIsMobile";

import { GridBackground } from "@/components/shared/backgrounds/GridBackground";

import { HomeBenefitsDesktop } from "./HomeBenefitsDesktop";
import { HomeBenefitsMobile } from "./HomeBenefitsMobile";

type Props = {
  id?: string;
};

export function HomeBenefitsSection({ id }: Props) {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return null;
  }

  return (
    <section
      id={id}
      className="
        relative
        overflow-hidden
      "
    >
      {/* Shared Grid */}
      <GridBackground cellSize={24} lineOpacity={0.1} />

      {/* Divider */}
      <div
        className="
          relative z-10

          mb-32
          h-[2px]
          w-full

          animate-pulse

          bg-gradient-to-r
          from-transparent
          via-green-950
          to-transparent
        "
      />

      {/* Content */}
      <div className="relative z-10">
        {isMobile ? <HomeBenefitsMobile /> : <HomeBenefitsDesktop />}
      </div>
    </section>
  );
}
