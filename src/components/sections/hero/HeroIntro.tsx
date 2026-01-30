"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { DemoVideoModal } from "@/components/DemoVideoModal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { waterfallList } from "@/lib/animation-variants";

export function HeroIntro() {
  const t = useTranslations("HomePage.HeroIntro");

  return (
    <motion.div
      variants={waterfallList}
      initial="hidden"
      animate="show"
      className="relative z-10 max-w-3xl"
    >
      {/* TITLE */}
      <motion.h1
        variants={waterfallList}
        className="
          text-4xl sm:text-5xl lg:text-6xl
          font-semibold tracking-tighter
          bg-linear-to-t pb-2
          from-neutral-300 to-white
          bg-clip-text text-transparent
        "
      >
        {t("title")}
      </motion.h1>

      {/* DESCRIPTION */}
      <motion.p
        variants={waterfallList}
        className="
          mt-6 text-lg
          bg-linear-to-b py-2
          from-stone-300 to-stone-400
          bg-clip-text text-transparent
        "
      >
        {t.rich("description", {
          strong: (chunks) => <strong>{chunks}</strong>,
        })}
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={waterfallList}
        className="mt-8 flex flex-wrap gap-4"
      >
        <Button asChild variant="outline">
          <Link
            href="#productos"
            scroll
            className="
              hover:text-green-300 transition-all duration-400
              text-green-400 border-green-700!
              hover:border-green-400 py-6! w-40
            "
          >
            {t("ctaPrimary")}
          </Link>
        </Button>

        <DemoVideoModal />
      </motion.div>
    </motion.div>
  );
}
