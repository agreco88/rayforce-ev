"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { GradientText } from "@/components/animated/GradientText";
import { Link } from "@/i18n/navigation";
import { getPowerLabel } from "@/lib/catalog/catalog.helpers";
import type { ChargerProduct } from "@/lib/catalog/catalog.types";
import {
  ProductHighlightRibbon,
  getHighlightBorderStyle,
} from "@/components/catalog/ProductHighlightRibbon";

/**
 * La tarjeta chica de dos columnas, extraida del acordeon mobile del header
 * (`NavigationScroll`): plancha de foto, modelo, titulo + kW en gradiente,
 * precio y un chevron circular como CTA. Ahora la comparten el header y la
 * grilla de wallboxes en `HomeLineupMobile`.
 */
export function ChargerCompactCard({ product }: { product: ChargerProduct }) {
  const t = useTranslations("HomePage.HomeChargersSection");
  const locale = useLocale();
  const power = getPowerLabel(product, locale);

  return (
    <Link
      href={`/cargadores/${product.slug}`}
      className="flex h-full flex-col gap-3 rounded-xl border border-neutral-800 p-3 transition-colors hover:bg-neutral-800/60"
      style={getHighlightBorderStyle(product)}
    >
      {/* Mismo gradiente de neutrales que la tarjeta grande, un stop mas claro
          para el destacado. */}
      <div
        className={`relative flex h-40 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br ${
          product.highlight
            ? "from-neutral-600 via-neutral-700 to-neutral-900"
            : "from-neutral-700 via-neutral-800 to-neutral-900"
        }`}
      >
        <ProductHighlightRibbon
          product={product}
          className="right-2 top-2 px-1.5 py-0.5 text-[8px]"
        />
        <Image
          src={product.cardImage}
          alt=""
          width={320}
          height={320}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex min-w-0 flex-col">
        <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
          {product.modelCode}
        </span>

        <h3 className="pt-1 pb-2.5 text-[13px] leading-relaxed font-medium tracking-tight text-balance text-neutral-200 normal-case">
          {t(`chargers.${product.slug}.title`)}{" "}
          <GradientText
            colors={product.theme.gradientColors}
            className="font-semibold whitespace-nowrap"
          >
            {power}
          </GradientText>
        </h3>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-neutral-800 pt-3">
          <span className="flex min-w-0 flex-col">
            <GradientText
              colors={product.theme.gradientColors}
              className="text-xl font-light tracking-tight"
            >
              USD {product.price.amount}
            </GradientText>
            {product.price.taxLabel && (
              <span className="text-[10px] font-medium tracking-wide text-neutral-500">
                {product.price.taxLabel}
              </span>
            )}
          </span>

          <span
            className={`inline-flex size-6 shrink-0 self-center items-center justify-center rounded-full border border-current/20 ${product.theme.accentText}`}
            aria-hidden="true"
          >
            <ChevronRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
