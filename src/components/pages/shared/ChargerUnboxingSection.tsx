"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Ban, RotateCcw } from "lucide-react";
import { ChargerModelStats } from "@/components/pages/shared/ChargerModelStats";
import type { ChargerProduct } from "@/lib/catalog/catalog.types";

type Props = {
  product: ChargerProduct;
  id?: string;
};

/**
 * Qué viene en la caja. El copy y los assets van por familia, no por
 * variante: los tres BC salen en la misma caja con el cable integrado, y el
 * BA es el único que sale con toma. Por eso el BA trae solo el video y los
 * BC suman la foto del contenido desplegado.
 */
export function ChargerUnboxingSection({ product, id }: Props) {
  const t = useTranslations(`ChargerModelPage.Unboxing.${product.family}`);
  // La lista de contenido es la misma copy para las dos familias: lo que
  // cambia es que renglones incluye cada caja, y eso lo dice el catalogo.
  const tSection = useTranslations("ChargerModelPage.Unboxing");
  const { theme, unboxing, specs } = product;
  // El `-APP` del codigo es interno y no aporta nada en una lista de contenido.
  const modelName = product.modelCode.replace(/-APP$/, "");

  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);

  const replay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setEnded(false);
  };

  return (
    <section
      id={id}
      className="relative w-full border-b border-neutral-900 bg-[#0a0a0a] py-20 sm:py-28"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-12 px-4 sm:px-6 lg:px-16 2xl:px-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex max-w-2xl flex-col gap-4"
        >
          <span
            className={`text-xs uppercase tracking-[0.25em] ${theme.accentText}`}
          >
            {t("eyebrow")}
          </span>
          <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="text-base leading-relaxed text-neutral-400">
            {t("description")}
          </p>
        </motion.div>

        {/* La lista es una columna mas, y va primera: es el dato concreto que
            se viene a buscar, los assets lo ilustran al lado. El alto de la
            fila es fijo para que la foto y el video no cambien de tamaño segun
            cuantos renglones trae la caja cada familia. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col gap-6 lg:h-[30rem] lg:flex-row"
        >
          <div className="flex flex-col gap-5 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:basis-1/4">
            <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-300">
              {tSection("contentsTitle")}
            </h3>

            {/* `flex-1` + `justify-between`: los renglones reparten el alto de
                la card, asi las dos familias llenan la columna aunque el BA
                tenga un item menos. `gap-3` queda de minimo. */}
            <ul className="flex flex-col gap-3 lg:flex-1 lg:justify-between">
              {unboxing.contents.map((item) => (
                <li
                  key={item.key}
                  className={`flex items-center gap-3 border-b py-3 text-sm last:border-b-0  ${
                    item.excluded
                      ? "border-amber-400/20 font-medium text-amber-200/90"
                      : "border-white/5 text-neutral-300"
                  }`}
                >
                  {item.excluded ? (
                    <Ban className="size-4 shrink-0 text-amber-400/80" />
                  ) : (
                    <span
                      className={`shrink-0 font-mono text-xs font-semibold ${theme.accentText}`}
                    >
                      {item.quantity}×
                    </span>
                  )}
                  {/* `model`/`power` los usa solo el renglon del wallbox; las
                      demas claves los ignoran. Salen del catalogo para que la
                      lista diga la variante que se esta mirando. */}
                  {tSection(`contents.${item.key}`, {
                    model: modelName,
                    power: specs.maxPowerKw,
                  })}
                </li>
              ))}
            </ul>
          </div>

          {unboxing.photoSrc && (
            // La foto viene sobre fondo blanco, igual que la del hero.
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-white lg:aspect-auto lg:basis-[37.5%]">
              <Image
                src={unboxing.photoSrc}
                alt={t("imageAlt")}
                fill
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="object-cover"
              />
            </div>
          )}

          <div
            className={`relative aspect-video overflow-hidden rounded-3xl border border-white/10 ${
              unboxing.photoSrc
                ? "lg:aspect-auto lg:basis-[37.5%]"
                : "lg:aspect-auto lg:basis-3/4"
            }`}
          >
            <video
              ref={videoRef}
              src={unboxing.videoSrc}
              controls
              playsInline
              preload="metadata"
              onEnded={() => setEnded(true)}
              className="h-full w-full object-cover"
            />

            {ended && (
              <button
                type="button"
                onClick={replay}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-950/70"
              >
                <span
                  className={`flex size-16 items-center justify-center rounded-full text-neutral-950 transition-transform duration-300 hover:scale-110 ${theme.accentBg}`}
                >
                  <RotateCcw className="size-7" />
                </span>
                <span className="text-sm font-medium text-white">
                  {t("replay")}
                </span>
              </button>
            )}
          </div>
        </motion.div>

        {/* El strip cierra la grilla: mismo ancho y mismo radio que las
            columnas de arriba, asi se lee como una fila mas y no como un
            bloque aparte. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="rounded-3xl border border-white/10 bg-white/[0.06] px-4 py-6 shadow-2xl shadow-black/40 backdrop-blur-2xl lg:px-10 lg:py-10"
        >
          <ChargerModelStats product={product} theme={theme} />
        </motion.div>
      </div>
    </section>
  );
}
