"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { CableModelHeroStats } from "./CableModelHeroStats";
import { ProductHeroPriceCard } from "./ProductHeroPriceCard";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
import { GradientText } from "@/components/animated/GradientText";
import {
  getCableProducts,
  getProductImageScaleStyle,
} from "@/lib/catalog/catalog.helpers";
import { useTrack } from "@/lib/analytics";
import type { CableProduct } from "@/lib/catalog/catalog.types";

type Props = {
  product: CableProduct;
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function CableModelHero({ product }: Props) {
  const t = useTranslations("CableModelPage");
  const track = useTrack();
  const { theme } = product;

  return (
    <section className="relative w-full flex items-center">
      {/* ------------------------------------------------------------------ */}
      {/* Background                                                         */}
      {/* ------------------------------------------------------------------ */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* Depth */}
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#0a0a0a_20%,#111827_60%,#0a0a0a_100%)]" />

        {/* Glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 80% 50%, ${theme.glow}, transparent 70%)`,
          }}
        />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to left, rgba(64,64,64,0.25) 0px, black 1px),
            linear-gradient(to top, rgba(64,64,64,0.25) 0px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 100% 0%, #000 20%, transparent 80%)",
        }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Content                                                            */}
      {/* ------------------------------------------------------------------ */}
      {/* Fade solo: sin `y` ni stagger. El contenido esta en su posicion final
          desde el primer frame — la opacidad no genera layout shift, y el
          breadcrumb sigue anclado igual que en los listados. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
        /* El padding va aca y el ancho en el hijo, igual que el header: el
           `px` afuera del `max-w` hace que el carril mida 1440 reales y el
           contenido arranque donde el logo. Con los dos en el mismo div, el
           padding come 32px de adentro y todo queda corrido. */
        className="w-full px-6 sm:px-8 pt-28 sm:pt-58 relative z-20 flex-1 pb-24 lg:pb-32 flex justify-center"
      >
        <div className="mx-auto w-full max-w-[1440px] flex flex-col gap-12 justify-center items-start">
        {/* El breadcrumb va afuera de la fila y no dentro de la columna
            izquierda: asi las dos columnas arrancan a la misma altura y la
            foto queda anclada al eyebrow, sin compensar su alto a mano. */}
        <AppBreadcrumb
          items={[
            { label: t("breadcrumb.home"), href: "/" },
            {
              label: t("breadcrumb.cables"),
              dropdown: [
                {
                  href: "/cables",
                  label: t("breadcrumb.cables"),
                  current: true,
                },
                {
                  href: "/cargadores",
                  label: t("breadcrumb.chargers"),
                },
              ],
            },
            {
              label: (
                <p
                  className={`text-sm uppercase tracking-widest ${theme.accentText}`}
                >
                  {product.slug.toUpperCase()}
                </p>
              ),
              dropdown: getCableProducts().map((p) => ({
                href: `/cables/${p.slug}`,
                current: p.slug === product.slug,
                label: (
                  <span
                    className={`text-sm uppercase tracking-widest ${p.theme.accentText}`}
                  >
                    {p.slug.toUpperCase()}
                  </span>
                ),
              })),
            },
          ]}
        />

        {/* 60/40: la foto va sobre fondo blanco, asi que no puede llevarse la
            mitad del ancho. Dos quintos la acercan al texto sin que le gane.
            `items-start` y no `items-center`: la foto colapsa hacia arriba y
            arranca en la misma linea que el eyebrow. */}
        <div className="flex w-full items-start gap-12 lg:gap-16">
          {/* LEFT */}
          <div className="flex flex-col gap-12 justify-center basis-3/5 min-w-0">
            {/* Title */}
            <div className="flex flex-col gap-5">
              <p
                className={`text-sm uppercase tracking-widest ${theme.accentText}`}
              >
                {t(`eyebrow.${product.slug}`)}
              </p>

              {/* Solo la potencia y no el `shortName`: el largo y el formato
                  ya estan en el eyebrow y en el strip, y repetirlos aca hacia
                  wrappear el h1 y empujaba el precio fuera del fold. */}
              <h1 className="flex flex-wrap items-baseline text-7xl gap-x-3 leading-[1.1]">
                {t(`titlePrefix.${product.slug}`)}
                <GradientText
                  colors={theme.gradientColors}
                  className="font-thin"
                >
                  {product.specs.maxPowerKw}kW
                </GradientText>
              </h1>

              {/* Tres lineas reservadas: a este ancho las descripciones van de
                  dos a tres segun el modelo, y sin altura fija cambiar de cable
                  desplaza todo lo de abajo. */}
              <span className="block text-neutral-400 text-base leading-relaxed max-w-2xl min-h-[4.5rem]">
                {t(`variants.${product.slug}.description`)}
              </span>
            </div>

            {/* Stats */}
            <CableModelHeroStats theme={theme} slug={product.slug} />

            <ProductHeroPriceCard
              amount={product.price.amount}
              currency={product.price.currency}
              taxLabel={t("price.taxLabel")}
              theme={theme}
              href="#precio"
              ctaLabel={t("cta.viewPrice")}
              onCtaClick={() => track.cableHeroPrice(product.slug, "desktop")}
            />
          </div>

          {/* RIGHT */}
          <div className="relative basis-2/5 min-w-0">
            {/* Glow del tema por fuera del container, donde el recorte no lo
                corta. */}
            <div
              className="
                absolute inset-8
                blur-3xl rounded-full pointer-events-none
              "
              style={{ backgroundColor: theme.glowStrong }}
            />

            {/* Mismo gradiente de neutrales que el hero de cargadores y las
                tarjetas. El PNG de cable ya viene recortado sobre
                transparente, asi que aca no hace falta cambiar de imagen. */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900 shadow-2xl shadow-black/40">
              <Image
                src={product.photoImage}
                alt={product.publicName}
                width={1200}
                height={1200}
                // El hero es el LCP de la pagina: sin lazy y con prioridad.
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                style={getProductImageScaleStyle(product)}
                // `p-10` + `aspect-square`: el PNG viene recortado al producto,
                // sin el aire que traia la foto, y pegado al borde se ve
                // apretado contra el `rounded-3xl`.
                className="aspect-square w-full object-contain p-10 scale-[var(--product-image-scale)]"
              />
            </div>
          </div>
        </div>
        </div>
      </motion.div>
    </section>
  );
}
