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

    coverImage: "/images/chargers/bs20/cover.webp",
    gallery: ["/images/chargers/bs20/01.webp", "/images/chargers/bs20/02.webp"],

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

        heroImage: "/images/7w/7w-hero-2.png",
        images: ["/images/7w/images/03.png"],

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
        key: "bs20-bc-11kw-app",
        slug: "bs20-bc-11kw",
        modelCode: "BS20-BC-11KW-APP",

        publicName: "Comercial 11kW",
        shortName: "11kW",

        headline: "Cargador eléctrico 11kW para autos en Uruguay",
        subheadline: "Ideal para comercios y zonas de carga constante.",
        description:
          "Versión trifásica intermedia, ideal para oficinas y uso compartido.",

        intendedUse: ["office", "commercial"],

        badges: ["Trifásico", "Tipo 2", "App"],

        heroImage: "/images/11w/hero-1.png",
        images: ["/images/11w/01.png"],

        specs: {
          maxPowerKw: 11,
          phaseType: "three",
          connectorType: "type_2",
          cableType: "integrated",
          mountType: "wall",

          nominalCurrentA: 16,
          voltage: "380–400V",

          ingressProtection: "IP65",

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

        publicName: "Industrial EV 22kW",
        shortName: "22kW",

        headline: "Cargador eléctrico 22kW para autos en Uruguay",

        description:
          "Máxima potencia para empresas, flotas y cargas intensivas.",
        subheadline: "Ideal para empresas y industrias de uso intensivo.",

        intendedUse: ["commercial", "fleet"],

        badges: ["Trifásico", "Tipo 2", "App"],

        heroImage: "/images/22w/hero-1.png",
        images: ["/images/22w/01.png"],

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
