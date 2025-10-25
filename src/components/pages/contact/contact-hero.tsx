"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { waterfallList, waterfallItem } from "@/lib/animation-variants";

export default function ContactHero() {
  const hero = useTranslations("ContactPage.ContactHero");

  return (
    <section className="flex flex-col px-4 md:p-0 py-12">
      <motion.div
        variants={waterfallList}
        initial="hidden"
        animate="show"
        className="flex flex-col items-start text-start"
      >
        <motion.h1
          variants={waterfallItem}
          className="text-4xl font-bold tracking-tight md:text-5xl"
        >
          {hero("h1")}
        </motion.h1>

        <motion.h2
          variants={waterfallItem}
          className="mt-2 text-lg text-muted-foreground md:text-xl"
        >
          {hero("h2")}
        </motion.h2>
      </motion.div>
    </section>
  );
}
