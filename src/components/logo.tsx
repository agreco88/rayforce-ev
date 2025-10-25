"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animation-variants";

export default function Logo() {
  const t = useTranslations("AriaLabels");

  return (
    <Link
      href="/"
      aria-label={t("logo")}
      className="flex items-center gap-2 font-semibold text-primary"
    >
      {/* Left mark */}
      <motion.div
        variants={fadeIn(0.1)}
        initial="hidden"
        animate="show"
        className="flex w-10 h-9 items-center justify-center rounded-md bg-primary text-background shadow-sm"
      >
        Hw
      </motion.div>

      {/* Wordmark */}
      <motion.div
        variants={fadeIn(0.2)}
        initial="hidden"
        animate="show"
        className="text-lg tracking-tight hidden md:flex"
      >
        HelloWorld
      </motion.div>
    </Link>
  );
}
