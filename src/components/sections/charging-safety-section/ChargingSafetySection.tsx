"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { ChargingSafetyMobile } from "./ChargingSafetyMobile";
import { ChargingSafetyDesktop } from "./ChargingSafetyDesktop";

export function ChargingSafetySection({ id }: { id?: string }) {
  const isMobile = useIsMobile();

  return (
    <section id={id} className="border-b border-neutral-950">
      {isMobile === null ? null : isMobile ? (
        <ChargingSafetyMobile />
      ) : (
        <ChargingSafetyDesktop />
      )}
    </section>
  );
}
