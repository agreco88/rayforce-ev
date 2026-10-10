"use client";

import { Link } from "@/i18n/navigation";
import {
  ProductHighlightRibbon,
  getHighlightBorderStyle,
} from "@/components/catalog/ProductHighlightRibbon";
import type { ProductCardData, VariantProps } from "./types";
import { Horizontal1 } from "./variants/horizontal/Horizontal1";
import { Horizontal2 } from "./variants/horizontal/Horizontal2";
import { Horizontal3 } from "./variants/horizontal/Horizontal3";
import { Horizontal4 } from "./variants/horizontal/Horizontal4";
import { Horizontal5 } from "./variants/horizontal/Horizontal5";
import { Vertical1 } from "./variants/vertical/Vertical1";
import { Vertical2 } from "./variants/vertical/Vertical2";
import { Vertical3 } from "./variants/vertical/Vertical3";

/** La card de siempre: borde fino y redondeo `xl`, para fondo oscuro. */
const CARD = "rounded-xl border border-neutral-800";
const HOVER_BG = "transition-colors hover:bg-neutral-800/60";

/** Las que siguen el modo claro/oscuro del sistema (`dark:` es por media
 * query en este proyecto), para superficies que cambian, como el menu. */
const CARD_ADAPTIVE =
  "rounded-xl border border-neutral-200 dark:border-neutral-800";
const HOVER_BG_ADAPTIVE =
  "transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800/60";

/** En las filas la foto es chica y el badge la taparia: monta sobre el borde. */
const RIBBON_ON_BORDER =
  "right-4 top-0 -translate-y-1/2 px-2 py-0.5 text-[9px]";

/**
 * El catalogo de variantes. Cada una trae su interior (`Component`) y lo que
 * necesita del contenedor:
 *
 * - `card`: forma, borde y layout.
 * - `hover`: clases del hover, o `"accent-border"` para pintar el borde con
 *   el color del producto.
 * - `ribbon`: donde va el badge sobre la card, o `null` si la variante lo pone
 *   adentro de su foto.
 */
const VARIANTS = {
  "horizontal-1": {
    Component: Horizontal1,
    card: `${CARD} items-center gap-6 p-4`,
    hover: HOVER_BG,
    ribbon: RIBBON_ON_BORDER,
  },
  "horizontal-2": {
    Component: Horizontal2,
    card: `${CARD} flex-col p-4`,
    hover: HOVER_BG,
    ribbon: RIBBON_ON_BORDER,
  },
  "horizontal-3": {
    Component: Horizontal3,
    // Sin padding: la foto va al ras y el texto lleva el suyo.
    card: CARD,
    hover: HOVER_BG,
    ribbon: RIBBON_ON_BORDER,
  },
  "horizontal-5": {
    Component: Horizontal5,
    // `h-full`: en la grilla las cards de una fila miden lo mismo.
    card: "h-full rounded-2xl border border-neutral-800",
    hover: HOVER_BG,
    ribbon: RIBBON_ON_BORDER,
  },
  "horizontal-4": {
    Component: Horizontal4,
    card: `${CARD_ADAPTIVE} h-full gap-5 p-5`,
    hover: HOVER_BG_ADAPTIVE,
    ribbon: null,
  },
  "vertical-1": {
    Component: Vertical1,
    card: `${CARD_ADAPTIVE} h-full flex-col gap-3 p-3`,
    hover: HOVER_BG_ADAPTIVE,
    ribbon: null,
  },
  "vertical-2": {
    Component: Vertical2,
    // `overflow-hidden`: la plancha va al ras y toma el redondeo de la card.
    card: "h-full flex-col items-start overflow-hidden rounded-2xl border border-white/10 bg-neutral-950",
    hover: "accent-border",
    ribbon: null,
  },
  "vertical-3": {
    Component: Vertical3,
    card: `${CARD_ADAPTIVE} h-full flex-col gap-5 p-5`,
    hover: HOVER_BG_ADAPTIVE,
    ribbon: null,
  },
} satisfies Record<
  string,
  {
    Component: (props: VariantProps) => React.ReactNode;
    card: string;
    hover: string;
    ribbon: string | null;
  }
>;

/** `"horizontal-3"`, `"vertical-1"`…: donde va la foto + numero. Ver el README. */
export type ProductCardVariant = keyof typeof VARIANTS;

const BREAKPOINTS = ["sm", "md", "lg", "xl", "2xl"] as const;
type Breakpoint = (typeof BREAKPOINTS)[number];

/** Una variante por breakpoint: `{ base: "horizontal-4", "2xl": "vertical-3" }`. */
export type ResponsiveVariant = { base: ProductCardVariant } & Partial<
  Record<Breakpoint, ProductCardVariant>
>;

// Literales para que Tailwind los encuentre. `contents`: el wrapper no suma
// caja, asi la card sigue midiendo contra el padre real.
const SHOW_FROM: Record<"base" | Breakpoint, string> = {
  base: "contents",
  sm: "hidden sm:contents",
  md: "hidden md:contents",
  lg: "hidden lg:contents",
  xl: "hidden xl:contents",
  "2xl": "hidden 2xl:contents",
};
const HIDE_FROM: Record<Breakpoint, string> = {
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
  xl: "xl:hidden",
  "2xl": "2xl:hidden",
};

export type ProductCardProps = ProductCardData & {
  variant: ProductCardVariant | ResponsiveVariant;
  /** `true`: gradiente en todas. Por defecto solo el destacado va en
   * gradiente y el resto en solido. */
  gradient?: boolean;
  /** Por ejemplo, cerrar el menu que contiene la card. */
  onClick?: () => void;
  ariaLabel?: string;
};

/**
 * Una card de producto. Pone lo que comparten todas las variantes — el
 * contenedor, el link, el borde y el badge del destacado — y delega el
 * interior a la variante elegida.
 *
 * Para mostrar varios productos, usar `ProductCollection`, no un `map` a mano
 * (salvo que el padre anime cada card).
 */
export function ProductCard({ variant, ...props }: ProductCardProps) {
  if (typeof variant === "string") {
    return <SingleCard variant={variant} {...props} />;
  }

  // Se montan todas y CSS muestra la del breakpoint activo.
  const steps = (["base", ...BREAKPOINTS] as const).filter(
    (step) => variant[step],
  );

  return steps.map((step, index) => {
    const next = steps[index + 1] as Breakpoint | undefined;

    return (
      <div
        key={step}
        className={`${SHOW_FROM[step]} ${next ? HIDE_FROM[next] : ""}`}
      >
        <SingleCard variant={variant[step]!} {...props} />
      </div>
    );
  });
}

function SingleCard({
  variant,
  gradient = false,
  onClick,
  ariaLabel,
  ...data
}: Omit<ProductCardProps, "variant"> & { variant: ProductCardVariant }) {
  const { Component, card, hover, ribbon } = VARIANTS[variant];
  const { href, highlight, theme } = data;

  const className = `relative flex ${card}`;
  const style = getHighlightBorderStyle({ highlight, theme });

  const content = (
    <>
      {ribbon && (
        <ProductHighlightRibbon
          product={{ highlight, theme }}
          className={ribbon}
        />
      )}
      <Component {...data} gradient={gradient || !!highlight} />
    </>
  );

  if (!href) {
    return (
      <div className={className} style={style}>
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`group ${className} ${
        hover === "accent-border"
          ? `transition-colors duration-300 ${theme.accentBorderHover}`
          : hover
      }`}
      style={style}
    >
      {content}
    </Link>
  );
}
