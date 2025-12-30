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
      className="bg-neutral-950 text-neutral-200 border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl px-6 sm:pb-12 pt-20 sm:pt-24 lg:px-8 lg:pt-32">
        <FooterCTA />

        {/* Main footer content */}
        <div className="mt-24 border-t space-y-14 sm:space-y-0 sm:gap-8 border-white/10 pt-12 md:grid md:grid-cols-4 ">
          <FooterBrand />
          <FooterNavColumn group="products" items={footerNavigation.products} />
          <FooterNavColumn group="company" items={footerNavigation.company} />
          <FooterContactColumn />
        </div>

        {/* Bottom meta (legal + socials) */}
        <FooterMeta />
      </div>
    </footer>
  );
}
