/* ------------------------------------------------------------------ */
/* Rayforce – Chargers catalogue                                      */
/* ------------------------------------------------------------------ */

export type ChargerKey = "residential" | "commercial";

export type PriceDefinition = {
  currency: "U$$";
  amount: number; // 659.99
  vatLabel?: string; // "IVA Inc"
};

export type ChargerDefinition = {
  key: ChargerKey;
  roleLabel: string;
  modelLabel: string;
  featured?: boolean;
  price: PriceDefinition;
  description: string;
  powerKw: number;
};

export const CHARGERS: ChargerDefinition[] = [
  {
    key: "residential",
    roleLabel: "Residencial",
    modelLabel: "BS20-BA",
    featured: true,
    price: {
      currency: "U$$",
      amount: 698,
      vatLabel: "IVA Inc",
    },
    powerKw: 7.4,
    description:
      "Cargador monofásico de 7,4 kW ideal para hogares y pequeños comercios.",
  },
  {
    key: "commercial",
    roleLabel: "Comercial",
    modelLabel: "BS20-BC",
    featured: false,
    price: {
      currency: "U$$",
      amount: 898,
      vatLabel: "IVA Inc",
    },
    powerKw: 22,
    description:
      "Cargador trifásico de 22 kW para empresas, flotas y uso intensivo.",
  },
];

/* ------------------------------------------------------------------ */
/* Comparison tables                                                   */
/* ------------------------------------------------------------------ */

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
          commercial: "22_kw",
        },
      },
      {
        name: "Tipo de fase",
        tiers: {
          residential: "single_phase",
          commercial: "three_phase",
        },
      },
      {
        name: "Corriente nominal",
        tiers: {
          residential: "32a_per_phase",
          commercial: "32a_per_phase",
        },
      },
      {
        name: "Tensión típica",
        tiers: {
          residential: "220_230_v",
          commercial: "380_400_v_3p",
        },
      },
      {
        name: "Pantalla integrada",
        tiers: {
          residential: true,
          commercial: true,
        },
      },
      {
        name: "Materiales para fijación en pared",
        tiers: {
          residential: true,
          commercial: true,
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
        },
      },
      {
        name: "Wi-Fi / Bluetooth",
        tiers: {
          residential: true,
          commercial: true,
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
        },
      },
      {
        name: "Grado de protección",
        tiers: {
          residential: "ip65",
          commercial: "ip65",
        },
      },
      {
        name: "COLUMNA",
        tiers: {
          residential: "temp_range",
          commercial: "temp_range",
        },
      },
    ],
  },
];
