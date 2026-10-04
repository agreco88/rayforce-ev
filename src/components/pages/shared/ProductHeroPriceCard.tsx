"use client";

import { AnimateNumber } from "motion-plus/react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import type { CatalogTheme } from "@/lib/catalog/catalog.types";

type Props = {
  amount: number;
  currency: string;
  taxLabel: string;
  theme: CatalogTheme;
  /** Ancla del bloque de precios (`#precios`), o el checkout si `checkout`. */
  href: string;
  ctaLabel: string;
  onCtaClick?: () => void;
  /** El CTA es el boton de MercadoPago y no un link a la seccion de precios:
   *  los cables no tienen seccion de precios y se compran desde el hero. */
  checkout?: boolean;
  /** Link secundario debajo de la tarjeta (el manual, donde exista). */
  secondary?: ReactNode;
  /** Ancho fijo para el precio y el CTA, donde cambian con las variantes: si
   *  no, el ancho que anima AnimateNumber y el cambio de etiqueta corren la
   *  tarjeta. */
  stableWidth?: boolean;
  /** La tarjeta toma el ancho de la columna y reparte sus partes en el. */
  fullWidth?: boolean;
};

/**
 * Precio + CTA como una sola tarjeta, con un separador vertical entre medio.
 *
 * Antes eran dos cajas sueltas — la tarjeta del precio y un boton al lado, de
 * otra altura y sin relacion visual entre si. Metiendo el CTA adentro del mismo
 * borde el bloque se lee como una sola unidad: cuanto sale y donde se compra.
 *
 * En cargadores el CTA baja al bloque de precios en vez de ir al checkout: la
 * salida final (MercadoPago o WhatsApp) depende de los toggles de esa seccion.
 */
export function ProductHeroPriceCard({
  amount,
  currency,
  taxLabel,
  theme,
  href,
  ctaLabel,
  onCtaClick,
  checkout,
  secondary,
  stableWidth,
  fullWidth,
}: Props) {
  return (
    <div className="flex flex-col items-start gap-4">
      <div
        // `justify-around` y no hijos con `flex-1`: la tarjeta llena la
        // columna pero precio, separador y CTA conservan su ancho.
        className={`flex items-stretch rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm ${
          fullWidth ? "w-full justify-around" : "w-fit"
        }`}
        aria-label={`${amount} ${currency} ${taxLabel}`}
      >
        {/* El `USD` va como span aparte y no como `suffix` de AnimateNumber:
            adentro es `.number-section-post`, que trae padding propio para la
            mascara de la animacion y no se deja alinear con el numero. */}
        <div
          className="flex flex-col items-center px-7 py-5"
          aria-hidden="true"
        >
          {/* `items-baseline`: el `USD` apoya en la misma linea de base que el
              numero, no en el borde de su caja. */}
          {/* `w-64`: entra "1,093 USD", el combo mas caro (BA + cable + columna). */}
          <div
            className={`flex items-baseline gap-3 ${stableWidth ? "w-64 justify-center" : ""}`}
          >
            <AnimateNumber
              locales="en-US"
              format={{ maximumFractionDigits: 0 }}
              style={{
                // @ts-expect-error -- CSS custom property consumed by the [&_.number-section-integer] rule below
                "--price-gradient": `linear-gradient(to right, ${theme.gradientColors.join(", ")})`,
              }}
              className={`
                text-7xl font-light tabular-nums
                [&_.number-section-integer]:bg-[image:var(--price-gradient)] [&_.number-section-integer]:bg-clip-text [&_.number-section-integer]:text-transparent
              `}
              transition={{
                visualDuration: 0.6,
                type: "spring",
                bounce: 0.25,
                opacity: { duration: 0.3, ease: "linear" },
              }}
            >
              {amount}
            </AnimateNumber>

            {/* `top-1`: las curvas del numero sobrepasan la baseline (overshoot
                optico), asi que el `USD` apoyado en la linea matematica se lee
                alto. Va con `relative` y no con `mt` porque bajo
                `items-baseline` el margen no lo desplaza. */}
            <span className="relative top-1 text-xl font-medium tracking-wide text-neutral-400">
              {currency}
            </span>
          </div>

          <span className="text-base text-neutral-500">{taxLabel}</span>
        </div>

        {/* El separador no llega a los bordes: con `my` deja aire arriba y
            abajo y se lee como division interna, no como dos cajas pegadas. */}
        <div className="my-5 w-px bg-white/10" />

        {checkout ? (
          <div className="flex items-center px-6">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onCtaClick}
              // `w-64`: entra "Comprar por MercadoPago", la etiqueta mas larga.
              className={`
                inline-flex min-h-[48px] items-center justify-center rounded-xl px-5
                ${stableWidth ? "w-64" : ""}
                ${theme.accentBg} ${theme.accentHover}
                text-sm font-semibold text-black transition-colors
              `}
            >
              {/* Si la etiqueta cambia (MercadoPago ↔ WhatsApp) se cruzan con
                  un fade, apiladas en la misma celda. */}
              <span className="grid">
                <AnimatePresence initial={false}>
                  <motion.span
                    key={ctaLabel}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="inline-flex items-center justify-center gap-2 [grid-area:1/1]"
                  >
                    {ctaLabel}
                    <ExternalLink size={16} />
                  </motion.span>
                </AnimatePresence>
              </span>
            </a>
          </div>
        ) : (
          /* `self-stretch` y no una altura fija: el CTA toma el alto del
             precio, que es quien manda en la tarjeta. */
          <a
            href={href}
            onClick={onCtaClick}
            className={`
              group inline-flex items-center gap-2 self-stretch px-7
              ${theme.accentText} text-sm font-semibold
              rounded-r-2xl hover:bg-white/5 transition-colors
            `}
          >
            {ctaLabel}
            <ChevronDown
              size={16}
              className="transition-transform group-hover:translate-y-0.5"
            />
          </a>
        )}
      </div>

      {secondary}
    </div>
  );
}

