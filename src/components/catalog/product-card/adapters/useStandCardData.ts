"use client";

import { useTranslations } from "next-intl";

import { CABLE_THEME } from "@/lib/catalog/cables.catalog";
import { CHARGER_COLUMN_PRICE_USD } from "@/lib/catalog/chargers.catalog";
import type { ProductCardData } from "../types";

/**
 * La columna como `ProductCardData`. No es un producto del catalogo (es un
 * solo modelo, sin variantes), asi que no recibe nada: devuelve la card lista.
 *
 *   const column = useStandCardData();
 *   <ProductCard {...column} variant="vertical-2" />
 */
export function useStandCardData(): ProductCardData {
  const t = useTranslations("AccessoriesPage.ProductCard.column");
  // La descripcion, la altura y la lista son las de la seccion de la columna:
  // la card resume esa pagina y no tiene que decir otra cosa.
  const tStand = useTranslations("HomePage.HomeStandSection");

  return {
    id: "columna-para-cargador",
    href: "/accesorios/columna-para-cargador",
    title: t("title"),
    fullTitle: t("fullTitle"),
    titleAccent: tStand("dimensions.height.value"),
    image: "/assets/images/column/wallbox-on-column.webp",
    // Es una foto muy alta: en `contain` toca arriba y abajo, y el zoom del
    // hover le cortaria el cargador.
    imageClassName: "object-contain py-8",
    specs: [
      {
        label: tStand("dimensions.height.label"),
        value: tStand("dimensions.height.value"),
      },
    ],
    description: tStand("description"),
    features: tStand.raw("pricingPanel.features.column") as string[],
    price: { currency: "USD", amount: CHARGER_COLUMN_PRICE_USD, taxLabel: "IVA Inc." },
    // El ambar de los accesorios: en el listado y en el panel del header va
    // al lado de los cables, y un color propio la haria parecer de otra linea.
    theme: CABLE_THEME,
  };
}
