// ComparisonTable.tsx

"use client";

import HeaderLogo from "@/components/layout/header/header-logo";
import { renderFeatureValue } from "@/lib/formatFeatureValue";
import { Product } from "@/lib/types/product";

type Props = {
  product: Product;
};

export function ComparisonTable({ product }: Props) {
  return (
    <div className="hidden lg:block">
      <div className="grid grid-cols-[250px_repeat(3,1fr)] border border-neutral-800 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-neutral-950 p-8 flex flex-col items-start gap-1 justify-center">
          <HeaderLogo />
          <span className="text-xs pl-1 italic tracking-wide text-neutral-400">
            Espeficicaciones tecnicas
          </span>
        </div>
        {product.variants.map((variant) => (
          <div
            key={variant.id}
            className={`
              p-6 text-center border-l border-neutral-800
              ${variant.highlight ? "bg-neutral-900" : "bg-neutral-950"}
            `}
          >
            <h3 className="text-white font-semibold">{variant.name}</h3>
            <p className="text-xl mt-2">U$S {variant.price}</p>
          </div>
        ))}

        {/* Features */}
        {product.features.map((feature) => (
          <>
            {/* Label */}
            <div
              key={feature.key}
              className="p-4 pl-8 text-sm text-neutral-400 border-t border-neutral-800"
            >
              {feature.label}
            </div>

            {/* Values */}
            {product.variants.map((variant) => (
              <div
                key={variant.id + feature.key}
                className="p-4 flex justify-center items-center border-t border-l border-neutral-800"
              >
                {renderFeatureValue(variant.values[feature.key])}
              </div>
            ))}
          </>
        ))}
      </div>
    </div>
  );
}
