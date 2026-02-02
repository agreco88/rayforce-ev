"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { NAV_LINKS } from "@/lib/internal-nav-links";
import { waterfallList, waterfallItem } from "@/lib/animation-variants";
import { scrollToSection } from "@/lib/scroll-to-section";
import { useActiveSection } from "@/hooks/useActiveSection";

type AsideNavLinksProps = {
  onSelect?: () => void;
};

export default function AsideNavLinks({ onSelect }: AsideNavLinksProps) {
  const t = useTranslations("Layout.Header");
  const tA11y = useTranslations("AriaLabels");

  const activeId = useActiveSection(NAV_LINKS.map((link) => link.id));

  return (
    <nav aria-label={tA11y("mobileNavigation")} className="px-6 pt-10">
      <motion.ul
        variants={waterfallList}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="flex flex-col gap-10 divide-y"
      >
        {NAV_LINKS.map((link) => {
          const isActive = activeId === link.id;

          return (
            <motion.li key={link.id} variants={waterfallItem}>
              <button
                onClick={() => {
                  scrollToSection(link.id);
                  onSelect?.();
                }}
                aria-current={isActive ? "true" : undefined}
                className={`
                  block
                  w-full
                  text-left
                  text-2xl font-medium tracking-wide uppercase
                  pl-1 pb-4
                  transition-all duration-300
                  ${
                    isActive
                      ? "text-green-400"
                      : "text-neutral-200 hover:text-white hover:translate-x-1"
                  }
                `}
              >
                {t(`nav.${link.label}`)}
              </button>
            </motion.li>
          );
        })}
      </motion.ul>
    </nav>
  );
}
