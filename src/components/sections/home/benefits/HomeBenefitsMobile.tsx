"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { waterfallItem } from "@/lib/animation-variants";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

import { BENEFITS } from "../../BenefitsSection/benefits.data";
import { HomeBenefitCard } from "./HomeBenefitCard";

export function HomeBenefitsMobile() {
  const t = useTranslations("HomePage.HomeBenefitsSection");

  return (
    <section
      className="
        relative

        mx-auto
        flex w-full
        flex-col
        items-center

        px-4
        pb-20
      "
    >
      {/* -------------------------------------------------------------- */}
      {/* Header                                                         */}
      {/* -------------------------------------------------------------- */}

      <div
        className="
          mb-12

          max-w-xl
          text-center
        "
      >
        <h3>{t("eyebrow")}</h3>

        <h2
          className="
            mt-2

            text-4xl
            leading-tight
          "
        >
          {t("title")}
        </h2>

        <p
          className="
            mt-4

            text-sm
            leading-relaxed
            text-neutral-400
          "
        >
          {t("description")}
        </p>
      </div>

      {/* -------------------------------------------------------------- */}
      {/* Benefits                                                       */}
      {/* -------------------------------------------------------------- */}

      <div
        className="
          flex w-full
          flex-col gap-4
        "
      >
        {BENEFITS.map((benefit) => (
          <HomeBenefitCard
            {...benefit}
            title={t(`items.${benefit.key}.title`)}
            description={t(`items.${benefit.key}.description`)}
          />
        ))}
      </div>

      {/* -------------------------------------------------------------- */}
      {/* CTA                                                            */}
      {/* -------------------------------------------------------------- */}

      <motion.div
        variants={waterfallItem}
        className="
          mt-10

          flex w-full
          flex-col gap-3
        "
      >
        <Button
          asChild
          className="
            h-12
            w-full

            bg-green-500
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
            h-12
            w-full

            border-neutral-800
            bg-black/20

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
