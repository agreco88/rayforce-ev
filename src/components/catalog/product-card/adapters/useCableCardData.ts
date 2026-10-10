"use client";

import { useLocale, useTranslations } from "next-intl";

import {
  getCatalogPowerLabel,
  getProductImageScaleStyle,
} from "@/lib/catalog/catalog.helpers";
import type { CableProduct } from "@/lib/catalog/catalog.types";
import type { ProductCardData } from "../types";

/**
 * Traduce un cable del catalogo a los datos de `ProductCard`, como
 * `useChargerCardData`:
 *
 *   const toCard = useCableCardData();
 *   <ProductCollection items={getCableProducts().map(toCard)} variant="vertical-1" />
 */
export function useCableCardData() {
  const t = useTranslations("AccessoriesPage.ProductCard");
  const tSpecs = useTranslations("Common.Specs");
  const tCard = useTranslations("Common.ProductCard");
  const locale = useLocale();

  return (product: CableProduct): ProductCardData => {
    const power = getCatalogPowerLabel(product, locale);
    const powerKw = product.specs.maxPowerKw ?? 7;

    return {
      id: product.slug,
      href: `/accesorios/${product.slug}`,
      title: t(`variants.${product.slug}.label`),
      // Tipo + potencia + fase: lo que distingue a los dos de 7kW entre si.
      fullTitle: t(
        `type.${product.specs.cableStyle}.${product.specs.phaseType ?? "single"}`,
        { power: powerKw },
      ),
      titleAccent: power,
      // En los cables el `heroImage` ya es la foto recortada.
      image: product.heroImage,
      // Los cables llenan la plancha de lado a lado; con aire se leen al
      // tamaño de los cargadores. En % y no fijo: el `p-10` de la plancha
      // grande dejaba el cable diminuto en la foto de 128px de las filas.
      imageClassName: "object-contain p-[12%]",
      imageStyle: getProductImageScaleStyle(product),
      specs: [{ label: tSpecs("power"), value: power }],
      description: t(`variants.${product.slug}.description`),
      features: [
        t("features.length", { length: product.specs.lengthM }),
        t("features.current", { current: product.specs.maxCurrentA ?? 32 }),
        ...(product.specs.temperatureSensor
          ? [t("features.temperatureSensor")]
          : []),
        t("features.delivery", { power: powerKw }),
      ],
      price: { ...product.price, taxLabel: tCard("taxLabel") },
      theme: product.theme,
      highlight: product.highlight,
    };
  };
}
