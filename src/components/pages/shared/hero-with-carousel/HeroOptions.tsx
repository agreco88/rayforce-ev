"use client";

import type { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  formatPowerKw,
  getCableProducts,
  getChargerProducts,
} from "@/lib/catalog/catalog.helpers";
import { CHARGER_COLUMN_PRICE_USD } from "@/lib/catalog/chargers.catalog";
import type {
  CableProduct,
  CatalogTheme,
  ChargerProduct,
} from "@/lib/catalog/catalog.types";
import { OptionInfo } from "./OptionInfo";
import type { HeroPurchase } from "./use-hero-purchase";

/** El chip de opcion: la elegida lleva el accent solo en borde y texto; de
 * relleno encandilaba. El peso es el mismo en los dos estados: el bold ensancha
 * el chip y corre la fila. En mobile, el detalle va abajo y todos miden lo
 * mismo; desde `sm`, al lado, como el precio de los agregados. `stacked`
 * (ver `OptionGroup`) lo pone al lado tambien en mobile. */
export function chipClass(
  active: boolean,
  theme: Pick<CatalogTheme, "accentBorder" | "accentText">,
  stacked = false,
) {
  return cn(
    "flex min-h-12 flex-col items-center justify-center rounded-xl border px-3 py-1.5 text-center text-sm leading-tight font-medium text-balance transition-colors sm:min-h-11 sm:flex-row sm:gap-2 sm:px-4 sm:py-0",
    stacked && "flex-row gap-2 px-4 py-0",
    active
      ? `${theme.accentBorder} ${theme.accentText} bg-white/5`
      : "border-white/10 text-neutral-300 hover:border-white/30 hover:text-white",
  );
}

export function OptionGroup({
  label,
  info,
  stacked,
  children,
}: {
  label: string;
  /** Al lado de la etiqueta, para explicar la opcion sin sumar texto. */
  info?: ReactNode;
  /** En mobile, un chip por fila a todo el ancho en vez de dos por fila:
   *  para chips con texto largo, que en dos columnas quedan apretados. */
  stacked?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-medium text-white">{label}</span>
        {info}
      </div>
      <div
        className={cn(
          "grid gap-2 sm:flex sm:flex-wrap",
          stacked ? "grid-cols-1" : "grid-cols-2",
        )}
      >
        {children}
      </div>
    </div>
  );
}

/** El detalle del chip, apagado: informa sin competir con la opcion. En
 * mobile, segunda linea y mas chico: en dos columnas no entra al lado. */
function OptionDetail({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-normal text-neutral-400 sm:text-sm">{children}</span>
  );
}

/** Lo que suma un agregado. */
export function OptionPrice({ amount, prefix }: { amount: number; prefix?: string }) {
  return (
    <OptionDetail>
      {prefix && `${prefix} `}USD {amount}
    </OptionDetail>
  );
}

/**
 * Un chip por cargador. Son modelos distintos, asi que cada uno es un link a
 * su pagina (navegacion del cliente, sin recargar).
 */
export function PowerOptions({ product }: { product: ChargerProduct }) {
  const t = useTranslations("ChargerModelPage.Hero");
  const locale = useLocale();
  const chargers = getChargerProducts();

  return (
    <OptionGroup
      label={t("power.label")}
      info={
        <OptionInfo
          label={t("power.info")}
          description={[t("power.description"), t("power.help")]}
        />
      }
    >
      {chargers.map((charger) => (
        <Link
          key={charger.slug}
          href={`/cargadores/${charger.slug}`}
          // Cambiar de potencia es elegir una opcion, no ir a otra pagina: sin
          // `scroll`, la pantalla queda en los chips. Lo de arriba tiene alto
          // reservado, asi que no salta.
          scroll={false}
          aria-current={charger.slug === product.slug ? "page" : undefined}
          className={chipClass(charger.slug === product.slug, product.theme)}
        >
          {t("power.option", {
            power: formatPowerKw(charger.specs.maxPowerKw, locale),
          })}
          {/* En todos y no solo en los dos de 7,2 kW: es lo que los distingue,
              y los chips quedan parejos. */}
          <OptionDetail>
            {t("power.detail", { cable: charger.specs.cableType })}
          </OptionDetail>
        </Link>
      ))}
    </OptionGroup>
  );
}

/** El `PowerOptions` de los cables: un link por modelo. Lleva forma y
 *  potencia, porque hay dos de 7 kW. */
