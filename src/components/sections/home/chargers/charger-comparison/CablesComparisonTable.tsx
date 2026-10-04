"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useTranslations } from "next-intl";

import HeaderLogo from "@/components/layout/header/header-logo";
import { renderFeatureValue } from "@/lib/formatFeatureValue";
import type { CableProduct } from "@/lib/catalog/catalog.types";

type Props = {
  products: CableProduct[];
  selectedSlug?: string;
};

const FEATURE_KEYS = [
  "power",
  "current",
  "connector",
  "length",
  "conductorSection",
  "jacketMaterial",
  "contacts",
  "temperatureSensor",
  "ingressProtection",
  "mechanicalLatch",
  "proximityResistor",
  "certification",
  "standard",
  "bag",
] as const;

type FeatureKey = (typeof FEATURE_KEYS)[number];

function getFeatureValue(
  product: CableProduct,
  key: FeatureKey,
  tSpecs: (key: string) => string,
  tCables: (key: string) => string,
) {
  const { specs } = product;
  switch (key) {
    case "power":
      return specs.maxPowerKw ? `${specs.maxPowerKw}kW` : undefined;
    case "current":
      return specs.maxCurrentA
        ? `${specs.maxCurrentA}A, ${
            specs.phaseType === "three"
              ? tSpecs("phase.three")
              : tSpecs("phase.single")
          }`
        : undefined;
    case "connector":
      return tCables("features.connectorEnds");
    case "length":
      return `${specs.lengthM}m`;
    case "conductorSection":
      return specs.conductorSection;
    case "jacketMaterial":
      return specs.jacketMaterial;
    case "contacts":
      return specs.contactMaterial;
    case "temperatureSensor":
      return specs.temperatureSensor;
    case "ingressProtection":
      return specs.ingressProtection;
    case "mechanicalLatch":
      return specs.mechanicalLatch;
    case "proximityResistor":
      return specs.proximityResistorOhm
        ? `${specs.proximityResistorOhm} Ω`
        : undefined;
    case "certification":
      return specs.certification;
    case "standard":
      return specs.standard;
    case "bag":
      return specs.bagIncluded;
  }
}

