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

export function getPowerLabel(product: ChargerProduct): string {
  return `${product.specs.maxPowerKw}kW`;
}
