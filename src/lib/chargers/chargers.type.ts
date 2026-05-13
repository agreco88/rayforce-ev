/* ------------------------------------------------------------------ */
/* Rayforce – Chargers Types                                          */
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

export type AvailabilityStatus = "active" | "coming_soon" | "discontinued";

export type ChargerUseCase =
  | "home"
  | "apartment"
  | "office"
  | "commercial"
  | "fleet";

/* ---------------- Specs ---------------- */

export type ChargerSpecs = {
  // 🔴 Core (REQUIRED)
  maxPowerKw: number;
  phaseType: PhaseType;
  connectorType: ConnectorType;
  cableType: CableType;
  mountType: MountType;

  // ⚡ Electrical
  nominalCurrentA?: number;
  voltage?: string;
  frequencyHz?: number;

  // 📦 Physical
  cableLengthM?: number;
  dimensionsMm?: string;
  weightKg?: number;

  // 🛡️ Protection
  ingressProtection?: string;
  impactProtection?: string;
  operatingTemperature?: string;

  // 🔌 Smart features
  display?: boolean;
  appControl?: boolean;
  wifi?: boolean;
  bluetooth?: boolean;
  loadBalancing?: boolean;
  rcdProtection?: boolean;
};

/* ---------------- Variant ---------------- */

export type ChargerVariant = {
  key: string;
  slug: string;
  modelCode: string;

  publicName: string;
  shortName: string;

  featured?: boolean;
  status?: AvailabilityStatus;

  headline: string;
  subheadline?: string;
  description: string;

  intendedUse?: ChargerUseCase[];

  price?: PriceDefinition;

  badges?: string[];
  heroImage: string;
  images: string[];
  videos?: string[];

  specs: ChargerSpecs;
};

/* ---------------- Family ---------------- */

export type ChargerFamily = {
  key: string;
  slug: string;

  brand: string;
  familyName: string;
  publicName: string;

  featured?: boolean;

  summary: string;
  description: string;

  coverImage: string;
  gallery: string[];

  useCases: ChargerUseCase[];

  variants: ChargerVariant[];
};
