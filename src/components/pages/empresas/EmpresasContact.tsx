"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { AppButton } from "@/components/ui/wrappers/AppButton";
import { useTrack } from "@/lib/analytics";
import { buildWhatsAppHref } from "@/lib/whatsapp";

export function EmpresasContact({ id }: { id?: string }) {
  const t = useTranslations("EmpresasPage.Contact");
  const track = useTrack();

  return (
    <section id={id} className="border-t border-neutral-900 bg-neutral-950">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={waterfallList}
        className="mx-auto w-full max-w-3xl px-6 py-24 text-center sm:px-8 lg:py-32"
      >
        <motion.span
          variants={waterfallItem}
          className="text-xs uppercase tracking-[0.35em] text-green-400"
        >
          {t("eyebrow")}
        </motion.span>

        <motion.h2
          variants={waterfallItem}
          className="mt-5 text-4xl font-light tracking-tight text-balance text-white sm:text-5xl"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          variants={waterfallItem}
          className="mx-auto mt-6 max-w-[58ch] leading-relaxed text-pretty text-neutral-400"
        >
          {t("description")}
        </motion.p>

        <motion.div variants={waterfallItem} className="mt-10 flex justify-center">
          <AppButton
            href={buildWhatsAppHref(t("whatsappMessage"))}
            external
            icon={<FaWhatsapp className="size-4" />}
            className="border-green-400/40 bg-green-400/5"
            track={() => track.whatsappClick({ source: "empresas_contacto" })}
          >
            {t("ctaWhatsapp")}
          </AppButton>
        </motion.div>

        {/* TODO: form de contacto B2B — nombre, empresa, tipo de proyecto, cocheras, mensaje */}
      </motion.div>
    </section>
  );
}
