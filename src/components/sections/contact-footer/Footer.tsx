"use client";

import { CompatibilitySection } from "@/components/pages/shared/CompatibilitySection";
import { GridBackground } from "@/components/shared/backgrounds/GridBackground";

import { FooterCTA } from "./FooterCTA";
import { FooterFaq } from "./FooterFaq";
import { FooterBrand } from "./FooterBrand";
import {
  FooterChargersColumn,
  FooterCablesColumn,
  FooterStandColumn,
} from "./FooterNavColumn";
import { FooterContactColumn } from "./FooterContactColumn";
import { FooterMeta } from "./FooterMeta";

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
   * Monta la compatibilidad arriba del CTA, con este id de ancla. Solo la home:
   * las páginas de cargador ya la montan en el medio, teñida con su color.
   */
  compatibilityId?: string;
};

/**
 * El cierre de toda pagina: FAQ → compatibilidad → CTA → navegacion. La
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
  compatibilityId,
}: Props = {}) {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-neutral-900">
      <GridBackground
        cellSize={64}
        lineOpacity={0.3}
        className="opacity-30"
        maskImage="radial-gradient(ellipse 80% 55% at 50% 22%, #000 30%, transparent 85%)"
      />

      {/* Mismo degrade verde que el hero, pero centrado y detras del CTA: el
          foco es el logo del medio, no una esquina. El `top` lo corre al alto
          del CTA — anclado arriba se apagaba antes de llegar. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[900px] bg-[radial-gradient(ellipse_45%_38%_at_50%_30%,rgba(34,197,94,0.16),rgba(34,197,94,0.05)_45%,transparent_70%)]"
      />

      <footer id="footer" className="relative z-10 text-neutral-200">
        {/* Mismo contenedor que el header (`navigation-scroll.tsx`): ancho y
            padding tienen que coincidir para que logo y marca queden a plomo. */}
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-16 2xl:px-0">
          {faqNamespace && (
            <div id={faqId} className="scroll-mt-24">
              <FooterFaq namespace={faqNamespace} />
            </div>
          )}
        </div>

        {/* Fuera del contenedor: su fondo y su grilla van a todo el ancho, y el
            contenido ya se centra solo. */}
        {compatibilityId && <CompatibilitySection id={compatibilityId} />}

        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-16 2xl:px-0">
          {/*
            El CTA lleva el id="contacto", que es el destino del link "Contacto"
            del header. Hasta ahora el componente existia pero no se montaba en
            ningun lado, asi que ese link no llevaba a nada.
          */}
          <FooterCTA namespace={ctaNamespace} source={ctaSource} />

          {/*
            Cinco columnas: marca, las tres familias de producto y contacto. La
            marca lleva el doble de ancho porque abajo del logo va el parrafo;
            las otras cuatro son listas de links y entran parejas.
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
            <div className="col-span-2 md:col-span-6 lg:col-span-3">
              <FooterBrand />
            </div>

            <div className="md:col-span-2 lg:col-span-2">
              <FooterChargersColumn />
            </div>

            <div className="md:col-span-2 lg:col-span-2">
              <FooterCablesColumn />
            </div>

            <div className="md:col-span-2 lg:col-span-2">
              <FooterStandColumn />
            </div>

            <div className="col-span-2 md:col-span-6 lg:col-span-3">
              <FooterContactColumn />
            </div>
          </div>

          <FooterMeta />
        </div>
      </footer>
    </section>
  );
}
