"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animation-variants";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionWrapper from "../layout/section-wrapper";

export default function AboutSection() {
  const t = useTranslations("HomePage.about");

  return (
    <SectionWrapper
      id="about"
      className="grid grid-cols-1 pb-24 sm:pb-32 lg:grid-cols-2 gap-16 !pt-0 items-center"
    >
      <motion.div variants={fadeIn(0.3)} initial="hidden" whileInView="show">
        <h2 className="text-4xl font-medium tracking-tight text-foreground sm:text-5xl">
          {t("title")}
        </h2>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {t("paragraph1")}
        </p>

        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          {t("paragraph2")}
        </p>
      </motion.div>

      {/* Image block */}
      <motion.div
        variants={fadeIn(0.45)}
        initial="hidden"
        whileInView="show"
        className="flex justify-center border h-full items-center rounded-lg bg-neutral-50 shadow"
      >
        TODO IMG
      </motion.div>
    </SectionWrapper>
  );
}
