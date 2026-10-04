"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { RotateCcw } from "lucide-react";

/* El ensayo es sobre el conector, que es el mismo en toda la linea: el clip se
   grabo con el espiralado pero vale para los tres modelos. */
const PROOF_VIDEO_SRC = "/assets/videos/cables/chc-cable-run-over-test.mp4";
const PROOF_POSTER_SRC =
  "/assets/images/cables/chc-cable-run-over-test-poster.jpg";

const BAG_IMAGE_SRC = "/assets/images/cables/cable-bag.png";

/**
 * El "que incluye" del listado de cables. Los renglones salen de los mensajes
 * y no del catalogo, porque aca no hay un modelo — lo que se lista es lo que
 * comparten los tres (Tipo 2, 32 A, IP66, TPU, sensor).
 */
export function CablesIncludedSection({ id }: { id?: string }) {
  const t = useTranslations("AccessoriesPage.Included");
  const items = t.raw("items") as string[];

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
      className="relative w-full border-t border-neutral-900 bg-[#0a0a0a] py-20 sm:py-28"
    >
      <div className="header-rail flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex max-w-2xl flex-col gap-4"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-amber-400">
            {t("eyebrow")}
          </span>
          <h2 className="text-3xl font-light tracking-tight text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="text-base leading-relaxed text-neutral-400">
            {t("description")}
          </p>
        </motion.div>

        {/* Misma fila que la pagina de modelo: la lista primero, el video al lado. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col gap-6 lg:h-[42rem] lg:flex-row"
        >
          <div className="flex flex-col gap-6 lg:basis-1/3">
            {/* `shrink-0`: la lista reclama su alto natural, si no se comprime
                contra el alto fijo de la fila y recorta el ultimo renglon. */}
            <div className="flex shrink-0 flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-300">
                {t("itemsTitle")}
              </h3>

              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-b border-white/5 py-3 text-sm text-neutral-300 last:border-b-0"
                  >
                    <span
                      className="mt-[0.4375rem] size-1 shrink-0 rounded-full bg-amber-400"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* El badge aclara que es una foto, para que no se lea como un item
                mas de la lista de arriba. */}
            <div className="relative flex min-h-[18rem] flex-1 items-center justify-center overflow-hidden rounded-3xl bg-white px-6 pb-6 pt-14">
              <span
                className="
                  pointer-events-none absolute left-5 top-5 z-10 inline-flex items-center
                  whitespace-nowrap rounded-md bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400
                  px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-950
                  shadow-sm
                "
              >
                {t("bagPhoto")}
              </span>

              <Image
                src={BAG_IMAGE_SRC}
                alt=""
                width={560}
                height={373}
                sizes="(max-width: 1024px) 90vw, 420px"
                className="h-full w-full object-contain"
              />
            </div>
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
                <span className="flex size-16 items-center justify-center rounded-full bg-amber-400 text-neutral-950 transition-transform duration-300 hover:scale-110">
                  <RotateCcw className="size-7" />
                </span>
                <span className="text-sm font-medium text-white">
                  {t("replay")}
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
