"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useChargerCrumbLabel } from "../useChargerCrumbLabel";
import { ChargerModelHeroStats } from "../ChargerModelHeroStats";
import { ProductSpecsCard } from "../ProductSpecsTable";
import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
import {
  formatPowerKw,
  getChargerProducts,
} from "@/lib/catalog/catalog.helpers";
import type { CableProduct, ChargerProduct } from "@/lib/catalog/catalog.types";
import { HeroCta, HeroTrust } from "./HeroCheckout";
import { galleryFor } from "./gallery-media";
import { HeroGallery } from "./HeroGallery";
import {
  CableOptions,
  ColumnOptions,
  InstallationOptions,
  PowerOptions,
} from "./HeroOptions";
import { HeroPrice } from "./HeroPrice";
import { useHeroPurchase } from "./use-hero-purchase";

type Props = {
  product: ChargerProduct;
};

// Los cables del modelo anterior, fuera de React: cambiar de potencia remonta
// la pagina, y sin esto el grupo no sabria si tiene que entrar o salir.
// `null` en la primera carga, que no anima.
let lastCables: CableProduct[] | null = null;

/**
 * La ficha a la izquierda: titulo, precio, descripcion, stats, variantes y el
 * boton de compra. A la derecha, la galeria. En mobile, apilado con la galeria
 * arriba.
 */
