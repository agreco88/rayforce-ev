"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { CHARGER_FAMILIES } from "@/lib/chargers/chargers.data";
import ChargerModelCard, { type CardTheme } from "./ChargerCard";

function getAllVariants() {
  return CHARGER_FAMILIES.flatMap((family) =>
    family.variants.map((variant) => ({
      id: variant.key,
      slug: variant.slug,
      image: variant.images[0],
      href: `/cargadores/${variant.slug}`,
    })),
  );
}

const VARIANT_THEMES: Record<string, CardTheme> = {
  "bs20-bc-7kw": "blue",
  "bs20-bc-22kw": "green",
};

export default function ChargersGrid() {
  const t = useTranslations("ChargersPage.ChargerCard");
  const variantsT = t.raw("variants") as Record<
    string,
    { label: string; description: string }
  >;
  const models = getAllVariants();

  return (
    <div className="w-full">
      <motion.ul
        variants={waterfallList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="
          list-none
          grid
          grid-cols-1
          sm:grid-cols-2
          px-4 sm:px-0
          gap-8 lg:gap-8
        "
      >
        {models.map((model) => (
          <motion.li key={model.id} variants={waterfallItem}>
            <ChargerModelCard
              href={model.href}
              image={model.image}
              label={variantsT[model.slug]?.label ?? model.slug}
              description={variantsT[model.slug]?.description ?? ""}
              theme={VARIANT_THEMES[model.slug] ?? "green"}
            />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
