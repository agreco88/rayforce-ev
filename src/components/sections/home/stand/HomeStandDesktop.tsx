"use client";

import { useTranslations } from "next-intl";
import {
  ArrowRight,
  ParkingCircle,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Link } from "@/i18n/navigation";
import { useTrack } from "@/lib/analytics";
import { HoverPlayVideo } from "./HoverPlayVideo";
import { StandPricingPanel } from "./StandPricingPanel";

const SOCKET_TYPE_2_SRC = "/images/icons/socket-type-2.svg";

/**
 * Los tres destacados de la columna. `maskSrc` es la salida para el conector
 * Tipo 2, que no existe en lucide: se pinta enmascarando el SVG del proyecto,
 * igual que en WhatIsWallboxSection.
 */
const HIGHLIGHTS: {
  key: string;
  icon?: LucideIcon;
  maskSrc?: string;
}[] = [
  { key: "shared", icon: ParkingCircle },
  { key: "socket", maskSrc: SOCKET_TYPE_2_SRC },
  { key: "install", icon: Wrench },
];

const WHATSAPP_NUMBER = "59892041709";

export function HomeStandDesktop() {
  const t = useTranslations("HomePage.HomeStandSection");
  const track = useTrack();

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t("contactMessage"),
  )}`;

  return (
    <section
      aria-labelledby="stand-desktop-heading"
      className="relative isolate overflow-hidden"
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-6 pt-20 pb-20 text-center">
        {/* HEADER — 50/50: el bloque de texto (apilado y colapsado a la
            izquierda, como estaba) comparte fila con la imagen de la columna
            vacía y la columna con el wallbox. Es la misma que usa el mobile, y
            acá gana sentido al lado del título: muestra de entrada qué se
            compra y qué queda después, antes de la foto instalada de abajo.

            `items-center` en vez de `items-end` porque las dos columnas de la
            imagen están centradas verticalmente en su encuadre: alinear por el
            pie dejaba la foto colgando respecto del texto. */}
        <div className="grid w-full max-w-7xl grid-cols-2 items-center gap-12 text-left">
          <div>
            {/* EYEBROW */}
            <span className="text-xs tracking-[0.25em] uppercase text-green-400">
              {t("eyebrow")}
            </span>

            {/* TITLE */}
            <h2
              id="stand-desktop-heading"
              className="
                m-0 mt-5
                text-5xl
                xl:text-6xl
                leading-[1.08]
                tracking-tight
                font-light
                text-white
              "
            >
              {t("title")}
            </h2>

            {/* MEDIDAS — separadas por un divider vertical en vez de apiladas,
                para que las dos se lean como un mismo dato de tamaño. */}
            <dl className="mt-8 flex items-stretch gap-8">
              {(["height", "base"] as const).map((key, index) => (
                <div key={key} className="flex items-stretch gap-8">
                  {index > 0 && <div className="w-px bg-white/10" />}
                  <div>
                    <dt className="text-[11px] tracking-[0.2em] uppercase text-neutral-500">
                      {t(`dimensions.${key}.label`)}
                    </dt>
                    <dd className="mt-1.5 text-3xl font-light tracking-tight text-white">
                      {t(`dimensions.${key}.value`)}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-400">
              {t("dimensions.description")}
            </p>

            {/* NOTE — aclara qué es el producto, junto a la ficha y no después
                del precio. */}
            <span className="mt-4 block text-xs text-neutral-500">
              {t("pricing.note")}
            </span>
          </div>

          {/* COLUMNA VACÍA → CON WALLBOX. El original es 3:2 con mucho aire
              arriba, abajo y a los costados: a media fila las dos columnas
              quedaban diminutas. Se reencuadra a 4/5 con object-cover para
              recortar ese aire y que el producto llene la celda. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/stand/charger-mobile.avif"
            alt={t("comparisonImageAlt")}
            width={1536}
            height={1024}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full rounded-2xl object-cover"
          />
        </div>

        {/* COLUMNA — foto de la columna instalada, en flujo normal.
            Es 16:9 opaca (no un recorte), así que va enmarcada al ancho del
            contenido en vez de escalada por altura. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/column/bs20-mounted-on-column.webp"
          alt={t("imageAlt")}
          width={1672}
          height={941}
          loading="lazy"
          decoding="async"
          className="mt-10 w-full max-w-7xl rounded-2xl border border-white/10 object-cover"
        />

        {/* VIDEOS — referencia de uso real, entre la foto y los destacados.
            Los dos clips tienen orientación distinta (16:9 y 9:16), así que
            cada celda fija su propio aspect-ratio y recorta con object-cover
            para que las dos columnas queden a la misma altura.

            Sin epígrafes: cortaban la grilla contra los bloques de abajo y no
            agregaban nada que la imagen no diga. El texto sobrevive como
            aria-label del <video> para lectores de pantalla. */}
        <div className="mt-6 grid w-full max-w-7xl grid-cols-2 gap-6">
          <HoverPlayVideo
            src="/assets/videos/column/bs20-column-clip-1.mp4"
            poster="/assets/images/column/bs20-column-clip-1-poster.webp"
            label={t("video1Caption")}
          />

          <HoverPlayVideo
            src="/assets/videos/column/bs20-column-clip-2.mp4"
            poster="/assets/images/column/bs20-column-clip-2-poster.webp"
            label={t("video2Caption")}
          />
        </div>

        {/* DESTACADOS — tres en fila. Mismo lenguaje visual que las tarjetas
            de WhatIsWallboxSection (borde neutral-900, fondo neutral-900/20,
            icono verde suelto con stroke fino, headline `font-light`), pero
            a escala menor: en una row de tres no entra el `size-20` de
            ChargeSpeedStatCard, que está dimensionado para una grilla 2x2.
            Por eso el markup va acá en vez de reusar ese componente: es la
            misma tarjeta, un escalón más chica.

            El icono va en columna sobre el texto (no al costado) porque a un
            tercio de ancho no queda lugar para el reparto 25/75. */}
        {/* Sin wrapper con padding: el `p-6` que tenía metía las tarjetas 24px
            para adentro, así que ni los bordes ni las canaletas coincidían con
            la grilla de videos de arriba. Ahora comparte con ella el mismo
            `max-w-7xl` y el mismo `gap-6`, y las columnas quedan alineadas. */}
        <div className="mt-6 w-full max-w-7xl">
          <ul className="grid grid-cols-3 items-stretch gap-6 text-left">
            {HIGHLIGHTS.map(({ key, icon: Icon, maskSrc }) => (
              <li
                key={key}
                className="flex h-full flex-col rounded-2xl border border-neutral-900 bg-neutral-950/40 p-6"
              >
                <div className="flex size-12 shrink-0 items-center justify-center">
                  {maskSrc ? (
                    /* El SVG del Tipo 2 es un círculo con los pines adentro:
                       a igual tamaño que un icono de lucide se lee más chico,
                       porque su dibujo ocupa menos del alto del viewBox. Va un
                       escalón más grande para que los tres pesen parejo. */
                    <div
                      role="img"
                      aria-label={t(`highlights.${key}.title`)}
                      className="size-12 bg-green-400"
                      style={{
                        WebkitMaskImage: `url(${maskSrc})`,
                        maskImage: `url(${maskSrc})`,
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                      }}
                    />
                  ) : (
                    Icon && (
                      <Icon
                        className="size-10 text-green-400"
                        strokeWidth={0.85}
                        aria-hidden="true"
                      />
                    )
                  )}
                </div>

                {/* Altura fija para el título (dos líneas) en vez de `flex-1`:
                    creciendo, el título se comía todo el espacio sobrante y en
                    la tarjeta corta el divider terminaba muy lejos del texto.
                    Reservando las dos líneas, los tres dividers caen en la
                    misma línea y siempre pegados al título. El sobrante lo
                    absorbe la descripción, abajo. */}
                <p className="mt-5 flex min-h-[3.5rem] items-start text-xl font-light tracking-tight text-balance text-white">
                  {t(`highlights.${key}.title`)}
                </p>

                {/* Divider entre título y descripción. */}
                <div className="mt-4 h-px w-full bg-white/10" />

                <p className="mt-4 flex-1 text-sm leading-relaxed text-neutral-500">
                  {t(`highlights.${key}.description`)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* PRECIO — el panel reemplaza al precio suelto y su botón: el precio
            es el resultado de los toggles (columna → + cargador → + instalación)
            y el CTA cambia de destino según la elección.

            Comparte el `max-w-7xl` con el resto de los bloques de la sección
            (header, foto, videos, destacados), así toda la columna de contenido
            tiene un solo borde izquierdo y derecho. */}
        {/* La descripción que iba acá abajo repetía lo que ya dicen los
            destacados y el propio panel, y las medidas subieron al principio. */}
        <StandPricingPanel className="mt-16 max-w-7xl" />

        {/* SALIDAS — las dos alternativas para quien no cierra con el combo de
            arriba: preguntar, o mirar otros cargadores. Van afuera del panel y
            en secundario (borde, sin relleno) para no competir con su CTA. */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track.whatsappClick({ source: "stand" })}
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-neutral-300 transition-colors duration-200 hover:border-white/30 hover:text-white"
          >
            {t("contactCta")}
            <FaWhatsapp size={16} />
          </a>

          <Link
            href="/cargadores"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-neutral-300 transition-colors duration-200 hover:border-white/30 hover:text-white"
          >
            {t("browseChargersCta")}
            <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
