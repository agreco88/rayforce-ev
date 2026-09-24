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
export type ChargerTier = "residential" | "commercial" | "industrial";

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

  /** Ficha tecnica: lo que la tabla de specs muestra y el strip no. */
  currentAdjustable?: boolean;
  connectorStandard?: string;
  /** Texto largo: lista las protecciones electricas separadas por coma. */
  electricalProtection?: string;
  rcdConfiguration?: string;
  displaySize?: string;
  ledIndicator?: boolean;
  /** Las que son "configuracion opcional" en la ficha del fabricante. */
  optionalFeatures?: ChargerOptionalFeature[];
  connectivity?: string;
  certifications?: string[];
};

/**
 * Funciones que el equipo soporta pero que no vienen de fabrica: la ficha del
 * fabricante las lista como "Optional Configuration". Se muestran aparte de
 * las specs fijas para no prometer algo que la unidad enviada no trae.
 */
export type ChargerOptionalFeature =
  | "app"
  | "rfid"
  | "loadBalancing"
  | "solar"
  | "ocpp";

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

  /** e.g. "3 x 6.0 mm² + 1 x 0.75 mm²" */
  conductorSection?: string;
  jacketMaterial?: string;
  contactMaterial?: string;
  mechanicalLatch?: string;
  proximityResistorOhm?: number;
  certification?: string;
  standard?: string;
};

/**
 * Quien fabrica el producto y donde. Va en el catalogo y no en las
 * traducciones porque es un dato del producto, no copy: el nombre de la marca
 * y el pais no cambian de idioma. `countryCode` es ISO 3166-1 alpha-2, que es
 * lo que consume `react-world-flags` para dibujar la bandera.
 */
export type ProductOrigin = {
  manufacturer: string;
  countryCode: string;
  /** Sitio oficial del fabricante, al que linkea su logo en la ficha. */
  manufacturerUrl: string;
  /** Logo del fabricante, monocromo sobre transparente: la ficha lo invierte. */
  manufacturerLogo: string;
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

/**
 * Commercial highlight ("Más vendido", "Más popular", …) shown as a ribbon or
 * accent on any surface that lists the product. `labelKey` resolves under
 * `Catalog.highlights` in messages/{locale}.json, so the copy stays translated
 * and swapping a product's label never touches a component.
 */
export type ProductHighlight = {
  labelKey: "bestSeller" | "mostPopular" | "newArrival";
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
  /** Internal ranking flag: sitemap priority and the comparison table's emphasized column. */
  featured?: boolean;
  /** Commercial badge shown to users. Independent of `featured` — set it per product. */
  highlight?: ProductHighlight;

  price: PriceDefinition;
  badges?: string[];

  heroImage: string;
  images: string[];
  /**
   * PNG recortado sobre fondo transparente: grillas, header y tabla
   * comparativa, donde va sobre el fondo oscuro. En los cargadores no coincide
   * con `heroImage` (el render del catalogo), y por eso es un campo propio.
   */
  cardImage: string;
  /**
   * Foto sobre fondo blanco, para el container claro del hero 50/50. Va
   * aparte de `cardImage` porque el recorte transparente se pierde sobre
   * blanco, y el fondo blanco ensucia las grillas oscuras.
   */
  photoImage: string;
  /**
   * Correccion de escala para la plancha de la tarjeta, cuando el PNG viene
   * recortado mas ajustado que los demas y bajo `object-contain` se ve mas
   * grande que sus vecinos. Es un parche de encuadre: con todas las fotos
   * recortadas igual, se borra.
   */
  cardImageScale?: number;

  theme: CatalogTheme;
  mercadopagoUrl: string;
  datasheetUrl?: string;

  /** Va en `ProductBase` y no en cada categoria: cables y cargadores lo muestran igual. */
  origin: ProductOrigin;
};

/**
 * Un renglon del contenido de la caja. `key` resuelve bajo
 * `ChargerModelPage.Unboxing.contents` en messages/{locale}.json — aca solo
 * va la cantidad, para que la lista se traduzca sin tocar el catalogo.
 */
export type UnboxingItem = {
  key: string;
  quantity: number;
  /**
   * Renglon de exclusion: lo que la caja NO trae. Va en la misma lista y no
   * en un aviso aparte, porque el dato se busca aca — separarlo hace que se
   * lea la lista entera sin enterarse.
   */
  excluded?: boolean;
};

/**
 * Assets y contenido de la seccion de unboxing. El video existe para las dos
 * familias; la foto solo para los BC, porque lo que muestra es el cable
 * integrado enrollado en la caja y el BA no lo trae.
 */
export type UnboxingAssets = {
  videoSrc: string;
  photoSrc?: string;
  contents: UnboxingItem[];
};

export type ChargerProduct = ProductBase & {
  category: "charger";
  tier: ChargerTier;
  familyName: string;
  /** Agrupa las variantes que comparten caja y copy de unboxing. */
  family: "ba" | "bc";
  specs: ChargerSpecs;
  visual: ChargerVisualProps;
  ursea: UrseaRegistration;
  unboxing: UnboxingAssets;
};

export type CableProduct = ProductBase & {
  category: "cable";
  specs: CableSpecs;
};

export type CatalogProduct = ChargerProduct | CableProduct;
