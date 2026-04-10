// ComparisonCards.tsx

"use client";

import { renderFeatureValue } from "@/lib/formatFeatureValue";
import { ChargerFeatureKey, Product } from "@/lib/types/product";
import { motion } from "framer-motion";

type Props = {
  product: Product;
  highlightFeatures: ChargerFeatureKey[];
};

export function ComparisonCards({ product, highlightFeatures }: Props) {
  return (
    <div className="flex flex-col gap-6 lg:hidden">
      {product.variants.map((variant) => (
        <motion.div
          key={variant.id}
          className={`
            rounded-2xl border border-neutral-800
            p-6 bg-neutral-950
            ${variant.highlight ? "border-cyan-400/40" : ""}
          `}
        >
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white">{variant.name}</h3>
            <p className="text-2xl text-white mt-1">U$S {variant.price}</p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-3">
            {highlightFeatures.map((key) => (
              <div key={key} className="flex items-center gap-2">
                {renderFeatureValue(variant.values[key])}
                <span className="text-xs text-neutral-400">
                  {product.features.find((f) => f.key === key)?.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button className="mt-6 w-full py-3 rounded-md bg-green-600 text-white">
            Quiero este modelo
          </button>
        </motion.div>
      ))}
    </div>
  );
}
