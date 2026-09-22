"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import {
  CHARGER_COLUMN_PRICE_USD,
  CHARGER_INSTALLATION_PRICE_USD,
  CHARGER_PRODUCTS,
} from "@/lib/catalog/chargers.catalog";
import { useTrack } from "@/lib/analytics";

/**
 * El cargador que se ofrece junto a la columna: el único de la línea con
 * checkout de MercadoPago propio y el más vendido, así que es el default
 * razonable para "columna + cargador". Si mañana se ofrece otro, se cambia
 * el slug acá.
 */
export const BUNDLED_CHARGER_SLUG = "bs20-bc-7kw";

const COLUMN_MERCADOPAGO_URL = "https://mpago.la/1VArJbv";

const WHATSAPP_NUMBER = "59892041709";

/**
 * Toda la lógica del panel de precio de la columna: estado de los toggles,
 * cálculo del total, cascada entre cargador e instalación, tracking y los
 * destinos de los CTA.
 *
 * Vive en un hook porque desktop y mobile pintan el panel distinto —el mobile
 * no tiene la caja externa ni las dos columnas— pero cobran lo mismo. Así un
 * cambio de precio o de regla de negocio se hace en un solo lugar y los dos
 * componentes solo se ocupan del layout.
 */
export function useStandPricing() {
  const t = useTranslations("HomePage.HomeStandSection.pricingPanel");
  const track = useTrack();
  const [includeCharger, setIncludeCharger] = useState(false);
  const [includeInstallation, setIncludeInstallation] = useState(false);

  const charger = CHARGER_PRODUCTS.find(
    (product) => product.slug === BUNDLED_CHARGER_SLUG,
  );

  const columnFeatures = t.raw("features.column") as string[];
  const chargerFeatures = t.raw("features.charger") as string[];
  const installationFeatures = t.raw("features.installation") as string[];

  const chargerPrice = charger?.price.amount ?? 0;

  /**
   * Con instalación el precio deja de ser una suma de partes: el bundle
   * "cargador + instalación" tiene precio propio (el mismo que en las páginas
   * de modelo), y la columna se suma encima. Sin instalación sí es una suma
   * simple de columna + cargador.
   */
  const total = includeInstallation
    ? CHARGER_COLUMN_PRICE_USD + CHARGER_INSTALLATION_PRICE_USD
    : CHARGER_COLUMN_PRICE_USD + (includeCharger ? chargerPrice : 0);

  const items = [
    ...columnFeatures.map((text) => ({
      text,
      active: true,
      href: undefined as string | undefined,
    })),
    ...chargerFeatures.map((text) => ({
      text,
      active: includeCharger,
      href: undefined as string | undefined,
    })),
    ...installationFeatures.map((text) => ({
      text,
      active: includeInstallation,
      href: undefined as string | undefined,
    })),
    // La línea con el nombre del cargador va última y es la única que linkea
    // a su página: se lee como "esto es lo que acabás de sumar" en vez de
    // competir con las specs de la columna arriba de la lista.
    {
      text: t("features.chargerModel"),
      active: includeCharger,
      href: `/cargadores/${BUNDLED_CHARGER_SLUG}` as string,
    },
  ];

  /**
   * Versión corta de la lista para mobile: una línea por toggle en vez de las
   * doce de desktop. A ancho de celular esa lista es una pared de ticks que
   * tapa el bloque de precio, y encima cada item envuelve en dos líneas.
   *
   * Con una línea por grupo se lee de un vistazo qué suma cada switch, que es
   * para lo que está la lista. El detalle fino queda en desktop.
   *
   * Sin link a la página del cargador, a diferencia de desktop: acá la persona
   * está a un toque de comprar, y mandarla a otra página en ese momento es
   * perderla. El nombre completo del modelo alcanza para saber qué se lleva.
   */
  const mobileItems = [
    { text: t("features.mobile.column"), active: true },
    { text: t("features.mobile.charger"), active: includeCharger },
    { text: t("features.mobile.installation"), active: includeInstallation },
  ];

  /**
   * La instalación solo tiene sentido sobre un cargador: si se apaga el
   * cargador, se apaga también la instalación (mismo criterio que en
   * CablePricingSection con el wallbox).
   */
  function handleChargerToggle(next: boolean) {
    setIncludeCharger(next);
    track.pricingColumnToggled("stand", next);
    if (!next && includeInstallation) {
      setIncludeInstallation(false);
      track.pricingInstallationToggled("stand", false);
    }
  }

  function handleInstallationToggle(next: boolean) {
    setIncludeInstallation(next);
    track.pricingInstallationToggled("stand", next);
  }

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t("cta.whatsappMessage"),
  )}`;

  /**
   * TODO(precio): con el cargador prendido el panel muestra 756 (159 de la
   * columna + 597 del BS20-BC-7KW) pero manda al checkout del cargador solo,
   * que cobra 597. Faltan los 159 de la columna.
   *
   * No hay preferencia de MercadoPago para el combo: hace falta crearla por
   * 756 y ponerla acá. Hasta entonces esta rama cobra de menos.
   */
  const checkoutHref = includeCharger
    ? charger?.mercadopagoUrl || COLUMN_MERCADOPAGO_URL
    : COLUMN_MERCADOPAGO_URL;

  return {
    includeCharger,
    includeInstallation,
    handleChargerToggle,
    handleInstallationToggle,
    total,
    items,
    mobileItems,
    whatsappHref,
    checkoutHref,
  };
}
