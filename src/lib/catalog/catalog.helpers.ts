/* ------------------------------------------------------------------ */
/* Rayforce – Catalog Helpers                                         */
/* ------------------------------------------------------------------ */

import { CABLE_PRODUCTS } from "./cables.catalog";
import { CHARGER_PRODUCTS } from "./chargers.catalog";
import type { CableProduct, CatalogProduct, ChargerProduct } from "./catalog.types";

export function getAllProducts(): CatalogProduct[] {
  return [...CHARGER_PRODUCTS, ...CABLE_PRODUCTS];
}

export function getChargerProducts(): ChargerProduct[] {
  return CHARGER_PRODUCTS;
}

export function getFeaturedChargerProducts(): ChargerProduct[] {
  return CHARGER_PRODUCTS.filter((product) => product.featured);
}

export function getCableProducts(): CableProduct[] {
  return CABLE_PRODUCTS;
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
