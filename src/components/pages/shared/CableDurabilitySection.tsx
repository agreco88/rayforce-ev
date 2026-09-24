"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { RotateCcw } from "lucide-react";

import { CableModelStats } from "@/components/pages/shared/CableModelStats";
import type { CableProduct } from "@/lib/catalog/catalog.types";

/* El ensayo es sobre el conector, que es el mismo en toda la linea: el clip se
   grabo con el espiralado pero vale para los tres modelos. */
const PROOF_VIDEO_SRC = "/assets/videos/cables/chc-cable-run-over-test.mp4";
const PROOF_POSTER_SRC =
  "/assets/images/cables/chc-cable-run-over-test-poster.jpg";

const BAG_IMAGE_SRC = "/assets/images/cables/cable-bag.png";

type Props = {
  product: CableProduct;
  id?: string;
};

/**
 * El "que incluye" de los cables: el equivalente al unboxing de los cargadores,
 * en el mismo slot (primer bloque despues del hero) y con la misma fila de
 * lista + asset.
 *
 * La monta la linea entera y lo que cambia por modelo sale del catalogo: el
 * renglon del cable toma largo y potencia, y las protecciones se listan segun
 * lo que ese modelo tenga. El video refuerza, no es el eje — el ensayo es
 * sobre el conector, que es comun a los tres.
 */
export function CableDurabilitySection({ product, id }: Props) {
  const t = useTranslations("CableModelPage.Durability");
  const { theme, specs } = product;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [ended, setEnded] = useState(false);

  const replay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setEnded(false);
  };

  // Los renglones salen del catalogo y no de los mensajes: son los mismos
  // datos que la ficha, y asi un modelo sin sensor no lo lista. El cable
  // encabeza la lista porque es lo que se esta comprando.
  const items = [
    t("items.cable", {
      length: specs.lengthM,
      power: specs.maxPowerKw ?? 7,
    }),
    specs.bagIncluded ? t("items.bag") : null,
    specs.ingressProtection
      ? t("items.protection", { protection: specs.ingressProtection })
      : null,
    t("items.jacket"),
    specs.temperatureSensor ? t("items.temperatureSensor") : null,
  ].filter(Boolean) as string[];

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

        {/* Misma fila que el unboxing: la lista primero, el asset al lado. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col gap-6 lg:h-[42rem] lg:flex-row"
        >
          {/* La columna izquierda son dos cards: la lista y, abajo, el bolso
              con su propia foto. */}
          <div className="flex flex-col gap-6 lg:basis-1/3">
            {/* `shrink-0`: la lista reclama su alto natural. Sin esto la card
                se comprimia contra el alto fijo de la fila y recortaba el
                ultimo renglon sin avisar. */}
            <div className="flex shrink-0 flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-300">
                {t("itemsTitle")}
              </h3>

              {/* Sin `justify-between`: son renglones cortos y repartir el alto
                  de la columna los dejaba separados por huecos. */}
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-white/5 py-3 text-sm text-neutral-300 last:border-b-0"
                  >
                    <span
                      className={`mt-[0.4375rem] size-1 shrink-0 rounded-full ${theme.accentBg}`}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* La foto del bolso acompania al renglon de la lista: muestra
                como es. El badge dice que es una foto para que no se lea como
                un item aparte de la enumeracion de arriba. */}
            {specs.bagIncluded && (
              <div className="relative flex min-h-[18rem] flex-1 items-center justify-center overflow-hidden rounded-3xl bg-white px-6 pb-6 pt-14">
                <span
                  className="
                    pointer-events-none absolute left-5 top-5 z-10 inline-flex items-center
                    whitespace-nowrap rounded-md px-2.5 py-1
                    text-[10px] font-semibold uppercase tracking-wider text-neutral-950
                    shadow-sm
                  "
                  style={{
                    backgroundImage: `linear-gradient(to right, ${theme.gradientColors.join(", ")})`,
                  }}
                >
                  {t("bagPhoto")}
                </span>

                {/* `pt-14` en la card y no un margen aca: el badge se apoya en
                    la esquina y la foto centra en el espacio que queda.
                    `w-full` + `h-full`: la card es mas ancha que alta, y
                    limitando solo por alto la foto dejaba aire a los costados. */}
                <Image
                  src={BAG_IMAGE_SRC}
                  alt=""
                  width={560}
                  height={373}
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="h-full w-full object-contain"
                />
              </div>
            )}
          </div>

          <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 lg:aspect-auto lg:basis-2/3">
            <video
              ref={videoRef}
              src={PROOF_VIDEO_SRC}
              poster={PROOF_POSTER_SRC}
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
          <CableModelStats product={product} theme={theme} bare />
        </motion.div>
      </div>
    </section>
  );
}
