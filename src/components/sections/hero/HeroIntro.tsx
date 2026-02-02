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
          text-5xl sm:text-5xl lg:text-6xl
          font-semibold tracking-tighter
          bg-linear-to-t pb-2
          from-neutral-300 to-white
          bg-clip-text text-transparent
          text-center sm:text-start
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
          text-center sm:text-start
        "
      >
        {t.rich("description", {
          strong: (chunks) => <strong>{chunks}</strong>,
        })}
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={waterfallList}
        className="
          mt-8
          flex
          flex-col
          gap-4
          sm:flex-row
          sm:flex-wrap
          sm:items-center
          sm:gap-4
        "
      >
        <Button asChild variant="outline">
          <Link
            href="#products"
            scroll
            className="
              flex items-center justify-center
              px-8 py-6
              text-green-400
              border-green-700!
              hover:text-green-300
              hover:border-green-400
              transition-all duration-400
              w-full sm:w-auto
            "
          >
            {t("ctaPrimary")}
          </Link>
        </Button>

        <DemoVideoModal />
        <Button asChild variant="outline">
          <Link
            href="#contact"
            scroll
            className="
      flex items-center justify-center
      px-8 py-6
      text-neutral-500
      hover:text-neutral-100
      hover:border-neutral-800
      transition-all duration-400
      w-full sm:w-auto
    "
          >
            {t("ctaTertiary")}
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
