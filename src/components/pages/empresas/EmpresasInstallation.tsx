"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";

const ITEMS = ["survey", "line", "mounting", "certification", "app"] as const;

export function EmpresasInstallation() {
  const t = useTranslations("EmpresasPage.Installation");

  return (
    <section className="relative overflow-hidden border-t border-neutral-900 bg-neutral-950">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(64,64,64,0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(64,64,64,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 0%, #000 20%, transparent 80%)",
        }}
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={waterfallList}
        className="relative z-10 mx-auto w-full max-w-4xl px-6 py-24 text-center sm:px-8 lg:py-32"
      >
        <motion.span
          variants={waterfallItem}
          className="text-xs uppercase tracking-[0.35em] text-green-400"
        >
          {t("eyebrow")}
        </motion.span>

        <motion.h2
          variants={waterfallItem}
          className="mx-auto mt-5 max-w-[20ch] text-4xl font-light tracking-tight text-balance text-white sm:text-5xl"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          variants={waterfallItem}
          className="mx-auto mt-6 max-w-[68ch] leading-relaxed text-pretty text-neutral-400"
        >
          {t("description")}
        </motion.p>

        <motion.p
          variants={waterfallItem}
          className="mt-16 text-xs uppercase tracking-[0.25em] text-neutral-500"
        >
          {t("scopeTitle")}
        </motion.p>

        <motion.ul
          variants={waterfallList}
          className="mt-8 grid gap-3 text-left sm:grid-cols-2"
        >
          {ITEMS.map((key) => (
            <motion.li
              key={key}
              variants={waterfallItem}
              className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-5 last:sm:col-span-2"
            >
              <Check
                className="mt-0.5 size-4 shrink-0 text-green-400"
                strokeWidth={2.5}
              />
              <span className="text-sm leading-relaxed text-neutral-300">
                {t(`items.${key}`)}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
