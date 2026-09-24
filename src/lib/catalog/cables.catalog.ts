/* ------------------------------------------------------------------ */
/* Rayforce – Cable Catalog                                           */
/* ------------------------------------------------------------------ */
/*
 * Los dos rectos (BS-CHC003 y BS-CHC004) comparten foto a proposito: es el
 * mismo cable, cambia la potencia y no el aspecto. El espiralado tiene la suya
 * porque se ve distinto.
 *
 * mercadopagoUrl es "" en los 3 — el CTA de checkout renderiza deshabilitado
 * hasta que haya un link real de MercadoPago.
 */

import type { CableProduct } from "./catalog.types";

/** El ambar de la linea de cables. Exportado porque el listado tiñe con el
 *  mismo color el glow del hero y el FAQ, sin tener un producto a mano. */
export const CABLE_THEME: CableProduct["theme"] = {
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

/** Los tres cables son Besen, igual que la linea BS20: el prefijo `BS-` es suyo. */
const ORIGIN_BESEN: CableProduct["origin"] = {
  manufacturer: "Besen",
  countryCode: "CN",
  manufacturerUrl: "https://www.besen-group.com",
  manufacturerLogo: "/images/brand/besen-logo.png",
};

export const CABLE_PRODUCTS: CableProduct[] = [
  {
    category: "cable",
    slug: "bs-chc003",
    metadataKey: "chc003",
    modelCode: "BS-CHC003",
    publicName: "Cable recto Tipo 2 a Tipo 2, 7kW",
    shortName: "7kW · 5 m",

    price: { currency: "USD", amount: 220, taxLabel: "IVA Inc." },
    badges: ["Monofásico", "Tipo 2", "IP66"],

    heroImage: "/assets/images/cables/BS-CHC003.png",
    cardImage: "/assets/images/cables/BS-CHC003.png",
    photoImage: "/assets/images/cables/BS-CHC003.png",
    images: ["/assets/images/cables/BS-CHC003.png"],

    theme: CABLE_THEME,
    mercadopagoUrl: "",
    origin: ORIGIN_BESEN,

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
      conductorSection: "3 x 6.0 mm² + 1 x 0.75 mm²",
      jacketMaterial: "TPU negro",
      contactMaterial: "Aleación de cobre, plateados",
      mechanicalLatch: "Lateral, sin botón superior",
      proximityResistorOhm: 220,
      certification: "CE",
      standard: "EN 62196-2",
    },
  },

  {
    category: "cable",
    slug: "bs-chc004",
    metadataKey: "chc004",
    modelCode: "BS-CHC004",
    publicName: "Cable recto Tipo 2 a Tipo 2, 22kW",
    shortName: "22kW · 5 m",

    price: { currency: "USD", amount: 285, taxLabel: "IVA Inc." },
    badges: ["Trifásico", "Tipo 2", "IP66"],

    heroImage: "/assets/images/cables/BS-CHC003.png",
    cardImage: "/assets/images/cables/BS-CHC003.png",
    photoImage: "/assets/images/cables/BS-CHC003.png",
    images: ["/assets/images/cables/BS-CHC003.png"],

    theme: CABLE_THEME,
    mercadopagoUrl: "",
    origin: ORIGIN_BESEN,

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
      conductorSection: "5 x 6.0 mm² + 1 x 0.75 mm²",
      jacketMaterial: "TPU negro",
      contactMaterial: "Aleación de cobre, plateados",
      mechanicalLatch: "Lateral, sin botón superior",
      proximityResistorOhm: 220,
      certification: "CE",
      standard: "EN 62196-2",
    },
  },

  {
    category: "cable",
    slug: "bs-chc003-s",
    metadataKey: "chc003-s",
    modelCode: "BS-CHC003-S",
    publicName: "Cable espiral Tipo 2 a Tipo 2, 7kW",
    /* "espiral" y no solo los kW: es lo unico que lo distingue del BS-CHC003,
       que tambien es 7kW · 5 m. Sin eso los dos se leen igual en el footer, en
       la comparativa y en el mensaje de WhatsApp. */
    shortName: "7kW · 5 m espiral",
    highlight: { labelKey: "bestSeller" },

    price: { currency: "USD", amount: 235, taxLabel: "IVA Inc." },
    badges: ["Monofásico", "Tipo 2", "Espiralado", "IP66"],

    heroImage: "/assets/images/cables/BS-CHC003-S.png",
    cardImage: "/assets/images/cables/BS-CHC003-S.png",
    photoImage: "/assets/images/cables/BS-CHC003-S.png",
    images: ["/assets/images/cables/BS-CHC003-S.png"],
    /* Este PNG viene recortado al producto (1291x1218) y los otros dos son un
       cuadrado de 2300 con aire alrededor: sin achicarlo llena la plancha de
       punta a punta y al lado de sus vecinos se ve de otro tamaño. */
    cardImageScale: 0.7,

    theme: CABLE_THEME,
    mercadopagoUrl: "",
    origin: ORIGIN_BESEN,

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
      conductorSection: "3 x 6.0 mm² + 1 x 0.75 mm²",
      jacketMaterial: "TPU negro",
      contactMaterial: "Aleación de cobre, plateados",
      mechanicalLatch: "Lateral, sin botón superior",
      proximityResistorOhm: 220,
      certification: "CE",
      standard: "EN 62196-2",
    },
  },
];
