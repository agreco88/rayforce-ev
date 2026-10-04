"use client";

import { useTranslations } from "next-intl";
import { ParkingCircle, Wrench, type LucideIcon } from "lucide-react";
import { CardCarousel } from "@/components/shared/carousel/CardCarousel";
import { CarouselCard } from "@/components/shared/carousel/CarouselCard";
import { GoogleReviewsBlock } from "@/components/shared/reviews/GoogleReviewsBlock";
import { HoverPlayVideo } from "./HoverPlayVideo";
import { StandPricingPanelMobile } from "./StandPricingPanelMobile";

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
 * - De los dos videos que desktop pone lado a lado queda solo el segundo: ver
 *   el comentario en su lugar.
 * - El bento de tres tarjetas pasa a carousel, para no comer scroll justo
 *   antes del panel de precio.
 * - El panel de precio tiene su propia variante (`StandPricingPanelMobile`),
 *   que comparte la lógica con desktop pero va sin la caja externa.
 */
export function HomeStandMobile({
  titleAs: Title,
  header,
}: {
  titleAs: "h1" | "h2";
  header?: React.ReactNode;
}) {
  const t = useTranslations("HomePage.HomeStandSection");

  return (
    <section
      aria-labelledby="stand-mobile-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Ritmo vertical de la sección, en dos pasos: `mt-8` entre piezas de un
          mismo bloque (texto → imagen → medidas → nota) y `mt-14` entre bloques
          (header → video → destacados → precio → salidas). `pt-16`/`pb-20`
          para que la sección respire contra sus bordes, en línea con el resto
          de la home. */}
      <div className={`flex flex-col px-6 pb-20 ${header ? "pt-28" : "pt-16"}`}>
        {header && <div className="mb-8">{header}</div>}

        {/* HEADER — el 50/50 de desktop, apilado. */}
        <span className="text-[10px] tracking-[0.3em] uppercase text-green-400">
          {t("eyebrow")}
        </span>

        <Title
          id="stand-mobile-heading"
          className="m-0 mt-4 text-3xl leading-[1.1] font-light tracking-tight text-white"
        >
          {t("title")}
        </Title>

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
            tarjeta siguiente se asome. */}
        <div className="-mx-6 mt-14">
          <CardCarousel
            items={HIGHLIGHTS.map(({ key, icon, maskSrc }) => (
              <CarouselCard
                key={key}
                card={{
                  key,
                  icon,
                  maskSrc,
                  title: t(`highlights.${key}.title`),
                  description: t(`highlights.${key}.description`),
                }}
              />
            ))}
          />
        </div>

        {/* PRECIO — variante mobile del panel: misma lógica de precio que
            desktop (comparten `useStandPricing`), pero sin la caja externa,
            así no quedan dos contenedores anidados comiéndose el ancho. */}
        <StandPricingPanelMobile className="mt-14" />

        {/* RESEÑAS — despues del panel, igual que desktop: respaldan la
            decision que se acaba de tomar. */}
        <GoogleReviewsBlock
          compact
          className="mt-16"
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
