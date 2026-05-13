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
    <motion.div initial="show" animate="show" className="z-10  flex flex-col ">
      {/* TITLE */}
      <motion.h1 className="flex flex-col">
        <span className="font-light"> {t("title")}</span>
        <span className="font-medium text-green-500"> {t("title2")}</span>
      </motion.h1>

      {/* DESCRIPTION */}
      <motion.p variants={waterfallList} className="max-w-xl w-[50ch]">
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
          <Link href="/cargadores" className="px-8 py-6">
            {t("ctaPrimary")}
          </Link>
        </Button>

        {/* Demo */}
        {/* <div className="w-full sm:w-auto">
          <DemoVideoModal />
        </div> */}

        {/* Secondary */}
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href="/cargadores" className="px-8 py-6">
            {t("ctaTertiary")}
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
