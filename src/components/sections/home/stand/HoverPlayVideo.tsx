"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";

type Props = {
  src: string;
  poster: string;
  /** Solo para lectores de pantalla: el video no lleva epígrafe visible. */
  label: string;
  className?: string;
};

/**
 * Video que arranca solo al pasar el mouse (desktop) o al tocarlo (mobile),
 * en vez de autoplay. Sin autoplay no hay nada moviéndose mientras el usuario
 * lee los CTAs de arriba, y los clips no se descargan hasta que se piden.
 *
 * En mobile no hay hover: el tap alterna play/pausa. Por eso el estado real
 * se toma de los eventos del <video> y no de "está el mouse encima", así las
 * dos entradas comparten la misma fuente de verdad.
 */
export function HoverPlayVideo({ src, poster, label, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // play() devuelve una promesa que rechaza si el navegador corta la
  // reproducción (o si un pause() la interrumpe). Sin catch, eso sube como
  // unhandled rejection al salir rápido del video.
  const play = () => void videoRef.current?.play().catch(() => {});
  const pause = () => videoRef.current?.pause();

  const toggle = () => (isPlaying ? pause() : play());

  return (
    <div
      onMouseEnter={play}
      onMouseLeave={pause}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 ${className ?? ""}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        aria-label={label}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={toggle}
        className="aspect-[4/3] w-full object-cover"
      />

      {/* Affordance: sin autoplay hay que avisar que esto se reproduce.
          Se va apagando cuando el video ya está andando. */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none absolute inset-0
          flex items-center justify-center
          bg-black/30
          transition-opacity duration-300
          ${isPlaying ? "opacity-0" : "opacity-100"}
        `}
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/25">
          <Play className="size-5 translate-x-px fill-white text-white" />
        </span>
      </div>
    </div>
  );
}
