"use client";

import { CardCarousel } from "@/components/shared/carousel/CardCarousel";
import {
  ProductCard,
  type ProductCardVariant,
  type ResponsiveVariant,
} from "./ProductCard";
import type { ProductCardData } from "./types";

export type ProductCollectionDisplay = "list" | "grid" | "carousel";

type Props = {
  items: ProductCardData[];
  variant: ProductCardVariant | ResponsiveVariant;
  /** Por defecto sale de la variante (la de `base` si es por breakpoint):
   * `horizontal-*` en lista, `vertical-*` en grilla. `carousel` sirve para
   * cualquiera. */
  display?: ProductCollectionDisplay;
  /** `true`: gradiente en todas. Por defecto solo el destacado. */
  gradient?: boolean;
  className?: string;
};

/**
 * Varios productos con la misma card. Es la forma de mostrar productos en
 * cualquier pagina:
 *
 *   <ProductCollection items={chargers} variant="horizontal-3" />
 *   <ProductCollection items={chargers} variant="vertical-1" />
 *   <ProductCollection items={chargers} variant="horizontal-3" display="carousel" />
 *   <ProductCollection items={chargers} variant="horizontal-3" gradient />
 */
export function ProductCollection({
  items,
  variant,
  display,
  gradient,
  className = "",
}: Props) {
  const isVertical = (
    typeof variant === "string" ? variant : variant.base
  ).startsWith("vertical");
  display ??= isVertical ? "grid" : "list";

  const cards = items.map((item) => (
    <ProductCard
      key={item.id}
      variant={variant}
      gradient={gradient}
      {...item}
    />
  ));

  if (display === "carousel") {
    return (
      <div className={className}>
        <CardCarousel
          items={cards.map((card) => (
            // El carousel no le da ancho a los items: lo pone cada uno. El
            // `pt-3` deja lugar al badge, que sobresale del borde de arriba.
            <div
              key={card.key}
              className={`pt-3 ${isVertical ? "w-[60vw]" : "w-[85vw]"}`}
            >
              {card}
            </div>
          ))}
        />
      </div>
    );
  }

  return (
    <div
      className={`${
        display === "grid"
          ? "grid grid-cols-2 gap-4"
          : // `gap-6` y no menos: el badge del destacado sobresale del borde.
            "flex flex-col gap-6"
      } ${className}`}
    >
      {cards}
    </div>
  );
}
