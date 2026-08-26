"use client";

import { useTranslations } from "next-intl";
import { useTrack } from "@/lib/analytics";

import type { Product } from "@/lib/types/product";

import { renderFeatureValue } from "@/lib/formatFeatureValue";

const MERCADOPAGO_URLS: Record<string, string> = {
  residencial: "http://mpago.la/1notnYD",
  comercial: "https://mpago.la/2C6CFZe",
};

const VARIANT_THEME: Record<string, { price: string; check: string }> = {
  residencial: {
    price: "text-sky-400",
    check: "text-sky-400",
  },
  comercial: {
    price: "text-green-400",
    check: "text-green-400",
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

        {/* Price row */}
        <div className="grid grid-cols-2 mt-6 border-t border-neutral-800">
          {product.variants.map((variant) => (
            <div
              key={`price-${variant.id}`}
              className="flex flex-col items-center justify-center gap-0.5 p-4"
            >
              <span
                className={`text-2xl font-thin tracking-tighter ${VARIANT_THEME[variant.id]?.price ?? "text-green-400"}`}
              >
                USD {variant.price}
              </span>
              <span className="text-[10px] font-thin text-neutral-400">
                {t("taxLabel")}
              </span>
            </div>
          ))}
        </div>

        {/* Buy CTA row */}
        <div className="grid grid-cols-2 border-t border-neutral-800">
          {product.variants.map((variant) => {
            const mpUrl = MERCADOPAGO_URLS[variant.id];
            if (!mpUrl) return null;
            return (
              <div
                key={`cta-${variant.id}`}
                className="flex flex-col items-center justify-center gap-1.5 p-4"
              >
                <a
                  href={mpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track.mercadopagoClick({ source: "comparison_table", charger: variant.id, location: "mobile" })}
                  className="flex items-center gap-1.5 px-2 py-2 my-2 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-[#009EE3]/40 shadow-sm transition-all duration-200 w-full justify-center"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/icons/mpago.png"
                    alt=""
                    aria-hidden="true"
                    className="h-5 w-auto shrink-0"
                  />
                  <div className="w-px self-stretch bg-[#0a0080]/20 rounded-full shrink-0" />
                  <span className="text-[10px] text-[#0a0080] uppercase tracking-tight font-semibold leading-none">
                    {t("cta.mercadopago")}
                  </span>
                </a>
                <span className="text-[10px] text-neutral-400 text-center">
                  {t("cta.installments")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
