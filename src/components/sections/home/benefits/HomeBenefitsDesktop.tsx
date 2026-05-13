"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { waterfallItem } from "@/lib/animation-variants";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

import { BENEFITS } from "../../BenefitsSection/benefits.data";
import { HomeBenefitCard } from "./HomeBenefitCard";
import { Fragment } from "react";

export function HomeBenefitsDesktop() {
  const t = useTranslations("HomePage.HomeBenefitsSection");

  return (
    <section
      className="
        relative

        mx-auto
        flex w-full
        max-w-[1440px]
        flex-col
        items-center
        justify-center

        px-6
        pb-24

        sm:px-0
      "
    >
      {/* -------------------------------------------------------------- */}
      {/* Header                                                         */}
      {/* -------------------------------------------------------------- */}

      <div
        className="
          mb-12
          max-w-2xl
          text-center

          sm:mb-24
        "
      >
        <h3>{t("eyebrow")}</h3>

        <h2
          className="
            mt-2

            text-4xl

            sm:text-6xl
          "
        >
          {t("title")}
        </h2>

        <p>{t("description")}</p>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* Benefits Grid                                                  */}
      {/* -------------------------------------------------------------- */}

      <div
        className="
          grid gap-6

          md:grid-cols-2
          lg:grid-cols-3
        "
      >
        {BENEFITS.map((benefit, index) => (
          <Fragment key={index}>
            <HomeBenefitCard
              {...benefit}
              title={t(`items.${benefit.key}.title`)}
              description={t(`items.${benefit.key}.description`)}
            />
          </Fragment>
        ))}
      </div>

      {/* -------------------------------------------------------------- */}
      {/* CTA                                                            */}
      {/* -------------------------------------------------------------- */}

      <motion.div
        variants={waterfallItem}
        className="
          mt-12
          flex gap-4
        "
      >
        <Button
          asChild
          className="
            bg-green-500
            px-8 py-6
            text-black

            hover:bg-green-400
          "
        >
          <Link href="/cargadores">{t("cta.primary")}</Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="
            border-neutral-700
            bg-black/20

            px-8 py-6

            backdrop-blur-sm

            hover:bg-white/5
          "
        >
          <Link href="/#compatibilidad">{t("cta.secondary")}</Link>
        </Button>
      </motion.div>
    </section>
  );
}
