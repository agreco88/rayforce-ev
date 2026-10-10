"use client";

import { AnimatePresence, motion } from "motion/react";
import { AnimateNumber } from "motion-plus/react";
import { useTranslations } from "next-intl";
import { CheckIcon, ExternalLink } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { useTrack } from "@/lib/analytics";
import { StandOptions } from "./StandOptions";
import { BUNDLED_CHARGER_SLUG, useStandPricing } from "./useStandPricing";

/**
 * Versión mobile del panel de precio de la columna. Misma información y mismo
 * recorrido que desktop (`StandPricingPanel`), y exactamente el mismo precio:
 * los dos consumen `useStandPricing`, así que acá solo vive el layout.
 *
 * La diferencia es la caja. En desktop el panel es un contenedor con la lista
 * a la izquierda y las opciones en una caja a la derecha; a ancho de celular
 * esas dos cajas quedan una adentro de la otra y entre bordes y padding se van
 * ~58px de ancho útil. Acá todo va en un solo bloque a sangre, sin caja
 * interna.
 *
 * Cero CLS al elegir, por dos mecanismos distintos: los items quedan siempre
 * montados y solo cambian de estado activo/inactivo, y el cierre (CTA +
 * footnote) tiene alto fijo reservado para su variante más alta.
 */
export function StandPricingPanelMobile({ className }: { className?: string }) {
  const t = useTranslations("HomePage.HomeStandSection.pricingPanel");
  const track = useTrack();
  const pricing = useStandPricing();
  const {
    includeCharger,
    includeInstallation,
    total,
    mobileItems,
    whatsappHref,
    checkoutHref,
  } = pricing;

  return (
    // Negro desde el título: lista, opciones y precio son una misma ficha.
    // Arrancando en los toggles, se leían como dos bloques distintos. El
    // `-mx-6` cancela el `px-6` de la sección; sin `rounded` ni bordes
    // laterales, que a ancho completo no cierran contra el borde de la pantalla.
    <div
      className={cn(
        "-mx-6 border-y border-white/10 bg-neutral-950/60 px-6 py-10 text-left backdrop-blur-sm",
        className,
      )}
    >
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

      {/* Una línea por opción (ver `mobileItems`), en una sola columna: a este
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

      <div className="mt-10">
        <StandOptions pricing={pricing} />
      </div>

      <div className="mt-10 text-center">
        {/* "Desde" y "USD" van como prefix/suffix de AnimateNumber (y no
            como hermanos) para que entren en su grupo de layout animation y
            acompañen el cambio de ancho de los dígitos en vez de saltar.
            Con instalación el precio es "desde": el final depende del sitio. */}
        <div className="flex items-baseline justify-center">
          <AnimateNumber
            locales="en-US"
            format={{ maximumFractionDigits: 0 }}
            prefix={includeInstallation ? t("fromPrefix") : ""}
            suffix=" USD"
            className={cn(
              /* Un escalón más grande y dos de peso que desktop: acá el
                 precio es el único ancla visual del bloque, y a `font-thin`
                 quedaba liviano al lado de las opciones. El `prefix`/`suffix`
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
            Así nunca cambia al elegir: el footnote pasa de dos a cuatro
            líneas sin mover nada de lo que tiene arriba ni abajo, que es lo
            que provocaba el salto. Si crece el copy, este número sube.

            Fijado el alto, el reparto va por `justify-between` en vez de por
            márgenes apilados: el sobrante de las variantes cortas se reparte
            entre el CTA y el texto en lugar de acumularse abajo. El `gap` es
            el piso mínimo entre los dos cuando la variante larga ocupa casi
            todo. */}
        <div className="mt-10 flex min-h-[168px] flex-col justify-around gap-5">
          {/* A todo el ancho y nombrando el medio de pago, no lo que se
              compra (eso lo dicen las opciones y el footnote): con
              "Comprar columna + cargador" el botón partía en dos líneas. */}
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
            className="flex min-h-[52px] w-full shrink-0 items-center justify-center rounded-xl bg-green-400 px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-green-300"
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
