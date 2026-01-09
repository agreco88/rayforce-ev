"use client";

import { FooterCTA } from "./FooterCTA";
import { FooterBrand } from "./FooterBrand";
import { FooterNavColumn } from "./FooterNavColumn";
import { FooterContactColumn } from "./FooterContactColumn";
import { FooterMeta } from "./FooterMeta";
import { footerNavigation } from "@/lib/footer-navigation";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-gradient-to-t from-neutral-900 via-neutral-950 to-neutral-950 text-neutral-200 border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FooterCTA />

        {/* Main footer content */}
        <div className="mt-24 border-t space-y-14 sm:space-y-0 sm:gap-8 border-white/10 pt-12 md:grid md:grid-cols-4 ">
          <FooterBrand />
          <h3 className="text-xs tracking-[0.18em] uppercase text-white text-center sm:text-neutral-300">
            INICIO
          </h3>{" "}
          <h3 className="text-xs tracking-[0.18em] text-left uppercase text-white sm:text-neutral-300">
            PRODUCTOS
          </h3>{" "}
          <FooterContactColumn />
        </div>

        {/* Bottom meta (legal + socials) */}
        <FooterMeta />
      </div>
    </footer>
  );
}
