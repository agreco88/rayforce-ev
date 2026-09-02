/* ------------------------------------------------------------------ */
/* Rayforce – Charger Catalog                                         */
/* ------------------------------------------------------------------ */
/*
 * Placeholder assets: bs20-ba-7kw and bs20-bc-11kw reuse the closest
 * sibling's product photo (heroImage/images) until real photography is
 * supplied. mercadopagoUrl is "" for both — the checkout CTA renders
 * disabled until a real MercadoPago link is provided.
 */

import type { ChargerProduct } from "./catalog.types";

/** Flat "charger + installation" bundle price shown by the installation toggle on model pages. */
export const CHARGER_INSTALLATION_PRICE_USD = 1699;

/**
 * Add-on price for the coiled cable (mirrors CABLE_PRODUCTS' bs-chc003-s),
 * shown by the "Sin cable / Con cable enrulado" toggle on bs20-ba-7kw
 * (the only charger sold with a bare socket, no cable included).
 */
export const CHARGER_COILED_CABLE_PRICE_USD = 235;

/**
 * Add-on price for the floor mounting post/column, shown by the
 * "Sin columna / Con columna" toggle on all charger model pages.
 */
export const CHARGER_COLUMN_PRICE_USD = 159;

const URSEA: ChargerProduct["ursea"] = {
  authNumber: "VU-SE-17-000123",
  holder: "BAMIBEL S.A.",
};

const THEME_SKY: ChargerProduct["theme"] = {
  accentText: "text-sky-400",
  accentBg: "bg-sky-400",
  accentHover: "hover:bg-sky-300",
  divide: "divide-sky-400/10",
  gradientLine: "from-transparent via-sky-400 to-transparent",
  accentSoft: "bg-sky-400/10",
  accentBorder: "border-sky-400/30",
  accentBorderHover: "hover:border-sky-400/30",
  accentGradient: "from-sky-400 via-sky-400 to-teal-400",
  glow: "rgba(56,189,248,0.25)",
  glowStrong: "rgba(20,184,166,0.35)",
  check: "text-sky-400",
  highlight: "border-sky-900",
  accentRing: "ring-sky-400",
  gradientColors: ["#38bdf8", "#38bdf8", "#2dd4bf"],
};

const THEME_CYAN: ChargerProduct["theme"] = {
  accentText: "text-cyan-400",
  accentBg: "bg-cyan-400",
  accentHover: "hover:bg-cyan-300",
  divide: "divide-cyan-400/10",
  gradientLine: "from-transparent via-cyan-400 to-transparent",
  accentSoft: "bg-cyan-400/10",
  accentBorder: "border-cyan-400/30",
  accentBorderHover: "hover:border-cyan-400/30",
  accentGradient: "from-cyan-400 via-cyan-500 to-sky-400",
  glow: "rgba(34,211,238,0.25)",
  glowStrong: "rgba(6,182,212,0.35)",
  check: "text-cyan-400",
  highlight: "border-cyan-900",
  accentRing: "ring-cyan-400",
  gradientColors: ["#22d3ee", "#06b6d4", "#38bdf8"],
};

const THEME_LIME_DARK: ChargerProduct["theme"] = {
  accentText: "text-green-400",
  accentBg: "bg-green-400",
  accentHover: "hover:bg-green-300",
  divide: "divide-green-400/10",
  gradientLine: "from-transparent via-green-400 to-transparent",
  accentSoft: "bg-green-400/10",
  accentBorder: "border-green-400/30",
  accentBorderHover: "hover:border-green-400/30",
  accentGradient: "from-green-400 via-green-400 to-lime-400",
  glow: "rgba(74,222,128,0.25)",
  glowStrong: "rgba(34,197,94,0.35)",
  check: "text-green-400",
  highlight: "border-green-900",
  accentRing: "ring-green-400",
  gradientColors: ["#4ade80", "#4ade80", "#a3e635"],
};

const THEME_LIME_LIGHT: ChargerProduct["theme"] = {
  accentText: "text-lime-400",
  accentBg: "bg-lime-400",
  accentHover: "hover:bg-lime-300",
  divide: "divide-lime-400/10",
  gradientLine: "from-transparent via-lime-400 to-transparent",
  accentSoft: "bg-lime-400/10",
  accentBorder: "border-lime-400/30",
  accentBorderHover: "hover:border-lime-400/30",
  accentGradient: "from-lime-400 via-lime-400 to-green-400",
  glow: "rgba(163,230,53,0.25)",
  glowStrong: "rgba(132,204,22,0.35)",
  check: "text-lime-400",
  highlight: "border-lime-900",
  accentRing: "ring-lime-400",
  gradientColors: ["#a3e635", "#a3e635", "#4ade80"],
};

