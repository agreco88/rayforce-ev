"use client";

import HomeChargersDesktop from "./HomeChargersDesktop";
import { useIsMobile } from "@/hooks/useIsMobile";
import { chargerProduct } from "@/lib/data/product-data";
import { HomeChargersMobile } from "./HomeChargersMobile";
import { MobileComparisonTable } from "./charger-comparison/MobileComparisonTable";
import { DesktopComparisonTable } from "./charger-comparison/DesktopComparisonTable";

type Props = {
  id?: string;
};

export function HomeChargersSection({ id }: Props) {
  const isMobile = useIsMobile();

  if (isMobile === null) {
    return null;
  }

  return isMobile ? (
    <>
      <HomeChargersMobile id={id} />
      <MobileComparisonTable product={chargerProduct} />
    </>
  ) : (
    <>
      <HomeChargersDesktop id={id} />
      <DesktopComparisonTable product={chargerProduct} />
    </>
  );
}
