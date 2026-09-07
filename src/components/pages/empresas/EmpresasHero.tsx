"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { AppButton } from "@/components/ui/wrappers/AppButton";
import { useTrack } from "@/lib/analytics";
import { buildWhatsAppHref } from "@/lib/whatsapp";

export function EmpresasHero() {
  const t = useTranslations("EmpresasPage.Hero");
  const tContact = useTranslations("EmpresasPage.Contact");
  const track = useTrack();

  return (
    <section className="relative isolate w-full overflow-hidden bg-neutral-950">
      {/* Background image */}
      <div className="absolute inset-0 flex justify-end">
        <div className="relative h-full w-full lg:w-[70%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/banners/rayforce-charging.avif"
            alt={t("imageAlt")}
            fetchPriority="high"
            decoding="sync"
            className="h-full w-full object-cover object-center select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/30" />
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-neutral-950 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pt-40 pb-24 sm:px-8 lg:px-16 lg:pt-56 lg:pb-32 2xl:px-0">
        <motion.div
          initial="hidden"
          animate="show"
          variants={waterfallList}
          className="flex max-w-3xl flex-col gap-8"
        >
          <motion.span
            variants={waterfallItem}
            className="text-xs uppercase tracking-[0.35em] text-green-400"
          >
            {t("eyebrow")}
          </motion.span>

          {/* LCP target — no entrance animation */}
          <h1 className="max-w-[20ch] bg-gradient-to-b from-gray-50 via-neutral-50 to-stone-50 bg-clip-text text-4xl leading-[1.15] font-light text-transparent sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>

          <motion.p
            variants={waterfallItem}
            className="max-w-[62ch] leading-relaxed text-neutral-400"
          >
            {t("description")}
          </motion.p>

          <motion.div
            variants={waterfallItem}
            className="mt-2 flex flex-wrap gap-4"
          >
            <AppButton
              href={buildWhatsAppHref(tContact("whatsappMessage"))}
              external
              icon={<FaWhatsapp className="size-4" />}
              className="border-green-400/40 bg-green-400/5"
              track={() => track.whatsappClick({ source: "empresas_hero" })}
            >
              {t("ctaPrimary")}
            </AppButton>

            <AppButton
              href="#metodologia"
              icon={<ArrowRight className="size-4" />}
              className="border-white/15 text-neutral-200 hover:text-white"
            >
              {t("ctaSecondary")}
            </AppButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
