"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Smartphone, PencilRuler, Columns3 } from "lucide-react";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";

const ITEMS = [
  { key: "power", Icon: Smartphone },
  { key: "project", Icon: PencilRuler },
  { key: "column", Icon: Columns3 },
] as const;

export function EmpresasBusiness() {
  const t = useTranslations("EmpresasPage.Business");

  return (
    <section className="border-t border-neutral-900 bg-neutral-950">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-24 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-32">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative order-2 lg:order-1"
        >
          <div
            className="absolute inset-0 rounded-full blur-3xl"
            aria-hidden="true"
            style={{ background: "rgba(34,197,94,0.12)" }}
          />
          <Image
            src="/images/stand/stand-9.png"
            alt={t("items.column.title")}
            width={520}
            height={640}
            className="relative mx-auto h-auto w-full max-w-sm object-contain"
          />
        </motion.div>

        {/* Copy */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={waterfallList}
          className="order-1 lg:order-2"
        >
          <motion.span
            variants={waterfallItem}
            className="text-xs uppercase tracking-[0.35em] text-green-400"
          >
            {t("eyebrow")}
          </motion.span>

          <motion.h2
            variants={waterfallItem}
            className="mt-5 max-w-[20ch] text-4xl font-light tracking-tight text-balance text-white sm:text-5xl"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            variants={waterfallItem}
            className="mt-6 max-w-[56ch] leading-relaxed text-neutral-400"
          >
            {t("description")}
          </motion.p>

          <motion.ul variants={waterfallList} className="mt-10 flex flex-col gap-5">
            {ITEMS.map(({ key, Icon }) => (
              <motion.li key={key} variants={waterfallItem} className="flex gap-4">
                <div className="mt-0.5 shrink-0 rounded-xl bg-white/5 p-2.5">
                  <Icon className="size-5 text-green-400" strokeWidth={1.6} />
                </div>

                <div className="min-w-0">
                  <h3 className="font-medium tracking-tight text-white">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-400">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
