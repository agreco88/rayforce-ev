import { useLocale, useTranslations } from "next-intl";
import { formatPowerKw } from "@/lib/catalog/catalog.helpers";
import type { ChargerProduct } from "@/lib/catalog/catalog.types";

/** El modelo en el breadcrumb: "7,2 kW monofásico con toma". Potencia, fase y
 *  cable o toma son lo minimo que distingue a los cuatro. */
export function useChargerCrumbLabel() {
  const t = useTranslations("ChargerModelPage.breadcrumb");
  const locale = useLocale();

  return (product: ChargerProduct) =>
    t("model", {
      power: formatPowerKw(product.specs.maxPowerKw, locale),
      phase: product.specs.phaseType,
      cable: product.specs.cableType,
    });
}
