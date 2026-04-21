import { Product } from "@/lib/types/product";
import { ComparisonCards } from "./ComparisonCard";
import { ComparisonTable } from "./ComparisonTable";
import { MobileComparisonTable } from "./MobileComparisonTable";

type Props = {
  product: Product;
};

export function Comparison({ product }: Props) {
  return (
    <section className="relative w-full container max-w-[1400px] mx-auto mb-24">
      <MobileComparisonTable product={product} />
      <ComparisonTable product={product} />
    </section>
  );
}
