"use client";

import { FooterCTA } from "./FooterCTA";
import { FooterBrand } from "./FooterBrand";
import { FooterNavColumn } from "./FooterNavColumn";
import { FooterContactColumn } from "./FooterContactColumn";
import { FooterMeta } from "./FooterMeta";

export function Footer() {
  return (
    <footer id="footer" className="bg-neutral-950 text-neutral-200">
      {/* Mismo contenedor que el header (`navigation-scroll.tsx`): ancho y
          padding tienen que coincidir para que logo y marca queden a plomo. */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-16 2xl:px-0">
        {/*
          El CTA lleva el id="contacto", que es el destino del link "Contacto"
          del header. Hasta ahora el componente existia pero no se montaba en
          ningun lado, asi que ese link no llevaba a nada.
        */}
        <FooterCTA />

        {/*
          Grilla pareja de 12: marca 4, navegacion 4, contacto 4. Antes era
          5 + spacer vacio + 3 + 3 con justify-self-end, que dejaba la columna
          de contacto desalineada del resto.
        */}
        <div
          className="
            border-t border-white/10
            pt-12
            grid grid-cols-1 gap-12
            md:grid-cols-12 md:gap-8
          "
        >
          <div className="md:col-span-4">
            <FooterBrand />
          </div>

          <div className="md:col-span-4">
            <FooterNavColumn />
          </div>

          <div className="md:col-span-4">
            <FooterContactColumn />
          </div>
        </div>

        <FooterMeta />
      </div>
    </footer>
  );
}
