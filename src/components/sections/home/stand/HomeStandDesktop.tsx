"use client";

import { useTranslations } from "next-intl";
import { ParkingCircle, Wrench, type LucideIcon } from "lucide-react";
import { GoogleReviewsBlock } from "@/components/shared/reviews/GoogleReviewsBlock";
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

export function HomeStandDesktop() {
  const t = useTranslations("HomePage.HomeStandSection");
  const track = useTrack();

  return (
    <section
      aria-labelledby="stand-desktop-heading"
      className="relative isolate overflow-hidden"
    >
      <div className="flex w-full flex-col items-center px-6 pt-28 pb-28 text-center sm:px-8">
        {/* HEADER — 50/50: el texto comparte fila con la foto de la columna
            instalada. Antes acá iba `charger-mobile.avif` (el comparativo
            columna vacía → columna con wallbox, que el mobile conserva) y la
            foto instalada iba a ancho completo más abajo. Se intercambiaron:
            la foto en contexto —columna, auto enchufado, edificio— dice de
            entrada de qué se trata mejor que el comparativo de producto, y
            los videos ganan el ancho completo que ésta dejó.

            `items-center` porque la foto es 16:9 y el bloque de texto más
            alto: alinear por el pie la dejaba colgando. */}
        <div className="grid w-full max-w-[1440px] grid-cols-2 items-center gap-12 text-left">
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
                xl:text-5xl
                leading-[1.08]
                tracking-tight
                font-light
                text-balance
                text-white
              "
            >
              {t("title")}
            </h2>

            {/* MEDIDAS — separadas por un divider vertical en vez de apiladas,
                para que las dos se lean como un mismo dato de tamaño. */}
            <dl className="mt-12 flex items-stretch gap-8">
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

            <p className="mt-12 max-w-xl text-sm leading-relaxed text-neutral-400">
              {t("dimensions.description")}
            </p>

            {/* NOTE — aclara qué es el producto, junto a la ficha y no después
                del precio. */}
            <span className="mt-4 block text-xs text-neutral-500">
              {t("pricing.note")}
            </span>
          </div>

          {/* COLUMNA INSTALADA. La foto original es 16:9. A media fila se
              reencuadra a 4/3: el 4/5 vertical que se probó antes la dejaba
              más alta que el bloque de texto y recortaba de más a los costados
              (se comía el edificio y pegaba el auto contra el borde). 4/3 baja
              el alto, devuelve parte de ese contexto y sigue llenando la
              celda sin dejar el aire lateral del 16:9 completo. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/column/bs20-mounted-on-column.webp"
            alt={t("imageAlt")}
            width={1672}
            height={941}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-2xl border border-white/10 object-cover"
          />
        </div>

        {/* VIDEOS — referencia de uso real. Heredan el lugar que tenía la foto
            instalada, que subió al header, pero conservan el `max-w-[1440px]` que
            comparten el header, los destacados y el panel de precio: a ancho
            completo eran el único bloque que rompía esa caja y la sección
            perdía su borde izquierdo y derecho recto.
            Los dos clips tienen orientación distinta (16:9 y 9:16), así que
            cada celda fija su propio aspect-ratio y recorta con object-cover
            para que las dos columnas queden a la misma altura.

            Sin epígrafes: cortaban la grilla contra los bloques de abajo y no
            agregaban nada que la imagen no diga. El texto sobrevive como
            aria-label del <video> para lectores de pantalla. */}
        <div className="mt-12 grid w-full max-w-[1440px] grid-cols-2 gap-6">
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
            `max-w-[1440px]` y el mismo `gap-6`, y las columnas quedan alineadas. */}
        <div className="mt-12 w-full max-w-[1440px]">
          <ul className="grid grid-cols-3 items-stretch gap-6 text-left">
            {HIGHLIGHTS.map(({ key, icon: Icon, maskSrc }) => (
              <li
                key={key}
                className="flex h-full flex-col rounded-2xl border border-neutral-900 bg-neutral-950 p-6"
              >
                <div className="flex size-18 shrink-0 items-center justify-center">
                  {maskSrc ? (
                    /* El SVG del Tipo 2 es un círculo con los pines adentro:
                       a igual tamaño que un icono de lucide se lee más chico,
                       porque su dibujo ocupa menos del alto del viewBox. Va un
                       escalón más grande para que los tres pesen parejo. */
                    <div
                      role="img"
                      aria-label={t(`highlights.${key}.title`)}
                      className="size-16 bg-green-400"
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
                        className="size-12 text-green-400"
                        strokeWidth={1}
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
                <p className="mt-5 flex min-h-[3.5rem] items-start text-2xl font-light tracking-tighter text-balance text-neutral-50">
                  {t(`highlights.${key}.title`)}
                </p>

                {/* Divider entre título y descripción. */}
                <div className="mt-4 h-px w-full bg-green-400/10" />

                <p className="mt-5 flex-1 text-sm leading-relaxed text-neutral-400">
                  {t(`highlights.${key}.description`)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* PRECIO — el panel reemplaza al precio suelto y su botón: el precio
            es el resultado de los toggles (columna → + cargador → + instalación)
            y el CTA cambia de destino según la elección.

            Comparte el `max-w-[1440px]` con el resto de los bloques de la sección
            (header, foto, videos, destacados), así toda la columna de contenido
            tiene un solo borde izquierdo y derecho. */}
        {/* La descripción que iba acá abajo repetía lo que ya dicen los
            destacados y el propio panel, y las medidas subieron al principio. */}
        <StandPricingPanel className="mt-12 max-w-[1440px]" />

        {/* RESEÑAS — despues del panel y no antes: son el respaldo de la
            decision que se acaba de tomar, no un bloque mas que se interponga
            entre los destacados y el precio.

            `compact` por la misma razon que en el lineup: acá su h2 es un
            bloque de la seccion, no su cabecera. */}
        <GoogleReviewsBlock
          compact
          onReviewClick={(reviewId) =>
            track.socialProofReviewClicked("home_stand", reviewId)
          }
          className="mt-20 w-full max-w-[1440px]"
        />

        {/* Acá iban dos salidas secundarias (consultar por WhatsApp / ver otros
            cargadores). Sacadas a propósito: el CTA del panel es el único que se
            necesita en esta sección, y dos opciones más abajo lo diluyen justo
            donde la persona tiene que decidir. Las claves `contactCta`,
            `browseChargersCta` y `contactMessage` quedan en los mensajes por si
            vuelven. */}
      </div>
    </section>
  );
}
