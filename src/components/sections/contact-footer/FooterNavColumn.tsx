"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useTrack } from "@/lib/analytics/use-track";
import { CHARGER_PRODUCTS } from "@/lib/catalog/chargers.catalog";
import { CABLE_PRODUCTS } from "@/lib/catalog/cables.catalog";
import { slugLabel } from "@/lib/catalog/catalog.helpers";
import { useChargerCrumbLabel } from "@/components/pages/shared/useChargerCrumbLabel";

type Props = {
  /** Familia: el encabezado de la columna, que ademas linkea al listado. */
  title: string;
  href: string;
  /** Los modelos de esa familia. */
  items: { href: string; label: string }[];
};

/**
 * Una familia de producto: el titulo linkea al listado y debajo van sus
 * modelos, con el mismo nombre que en su breadcrumb. Salen del catalogo, asi
 * que agregar un producto lo suma al footer solo.
 */
function NavColumn({ title, href, items }: Props) {
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
    </div>
  );
}

export function FooterChargersColumn() {
  const t = useTranslations("Layout.Header");
  const crumbLabel = useChargerCrumbLabel();

  return (
    <NavColumn
      title={t("nav.chargers")}
      href="/cargadores"
      items={CHARGER_PRODUCTS.map((product) => ({
        href: `/cargadores/${product.slug}`,
        label: crumbLabel(product),
      }))}
    />
  );
}

/** Los cables y la columna, que cuelgan de /accesorios. */
export function FooterAccessoriesColumn() {
  const t = useTranslations("Layout.Header");
  const tColumn = useTranslations("ColumnPage.breadcrumb");

  return (
    <NavColumn
      title={t("nav.cables")}
      href="/accesorios"
      items={[
        ...CABLE_PRODUCTS.map(({ slug }) => ({
          href: `/accesorios/${slug}`,
          label: slugLabel(slug),
        })),
        {
          href: "/accesorios/columna-para-cargador",
          label: tColumn("column"),
        },
      ]}
    />
  );
}
