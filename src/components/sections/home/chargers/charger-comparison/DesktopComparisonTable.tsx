// DesktopComparisonTable.tsx

"use client";

import { useTranslations } from "next-intl";
import { SiMercadopago } from "react-icons/si";

import HeaderLogo from "@/components/layout/header/header-logo";

import { renderFeatureValue } from "@/lib/formatFeatureValue";
import { Product } from "@/lib/types/product";

const MERCADOPAGO_URLS: Record<string, string> = {
  residencial: "http://mpago.la/1notnYD",
  comercial: "https://mpago.la/2C6CFZe",
};

const VARIANT_THEME: Record<
  string,
  {
    price: string;
    check: string;
    highlight: string;
    accentBg: string;
    accentHover: string;
  }
> = {
  residencial: {
    price: "text-sky-400",
    check: "text-sky-400",
    highlight: "border-sky-900",
    accentBg: "bg-sky-400",
    accentHover: "hover:bg-sky-300",
  },
  comercial: {
    price: "text-green-500",
    check: "text-green-400",
    highlight: "border-green-900",
    accentBg: "bg-green-500",
    accentHover: "hover:bg-green-400",
  },
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
                text-5xl
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
                {renderFeatureValue(
                  variant.values[feature.key],
                  VARIANT_THEME[variant.id]?.check,
                )}
              </div>
            ))}
          </div>
        ))}

        {/* Price row */}
        <div className="border-t border-neutral-900 p-6 pl-8 flex items-center text-sm text-neutral-400">
          {t("priceLabel")}
        </div>
        {product.variants.map((variant) => (
          <div
            key={`price-${variant.id}`}
            className="border-t border-neutral-900 p-6 flex flex-col items-center justify-center gap-1"
          >
            <span
              className={`text-4xl font-thin tracking-tighter ${VARIANT_THEME[variant.id]?.price ?? "text-green-400"}`}
            >
              USD {variant.price}
            </span>
            <span className="text-[11px] font-thin text-neutral-400">
              {t("taxLabel")}
            </span>
          </div>
        ))}

        {/* Buy CTA row */}
        <div className="border-t border-neutral-900 p-6 pl-8 flex items-center" />
        {product.variants.map((variant) => {
          const mpUrl = MERCADOPAGO_URLS[variant.id];
          if (!mpUrl) return null;
          return (
            <div
              key={`cta-${variant.id}`}
              className="border-t border-neutral-900 p-6 flex flex-col items-center justify-center gap-2"
            >
              <a
                href={mpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-[#009EE3]/40 shadow-sm  font-semibold text-sm transition-all duration-200"
              >
                {/* <span className="w-0.5 bg-[#0c0384]/10 h-10 rouded-full "></span> */}

                <img
                  src="/images/icons/mpago.png"
                  alt=""
                  aria-hidden="true"
                  className="h-8 w-auto"
                />
                <div className="w-0.5 bg-[#0a0080]/20 h-full rounded-full" />
                <span className="text-[#0a0080] uppercase tracking-tighter!">
                  {t("cta.mercadopago")}
                </span>
              </a>
              <span className="text-[11px] text-neutral-500">
                *{t("cta.installments")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
