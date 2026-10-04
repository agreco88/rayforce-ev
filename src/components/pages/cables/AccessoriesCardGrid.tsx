"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { ProductCard } from "@/components/catalog/product-card/ProductCard";
import { useCableCardData } from "@/components/catalog/product-card/adapters/useCableCardData";
import { useStandCardData } from "@/components/catalog/product-card/adapters/useStandCardData";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { getCableProducts } from "@/lib/catalog/catalog.helpers";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Slug a dejar afuera — la pagina de modelo no se lista a si misma. */
  excludeSlug?: string;
};

/** Grilla de accesorios (los cables y la columna) en `vertical-2`, igual que
 * `ChargersCardGrid`: mapea a mano porque cada card entra en cascada. */
export function AccessoriesCardGrid({ className, excludeSlug }: Props) {
  const t = useTranslations("Common.ProductCard");
  const toCableCard = useCableCardData();
  const column = useStandCardData();
  const cards = [...getCableProducts().map(toCableCard), column].filter(
    (card) => card.id !== excludeSlug,
  );

  return (
    <motion.div
      variants={waterfallList}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={cn("grid grid-cols-1 gap-6", className)}
    >
      {cards.map((card) => (
        // `h-full`, como en cargadores: alinea el borde del destacado con la fila.
        <motion.div key={card.id} variants={waterfallItem} className="h-full">
          <ProductCard
            {...card}
            variant="vertical-2"
            ariaLabel={`${card.fullTitle} ${card.titleAccent} — ${t("cta")}`}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
