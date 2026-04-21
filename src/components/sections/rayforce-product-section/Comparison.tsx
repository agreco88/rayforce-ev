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
      {/* Mobile table (NEW) */}
      <MobileComparisonTable product={product} />
      {/* Mobile cards */}
      {/* <ComparisonCards
        product={product}
        highlightFeatures={["power", "phase", "app", "connectivity"]}
      /> */}
      {/* Desktop table */}
      <ComparisonTable product={product} />
    </section>
  );
}