/**
 * La misma tarjeta para mobile, apilada: a ese ancho el precio y el CTA lado a
 * lado no entran, asi que el separador pasa a horizontal y el boton toma toda
 * la fila.
 */
export function ProductHeroPriceCardMobile({
  amount,
  currency,
  taxLabel,
  theme,
  href,
  ctaLabel,
  onCtaClick,
  checkout,
}: Omit<Props, "secondary">) {
  return (
    <div
      className="flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm"
      aria-label={`${amount} ${currency} ${taxLabel}`}
    >
      <div className="flex flex-col items-center py-5" aria-hidden="true">
        <div className="flex items-baseline gap-2">
          <AnimateNumber
            locales="en-US"
            format={{ maximumFractionDigits: 0 }}
            style={{
              // @ts-expect-error -- CSS custom property consumed by the [&_.number-section-integer] rule below
              "--price-gradient": `linear-gradient(to right, ${theme.gradientColors.join(", ")})`,
            }}
            className={`
              text-5xl font-light tabular-nums
              [&_.number-section-integer]:bg-[image:var(--price-gradient)] [&_.number-section-integer]:bg-clip-text [&_.number-section-integer]:text-transparent
            `}
            transition={{
              visualDuration: 0.6,
              type: "spring",
              bounce: 0.25,
              opacity: { duration: 0.3, ease: "linear" },
            }}
          >
            {amount}
          </AnimateNumber>

          <span className="relative top-0.5 text-base font-medium tracking-wide text-neutral-400">
            {currency}
          </span>
        </div>

        <span className="text-sm text-neutral-500">{taxLabel}</span>
      </div>

      <div className="h-px bg-white/10" />

      {checkout ? (
        <div className="p-3">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onCtaClick}
            className={`
              flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl
              ${theme.accentBg} ${theme.accentHover}
              text-sm font-semibold text-black transition-colors
            `}
          >
            {ctaLabel}
            <ExternalLink size={16} />
          </a>
        </div>
      ) : (
        /* `min-h-[52px]`: target tactil comodo sin depender del padding. */
        <a
          href={href}
          onClick={onCtaClick}
          className={`
            inline-flex min-h-[52px] items-center justify-center gap-2
            ${theme.accentText} text-sm font-semibold
            hover:bg-white/5 transition-colors
          `}
        >
          {ctaLabel}
          <ChevronDown size={16} />
        </a>
      )}
    </div>
  );
}
