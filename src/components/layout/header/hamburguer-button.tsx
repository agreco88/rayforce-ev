"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { iconRotate, fadeIn } from "@/lib/animation-variants";
import clsx from "clsx";

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
      initial="hidden"
      animate="show"
      className="flex items-center"
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={open ? tA11y("closeMenu") : tA11y("mobileMenu")}
        className={clsx(
          "relative z-50 md:hidden",
          "inline-flex h-10 w-10 items-center justify-center",
          "rounded-md",
          "text-neutral-200",
          "transition-colors",
          "hover:bg-white/5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            variants={iconRotate}
            custom={open ? "close" : "open"}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center"
          >
            {open ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </motion.span>
        </AnimatePresence>
      </button>
    </motion.div>
  );
}
