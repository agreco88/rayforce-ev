/* ------------------------------------------------------------------ */
/* Rayforce – Catalog Helpers                                         */
/* ------------------------------------------------------------------ */

import { CABLE_PRODUCTS } from "./cables.catalog";
import { CHARGER_PRODUCTS } from "./chargers.catalog";
import type { CableProduct, CatalogProduct, ChargerProduct } from "./catalog.types";

export function getAllProducts(): CatalogProduct[] {
  return [...CHARGER_PRODUCTS, ...CABLE_PRODUCTS];
}

/**
 * Ordena dejando los productos con `highlight` ("Más vendido") primero, sin
 * alterar el orden relativo del resto.
 *
 * Va acá y no reordenando el array del catálogo porque el orden es una regla
 * de presentación, no un dato del producto: el destacado va primero en toda
 * superficie que liste su categoría — la grilla de la home, /cargadores,
 * /cables, el panel del header y el acordeón mobile. Poniéndolo en los getters
 * queda en un solo lugar, y los catálogos siguen leyéndose como fichas.
 */
/**
 * El `style` que corrige el encuadre de la foto de un producto. Va acá y no en
 * cada componente porque el desajuste es del PNG y se ve en toda superficie
 * donde el producto aparece al lado de sus hermanos: grillas, panel del
 * header, hero y ficha.
 *
 * Sale como CSS variable y no como clase porque Tailwind solo descubre las
 * clases literales, y la escala es un dato del catalogo.
 */
export function getProductImageScaleStyle(
  product: CatalogProduct,
): React.CSSProperties {
  return {
    "--product-image-scale": product.cardImageScale ?? 1,
  } as React.CSSProperties;
}

function highlightedFirst<T extends CatalogProduct>(products: T[]): T[] {
  return [
    ...products.filter((product) => product.highlight),
    ...products.filter((product) => !product.highlight),
  ];
}

export function getChargerProducts(): ChargerProduct[] {
  return highlightedFirst(CHARGER_PRODUCTS);
}

export function getFeaturedChargerProducts(): ChargerProduct[] {
  return CHARGER_PRODUCTS.filter((product) => product.featured);
}

export function getCableProducts(): CableProduct[] {
  return highlightedFirst(CABLE_PRODUCTS);
}

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return getAllProducts().find((product) => product.slug === slug);
}

export function getChargerProductBySlug(slug: string): ChargerProduct | undefined {
  return CHARGER_PRODUCTS.find((product) => product.slug === slug);
}

export function getCableProductBySlug(slug: string): CableProduct | undefined {
  return CABLE_PRODUCTS.find((product) => product.slug === slug);
}

export function isHomeCharger(product: ChargerProduct): boolean {
  return product.specs.phaseType === "single";
}

export function isThreePhase(product: ChargerProduct): boolean {
  return product.specs.phaseType === "three";
}

/**
 * Formats a power value for display. Spanish uses a decimal comma ("7,2kW"),
 * English a decimal point ("7.2kW"); integers render unchanged in both.
 */
export function formatPowerKw(powerKw: number, locale?: string): string {
  const value = String(powerKw);
  return locale?.startsWith("es") ? value.replace(".", ",") : value;
}

export function getPowerLabel(product: ChargerProduct, locale?: string): string {
  return `${formatPowerKw(product.specs.maxPowerKw, locale)}kW`;
}

export function getCatalogPowerLabel(
  product: CatalogProduct,
  locale?: string,
): string {
  return `${formatPowerKw(product.specs.maxPowerKw ?? 0, locale)}kW`;
}

/** Products carrying a commercial badge ("Más vendido", …), in catalog order. */
export function getHighlightedProducts(): CatalogProduct[] {
  return getAllProducts().filter((product) => product.highlight);
}
