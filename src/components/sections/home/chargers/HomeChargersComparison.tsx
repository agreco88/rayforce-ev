import { ChargersCarousel } from "./ChargersCarousel";
import { ComparisonTable } from "./charger-comparison/ComparisonTable";
import { getChargerProducts } from "@/lib/catalog/catalog.helpers";

type Props = {
  id?: string;
};

export function HomeChargersSection({ id }: Props) {
  const products = getChargerProducts();

  return (
    <div id={id}>
      <ChargersCarousel />
      <ComparisonTable products={products} />
    </div>
  );
}
