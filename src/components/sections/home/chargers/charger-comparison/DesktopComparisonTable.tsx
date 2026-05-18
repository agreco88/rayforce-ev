// DesktopComparisonTable.tsx

"use client";

import { useTranslations } from "next-intl";

import HeaderLogo from "@/components/layout/header/header-logo";

import { renderFeatureValue } from "@/lib/formatFeatureValue";
import { Product } from "@/lib/types/product";

const VARIANT_THEME: Record<string, { price: string; check: string; highlight: string }> = {
  residencial: { price: "text-sky-400", check: "text-sky-400", highlight: "border-sky-900" },
  comercial: { price: "text-green-400", check: "text-green-400", highlight: "border-green-900" },
};

type Props = {
  product: Product;
};

export function DesktopComparisonTable({ product }: Props) {
  const t = useTranslations("HomePage.HomeChargersSection.ComparisonTable");

  return (
    <div className="hidden lg:block">
      <div
        className="
          grid grid-cols-[250px_repeat(2,1fr)]
          max-w-7xl mx-auto my-32
          overflow-hidden
          rounded-2xl
          border border-neutral-900

          divide-x divide-neutral-900
        "
      >
        {/* -------------------------------------------------------------- */}
        {/* Header                                                         */}
        {/* -------------------------------------------------------------- */}

        <div
          className="
            flex flex-col items-start justify-center gap-1

            border-r border-neutral-900

            bg-neutral-950
            p-8
          "
        >
          <HeaderLogo />
        </div>

        {product.variants.map((variant) => (
          <div
            key={variant.id}
            className={`
              flex flex-col gap-2 py-8 text-center shadow

              ${
                variant.highlight
                  ? `border-x ${VARIANT_THEME[variant.id]?.highlight ?? "border-green-900"} bg-neutral-900/40 shadow-inner shadow-neutral-950`
                  : ""
              }
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
                text-4xl
                font-thin
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

        {/* -------------------------------------------------------------- */}
        {/* Features                                                       */}
        {/* -------------------------------------------------------------- */}

        {/* Features */}
        {product.features.map((feature) => (
          <div
            key={feature.key}
            className="
      contents
    "
          >
            {/* Label */}
            <div
              className="
        border-t border-neutral-900

        p-4 pl-8

        text-sm
        text-neutral-400

        flex items-center
      "
            >
              {t(`features.${feature.key}`)}
            </div>

            {/* Values */}
            {product.variants.map((variant) => (
              <div
                key={variant.id + feature.key}
                className="
          flex items-center justify-center

          border-t border-neutral-900

          p-4

          text-center
        "
              >
                {renderFeatureValue(variant.values[feature.key], VARIANT_THEME[variant.id]?.check)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
