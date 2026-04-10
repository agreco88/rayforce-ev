// lib/types/product.ts

export type ChargerFeatureKey =
  | "power"
  | "phase"
  | "current"
  | "voltage"
  | "display"
  | "wallMount"
  | "app"
  | "connectivity"
  | "protection"
  | "ip"
  | "temperature";

export type Feature = {
  key: ChargerFeatureKey;
  label: string;
  type: "text" | "boolean" | "number";
};

export type Variant = {
  id: string;
  name: string;
  price: number;
  highlight?: boolean;

  values: Partial<Record<ChargerFeatureKey, string | number | boolean>>;
};

export type Product = {
  id: string;
  name: string;

  features: Feature[];
  variants: Variant[];
};
