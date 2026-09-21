"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import type { CatalogProduct } from "@/lib/catalog/catalog.types";

type Props = {
  product: CatalogProduct;
  className?: string;
};

/**
 * Commercial badge for a product carrying `highlight` ("Más vendido", …).
 *
 * Pinned to the top-right corner of the product photo, so it never disturbs the
 * spacing of the copy below. The caller positions it — pass the corner offsets
 * in `className` and make sure the photo wrapper is `relative`.
 *
 * Renders nothing when the product has no highlight, so callers can drop it in
 * unconditionally. The gradient comes from the product's own theme, which keeps
 * chargers green and cables amber with no per-surface branching.
 */
export function ProductHighlightRibbon({ product, className }: Props) {
  const t = useTranslations("Catalog.highlights");

  if (!product.highlight) return null;

  const [from, via, to] = product.theme.gradientColors;

  return (
    <span
      className={cn(
        "pointer-events-none absolute z-10 inline-flex items-center",
        // `rounded-md`, igual que los triggers del header.
        "whitespace-nowrap rounded-md px-2.5 py-1",
        "text-[10px] font-semibold uppercase tracking-wider text-neutral-950",
        "shadow-sm",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(to right, ${from}, ${via}, ${to})`,
      }}
    >
      {t(product.highlight.labelKey)}
    </span>
  );
}

/**
 * Accent border + soft glow for a highlighted product's card, so it reads as
 * promoted at a glance. Returns `undefined` for non-highlighted products —
 * spread it onto the element's `style` and it no-ops.
 *
 * Deliberately paints the ring with `box-shadow` and `border-color` rather than
 * a gradient `background-clip`: cards here swap their background on hover, and
 * the two-layer clip trick would fight that.
 */
export function getHighlightBorderStyle(
  product: CatalogProduct,
): React.CSSProperties | undefined {
  if (!product.highlight) return undefined;

  const [, via] = product.theme.gradientColors;

  return {
    borderColor: via,
    boxShadow: `0 0 0 1px ${via}, 0 8px 30px -12px ${product.theme.glowStrong}`,
  };
}