export function ChargerModelHeroWithCarousel({ product }: Props) {
  const t = useTranslations("ChargerModelPage");
  const crumbLabel = useChargerCrumbLabel();
  const tSpecs = useTranslations("Common.SpecsTable");
  const locale = useLocale();
  const purchase = useHeroPurchase(product);
  const { theme } = product;

  const [shownCables, setShownCables] = useState(
    () => lastCables ?? purchase.cables,
  );
  useEffect(() => {
    lastCables = purchase.cables;
    setShownCables(purchase.cables);
  }, [purchase.cables]);

  const media = galleryFor(product);

  return (
    <section className="relative w-full flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#0a0a0a_20%,#111827_60%,#0a0a0a_100%)]" />
        {/* Mobile: detras de la galeria y con radio fijo. Centrado en el
            alto, caia sobre opciones y precios, y el gris no contrastaba. */}
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
        // Mobile: `pt-24`, el header (80px) y apenas aire: titulo y precio
        // tienen que entrar en la primera pantalla. Sin `pb`: la ficha a
        // sangre cierra el hero y el aire lo pone la seccion siguiente.
        className="w-full px-6 sm:px-8 pt-24 sm:pt-38 relative z-20 flex-1 sm:pb-24 lg:pb-32 flex justify-center"
      >
        <div className="mx-auto w-full max-w-[1440px] flex flex-col gap-5 justify-center items-start sm:gap-8 lg:gap-12">
          <AppBreadcrumb
            items={[
              { label: t("breadcrumb.home"), href: "/" },
              { label: t("breadcrumb.chargers"), href: "/cargadores" },
              {
                label: (
                  <span className={theme.accentText}>
                    {crumbLabel(product)}
                  </span>
                ),
                dropdown: getChargerProducts().map((p) => ({
                  href: `/cargadores/${p.slug}`,
                  current: p.slug === product.slug,
                  label: (
                    <span className={p.theme.accentText}>{crumbLabel(p)}</span>
                  ),
                })),
              },
            ]}
          />

          <div className="flex w-full flex-col items-start gap-6 lg:flex-row lg:gap-16">
            <div className="flex w-full flex-col gap-8 justify-center min-w-0 lg:basis-[55%]">
              {/* `@container`: el titulo mide su letra contra este ancho. */}
              <div className="@container flex flex-col gap-5">
                {/* Desde lg, dos lineas fijas (`<l>` en el JSON) que no cortan, con
                    la letra en `cqi` para que la mas larga llene la columna:
                    cambiar de modelo no agrega lineas (CLS). Debajo, corren como
                    una frase balanceada en tres: partidas, la primera no entraba
                    y dejaba "trifásico" solo. */}
                <h1 className="min-h-[3lh] text-2xl leading-tight font-semibold tracking-tight text-balance text-white sm:min-h-0 sm:text-4xl lg:text-[length:min(5.2cqi,3rem)] lg:text-nowrap">
                  {t.rich("Hero.title", {
                    tier: product.tier,
                    phase: product.specs.phaseType,
                    cable: product.specs.cableType,
                    power: formatPowerKw(product.specs.maxPowerKw, locale),
                    accent: (chunks) => (
                      <span className={`whitespace-nowrap ${theme.accentText}`}>
                        {chunks}
                      </span>
                    ),
                    l: (chunks) => <span className="lg:block">{chunks} </span>,
                  })}
                </h1>

                {/* El precio de lista, fijo: lo que suman las variantes se ve
                    en el total junto al boton, donde se eligen. */}
                <HeroPrice product={product} price={product.price.amount} />

                {/* Lineas reservadas, las de la mas larga: cuatro en mobile,
                    dos desde xl. Cambiar de modelo no puede correr stats ni
                    variantes (CLS). */}
                <p className="min-h-[4lh] sm:min-h-[2lh] max-w-2xl text-sm leading-relaxed sm:text-base text-neutral-400">
                  {t(`variants.${product.slug}.description`)}
                </p>

                <div className="pt-3">
                  <ChargerModelHeroStats
                    theme={theme}
                    product={product}
                    extended
                  />
                </div>
              </div>

              {/* El cable solo en el BA, que viene sin; columna e instalacion en todos. */}
              <div className="flex flex-col">
                <PowerOptions product={product} />
                {/* Entra y sale abriendo el alto. El espacio va de padding
                    adentro y no de `gap`: un gap saltaria al terminar. */}
                <AnimatePresence initial={false}>
                  {shownCables.length > 0 && (
                    <motion.div
                      key="cables"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6">
                        <CableOptions
                          cables={shownCables}
                          selected={purchase.cableSlug}
                          onSelect={purchase.setCableSlug}
                          theme={theme}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="pt-6">
                  <ColumnOptions
                    selected={purchase.withColumn}
                    onSelect={purchase.setWithColumn}
                    theme={theme}
                  />
                </div>
                <div className="pt-6">
                  <InstallationOptions purchase={purchase} theme={theme} />
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {/* 50/50: la etiqueta del boton (MercadoPago o WhatsApp) y el
                    "desde" del total cambian de largo sin correr nada. Sin
                    `items-center`: el boton se estira al alto de la caja. En
                    mobile no entran lado a lado y van apilados. */}
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <HeroPrice
                    product={product}
                    price={purchase.price}
                    from={purchase.withInstallation}
                    total
                  />
                  <HeroCta purchase={purchase} theme={theme} />
                </div>
                {/* En mobile, entrega y ficha van a sangre y pegadas: un borde
                    las separa, sin franja vacia. La ficha cierra el hero sin
                    borde abajo; esa linea la pone la seccion siguiente. */}
                <div className="-mx-6 flex flex-col sm:mx-0 sm:gap-5">
                  <HeroTrust theme={theme} />
                  {/* "Ficha técnica" (el eyebrow de la seccion) y no
                      "Especificaciones": es lo que se busca en Uruguay. */}
                  <ProductSpecsCard
                    product={product}
                    title={tSpecs("eyebrow")}
                    className="border-b-0"
                  />
                </div>
              </div>
            </div>

            {/* 55/45 y no el 60/40 del original: la galeria va sobre el
                gradiente, no sobre blanco, y puede llevarse mas ancho.
                `sticky`: acompana el scroll mientras la ficha baja a la izquierda.
                En mobile va primero: es lo que se ve al entrar. */}
            <div className="relative order-first w-full min-w-0 lg:sticky lg:top-28 lg:order-none lg:basis-[45%]">
              <div
                className="absolute inset-8 blur-3xl rounded-full pointer-events-none"
                style={{ backgroundColor: theme.glowStrong }}
              />
              <div className="relative">
                <HeroGallery
                  media={media}
                  name={t(`variants.${product.slug}.fullName`)}
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
