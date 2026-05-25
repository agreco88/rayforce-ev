"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { useTrack } from "@/lib/analytics";

const WHATSAPP_NUMBER = "59892041709";

export function InstallationSection({ id }: { id?: string }) {
  const t = useTranslations("HomePage.InstallationSection");
  const track = useTrack();

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    t("cta.whatsappMessage"),
  )}`;

  return (
    <section id={id} className="relative bg-neutral-950 border-y border-neutral-900 py-24 sm:py-32 px-4 overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(64,64,64,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(64,64,64,0.4) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 100%)",
        }}
      />

      <motion.div
        variants={waterfallList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative max-w-4xl mx-auto text-center flex flex-col items-center gap-6"
      >
        {/* Eyebrow */}
        <motion.span
          variants={waterfallItem}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/25 bg-green-500/5 text-green-400 text-xs tracking-widest uppercase"
        >
          {t("eyebrow")}
        </motion.span>

        {/* Title */}
        <motion.h2
          variants={waterfallItem}
          className="text-4xl m-0 sm:text-5xl lg:text-6xl font-medium leading-tight tracking-tight normal-case"
        >
          {t("title")}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={waterfallItem}
          className="text-neutral-400 text-base sm:text-lg"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTA */}
        <motion.a
          variants={waterfallItem}
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track.whatsappClick({ source: "installation_section" })
          }
          className="mt-2 flex items-center gap-3 h-14 rounded-2xl px-8 bg-green-700 hover:bg-green-600 text-white font-medium transition-all duration-200"
        >
          <FaWhatsapp className="size-5 shrink-0" />
          {t("cta.label")}
        </motion.a>
      </motion.div>
    </section>
  );
}
