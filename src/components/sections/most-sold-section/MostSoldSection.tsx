"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/layout/section-wrapper";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import Container from "@/components/layout/container";
import BlackoutProductCard from "./BlackoutProductCard";
import AwningMostSoldProductCard from "./AwningMostSoldProductCard";

import type { ReactNode } from "react";

type MostSoldProduct = {
  id: string;
  render: () => ReactNode;
};

const products: MostSoldProduct[] = [
  {
    id: "exterior-awning",
    render: () => (
      <AwningMostSoldProductCard
        image="/images/awning-card-2.webp"
        href="/productos/toldos"
        i18nKey="exteriorAwnings"
      />
    ),
  },
  {
    id: "blackout-curtain",
    render: () => (
      <BlackoutProductCard
        href="/productos/cortinas-blackout"
        i18nKey="blackoutCurtains"
      />
    ),
  },
  {
    id: "venetian-curtains",
    render: () => (
      <AwningMostSoldProductCard
        image="/images/curtains-card.webp"
        href="/productos/persianas-roller"
        i18nKey="venetianCurtains"
      />
    ),
  },
];

export default function MostSoldSection() {
  const t = useTranslations("MostSoldSection");

  return (
    <SectionWrapper id="most-sold" className="">
      <Container>
        <div className="text-white  border-white/10 pb-32">
          <motion.div
            variants={waterfallItem}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-16"
          >
            {/* Header */}
            <motion.div variants={waterfallList} className="max-w-2xl">
              <p className="mb-3 text-xs tracking-widest uppercase text-neutral-400">
                {t("eyebrow")}
              </p>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-balance text-white">
                {t("title")}
              </h2>
              {/* <p className="mt-4 text-muted-foreground text-base sm:text-lg">
                {t("description")}
              </p> */}
            </motion.div>

            {/* Products */}
            <motion.div
              variants={waterfallList}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {products.map((product) => (
                <motion.div key={product.id} variants={waterfallItem}>
                  {product.render()}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
