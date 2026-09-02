"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { HomeCostSection } from "@/components/sections/home/cost/HomeCostSection";

type Props = {
  theme: { accentText: string };
  id?: string;
};

/**
 * Two stacked 50/50 blocks, meant to live inside a parent section (shares
 * its background/grid/glow rather than defining its own):
 *  1. Cost comparison chart (Rayforce vs. UTE grid vs. gasoline), moved here
 *     from the home page.
 *  2. Regulatory reassurance — URSEA/UTE logos left, approval copy right.
 * Sits inside AppHighlightsInteractive's section, before its header, on
 * the model page.
 */
export function ChargerCertificationSection({ theme, id }: Props) {
  const t = useTranslations("ChargerModelPage.certificationSection");

  return (
    <div id={id} className="mx-auto w-full max-w-7xl">
      {/* ------------------------------------------------------------ */}
      {/* Cost comparison chart                                         */}
      {/* ------------------------------------------------------------ */}
      <div className="py-4">
        <HomeCostSection theme={theme} />
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Regulatory reassurance                                        */}
      {/* ------------------------------------------------------------ */}
      <div className="grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="order-2 flex items-center justify-center gap-6 lg:order-1"
        >
          <div className="relative flex h-32 w-40 items-center justify-center rounded-2xl bg-white p-4 sm:h-40 sm:w-48">
            <Image
              src="/images/partners/logo-ursea.webp"
              alt={t("urseaAlt")}
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="relative flex h-32 w-40 items-center justify-center rounded-2xl bg-white p-4 sm:h-40 sm:w-48">
            <Image
              src="/images/partners/logo-ute.webp"
              alt={t("uteAlt")}
              fill
              className="object-contain p-4"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1 }}
          className="order-1 text-center lg:order-2 lg:text-left"
        >
          <p
            className={cn(
              "text-sm uppercase tracking-[0.35em]",
              theme.accentText,
            )}
          >
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 text-4xl font-medium text-white sm:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-400 lg:mx-0">
            {t("description")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
