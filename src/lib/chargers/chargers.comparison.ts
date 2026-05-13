import { ChargerVariant } from "./chargers.type";

export type ComparisonValue = string | boolean | undefined;

export type ComparisonRow = {
  label: string;
  getValue: (variant: ChargerVariant) => ComparisonValue;
};

export type ComparisonSection = {
  title: string;
  rows: ComparisonRow[];
};

export const CHARGER_COMPARISON: ComparisonSection[] = [
  {
    title: "Especificaciones principales",
    rows: [
      {
        label: "Potencia máxima",
        getValue: (v) => `${v.specs.maxPowerKw} kW`,
      },
      {
        label: "Tipo de fase",
        getValue: (v) =>
          v.specs.phaseType === "single" ? "Monofásico" : "Trifásico",
      },
      {
        label: "Corriente nominal",
        getValue: (v) =>
          v.specs.nominalCurrentA
            ? `${v.specs.nominalCurrentA} A por fase`
            : undefined,
      },
      {
        label: "Tensión típica",
        getValue: (v) => v.specs.voltage,
      },
    ],
  },
  {
    title: "Conectividad",
    rows: [
      {
        label: "Control desde app",
        getValue: (v) => v.specs.appControl,
      },
      {
        label: "Wi-Fi",
        getValue: (v) => v.specs.wifi,
      },
      {
        label: "Bluetooth",
        getValue: (v) => v.specs.bluetooth,
      },
    ],
  },
  {
    title: "Protección",
    rows: [
      {
        label: "Protección eléctrica",
        getValue: (v) => v.specs.rcdProtection,
      },
      {
        label: "Grado IP",
        getValue: (v) => v.specs.ingressProtection,
      },
      {
        label: "Temperatura",
        getValue: (v) => v.specs.operatingTemperature,
      },
    ],
  },
];
