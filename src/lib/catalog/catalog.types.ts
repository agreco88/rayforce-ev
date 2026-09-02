/* ------------------------------------------------------------------ */
/* Rayforce – Catalog Types                                           */
/* ------------------------------------------------------------------ */

export type PriceDefinition = {
  currency: "USD";
  amount: number;
  taxLabel?: string;
};

export type PhaseType = "single" | "three";
export type MountType = "wall" | "pole";
export type CableType = "integrated" | "socket";
export type ConnectorType = "type_2";
export type ChargerTier = "residential" | "commercial";

export type ChargerSpecs = {
  maxPowerKw: number;
  phaseType: PhaseType;
  connectorType: ConnectorType;
  cableType: CableType;
  mountType: MountType;

  nominalCurrentA?: number;
  voltage?: string;
  frequencyHz?: number;

  cableLengthM?: number;
  dimensionsMm?: string;
  weightKg?: number;

  ingressProtection?: string;
  impactProtection?: string;
  operatingTemperature?: string;

  display?: boolean;
  appControl?: boolean;
  bluetooth?: boolean;
  rcdProtection?: boolean;
};

export type CableStyle = "straight" | "coiled";

export type CableSpecs = {
  connectorType: ConnectorType;
  lengthM: number;
  cableStyle: CableStyle;
  maxCurrentA?: number;
  maxPowerKw?: number;
  phaseType?: PhaseType;
  ingressProtection?: string;
  impactProtection?: string;
  temperatureSensor?: boolean;
  bagIncluded?: boolean;
};

/** Regulatory registration under URSEA — chargers only, never cables. */
export type UrseaRegistration = {
  authNumber: string;
  holder: string;
};

/**
 * All literal Tailwind class strings. Tailwind v4's JIT scanner only
 * discovers classes that appear verbatim in source — never interpolate
 * these from a color variable, always hand-write a full set per product.
 */
export type CatalogTheme = {
  accentText: string;
  accentBg: string;
  accentHover: string;
  divide: string;
  gradientLine: string;
  accentSoft: string;
  accentBorder: string;
  accentBorderHover: string;
  accentGradient: string;
  glow: string;
  glowStrong: string;
  check: string;
  highlight: string;
  accentRing: string;
  /** Raw hex stops (not Tailwind classes) mirroring accentGradient, for inline-style animated gradients like GradientText. */
  gradientColors: [string, string, string];
};

export type ChargerVisualProps = {
  powerKw: number;
  variant: "residential" | "pro";
  mode: "single" | "multi";
  phases?: 1 | 2 | 3;
  cableType?: CableType;
};

type ProductBase = {
  slug: string;
  /** Route key for messages/metadata/{locale}.json — distinct per product, avoids shortName collisions. */
  metadataKey: string;
  modelCode: string;
  publicName: string;
  shortName: string;
  featured?: boolean;

  price: PriceDefinition;
  badges?: string[];

  heroImage: string;
  images: string[];

  theme: CatalogTheme;
  mercadopagoUrl: string;
  datasheetUrl?: string;
};

export type ChargerProduct = ProductBase & {
  category: "charger";
  tier: ChargerTier;
  familyName: string;
  specs: ChargerSpecs;
  visual: ChargerVisualProps;
  ursea: UrseaRegistration;
};

export type CableProduct = ProductBase & {
  category: "cable";
  specs: CableSpecs;
};

export type CatalogProduct = ChargerProduct | CableProduct;
