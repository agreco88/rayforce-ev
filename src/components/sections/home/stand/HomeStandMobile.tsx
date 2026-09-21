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
import { StandPricingPanelMobile } from "./StandPricingPanelMobile";
import { StandHighlightsCarousel } from "./StandHighlightsCarousel";

const SOCKET_TYPE_2_SRC = "/images/icons/socket-type-2.svg";

/** Mismos tres destacados que desktop, en el mismo orden. */
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

/**
 * Versión mobile de la sección de la columna. Cuenta el mismo recorrido que
 * desktop —qué es → cómo se ve → en uso → por qué → cuánto sale— pero con la
 * estructura reordenada para una sola columna:
 *
 * - El 50/50 del header se apila, con la comparación (columna vacía → columna
 *   con wallbox) intercalada entre el texto y la ficha de medidas. Esa imagen
 *   es vertical por naturaleza del producto, así que acá va sin recortar (a
 *   diferencia del `aspect-[4/5]` de desktop, que existe para llenar media
 *   fila).
 * - La foto de la columna instalada no está: ver el comentario en su lugar.
 * - Los dos videos, que en desktop van lado a lado, acá se apilan.
 * - El bento de tres tarjetas pasa a carousel, para no comer scroll justo
 *   antes del panel de precio.
 * - El panel de precio tiene su propia variante (`StandPricingPanelMobile`),
 *   que comparte la lógica con desktop pero va sin la caja externa.
 */
export function HomeStandMobile() {
  const t = useTranslations("HomePage.HomeStandSection");
  const track = useTrack();

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t("contactMessage"),
  )}`;

  return (
    <section
      aria-labelledby="stand-mobile-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Ritmo vertical de la sección, en dos pasos: `mt-8` entre piezas de un
          mismo bloque (texto → imagen → medidas → nota) y `mt-14` entre bloques
          (header → video → destacados → precio → salidas). El `pb-16` cierra
          contra la sección siguiente con el mismo aire que separa bloques. */}
      <div className="flex flex-col px-6 pt-12 pb-16">
        {/* HEADER — el 50/50 de desktop, apilado. */}
        <span className="text-[10px] tracking-[0.3em] uppercase text-green-400">
          {t("eyebrow")}
        </span>

        <h2
          id="stand-mobile-heading"
          className="m-0 mt-4 text-3xl leading-[1.1] font-light tracking-tight text-white"
        >
          {t("title")}
        </h2>

        <p className="mt-5 text-sm leading-relaxed text-neutral-400">
          {t("dimensions.description")}
        </p>

        {/* COMPARACIÓN — columna vacía → columna con el wallbox montado. Va
            entre el texto y las medidas: es lo que explica qué es el producto,
            y los números se leen mejor después de haberlo visto.

            Sin `object-cover`: acá tiene el ancho completo y no hay una celda
            que llenar, así que se muestra entera. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/stand/charger-mobile.avif"
          alt={t("comparisonImageAlt")}
          width={1536}
          height={1024}
          loading="lazy"
          decoding="async"
          className="mt-8 w-full rounded-2xl"
        />

        {/* MEDIDAS — mismo divider vertical que desktop: las dos se leen como
            un mismo dato de tamaño. A diferencia de desktop van centradas:
            debajo de la imagen quedan como su epígrafe, y alineadas a la
            izquierda se leían como otro párrafo más del texto de arriba.

            `justify-center` centra el par y `text-center` cada columna; el
            `w-fit` de cada una evita que el divider quede pegado a un lado. */}
        <dl className="mt-8 flex items-stretch justify-center gap-6 text-center">
          {(["height", "base"] as const).map((key, index) => (
            <div key={key} className="flex items-stretch gap-6">
              {index > 0 && <div className="w-px bg-white/10" />}
              <div>
                <dt className="text-[10px] tracking-[0.2em] uppercase text-neutral-500">
                  {t(`dimensions.${key}.label`)}
                </dt>
                <dd className="mt-1.5 text-2xl font-light tracking-tight text-white">
                  {t(`dimensions.${key}.value`)}
                </dd>
              </div>
            </div>
          ))}
        </dl>

        {/* La nota va acá y no arriba de la imagen: aclara qué no viene en el
            precio, así que se lee mejor pegada a la ficha de datos que
            interrumpiendo el texto de presentación. */}
        <span className="mt-4 text-center text-xs text-neutral-500">
          {t("pricing.note")}
        </span>

        {/* La foto de la columna instalada (el Tesla) es solo de desktop: es
            16:9 con el auto ocupando medio cuadro, así que a ancho de celular
            el cargador —que es lo que la foto tiene que mostrar— queda
            diminuto. Desktop la sigue usando. */}

        {/* VIDEO — solo el segundo. El primero es el hero del Tesla, que en
            desktop funciona porque va al lado del otro y la fila entera cuenta
            algo; solo y a ancho de celular no muestra la columna. El segundo
            es el de la interacción con la columna, que es el punto.
            `HoverPlayVideo` ya alterna play/pausa al tocar, así que no
            necesita una variante propia para mobile. */}
        <div className="mt-14">
          <HoverPlayVideo
            src="/assets/videos/column/bs20-column-clip-2.mp4"
            poster="/assets/images/column/bs20-column-clip-2-poster.webp"
            label={t("video2Caption")}
          />
        </div>

        {/* DESTACADOS — el bento de desktop, en carousel.

            El `-mx-6` cancela el padding lateral de la sección: con `overflow`
            el carousel necesita el ancho completo del viewport para que la
            tarjeta siguiente se asome. El padding se repone en el track. */}
        <div className="-mx-6 mt-14">
          <StandHighlightsCarousel
            progressLabel={(index, total) =>
              t("highlightsProgressLabel", { index, total })
            }
            cards={HIGHLIGHTS.map(({ key, icon, maskSrc }) => ({
              key,
              icon,
              maskSrc,
              title: t(`highlights.${key}.title`),
              description: t(`highlights.${key}.description`),
            }))}
          />
        </div>

        {/* PRECIO — variante mobile del panel: misma lógica de precio que
            desktop (comparten `useStandPricing`), pero sin la caja externa,
            así no quedan dos contenedores anidados comiéndose el ancho. */}
        <StandPricingPanelMobile className="mt-14" />

        {/* SALIDAS — las dos alternativas para quien no cierra con el combo de
            arriba. A ancho completo y apiladas, para que entren en el pulgar. */}
        <div className="mt-14 flex flex-col gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track.whatsappClick({ source: "stand" })}
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-neutral-300 transition-colors duration-200 hover:border-white/30 hover:text-white"
          >
            {t("contactCta")}
            <FaWhatsapp size={16} />
          </a>

          <Link
            href="/cargadores"
            className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-neutral-300 transition-colors duration-200 hover:border-white/30 hover:text-white"
          >
            {t("browseChargersCta")}
            <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
