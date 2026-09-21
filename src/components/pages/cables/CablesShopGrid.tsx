"use client";

import { motion } from "motion/react";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { cn } from "@/lib/utils";
import { getCableProducts } from "@/lib/catalog/catalog.helpers";
import { CableShopCard } from "./CableShopCard";

type Props = {
  className?: string;
};

export function CablesShopGrid({ className }: Props) {
  const products = getCableProducts();

  return (
    <motion.ul
      variants={waterfallList}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {products.map((product) => (
        <motion.li key={product.slug} variants={waterfallItem} className="h-full">
          <CableShopCard product={product} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
