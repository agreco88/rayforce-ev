"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { iconRotate, fadeIn } from "@/lib/animation-variants";

export default function HamburgerButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  const tA11y = useTranslations("AriaLabels");

  return (
    <motion.div
      variants={fadeIn(0.35)}
      className="flex items-center"
      initial="hidden"
      animate="show"
    >
      <Button
        variant="secondary"
        size="icon"
        onClick={onClick}
        className="md:hidden relative z-50 cursor-pointer"
        aria-label={open ? tA11y("closeMenu") : tA11y("mobileMenu")}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={open ? "close" : "open"}
            variants={iconRotate}
            custom={open ? "close" : "open"}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center"
          >
            {open ? <XIcon /> : <MenuIcon />}
          </motion.div>
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}
