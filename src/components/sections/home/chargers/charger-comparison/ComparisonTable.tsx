"use client";

import { useTranslations } from "next-intl";
import { useTrack } from "@/lib/analytics";

import HeaderLogo from "@/components/layout/header/header-logo";
import { renderFeatureValue } from "@/lib/formatFeatureValue";
import type { ChargerProduct } from "@/lib/catalog/catalog.types";

type Props = {
  products: ChargerProduct[];
};

const FEATURE_KEYS = [
  "power",
  "phase",
  "connector",
  "current",
  "voltage",
  "app",
  "protection",
  "ip",
  "temperature",
] as const;

type FeatureKey = (typeof FEATURE_KEYS)[number];

function getFeatureValue(
  product: ChargerProduct,
  key: FeatureKey,
  tSpecs: (key: string) => string,
) {
  const { specs } = product;
  switch (key) {
    case "power":
      return `${specs.maxPowerKw}kW`;
    case "phase":
      return specs.phaseType === "single" ? tSpecs("phase.single") : tSpecs("phase.three");
    case "connector":
      return tSpecs("connector.type2");
    case "current":
      return specs.nominalCurrentA ? `${specs.nominalCurrentA}A` : undefined;
    case "voltage":
      return specs.voltage;
    case "app":
      return specs.appControl;
    case "protection":
      return specs.rcdProtection;
    case "ip":
      return specs.ingressProtection;
    case "temperature":
      return specs.operatingTemperature;
  }
}

export function ComparisonTable({ products }: Props) {
  const t = useTranslations("HomePage.HomeChargersSection.ComparisonTable");
  const tSpecs = useTranslations("Common.Specs");
  const track = useTrack();

  const gridTemplateColumns = `220px repeat(${products.length}, minmax(170px, 1fr))`;

  return (
    <div className="mx-auto my-32 w-full max-w-[1600px] px-4 sm:px-6">
      <div className="w-full overflow-x-auto rounded-2xl border border-neutral-900">
        <div
          className="grid min-w-[900px] divide-x divide-neutral-900"
          style={{ gridTemplateColumns }}
        >
          {/* -------------------------------------------------------------- */}
          {/* Header                                                         */}
          {/* -------------------------------------------------------------- */}

          <div className="sticky left-0 z-10 flex flex-col items-start justify-center gap-1 border-r border-neutral-900 bg-neutral-950 p-8">
            <HeaderLogo />
          </div>

          {products.map((product) => (
            <div
              key={product.slug}
              className={`flex flex-col gap-2 bg-neutral-950 py-8 text-center shadow ${
                product.featured
                  ? `border-x ${product.theme.highlight} bg-neutral-900/40 shadow-inner shadow-neutral-950`
                  : ""
              }`}
            >
              <span className="font-light uppercase tracking-wide text-white">
                {product.shortName}
              </span>
              <span
                className={`text-4xl font-thin tracking-tighter sm:text-5xl ${product.theme.accentText}`}
              >
                USD {product.price.amount}
              </span>
              <span className="text-[11px] font-thin text-neutral-400">
                {t("taxLabel")}
              </span>
            </div>
          ))}

          {/* -------------------------------------------------------------- */}
          {/* Features                                                       */}
          {/* -------------------------------------------------------------- */}

          {FEATURE_KEYS.map((key) => (
            <div key={key} className="contents">
              <div className="sticky left-0 z-10 flex items-center border-t border-neutral-900 bg-neutral-950 p-4 pl-8 text-sm text-neutral-400">
                {t(`features.${key}`)}
              </div>

              {products.map((product) => (
                <div
                  key={product.slug + key}
                  className="flex items-center justify-center border-t border-neutral-900 bg-neutral-950 p-4 text-center"
                >
                  {renderFeatureValue(
                    getFeatureValue(product, key, tSpecs),
                    product.theme.check,
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Price row */}
          <div className="sticky left-0 z-10 flex items-center border-t border-neutral-900 bg-neutral-950 p-6 pl-8 text-sm text-neutral-400">
            {t("priceLabel")}
          </div>
          {products.map((product) => (
            <div
              key={`price-${product.slug}`}
              className="flex flex-col items-center justify-center gap-1 border-t border-neutral-900 bg-neutral-950 p-6"
            >
              <span
                className={`text-4xl font-thin tracking-tighter ${product.theme.accentText}`}
              >
                USD {product.price.amount}
              </span>
              <span className="text-[11px] font-thin text-neutral-400">
                {t("taxLabel")}
              </span>
            </div>
          ))}

          {/* Buy CTA row */}
          <div className="sticky left-0 z-10 border-t border-neutral-900 bg-neutral-950 p-6 pl-8" />
          {products.map((product) => {
            const mpUrl = product.mercadopagoUrl;
            if (!mpUrl) {
              return (
                <div
                  key={`cta-${product.slug}`}
                  className="border-t border-neutral-900 bg-neutral-950 p-6"
                />
              );
            }
            return (
              <div
                key={`cta-${product.slug}`}
                className="flex flex-col items-center justify-center gap-2 border-t border-neutral-900 bg-neutral-950 p-6"
              >
                <a
                  href={mpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track.mercadopagoClick({
                      source: "comparison_table",
                      charger: product.slug,
                      location: window.innerWidth < 1024 ? "mobile" : "desktop",
                    })
                  }
                  className="flex items-center gap-2.5 rounded-xl border border-neutral-200 bg-white px-5 py-3 shadow-sm transition-all duration-200 hover:border-[#009EE3]/40 hover:bg-neutral-50"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/icons/mpago.png"
                    alt=""
                    aria-hidden="true"
                    className="h-8 w-auto"
                  />
                  <div className="h-full w-0.5 rounded-full bg-[#0a0080]/20" />
                  <span className="text-[#0a0080] uppercase tracking-tighter!">
                    {t("cta.mercadopago")}
                  </span>
                </a>
                <span className="text-[11px] text-neutral-400">
                  *{t("cta.installments")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
