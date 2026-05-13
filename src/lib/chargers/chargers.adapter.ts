// /lib/chargers/chargers.adapter.ts

import { ChargerVariant } from "./chargers.type";

type Feature = {
  key: string;
  label: string;
};

type Variant = {
  id: string;
  name: string;
  price: number | string;
  highlight?: boolean;
  values: Record<string, string | boolean | undefined>;
};

type Product = {
  id: string;
  name: string;
  features: Feature[];
  variants: Variant[];
};

/* ---------------- Features ---------------- */

const FEATURES: Feature[] = [
  { key: "power", label: "Potencia máxima" },
  { key: "phase", label: "Tipo de fase" },
  { key: "connector", label: "Conector" },
  { key: "cable", label: "Cable" },
  { key: "mount", label: "Instalación" },
  { key: "app", label: "App móvil" },
  { key: "ip", label: "Protección IP" },
];

/* ---------------- Formatters ---------------- */

function formatPhase(type: string) {
  return type === "single" ? "Monofásico" : "Trifásico";
}

function formatCable(type: string) {
  return type === "integrated" ? "Cable integrado" : "Socket";
}

function formatMount(type: string) {
  return type === "wall" ? "Pared" : "Columna";
}

/* ---------------- Adapter ---------------- */

export function mapChargerVariantsToProduct(
  variants: ChargerVariant[],
): Product {
  return {
    id: "chargers",
    name: "Cargadores",
    features: FEATURES,

    variants: variants.map((v) => ({
      id: v.key,
      name: v.publicName,
      price: v.price?.amount ?? "-",
      highlight: v.featured,

      values: {
        power: `${v.specs.maxPowerKw} kW`,
        phase: formatPhase(v.specs.phaseType),
        connector: "Tipo 2",
        cable: formatCable(v.specs.cableType),
        mount: formatMount(v.specs.mountType),
        app: v.specs.appControl,
        ip: v.specs.ingressProtection,
      },
    })),
  };
}
