"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { useTrack } from "@/lib/analytics/use-track";
import { getProductImageScaleStyle } from "@/lib/catalog/catalog.helpers";
import type { CableProduct } from "@/lib/catalog/catalog.types";
import {
  ProductHighlightRibbon,
  getHighlightBorderStyle,
} from "@/components/catalog/ProductHighlightRibbon";

type Props = {
  product: CableProduct;
};

/** Ecommerce-style product card: white photo plate on top, spec body below. */
export function CableShopCard({ product }: Props) {
  const t = useTranslations("CablesPage.ShopCard");
  const tCard = useTranslations("CablesPage.ProductCard");
  const track = useTrack();

  const variants = tCard.raw("variants") as Record<
    string,
    { label: string; description: string }
  >;
  const copy = variants[product.slug];
  const href = `/cables/${product.slug}`;

  const powerKw = product.specs.maxPowerKw ?? 7;
  const typeLabel = t(
    `type.${product.specs.cableStyle}.${product.specs.phaseType ?? "single"}`,
    { power: powerKw },
  );

  const highlights = [
    t("specs.length", { length: product.specs.lengthM }),
    t("specs.current", { current: product.specs.maxCurrentA ?? 32 }),
    product.specs.temperatureSensor ? t("specs.temperatureSensor") : null,
    t("delivery", { power: powerKw }),
  ].filter(Boolean) as string[];

  return (
    // Toda la tarjeta es el link, igual que la de cargadores: el CTA de abajo
    // es texto y no un boton propio, asi que el area clickeable tiene que ser
    // la tarjeta entera y no solo la foto y la flecha.
    <Link
      href={href}
      onClick={() => track.chargerCardClicked(product.slug)}
      aria-label={`${copy?.label ?? product.publicName} — ${t("cta")}`}
      className={`
        group flex h-full flex-col items-start
        overflow-hidden rounded-2xl border border-white/10
        bg-neutral-950
        transition-colors duration-300
        ${product.theme.accentBorderHover}
      `}
      style={getHighlightBorderStyle(product)}
    >
      {/* ── Photo plate ─────────────────────────────────────── */}
      {/* Misma plancha que los cargadores: gradiente de neutrales, con el
          destacado un stop mas claro. */}
      <div
        className={`relative flex h-[320px] w-full items-center justify-center overflow-hidden bg-gradient-to-br sm:h-[480px] ${
          product.highlight
            ? "from-neutral-600 via-neutral-700 to-neutral-900"
            : "from-neutral-700 via-neutral-800 to-neutral-900"
        }`}
      >
        <ProductHighlightRibbon product={product} className="right-4 top-4" />

        {/* La escala base sale del catalogo y el hover la multiplica, asi el
            zoom arranca del tamaño ya corregido. */}
        <Image
          src={product.heroImage}
          alt=""
          width={500}
          height={500}
          sizes="(max-width: 640px) 90vw, 45vw"
          style={getProductImageScaleStyle(product)}
          className="
            relative h-full w-full object-contain p-6
            scale-[var(--product-image-scale)]
            transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:scale-[calc(var(--product-image-scale)*1.05)]
          "
        />
      </div>

      {/* ── Body ────────────────────────────────────────────── */}
      <div className="flex w-full flex-1 flex-col border-t border-t-neutral-800 px-6 pb-7 pt-6">
        <span className="text-xs font-medium uppercase tracking-widest text-neutral-500">
          {product.modelCode}
        </span>

        <h3 className="mt-1.5 text-base font-semibold tracking-tight text-white normal-case">
          {typeLabel}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-neutral-400">
          {copy?.description ?? ""}
        </p>

        {/* Highlights */}
        <ul
          className="flex list-none flex-col gap-2 border-t border-neutral-800 py-6 mt-6 text-left text-sm text-neutral-400"
          aria-label={`${copy?.label ?? product.publicName} highlights`}
        >
          {highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 first:text-neutral-200!"
            >
              <span
                className={`mt-[0.4375rem] size-1 shrink-0 rounded-full ${product.theme.accentBg}`}
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="mt-auto flex flex-col items-start gap-3 border-t border-neutral-800 pt-6">
          <span
            className={`text-3xl font-thin tracking-tighter whitespace-nowrap ${product.theme.accentText}`}
          >
            {product.price.currency} {product.price.amount}
          </span>

          <span
            className={`
              inline-flex items-center gap-2 whitespace-nowrap
              text-sm font-medium
              transition-all duration-300
              ${product.theme.accentText}
            `}
            aria-hidden="true"
          >
            {t("cta")}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
