"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { waterfallList, waterfallItem } from "@/lib/animation-variants";
import SectionWrapper from "./layout/section-wrapper";

export function ChargerStandSection({ id }: { id?: string }) {
  const t = useTranslations("HomePage.ChargerStandSection");

  return (
    <SectionWrapper
      id={id}
      className="border-t border-neutral-800 py-20 sm:py-40 bg-gradient-to-b  from-neutral-950 via-neutral-900 to-green-950 px-6"
    >
      <motion.div
        variants={waterfallList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="
          mx-auto
          max-w-6xl
          grid
          grid-cols-1
          lg:grid-cols-12
          gap-12
          items-start
        "
      >
        {/* Text column */}
        <div className="lg:col-span-7 h-full justify-center flex flex-col gap-4">
          <motion.p
            variants={waterfallItem}
            className="text-sm font-medium uppercase tracking-wide text-muted-foreground"
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h2
            variants={waterfallItem}
            className="text-3xl font-medium tracking-tight text-neutral-200 sm:text-4xl  whitespace-pre-line text-balance"
          >
            {t.rich("title", {
              price: () => (
                <strong className="font-medium text-green-400 ">
                  {t("price")}
                </strong>
              ),
            })}
          </motion.h2>

          <div className="mt-6 space-y-4 max-w-xl text-lg leading-relaxed text-neutral-400">
            <motion.p variants={waterfallItem}>
              {t("p1")} {t("p2")}
            </motion.p>
            <motion.p
              variants={waterfallItem}
              className="text-sm text-neutral-300 font-semibold mt-10"
            >
              {t("note")}
            </motion.p>
          </div>
        </div>

        {/* Quiet visual anchor */}
        <motion.div
          variants={waterfallItem}
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
              bg-[url('/images/post-bg.webp')]
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
