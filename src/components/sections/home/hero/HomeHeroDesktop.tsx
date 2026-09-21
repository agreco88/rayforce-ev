"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

import { waterfallList, waterfallItem } from "@/lib/animation-variants";
import { AppButton } from "@/components/ui/wrappers/AppButton";
import { DotExpandBadge } from "@/components/ui/wrappers/DotExpandBadge";
import { HomeHeroFeatureStrip } from "./HomeHeroFeatureStrip";
import { useTrack } from "@/lib/analytics";

/**
 * Variante del badge del hero. Cambiar este valor para comparar cuál funciona
 * mejor: "bamibel" (respaldo de ingeniería), "ursea" (autorización nominal)
 * o "product" (anuncio de producto residencial).
 */
type HeroBadgeVariant = "bamibel" | "ursea" | "product";

const HERO_BADGE: HeroBadgeVariant = "bamibel";

const BADGE_HREF: Record<HeroBadgeVariant, string> = {
  bamibel: "/empresas",
  ursea: "/empresas",
  product: "/cargadores/bs20-bc-11kw",
};

/**
 * Tratamiento del contraste sobre la columna de contenido. La foto tiene el
 * pasto iluminado justo debajo del texto, así que el fade base no alcanza.
 *
 * - "diagonal": inclina el gradiente y suma un refuerzo elíptico abajo a la
 *   izquierda. El negro se concentra donde está el texto y la esquina superior
 *   izquierda (follaje oscuro, ya contrastado) queda despejada.
 * - "flat": sube la densidad del fade horizontal parejo. Más predecible, pero
 *   apaga la mitad izquierda entera y se pierde el jardín.
 *
 * Cambiar el valor y recargar para comparar.
 */
type LeftContrastVariant = "diagonal" | "flat";

const LEFT_CONTRAST: LeftContrastVariant = "diagonal";

/**
 * Ancho del strip de confianza, medido contra el contenedor del hero (no
 * contra la media columna, que es su padre en el flex). Es el único bloque
 * que se permite pasar del 50%: con 4 ítems en media columna hay que bajarlos
 * a 2×2, y esa caja alta empuja los CTA fuera del fold.
 *
 * - "half": no se ensancha, 2×2 dentro de la columna. El estado anterior.
 * - "comfortable": los 4 en fila, cada título en una línea.
 * - "wide": máximo antes de pisar el cargador, que es el núcleo de la viñeta.
 *
 * El ancho va por `style` y no por clase de Tailwind: `w-[128%]` no llegó a
 * generarse ni con las clases literales en el código (el HTML salía con la
 * clase y el CSS sin la regla). Como es un solo valor que se calibra a ojo,
 * el inline es más directo que pelear con el escáner.
 *
 * Cambiar STRIP_SPAN y recargar para comparar.
 */
type StripSpan = "half" | "comfortable" | "wide";

const STRIP_WIDTH: Record<StripSpan, string> = {
  half: "100%",
  comfortable: "128%",
  wide: "144%",
};

const STRIP_SPAN: StripSpan = "comfortable";

