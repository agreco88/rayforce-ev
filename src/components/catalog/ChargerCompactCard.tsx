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

/** Mirrors ChargersCardGrid's map — the catalog's heroImage is not the card photo. */
const PRODUCT_IMAGES: Record<string, string> = {
  "bs20-bc-7kw": "/assets/images/chargers/BS20-7KW.png",
  "bs20-ba-7kw": "/assets/images/chargers/BS20-7KW-SOCKET.png",
  "bs20-bc-11kw": "/assets/images/chargers/BS20-7KW.png",
  "bs20-bc-22kw": "/assets/images/chargers/BS20-22KW.png",
};

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
      <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg bg-white flex items-center justify-center">
        <ProductHighlightRibbon
          product={product}
          className="right-2 top-2 px-1.5 py-0.5 text-[8px]"
        />
        <Image
          src={PRODUCT_IMAGES[product.slug]}
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
