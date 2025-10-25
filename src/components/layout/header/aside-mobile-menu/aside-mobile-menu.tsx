"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import HamburgerButton from "../hamburguer-button";
import AsideNavLinks from "./aside-nav-links";
import AsideSocialLinks from "./aside-social-links";
import AsideHeader from "./aside-header";
import LocaleSwitcherMobile from "./aside-locale-switcher";
import { fadeIn } from "@/lib/animation-variants";

export default function AsideMobileMenu() {
  const [open, setOpen] = useState(false);
  const tA11y = useTranslations("AriaLabels");

  // prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="flex items-center">
      {/* Trigger button (hamburger) */}
      <HamburgerButton open={open} onClick={() => setOpen((p) => !p)} />

      <AnimatePresence>
        {open && (
          <motion.aside
            variants={fadeIn(0)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="
              fixed inset-0 z-50 flex flex-col min-h-dvh 
              text-foreground overflow-hidden
              bg-background/95 backdrop-blur-md 
              supports-[backdrop-filter]:bg-background
            "
            role="dialog"
            aria-modal="true"
            aria-label={tA11y("mobileMenu")}
          >
            <AsideHeader onClose={() => setOpen(false)} />
            <AsideNavLinks onSelect={() => setOpen(false)} />
            <LocaleSwitcherMobile onSelect={() => setOpen(false)} />
            <AsideSocialLinks />
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
