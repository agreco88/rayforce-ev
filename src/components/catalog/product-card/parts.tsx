"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { GradientText } from "@/components/animated/GradientText";
import { ProductHighlightRibbon } from "@/components/catalog/ProductHighlightRibbon";
import type { CatalogTheme } from "@/lib/catalog/catalog.types";
import type { ProductCardSpec, VariantProps } from "./types";

/*
 * Las piezas que comparten las variantes. Cada una trae su estilo fijo y
 * deja afuera (en `className`) solo lo que cambia de una variante a otra:
 * tamaño, borde, margen.
 */

/** Texto en el color del producto: en gradiente, o solido en su primer stop. */
export function AccentText({
  theme,
  gradient,
  className = "",
  children,
}: {
  theme: CatalogTheme;
  gradient: boolean;
  className?: string;
  children: ReactNode;
}) {
  if (gradient) {
    return (
      <GradientText colors={theme.gradientColors} className={className}>
        {children}
      </GradientText>
    );
  }

  return (
    <span className={className} style={{ color: theme.gradientColors[0] }}>
      {children}
    </span>
  );
}

/**
 * La imagen va `absolute` para que su tamaño no empuje la card.
 *
 * - `zoom`: clases de escala/hover de la imagen, sin tocar el layout.
 * - `ribbon`: posicion del badge cuando va adentro de la foto (si no, lo pone
 *   `ProductCard` sobre el borde).
 * - `children`: capas detras del producto (un halo).
 */
export function Photo({
  image,
  imageClassName = "object-contain",
  imageStyle,
  highlight,
  theme,
  className,
  zoom = "",
  size = 240,
  ribbon,
  children,
}: Pick<
  VariantProps,
  "image" | "imageClassName" | "imageStyle" | "highlight" | "theme"
> & {
  className: string;
  zoom?: string;
  /** Ancho pedido a `next/image`: acompaña al tamaño en pantalla. */
  size?: number;
  ribbon?: string;
  children?: ReactNode;
}) {
  return (
    // Gradiente de neutrales: las fotos son PNG recortados sobre
    // transparente. El destacado arranca un stop mas claro.
    <div
      className={`relative shrink-0 overflow-hidden border-white/10 bg-gradient-to-br ${className} ${
        highlight
          ? "from-neutral-500 via-neutral-600 to-neutral-900"
          : "from-neutral-600 via-neutral-700 to-neutral-900"
      }`}
    >
      {ribbon && (
        <ProductHighlightRibbon
          product={{ highlight, theme }}
          className={ribbon}
        />
      )}
      {children}
      <Image
        src={image}
        alt=""
        width={size}
        height={size}
        className={`absolute inset-0 h-full w-full ${imageClassName} ${zoom}`}
        style={imageStyle}
      />
    </div>
  );
}

/** El titulo en mayuscula. `className`: tamaño y
 * tracking. */
export function Title({
  title,
  className = "text-sm",
}: Pick<VariantProps, "title"> & { className?: string }) {
  return (
    <h4
      className={`text-balance leading-[1.5] uppercase text-neutral-100 ${className}`}
    >
      {title}
    </h4>
  );
}

/** `className`: tamaño de letra. */
export function SpecList({
  specs,
  theme,
  gradient,
  className = "text-xs",
}: {
  specs: ProductCardSpec[];
  theme: CatalogTheme;
  gradient: boolean;
  className?: string;
}) {
  if (specs.length === 0) return null;

  return (
    <ul
      className={`mt-3 flex list-none flex-col gap-1.5 text-neutral-400 ${className}`}
    >
      {specs.map((spec, index) => (
        <li key={index} className="flex items-center gap-2">
          <span
            className={`size-1 shrink-0 rounded-full ${theme.accentBg}`}
            aria-hidden="true"
          />
          {typeof spec === "string" ? (
            spec
          ) : (
            <span>
              {spec.label}{" "}
              <AccentText
                theme={theme}
                gradient={gradient}
                className="font-semibold"
              >
                {spec.value}
              </AccentText>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/** `div` y no `border-t`: el borde no acepta gradiente. Solo el destacado se
 * prende, con los colores de su tema; los demas van en `neutral`. */
export function Divider({
  highlight,
  theme,
  className = "",
  neutral = "bg-neutral-800",
}: Pick<VariantProps, "highlight" | "theme"> & {
  className?: string;
  neutral?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`h-px ${className} ${highlight ? "" : neutral}`}
      style={
        highlight
          ? {
              backgroundImage: `linear-gradient(to right, ${theme.gradientColors.join(", ")})`,
            }
          : undefined
      }
    />
  );
}

/**
 * `className` define tamaño, peso y tracking del monto; el impuesto queda fijo
 * y chico: al lado, abajo (`tax="below"`, para columnas angostas) o sin
 * mostrar.
 */
export function Price({
  price,
  theme,
  gradient,
  className,
  tax = "inline",
}: Pick<VariantProps, "price" | "theme" | "gradient"> & {
  className: string;
  tax?: "inline" | "below" | "hidden";
}) {
  return (
    // `nowrap`: en columnas angostas "USD 597" y "IVA inc." se partian en dos
    // lineas; mejor que el que se mueva sea lo de al lado.
    <span
      className={`flex whitespace-nowrap ${tax === "below" ? "flex-col" : "items-baseline gap-1.5"}`}
    >
      <AccentText theme={theme} gradient={gradient} className={className}>
        {price.currency} {price.amount}
      </AccentText>
      {tax !== "hidden" && price.taxLabel && (
        <span className="text-[10px] font-medium tracking-wide text-neutral-500">
          {price.taxLabel}
        </span>
      )}
    </span>
  );
}

/** "Más información" + flecha. Decorativo: el link es la card entera. */
export function MoreInfo({
  theme,
  className = "",
}: Pick<VariantProps, "theme"> & { className?: string }) {
  const t = useTranslations("Common.ProductCard");

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${theme.accentText} ${className}`}
      aria-hidden="true"
    >
      {t("cta")}
      <ArrowRight
        size={14}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </span>
  );
}

/** Decorativo: el link es la card entera. */
export function Chevron({ theme }: Pick<VariantProps, "theme">) {
  return (
    <span
      className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-current/20 ${theme.accentText}`}
      aria-hidden="true"
    >
      <ChevronRight size={16} />
    </span>
  );
}
