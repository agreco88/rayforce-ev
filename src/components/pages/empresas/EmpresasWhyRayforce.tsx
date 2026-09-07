"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Award, Building2, HardHat, ShieldCheck, Wrench } from "lucide-react";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";

const ITEMS = [
  { key: "ownInstall", Icon: Wrench },
  { key: "engineering", Icon: Building2 },
  { key: "team", Icon: HardHat },
  { key: "ursea", Icon: ShieldCheck },
  { key: "warranty", Icon: Award },
] as const;

export function EmpresasWhyRayforce() {
  const t = useTranslations("EmpresasPage.Why");

  return (
    <section className="border-t border-neutral-900 bg-neutral-950">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-32">
        {/* Copy + logos */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={waterfallList}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <motion.span
            variants={waterfallItem}
            className="text-xs uppercase tracking-[0.35em] text-green-400"
          >
            {t("eyebrow")}
          </motion.span>

          <motion.h2
            variants={waterfallItem}
            className="mt-5 text-4xl font-light tracking-tight text-white sm:text-5xl"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            variants={waterfallItem}
            className="mt-6 max-w-[46ch] leading-relaxed text-neutral-400"
          >
            {t("description")}
          </motion.p>

          <motion.div variants={waterfallItem} className="mt-10 flex gap-4">
            <div className="relative h-20 w-28 rounded-xl bg-white">
              <Image
                src="/images/partners/logo-ursea.webp"
                alt="URSEA"
                fill
                className="object-contain p-3"
              />
            </div>
            <div className="relative h-20 w-28 rounded-xl bg-white">
              <Image
                src="/images/partners/logo-ute.webp"
                alt="UTE"
                fill
                className="object-contain p-3"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Differentiators */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={waterfallList}
          className="flex flex-col"
        >
          {ITEMS.map(({ key, Icon }) => (
            <motion.li
              key={key}
              variants={waterfallItem}
              className="flex gap-5 border-b border-neutral-900 py-6 first:pt-0 last:border-b-0"
            >
              <div className="mt-0.5 shrink-0 rounded-xl bg-green-400/10 p-2.5">
                <Icon className="size-5 text-green-400" strokeWidth={1.6} />
              </div>

              <div className="min-w-0">
                <h3 className="text-lg font-medium tracking-tight text-white">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
                  {t(`items.${key}.description`)}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
