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

/**
 * Ordena por precio ascendente: es el orden con el que el cliente quiere que se
 * lea la linea, entrando por el modelo mas accesible.
 *
 * Va aca y no reordenando el array del catalogo porque el orden es una regla de
 * presentacion, no un dato del producto: vale para toda superficie que liste la
 * categoria — la grilla de la home, /cargadores, /accesorios, el panel del header y
 * el acordeon mobile. En los getters queda en un solo lugar, y los catalogos
 * siguen leyendose como fichas.
 *
 * El destacado ya no va primero: lo distingue su badge, sin romper la escala.
 */
function byPriceAsc<T extends CatalogProduct>(products: T[]): T[] {
  return [...products].sort((a, b) => a.price.amount - b.price.amount);
}

export function getChargerProducts(): ChargerProduct[] {
  return byPriceAsc(CHARGER_PRODUCTS);
}

export function getFeaturedChargerProducts(): ChargerProduct[] {
  return CHARGER_PRODUCTS.filter((product) => product.featured);
}

export function getCableProducts(): CableProduct[] {
  return byPriceAsc(CABLE_PRODUCTS);
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

/** El slug legible para el breadcrumb: `cable-tipo-2-7kw` → "Cable tipo 2 7 kW". */
export function slugLabel(slug: string): string {
  const words = slug.replaceAll("-", " ").replace(/(\d)kw\b/g, "$1 kW");
  return words.charAt(0).toUpperCase() + words.slice(1);
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
