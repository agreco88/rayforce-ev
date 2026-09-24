import type {
  CableProduct,
  CatalogProduct,
  ChargerProduct,
} from "@/lib/catalog/catalog.types";

export type SpecRow = {
  /** Resuelve bajo `Common.SpecsTable.rows` en messages/{locale}.json. */
  key: string;
  value: string | number | boolean;
};

export type SpecGroup = {
  /** Resuelve bajo `Common.SpecsTable.groups`. */
  key: string;
  rows: SpecRow[];
};

/** Lo que devuelve `useTranslations("Common.Specs")`. */
type Translate = (key: string) => string;

/** Una fila antes de descartar las que no tienen dato. */
type MaybeRow = { key: string; value: string | number | boolean | undefined };

/**
 * Formatea una spec con su unidad, o la descarta si no esta cargada. Existe
 * para no escribir `specs.x && \`${specs.x} A\``: ese patron devuelve `0` —
 * no `undefined` — cuando el valor es cero, y la fila sobreviviria vacia.
 */
function unit(
  value: number | undefined,
  suffix: string,
): string | undefined {
  return value === undefined ? undefined : `${value} ${suffix}`;
}

/**
 * Traduce el catalogo a filas de tabla. Vive aparte del componente porque es
 * la unica parte que sabe si el producto es cable o cargador: asi la tabla se
 * dibuja igual para los dos y agregar una spec es tocar un solo lugar.
 *
 * Toda fila sin dato se descarta — una ficha llena de "—" se lee como un
 * producto incompleto, no como una spec que no aplica.
 */
export function buildSpecGroups(
  product: CatalogProduct,
  t: Translate,
): SpecGroup[] {
  const groups =
    product.category === "charger"
      ? chargerGroups(product, t)
      : cableGroups(product, t);

  return groups
    .map((group) => ({ ...group, rows: group.rows.filter(isPresent) }))
    .filter((group) => group.rows.length > 0);
}

/** Descarta las specs ausentes y le dice a TS que lo que queda tiene valor. */
function isPresent(row: MaybeRow): row is SpecRow {
  return row.value !== undefined && row.value !== "";
}

/* ------------------------------------------------------------------ */
/* Charger                                                            */
/* ------------------------------------------------------------------ */

function chargerGroups(
  product: ChargerProduct,
  t: Translate,
): { key: string; rows: MaybeRow[] }[] {
  const { specs } = product;

  return [
    {
      key: "power",
      rows: [
        { key: "maxPower", value: `${specs.maxPowerKw} kW` },
        { key: "phaseType", value: t(`phase.${specs.phaseType}`) },
        { key: "voltage", value: specs.voltage },
        { key: "nominalCurrent", value: unit(specs.nominalCurrentA, "A") },
        { key: "frequency", value: unit(specs.frequencyHz, "Hz") },
        { key: "currentAdjustable", value: specs.currentAdjustable },
      ],
    },
    {
      key: "connector",
      rows: [
        { key: "connectorStandard", value: specs.connectorStandard },
        {
          key: "cableType",
          value:
            specs.cableType === "integrated"
              ? t("cable.integrated")
              : t("cable.socket"),
        },
        { key: "cableLength", value: unit(specs.cableLengthM, "m") },
      ],
    },
    {
      key: "protection",
      rows: [
        { key: "ingressProtection", value: specs.ingressProtection },
        { key: "impactProtection", value: specs.impactProtection },
        { key: "rcdConfiguration", value: specs.rcdConfiguration },
        { key: "electricalProtection", value: specs.electricalProtection },
        {
          key: "operatingTemperature",
          value: specs.operatingTemperature,
        },
      ],
    },
    {
      key: "interface",
      rows: [
        { key: "display", value: specs.displaySize ?? specs.display },
        { key: "ledIndicator", value: specs.ledIndicator },
        { key: "connectivity", value: specs.connectivity },
        { key: "appControl", value: specs.appControl },
      ],
    },
    {
      key: "physical",
      rows: [
        {
          key: "dimensions",
          value: specs.dimensionsMm && `${specs.dimensionsMm} mm`,
        },
        { key: "weight", value: unit(specs.weightKg, "kg") },
        { key: "mountType", value: t(`mount.${specs.mountType}`) },
      ],
    },
    {
      key: "certifications",
      rows: [
        { key: "certifications", value: specs.certifications?.join(" · ") },
        { key: "ursea", value: product.ursea.authNumber },
      ],
    },
  ];
}

/* ------------------------------------------------------------------ */
/* Cable                                                              */
/* ------------------------------------------------------------------ */

function cableGroups(
  product: CableProduct,
  t: Translate,
): { key: string; rows: MaybeRow[] }[] {
  const { specs } = product;

  return [
    {
      key: "power",
      rows: [
        { key: "maxPower", value: unit(specs.maxPowerKw, "kW") },
        {
          key: "phaseType",
          value: specs.phaseType && t(`phase.${specs.phaseType}`),
        },
        { key: "maxCurrent", value: unit(specs.maxCurrentA, "A") },
      ],
    },
    {
      key: "connector",
      rows: [
        { key: "connectorStandard", value: t("connector.type2") },
        { key: "cableLength", value: `${specs.lengthM} m` },
        { key: "cableStyle", value: t(`cableStyle.${specs.cableStyle}`) },
        { key: "conductorSection", value: specs.conductorSection },
        { key: "contactMaterial", value: specs.contactMaterial },
        { key: "mechanicalLatch", value: specs.mechanicalLatch },
        {
          key: "proximityResistor",
          value: unit(specs.proximityResistorOhm, "Ω"),
        },
      ],
    },
    {
      key: "protection",
      rows: [
        { key: "ingressProtection", value: specs.ingressProtection },
        { key: "impactProtection", value: specs.impactProtection },
        { key: "temperatureSensor", value: specs.temperatureSensor },
        { key: "jacketMaterial", value: specs.jacketMaterial },
      ],
    },
    {
      key: "certifications",
      rows: [
        { key: "certifications", value: specs.certification },
        { key: "standard", value: specs.standard },
        { key: "bagIncluded", value: specs.bagIncluded },
      ],
    },
  ];
}
