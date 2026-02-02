"use client";

import { Zap, Smartphone, Leaf, SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import Container from "@/components/layout/container";
import {
  waterfallList,
  cardContainer,
  cardItem,
} from "@/lib/animation-variants";

export function HeroFeatureCardsSection() {
  const t = useTranslations("HomePage.HeroFeatureCards");

  const FEATURES = [
    { key: "safeInstallation", icon: SlidersHorizontal },
    { key: "smartSavings", icon: Zap },
    { key: "mobileControl", icon: Smartphone },
    { key: "sustainability", icon: Leaf },
  ] as const;

  return (
    <Container className="px-6 sm:px-0!">
      <motion.div
        variants={waterfallList}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4"
      >
        {FEATURES.map(({ key, icon: Icon }) => (
          <motion.div
            key={key}
            variants={waterfallList}
            className="
              rounded-2xl
              border border-neutral-800
              bg-gradient-to-tl from-neutral-950 via-neutral-950 to-neutral-900
              backdrop-blur
              p-6
              transition-colors
              hover:bg-neutral-900
            "
          >
            <motion.div
              variants={cardContainer}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={cardItem}>
                <Icon className="h-5 w-5 text-green-400" aria-hidden />
              </motion.div>

              <motion.h3
                variants={cardItem}
                className="mt-4 text-base font-medium text-white"
              >
                {t(`items.${key}.title`)}
              </motion.h3>

              <motion.p
                variants={cardItem}
                className="mt-2 text-sm leading-relaxed text-neutral-400"
              >
                {t(`items.${key}.description`)}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </Container>
  );
}
