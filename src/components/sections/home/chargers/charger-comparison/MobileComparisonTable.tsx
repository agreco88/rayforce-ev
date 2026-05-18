"use client";

import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";

import type { Product } from "@/lib/types/product";

import { renderFeatureValue } from "@/lib/formatFeatureValue";
import { useTrack } from "@/lib/analytics";

const WHATSAPP_NUMBER = "59892041709";

const VARIANT_THEME: Record<
  string,
  { price: string; check: string; accentBg: string; accentHover: string }
> = {
  residencial: {
    price: "text-sky-400",
    check: "text-sky-400",
    accentBg: "bg-sky-400",
    accentHover: "hover:bg-sky-300",
  },
  comercial: {
    price: "text-green-400",
    check: "text-green-400",
    accentBg: "bg-green-500",
    accentHover: "hover:bg-green-400",
  },
};

type Props = {
  product: Product;
};

export function MobileComparisonTable({ product }: Props) {
  const t = useTranslations("HomePage.HomeChargersSection.ComparisonTable");
  const track = useTrack();

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

        {/* Buy CTA row */}
        <div className="grid grid-cols-2 mt-6 border-t border-neutral-800">
          {product.variants.map((variant) => {
            const variantTheme = VARIANT_THEME[variant.id];
            if (!variantTheme || typeof variant.price !== "number") return null;
            const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              t("cta.buyMessage", { model: variant.name }),
            )}`;
            return (
              <div
                key={`cta-${variant.id}`}
                className="flex items-center justify-center p-4"
              >
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track.whatsappClick({
                      source: "comparison_table_buy_cta",
                      charger: variant.name,
                    })
                  }
                  className={`flex flex-col items-center gap-1.5 px-3 py-3 rounded-xl text-neutral-900 text-lg tracking-tight text-center transition-all duration-200 ${variantTheme.accentBg} ${variantTheme.accentHover}`}
                >
                  <FaWhatsapp className="size-8 sm:size-4  shrink-0" />
                  <span>
                    {t("cta.buy", { price: `USD${variant.price}` })}{" "}
                    {t("taxLabel")}
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
