"use client";

import { useLocale, useTranslations } from "next-intl";

import {
  getPowerLabel,
  getProductImageScaleStyle,
} from "@/lib/catalog/catalog.helpers";
import type { ChargerProduct } from "@/lib/catalog/catalog.types";
import type { ProductCardData } from "../types";

/**
 * Traduce un cargador del catalogo a los datos de `ProductCard`. Llena todos
 * los campos, asi sirve para cualquier variante:
 *
 *   const toCard = useChargerCardData();
 *   <ProductCollection items={getChargerProducts().map(toCard)} variant="horizontal-3" />
 */
export function useChargerCardData() {
  const t = useTranslations("HomePage.HomeChargersSection");
  const tSpecs = useTranslations("Common.Specs");
  const locale = useLocale();

  return (product: ChargerProduct): ProductCardData => {
    const power = getPowerLabel(product, locale);

    return {
      id: product.slug,
      href: `/cargadores/${product.slug}`,
      title: t(`chargers.${product.slug}.shortTitle`),
      fullTitle: t(`chargers.${product.slug}.title`),
      titleAccent: power,
      image: product.cardImage,
      imageStyle: getProductImageScaleStyle(product),
      specs: [
        { label: tSpecs("power"), value: power },
        tSpecs(`phase.${product.specs.phaseType}`),
        // El titulo corto ya dice "con cable integrado / externo"; el aviso
        // queda solo para el de toma, que es el que sorprende.
        ...(product.specs.cableType === "socket"
          ? [tSpecs("cable.notIncluded")]
          : []),
      ],
      description: t(`chargers.${product.slug}.blurb`),
      features: [
        tSpecs(
          product.specs.cableType === "socket"
            ? "cable.socket"
            : "cable.integrated",
        ),
        tSpecs(`phase.${product.specs.phaseType}`),
        tSpecs("connector.type2"),
        ...(product.specs.voltage ? [product.specs.voltage] : []),
        tSpecs(`tier.${product.tier}`),
      ],
      price: product.price,
      theme: product.theme,
      highlight: product.highlight,
    };
  };
}
