"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CableModelHeroStats } from "../CableModelHeroStats";
import { ProductSpecsCard } from "../ProductSpecsTable";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
import { useTrack } from "@/lib/analytics";
import {
  formatPowerKw,
  getCableProducts,
  slugLabel,
} from "@/lib/catalog/catalog.helpers";
import type { CableProduct } from "@/lib/catalog/catalog.types";
import { HeroCta, HeroTrust } from "./HeroCheckout";
import { cableGalleryFor } from "./gallery-media";
import { HeroGallery } from "./HeroGallery";
import { CableModelOptions } from "./HeroOptions";
import { HeroPrice } from "./HeroPrice";

const WHATSAPP_NUMBER = "59892041709";

type Props = {
  product: CableProduct;
};

/**
 * El hero de cargadores con un cable: misma ficha a la izquierda y galeria a
 * la derecha, sin los agregados (cable, columna, instalacion), que no aplican.
 */
export function CableModelHeroWithCarousel({ product }: Props) {
  const t = useTranslations("CableModelPage");
  const tSpecs = useTranslations("Common.SpecsTable");
  const locale = useLocale();
  const track = useTrack();
  const { theme } = product;

  // Sin agregados no hace falta `useHeroPurchase`: es el boton del modelo.
  // Los cables todavia no tienen link de MercadoPago, asi que va por WhatsApp.
  const purchase = {
    checkoutUrl: product.mercadopagoUrl,
    whatsappHref: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      t("cta.whatsappMessage", { model: product.publicName }),
    )}`,
    trackCheckout(location: "desktop" | "mobile") {
      if (product.mercadopagoUrl) {
        track.mercadopagoClick({ source: "cable_hero", charger: product.slug, location });
      } else {
        track.whatsappClick({ source: "cable_hero", charger: product.slug });
      }
    },
  };

  return (
    <section className="relative w-full flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#0a0a0a_20%,#111827_60%,#0a0a0a_100%)]" />
        {/* Mobile: detras de la galeria, como en el de cargadores. */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_32rem_at_50%_18rem,var(--glow),transparent)] lg:bg-[radial-gradient(circle_at_80%_50%,var(--glow),transparent_70%)]"
          style={{ "--glow": theme.glow } as CSSProperties}
        />
      </div>

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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
        // Mobile: `pt-24` y sin `pb`, como en el de cargadores.
        className="w-full px-6 sm:px-8 pt-24 sm:pt-38 relative z-20 flex-1 sm:pb-24 lg:pb-32 flex justify-center"
      >
        <div className="mx-auto w-full max-w-[1440px] flex flex-col gap-5 justify-center items-start sm:gap-8 lg:gap-12">
          <AppBreadcrumb
            items={[
              { label: t("breadcrumb.home"), href: "/" },
              { label: t("breadcrumb.accessories"), href: "/accesorios" },
              {
                label: (
                  <span className={theme.accentText}>
                    {slugLabel(product.slug)}
                  </span>
                ),
                dropdown: getCableProducts().map((p) => ({
                  href: `/accesorios/${p.slug}`,
                  current: p.slug === product.slug,
                  label: (
                    <span className={p.theme.accentText}>
                      {slugLabel(p.slug)}
                    </span>
                  ),
                })),
              },
            ]}
          />

          <div className="flex w-full flex-col items-start gap-6 lg:flex-row lg:gap-16">
            <div className="flex w-full flex-col gap-8 justify-center min-w-0 lg:basis-[55%]">
              {/* `@container`: el titulo mide su letra contra este ancho. */}
              <div className="@container flex flex-col gap-5">
                {/* Dos lineas fijas en `cqi`, como el de cargadores: cambiar de
                    cable no agrega lineas (CLS). En mobile, tamaño fijo y corta. */}
                <h1 className="text-2xl leading-tight font-semibold tracking-tight text-white sm:text-4xl lg:text-[length:min(5.6cqi,3rem)] lg:text-nowrap">
                  {t.rich("Hero.title", {
                    style: product.specs.cableStyle,
                    phase: product.specs.phaseType ?? "single",
                    power: formatPowerKw(product.specs.maxPowerKw ?? 7, locale),
                    accent: (chunks) => (
                      <span className={theme.accentText}>{chunks}</span>
                    ),
                    l: (chunks) => <span className="block">{chunks}</span>,
                  })}
                </h1>

                <HeroPrice product={product} price={product.price.amount} />

                {/* Lineas reservadas, las de la mas larga (cinco en mobile, tres
                    desde sm): cambiar de cable no puede correr lo de abajo. */}
                <p className="min-h-[5lh] sm:min-h-[3lh] max-w-2xl text-sm leading-relaxed sm:text-base text-neutral-400">
                  {t(`variants.${product.slug}.description`)}
                </p>

                <div className="pt-3">
                  <CableModelHeroStats theme={theme} product={product} extended />
                </div>
              </div>

              <CableModelOptions product={product} />

              <div className="flex flex-col gap-5">
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <HeroPrice
                    product={product}
                    price={product.price.amount}
                    total
                  />
                  <HeroCta purchase={purchase} theme={theme} />
                </div>
                {/* En mobile, entrega y ficha a sangre y pegadas, como en el
                    de cargadores. */}
                <div className="-mx-6 flex flex-col sm:mx-0 sm:gap-5">
                  <HeroTrust theme={theme} />
                  <ProductSpecsCard
                    product={product}
                    title={tSpecs("eyebrow")}
                    className="border-b-0"
                  />
                </div>
              </div>
            </div>

            {/* `sticky`: acompana el scroll mientras la ficha baja a la
                izquierda. En mobile va primero, como en el de cargadores. */}
            <div className="relative order-first w-full min-w-0 lg:sticky lg:top-28 lg:order-none lg:basis-[45%]">
              <div
                className="absolute inset-8 blur-3xl rounded-full pointer-events-none"
                style={{ backgroundColor: theme.glowStrong }}
              />
              <div className="relative">
                <HeroGallery
                  media={cableGalleryFor(product)}
                  name={product.publicName}
                  theme={theme}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
