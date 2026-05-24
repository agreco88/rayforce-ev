"use client";

import { useTranslations } from "next-intl";

import type { Product } from "@/lib/types/product";

import { renderFeatureValue } from "@/lib/formatFeatureValue";

const MERCADOPAGO_URLS: Record<string, string> = {
  residencial: "http://mpago.la/1notnYD",
  comercial: "https://mpago.la/2C6CFZe",
};

const VARIANT_THEME: Record<
  string,
  { price: string; check: string }
> = {
  residencial: {
    price: "text-sky-400",
    check: "text-sky-400",
  },
  comercial: {
    price: "text-green-400",
    check: "text-green-400",
  },
};

function MercadoPagoLogo() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="white" />
      <path d="M7 16.5C7 11.806 10.806 8 15.5 8S24 11.806 24 16.5" stroke="#009EE3" strokeWidth="3" strokeLinecap="round" />
      <circle cx="7" cy="17" r="2.5" fill="#009EE3" />
      <circle cx="24" cy="17" r="2.5" fill="#33CC99" />
    </svg>
  );
}

type Props = {
  product: Product;
};

export function MobileComparisonTable({ product }: Props) {
  const t = useTranslations("HomePage.HomeChargersSection.ComparisonTable");

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
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#009EE3] hover:bg-[#0087c8] text-white font-semibold text-sm transition-all duration-200 w-full justify-center"
                >
                  <MercadoPagoLogo />
                  {t("cta.mercadopago")}
                </a>
                <span className="text-[10px] text-neutral-500 text-center">{t("cta.installments")}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
