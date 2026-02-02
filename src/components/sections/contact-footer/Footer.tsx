"use client";

import { useTranslations } from "next-intl";

import { FooterCTA } from "./FooterCTA";
import { FooterBrand } from "./FooterBrand";
import { FooterNavColumn } from "./FooterNavColumn";
import { FooterContactColumn } from "./FooterContactColumn";
import { FooterMeta } from "./FooterMeta";

export default function Footer({ id }: { id?: string }) {
  const t = useTranslations("Footer");

  return (
    <footer
      id={id}
      className="bg-gradient-to-t from-neutral-900 via-neutral-950 to-neutral-950 text-neutral-200 border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FooterCTA />

        {/* Main footer content */}
        <div
          className="
            mt-24
            border-t border-white/10
            pt-12
            grid
            grid-cols-1
            gap-14
            md:grid-cols-12
            md:gap-8
          "
        >
          <div className="md:col-span-4">
            <FooterBrand />
          </div>
          <div className="md:col-span-2"></div>
          <div className="md:col-span-3">
            <FooterNavColumn />
          </div>

          <div className="md:col-span-3 md:justify-self-end">
            <FooterContactColumn />
          </div>
        </div>

        {/* Bottom meta */}
        <FooterMeta />
      </div>
    </footer>
  );
}
