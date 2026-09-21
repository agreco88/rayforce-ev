"use client";

import { AnimatePresence, motion } from "motion/react";
import { AnimateNumber } from "motion-plus/react";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckIcon, ExternalLink } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { AppSwitch } from "@/components/ui/wrappers/AppSwitch";
import { useTrack } from "@/lib/analytics";
import { BUNDLED_CHARGER_SLUG, useStandPricing } from "./useStandPricing";

/**
 * Panel de precio de la columna en desktop, hermano del de las páginas de
 * modelo (ChargerPricingSection) pero invertido: acá el producto base es la
 * columna y el cargador es el add-on, no al revés. Por eso no se reusa ese
 * componente — recibe un ChargerProduct, trae su propio <section> con fondo y
 * grilla, su header y el bloque de reseñas. Lo que sí se comparte es la
 * anatomía y el tratamiento visual: contenedor glass, toggles arriba,
 * AnimateNumber en el medio, CTA y footnote abajo, con la lista de items a la
 * izquierda.
 *
 * Mobile tiene su propio componente (`StandPricingPanelMobile`): ahí el panel
 * va sin la caja externa, para no anidar dos contenedores con borde y padding
 * en un ancho de celular. Los dos comparten la lógica vía `useStandPricing`,
 * así que el precio y los toggles se comportan igual en ambos.
 *
 * El recorrido es progresivo, igual que en cargadores y cables: se entra
 * viendo cuánto sale la columna sola y se termina viendo cuánto sale con
 * cargador e instalación.
 *
 * Los items quedan siempre montados y solo cambian de estado activo/inactivo,
 * así el alto del panel no se mueve al togglear (cero CLS).
 */
export function StandPricingPanel({ className }: { className?: string }) {
  const t = useTranslations("HomePage.HomeStandSection.pricingPanel");
  const track = useTrack();
  const {
    includeCharger,
    includeInstallation,
    handleChargerToggle,
    handleInstallationToggle,
    total,
    items,
    whatsappHref,
    checkoutHref,
  } = useStandPricing();

  return (
    <div
      className={cn(
        "flex w-full rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm",
        className,
      )}
    >
      {/* -------------------------------------------------------------- */}
      {/* Izquierda: qué incluye                                         */}
      {/* -------------------------------------------------------------- */}
      <div className="flex-auto p-10 text-left">
        {/* `normal-case` porque el reset global pone los `h3` en uppercase
            (globals.css, capa base). Acá el título es una frase, no una
            etiqueta. */}
        <h3 className="text-2xl font-light tracking-tight text-white normal-case">
          {t("title")}
        </h3>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-400">
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
      {/* Derecha: toggles + precio + CTA                                 */}
      {/* -------------------------------------------------------------- */}
      <div className="w-full max-w-md shrink-0 p-2">
        <div className="flex h-full flex-col justify-center rounded-2xl border border-white/10 bg-neutral-950/60 px-8 py-10 text-center backdrop-blur-sm">
          {/* Los dos toggles comparten una sola grilla de 3 columnas, así
              ambos switches caen en la misma columna central y las etiquetas
              quedan fijadas a los lados sin importar su largo. */}
          <div className="mx-auto grid w-full max-w-sm grid-cols-[1fr_auto_1fr] items-center gap-x-3 gap-y-4">
            <span
              className={cn(
                "text-xs font-medium transition-colors duration-300",
                !includeCharger ? "text-green-400" : "text-neutral-600",
              )}
            >
              {t("toggle.columnOnly")}
            </span>
            <AppSwitch
              checked={includeCharger}
              onChange={handleChargerToggle}
              activeClassName="bg-green-400"
              aria-label={t("toggle.label")}
            />
            <span
              className={cn(
                "text-xs font-medium transition-colors duration-300",
                includeCharger ? "text-green-400" : "text-neutral-600",
              )}
            >
              {t("toggle.withCharger")}
            </span>

            {/* Instalación: solo tiene sentido sobre un cargador, así que va
                deshabilitado (no desmontado) mientras el cargador esté en
                off. Mantenerlo montado evita el salto de alto que provocaba
                montar/desmontar. */}
            <span
              className={cn(
                "text-xs font-medium transition-colors duration-300",
                !includeCharger
                  ? "text-neutral-700"
                  : !includeInstallation
                    ? "text-green-400"
                    : "text-neutral-600",
              )}
            >
              {t("installationToggle.without")}
            </span>
            <AppSwitch
              checked={includeInstallation}
              onChange={handleInstallationToggle}
              disabled={!includeCharger}
              activeClassName="bg-green-400"
              aria-label={t("installationToggle.label")}
            />
            <span
              className={cn(
                "text-xs font-medium transition-colors duration-300",
                !includeCharger
                  ? "text-neutral-700"
                  : includeInstallation
                    ? "text-green-400"
                    : "text-neutral-600",
              )}
            >
              {t("installationToggle.with")}
            </span>
          </div>

          {/* "Desde" y "USD" van como prefix/suffix de AnimateNumber (y no
              como hermanos) para que entren en su grupo de layout animation y
              acompañen el cambio de ancho de los dígitos en vez de saltar.
              Con instalación el precio es "desde": el final depende del sitio. */}
          <div className="mt-8 flex items-baseline justify-center">
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
              por WhatsApp: el precio final depende del sitio. */}
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
            className="mx-auto mt-8 flex min-h-[48px] w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-green-400 px-3 py-3 text-sm font-semibold text-black transition-colors hover:bg-green-300"
          >
            <AnimatePresence mode="wait">
              <motion.span
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
                className="inline-flex items-center gap-2"
              >
                {includeInstallation ? (
                  <>
                    {t("cta.quote")}
                    <FaWhatsapp size={16} />
                  </>
                ) : (
                  <>
                    {includeCharger ? t("cta.withCharger") : t("cta.columnOnly")}
                    <ExternalLink size={16} />
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </a>

          {/* Alto mínimo reservado para la más larga de las tres variantes,
              así las más cortas no encogen el panel al togglear. */}
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
