"use client";
import { waterfallItem } from "@/lib/animation-variants";
import { BENEFITS, STATS } from "./benefits.data";
import { StatCard } from "./StatCard";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HomeBenefitCard } from "../home/benefits/HomeBenefitCard";

export function BenefitsSection() {
  const t = useTranslations("HomePage.HeroIntro");

  return (
    <section className="relative w-full container flex flex-col items-center justify-center max-w-[1440px] mx-auto pb-24 px-6 sm:px-0">
      {/* Divider */}

      {/* Header */}

      <div className="max-w-2xl mb-12 sm:mb-24 text-center">
        <h3>Beneficios</h3>
        <h2 className="mt-2 text-4xl sm:text-6xl">
          Más ahorro, más eficiencia, más futuro.
        </h2>
        <p>
          La movilidad eléctrica ya es una realidad en Uruguay. Reducí costos,
          aprovechá tarifas inteligentes y sumate a una matriz energética
          limpia.
        </p>
      </div>

      {/* Grid */}
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BENEFITS.map((benefit) => (
          <HomeBenefitCard
            key={benefit.key}
            icon={benefit.icon}
            title={t(`features.${benefit.key}.title`)}
            description={t(`features.${benefit.key}.description`)}
          />
        ))}
      </div>
      {/* CTA */}
      <motion.div
        variants={waterfallItem}
        className="
              flex gap-4
              mt-12

            "
      >
        <Button
          asChild
          className="
                px-4 sm:px-8 py-6
                bg-green-500
                hover:bg-green-400
                text-black
              "
        >
          <Link href="/cargadores">{t("ctaPrimary")}</Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="
                px-4 sm:px-8 py-6
                border-neutral-700
                bg-black/20
                backdrop-blur-sm
                hover:bg-white/5
              "
        >
          <Link href="/beneficios">{t("ctaTertiary")}</Link>
        </Button>
      </motion.div>
    </section>
  );
}
