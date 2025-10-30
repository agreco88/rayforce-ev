"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { waterfallItem } from "@/lib/animation-variants";

/* ---------- Types ---------- */

interface HeaderNavLinkProps {
  href: string;
  label: string;
}

/* ---------- Component ---------- */

export default function HeaderNavLink({ href, label }: HeaderNavLinkProps) {
  const pathname = usePathname();
  const t = useTranslations("Layout.Header");

  return (
    <motion.li key={href} variants={waterfallItem}>
      <Button
        asChild
        variant="ghost"
        className={clsx(
          "px-4 text-sm font-medium transition-colors hover:text-secondary",
          pathname === href && "border-b-primary text-primary"
        )}
      >
        <Link href={href}>{t(`nav.${label}`)}</Link>
      </Button>
    </motion.li>
  );
}
