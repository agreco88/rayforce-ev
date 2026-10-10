"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import {
  CHARGER_COLUMN_PRICE_USD,
  CHARGER_INSTALLATION_PRICE_USD,
} from "@/lib/catalog/chargers.catalog";
import {
  formatPowerKw,
  getChargerProductBySlug,
} from "@/lib/catalog/catalog.helpers";
import { useTrack } from "@/lib/analytics";

/**
 * El cargador que se ofrece junto a la columna: el más vendido, así que es el
 * default razonable para "columna + cargador". Si mañana se ofrece otro, se
 * cambia el slug acá.
 */
export const BUNDLED_CHARGER_SLUG = "bs20-bc-7kw";

/** Lo que `HeroPrice` necesita de la columna, que no es del catalogo. Verde y
 * no el ambar de su card: es el acento de esta seccion. */
export const STAND_PRICE = {
  price: { currency: "USD", amount: CHARGER_COLUMN_PRICE_USD },
  theme: { accentText: "text-green-400", accentBorder: "border-green-400" },
} as const;

const COLUMN_MERCADOPAGO_URL = "https://mpago.la/2DGeJLX";

const WHATSAPP_NUMBER = "59892041709";

/**
 * Toda la lógica del panel de precio de la columna: las opciones elegidas,
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
  const locale = useLocale();
  const track = useTrack();
  const [includeCharger, setIncludeCharger] = useState(false);
  const [includeInstallation, setIncludeInstallation] = useState(false);

  const charger = getChargerProductBySlug(BUNDLED_CHARGER_SLUG);

  const columnFeatures = t.raw("features.column") as string[];
  const chargerFeatures = t.raw("features.charger") as string[];
  const installationFeatures = t.raw("features.installation") as string[];

  const chargerPrice = charger?.price.amount ?? 0;
  const chargerPower = formatPowerKw(charger?.specs.maxPowerKw ?? 0, locale);
  const installationPrice = CHARGER_INSTALLATION_PRICE_USD;

  // La instalación arrastra al cargador (ver `selectInstallation`), así que
  // nunca se suma sola.
  const total =
    CHARGER_COLUMN_PRICE_USD +
    (includeCharger ? chargerPrice : 0) +
    (includeInstallation ? installationPrice : 0);

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
   * Versión corta de la lista para mobile: una línea por opción en vez de las
   * doce de desktop. A ancho de celular esa lista es una pared de ticks que
   * tapa el bloque de precio, y encima cada item envuelve en dos líneas.
   *
   * Con una línea por grupo se lee de un vistazo qué suma cada opción, que es
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
   * La instalación solo existe sobre un cargador, así que las dos opciones se
   * arrastran: "Sin cargador" saca la instalación y "+ Instalación" suma el
   * cargador. Así los cuatro chips se pueden tocar siempre, sin uno muerto.
   */
  function selectCharger(next: boolean) {
    if (next === includeCharger) return;
    setIncludeCharger(next);
    track.pricingColumnToggled("stand", next);
    if (!next && includeInstallation) {
      setIncludeInstallation(false);
      track.pricingInstallationToggled("stand", false);
    }
  }

  function selectInstallation(next: boolean) {
    if (next === includeInstallation) return;
    setIncludeInstallation(next);
    track.pricingInstallationToggled("stand", next);
    if (next && !includeCharger) {
      setIncludeCharger(true);
      track.pricingColumnToggled("stand", true);
    }
  }

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t("cta.whatsappMessage"),
  )}`;

  // Con el cargador, el combo cargador + columna: la misma preferencia que
  // abre el hero del cargador cuando se le suma la columna.
  const checkoutHref = includeCharger
    ? charger?.columnMercadopagoUrl || COLUMN_MERCADOPAGO_URL
    : COLUMN_MERCADOPAGO_URL;

  return {
    includeCharger,
    includeInstallation,
    selectCharger,
    selectInstallation,
    chargerPrice,
    chargerPower,
    installationPrice,
    total,
    items,
    mobileItems,
    whatsappHref,
    checkoutHref,
  };
}

export type StandPricing = ReturnType<typeof useStandPricing>;
