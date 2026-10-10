"use client";

import { AnimatePresence, motion } from "motion/react";
import { AnimateNumber } from "motion-plus/react";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckIcon, ExternalLink } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { useTrack } from "@/lib/analytics";
import { StandOptions } from "./StandOptions";
import { BUNDLED_CHARGER_SLUG, useStandPricing } from "./useStandPricing";

/**
 * Panel de precio de la columna en desktop, hermano del de las páginas de
 * modelo (ChargerPricingSection) pero invertido: acá el producto base es la
 * columna y el cargador es el add-on, no al revés. Por eso no se reusa ese
 * componente — recibe un ChargerProduct, trae su propio <section> con fondo y
 * grilla, su header y el bloque de reseñas. Lo que sí se comparte es la
 * anatomía: opciones arriba (los chips del hero), AnimateNumber en el medio,
 * CTA y footnote abajo, con la lista de items a la izquierda.
 *
 * Mobile tiene su propio componente (`StandPricingPanelMobile`): ahí el panel
 * va sin la caja externa, para no anidar dos contenedores con borde y padding
 * en un ancho de celular. Los dos comparten la lógica vía `useStandPricing`,
 * así que el precio y las opciones se comportan igual en ambos.
 *
 * El recorrido es progresivo, igual que en cargadores y cables: se entra
 * viendo cuánto sale la columna sola y se termina viendo cuánto sale con
 * cargador e instalación.
 *
 * Los items quedan siempre montados y solo cambian de estado activo/inactivo,
 * así el alto del panel no se mueve al elegir (cero CLS).
 */
