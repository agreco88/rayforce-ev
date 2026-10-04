"use client";

import Image from "next/image";
import { Carousel, useCarousel } from "motion-plus/react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { type CSSProperties, useEffect, useRef } from "react";
import type { CatalogTheme } from "@/lib/catalog/catalog.types";

export type GalleryMedia =
  /** `style`: la escala del catalogo (`--product-image-scale`) de los recortes. */
  | { type: "image"; src: string; className?: string; style?: CSSProperties }
  /** `poster`: el thumbnail y lo que se ve antes de que cargue. */
  | { type: "video"; src: string; poster: string };

type Props = {
  media: GalleryMedia[];
  name: string;
  theme: CatalogTheme;
};

/**
 * Foto grande + thumbnails. Es el ejemplo de Motion+
 * (examples.motion.dev/react/carousel-thumbnail-gallery) con las flechas de
 * `CardCarousel` encima de la foto.
 */
export function HeroGallery({ media, name, theme }: Props) {
  const t = useTranslations("ChargerModelPage.Hero.gallery");

  return (
    // `@container`: los items del carousel no toman ancho del padre, asi que
    // cada foto mide `100cqw`, el ancho exacto de la galeria.
    <div className="@container relative">
      <Carousel
        items={media.map((item, index) => {
          const alt = t(item.type === "video" ? "videoAlt" : "imageAlt", {
            name,
            index: index + 1,
            total: media.length,
          });

          return (
            <div
              key={index}
              className="relative aspect-square w-[100cqw] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-neutral-600 via-neutral-700 to-neutral-900"
            >
              {item.type === "video" ? (
                <GalleryVideo src={item.src} poster={item.poster} alt={alt} />
              ) : (
                <Image
                  src={item.src}
                  alt={alt}
                  fill
                  // La primera es el LCP de la pagina.
                  priority={index === 0}
                  draggable={false}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  style={item.style}
                  className={item.className ?? "object-contain p-6"}
                />
              )}
            </div>
          );
        })}
        gap={20}
        snap="page"
        loop
      >
        <Arrows />
        <Dots theme={theme} />
        <Thumbnails media={media} theme={theme} />
      </Carousel>
    </div>
  );
}

/** Corre solo mientras esta a la vista: el carousel monta todos los slides y
 *  sin esto los de las otras paginas bajan y gastan CPU de fondo. */
function GalleryVideo({
  src,
  poster,
  alt,
}: {
  src: string;
  poster: string;
  alt: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.6 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={alt}
      muted
      loop
      playsInline
      preload="none"
      className="size-full object-cover"
    />
  );
}

function Arrows() {
  const { nextPage, prevPage } = useCarousel();
  const t = useTranslations("Common.Carousel");

  return (
    // `top-[50cqw]`: la foto es cuadrada y de `100cqw`, asi que ese es su
    // centro; los thumbnails de abajo no lo corren.
    <div className="pointer-events-none absolute inset-x-4 top-[50cqw] flex -translate-y-1/2 justify-between">
      {[
        { label: t("prev"), onClick: prevPage, Icon: ChevronLeft },
        { label: t("next"), onClick: nextPage, Icon: ChevronRight },
      ].map(({ label, onClick, Icon }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          onClick={onClick}
          className="pointer-events-auto flex size-10 items-center justify-center rounded-full border border-white/10 bg-neutral-950/60 text-white backdrop-blur-sm transition-colors hover:bg-neutral-950/80"
        >
          <Icon size={20} />
        </button>
      ))}
    </div>
  );
}

/** En mobile, en lugar de los thumbnails: el alto que ahorran sube titulo y
 *  precio a la primera pantalla. Es el ejemplo de Motion+
 *  `carousel-pagination-arrows`. */
function Dots({ theme }: { theme: CatalogTheme }) {
  const { currentPage, totalPages, gotoPage } = useCarousel();
  const t = useTranslations("ChargerModelPage.Hero.gallery");

  return (
    // Sobre el borde de abajo de la foto, que mide `100cqw`. La pastilla
    // oscura los separa de las fotos de fondo claro.
    <div className="absolute inset-x-0 top-[calc(100cqw-2.75rem)] flex justify-center sm:hidden">
      <div className="flex gap-2 rounded-full bg-neutral-950/60 px-3 py-2 backdrop-blur-sm">
        {Array.from({ length: totalPages }).map((_, index) => {
          const active = index === currentPage;

          return (
            <motion.button
              key={index}
              type="button"
              aria-label={t("thumbnail", { index: index + 1 })}
              aria-current={active}
              onClick={() => gotoPage(index)}
              layout
              style={{ borderRadius: 4 }}
              className={`h-2 transition-colors ${
                active ? `w-4 ${theme.accentBg}` : "w-2 bg-white/40"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

function Thumbnails({
  media,
  theme,
}: {
  media: GalleryMedia[];
  theme: CatalogTheme;
}) {
  const { gotoPage, currentPage } = useCarousel();
  const t = useTranslations("ChargerModelPage.Hero.gallery");

  return (
    // Grilla de seis que baja de linea: debajo de la foto sobra alto. En
    // mobile no va, ver `Dots`. `p-1`: lugar para el ring de la activa.
    <div className="mt-2 hidden grid-cols-6 gap-4 p-1 sm:grid">
      {media.map((item, index) => {
        const active = index === currentPage;

        return (
          <motion.button
            key={index}
            type="button"
            aria-label={t("thumbnail", { index: index + 1 })}
            aria-current={active}
            onClick={() => gotoPage(index)}
            initial={false}
            animate={{ opacity: active ? 1 : 0.5 }}
            className={`relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-neutral-600 via-neutral-700 to-neutral-900 ${
              active
                ? `ring-2 ring-offset-2 ring-offset-neutral-950 ${theme.accentRing}`
                : ""
            }`}
          >
            <Image
              src={item.type === "video" ? item.poster : item.src}
              alt=""
              fill
              sizes="120px"
              style={item.type === "image" ? item.style : undefined}
              className={
                item.type === "video"
                  ? "object-cover"
                  : (item.className ?? "object-contain p-3")
              }
            />
          </motion.button>
        );
      })}
    </div>
  );
}
