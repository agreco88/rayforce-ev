/* ------------------------------------------------------------------ */
/* Rayforce – Cable Catalog                                           */
/* ------------------------------------------------------------------ */
/*
 * Placeholder assets: heroImage/images point at
 * public/assets/images/cables/<slug>-card.avif, which do not exist yet
 * — the user is adding real product photos separately. mercadopagoUrl
 * is "" for all 3 — the checkout CTA renders disabled until a real
 * MercadoPago link is provided.
 */

import type { CableProduct } from "./catalog.types";

const THEME_AMBER: CableProduct["theme"] = {
  accentText: "text-amber-400",
  accentBg: "bg-amber-400",
  accentHover: "hover:bg-amber-300",
  divide: "divide-amber-400/10",
  gradientLine: "from-transparent via-amber-400 to-transparent",
  accentSoft: "bg-amber-400/10",
  accentBorder: "border-amber-400/30",
  accentBorderHover: "hover:border-amber-400/30",
  accentGradient: "from-amber-400 via-amber-500 to-orange-400",
  glow: "rgba(251,191,36,0.25)",
  glowStrong: "rgba(245,158,11,0.35)",
  check: "text-amber-400",
  highlight: "border-amber-900",
  accentRing: "ring-amber-400",
  gradientColors: ["#fbbf24", "#f59e0b", "#fb923c"],
};

export const CABLE_PRODUCTS: CableProduct[] = [
  {
    category: "cable",
    slug: "bs-chc003",
    metadataKey: "chc003",
    modelCode: "BS-CHC003",
    publicName: "Cable recto 7kW",
    shortName: "7kW · 5 m",

    price: { currency: "USD", amount: 220, taxLabel: "IVA Inc." },
    badges: ["Monofásico", "Tipo 2", "IP66"],

    heroImage: "/assets/images/cables/bs-chc003-card.avif",
    images: ["/assets/images/cables/bs-chc003-card.avif"],

    theme: THEME_AMBER,
    mercadopagoUrl: "",

    specs: {
      connectorType: "type_2",
      lengthM: 5,
      cableStyle: "straight",
      maxCurrentA: 32,
      maxPowerKw: 7,
      phaseType: "single",
      ingressProtection: "IP66",
      temperatureSensor: true,
      bagIncluded: true,
    },
  },

  {
    category: "cable",
    slug: "bs-chc004",
    metadataKey: "chc004",
    modelCode: "BS-CHC004",
    publicName: "Cable recto 22kW",
    shortName: "22kW · 5 m",

    price: { currency: "USD", amount: 285, taxLabel: "IVA Inc." },
    badges: ["Trifásico", "Tipo 2", "IP66"],

    heroImage: "/assets/images/cables/bs-chc004-card.avif",
    images: ["/assets/images/cables/bs-chc004-card.avif"],

    theme: THEME_AMBER,
    mercadopagoUrl: "",

    specs: {
      connectorType: "type_2",
      lengthM: 5,
      cableStyle: "straight",
      maxCurrentA: 32,
      maxPowerKw: 22,
      phaseType: "three",
      ingressProtection: "IP66",
      temperatureSensor: true,
      bagIncluded: true,
    },
  },

  {
    category: "cable",
    slug: "bs-chc003-s",
    metadataKey: "chc003-s",
    modelCode: "BS-CHC003-S",
    publicName: "Cable espiral 7kW",
    shortName: "7kW · 5 m",

    price: { currency: "USD", amount: 235, taxLabel: "IVA Inc." },
    badges: ["Monofásico", "Tipo 2", "Espiralado", "IP66"],

    heroImage: "/assets/images/cables/bs-chc003-s-card.avif",
    images: ["/assets/images/cables/bs-chc003-s-card.avif"],

    theme: THEME_AMBER,
    mercadopagoUrl: "",

    specs: {
      connectorType: "type_2",
      lengthM: 5,
      cableStyle: "coiled",
      maxCurrentA: 32,
      maxPowerKw: 7,
      phaseType: "single",
      ingressProtection: "IP66",
      temperatureSensor: true,
      bagIncluded: true,
    },
  },
];