export function StandPricingPanel({ className }: { className?: string }) {
  const t = useTranslations("HomePage.HomeStandSection.pricingPanel");
  const track = useTrack();
  const pricing = useStandPricing();
  const {
    includeCharger,
    includeInstallation,
    total,
    items,
    whatsappHref,
    checkoutHref,
  } = pricing;

  return (
    // Negro desde el título: la lista y el precio son una misma ficha. Con la
    // caja de la derecha más oscura que el resto, se leía como otro bloque.
    <div
      className={cn(
        "flex w-full rounded-3xl border border-white/10 bg-neutral-950/60 backdrop-blur-sm",
        className,
      )}
    >
      {/* -------------------------------------------------------------- */}
      {/* Izquierda: qué incluye                                         */}
      {/* -------------------------------------------------------------- */}
      <div className="flex-auto p-10 text-left">
        {/* `normal-case` porque el reset global pone los `h3` en uppercase
            (globals.css, capa base). Acá el título es una frase, no una
            etiqueta.

            `font-medium` y no el `font-light` del resto de la seccion: este es
            el titulo de la ficha de compra, el unico bloque donde hay que
            decidir — pesa mas a proposito. */}
        <h3 className="text-3xl font-medium tracking-tight text-balance text-white normal-case">
          {t("title")}
        </h3>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-400 sm:mt-5">
          {t("description")}
        </p>

        <div className="mt-8 flex items-center gap-x-4">
          <h4 className="flex-none text-sm font-semibold text-green-400">
            {t("includes")}
          </h4>
          <div className="h-px flex-auto bg-white/10" />
        </div>

        <ul
          role="list"
          className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm"
        >
          {items.map((item) => (
            <motion.li
              key={item.text}
              initial={false}
              animate={{ opacity: item.active ? 1 : 0.55 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-x-3"
            >
              <CheckIcon
                aria-hidden="true"
                className={cn(
                  "h-6 w-5 flex-none transition-all duration-300",
                  item.active
                    ? "text-green-400 drop-shadow-[0_0_6px_currentColor]"
                    : "text-neutral-700",
                )}
              />
              <span
                className={cn(
                  "transition-colors duration-300",
                  item.active ? "text-neutral-200" : "text-neutral-600",
                )}
              >
                <span className="block">{item.text}</span>
                {item.href && (
                  <Link
                    href={item.href}
                    target="_blank"
                    aria-disabled={!item.active}
                    tabIndex={item.active ? undefined : -1}
                    onClick={(e) => {
                      if (!item.active) e.preventDefault();
                    }}
                    className={cn(
                      "mt-1 flex w-fit items-center gap-0.5 font-medium underline-offset-2 transition-colors duration-300 hover:no-underline",
                      item.active
                        ? "text-green-400 underline decoration-dotted"
                        : "pointer-events-none text-neutral-600 no-underline",
                    )}
                  >
                    {t("detailLink")}
                    <ArrowRight size={11} />
                  </Link>
                )}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* Derecha: opciones + precio + CTA                                */}
      {/* -------------------------------------------------------------- */}
      {/* `max-w-lg`: con `max-w-md` el par de chips de instalación
          ("+ Instalación desde USD …") no entraba en una fila y partía. */}
      <div className="w-full max-w-lg shrink-0 p-2">
        <div className="flex h-full flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-10 text-center">
          <StandOptions pricing={pricing} />

          {/* "Desde" y "USD" van como prefix/suffix de AnimateNumber (y no
              como hermanos) para que entren en su grupo de layout animation y
              acompañen el cambio de ancho de los dígitos en vez de saltar.
              Con instalación el precio es "desde": el final depende del sitio. */}
          <div className="mt-10 flex items-baseline justify-center">
            <AnimateNumber
              locales="en-US"
              format={{ maximumFractionDigits: 0 }}
              prefix={includeInstallation ? t("fromPrefix") : ""}
              suffix=" USD"
              className={cn(
                "text-6xl font-thin tabular-nums text-white",
                "[&_.number-section-pre]:mr-2 [&_.number-section-pre]:self-end [&_.number-section-pre]:pb-3! [&_.number-section-pre]:text-xs [&_.number-section-pre]:font-medium [&_.number-section-pre]:text-neutral-500",
                "[&_.number-section-post]:ml-1 [&_.number-section-post]:self-end [&_.number-section-post]:pb-3! [&_.number-section-post]:text-xs [&_.number-section-post]:font-semibold [&_.number-section-post]:tracking-wide [&_.number-section-post]:text-neutral-400",
              )}
              transition={{
                visualDuration: 0.6,
                type: "spring",
                bounce: 0.25,
                opacity: { duration: 0.3, ease: "linear" },
              }}
            >
              {total}
            </AnimateNumber>
          </div>
          <p className="mt-1 text-xs text-neutral-500">{t("taxLabel")}</p>

          {/* Con instalación el cierre no es un checkout sino una cotización
              por WhatsApp: el precio final depende del sitio. El botón nombra
              el medio de pago, no lo que se compra: eso lo dicen las opciones. */}
          <a
            href={includeInstallation ? whatsappHref : checkoutHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              includeInstallation
                ? track.whatsappClick({
                    source: "stand",
                    charger: BUNDLED_CHARGER_SLUG,
                  })
                : track.mercadopagoClick({
                    source: "stand",
                    charger: includeCharger ? BUNDLED_CHARGER_SLUG : "stand",
                    location: "desktop",
                  })
            }
            className="mt-8 flex min-h-[48px] w-full items-center justify-center rounded-xl bg-green-400 px-3 py-3 text-sm font-semibold text-black transition-colors hover:bg-green-300"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={includeInstallation ? "whatsapp" : "mercadopago"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-2"
              >
                {includeInstallation ? (
                  <>
                    {t("cta.whatsapp")}
                    <FaWhatsapp size={16} />
                  </>
                ) : (
                  <>
                    {t("cta.mercadopago")}
                    <ExternalLink size={16} />
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </a>

          {/* Alto mínimo reservado para la más larga de las tres variantes,
              así las más cortas no encogen el panel al elegir. */}
          <AnimatePresence mode="wait">
            <motion.p
              key={
                includeInstallation
                  ? "install"
                  : includeCharger
                    ? "charger"
                    : "column"
              }
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mx-auto mt-4 flex min-h-[72px] max-w-sm items-center text-sm leading-relaxed text-neutral-400"
            >
              {includeInstallation
                ? t("footnote.withInstallation")
                : includeCharger
                  ? t("footnote.withCharger")
                  : t("footnote.columnOnly")}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
