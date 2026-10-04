"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ChargerModelHeroStats } from "./ChargerModelHeroStats";
import { ProductHeroPriceCard } from "./ProductHeroPriceCard";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
import { GradientText } from "@/components/animated/GradientText";
import { getChargerProducts } from "@/lib/catalog/catalog.helpers";
import type { ChargerProduct } from "@/lib/catalog/catalog.types";

type Props = {
  product: ChargerProduct;
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function ChargerModelHero({ product }: Props) {
  const t = useTranslations("ChargerModelPage");
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
        className="w-full px-6 sm:px-8 pt-28 sm:pt-38 relative z-20 flex-1 pb-24 lg:pb-32 flex justify-center"
      >
        <div className="mx-auto w-full max-w-[1440px] flex flex-col gap-12 justify-center items-start">
        {/* El breadcrumb va afuera de la fila y no dentro de la columna
            izquierda: asi las dos columnas arrancan a la misma altura y la
            foto queda anclada al eyebrow, sin compensar su alto a mano. */}
        <AppBreadcrumb
          items={[
            { label: t("breadcrumb.home"), href: "/" },
            // Sin dropdown: desde un cargador solo se navega a otro
            // cargador, asi que el nivel de linea es un link y nada mas.
            { label: t("breadcrumb.chargers"), href: "/cargadores" },
            {
              label: (
                <p
                  className={`text-sm uppercase tracking-widest ${theme.accentText}`}
                >
                  {product.slug.toUpperCase()}
                </p>
              ),
              dropdown: getChargerProducts().map((p) => ({
                href: `/cargadores/${p.slug}`,
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
              {/* El eyebrow va adentro del h1: se ve igual, y el h1 lleva
                  "cargador de auto electrico" y no solo el codigo de modelo. */}
              <h1 className="flex flex-col gap-5">
                <span
                  className={`text-sm font-normal uppercase tracking-widest ${theme.accentText}`}
                >
                  {t(`eyebrow.${product.slug}`)}
                </span>{" "}

                {/* Los `{" "}`: el `gap` separa solo en pantalla, y sin espacio
                    real el texto del h1 queda "tomaBS207,2kW". */}
                <span className="flex flex-wrap items-baseline text-7xl gap-x-3 leading-[1.1]">
                  BS20{" "}
                  <GradientText
                    colors={theme.gradientColors}
                    className="font-thin"
                  >
                    {product.shortName}
                  </GradientText>
                </span>
              </h1>

              {/* Cuatro lineas reservadas: a este ancho la descripcion mas
                  larga (22kW) wrappea en cuatro, y sin altura fija cambiar de
                  modelo desplaza todo lo de abajo. */}
              <span className="block text-neutral-400 text-base leading-relaxed max-w-2xl min-h-[6rem]">
                {t(`variants.${product.slug}.description`)}
              </span>
            </div>

            {/* Stats */}
            <ChargerModelHeroStats theme={theme} product={product} />

            <ProductHeroPriceCard
              amount={product.price.amount}
              currency={product.price.currency}
              taxLabel={t("price.taxLabel")}
              theme={theme}
              href="#precios"
              ctaLabel={t("cta.pricing")}
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

            {/* Mismo gradiente de neutrales que las tarjetas de la grilla.
                Va con `cardImage` (PNG recortado) y no con `photoImage`: ese
                es un JPG con el blanco horneado y taparia el gradiente. */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-600 via-neutral-700 to-neutral-900 shadow-2xl shadow-black/40">
              <Image
                src={product.cardImage}
                alt={t(`variants.${product.slug}.fullName`)}
                width={1200}
                height={1200}
                // El hero es el LCP de la pagina: sin lazy y con prioridad.
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                // `p-10` + `aspect-square`: el PNG viene recortado al producto,
                // sin el aire que traia la foto, y pegado al borde se ve
                // apretado contra el `rounded-3xl`.
                className="aspect-square w-full object-contain p-10"
              />
            </div>
          </div>
        </div>
        </div>
      </motion.div>
    </section>
  );
}