export const CHARGER_PRODUCTS: ChargerProduct[] = [
  {
    category: "charger",
    slug: "bs20-ba-7kw",
    metadataKey: "ba-7kw",
    modelCode: "BS20-BA-7KW-APP",
    publicName: "Residencial 7,2kW con toma",
    shortName: "7,2kW con toma",
    tier: "residential",
    familyName: "BS20",

    price: { currency: "USD", amount: 549, taxLabel: "IVA Inc." },
    badges: ["Monofásico", "Toma Tipo 2", "App", "IP66"],

    heroImage: "/assets/images/chargers/bs20-bc-7kw-card.avif",
    images: ["/assets/images/chargers/bs20-bc-7kw-card.avif"],

    theme: THEME_CYAN,
    mercadopagoUrl: "",
    datasheetUrl: "/assets/docs/bs20-ficha-tecnica.pdf",

    specs: {
      maxPowerKw: 7.2,
      phaseType: "single",
      connectorType: "type_2",
      cableType: "socket",
      mountType: "wall",

      nominalCurrentA: 32,
      voltage: "220–230V",
      frequencyHz: 50,

      weightKg: 4.5,

      ingressProtection: "IP66",
      impactProtection: "IK10",
      operatingTemperature: "-25°C to +55°C",

      display: true,
      appControl: true,
      bluetooth: true,
      rcdProtection: true,
    },

    visual: {
      powerKw: 7.2,
      variant: "residential",
      mode: "single",
      cableType: "socket",
    },
    ursea: URSEA,
  },

  {
    category: "charger",
    slug: "bs20-bc-7kw",
    metadataKey: "bc-7kw",
    modelCode: "BS20-BC-7KW-APP",
    publicName: "Residencial 7,2kW",
    shortName: "7,2kW",
    tier: "residential",
    familyName: "BS20",
    featured: true,

    price: { currency: "USD", amount: 597, taxLabel: "IVA Inc." },
    badges: ["Monofásico", "Tipo 2", "App", "IP66"],

    heroImage: "/assets/images/chargers/bs20-bc-7kw-card.avif",
    images: ["/assets/images/chargers/bs20-bc-7kw-card.avif"],

    theme: THEME_SKY,
    mercadopagoUrl: "http://mpago.la/1notnYD",
    datasheetUrl: "/assets/docs/bs20-ficha-tecnica.pdf",

    specs: {
      maxPowerKw: 7.2,
      phaseType: "single",
      connectorType: "type_2",
      cableType: "integrated",
      mountType: "wall",

      nominalCurrentA: 32,
      voltage: "220–230V",
      frequencyHz: 50,

      cableLengthM: 6,
      dimensionsMm: "295×195×65",
      weightKg: 7,

      ingressProtection: "IP66",
      impactProtection: "IK10",
      operatingTemperature: "-25°C to +55°C",

      display: true,
      appControl: true,
      bluetooth: true,
      rcdProtection: true,
    },

    visual: {
      powerKw: 7.2,
      variant: "residential",
      mode: "single",
      cableType: "integrated",
    },
    ursea: URSEA,
  },

  {
    category: "charger",
    slug: "bs20-bc-11kw",
    metadataKey: "bc-11kw",
    modelCode: "BS20-BC-11KW-APP",
    publicName: "Trifásico 11kW",
    shortName: "11kW",
    tier: "commercial",
    familyName: "BS20",

    price: { currency: "USD", amount: 649, taxLabel: "IVA Inc." },
    badges: ["Trifásico", "Tipo 2", "App", "IP66"],

    heroImage: "/assets/images/chargers/bs20-bc-22kw-card.avif",
    images: ["/assets/images/chargers/bs20-bc-22kw-card.avif"],

    theme: THEME_LIME_DARK,
    mercadopagoUrl: "",
    datasheetUrl: "/assets/docs/bs20-ficha-tecnica.pdf",

    specs: {
      maxPowerKw: 11,
      phaseType: "three",
      connectorType: "type_2",
      cableType: "integrated",
      mountType: "wall",

      nominalCurrentA: 16,
      voltage: "380–400V",
      frequencyHz: 50,

      cableLengthM: 6,

      ingressProtection: "IP66",
      impactProtection: "IK10",
      operatingTemperature: "-25°C to +55°C",

      display: true,
      appControl: true,
      bluetooth: true,
      rcdProtection: true,
    },

    visual: {
      powerKw: 11,
      variant: "pro",
      mode: "multi",
      phases: 3,
      cableType: "integrated",
    },
    ursea: URSEA,
  },

  {
    category: "charger",
    slug: "bs20-bc-22kw",
    metadataKey: "bc-22kw",
    modelCode: "BS20-BC-22KW-APP",
    publicName: "Comercial 22kW",
    shortName: "22kW",
    tier: "commercial",
    familyName: "BS20",

    price: { currency: "USD", amount: 728, taxLabel: "IVA Inc." },
    badges: ["Trifásico", "Tipo 2", "App", "IP66"],

    heroImage: "/assets/images/chargers/bs20-bc-22kw-card.avif",
    images: ["/assets/images/chargers/bs20-bc-22kw-card.avif"],

    theme: THEME_LIME_LIGHT,
    mercadopagoUrl: "https://mpago.la/2C6CFZe",
    datasheetUrl: "/assets/docs/bs20-ficha-tecnica.pdf",

    specs: {
      maxPowerKw: 22,
      phaseType: "three",
      connectorType: "type_2",
      cableType: "integrated",
      mountType: "wall",

      nominalCurrentA: 32,
      voltage: "380–400V",
      frequencyHz: 50,

      cableLengthM: 6,

      ingressProtection: "IP66",
      impactProtection: "IK10",
      operatingTemperature: "-25°C to +55°C",

      display: true,
      appControl: true,
      bluetooth: true,
      rcdProtection: true,
    },

    visual: {
      powerKw: 22,
      variant: "pro",
      mode: "multi",
      phases: 3,
      cableType: "integrated",
    },
    ursea: URSEA,
  },
];
