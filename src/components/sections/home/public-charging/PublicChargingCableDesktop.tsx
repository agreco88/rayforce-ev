"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { ClickToPlayVideo } from "@/components/shared/video/ClickToPlayVideo";
import { useTrack } from "@/lib/analytics";

/** Foto vertical (2:3): alguien cargando en un tótem público de UTE. */
const PHOTO_SRC = "/assets/images/cables/man-charging-ute.jpg";

/** Cable espiralado: el otro modelo del catálogo, de fondo en la caja "ver todos". */
const COILED_CABLE_SRC = "/assets/images/cables/BS-CHC003-S.png";

const PROOF_VIDEO_SRC = "/assets/videos/cables/chc-cable-run-over-test.mp4";
const PROOF_POSTER_SRC =
  "/assets/images/cables/chc-cable-run-over-test-poster.jpg";

export function PublicChargingCableDesktop() {
  const t = useTranslations("HomePage.PublicChargingCableSection");
  const track = useTrack();

  return (
    <div className="relative isolate overflow-hidden flex justify-center">
      <GridBackground
        cellSize={64}
        lineOpacity={0.3}
        className="opacity-30"
        maskImage="radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 80%)"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 80% 30%, rgba(251,191,36,0.12), transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Carril de 1280 con el padding adentro, el mismo que el resto de la
          home. El `lg:px-16` que habia antes se comia 128px de esos 1280 y
          dejaba el banner mas angosto que la columna que va arriba. */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl justify-center px-6 sm:px-8 py-20 lg:py-28 xl:py-32">
        <div className="w-full">
          {/* Reparto 2fr/3fr y no 50/50: la foto es un retrato 2:3, y a media
            fila se estira tanto de alto que empuja la sección. En dos quintos
            queda a una altura pareja con el bloque de texto.

            `items-stretch` para que la foto tome el alto que fija la columna
            de la derecha, en vez de imponer el suyo. */}
          <div className="grid grid-cols-[2fr_3fr] items-stretch gap-8 lg:gap-16">
            {/* ── LEFT: foto en contexto ─────────────────────── */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PHOTO_SRC}
              alt={t("photoAlt")}
              width={1004}
              height={1506}
              loading="lazy"
              decoding="async"
              className="h-full w-full rounded-2xl border border-white/10 object-cover"
            />

            {/* ── RIGHT: copy + CTA ──────────────────────────── */}
            {/* Spacing explícito y no un `gap-6` parejo: con un gap único el
                eyebrow quedaba tan lejos del título como el título del cuerpo,
                y los bloques (video, precio) pesaban igual que un salto de
                párrafo. La escala es la misma que usa la sección de la columna:
                el eyebrow pegado al título (mt-5), aire de párrafo entre los
                textos (mt-6) y un salto mayor antes de cada bloque (mt-10). */}
            <div className="flex flex-col">
              <span className="text-xs tracking-[0.25em] uppercase text-amber-400">
                {t("eyebrow")}
              </span>

              <h2 className="m-0 mt-5 text-3xl leading-[1.1] font-light tracking-tight lg:text-5xl">
                {t("title")}
              </h2>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-300 lg:text-lg">
                {t("description")}
              </p>

              {/* VIDEO — la prueba de que le pasa un auto por encima. Antes era
                un thumb que abría un Dialog; ahora el video se reproduce acá
                mismo al click, con el mismo patrón que la demo del wallbox en
                la segunda sección de la home: el `<video>` no se monta hasta
                ese click, así que el archivo no pesa en el load.

                Va entre la descripción y el precio: la descripción promete que
                el cable aguanta que le pase un auto por encima, y el video lo
                demuestra justo antes de que se pida la decisión de compra.

                El contenedor fija el aspect-ratio porque las capas del
                componente van en `absolute inset-0`. */}
              <div className="relative mt-10 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
                <ClickToPlayVideo
                  videoSrc={PROOF_VIDEO_SRC}
                  posterSrc={PROOF_POSTER_SRC}
                  posterAlt={t("imageAlt")}
                  accent="amber"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  onStart={() =>
                    track.publicChargingVideoOpened({ location: "desktop" })
                  }
                  labels={{
                    cta: t("video.cta"),
                    loading: t("video.loading"),
                    replay: t("video.replay"),
                  }}
                />
              </div>

              {/* PRECIO + CTAs: dos cajas en fila, alineadas con el ancho del
                video de arriba. El precio vive adentro de la caja primaria,
                sobre el CTA del cable espiralado, en vez de ir suelto arriba
                de los dos botones — así ambas cajas pesan igual en la grilla. */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                <Link
                  href="/cables/bs-chc003"
                  onClick={() =>
                    track.publicChargingCableCta({
                      cta: "product",
                      location: "desktop",
                    })
                  }
                  className="group flex flex-col justify-between gap-6 rounded-2xl bg-amber-400 p-6 transition-colors duration-200 hover:bg-amber-300"
                >
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-thin tracking-tighter text-neutral-950">
                      {t("pricing.price")}
                    </span>
                    <span className="mb-1 text-sm text-neutral-800">
                      {t("pricing.taxLabel")}
                    </span>
                  </div>

                  <span className="flex items-center gap-2 text-sm font-semibold text-neutral-950">
                    {t("pricing.cta")}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>

                <Link
                  href="/cables"
                  onClick={() =>
                    track.publicChargingCableCta({
                      cta: "all_cables",
                      location: "desktop",
                    })
                  }
                  className="group relative flex flex-col items-start justify-end gap-2 overflow-hidden rounded-2xl border border-white/15 p-6 text-neutral-300 transition-colors duration-200 hover:border-white/30 hover:text-white"
                >
                  {/* El cable espiralado: el otro modelo del catálogo, de fondo y
                      oscurecido para que compita menos que la caja ámbar. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={COILED_CABLE_SRC}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover opacity-30 transition-opacity duration-200 group-hover:opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/20" />

                  <span className="relative flex items-center gap-2 text-sm font-medium">
                    {t("pricing.secondaryCta")}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
