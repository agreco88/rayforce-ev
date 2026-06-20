"use client";

import Image from "next/image";

import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/navigation";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";

import { motion } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const CHARGERS = [
  {
    title: "RESIDENCIAL",
    power: "7.4kW",
    image: "/assets/images/banners/charger-residential.png",
    slug: "bs20-bc-7kw",

    accent: "text-sky-400",
    glow: "from-sky-500/20",
    bullet: "bg-sky-400",

    bullets: [
      "Carga nocturna eficiente",
      "Ideal para 1 vehículo",
      "Máximo ahorro energético",
    ],
  },

  {
    title: "COMERCIAL",
    power: "22.0kW",
    image: "/assets/images/banners/charger-industrial.png",
    slug: "bs20-bc-22kw",

    accent: "text-orange-400",
    glow: "from-orange-500/20",
    bullet: "bg-orange-400",

    bullets: [
      "Uso intensivo continuo",
      "Pensado para flotas y transporte",
      "Máxima potencia disponible",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                   SECTION                                  */
/* -------------------------------------------------------------------------- */

export function ChargerBanners({ id }: { id?: string }) {
  return (
    <section id={id} className="bg-black px-4 py-20 sm:hidden">
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
          Cargadores Wallbox Besen BS20
        </motion.span>

        {/* Title */}
        <motion.h2 variants={waterfallItem} className="mt-4 text-4xl">
          Soluciones inteligentes de carga
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={waterfallItem}
          className="
            mt-2

            text-sm max-w-xs
            leading-relaxed

            text-neutral-400
          "
        >
          Descubrí nuestra línea de cargadores Wallbox de 7kW y 22kW.
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
        className="flex flex-col gap-4"
      >
        {CHARGERS.map((charger) => (
          <motion.div key={charger.slug} variants={waterfallItem}>
            <Link
              href={`/cargadores/${charger.slug}`}
              className="
                group
                relative
                overflow-hidden

                flex flex-col

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
                  top-1/3

                  -translate-y-1/3

                  opacity-20

                  transition-all duration-500

                  group-hover:scale-105
                  group-hover:opacity-30
                "
              >
                <Image
                  src={charger.image}
                  alt={charger.title}
                  width={250}
                  height={250}
                  className="
                    h-auto

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
                {/* Top Row */}
                <div className="flex items-center justify-between">
                  {/* Left */}
                  <div className="flex flex-col">
                    <span
                      className={`
                        text-[10px]
                        uppercase
                        tracking-[0.3em]

                        ${charger.accent}
                      `}
                    >
                      {charger.title}
                    </span>

                    <h3
                      className="
                        text-4xl
                        font-semibold
                        tracking-tight
                        text-neutral-100 pt-1
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
                    flex flex-col gap-2
                    text-sm
                    text-neutral-400
                  "
                >
                  {charger.bullets.map((bullet) => (
                    <li
                      key={bullet}
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

                      {bullet}
                    </li>
                  ))}
                </ul>{" "}
                {/* CTA */}
                <div
                  className={`
                      flex items-center gap-2
 mt-8 pt-4 border-t border-t-neutral-800 justify-center
                      text-sm
                      font-medium

                      transition-all duration-300

                      ${charger.accent}

                      group-hover:gap-4
                    `}
                >
                  Ver más informacion
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