export function CablesComparisonTable({ products, selectedSlug }: Props) {
  const t = useTranslations("HomePage.HomeChargersSection.ComparisonTable");
  const tCables = useTranslations("AccessoriesPage.ComparisonTable");
  const tSpecs = useTranslations("Common.Specs");

  const gridTemplateColumns = `220px repeat(${products.length}, minmax(170px, 1fr))`;

  const selectedColumnClass = "relative z-20";
  const selectedColumnStyle: CSSProperties = {
    backgroundColor: "rgba(251,191,36,0.06)",
    boxShadow:
      "inset 2px 0 0 0 rgba(251,191,36,0.6), inset -2px 0 0 0 rgba(251,191,36,0.6)",
  };

  return (
    <div className="my-32 w-full">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-white">
        {tCables("title")}
      </h2>
      <div className="w-full overflow-x-auto rounded-2xl border border-neutral-900">
        <div className="grid min-w-[900px]" style={{ gridTemplateColumns }}>
          {/* -------------------------------------------------------------- */}
          {/* Product images                                                 */}
          {/* -------------------------------------------------------------- */}

          <div className="sticky left-0 z-10 border-r border-neutral-900 bg-neutral-900" />

          {products.map((product, index) => {
            const isSelected = product.slug === selectedSlug;
            const isLast = index === products.length - 1;
            return (
              <div
                key={`image-${product.slug}`}
                className={`flex h-56 items-center justify-start border-neutral-900 bg-neutral-900 pl-6 ${
                  isLast ? "" : "border-r"
                } ${isSelected ? "relative z-20" : ""}`}
                style={
                  isSelected
                    ? {
                        boxShadow:
                          "inset 2px 0 0 0 rgba(251,191,36,0.6), inset -2px 0 0 0 rgba(251,191,36,0.6)",
                      }
                    : undefined
                }
              >
                <Image
                  src={product.heroImage}
                  alt=""
                  width={260}
                  height={260}
                  className="h-full w-full object-contain"
                />
              </div>
            );
          })}

          {/* -------------------------------------------------------------- */}
          {/* Header                                                         */}
          {/* -------------------------------------------------------------- */}

          <div className="sticky left-0 z-10 flex flex-col items-start justify-center gap-1 border-r border-t border-neutral-900 bg-neutral-950 p-8">
            <HeaderLogo />
          </div>

          {products.map((product, index) => {
            const isSelected = product.slug === selectedSlug;
            const isLast = index === products.length - 1;
            return (
              <div
                key={product.slug}
                className={`flex flex-col items-start gap-2 border-t border-neutral-900 bg-neutral-950 py-8 pl-6 text-left ${
                  isLast ? "" : "border-r"
                } ${isSelected ? selectedColumnClass : ""}`}
                style={isSelected ? selectedColumnStyle : undefined}
              >
                <span
                  className={`text-lg font-semibold ${
                    isSelected ? "text-amber-300" : "text-white"
                  }`}
                >
                  {product.publicName}
                </span>
              </div>
            );
          })}

          {/* -------------------------------------------------------------- */}
          {/* Features                                                       */}
          {/* -------------------------------------------------------------- */}

          {FEATURE_KEYS.map((key) => (
            <div key={key} className="contents">
              <div className="sticky left-0 z-10 flex items-center border-r border-t border-neutral-900 bg-neutral-950 p-4 pl-8 text-sm text-neutral-400">
                {tCables(`features.${key}`)}
              </div>

              {products.map((product, index) => {
                const isSelected = product.slug === selectedSlug;
                const isLast = index === products.length - 1;
                return (
                  <div
                    key={product.slug + key}
                    className={`flex items-center justify-start border-t border-neutral-900 bg-neutral-950 p-4 pl-6 text-left ${
                      isLast ? "" : "border-r"
                    } ${isSelected ? selectedColumnClass : ""}`}
                    style={isSelected ? selectedColumnStyle : undefined}
                  >
                    <div className={key === "connector" ? "line-clamp-2" : undefined}>
                      {renderFeatureValue(
                        getFeatureValue(product, key, tSpecs, tCables),
                        product.theme.check,
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          {/* Model row */}
          <div className="sticky left-0 z-10 flex items-center border-r border-t border-neutral-900 bg-neutral-950 p-4 pl-8 text-sm text-neutral-400">
            {tCables("features.model")}
          </div>
          {products.map((product, index) => {
            const isSelected = product.slug === selectedSlug;
            const isLast = index === products.length - 1;
            return (
              <div
                key={`model-${product.slug}`}
                className={`flex items-center justify-start border-t border-neutral-900 bg-neutral-950 p-4 pl-6 text-left ${
                  isLast ? "" : "border-r"
                } ${isSelected ? selectedColumnClass : ""}`}
                style={isSelected ? selectedColumnStyle : undefined}
              >
                {product.modelCode}
              </div>
            );
          })}

          {/* Price row */}
          <div className="sticky left-0 z-10 flex items-center border-r border-t border-neutral-900 bg-neutral-950 p-6 pl-8 text-sm text-neutral-400">
            {t("priceLabel")}
          </div>
          {products.map((product, index) => {
            const isSelected = product.slug === selectedSlug;
            const isLast = index === products.length - 1;
            return (
              <div
                key={`price-${product.slug}`}
                className={`flex items-baseline justify-start gap-2 border-t border-neutral-900 bg-neutral-950 p-6 pl-6 ${
                  isLast ? "" : "border-r"
                } ${isSelected ? selectedColumnClass : ""}`}
                style={isSelected ? selectedColumnStyle : undefined}
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
            );
          })}

          {/* More info row */}
          <div className="sticky left-0 z-10 flex items-center border-r border-t border-neutral-900 bg-neutral-950 p-6 pl-8 text-sm text-neutral-400" />
          {products.map((product, index) => {
            const isSelected = product.slug === selectedSlug;
            const isLast = index === products.length - 1;
            return (
              <div
                key={`more-info-${product.slug}`}
                className={`flex items-center justify-start border-t border-neutral-900 bg-neutral-950 p-6 pl-6 ${
                  isLast ? "" : "border-r"
                } ${isSelected ? selectedColumnClass : ""}`}
                style={isSelected ? selectedColumnStyle : undefined}
              >
                {isSelected ? (
                  <span
                    aria-disabled="true"
                    className="pointer-events-none inline-flex items-center justify-center rounded-lg border border-neutral-800 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-600"
                  >
                    {tCables("currentLabel")}
                  </span>
                ) : (
                  <a
                    href={`/accesorios/${product.slug}`}
                    className={`inline-flex items-center justify-center rounded-lg border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors hover:bg-white/5 ${product.theme.accentBorder} ${product.theme.accentText}`}
                  >
                    {tCables("moreInfo")}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
