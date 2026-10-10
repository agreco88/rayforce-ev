"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useTrack } from "@/lib/analytics";
import { getCableProductBySlug } from "@/lib/catalog/catalog.helpers";
import {
  CHARGER_COLUMN_PRICE_USD,
  CHARGER_INSTALLATION_PRICE_USD,
} from "@/lib/catalog/chargers.catalog";
import type { ChargerProduct } from "@/lib/catalog/catalog.types";
import { cableOptionLabel } from "./HeroOptions";

const WHATSAPP_NUMBER = "59892041709";

/** Lo elegido en el hero y a donde lleva la compra. Desktop y mobile lo
 * comparten para que el precio y el checkout salgan del mismo lugar. */
export function useHeroPurchase(product: ChargerProduct) {
  const t = useTranslations("ChargerModelPage.Hero");
  const tVariants = useTranslations("ChargerModelPage.Hero.variants");
  const track = useTrack();

  // Memo: el hero anima el grupo de cables cuando cambia esta lista, y un
  // array nuevo en cada render lo dispararia siempre.
  const cables = useMemo(
    () =>
      (product.cableOptions ?? []).flatMap((option) => {
        const cable = getCableProductBySlug(option.cableSlug);
        return cable ? [{ ...option, cable }] : [];
      }),
    [product],
  );
  const cableProducts = useMemo(() => cables.map((option) => option.cable), [cables]);
  const [cableSlug, setCableSlug] = useState<string | null>(null);
  const [withColumn, setWithColumn] = useState(false);
  const [withInstallation, setWithInstallation] = useState(false);
  const selected = cables.find((option) => option.cableSlug === cableSlug);

  const addons =
    (selected?.cable.price.amount ?? 0) +
    (withColumn ? CHARGER_COLUMN_PRICE_USD : 0);
  const installationPrice = CHARGER_INSTALLATION_PRICE_USD;
  const price =
    product.price.amount + addons + (withInstallation ? installationPrice : 0);
  // Cada link de MercadoPago es un combo de monto fijo: el cargador solo, con
  // un cable o con la columna (cable + columna no tiene). La instalacion es un
  // estimado que no se puede cobrar: va siempre por WhatsApp.
  const comboUrl = withColumn
    ? selected
      ? ""
      : product.columnMercadopagoUrl
    : (selected ?? product).mercadopagoUrl;
  const checkoutUrl = withInstallation ? "" : comboUrl;

  // Sin preferencia de MercadoPago para lo elegido, la compra va por WhatsApp
  // en vez de dejar un boton muerto.
  const model = [
    `${product.familyName} ${product.shortName}`,
    selected && cableOptionLabel(tVariants, selected.cable),
    withColumn && t("column.add"),
  ]
    .filter(Boolean)
    .join(" ");
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t(withInstallation ? "cta.quoteMessage" : "cta.whatsappMessage", { model }),
  )}`;

  function trackCheckout(location: "desktop" | "mobile") {
    if (checkoutUrl) {
      track.mercadopagoClick({ source: "charger_hero", charger: product.slug, location });
    } else {
      track.whatsappClick({ source: "charger_hero", charger: product.slug });
    }
  }

  return {
    cables: cableProducts,
    cableSlug,
    setCableSlug,
    withColumn,
    setWithColumn,
    withInstallation,
    setWithInstallation,
    installationPrice,
    price,
    checkoutUrl,
    whatsappHref,
    trackCheckout,
  };
}

export type HeroPurchase = ReturnType<typeof useHeroPurchase>;
