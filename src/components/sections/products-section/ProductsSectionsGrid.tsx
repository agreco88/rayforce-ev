"use client";

import { useTranslations } from "next-intl";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "@/lib/products-data";
import { waterfallList } from "@/lib/animation-variants";
import { motion } from "framer-motion";

export default function ProductsSectionGrid() {
  const t = useTranslations("ProductsSection");

  return (
    <motion.div
      id="products"
      className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2"
      variants={waterfallList}
    >
      {PRODUCTS.map((product) => (
        <ProductCard
          key={product.key}
          href={product.href}
          posterSrc={product.posterSrc}
          videoSrc={product.videoSrc}
          isMirrored={product.mirror}
          label={t(`products.${product.key}.label`)}
          description={t(`products.${product.key}.description`)}
          cta={t(`products.${product.key}.cta`)}
        />
      ))}
    </motion.div>
  );
}
