"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Carousel, useCarousel } from "motion-plus/react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Galeria de cargadores: fotos y videos en un mismo carousel.
 *
 * Usa el `Carousel` de Motion+, que ya resuelve drag, rueda, teclado, ARIA y
 * `prefers-reduced-motion`. El fade lateral no es un overlay con el color del
 * fondo sino un `mask-image`: la seccion tiene la grilla de fondo detras, y un
 * degrade opaco recortaria ese patron dejando dos bandas planas visibles.
 *
 * Los items se tipan como union porque un video necesita poster ademas de src;
 * asi agregar uno nuevo es una linea en MEDIA y el render decide solo.
 */

type GalleryItem =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; poster: string; alt: string };

/**
 * Placeholder hasta que lleguen los assets definitivos: son las fotos de
 * producto que ya viven en /public. Reemplazar por las nuevas (y sumar los
 * videos con `kind: "video"`) no requiere tocar nada mas de este archivo.
 */
const MEDIA: GalleryItem[] = [
  {
    kind: "image",
    src: "/assets/images/chargers/BS20-22KW.png",
    alt: "Cargador Rayforce BS20 de 22 kW",
  },
  {
    kind: "image",
    src: "/assets/images/chargers/7w-with-cable.png",
    alt: "Cargador Rayforce de 7 kW con cable Tipo 2",
  },
  {
    kind: "image",
    src: "/assets/images/chargers/BS20-7KW-SOCKET.png",
    alt: "Cargador Rayforce BS20 de 7 kW con toma Tipo 2",
  },
  {
    kind: "image",
    src: "/assets/images/banners/home-charging.png",
    alt: "Auto electrico cargando en un garage con un wallbox Rayforce",
  },
  {
    kind: "image",
    src: "/assets/images/chargers/BS20-7KW.png",
    alt: "Cargador Rayforce BS20 de 7 kW",
  },
];

/** Poster + boton de play; el video recien carga al reproducir. */
function VideoSlide({ item }: { item: Extract<GalleryItem, { kind: "video" }> }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative size-full">
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        playsInline
        controls={isPlaying}
        preload="none"
        aria-label={item.alt}
        className="size-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {!isPlaying ? (
        <button
          type="button"
          onClick={() => videoRef.current?.play()}
          aria-label={`Reproducir: ${item.alt}`}
          className="absolute inset-0 grid place-items-center bg-neutral-950/30 transition-colors duration-200 hover:bg-neutral-950/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
        >
          <span className="grid size-14 place-items-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm">
            <Play
              className="size-6 translate-x-px fill-neutral-950 text-neutral-950"
              aria-hidden="true"
            />
          </span>
        </button>
      ) : null}
    </div>
  );
}

function Slide({ item }: { item: GalleryItem }) {
  return (
    <div className="h-56 w-72 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/40 sm:h-72 sm:w-96">
      {item.kind === "video" ? (
        <VideoSlide item={item} />
      ) : (
        <Image
          src={item.src}
          alt={item.alt}
          width={384}
          height={288}
          draggable={false}
          className="size-full object-contain p-4"
        />
      )}
    </div>
  );
}

/** Flechas + puntos. Vive dentro de <Carousel> para poder usar useCarousel. */
function Controls() {
  const { nextPage, prevPage, isNextActive, isPrevActive, currentPage, totalPages } =
    useCarousel();

  const arrow =
    "grid size-10 place-items-center rounded-full border border-white/15 text-white transition-colors duration-200 hover:border-white/30 hover:bg-white/5 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400";

  return (
    <div className="mt-8 flex items-center justify-center gap-5">
      <motion.button
        type="button"
        onClick={prevPage}
        disabled={!isPrevActive}
        aria-label="Anterior"
        className={arrow}
        animate={{ opacity: isPrevActive ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </motion.button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              currentPage === i ? "w-6 bg-white" : "w-1.5 bg-neutral-600",
            )}
          />
        ))}
      </div>

      <motion.button
        type="button"
        onClick={nextPage}
        disabled={!isNextActive}
        aria-label="Siguiente"
        className={arrow}
        animate={{ opacity: isNextActive ? 1 : 0.3 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </motion.button>
    </div>
  );
}

export function WallboxGalleryCarousel() {
  return (
    <div
      className="mt-12"
      style={{
        // Fade sutil a los costados (~8%). Va en style y no en una clase de
        // Tailwind porque necesita el prefijo -webkit- para Safari.
        maskImage:
          "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
      }}
    >
      <Carousel
        items={MEDIA.map((item) => (
          <Slide key={item.src} item={item} />
        ))}
        gap={20}
        snap="page"
        loop={false}
        overflow
      >
        <Controls />
      </Carousel>
    </div>
  );
}
