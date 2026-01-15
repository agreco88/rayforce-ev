/* ------------------------------------------------------------------
 * Rayforce – Chargers catalogue
 * ---------------------------------------------------------------- */

export type ChargerKey = "residential" | "commercial" | "industrial";

export type ChargerDefinition = {
  /** Internal identifier */
  key: ChargerKey;

  /** Tier / positioning label shown in UI */
  roleLabel: string;

  /** Manufacturer model name */
  modelLabel: string;

  /** Highlight this tier in UI */
  featured?: boolean;

  /** Short marketing description */
  description: string;

  /** Display price */
  price: string;
};

export const CHARGERS: ChargerDefinition[] = [
  {
    key: "residential",
    roleLabel: "Residencial",
    modelLabel: "BS20-BA",
    featured: true,
    price: "USD 1.290",
    description:
      "Cargador monofásico de 7,4 kW ideal para hogares y pequeños comercios.",
  },
  {
    key: "commercial",
    roleLabel: "Comercial",
    modelLabel: "BS20-BB",
    price: "USD 1.590",
    description:
      "Cargador trifásico de 11 kW pensado para oficinas, edificios y uso compartido.",
  },
  {
    key: "industrial",
    roleLabel: "Industrial",
    modelLabel: "BS20-BC",
    price: "USD 1.990",
    description:
      "Cargador trifásico de 22 kW diseñado para flotas, industrias y uso intensivo.",
  },
];

/* ------------------------------------------------------------------
 * Comparison tables
 * ---------------------------------------------------------------- */

export type ComparisonValue = string | boolean;

export type ComparisonFeature = {
  name: string;
  tiers: Record<ChargerKey, ComparisonValue>;
};

export type ComparisonSection = {
  name: string;
  features: ComparisonFeature[];
};

export const COMPARISON_SECTIONS: ComparisonSection[] = [
  {
    name: "Especificaciones principales",
    features: [
      {
        name: "Potencia máxima",
        tiers: {
          residential: "7,4 kW",
          commercial: "11 kW",
          industrial: "22 kW",
        },
      },
      {
        name: "Tipo de fase",
        tiers: {
          residential: "Monofásico",
          commercial: "Trifásico",
          industrial: "Trifásico",
        },
      },
      {
        name: "Corriente nominal",
        tiers: {
          residential: "32 A",
          commercial: "16 A",
          industrial: "32 A",
        },
      },
      {
        name: "Pantalla integrada",
        tiers: {
          residential: true,
          commercial: true,
          industrial: true,
        },
      },
    ],
  },
  {
    name: "Conectividad y control",
    features: [
      {
        name: "Control mediante app móvil",
        tiers: {
          residential: true,
          commercial: true,
          industrial: true,
        },
      },
      {
        name: "Acceso por RFID",
        tiers: {
          residential: false,
          commercial: true,
          industrial: true,
        },
      },
      {
        name: "Wi-Fi / Bluetooth",
        tiers: {
          residential: true,
          commercial: true,
          industrial: true,
        },
      },
      {
        name: "Actualizaciones de firmware",
        tiers: {
          residential: true,
          commercial: true,
          industrial: true,
        },
      },
    ],
  },
  {
    name: "Instalación y uso",
    features: [
      {
        name: "Uso residencial",
        tiers: {
          residential: true,
          commercial: false,
          industrial: false,
        },
      },
      {
        name: "Uso comercial o compartido",
        tiers: {
          residential: false,
          commercial: true,
          industrial: true,
        },
      },
      {
        name: "Uso industrial / flotas",
        tiers: {
          residential: false,
          commercial: false,
          industrial: true,
        },
      },
      {
        name: "Montaje en pared",
        tiers: {
          residential: true,
          commercial: true,
          industrial: true,
        },
      },
    ],
  },
  {
    name: "Protección y entorno",
    features: [
      {
        name: "Protección eléctrica integrada",
        tiers: {
          residential: true,
          commercial: true,
          industrial: true,
        },
      },
      {
        name: "Grado de protección",
        tiers: {
          residential: "IP65",
          commercial: "IP65",
          industrial: "IP65",
        },
      },
      {
        name: "Temperatura de operación",
        tiers: {
          residential: "-25 °C a +55 °C",
          commercial: "-25 °C a +55 °C",
          industrial: "-25 °C a +55 °C",
        },
      },
    ],
  },
];
