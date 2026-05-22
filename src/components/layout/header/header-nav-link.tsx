"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import clsx from "clsx";

import { Button } from "@/components/ui/button";

import { waterfallItem } from "@/lib/animation-variants";
import { scrollToSection } from "@/lib/scroll-to-section";

import { Link } from "@/i18n/navigation";
import { useTrack } from "@/lib/analytics/use-track";

/* ---------- Types ---------- */

export interface HeaderNavLinkProps {
  label: string;

  href?: string;
  sectionId?: string;

  isActive?: boolean;
  onClick?: () => void;
}

/* ---------- Component ---------- */

export default function HeaderNavLink({
  label,
  href,
  sectionId,
  isActive,
  onClick,
}: HeaderNavLinkProps) {
  const t = useTranslations("Layout.Header");
  const track = useTrack();

  const className = clsx(
    "text-neutral-50!",
    "cursor-pointer",
    "hover:text-green-400!",
    "transition-all duration-300",
    isActive && "text-green-400!",
  );

  /* ---------------- Scroll Link ---------------- */

  if (sectionId) {
    return (
      <motion.li variants={waterfallItem}>
        <Button
          variant="link"
          onClick={() => {
            track.navLinkClicked(label, sectionId);
            scrollToSection(sectionId);
            onClick?.();
          }}
          aria-current={isActive ? "true" : undefined}
          className={className}
        >
          {t(`nav.${label}`)}
        </Button>
      </motion.li>
    );
  }

  /* ---------------- Route Link ---------------- */

  return (
    <motion.li variants={waterfallItem}>
      <Button asChild variant="link" className={className}>
        <Link href={href ?? "/"} onClick={() => track.navLinkClicked(label, href ?? "/")}>{t(`nav.${label}`)}</Link>
      </Button>
    </motion.li>
  );
}
