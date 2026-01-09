export type ProductKey = "cortinas" | "persianas" | "toldos" | "cerramientos";

export type ProductDefinition = {
  key: ProductKey;
  href: string;
  posterSrc: string;
  videoSrc?: string;
  mirror?: boolean;
};

export const PRODUCTS: ProductDefinition[] = [
  {
    key: "cortinas",
    href: "/windoors/cortinas",
    posterSrc: "/images/curtains-card-poster.webp",
    videoSrc: "/videos/curtains-card-video.mp4",
    mirror: true,
  },
  {
    key: "persianas",
    href: "/windoors/persianas",
    posterSrc: "/images/blinds-card-poster.webp",
    videoSrc: "/videos/blinds-card-video.mp4",
  },
  {
    key: "toldos",
    href: "/windoors/toldos",
    posterSrc: "/images/toldos-card-poster.webp",
    videoSrc: "/videos/toldos-card-video.mp4",
  },
  {
    key: "cerramientos",
    href: "/windoors/cerramientos",
    posterSrc: "/images/pvc-card-poster.webp",
    videoSrc: "/videos/pvc-card-video.mp4",
  },
];

/* ------------------------------------------------------------------
 * Rayforce – Products data (LAB)
 * ---------------------------------------------------------------- */

export type ChargerKey = "residential" | "commercial";

export type ChargerDefinition = {
  key: ChargerKey;

  /** High-level positioning (Residencial / Comercial) */
  roleLabel: string;

  /** Product model name */
  modelLabel: string;

  /** Optional visual emphasis */
  featured?: boolean;

  /** Short description shown in product showcase */
  description: string;
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
      "Cargador inteligente para vehículos eléctricos, ideal para hogares y pequeños comercios.",
  },

  {
    key: "commercial",
    roleLabel: "Comercial",
    modelLabel: "BS20-BC",

    featured: false,
    price: "USD 1.690",

    description:
      "Configuración avanzada pensada para instalaciones compartidas o semi-públicas.",
  },
];

/* ------------------------------------------------------------------
 * Comparison data
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
          residential: "7,4 kW / 22 kW",
          commercial: "7,4 kW / 22 kW",
        },
      },
      {
        name: "Tipo de fase",
        tiers: {
          residential: "Monofásico / Trifásico",
          commercial: "Trifásico",
        },
      },
      {
        name: "Corriente nominal",
        tiers: {
          residential: "32 A",
          commercial: "32 A",
        },
      },
      {
        name: "Pantalla integrada",
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
        name: "Acceso por RFID",
        tiers: {
          residential: false,
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
      {
        name: "Actualizaciones de firmware",
        tiers: {
          residential: true,
          commercial: true,
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
        },
      },
      {
        name: "Uso comercial o compartido",
        tiers: {
          residential: false,
          commercial: true,
        },
      },
      {
        name: "Montaje en pared",
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
          residential: "IP65",
          commercial: "IP65",
        },
      },
      {
        name: "Temperatura de operación",
        tiers: {
          residential: "-25 °C a +55 °C",
          commercial: "-25 °C a +55 °C",
        },
      },
    ],
  },
];
