"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_LINKS } from "@/lib/internal-nav-links";
import { waterfallList, waterfallItem } from "@/lib/animation-variants";

type AsideNavLinksProps = {
  onSelect?: () => void;
};

export default function AsideNavLinks({ onSelect }: AsideNavLinksProps) {
  const t = useTranslations("Layout.Header");
  const tA11y = useTranslations("AriaLabels");

  return (
    <nav aria-label={tA11y("mobileNavigation")} className="flex-1">
      <motion.ul
        variants={waterfallList}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="flex flex-col gap-4 justify-around w-full h-full"
      >
        <motion.li
          key="placeholder"
          className="flex flex-1"
          variants={waterfallItem}
        />
        {NAV_LINKS.map((link) => (
          <motion.li key={link.href} variants={waterfallItem}>
            <Link
              href={link.href}
              onClick={onSelect}
              className="block text-3xl font-semibold uppercase tracking-tight hover:text-primary transition-colors border-b border-gray-400 border-dotted pb-3"
            >
              {t(`nav.${link.label}`)}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </nav>
  );
}
