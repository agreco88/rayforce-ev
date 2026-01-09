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
      <Button asChild variant="link">
        <Link
          href={href}
          className="text-neutral-50! hover:text-green-400! transition-all duration-400"
        >
          {t(`nav.${label}`)}
        </Link>
      </Button>
    </motion.li>
  );
}
