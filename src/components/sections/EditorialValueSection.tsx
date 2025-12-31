"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { waterfallList, waterfallItem } from "@/lib/animation-variants";
import SectionWrapper from "../layout/section-wrapper";

export function EditorialValueSection() {
  const t = useTranslations("EditorialValueSection");
  const imageRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const grayscale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [100, 0, 0, 100]
  );

  const blur = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [3, 0, 0, 3]);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.6, 1, 1, 0.6]
  );

  return (
    <SectionWrapper className="py-16 sm:py-64! bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      <motion.div
        variants={waterfallList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="
          mx-auto
          max-w-6xl
          px-6
          sm:px-0
          grid
          grid-cols-1
          lg:grid-cols-12
          gap-12
          items-start
        "
      >
        {/* Text column */}
        <div className="lg:col-span-7">
          <motion.p
            variants={waterfallItem}
            className="text-sm font-medium uppercase tracking-wide text-muted-foreground"
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h2
            variants={waterfallItem}
            className="mt-4 text-3xl font-semibold tracking-tight text-gray-50 sm:text-4xl whitespace-pre-line"
          >
            {t("title")}
          </motion.h2>

          <div className="mt-10 space-y-6 max-w-xl text-lg leading-relaxed text-gray-300">
            <motion.p variants={waterfallItem}>{t("p1")}</motion.p>
            <motion.p variants={waterfallItem}>{t("p2")}</motion.p>
            <motion.p variants={waterfallItem}>{t("p3")}</motion.p>
          </div>
        </div>

        {/* Quiet visual anchor */}
        <motion.div
          ref={imageRef}
          variants={waterfallItem}
          initial={{
            filter: "grayscale(100%) blur(3px)",
            opacity: 0.6,
          }}
          style={{
            filter: useTransform(
              [grayscale, blur],
              ([g, b]) => `grayscale(${g}%) blur(${b}px)`
            ),
            opacity,
          }}
          className="
            lg:col-span-5
            relative
            h-[420px]
            rounded-2xl
            overflow-hidden
            bg-neutral-900
            ring-1 ring-neutral-600
            shadow-neutral-700
          "
        >
          <div
            className="
              absolute inset-0
              bg-[url('/images/editorial-image.webp')]
              bg-cover
              bg-center
            "
          />

          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
