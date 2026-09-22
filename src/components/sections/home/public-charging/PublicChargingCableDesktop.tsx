"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { ClickToPlayVideo } from "@/components/shared/video/ClickToPlayVideo";
import { useTrack } from "@/lib/analytics";

/** Foto vertical (2:3): alguien cargando en un tótem público de UTE. */
const PHOTO_SRC = "/assets/images/cables/man-charging-ute.jpg";

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

      {/* Misma estructura de ancho que la sección de la columna: el contenedor
          va a `max-w-[1440px] px-6` y el contenido adentro a `max-w-7xl`, así
          los dos bloques terminan con 1280px reales de contenido y sus bordes
          coinciden.

          Antes era `max-w-7xl` con `px-6 sm:px-8 lg:px-16`: el padding se
          comía 128px de esos 1280 y el banner quedaba más angosto que la
          columna, aunque las dos clases dijeran `max-w-7xl`. */}
      <div className="relative z-10 flex w-full max-w-[1440px] justify-center px-6 py-14 lg:py-20 xl:py-28">
        <div className="w-full max-w-7xl">
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

              <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-300 lg:text-lg">
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

              {/* PRECIO + CTAs. Dos layouts distintos según el ancho, porque
                los tres elementos no entran en fila hasta bien entrado `lg`:

                · md (768–1023px): la columna derecha mide ~410px, así que no
                  hay chance de fila. El precio va solo, grande y centrado, y
                  los CTAs abajo también centrados. Al quedar solo en su línea
                  el precio puede crecer (`text-5xl`) sin apretar nada.
                · lg en adelante: precio encima de los CTAs, los dos alineados
                  a la izquierda. Se probó el `justify-between` con los tres en
                  una fila, pero el español daba ~750px contra ~742 de columna
                  y el precio terminaba envolviendo igual; apilado no depende
                  del largo del copy, que cambia por idioma.

                `items-start` y no `items-center` para que en lg el bloque no
                se centre respecto de la columna. */}
              <div className="mt-10 flex flex-col items-center gap-6 lg:items-start lg:gap-5">
                {/* PRICE */}
                <div className="flex shrink-0 items-end gap-2.5">
                  <span className="text-5xl font-thin tracking-tighter text-amber-400">
                    {t("pricing.price")}
                  </span>
                  <span className="mb-1 text-sm text-neutral-400">
                    {t("pricing.taxLabel")}
                  </span>
                </div>

                {/* CTAs. En md los dos botones juntos miden ~470px contra los
                    ~410px de la columna, así que van en grid 50/50 a ancho
                    completo —igual que en mobile— y recién en lg pasan a ser
                    dos botones sueltos dimensionados por su contenido. */}
                <div className="grid w-full grid-cols-2 gap-3 lg:flex lg:w-auto lg:shrink-0 lg:items-center lg:gap-4">
                  <Link
                    href="/cables/bs-chc003-s"
                    onClick={() =>
                      track.publicChargingCableCta({
                        cta: "product",
                        location: "desktop",
                      })
                    }
                    className="group flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-4 py-3 text-center text-sm font-semibold text-neutral-950 transition-colors duration-200 hover:bg-amber-300 lg:inline-flex lg:px-6 lg:whitespace-nowrap"
                  >
                    {t("pricing.cta")}
                    {/* El `group` va en cada Link y no en el contenedor porque
                        los dos botones son hermanos: en el padre, pasar por uno
                        movería también la flecha del otro. */}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>

                  <Link
                    href="/cables"
                    onClick={() =>
                      track.publicChargingCableCta({
                        cta: "all_cables",
                        location: "desktop",
                      })
                    }
                    className="group flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-medium text-neutral-300 transition-colors duration-200 hover:border-white/30 hover:text-white lg:inline-flex lg:px-6 lg:whitespace-nowrap"
                  >
                    {t("pricing.secondaryCta")}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
