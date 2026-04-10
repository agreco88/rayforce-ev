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
      className="relative z-10 max-w-3xl flex flex-col justify-center h-full"
    >
      {/* TITLE */}
      <motion.h1
        variants={waterfallList}
        className="
          text-3xl sm:text-5xl lg:text-6xl
          font-semibold tracking-tighter
          bg-linear-to-t pb-2
          from-neutral-50 to-white
          bg-clip-text text-transparent
          text-start
        "
      >
        {t("title")}
      </motion.h1>

      {/* DESCRIPTION */}
      <motion.p
        variants={waterfallList}
        className="
          mt-6 text-lg
          bg-linear-to-r py-2
          from-stone-200 to-stone-300
          bg-clip-text text-transparent max-w-xl
         
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
        flex flex-wrap gap-4
        lg:flex-nowrap
  "
      >
        {/* Primary */}
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link
            href="#products"
            scroll
            className="
                          bg-neutral-900!
              flex items-center justify-center
              px-8 py-6
              text-green-400
              border-green-700!
              hover:text-green-300
              hover:border-green-400
              transition-all duration-400
            "
          >
            {t("ctaPrimary")}
          </Link>
        </Button>

        {/* Demo */}
        <div className="w-full sm:w-auto">
          <DemoVideoModal />
        </div>

        {/* Secondary */}
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link
            href="#contact"
            scroll
            className="
              flex items-center justify-center
              bg-neutral-950!
              px-8 py-6
              text-neutral-50
              hover:text-neutral-100
              hover:border-neutral-800
              transition-all duration-400
            "
          >
            {t("ctaTertiary")}
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
