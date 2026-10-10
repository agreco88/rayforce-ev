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
/** Resuelven bajo `Common.Specs.electricalProtection`. */
export type ElectricalProtection =
  | "overvoltage"
  | "undervoltage"
  | "overload"
  | "shortCircuit"
  | "groundFault"
  | "overtemperature"
  | "lightning";

export type ChargerSpecs = {
  maxPowerKw: number;
  phaseType: PhaseType;
  connectorType: ConnectorType;
  cableType: CableType;
  mountType: MountType;

  nominalCurrentA?: number;
  voltage?: string;
  /** Rango, e.g. "47–63". */
  frequencyHz?: string;

  cableLengthM?: number;
  dimensionsMm?: string;
  /** Rango, e.g. "6–8": la ficha no da un peso por variante. */
  weightKg?: string;

  ingressProtection?: string;
  impactProtection?: string;
  /** Minima y maxima en °C: el texto lo arma `Common.Specs.temperatureRange`. */
  operatingTemperatureC?: [min: number, max: number];
  /** Sin condensacion, e.g. "0–95%". */
  relativeHumidity?: string;
  maxAltitudeM?: number;
  naturalCooling?: boolean;
  /** Tope, no consumo medio: la ficha dice "<8W". */
  standbyPowerW?: number;

  display?: boolean;
  appControl?: boolean;
  bluetooth?: boolean;
  rcdProtection?: boolean;

  /** Ficha tecnica: lo que la tabla de specs muestra y el strip no. */
  currentAdjustable?: boolean;
  connectorStandard?: string;
  electricalProtection?: ElectricalProtection[];
  /** Resuelve bajo `Common.Specs.rcd`. */
  rcdConfiguration?: "typeA6mA";
  /** Diagonal en pulgadas: el texto lo arma `Common.Specs.displaySize`. */
  displaySizeIn?: number;
  ledIndicator?: boolean;
  connectivity?: string;
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
  /** Clase de inflamabilidad del material, e.g. "UL94". */
  fireRating?: string;
  /** Minima y maxima en °C: el texto lo arma `Common.Specs.temperatureRange`. */
  operatingTemperatureC?: [min: number, max: number];
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

  /** Va en `ProductBase` y no en cada categoria: cables y cargadores lo muestran igual. */
  origin: ProductOrigin;

  /**
   * Fuera de venta hasta que llegue el stock: los getters de `catalog.helpers`
   * lo filtran, asi que no se lista en ningun lado y su ruta da 404. Para
   * volver a venderlo, se borra la linea.
   */
  hidden?: boolean;
};

/**
 * La caja abierta, para la galeria del hero. La foto es de los BC: muestra el
 * cable integrado enrollado en la caja. El video del fabricante va solo en el
 * BA, que no tiene fotos propias; en los BC repetia lo que ya dice la foto.
 */
export type UnboxingAssets = {
  /** `poster` es el frame que hace de portada del video en la galeria del hero. */
  video?: { src: string; poster: string };
  photoSrc?: string;
};

/**
 * Un combo cargador + cable que se vende desde el hero. Lleva su propio link de
 * MercadoPago porque cada combo es una preferencia distinta; el precio sale
 * del cable en el catalogo.
 */
export type ChargerCableOption = {
  cableSlug: string;
  mercadopagoUrl: string;
};

export type ChargerProduct = ProductBase & {
  category: "charger";
  tier: ChargerTier;
  familyName: string;
  specs: ChargerSpecs;
  visual: ChargerVisualProps;
  ursea: UrseaRegistration;
  unboxing: UnboxingAssets;
  /** El combo cargador + columna, que es otra preferencia de MercadoPago. "" si no hay. */
  columnMercadopagoUrl: string;
  /** Solo los que salen con toma: los cables que se pueden sumar a la compra. */
  cableOptions?: ChargerCableOption[];
};

export type CableProduct = ProductBase & {
  category: "cable";
  specs: CableSpecs;
};

export type CatalogProduct = ChargerProduct | CableProduct;
