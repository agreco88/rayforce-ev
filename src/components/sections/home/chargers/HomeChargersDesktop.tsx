"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { ChargerEV } from "@/components/animated/charger-ev/ChargerEv";
import { Link } from "@/i18n/navigation";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const CHARGERS = [
  {
    key: "residential",
    slug: "bs20-bc-7kw",

    power: "7.4kW",

    accent: "text-sky-400",

    charger: {
      powerKw: 7.4,
      variant: "residential",
      mode: "single",
    },
  },

  // {
  //   key: "mid",
  //   slug: "bs20-bc-11kw",

  //   power: "11.0kW",

  //   accent: "text-green-400",

  //   charger: {
  //     powerKw: 11,
  //     variant: "pro",
  //     mode: "multi",
  //     phases: 2,
  //   },
  // },

  {
    key: "pro",
    slug: "bs20-bc-22kw",

    power: "22.0kW",

    accent: "text-green-400",

    charger: {
      powerKw: 22,
      variant: "residential",
      mode: "multi",
      phases: 3,
    },
  },
] as const;

/* -------------------------------------------------------------------------- */
/*                                Subcomponents                               */
/* -------------------------------------------------------------------------- */

function Highlights({ items, accent }: { items: string[]; accent: string }) {
  return (
    <ul
      className="
        flex flex-col gap-1

        text-base
        text-center
        text-neutral-400
      "
    >
      {items.map((item) => (
        <li
          key={item}
          className="
            flex items-center justify-center gap-2
          "
        >
          <span
            className={`
              h-1.5 w-1.5
              rounded-full

              ${accent.replace("text-", "bg-")}
            `}
          />

          {item}
        </li>
      ))}
    </ul>
  );
}

function CTA({
  slug,
  label,
  context,
  accent,
}: {
  slug: string;
  label: string;
  context: string;
  accent: string;
}) {
  return (
    <Link
      href={`/cargadores/${slug}`}
      className={`
        mt-4

        px-4 py-2

        text-lg
        underline
        underline-offset-4

        transition-colors duration-300

        hover:${accent}

      `}
    >
      {label}
      <span className="sr-only"> — {context}</span>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   SECTION                                  */
/* -------------------------------------------------------------------------- */

export default function HomeChargersDesktop({ id }: { id?: string }) {
  const t = useTranslations("HomePage.HomeChargersSection");

  return (
    <section
      id={id}
      className="
        relative

        mx-auto
        mt-28

        flex w-full max-w-[1440px]
        flex-col

        bg-neutral-950
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
          flex flex-col
          items-center
          justify-center

          text-center
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

            sm:text-sm
          "
        >
          {t("eyebrow")}
        </motion.span>

        {/* Title */}
        <motion.h2
          variants={waterfallItem}
          className="
            mt-4 mb-2

            sm:mt-3
          "
        >
          {t("title")}
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={waterfallItem}
          className="
            my-6

            text-base text-neutral-400

            sm:my-4
            sm:text-md

            lg:w-2xl
          "
        >
          {t("description")}
        </motion.p>
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* Grid                                                               */}
      {/* ------------------------------------------------------------------ */}

      <motion.div
        variants={waterfallList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="
          mx-auto
          mt-4
          max-w-7xl

          px-4

          sm:mt-12
          sm:px-0
        "
      >
        <div
          className="
            flex flex-col
            items-center
            justify-center
            gap-12

            sm:flex-row
          "
        >
          {CHARGERS.map((charger) => {
            const highlights = t.raw(
              `chargers.${charger.key}.highlights`,
            ) as string[];

            return (
              <motion.div
                key={charger.slug}
                variants={waterfallItem}
                className="
                  flex flex-col
                  items-center
                  gap-1
                "
              >
                {/* Charger */}
                <ChargerEV {...charger.charger} />

                {/* Content */}
                <div
                  className="
                    my-4

                    flex flex-col
                    items-center
                    gap-2
                  "
                >
                  <h3
                    className={`
                      text-lg
                      ${charger.accent}
                    `}
                  >
                    {t(`chargers.${charger.key}.title`)}
                  </h3>

                  <h4
                    className={`
                      tracking-tight

                      ${
                        charger.key === "residential"
                          ? "text-5xl"
                          : "text-4xl font-thin"
                      }
                    `}
                  >
                    {charger.power}
                  </h4>
                </div>

                {/* Highlights */}
                <Highlights items={highlights} accent={charger.accent} />

                {/* CTA */}
                <CTA
                  slug={charger.slug}
                  label={t("cta.moreInfo")}
                  context={`${t(`chargers.${charger.key}.title`)} ${charger.power}`}
                  accent={charger.accent}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
