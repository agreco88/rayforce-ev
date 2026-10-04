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
 * Add-on price for the coiled cable (mirrors CABLE_PRODUCTS' cable-tipo-2-espiral-7kw),
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

/** Toda la linea BS20 la fabrica Besen. */
const ORIGIN_BESEN: ChargerProduct["origin"] = {
  manufacturer: "Besen",
  countryCode: "CN",
  manufacturerUrl: "https://www.besen-group.com",
  manufacturerLogo: "/images/brand/besen-logo.png",
};

/**
 * Specs de la ficha tecnica del fabricante que son identicas en las cuatro
 * variantes: lo que cambia entre modelos es potencia, fase y corriente, que
 * van en cada producto.
 */
const SPECS_BS20_COMMON = {
  frequencyHz: 50,
  currentAdjustable: true,
  connectorStandard: "SAE J1772 / IEC 62196-2 / GB/T",

  dimensionsMm: "295×195×65",

  ingressProtection: "IP66",
  impactProtection: "IK10",
  operatingTemperature: "-25°C to +55°C",
  rcdConfiguration: "Tipo A o Tipo A 30mA AC + 6mA DC",
  electricalProtection:
    "Subtensión, sobrecarga, cortocircuito, fuga a tierra, sobretemperatura y descargas atmosféricas",

  display: true,
  displaySize: "4.3\" LCD color",
  ledIndicator: true,
  appControl: true,
  bluetooth: true,
  rcdProtection: true,

  optionalFeatures: [
    "app",
    "rfid",
    "loadBalancing",
    "solar",
    "ocpp",
  ] as ChargerProduct["specs"]["optionalFeatures"],
  connectivity: "Bluetooth / Wi-Fi / Ethernet / 4G",
  certifications: ["CE", "FCC", "CSA", "RoHS", "REACH"],
} satisfies Partial<ChargerProduct["specs"]>;

/**
 * Contenido de la caja. Lo unico que cambia entre familias es el cable: el BC
 * lo trae integrado al equipo y el BA sale con toma, sin cable.
 */
const UNBOXING_CONTENTS_COMMON: ChargerProduct["unboxing"]["contents"] = [
  { key: "wallbox", quantity: 1 },
  { key: "mountingPlate", quantity: 1 },
  { key: "screwKit", quantity: 1 },
  { key: "drillTemplate", quantity: 1 },
  { key: "manual", quantity: 1 },
];

/** El cable va primero: es lo que distingue la caja del BC. */
const UNBOXING_CONTENTS_BC: ChargerProduct["unboxing"]["contents"] = [
  { key: "integratedCable", quantity: 1 },
  ...UNBOXING_CONTENTS_COMMON,
];

/**
 * El BA sale con toma y sin cable. La exclusion abre la lista: es el dato que
 * mas cambia la compra y el que se busca justamente aca.
 */
const UNBOXING_CONTENTS_BA: ChargerProduct["unboxing"]["contents"] = [
  { key: "noCable", quantity: 0, excluded: true },
  ...UNBOXING_CONTENTS_COMMON,
];

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
    publicName: "Wallbox Residencial Monofásico 7,2kW con toma Tipo 2",
    shortName: "7,2kW con toma",
    tier: "residential",
    familyName: "BS20",
    family: "ba",

    price: { currency: "USD", amount: 549, taxLabel: "IVA Inc." },
    badges: ["Monofásico", "Toma Tipo 2", "App", "IP66"],

    heroImage: "/assets/images/chargers/bs20-bc-7kw-card.avif",
    images: ["/assets/images/chargers/bs20-bc-7kw-card.avif"],
    cardImage: "/assets/images/chargers/BS20-7KW-SOCKET.png",
    photoImage: "/assets/images/chargers/bs20-ba-7kw.jpg",

    theme: THEME_CYAN,
    mercadopagoUrl: "",
    origin: ORIGIN_BESEN,

    specs: {
      ...SPECS_BS20_COMMON,
      maxPowerKw: 7.2,
      phaseType: "single",
      connectorType: "type_2",
      cableType: "socket",
      mountType: "wall",

      nominalCurrentA: 32,
      voltage: "220–230V",

      weightKg: 4.5,
    },

    visual: {
      powerKw: 7.2,
      variant: "residential",
      mode: "single",
      cableType: "socket",
    },
    ursea: URSEA,
    unboxing: {
      videoSrc: "/assets/videos/chargers/bs20-ba-unboxing.mp4",
      videoPoster: "/assets/images/chargers/bs20-ba-unboxing-poster.webp",
      // PLACEHOLDER: es la foto del BC, que muestra el cable integrado en la
      // caja — este modelo sale con toma y sin cable. Reemplazar cuando
      // llegue la foto del BA desempacado.
      photoSrc: "/assets/images/chargers/bs20-bc-7kw-unboxed.jpg",
      contents: UNBOXING_CONTENTS_BA,
    },
    // Los dos cables monofasicos de 7kW. Sin preferencia de MercadoPago
    // todavia: el hero cae a WhatsApp hasta que existan.
    cableOptions: [
      { cableSlug: "cable-tipo-2-7kw", mercadopagoUrl: "" },
      { cableSlug: "cable-tipo-2-espiral-7kw", mercadopagoUrl: "" },
    ],
  },

  {
    category: "charger",
    slug: "bs20-bc-7kw",
    metadataKey: "bc-7kw",
    modelCode: "BS20-BC-7KW-APP",
    publicName: "Wallbox Residencial Monofásico 7,2kW con cable integrado",
    shortName: "7,2kW",
    tier: "residential",
    familyName: "BS20",
    family: "bc",
    featured: true,
    highlight: { labelKey: "bestSeller" },

    price: { currency: "USD", amount: 597, taxLabel: "IVA Inc." },
    badges: ["Monofásico", "Tipo 2", "App", "IP66"],

    heroImage: "/assets/images/chargers/bs20-bc-7kw-card.avif",
    images: ["/assets/images/chargers/bs20-bc-7kw-card.avif"],
    cardImage: "/assets/images/chargers/BS20-7KW.png",
    photoImage: "/assets/images/chargers/bs20-bc-hero.jpg",

    theme: THEME_SKY,
    mercadopagoUrl: "http://mpago.la/1notnYD",
    origin: ORIGIN_BESEN,

    specs: {
      ...SPECS_BS20_COMMON,
      maxPowerKw: 7.2,
      phaseType: "single",
      connectorType: "type_2",
      cableType: "integrated",
      mountType: "wall",

      nominalCurrentA: 32,
      voltage: "220–230V",

      cableLengthM: 6,
      weightKg: 7,
    },

    visual: {
      powerKw: 7.2,
      variant: "residential",
      mode: "single",
      cableType: "integrated",
    },
    ursea: URSEA,
    unboxing: {
      videoSrc: "/assets/videos/chargers/bs20-bc-unboxing.mp4",
      videoPoster: "/assets/images/chargers/bs20-bc-unboxing-poster.webp",
      photoSrc: "/assets/images/chargers/bs20-bc-7kw-unboxed.jpg",
      contents: UNBOXING_CONTENTS_BC,
    },
  },

  {
    category: "charger",
    slug: "bs20-bc-11kw",
    metadataKey: "bc-11kw",
    modelCode: "BS20-BC-11KW-APP",
    publicName: "Wallbox Comercial Trifásico 11kW con cable integrado",
    shortName: "11kW",
    tier: "commercial",
    familyName: "BS20",
    family: "bc",

    price: { currency: "USD", amount: 649, taxLabel: "IVA Inc." },
    badges: ["Trifásico", "Tipo 2", "App", "IP66"],

    heroImage: "/assets/images/chargers/bs20-bc-22kw-card.avif",
    images: ["/assets/images/chargers/bs20-bc-22kw-card.avif"],
    // Sin foto propia todavia: reusa la del 7kW con cable, como ya hacian las
    // grillas — el equipo es el mismo, cambia la instalacion detras.
    cardImage: "/assets/images/chargers/BS20-7KW.png",
    photoImage: "/assets/images/chargers/bs20-bc-hero.jpg",

    theme: THEME_LIME_DARK,
    mercadopagoUrl: "",
    origin: ORIGIN_BESEN,

    specs: {
      ...SPECS_BS20_COMMON,
      maxPowerKw: 11,
      phaseType: "three",
      connectorType: "type_2",
      cableType: "integrated",
      mountType: "wall",

      nominalCurrentA: 16,
      voltage: "380–400V",

      cableLengthM: 6,
    },

    visual: {
      powerKw: 11,
      variant: "pro",
      mode: "multi",
      phases: 3,
      cableType: "integrated",
    },
    ursea: URSEA,
    unboxing: {
      videoSrc: "/assets/videos/chargers/bs20-bc-unboxing.mp4",
      videoPoster: "/assets/images/chargers/bs20-bc-unboxing-poster.webp",
      photoSrc: "/assets/images/chargers/bs20-bc-7kw-unboxed.jpg",
      contents: UNBOXING_CONTENTS_BC,
    },
  },

  {
    category: "charger",
    slug: "bs20-bc-22kw",
    metadataKey: "bc-22kw",
    modelCode: "BS20-BC-22KW-APP",
    publicName: "Wallbox Industrial Trifásico 22kW con cable integrado",
    shortName: "22kW",
    tier: "industrial",
    familyName: "BS20",
    family: "bc",

    price: { currency: "USD", amount: 728, taxLabel: "IVA Inc." },
    badges: ["Trifásico", "Tipo 2", "App", "IP66"],

    heroImage: "/assets/images/chargers/bs20-bc-22kw-card.avif",
    images: ["/assets/images/chargers/bs20-bc-22kw-card.avif"],
    cardImage: "/assets/images/chargers/BS20-22KW.png",
    photoImage: "/assets/images/chargers/bs20-bc-hero.jpg",

    theme: THEME_LIME_LIGHT,
    mercadopagoUrl: "https://mpago.la/2C6CFZe",
    origin: ORIGIN_BESEN,

    specs: {
      ...SPECS_BS20_COMMON,
      maxPowerKw: 22,
      phaseType: "three",
      connectorType: "type_2",
      cableType: "integrated",
      mountType: "wall",

      nominalCurrentA: 32,
      voltage: "380–400V",

      cableLengthM: 6,
    },

    visual: {
      powerKw: 22,
      variant: "pro",
      mode: "multi",
      phases: 3,
      cableType: "integrated",
    },
    ursea: URSEA,
    unboxing: {
      videoSrc: "/assets/videos/chargers/bs20-bc-unboxing.mp4",
      videoPoster: "/assets/images/chargers/bs20-bc-unboxing-poster.webp",
      photoSrc: "/assets/images/chargers/bs20-bc-7kw-unboxed.jpg",
      contents: UNBOXING_CONTENTS_BC,
    },
  },
];
