"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import {
  ProductCard,
  type ProductCardVariant,
  type ResponsiveVariant,
} from "@/components/catalog/product-card/ProductCard";
import { useChargerCardData } from "@/components/catalog/product-card/adapters/useChargerCardData";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { getChargerProducts } from "@/lib/catalog/catalog.helpers";

type Props = {
  className?: string;
  /** Slug a dejar afuera — la pagina de modelo no se lista a si misma. */
  excludeSlug?: string;
  variant?: ProductCardVariant | ResponsiveVariant;
};

/** Grilla de cargadores, `vertical-2` por defecto, de la home y /cargadores.
 * Mapea a mano y no con `ProductCollection` porque cada card entra en cascada. */
export function ChargersCardGrid({
  className,
  excludeSlug,
  variant = "vertical-2",
}: Props) {
  const t = useTranslations("Common.ProductCard");
  const toCard = useChargerCardData();
  const cards = getChargerProducts()
    .filter((product) => product.slug !== excludeSlug)
    .map(toCard);

  return (
    <motion.div
      variants={waterfallList}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={
        className ?? "mx-auto grid max-w-[1600px] grid-cols-4 gap-6 px-4"
      }
    >
      {cards.map((card) => (
        // `h-full` para que el `h-full` de la card resuelva contra la fila:
        // sin esto el borde del destacado queda mas abajo que los vecinos.
        <motion.div key={card.id} variants={waterfallItem} className="h-full">
          <ProductCard
            {...card}
            variant={variant}
            ariaLabel={`${card.fullTitle} ${card.titleAccent} — ${t("cta")}`}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
