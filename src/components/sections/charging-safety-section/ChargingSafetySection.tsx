"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import { ChargingSafetyMobile } from "./ChargingSafetyMobile";
import { ChargingSafetyDesktop } from "./ChargingSafetyDesktop";

export function ChargingSafetySection() {
  const isMobile = useIsMobile();

  // Avoid rendering until we know
  if (isMobile === null) return null;

  return isMobile ? <ChargingSafetyMobile /> : <ChargingSafetyDesktop />;
}
