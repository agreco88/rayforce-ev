"use client";

import { useTranslations } from "next-intl";
import { NAV_LINKS } from "@/lib/internal-nav-links";
import { scrollToSection } from "@/lib/scroll-to-section";

export function FooterNavColumn() {
  const t = useTranslations("Layout.Header");

  return (
    <div>
      <h3 className="text-xs tracking-[0.18em] uppercase text-white sm:text-neutral-300">
        {t("nav.nav")}
      </h3>

      <ul className="mt-6 space-y-4 text-sm text-neutral-500">
        {NAV_LINKS.map((link) => (
          <li key={link.id}>
            <button
              onClick={() => scrollToSection(link.id)}
              className="
                transition-colors
                cursor-pointer
                hover:text-green-500
                hover:underline underline-offset-4+ tracking-widest
              "
            >
              {t(`nav.${link.label}`)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
