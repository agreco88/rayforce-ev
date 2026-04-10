// lib/data/charger-product.ts

import type { Product } from "@/lib/types/product";

export const chargerProduct: Product = {
  id: "bs20",
  name: "Rayforce BS20",

  features: [
    { key: "power", label: "Potencia máxima", type: "text" },
    { key: "phase", label: "Tipo de fase", type: "text" },
    { key: "current", label: "Corriente nominal", type: "text" },
    { key: "voltage", label: "Tensión típica", type: "text" },
    { key: "app", label: "Control mediante app móvil", type: "boolean" },
    { key: "protection", label: "Protección eléctrica", type: "boolean" },
    { key: "ip", label: "Grado de protección", type: "text" },
    { key: "temperature", label: "Temperatura de operación", type: "text" },
  ],

  variants: [
    {
      id: "residencial",
      name: "Residencial",
      price: 698,
      values: {
        power: "7.4 kW",
        phase: "Monofásico",
        current: "32 A por fase",
        voltage: "220–230 V",
        display: true,
        wallMount: true,
        app: true,
        connectivity: true,
        protection: true,
        ip: "IP65",
        temperature: "-25°C a +55°C",
      },
    },
    {
      id: "comercial",
      name: "Comercial",
      price: 828,
      highlight: true,
      values: {
        power: "11 kW",
        phase: "Trifásico",
        current: "16 A por fase",
        voltage: "380–400 V",
        display: true,
        wallMount: true,
        app: true,
        connectivity: true,
        protection: true,
        ip: "IP65",
        temperature: "-25°C a +55°C",
      },
    },
    {
      id: "industrial",
      name: "Industrial",
      price: 898,
      values: {
        power: "22 kW",
        phase: "Trifásico",
        current: "32 A por fase",
        voltage: "380–400 V",
        display: true,
        wallMount: true,
        app: true,
        connectivity: true,
        protection: true,
        ip: "IP65",
        temperature: "-25°C a +55°C",
      },
    },
  ],
};
