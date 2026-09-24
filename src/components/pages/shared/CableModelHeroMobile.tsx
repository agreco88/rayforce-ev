"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useTrack } from "@/lib/analytics";

import { CableModelHeroStats } from "./CableModelHeroStats";
import { ProductHeroPriceCardMobile } from "./ProductHeroPriceCard";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
import {
  getCableProducts,
  getProductImageScaleStyle,
} from "@/lib/catalog/catalog.helpers";
import type { CableProduct } from "@/lib/catalog/catalog.types";

type Props = {
  product: CableProduct;
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function CableModelHeroMobile({ product }: Props) {
  const t = useTranslations("CableModelPage");
  const track = useTrack();
  const { theme } = product;

  return (
    <section
      className="
        relative overflow-x-hidden
        border-b border-neutral-900
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
                  className={`text-xs uppercase tracking-widest ${theme.accentText}`}
                >
                  {product.slug.toUpperCase()}
                </p>
              ),
              dropdown: getCableProducts().map((p) => ({
                href: `/cables/${p.slug}`,
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
            className={`text-xs uppercase tracking-[0.3em] ${theme.accentText}`}
          >
            {t(`eyebrow.${product.slug}`)}
          </p>

          {/* Title */}
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl font-semibold text-white leading-tight text-center max-w-[18ch]">
              {t(`titlePrefix.${product.slug}`)}
              {product.specs.maxPowerKw && (
                <>
                  {" "}
                  {t("titlePowerConnector")}{" "}
                  <span className={`font-thin ${theme.accentText}`}>
                    {product.specs.maxPowerKw}kW
                  </span>
                </>
              )}
            </h1>

            <p className="text-neutral-400 pt-2 leading-snug text-base  text-center max-w-[35ch]">
              {t(`variants.${product.slug}.description`)}
            </p>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* Cable                                                          */}
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
                alt={product.publicName}
                width={720}
                height={720}
                // El hero es el LCP de la pagina: sin lazy y con prioridad.
                priority
                sizes="(max-width: 640px) 100vw, 360px"
                style={getProductImageScaleStyle(product)}
                className="w-full h-auto object-contain scale-[var(--product-image-scale)]"
              />
            </div>
          </div>

          {/* Stats */}
          <CableModelHeroStats theme={theme} slug={product.slug} />

          {/* Precio + CTA como una sola tarjeta, igual que en desktop pero
              apilada: a este ancho el precio y el boton lado a lado no entran. */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-6 w-full"
          >
            <ProductHeroPriceCardMobile
              amount={product.price.amount}
              currency={product.price.currency}
              taxLabel={t("price.taxLabel")}
              theme={theme}
              href="#precio"
              ctaLabel={t("cta.viewPrice")}
              onCtaClick={() => track.cableHeroPrice(product.slug, "mobile")}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
