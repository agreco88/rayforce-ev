/* ------------------------------------------------------------------ */
/* Rayforce – Chargers Data                                           */
/* ------------------------------------------------------------------ */

import { ChargerFamily } from "./chargers.type";

// BS-20 : Three variants
export const CHARGER_FAMILIES: ChargerFamily[] = [
  {
    key: "bs20",
    slug: "bs20",

    brand: "BESEN",
    familyName: "BS20",
    publicName: "Cargadores EV BS20",

    featured: true,

    summary:
      "Cargadores eléctricos tipo wallbox con cable integrado para hogares y empresas en Uruguay.",

    description:
      "La línea BS20 ofrece soluciones de carga para autos eléctricos con control desde app, instalación mural y versiones monofásicas y trifásicas.",

    coverImage: "/assets/images/chargers/bs20-bc-7kw-card.avif",
    gallery: ["/assets/images/chargers/bs20-bc-7kw-card.avif"],

    useCases: ["home", "office", "commercial"],

    variants: [
      {
        key: "bs20-bc-7kw-app",
        slug: "bs20-bc-7kw",
        modelCode: "BS20-BC-7KW-APP",

        publicName: "Residencial 7kW",
        shortName: "7kW",

        featured: true,

        headline: "Cargador eléctrico 7kW para autos en Uruguay",
        subheadline:
          "Ideal para hogares y carga diaria con instalación simple y segura.",

        description:
          "Cargador wallbox monofásico, ideal para uso de carga residencial durante la noche.",

        intendedUse: ["home"],

        badges: ["Monofásico", "Tipo 2", "App", "IP65"],

        heroImage: "/assets/images/chargers/bs20-bc-7kw-card.avif",
        images: ["/assets/images/chargers/bs20-bc-7kw-card.avif"],

        specs: {
          maxPowerKw: 7,
          phaseType: "single",
          connectorType: "type_2",
          cableType: "integrated",
          mountType: "wall",

          nominalCurrentA: 32,
          voltage: "220–230V",
          frequencyHz: 50,

          dimensionsMm: "295×195×65",
          weightKg: 7,

          ingressProtection: "IP65",
          operatingTemperature: "-25°C to +55°C",

          display: true,
          appControl: true,
          bluetooth: true,
          rcdProtection: true,
        },
      },

      {
        key: "bs20-bc-22kw-app",
        slug: "bs20-bc-22kw",
        modelCode: "BS20-BC-22KW-APP",

        publicName: "Comercial 22kW",
        shortName: "22kW",

        headline: "Cargador eléctrico 22kW para autos en Uruguay",

        description:
          "Máxima potencia para hogares con más de un auto o cuando necesitás cargar más rápido.",
        subheadline: "Ideal para más de un vehículo o carga extra.",

        intendedUse: ["commercial"],

        badges: ["Trifásico", "Tipo 2", "App"],

        heroImage: "/assets/images/chargers/bs20-bc-22kw-card.avif",
        images: ["/assets/images/chargers/bs20-bc-22kw-card.avif"],

        specs: {
          maxPowerKw: 22,
          phaseType: "three",
          connectorType: "type_2",
          cableType: "integrated",
          mountType: "wall",

          nominalCurrentA: 32,
          voltage: "380–400V",

          ingressProtection: "IP65",

          display: true,
          appControl: true,
          bluetooth: true,
          rcdProtection: true,
        },
      },
    ],
  },
];
