"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import HeaderLogo from "@/components/layout/header/header-logo";
import { renderFeatureValue } from "@/lib/formatFeatureValue";
import type { CableProduct } from "@/lib/catalog/catalog.types";

type Props = {
  products: CableProduct[];
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
) {
  const { specs } = product;
  switch (key) {
    case "power":
      return specs.maxPowerKw ? `${specs.maxPowerKw}kW` : undefined;
    case "current":
      return specs.maxCurrentA
        ? `${specs.maxCurrentA}A, ${
            specs.phaseType === "three" ? tSpecs("phase.three") : tSpecs("phase.single")
          }`
        : undefined;
    case "connector":
      return tSpecs("connector.type2");
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
      return specs.proximityResistorOhm ? `${specs.proximityResistorOhm} Ω` : undefined;
    case "certification":
      return specs.certification;
    case "standard":
      return specs.standard;
    case "bag":
      return specs.bagIncluded;
  }
}

export function CablesComparisonTable({ products }: Props) {
  const t = useTranslations("HomePage.HomeChargersSection.ComparisonTable");
  const tCables = useTranslations("CablesPage.ComparisonTable");
  const tSpecs = useTranslations("Common.Specs");

  const gridTemplateColumns = `220px repeat(${products.length}, minmax(170px, 1fr))`;

  return (
    <div className="mx-auto my-32 w-full max-w-[1600px] px-4 sm:px-6">
      <div className="w-full overflow-x-auto rounded-2xl border border-neutral-900">
        <div
          className="grid min-w-[900px] divide-x divide-neutral-900"
          style={{ gridTemplateColumns }}
        >
          {/* -------------------------------------------------------------- */}
          {/* Product images                                                 */}
          {/* -------------------------------------------------------------- */}

          <div className="sticky left-0 z-10 border-r border-neutral-900 bg-neutral-950" />

          {products.map((product) => (
            <div
              key={`image-${product.slug}`}
              className="relative flex h-80 items-center justify-center bg-neutral-950 p-4"
            >
              <Image
                src={product.heroImage}
                alt=""
                width={400}
                height={400}
                className="h-full w-full object-contain"
              />
            </div>
          ))}

          {/* -------------------------------------------------------------- */}
          {/* Header                                                         */}
          {/* -------------------------------------------------------------- */}

          <div className="sticky left-0 z-10 flex flex-col items-start justify-center gap-1 border-r border-t border-neutral-900 bg-neutral-950 p-8">
            <HeaderLogo />
          </div>

          {products.map((product) => (
            <div
              key={product.slug}
              className="flex flex-col gap-2 border-t border-neutral-900 bg-neutral-950 py-8 text-center shadow"
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
                {tCables(`features.${key}`)}
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
        </div>
      </div>
    </div>
  );
}
