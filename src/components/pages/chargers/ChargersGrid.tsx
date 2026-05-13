"use client";

import { motion } from "framer-motion";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { CHARGER_FAMILIES } from "@/lib/chargers/chargers.data";
import ChargerModelCard from "./ChargerCard";

function getAllVariants() {
  return CHARGER_FAMILIES.flatMap((family) =>
    family.variants.map((variant) => ({
      id: variant.key,
      label: variant.publicName,
      description: variant.subheadline ?? variant.description,
      href: `/cargadores/${variant.slug}`,
    })),
  );
}

export default function ChargersGrid() {
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
          lg:grid-cols-3
          px-4 sm:px-0
          gap-8 lg:gap-8

        "
      >
        {models.map((model) => (
          <motion.li key={model.id} variants={waterfallItem}>
            <ChargerModelCard
              href={model.href}
              label={model.label}
              description={model.description}
            />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
