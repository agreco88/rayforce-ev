"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animation-variants";
import { Button } from "@/components/ui/button";
import SectionWrapper from "../layout/section-wrapper";
import { useTranslations } from "next-intl";

export default function DefaultHero() {
  const t = useTranslations("HomePage.hero");

  return (
    <SectionWrapper className="!py-0 flex flex-col justify-center text-start md:text-center min-h-screen py-0 self-center items-center">
      <motion.h1
        variants={fadeInUp(0.2)}
        initial="hidden"
        animate="show"
        className="text-4xl text-balance f font-medium tracking-tighter sm:tracking-tight text-foreground sm:text-6xl"
      >
        {t("title")}
      </motion.h1>

      <motion.p
        variants={fadeInUp(0.3)}
        initial="hidden"
        animate="show"
        className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
      >
        {t("subtitle")}
      </motion.p>

      <motion.div
        variants={fadeInUp(0.4)}
        initial="hidden"
        animate="show"
        className="mt-10 flex items-center justify-start gap-3"
      >
        <Button
          size="lg"
          className="flex-1 sm:flex-none"
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {t("cta")}
        </Button>

        <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
          {t("cta2")}
        </Button>
      </motion.div>
    </SectionWrapper>
  );
}
