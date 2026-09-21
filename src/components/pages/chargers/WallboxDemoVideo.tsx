"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Loader2, Play, RotateCcw } from "lucide-react";

const VIDEO_SRC = "/assets/videos/chargers/bs20-bc-app-garage-demo.mp4";

/**
 * Misma curva que usa el ejemplo de AnimatePresence del codex de Motion: el
 * crossfade entre capas queda parejo en los dos sentidos.
 */
const EASE = [0.26, 0.02, 0.23, 0.94] as const;

type Status = "idle" | "loading" | "playing" | "ended";

type Props = {
  /** El thumb. Es tambien el `poster` del video, asi no hay salto al cambiar. */
  posterSrc: string;
  posterAlt: string;
  labels: { cta: string; loading: string; replay: string };
};

/**
 * Thumb que carga el video recien al click: el `<video>` no existe en el DOM
 * hasta entonces, asi que los 3,7 MB no entran en el load de la pagina. El
 * poster es la misma imagen que ya se ve, de modo que el swap imagen->video
 * no cambia nada en pantalla mientras el archivo baja.
 *
 * Una sola capa visible por vez (`idle`/`loading` sobre el video, o nada),
 * todas en `absolute inset-0` sobre el contenedor que las mide.
 */
export function WallboxDemoVideo({ posterSrc, posterAlt, labels }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const start = () => setStatus("loading");

  const replay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setStatus("playing");
  };

  return (
    <div className="absolute inset-0">
      {/* La imagen queda montada siempre: es el fondo detras del spinner
          mientras el video baja, y `priority={false}` deja que Next la sirva
          como cualquier otra imagen de la seccion. */}
      <Image
        src={posterSrc}
        alt={posterAlt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />

      {status !== "idle" && (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          poster={posterSrc}
          playsInline
          controls={status === "playing" || status === "ended"}
          autoPlay
          onCanPlay={() => setStatus((s) => (s === "loading" ? "playing" : s))}
          onEnded={() => setStatus("ended")}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <AnimatePresence>
        {status === "idle" && (
          <motion.button
            key="cta"
            type="button"
            onClick={start}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
          >
            <span className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/25 to-neutral-950/10 transition-opacity duration-500 group-hover:opacity-60" />
            <span className="relative flex size-16 items-center justify-center rounded-full bg-green-400 text-neutral-950 transition-transform duration-300 group-hover:scale-110">
              <Play className="size-7 translate-x-0.5 fill-current" />
            </span>
            <span className="relative text-sm font-medium uppercase tracking-wider text-white">
              {labels.cta}
            </span>
          </motion.button>
        )}

        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-950/70"
          >
            <Loader2 className="size-9 animate-spin text-green-400" />
            <span className="text-sm font-medium text-white">
              {labels.loading}
            </span>
          </motion.div>
        )}

        {status === "ended" && (
          <motion.button
            key="replay"
            type="button"
            onClick={replay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-3 bg-neutral-950/70"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-green-400 text-neutral-950 transition-transform duration-300 hover:scale-110">
              <RotateCcw className="size-7" />
            </span>
            <span className="text-sm font-medium text-white">
              {labels.replay}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
