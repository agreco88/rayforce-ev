"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_LINKS } from "@/lib/internal-nav-links";
import { PRODUCTS } from "@/lib/products-data";
import { waterfallList, waterfallItem } from "@/lib/animation-variants";

type AsideNavLinksProps = {
  onSelect?: () => void;
};

export default function AsideNavLinks({ onSelect }: AsideNavLinksProps) {
  const t = useTranslations("Layout.Header");
  const tProducts = useTranslations("ProductsSection");
  const tA11y = useTranslations("AriaLabels");

  return (
    <nav aria-label={tA11y("mobileNavigation")} className="px-6 pt-10">
      <motion.ul
        variants={waterfallList}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="flex flex-col gap-10"
      >
        {/* Primary navigation */}
        <li>
          <ul className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <motion.li key={link.href} variants={waterfallItem}>
                <Link
                  href={link.href}
                  onClick={onSelect}
                  className="
                    block
                    text-2xl font-medium tracking-tight
                    text-neutral-200
                    transition-all duration-300
                    hover:text-white
                    hover:translate-x-1
                  "
                >
                  {t(`nav.${link.label}`)}
                </Link>
              </motion.li>
            ))}
          </ul>
        </li>

        {/* Products */}
        <li>
          <motion.p
            variants={waterfallItem}
            className="text-xs uppercase tracking-[0.18em] text-neutral-400"
          >
            {tProducts("eyebrow")}
          </motion.p>

          <ul className="mt-4 grid grid-cols-1 gap-6">
            {PRODUCTS.map((product) => (
              <motion.li key={product.key} variants={waterfallItem}>
                <Link
                  href={product.href}
                  onClick={onSelect}
                  className="
                    block
                    text-sm text-neutral-400
                    transition-colors
                    hover:text-neutral-200
                  "
                >
                  {tProducts(`products.${product.key}.label`)}
                </Link>
              </motion.li>
            ))}
          </ul>
        </li>
      </motion.ul>
    </nav>
  );
}
