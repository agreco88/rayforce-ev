/* ------------------------------------------------------------------
 * Rayforce – Chargers catalogue
 * ---------------------------------------------------------------- */

export type ChargerKey = "residential" | "commercial" | "industrial";

export type ChargerDefinition = {
  key: ChargerKey;
  roleLabel: string;
  modelLabel: string;
  featured?: boolean;
  price: string;
  description: string;
  powerKw: number;
};

export const CHARGERS: ChargerDefinition[] = [
  {
    key: "residential",
    roleLabel: "Residencial",
    modelLabel: "BS20-BA",
    featured: true,
    price: "USD 799",
    powerKw: 7.4,
    description:
      "Cargador monofásico de 7,4 kW ideal para hogares y pequeños comercios.",
  },
  {
    key: "commercial",
    roleLabel: "Comercial",
    modelLabel: "BS20-BB",
    featured: false,
    price: "USD 1.199",
    powerKw: 11,
    description:
      "Cargador trifásico de 11 kW pensado para oficinas, edificios y uso compartido.",
  },
  {
    key: "industrial",
    roleLabel: "Industrial",
    modelLabel: "BS20-BC",
    featured: false,

    price: "USD 1.690",
    powerKw: 22.3,
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
          residential: "7_4_kw",
          commercial: "11_kw",
          industrial: "22_kw",
        },
      },
      {
        name: "Tipo de fase",
        tiers: {
          residential: "single_phase",
          commercial: "three_phase",
          industrial: "three_phase",
        },
      },
      {
        name: "Corriente nominal",
        tiers: {
          residential: "32a_per_phase",
          commercial: "16a_per_phase",
          industrial: "32a_per_phase",
        },
      },
      {
        name: "Tensión típica",
        tiers: {
          residential: "220_230_v",
          commercial: "380_400_v_3p",
          industrial: "380_400_v_3p",
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
      {
        name: "Materiales para fijación en pared",
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
        name: "Wi-Fi / Bluetooth",
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
          residential: "ip65",
          commercial: "ip65",
          industrial: "ip65",
        },
      },
      {
        name: "Temperatura de operación",
        tiers: {
          residential: "temp_range",
          commercial: "temp_range",
          industrial: "temp_range",
        },
      },
    ],
  },
];
