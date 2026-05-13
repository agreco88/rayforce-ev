/* ------------------------------------------------------------------ */
/* Rayforce – Chargers Helpers                                        */
/* ------------------------------------------------------------------ */

import { CHARGER_FAMILIES } from "./chargers.data";
import { ChargerFamily, ChargerVariant } from "./chargers.type";

/* ---------------- Families ---------------- */

export function getChargerFamilies(): ChargerFamily[] {
  return CHARGER_FAMILIES;
}

export function getFeaturedChargerFamily(): ChargerFamily | undefined {
  return CHARGER_FAMILIES.find((f) => f.featured);
}

export function getChargerFamilyBySlug(
  slug: string,
): ChargerFamily | undefined {
  return CHARGER_FAMILIES.find((f) => f.slug === slug);
}

/* ---------------- Variants ---------------- */

export function getAllChargerVariants(): ChargerVariant[] {
  return CHARGER_FAMILIES.flatMap((f) => f.variants);
}

export function getFeaturedChargerVariants(): ChargerVariant[] {
  return getAllChargerVariants().filter((v) => v.featured);
}

export function getChargerVariantBySlug(
  familySlug: string,
  variantSlug: string,
): ChargerVariant | undefined {
  const family = getChargerFamilyBySlug(familySlug);
  return family?.variants.find((v) => v.slug === variantSlug);
}

/* ---------------- Comparison ---------------- */

export function getVariantsForFamily(familySlug: string): ChargerVariant[] {
  const family = getChargerFamilyBySlug(familySlug);
  return family?.variants ?? [];
}

/* ---------------- Derived helpers ---------------- */

export function isHomeCharger(variant: ChargerVariant): boolean {
  return variant.specs.phaseType === "single";
}

export function isThreePhase(variant: ChargerVariant): boolean {
  return variant.specs.phaseType === "three";
}

export function getPowerLabel(variant: ChargerVariant): string {
  return `${variant.specs.maxPowerKw}kW`;
}
