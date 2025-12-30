"use client";

import { useTranslations } from "next-intl";
import ProductCard from "./ProductCard";
import { PRODUCTS } from "@/lib/products-data";

export function ProductsGrid() {
  const t = useTranslations("ProductsSection");

  return (
    <div id="products" className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
    </div>
  );
}
