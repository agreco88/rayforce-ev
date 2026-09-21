"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { BatteryCharging, PlugZap, ShieldCheck, SmartphoneNfc } from "lucide-react";

import { cn } from "@/lib/utils";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { ChargeSpeedStatCard } from "@/components/charts/ChargeSpeedStatCard";
import { WhatIsWallboxCarousel } from "./WhatIsWallboxCarousel";
import { WallboxDemoVideo } from "./WallboxDemoVideo";

const THEME = {
  accentText: "text-green-400",
};

const SOCKET_TYPE_2_SRC = "/images/icons/socket-type-2.svg";

/**
 * Foto del wallbox instalado. El alt sale de `whatIsIt.imageAlt`. Hace de thumb
 * y de `poster` del video de demo, asi el click no produce ningun salto.
 */
const WALLBOX_IMAGE_SRC =
  "/assets/images/chargers/wallbox-shared-space-building-apartment-complex.webp";

/**
 * Los cuatro argumentos de la grilla, en orden de lectura. Cada uno resuelve su
 * copy contra `whyBetter.cards.<key>` y decide su visual: el 0->100 sigue siendo
 * el anillo (es el unico que realmente cuenta un porcentaje) y el resto usa
 * icono, salvo compatibilidad, que usa el conector Tipo 2 del proyecto.
 *
 * `mobileIcon` es lo que muestra el carousel, que siempre usa un icono de
 * lucide. Dos razones para no reusar el visual de desktop: el anillo tarda 3s
 * en contar y el autoplay cambia a los 4s, asi que casi nunca se veria entero;
 * y la mascara del conector es un bloque de 28px pensado para una tarjeta
 * ancha. Al tile chico de mobile le va mejor un icono parejo en las cuatro.
 */
const CARDS = [
  { key: "safety", visual: "icon", icon: ShieldCheck, mobileIcon: ShieldCheck },
  { key: "speed", visual: "ring", mobileIcon: BatteryCharging },
  { key: "app", visual: "icon", icon: SmartphoneNfc, mobileIcon: SmartphoneNfc },
  { key: "compatible", visual: "mask", mobileIcon: PlugZap },
] as const;

export function WhatIsWallboxSection({ id }: { id?: string }) {
  const t = useTranslations("HomePage.WallboxIntro");
  const tCards = useTranslations("HomePage.WallboxIntro.whyBetter.cards");

  return (
    <section
      id={id}
      className="relative overflow-hidden border-t border-neutral-900 bg-neutral-950"
    >
      <GridBackground
        cellSize={64}
        lineOpacity={0.3}
        className="opacity-30"
        maskImage="radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 80%)"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-6 py-24 sm:px-8 lg:px-16 lg:py-32 2xl:px-0">
        {/* Header 50/50: el copy a la izquierda y el wallbox instalado a la
            derecha. En mobile la imagen baja debajo del texto. Los gaps son los
            mismos que los de la grilla de abajo (`gap-6 lg:gap-8`), asi las dos
            columnas caen exactamente sobre las dos columnas de tarjetas. */}
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
          <motion.div
            variants={waterfallList}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            /* `lg:pr-8`: con el gap ya alineado a la grilla, el texto quedaba
               demasiado cerca del borde de la imagen. */
            className="flex flex-col lg:pr-8 max-w-2xl"
          >
            <motion.span
              variants={waterfallItem}
              className={cn(
                "text-xs uppercase tracking-[0.35em]",
                THEME.accentText,
              )}
            >
              {t("whatIsIt.eyebrow")}
            </motion.span>

            {/* Sin `max-w-2xl`: la columna del 50/50 ya limita el ancho, y el
                cap de antes era para cuando el header iba a todo lo ancho. */}
            <motion.h2
              variants={waterfallItem}
              className="mt-5 text-4xl font-light tracking-tight text-balance text-white sm:text-5xl"
            >
              {t("whatIsIt.title")}
            </motion.h2>

            <motion.p
              variants={waterfallItem}
              className="mt-6 leading-relaxed text-neutral-400"
            >
              {t("whatIsIt.description")}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            /* `16/9`: es la proporcion nativa de la foto (1672x941) y la del
               video (1280x720), asi que el `object-cover` no recorta ninguno
               de los dos ni hay salto al pasar de uno al otro. */
            className="relative aspect-video overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-neutral-800"
          >
            <WallboxDemoVideo
              posterSrc={WALLBOX_IMAGE_SRC}
              posterAlt={t("whatIsIt.imageAlt")}
              labels={{
                cta: t("whatIsIt.video.cta"),
                loading: t("whatIsIt.video.loading"),
                replay: t("whatIsIt.video.replay"),
              }}
            />
          </motion.div>
        </div>

        {/* Grilla 2x2: cada celda es una tarjeta con su visual y su copy.
            Desde `sm` para arriba; abajo de eso va el carousel. El corte es el
            mismo `sm` (640px) en el que `ChargeSpeedStatCard` invierte su
            layout interno, asi el cambio de estructura y el de la tarjeta
            ocurren en el mismo punto y no hay una franja intermedia rara. */}
        <div className="hidden grid-cols-1 items-stretch gap-6 sm:grid lg:grid-cols-2 lg:gap-8">
          {CARDS.map((card, index) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              /* `min-h` para que las cuatro respiren parejo aunque el copy sea
                 mas corto en unas que en otras; la tarjeta reparte su contenido
                 dentro de esa altura. */
              className="flex lg:min-h-[15rem]"
            >
              <ChargeSpeedStatCard
                variant="compact"
                headline={tCards(`${card.key}.headline`)}
                footnote={tCards(`${card.key}.footnote`)}
                visual={card.visual}
                icon={"icon" in card ? card.icon : undefined}
                maskSrc={card.visual === "mask" ? SOCKET_TYPE_2_SRC : undefined}
                maskAlt={
                  card.visual === "mask" ? tCards("socketAlt") : undefined
                }
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile: las mismas cuatro tarjetas en carousel. El header 50/50 de
            arriba no cambia — la foto del wallbox queda fija y esto corre
            debajo, sin acople entre una cosa y la otra.

            El `-mx-6` cancela el padding lateral de la seccion: con `overflow`
            el carousel necesita el ancho completo del viewport para que la
            tarjeta siguiente se asome por el borde. El padding se repone en la
            primera tarjeta via `align="start"` + el propio gap. */}
        <div className="-mx-6 sm:hidden">
          <WhatIsWallboxCarousel
            cards={CARDS.map((card) => ({
              key: card.key,
              icon: card.mobileIcon,
              headline: tCards(`${card.key}.headline`),
              short: tCards(`${card.key}.short`),
            }))}
          />
        </div>
      </div>
    </section>
  );
}