export function HomeHeroDesktop({ id }: { id?: string }) {
  const t = useTranslations("HomePage.Hero");
  const track = useTrack();

  return (
    <section
      id={id}
      className="
        relative isolate
        w-full
        overflow-hidden
        bg-neutral-950
      "
    >
      {/* -------------------------------- IMAGE -------------------------------- */}
      {/*
        La imagen sangra a ancho completo del viewport (inset-0 sin max-w), no
        al contenedor de 1440px: así no quedan barras de fondo a los costados en
        pantallas anchas. El contenido sí sigue dentro del contenedor, alineado
        al header.
      */}
      <div className="pointer-events-none absolute inset-0">
        <div className="relative h-full w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/brand/rayforce-hero-3.webp"
            alt="Cargador EV Rayforce"
            fetchPriority="high"
            decoding="sync"
            className="
              absolute inset-0
              h-full
              w-full
              object-cover
              object-center
              select-none
            "
          />

          {/*
            Fade 1 — contraste del contenido: black → transparent vía transparent.
            La parada intermedia transparente es la clave: mantiene el negro
            pegado a la izquierda y lo suelta rápido, en vez de velar el centro
            de la imagen como haría un gradiente parejo.

            Ver LEFT_CONTRAST arriba para alternar entre las dos variantes.
          */}
          {LEFT_CONTRAST === "diagonal" ? (
            <>
              {/*
                Diagonal (to-br): reparte el negro hacia abajo a la izquierda en
                vez de parejo en toda la columna, que es donde el pasto
                iluminado se come el texto.
              */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-br
                  from-black from-0%
                  via-transparent via-50%
                  to-transparent
                "
              />

              {/*
                Refuerzo lateral: cubre la columna del texto en toda su altura,
                cosa que la viñeta sola no hace — su caída es radial y deja el
                borde superior izquierdo más flojo. Aliviado respecto de antes
                porque ahora la viñeta aporta buena parte de ese oscurecimiento.
              */}
              <div
                className="
                  absolute inset-y-0 left-0
                  w-[52%]
                  bg-gradient-to-r
                  from-black/55 from-0%
                  via-black/20 via-55%
                  to-transparent
                "
              />
            </>
          ) : (
            /* Flat: el horizontal parejo, más denso y llegando más a la derecha */
            <div
              className="
                absolute inset-0
                bg-gradient-to-r
                from-black from-0%
                via-black/45 via-35%
                to-transparent to-70%
              "
            />
          )}

          {/*
            Fade 2 — viñeta con el NÚCLEO SOBRE EL CARGADOR. Una sola fuente de
            luz: el producto queda limpio y todo lo demás cae de forma pareja
            en todas las direcciones.

            El 66% no es arbitrario. La foto es 1983x793 (2.5:1), bastante más
            panorámica que el hero, así que object-cover recorta a los costados
            y el cargador —que en el archivo está al 62%— se corre hacia el
            centro al achicarse el viewport: cae en ~63% a 1920px y ~68% a
            1280px. 66% es el punto medio que lo cubre en todo el rango.

            La elipse es más alta que ancha (60%/85%) para seguir la forma
            vertical del cargador.
          */}
          <div
            className="
              absolute inset-0
              bg-[radial-gradient(ellipse_60%_85%_at_66%_42%,transparent_15%,rgba(0,0,0,0.45)_45%,rgba(0,0,0,0.8)_80%,rgba(0,0,0,0.9)_100%)]
            "
          />

          {/*
            Fade 3 — remata el borde derecho. Angosto y suave: la viñeta, ahora
            centrada en el cargador, ya se encarga de apagar lo que viene
            después; esto solo cierra el borde en pantallas muy anchas.
          */}
          <div
            className="
              absolute inset-y-0 right-0
              w-[18%]
              bg-gradient-to-r
              from-transparent
              to-black to-95%
            "
          />
        </div>
      </div>

      {/* -------------------------------- CONTENT -------------------------------- */}
      {/*
        50/50: el contenido vive en la mitad izquierda y nunca invade la derecha,
        por más que crezca (está sobrepoblado adrede). La mitad derecha queda
        vacía — ahí se ve la imagen de fondo, que corre por debajo de ambas.
      */}
      <div
        className="
          relative z-10
          grid grid-cols-2
          w-full
          max-w-[1440px]
          mx-auto
          px-6 sm:px-8
          lg:px-16 2xl:px-0
          pt-40 pb-24
          lg:pt-56 lg:pb-32
        "
      >
        <motion.div
          initial="hidden"
          animate="show"
          variants={waterfallList}
          className="
            col-start-1
            pr-10
            flex flex-col
            gap-12
          "
        >
          {/* Eyebrow — announcement badge */}
          <motion.div variants={waterfallItem}>
            <DotExpandBadge
              href={BADGE_HREF[HERO_BADGE]}
              tag={t(`badge.${HERO_BADGE}.tag`)}
              onClick={() => track.homeHeroBadge("desktop")}
            >
              {t(`badge.${HERO_BADGE}.label`)}
            </DotExpandBadge>
          </motion.div>

          {/* Title — plain element, no animation: LCP target must paint immediately */}
          <h1
            className="
              text-4xl
              sm:text-5xl
              lg:text-6xl
              leading-[1.15]
              max-w-[20ch]
              font-light

              bg-gradient-to-b
              from-gray-50
              via-neutral-50
              to-stone-50

              bg-clip-text
              text-transparent
            "
          >
            {t("title")}
          </h1>

          {/* Description */}
          {/*
            neutral-200, no neutral-400: sobre foto + fade el gris medio nunca
            gana. El drop-shadow le da un borde propio para que no dependa de
            qué hay debajo.
          */}
          <motion.p
            variants={waterfallItem}
            className="
              text-md
              text-neutral-200
              leading-relaxed
              max-w-[52ch]
              [text-shadow:0_1px_12px_rgba(0,0,0,0.65)]
            "
          >
            {t("description")}
          </motion.p>

          {/*
            Trust signals. Es el único bloque que se sale de la media columna:
            los 4 ítems en fila no entran en el 50%, y bajarlos a 2×2 hace una
            caja alta que empuja los CTA fuera del fold.

            Cómo se ensancha sin romper el 50/50: el `pr-10` de la columna se
            cancela con `-mr-10`, y el % de STRIP_WIDTH se mide contra esa misma
            media columna — 128% son ~64% del contenedor. Solo crece este div;
            el h1, la descripción y los CTA no se enteran.

            El techo práctico es ~144%: más que eso y el strip se mete sobre el
            cargador, que es el núcleo de la viñeta. Ver STRIP_WIDTH arriba.

            El color se sube acá y no en el componente porque lo comparte el
            mobile, donde el fondo es otro.
          */}
          <motion.div
            variants={waterfallItem}
            style={{ width: STRIP_WIDTH[STRIP_SPAN] }}
            className={clsx(
              "mt-2 -mr-10 max-w-none",
              "[&_li>div:last-child]:text-neutral-200",
              "[&>ul]:[text-shadow:0_1px_12px_rgba(0,0,0,0.65)]",
            )}
          >
            <HomeHeroFeatureStrip />
          </motion.div>

          {/* CTA — cierran la columna, después de las señales de confianza */}
          <motion.div
            variants={waterfallItem}
            className="mt-2 flex flex-wrap items-center gap-4"
          >
            {/*
              Primario: fondo sólido en gradiente neutral oscuro con el texto
              verde. Sólido y no traslúcido porque sobre foto el fondo cambia
              píxel a píxel y el botón pierde jerarquía.
            */}
            <AppButton
              href="/cargadores"
              icon={<ArrowRight className="size-4" />}
              className="
                border-green-400/30
                bg-gradient-to-b from-neutral-800 to-neutral-900
                text-green-400
                hover:from-neutral-700 hover:to-neutral-800
                hover:text-green-300 hover:border-green-400/50
                shadow-lg shadow-black/30
              "
              track={() => track.homeHeroPrimary("desktop")}
            >
              {t("ctaPrimary")}
            </AppButton>

            {/*
              Secundario ghost: sin caja en reposo; en hover toma el mismo
              gradiente que el primario, así los dos se leen como un par. Lo que
              mantiene la jerarquía es el color del texto (neutral vs. verde),
              no la forma.
            */}
            <AppButton
              href="/empresas"
              variant="ghost"
              className="
                border-transparent
                text-neutral-200
                hover:bg-gradient-to-b hover:from-neutral-800 hover:to-neutral-900
                hover:text-white
                [text-shadow:0_1px_12px_rgba(0,0,0,0.65)]
              "
              track={() => track.homeHeroEmpresas("desktop")}
            >
              {t("ctaSecondary")}
            </AppButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
