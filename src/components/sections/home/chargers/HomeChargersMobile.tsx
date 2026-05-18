"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const CHARGERS = [
  {
    key: "residential",
    power: "7.4kW",
    image: "/assets/images/chargers/bs20-bc-7kw-card.avif",
    slug: "bs20-bc-7kw",

    accent: "text-sky-400",
    glow: "from-sky-500/20",
    bullet: "bg-sky-400",
  },

  {
    key: "pro",
    power: "22.0kW",
    image: "/assets/images/chargers/bs20-bc-22kw-card.avif",
    slug: "bs20-bc-22kw",

    accent: "text-green-400",
    glow: "from-green-500/20",
    bullet: "bg-green-400",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                                   SECTION                                  */
/* -------------------------------------------------------------------------- */

export function HomeChargersMobile({ id }: { id?: string }) {
  const t = useTranslations("HomePage.HomeChargersSection");

  return (
    <section
      id={id}
      className="
        bg-neutral-950
        px-4
        py-20
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        variants={waterfallList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="
          mb-10

          flex flex-col
          items-start
          justify-start

          text-start
        "
      >
        {/* Eyebrow */}
        <motion.span
          variants={waterfallItem}
          className="
            text-xs
            uppercase
            tracking-widest

            text-green-400
          "
        >
          {t("eyebrow")}
        </motion.span>

        {/* Title */}
        <motion.h2
          variants={waterfallItem}
          className="
            mt-4
            text-4xl
          "
        >
          {t("title")}
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={waterfallItem}
          className="
            mt-2
            max-w-xs

            text-sm
            leading-relaxed

            text-neutral-400
          "
        >
          {t("description")}
        </motion.p>
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* Cards                                                              */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        variants={waterfallList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 gap-4 w-full"
      >
        {CHARGERS.map((charger) => {
          const highlights = t.raw(
            `chargers.${charger.key}.highlights`,
          ) as string[];

          return (
            <motion.div
              key={charger.slug}
              variants={waterfallItem}
              className="flex"
            >
              <Link
                href={`/cargadores/${charger.slug}`}
                className="
                  group
                  relative

                  flex flex-col w-full

                  overflow-hidden
                  rounded-xl

                  border border-white/10

                  bg-neutral-950
                "
              >
                {/* Glow */}
                <div
                  className={`
                    absolute inset-0

                    bg-gradient-to-br
                    ${charger.glow}
                    via-transparent
                    to-transparent

                    opacity-40
                  `}
                />

                {/* Background Image */}
                <div
                  className="
                    absolute

                    
                    right-[-20%]
                    top-1/2

                    -translate-y-1/2

                    opacity-50

                    transition-all duration-500

                    group-hover:scale-105
                    group-hover:opacity-30
                  "
                >
                  <Image
                    src={charger.image}
                    alt={t(`chargers.${charger.key}.title`)}
                    width={250}
                    height={250}
                    className="
                      h-auto
                      md:w-screen
                      scale-x-[-1]
                    "
                  />
                </div>

                {/* Content */}
                <div
                  className="
                    relative z-10

                    flex flex-col

                    px-6
                    py-6
                  "
                >
                  {/* Top */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span
                        className={`
                          text-base
                          uppercase
                          tracking-[0.3em]

                          ${charger.accent}
                        `}
                      >
                        {t(`chargers.${charger.key}.title`)}
                      </span>

                      <h3
                        className="
                          pt-1

                          text-5xl
                          font-semibold
                          tracking-tight

                          text-neutral-100
                        "
                      >
                        {charger.power}
                      </h3>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul
                    className="
                      mt-5

                      flex flex-col
                      gap-2

                      text-sm
                      text-neutral-400
                    "
                  >
                    {highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="
                          flex items-center gap-2
                        "
                      >
                        <span
                          className={`
                            size-1.5
                            rounded-full

                            ${charger.bullet}
                          `}
                        />

                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div
                    className={`
                      mt-8

                      flex items-center
                      justify-center
                      gap-2

                      border-t border-t-neutral-800
                      pt-4

                      text-sm
                      font-medium

                      transition-all duration-300

                      ${charger.accent}

                      group-hover:gap-4
                    `}
                  >
                    {t("cta.moreInfo")}

                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
