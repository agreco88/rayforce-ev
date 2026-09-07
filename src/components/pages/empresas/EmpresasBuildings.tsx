"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Users } from "lucide-react";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";

const STEPS = ["survey", "project", "works", "commissioning"] as const;

export function EmpresasBuildings({ id }: { id?: string }) {
  const t = useTranslations("EmpresasPage.Buildings");

  return (
    <section
      id={id}
      className="relative overflow-hidden border-t border-neutral-900 bg-neutral-950"
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(34,197,94,0.12), transparent 55%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 sm:px-8 lg:py-32">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={waterfallList}
          className="max-w-3xl"
        >
          <motion.span
            variants={waterfallItem}
            className="text-xs uppercase tracking-[0.35em] text-green-400"
          >
            {t("eyebrow")}
          </motion.span>

          <motion.h2
            variants={waterfallItem}
            className="mt-5 max-w-[18ch] text-4xl font-light tracking-tight text-balance text-white sm:text-5xl"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            variants={waterfallItem}
            className="mt-6 max-w-[68ch] leading-relaxed text-pretty text-neutral-400"
          >
            {t("description")}
          </motion.p>
        </motion.div>

        {/* Methodology */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-xs uppercase tracking-[0.25em] text-neutral-500"
        >
          {t("methodologyTitle")}
        </motion.p>

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={waterfallList}
          className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-white/5 bg-white/5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map((key, index) => (
            <motion.li
              key={key}
              variants={waterfallItem}
              className="flex flex-col bg-neutral-950 p-8"
            >
              <span className="text-5xl font-extralight tabular-nums text-green-400/30">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-6 text-lg font-medium tracking-tight text-white">
                {t(`steps.${key}.title`)}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-neutral-400">
                {t(`steps.${key}.description`)}
              </p>
            </motion.li>
          ))}
        </motion.ol>

        {/* Note for property managers */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mt-8 flex flex-col gap-5 rounded-3xl border border-green-400/20 bg-green-400/[0.04] p-8 sm:flex-row sm:items-center sm:gap-8"
        >
          <div className="shrink-0 rounded-2xl bg-green-400/10 p-3.5 self-start sm:self-center">
            <Users className="size-6 text-green-400" strokeWidth={1.6} />
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-medium tracking-tight text-white">
              {t("note.title")}
            </h3>
            <p className="mt-2 max-w-[70ch] text-sm leading-relaxed text-neutral-300">
              {t("note.description")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
