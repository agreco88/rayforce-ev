"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { waterfallItem } from "@/lib/animation-variants";
import { scrollToSection } from "@/lib/scroll-to-section";

/* ---------- Types ---------- */

export interface HeaderNavLinkProps {
  id: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

/* ---------- Component ---------- */

export default function HeaderNavLink({
  id,
  label,
  isActive,
  onClick,
}: HeaderNavLinkProps) {
  const t = useTranslations("Layout.Header");

  return (
    <motion.li variants={waterfallItem}>
      <Button
        variant="link"
        onClick={() => {
          scrollToSection(id);
          onClick?.();
        }}
        aria-current={isActive ? "true" : undefined}
        className={clsx(
          "text-neutral-50!",
          "cursor-pointer",
          "hover:text-green-400!",
          "transition-all duration-300",
          isActive && "text-green-400!",
        )}
      >
        {t(`nav.${label}`)}
      </Button>
    </motion.li>
  );
}
