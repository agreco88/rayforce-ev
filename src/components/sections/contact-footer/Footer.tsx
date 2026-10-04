"use client";

import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { GridBeams } from "@/components/shared/backgrounds/GridBeams";

import { FooterCTA } from "./FooterCTA";
import { FooterFaq } from "./FooterFaq";
import { FooterBrand } from "./FooterBrand";
import { FooterAccessoriesColumn, FooterChargersColumn } from "./FooterNavColumn";
import { FooterContactColumn } from "./FooterContactColumn";
import { FooterMeta } from "./FooterMeta";
import type { CatalogTheme } from "@/lib/catalog/catalog.types";

const FOOTER_GRID_MASK =
  "radial-gradient(ellipse 80% 55% at 50% 22%, #000 30%, transparent 85%)";

type Props = {
  /**
   * Namespace del FAQ de esta ruta. Sin esto no se monta: hoy solo la home y
   * /cargadores tienen preguntas escritas.
   */
  faqNamespace?: string;
  /** Ancla del FAQ, para el link del header. */
  faqId?: string;
  /** Namespace del CTA. Por defecto el generico de instalacion. */
  ctaNamespace?: string;
  /** De que ruta salio el click a WhatsApp, para analytics. */
  ctaSource?: string;
  /**
   * Tiñe los trazos de la grilla, el eyebrow del FAQ y el boton del CTA con el
   * color del producto. Las rutas sin producto (home, listados) no lo pasan y
   * quedan con el verde de marca, que es el default.
   */
  theme?: CatalogTheme;
};

/**
 * El cierre de toda pagina: FAQ → CTA → navegacion. La
 * `<section>` de afuera hace de orquestador — pone el fondo y lo estira a todo
 * el ancho; adentro, el `<footer>` solo lleva el contenido.
 *
 * Lo que cambia entre rutas son los dos namespaces (FAQ y CTA); la navegacion
 * de abajo es la misma en todas, y por eso vive aca y no en cada pagina.
 */
export function Footer({
  faqNamespace,
  faqId,
  ctaNamespace = "Footer.cta",
  ctaSource = "footer",
  theme,
}: Props = {}) {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-neutral-900">
      <GridBackground
        cellSize={64}
        lineOpacity={0.3}
        className="opacity-30"
        maskImage={FOOTER_GRID_MASK}
      />
      {/* Sin glow detras del FAQ: le quedaba detras de las preguntas. La vida
          la dan las lineas que se iluminan, con la misma grilla y mascara. */}
      <GridBeams
        cellSize={64}
        color={theme?.gradientColors[1]}
        maskImage={FOOTER_GRID_MASK}
      />

      <footer id="footer" className="relative z-10 px-6 text-neutral-200 sm:px-8">
        {/* Mismo contenedor que el header (`navigation-scroll.tsx`): el padding
            va en el `<footer>` y el `max-w` aca, para que la marca quede a plomo
            con el logo. */}
        <div className="mx-auto w-full max-w-[1440px]">
          {faqNamespace && (
            <div id={faqId} className="scroll-mt-24">
              <FooterFaq
                namespace={faqNamespace}
                accentText={theme?.accentText}
              />
            </div>
          )}
        </div>

        <div className="mx-auto w-full max-w-[1440px]">
          {/*
            El CTA lleva el id="contacto", que es el destino del link "Contacto"
            del header. Hasta ahora el componente existia pero no se montaba en
            ningun lado, asi que ese link no llevaba a nada.
          */}
          <FooterCTA
            namespace={ctaNamespace}
            source={ctaSource}
            accentText={theme?.accentText}
            accentBg={theme?.accentBg}
            accentHover={theme?.accentHover}
          />

          {/*
            Cuatro columnas: marca, cargadores, accesorios y contacto. La marca
            lleva mas ancho porque abajo del logo va el parrafo.
          */}
          <div
            className="
              border-t border-white/10
              pt-12
              grid grid-cols-2 gap-x-8 gap-y-12
              md:grid-cols-6
              lg:grid-cols-12 lg:gap-8
            "
          >
            <div className="col-span-2 md:col-span-6 lg:col-span-4">
              <FooterBrand />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <FooterChargersColumn />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <FooterAccessoriesColumn />
            </div>

            <div className="col-span-2 md:col-span-2 lg:col-span-2">
              <FooterContactColumn />
            </div>
          </div>

          <FooterMeta />
        </div>
      </footer>
    </section>
  );
}
