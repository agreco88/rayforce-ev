import HomeChargersDesktop from "./HomeChargersDesktop";
import { chargerProduct } from "@/lib/data/product-data";
import { HomeChargersMobile } from "./HomeChargersMobile";
import { MobileComparisonTable } from "./charger-comparison/MobileComparisonTable";
import { DesktopComparisonTable } from "./charger-comparison/DesktopComparisonTable";

type Props = {
  id?: string;
};

export function HomeChargersSection({ id }: Props) {
  return (
    <div id={id}>
      <div className="hidden lg:block">
        <HomeChargersDesktop id={id} />
        <DesktopComparisonTable product={chargerProduct} />
      </div>
      <div className="lg:hidden">
        <HomeChargersMobile id={id} />
        <MobileComparisonTable product={chargerProduct} />
      </div>
    </div>
  );
}
