"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useTrack } from "@/lib/analytics/use-track";
import { CHARGER_PRODUCTS } from "@/lib/catalog/chargers.catalog";
import { CABLE_PRODUCTS } from "@/lib/catalog/cables.catalog";

type Props = {
  /** Familia: el encabezado de la columna, que ademas linkea al listado. */
  title: string;
  href: string;
  /** Los modelos de esa familia. Vacio en Columna, que todavia no tiene ruta. */
  items?: { href: string; label: string }[];
};

/**
 * Una familia de producto: el titulo linkea al listado y debajo van sus
 * modelos. Las etiquetas se derivan del catalogo, asi que agregar un producto
 * lo suma al footer solo.
 */
function NavColumn({ title, href, items = [] }: Props) {
  const track = useTrack();

  return (
    <div>
      <h3 className="text-xs tracking-[0.18em] uppercase text-neutral-300">
        <Link
          href={href}
          onClick={() => track.footerNavClicked(title, href)}
          className="transition-colors hover:text-green-400"
        >
          {title}
        </Link>
      </h3>

      {items.length > 0 && (
        <ul className="mt-6 space-y-4 text-sm text-neutral-400">
          {items.map(({ href: itemHref, label }) => (
            <li key={itemHref} className="flex gap-2">
              {/* El bullet va suelto y no como `list-disc`: asi el texto que
                  envuelve queda alineado con la primera linea, no bajo el punto. */}
              <span aria-hidden="true" className="text-neutral-600">
                ·
              </span>
              <Link
                href={itemHref}
                onClick={() => track.footerNavClicked(label, itemHref)}
                className="transition-colors duration-200 hover:text-green-400"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function FooterChargersColumn() {
  const t = useTranslations("Layout.Header");

  return (
    <NavColumn
      title={t("nav.chargers")}
      href="/cargadores"
      /* `familyName` adelante ("BS20 7,2kW"): sin el, los items se leian como
         potencias sueltas en vez de modelos. */
      items={CHARGER_PRODUCTS.map(({ slug, shortName, familyName }) => ({
        href: `/cargadores/${slug}`,
        label: `${familyName} ${shortName}`,
      }))}
    />
  );
}

export function FooterCablesColumn() {
  const t = useTranslations("Layout.Header");
  const tP = useTranslations("Footer.products");

  return (
    <NavColumn
      title={t("nav.cables")}
      href="/cables"
      /* "Cable de carga monofásico 7kW": la fase y el estilo salen de `specs`,
         que es lo unico que distingue a los dos de 7kW entre si. Si a un cable
         le faltan esos datos cae a `shortName`, que siempre esta. */
      items={CABLE_PRODUCTS.map(({ slug, shortName, specs }) => ({
        href: `/cables/${slug}`,
        label:
          specs.maxPowerKw && specs.phaseType
            ? tP("cable", {
                phase: tP(specs.phaseType === "three" ? "three" : "single"),
                power: specs.maxPowerKw,
                style: specs.cableStyle === "coiled" ? tP("coiled") : "",
              })
            : shortName,
      }))}
    />
  );
}

export function FooterStandColumn() {
  const tF = useTranslations("Footer");

  /* TODO: la columna todavia no tiene ruta propia — apunta al ancla de la
     seccion en la home. Cuando exista /columna, cambiar el href. */
  return <NavColumn title={tF("sections.stand")} href="/#columna" />;
}
