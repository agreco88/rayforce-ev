"use client";

import {
  Bike,
  Check,
  CircleDollarSign,
  Clock,
  ExternalLink,
  Truck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";
import type { CatalogTheme } from "@/lib/catalog/catalog.types";
import type { HeroPurchase } from "./use-hero-purchase";

/** El boton de compra: MercadoPago si lo elegido tiene link, si no WhatsApp
 *  (con instalacion, a cotizar). */
export function HeroCta({
  purchase,
  theme,
}: {
  /** Solo lo que el boton necesita: los cables no tienen el resto. */
  purchase: Pick<
    HeroPurchase,
    "checkoutUrl" | "whatsappHref" | "withInstallation" | "trackCheckout"
  >;
  theme: CatalogTheme;
}) {
  const t = useTranslations("ChargerModelPage.Hero.cta");
  const { checkoutUrl, whatsappHref } = purchase;
  const label = checkoutUrl
    ? "buy"
    : purchase.withInstallation
      ? "quote"
      : "whatsapp";

  return (
    <a
      href={checkoutUrl || whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      // El mismo boton en los dos tamaños: el corte es el `lg` del layout.
      onClick={() =>
        purchase.trackCheckout(
          window.matchMedia("(min-width: 1024px)").matches
            ? "desktop"
            : "mobile",
        )
      }
      className={`flex h-20 sm:h-auto w-full items-center justify-center rounded-xl text-sm font-semibold text-black transition-colors ${theme.accentBg} ${theme.accentHover}`}
    >
      {/* El mismo fundido que el boton de `ChargerPricingSection`. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center gap-2"
        >
          {t(label)}
          {checkoutUrl ? <ExternalLink size={16} /> : <FaWhatsapp size={16} />}
        </motion.span>
      </AnimatePresence>
    </a>
  );
}

// En el orden de `Hero.shipping.items`: procesamiento, interior, costo, cadeteria.
const SHIPPING_ICONS = [Clock, Truck, CircleDollarSign, Bike];

/** Retiro, envio, garantia y devolucion bajo el boton, donde se duda antes del
 *  click; abajo, el detalle de los envios. Con el check de `HeroPickup`. En
 *  mobile va a sangre y pegada a la ficha, que pone el borde de abajo. */
export function HeroTrust({ theme }: { theme: CatalogTheme }) {
  const t = useTranslations("ChargerModelPage.Hero");
  const promises = [
    t("trust.pickup"),
    t("trust.shipping"),
    t("trust.warranty"),
    t("trust.returns"),
  ];
  const shipping = t.raw("shipping.items") as {
    title: string;
    description: string;
  }[];

  return (
    <div className="flex flex-col gap-5 border-t border-white/10 bg-white/[0.04] px-6 py-6 text-sm sm:rounded-xl sm:border sm:p-8">
      <ul className="grid grid-cols-2 gap-x-6 gap-y-6 text-neutral-300 sm:gap-x-12">
        {promises.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check size={18} className={`shrink-0 ${theme.accentText}`} />
            {item}
          </li>
        ))}
      </ul>
      {/* `dl` y no `p`: el `p` global de `globals.css` pisa tamaño y color. */}
      <dl className="flex flex-col gap-8 border-t border-white/10 pt-6">
        {shipping.map(({ title, description }, index) => {
          const Icon = SHIPPING_ICONS[index];

          return (
            <div key={title} className="flex items-start gap-3">
              <Icon
                size={18}
                className={`mt-0.5 shrink-0 ${theme.accentText}`}
              />
              <div className="flex flex-col gap-1">
                <dt className="font-medium text-white">{title}</dt>
                <dd className="leading-relaxed text-neutral-400 max-w-lg">
                  {description}
                </dd>
              </div>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

export function HeroPickup({ theme }: { theme: CatalogTheme }) {
  const t = useTranslations("ChargerModelPage.Hero.pickup");
  const address = t("address");

  return (
    <div className="flex items-start gap-3 text-sm">
      <Check size={18} className={`mt-0.5 shrink-0 ${theme.accentText}`} />
      <div className="flex flex-col gap-1">
        <span className="font-medium text-white">
          {t("title", { address })}
        </span>
        <span className="text-neutral-400">{t("description")}</span>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-fit underline-offset-4 hover:underline ${theme.accentText}`}
        >
          {t("map")}
        </a>
      </div>
    </div>
  );
}
