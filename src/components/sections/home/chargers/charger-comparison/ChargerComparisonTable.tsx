import { Product } from "@/lib/types/product";
import { DesktopComparisonTable } from "./DesktopComparisonTable";
import { MobileComparisonTable } from "./MobileComparisonTable";

type Props = {
  product: Product;
};

export function ChargerComparisonTable({ product }: Props) {
  return (
    <section className="relative w-full container max-w-[1440px] sm:my-24 mx-auto">
      <MobileComparisonTable product={product} />
      <DesktopComparisonTable product={product} />
    </section>
  );
}
