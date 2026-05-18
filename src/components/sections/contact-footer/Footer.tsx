"use client";

import { FooterBrand } from "./FooterBrand";
import { FooterNavColumn } from "./FooterNavColumn";
import { FooterContactColumn } from "./FooterContactColumn";
import { FooterMeta } from "./FooterMeta";

export function Footer() {
  return (
    <footer id="footer" className="bg-neutral-950  text-neutral-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main columns */}
        <div
          className="
            mt-16
            border-t border-white/10
            pt-12
            grid grid-cols-1 gap-14
            md:grid-cols-12 md:gap-8
          "
        >
          <div className="md:col-span-5">
            <FooterBrand />
          </div>

          <div className="md:col-span-1" />

          <div className="md:col-span-3">
            <FooterNavColumn />
          </div>

          <div className="md:col-span-3 md:justify-self-end">
            <FooterContactColumn />
          </div>
        </div>

        <FooterMeta />
      </div>
    </footer>
  );
}
