"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ArrowDownToLine } from "lucide-react";

import Image from "next/image";
import { GradientText } from "@/components/animated/GradientText";
import { ChargerModelHeroStats } from "./ChargerModelHeroStats";
import { ProductHeroPriceCardMobile } from "./ProductHeroPriceCard";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
import { getChargerProducts } from "@/lib/catalog/catalog.helpers";
import { useTrack } from "@/lib/analytics";
import type { ChargerProduct } from "@/lib/catalog/catalog.types";

type Props = {
  product: ChargerProduct;
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function ChargerModelHeroMobile({ product }: Props) {
  const t = useTranslations("ChargerModelPage");
  const track = useTrack();
  const { theme } = product;

  return (
    <section
      className="
        relative overflow-x-hidden
        min-h-screen
      "
    >
      {/* -------------------------------------------------------------- */}
      {/* Background                                                     */}
      {/* -------------------------------------------------------------- */}
      <div className="absolute inset-0">
        {/* Base */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0a0a_0%,#111827_60%,#0a0a0a_100%)]" />

        {/* Glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 20%, ${theme.glow}, transparent 70%)`,
          }}
        />
      </div>

      {/* -------------------------------------------------------------- */}
      {/* Content                                                        */}
      {/* -------------------------------------------------------------- */}
      {/* Fade solo: sin `y` ni stagger. El contenido esta en su posicion final
          desde el primer frame y la opacidad no genera layout shift. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
        className="
          relative z-20
          flex flex-col
          min-h-screen
          px-3
          pt-8
          pb-12
        "
      >
        {/* Breadcrumb */}
        <AppBreadcrumb
          className="mt-16 mb-8 flex justify-center z-[999]"
          items={[
            { label: t("breadcrumb.home"), href: "/" },
            // Sin dropdown: desde un cargador solo se navega a otro cargador,
            // asi que el nivel de linea es un link y nada mas.
            { label: t("breadcrumb.chargers"), href: "/cargadores" },
            {
              label: (
                <p
                  className={`text-xs uppercase tracking-widest ${theme.accentText}`}
                >
                  {product.slug.toUpperCase()}
                </p>
              ),
              dropdown: getChargerProducts().map((p) => ({
                href: `/cargadores/${p.slug}`,
                current: p.slug === product.slug,
                label: (
                  <span
                    className={`text-xs uppercase tracking-widest ${p.theme.accentText}`}
                  >
                    {p.slug.toUpperCase()}
                  </span>
                ),
              })),
            },
          ]}
        />

        {/* -------------------------------------------------------------- */}
        {/* Content Block                                                 */}
        {/* -------------------------------------------------------------- */}
        <div className="flex flex-col gap-4 items-center">
          {/* Eyebrow */}
          <p
            className={`max-w-[30ch] text-center text-xs uppercase leading-relaxed tracking-[0.2em] ${theme.accentText}`}
          >
            {t(`eyebrow.${product.slug}`)}
          </p>

          {/* Title */}
          <div className="flex flex-col items-center gap-2">
            {/* Alturas reservadas: el shortName mas largo ("7,2kW con toma")
                wrappea a dos lineas y las descripciones varian, asi que sin
                `min-h` cambiar de modelo mueve todo lo de abajo. */}
            <h1 className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 leading-none text-center min-h-[4.5rem]">
              <span className="text-6xl font-semibold text-white">BS20</span>

              <GradientText
                colors={theme.gradientColors}
                className="text-6xl font-thin"
              >
                {product.shortName}
              </GradientText>
            </h1>

            <p className="text-neutral-400 pt-2 leading-snug text-base  text-center max-w-[35ch] min-h-[4rem]">
              {t(`variants.${product.slug}.description`)}
            </p>

          </div>
          {/* -------------------------------------------------------------- */}
          {/* Charger                                                       */}
          {/* -------------------------------------------------------------- */}
          <div className="relative w-full pt-4">
            {/* Glow por fuera del container: adentro se perderia contra el
                fondo blanco de la foto. */}
            <div
              className="absolute inset-6 blur-3xl rounded-full pointer-events-none"
              style={{ backgroundColor: theme.glowStrong }}
            />

            {/* La foto viene sobre fondo blanco, asi que el container es claro
                y el recorte lo da el `rounded-3xl` + `overflow-hidden`. */}
            <div className="relative mx-auto max-w-[360px] overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl shadow-black/40">
              <Image
                src={product.photoImage}
                alt={t(`variants.${product.slug}.fullName`)}
                width={720}
                height={720}
                // El hero es el LCP de la pagina: sin lazy y con prioridad.
                priority
                sizes="(max-width: 640px) 100vw, 360px"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          {/* Stats */}
          <ChargerModelHeroStats theme={theme} product={product} />

          {/* Precio + CTA como una sola tarjeta, igual que en desktop pero
              apilada. El precio vivia arriba, pegado a la descripcion, lejos
              del boton que lleva a comprarlo. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex w-full flex-col items-center gap-5 pt-10"
          >
            <ProductHeroPriceCardMobile
              amount={product.price.amount}
              currency={product.price.currency}
              taxLabel={t("price.taxLabel")}
              theme={theme}
              href="#precios"
              ctaLabel={t("cta.pricing")}
            />

            {/* El manual como link y no como boton: es secundario, y al lado
                del CTA de precio le competia el peso visual. */}
            {product.datasheetUrl && (
              <a
                href={product.datasheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track.chargerHeroDatasheet(product.slug, "mobile")
                }
                className="inline-flex min-h-[44px] items-center gap-2 text-sm text-neutral-400 underline-offset-4 hover:text-white hover:underline transition-colors"
              >
                <ArrowDownToLine size={15} />
                {t("cta.manual")}
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
