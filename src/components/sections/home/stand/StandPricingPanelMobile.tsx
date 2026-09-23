"use client";

import { AnimatePresence, motion } from "motion/react";
import { AnimateNumber } from "motion-plus/react";
import { useTranslations } from "next-intl";
import { CheckIcon, ExternalLink } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { AppSwitch } from "@/components/ui/wrappers/AppSwitch";
import { useTrack } from "@/lib/analytics";
import { BUNDLED_CHARGER_SLUG, useStandPricing } from "./useStandPricing";

/**
 * Versión mobile del panel de precio de la columna. Misma información y mismo
 * recorrido que desktop (`StandPricingPanel`), y exactamente el mismo precio:
 * los dos consumen `useStandPricing`, así que acá solo vive el layout.
 *
 * La diferencia es la caja. En desktop el panel es un contenedor glass con la
 * lista a la izquierda y los toggles a la derecha; a ancho de celular esas dos
 * cajas quedan una adentro de la otra y entre bordes y padding se van ~58px de
 * ancho útil, además de dos radios concéntricos que compiten a la vista. Acá
 * el título, la descripción y los items van sueltos sobre el fondo de la
 * sección —el padding lateral lo pone la sección con su `px-6`, como el resto
 * del contenido mobile— y la caja de toggles queda como la única del bloque.
 *
 * Cero CLS al togglear, por dos mecanismos distintos: los items quedan siempre
 * montados y solo cambian de estado activo/inactivo, y el cierre (CTA +
 * footnote) tiene alto fijo reservado para su variante más alta.
 */
export function StandPricingPanelMobile({ className }: { className?: string }) {
  const t = useTranslations("HomePage.HomeStandSection.pricingPanel");
  const track = useTrack();
  const {
    includeCharger,
    includeInstallation,
    handleChargerToggle,
    handleInstallationToggle,
    total,
    mobileItems,
    whatsappHref,
    checkoutHref,
  } = useStandPricing();

  return (
    <div className={cn("w-full text-left", className)}>
      {/* -------------------------------------------------------------- */}
      {/* Qué incluye                                                     */}
      {/* -------------------------------------------------------------- */}
      {/* `normal-case` porque el reset global pone los `h3` en uppercase
          (globals.css, capa base). Acá el título es una frase, no una
          etiqueta.

          `font-medium` como en desktop: es el titulo de la ficha de compra y
          pesa mas que los `font-light` del resto de la seccion. */}
      <h3 className="text-2xl font-medium tracking-tight text-balance text-white normal-case">
        {t("title")}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-neutral-400 sm:mt-5">
        {t("description")}
      </p>

      <div className="mt-8 flex items-center gap-x-4">
        <h4 className="flex-none text-sm font-semibold text-green-400">
          {t("includes")}
        </h4>
        <div className="h-px flex-auto bg-white/10" />
      </div>

      {/* Una línea por toggle (ver `mobileItems`), en una sola columna: a este
          ancho, dos columnas dejarían cada item en dos o tres líneas. */}
      <ul role="list" className="mt-6 grid grid-cols-1 gap-y-4 text-sm">
        {mobileItems.map((item) => (
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
              {item.text}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* -------------------------------------------------------------- */}
      {/* Toggles + precio + CTA                                          */}
      {/* -------------------------------------------------------------- */}
      {/* Full bleed: el `-mx-6` cancela el `px-6` de la sección y la caja toma
          el ancho del viewport. Con el ancho de la columna de contenido las
          etiquetas de los toggles quedaban apretadas contra los switches; acá
          hay lugar para que respiren. Sin `rounded` ni bordes laterales, que a
          ancho completo no cierran contra el borde de la pantalla: quedan las
          dos líneas horizontales, que alcanzan para separar el bloque. */}
      <div className="mt-14 -mx-6 border-y border-white/10 bg-neutral-950/60 px-6 py-10 text-center backdrop-blur-sm">
        {/* Los dos toggles comparten una sola grilla de 3 columnas, así
            ambos switches caen en la misma columna central y las etiquetas
            quedan fijadas a los lados sin importar su largo. Sin `max-w`:
            el punto de sacar la caja de la columna es que la grilla use el
            ancho, así que se deja distribuir hasta los bordes.

            `gap-x-3` y no más: la etiqueta más larga ("Columna + cargador",
            18 caracteres) entra justo en 1fr a este ancho, y cada píxel de
            gap se lo saca a las dos columnas de texto. Con `gap-x-4` partía
            en dos líneas y desalineaba la fila. `text-balance` la reparte si
            en alguna pantalla angosta igual tuviera que cortar. */}
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-x-3 gap-y-5 text-balance">
          <span
            className={cn(
              "text-sm font-medium transition-colors duration-300",
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
              "text-sm font-medium transition-colors duration-300",
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
              "text-sm font-medium transition-colors duration-300",
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
              "text-sm font-medium transition-colors duration-300",
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
        <div className="mt-10 flex items-baseline justify-center">
          <AnimateNumber
            locales="en-US"
            format={{ maximumFractionDigits: 0 }}
            prefix={includeInstallation ? t("fromPrefix") : ""}
            suffix=" USD"
            className={cn(
              /* Un escalón más grande y dos de peso que desktop: acá el
                 precio es el único ancla visual del bloque, y a `font-thin`
                 quedaba liviano al lado de los toggles. El `prefix`/`suffix`
                 conservan su tamaño chico por sus propias clases, así que el
                 cambio toca solo al número. */
              "text-6xl font-light tabular-nums text-white",
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

        {/* Cierre del panel: CTA y footnote como un solo bloque de alto fijo.
            El alto sale de la variante más alta medida en la pantalla más
            angosta: CTA 52px + gap 20px + footnote de 4 líneas (el de
            instalación en EN, 145 caracteres, que a 360px de viewport ya no
            entra en 3) = ~163px. Se redondea a 168 para no quedar al filo.
            Así nunca cambia al togglear: el footnote pasa de dos a cuatro
            líneas sin mover nada de lo que tiene arriba ni abajo, que es lo
            que provocaba el salto. Si crece el copy, este número sube.

            Fijado el alto, el reparto va por `justify-between` en vez de por
            márgenes apilados: el sobrante de las variantes cortas se reparte
            entre el CTA y el texto en lugar de acumularse abajo, y el bloque
            respira como los toggles de arriba. El `gap` es el piso mínimo
            entre los dos cuando la variante larga ocupa casi todo. */}
        <div className="mt-10 flex min-h-[168px] flex-col justify-around gap-5">
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
                    location: "mobile",
                  })
            }
            className="flex min-h-[52px] w-[80%] self-center shrink-0 items-center justify-center gap-8 rounded-xl bg-green-400 px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-green-300"
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
                    {includeCharger
                      ? t("cta.withCharger")
                      : t("cta.columnOnly")}
                    <ExternalLink size={16} />
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </a>

          {/* Sin `min-h` propio: el alto lo reserva el wrapper para los dos
              juntos, y acá el texto se centra en lo que le quede. */}
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
              className="text-center text-sm leading-relaxed text-balance text-neutral-400"
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
