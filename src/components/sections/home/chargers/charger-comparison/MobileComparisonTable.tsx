"use client";

import { useTranslations } from "next-intl";

import type { Product } from "@/lib/types/product";

import { renderFeatureValue } from "@/lib/formatFeatureValue";

const VARIANT_THEME: Record<string, { price: string; check: string }> = {
  residencial: { price: "text-sky-400", check: "text-sky-400" },
  comercial: { price: "text-green-400", check: "text-green-400" },
};

type Props = {
  product: Product;
};

export function MobileComparisonTable({ product }: Props) {
  const t = useTranslations("HomePage.HomeChargersSection.ComparisonTable");

  const whatsappNumber = "59892041709";

  const message = encodeURIComponent(t("cta.message"));

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="lg:hidden">
      {/* Sticky header */}
      <div
        className="
          border border-neutral-800
          bg-neutral-950
        "
      >
        <div className="grid grid-cols-2 text-xs">
          {product.variants.map((variant) => (
            <div
              key={variant.id}
              className={`
                flex flex-col gap-2
                py-8
                text-center
                shadow

                ${variant.highlight ? "bg-neutral-900" : ""}
              `}
            >
              <span
                className="
                  font-light
                  uppercase
                  tracking-wide
                  text-white
                "
              >
                {variant.name}
              </span>

              <span
                className={`
                  text-xl
                  font-bold
                  tracking-tighter
                  ${VARIANT_THEME[variant.id]?.price ?? "text-green-400"}
                `}
              >
                USD {variant.price}
              </span>

              <span
                className="
                  text-[11px]
                  font-thin
                  text-neutral-400
                "
              >
                {t("taxLabel")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="overflow-hidden rounded-b-xl border-neutral-800">
        {product.features.map((feature, i) => (
          <div
            key={feature.key}
            className={i === 0 ? "pb-3 pt-6" : "pt-6 sm:pb-3"}
          >
            {/* Label */}
            <div
              className="
                pb-3
                text-center
                text-xs
                uppercase
                tracking-widest
                text-neutral-400
              "
            >
              {t(`features.${feature.key}`)}
            </div>

            {/* Values */}
            <div className="grid grid-cols-2">
              {product.variants.map((variant) => (
                <div
                  key={`${variant.id}-${feature.key}`}
                  className="
                    flex items-center justify-center
                    border border-neutral-800
                    p-4
                    text-center
                  "
                >
                  {renderFeatureValue(
                    variant.values[feature.key],
                    VARIANT_THEME[variant.id]?.check,
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