export function CableModelOptions({ product }: { product: CableProduct }) {
  const t = useTranslations("CableModelPage.Hero.model");
  const locale = useLocale();

  return (
    <OptionGroup label={t("label")}>
      {getCableProducts().map((cable) => (
        <Link
          key={cable.slug}
          scroll={false}
          href={`/accesorios/${cable.slug}`}
          aria-current={cable.slug === product.slug ? "page" : undefined}
          className={chipClass(cable.slug === product.slug, product.theme)}
        >
          {t("option", {
            style: cable.specs.cableStyle,
            power: formatPowerKw(cable.specs.maxPowerKw ?? 7, locale),
          })}
        </Link>
      ))}
    </OptionGroup>
  );
}

/** El wallbox solo o con uno de los cables que se le pueden sumar. `null` es
 * el wallbox solo. */
export function CableOptions({
  cables,
  selected,
  onSelect,
  theme,
}: {
  cables: CableProduct[];
  selected: string | null;
  onSelect: (cableSlug: string | null) => void;
  theme: CatalogTheme;
}) {
  const t = useTranslations("ChargerModelPage.Hero.variants");

  return (
    <OptionGroup
      label={t("label")}
      info={<OptionInfo label={t("info")} description={t("description")} />}
    >
      {[null, ...cables].map((cable) => {
        const slug = cable?.slug ?? null;

        return (
          <button
            key={slug ?? "base"}
            type="button"
            aria-pressed={selected === slug}
            onClick={() => onSelect(slug)}
            className={chipClass(selected === slug, theme)}
          >
            {cable ? (
              <>
                {cableOptionLabel(t, cable)}
                <OptionPrice amount={cable.price.amount} />
              </>
            ) : (
              t("base")
            )}
          </button>
        );
      })}
    </OptionGroup>
  );
}

/** La columna de pie se suma a cualquier combinacion, por eso va en su grupo. */
export function ColumnOptions({
  selected,
  onSelect,
  theme,
}: {
  selected: boolean;
  onSelect: (withColumn: boolean) => void;
  theme: CatalogTheme;
}) {
  const t = useTranslations("ChargerModelPage.Hero.column");

  return (
    <OptionGroup
      label={t("label")}
      info={
        <OptionInfo
          label={t("info")}
          description={t("description")}
          // Primero la foto instalada: el estacionamiento explica para que
          // sirve. `object-[25%_50%]`: la columna esta a la izquierda.
          media={[
            {
              type: "image",
              src: "/assets/images/column/bs20-mounted-on-column.webp",
              alt: t("imageAlt"),
              className: "object-cover object-[25%_50%]",
            },
            {
              type: "image",
              src: "/assets/images/column/wallbox-on-column.webp",
              alt: t("cutoutAlt"),
              className: "object-contain p-4",
            },
            {
              type: "video",
              src: "/assets/videos/column/bs20-column-clip-2.mp4",
              alt: t("videoAlt"),
            },
          ]}
        />
      }
    >
      {[false, true].map((withColumn) => (
        <button
          key={String(withColumn)}
          type="button"
          aria-pressed={selected === withColumn}
          onClick={() => onSelect(withColumn)}
          className={chipClass(selected === withColumn, theme)}
        >
          {withColumn ? (
            <>
              {t("add")}
              <OptionPrice amount={CHARGER_COLUMN_PRICE_USD} />
            </>
          ) : (
            t("base")
          )}
        </button>
      ))}
    </OptionGroup>
  );
}

/** La instalacion es un estimado: el precio va con "desde" y la compra pasa a
 *  cotizar por WhatsApp (ver `useHeroPurchase`). */
export function InstallationOptions({
  purchase,
  theme,
}: {
  purchase: HeroPurchase;
  theme: CatalogTheme;
}) {
  const t = useTranslations("ChargerModelPage.Hero.installation");

  return (
    <OptionGroup
      label={t("label")}
      info={
        <OptionInfo
          label={t("info")}
          description={[t("description"), t("help")]}
        />
      }
    >
      {[false, true].map((withInstallation) => (
        <button
          key={String(withInstallation)}
          type="button"
          aria-pressed={purchase.withInstallation === withInstallation}
          onClick={() => purchase.setWithInstallation(withInstallation)}
          className={chipClass(
            purchase.withInstallation === withInstallation,
            theme,
          )}
        >
          {withInstallation ? (
            <>
              {t("add")}
              <OptionPrice
                amount={purchase.installationPrice}
                prefix={t("from")}
              />
            </>
          ) : (
            t("base")
          )}
        </button>
      ))}
    </OptionGroup>
  );
}

/** "+ Cable espiral 5 m". Exportado: el mensaje de WhatsApp dice lo mismo. */
export function cableOptionLabel(
  t: ReturnType<typeof useTranslations<"ChargerModelPage.Hero.variants">>,
  cable: CableProduct,
) {
  return t("cable", {
    style: cable.specs.cableStyle,
    length: cable.specs.lengthM,
  });
}
