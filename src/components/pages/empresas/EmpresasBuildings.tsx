"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ClipboardList, HardHat, PencilRuler, PlugZap, Users } from "lucide-react";

import { CardCarousel } from "@/components/shared/carousel/CardCarousel";
import { CarouselCard } from "@/components/shared/carousel/CarouselCard";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";

// La grilla numera los pasos; el carousel mobile lleva icono, como las demas
// tarjetas de carousel del sitio.
const STEPS = [
  { key: "survey", mobileIcon: ClipboardList },
  { key: "project", mobileIcon: PencilRuler },
  { key: "works", mobileIcon: HardHat },
  { key: "commissioning", mobileIcon: PlugZap },
] as const;

/** La obra de un edificio entero: que se hace, los cuatro pasos y la nota
 * para administraciones. */
export function EmpresasBuildings() {
  const t = useTranslations("EmpresasPage.Buildings");

  return (
    <section className="relative overflow-hidden border-t border-neutral-900 bg-neutral-950">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(34,197,94,0.12), transparent 55%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-16 pb-20 sm:px-8 sm:py-24 lg:py-32">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={waterfallList}
          className="max-w-3xl"
        >
          <motion.p
            variants={waterfallItem}
            className="section-eyebrow text-green-400"
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h2
            variants={waterfallItem}
            className="mt-5 max-w-[22ch] section-title"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            variants={waterfallItem}
            className="mt-6 max-w-[68ch] section-subtitle"
          >
            {t("description")}
          </motion.p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 text-xs uppercase tracking-[0.25em] text-neutral-500 sm:mt-20"
        >
          {t("itemsTitle")}
        </motion.p>

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={waterfallList}
          className="mt-8 hidden gap-px overflow-hidden rounded-3xl border border-white/5 bg-white/5 sm:grid sm:grid-cols-2 lg:grid-cols-4"
        >
          {STEPS.map(({ key }, index) => (
            <motion.li
              key={key}
              variants={waterfallItem}
              className="flex flex-col bg-neutral-950 p-8"
            >
              <span className="text-5xl font-extralight tabular-nums text-green-400/30">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-6 text-lg font-medium normal-case tracking-tight text-white">
                {t(`items.${key}.title`)}
              </h3>

              <p className="mt-2.5 text-sm leading-relaxed text-neutral-400">
                {t(`items.${key}.description`)}
              </p>
            </motion.li>
          ))}
        </motion.ol>

        {/* `-mx-6`: el carousel necesita el ancho del viewport para que asome
            la tarjeta siguiente. */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          className="-mx-6 mt-8 sm:hidden"
        >
          <CardCarousel
            items={STEPS.map(({ key, mobileIcon }) => (
              <CarouselCard
                key={key}
                card={{
                  key,
                  icon: mobileIcon,
                  title: t(`items.${key}.title`),
                  description: t(`items.${key}.description`),
                }}
              />
            ))}
          />
        </motion.div>

        {/* En mobile, a sangre: la caja con margen se comia el ancho. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          className="-mx-6 mt-14 flex flex-col gap-5 border-y border-green-400/20 bg-green-400/[0.04] px-6 py-8 sm:mx-0 sm:mt-8 sm:flex-row sm:items-center sm:gap-8 sm:rounded-3xl sm:border sm:p-8"
        >
          <div className="shrink-0 self-start rounded-2xl bg-green-400/10 p-3.5 sm:self-center">
            <Users className="size-6 text-green-400" strokeWidth={1.6} />
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-medium normal-case tracking-tight text-white">
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
