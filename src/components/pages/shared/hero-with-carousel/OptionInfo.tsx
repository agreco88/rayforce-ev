"use client";

import { Carousel, useCarousel } from "motion-plus/react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { Info } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/useIsMobile";

export type OptionMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  /** Encuadre por foto: no todas tienen el sujeto al centro. */
  className?: string;
};

type Props = {
  /** Lo que lee un lector de pantalla en el icono. */
  label: string;
  /** Un parrafo, o varios si el texto tiene dos ideas. */
  description: string | string[];
  /** Con mas de una, pasan solas como el ejemplo de autoplay de Motion+. */
  media?: OptionMedia[];
};

/** El icono de info al lado de un grupo de variantes: explica la opcion sin
 *  sumar texto a la ficha. */
export function OptionInfo({ label, description, media = [] }: Props) {
  const paragraphs = typeof description === "string" ? [description] : description;
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        ref={triggerRef}
        aria-label={label}
        // El Tooltip de Radix no abre con un toque y su `onClick` lo cierra:
        // lo pisamos para que en tactil el toque lo alterne.
        onClick={(event) => {
          event.preventDefault();
          setOpen((current) => !current);
        }}
        className="text-neutral-400 transition-colors hover:text-neutral-200"
      >
        <Info size={14} />
      </TooltipTrigger>
      <TooltipContent
        // A la derecha no entra en mobile: abre abajo, desde el icono.
        side={isMobile ? "bottom" : "right"}
        align={isMobile ? "start" : "center"}
        collisionPadding={16}
        // El toque en el icono lo maneja el `onClick`: si este tambien cerrara,
        // el click lo volveria a abrir.
        onPointerDownOutside={(event) => {
          if (triggerRef.current?.contains(event.target as Node)) {
            event.preventDefault();
          }
        }}
        // Borde y sombra: sobre el fondo oscuro del hero el tooltip se perdia
        // contra los chips y los stats. Solo texto va mas ancho para no quedar
        // alto; con fotos, el ancho de las fotos.
        className={`flex flex-col gap-2 border border-white/10 bg-neutral-900 p-2 shadow-xl shadow-black/60 [&_svg]:bg-neutral-900 [&_svg]:fill-neutral-900 ${
          media.length > 0
            ? "w-[min(16rem,calc(100vw-2rem))]"
            : "w-[min(20rem,calc(100vw-2rem))]"
        }`}
      >
        {media.length > 1 ? (
          <MediaCarousel media={media} />
        ) : (
          media[0] && <Slide item={media[0]} />
        )}
        <div className="flex flex-col gap-2 px-2 py-1.5">
          {paragraphs.map((paragraph) => (
            // Clases en el `p` y no en el padre: el `p` global de
            // `globals.css` (`md:text-lg`, gris) pisa lo heredado.
            <p
              key={paragraph}
              className="text-xs leading-relaxed text-pretty text-white"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

function MediaCarousel({ media }: { media: OptionMedia[] }) {
  const reducedMotion = useReducedMotion();

  return (
    // `@container`: los items del carousel no toman ancho del padre (ver
    // `HeroGallery`), cada slide mide `100cqw`.
    <div className="@container">
      <Carousel
        items={media.map((item) => (
          <div key={item.src} className="w-[100cqw]">
            <Slide item={item} />
          </div>
        ))}
        snap="page"
        loop
        className="flex-col"
      >
        {/* Sin autoplay con movimiento reducido: se pasa arrastrando. */}
        {!reducedMotion && <AutoplayProgress duration={3.5} />}
      </Carousel>
    </div>
  );
}

function Slide({ item }: { item: OptionMedia }) {
  return (
    // Recta abajo: la barra de progreso va pegada debajo, como en un video.
    <div className="relative aspect-[4/5] overflow-hidden rounded-t-md bg-gradient-to-br from-neutral-600 via-neutral-700 to-neutral-900">
      {item.type === "video" ? (
        <video
          src={item.src}
          aria-label={item.alt}
          autoPlay
          muted
          loop
          playsInline
          className={`size-full object-cover ${item.className ?? ""}`}
        />
      ) : (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          draggable={false}
          sizes="256px"
          className={item.className ?? "object-cover"}
        />
      )}
    </div>
  );
}

/** La barra que se llena y pasa a la siguiente, del ejemplo de Motion+. */
function AutoplayProgress({ duration }: { duration: number }) {
  const { currentPage, nextPage } = useCarousel();
  const progress = useMotionValue(0);

  useEffect(() => {
    const animation = animate(progress, [0, 1], {
      duration,
      ease: "linear",
      onComplete: nextPage,
    });
    return () => animation.stop();
  }, [duration, nextPage, progress, currentPage]);

  return (
    <div className="h-0.5 w-full overflow-hidden bg-white/15">
      <motion.div
        className="h-full origin-left bg-white/70"
        style={{ scaleX: progress }}
      />
    </div>
  );
}
