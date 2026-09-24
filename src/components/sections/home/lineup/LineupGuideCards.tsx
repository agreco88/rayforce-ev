"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Zap, Plug, Clock, type LucideIcon } from "lucide-react";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";

const GUIDE_ICONS: LucideIcon[] = [Zap, Plug, Clock];

/**
 * Los 3 consejos para elegir modelo, en fila de tarjetas: lo usan el lineup
 * del home (desktop) y /cargadores. La eleccion real es una secuencia — te la
 * define la instalacion que ya tenes (monofasica o trifasica), recien despues
 * elegis cable o toma, y al final potencia; por eso van numerados.
 */
export function LineupGuideCards() {
  const t = useTranslations("HomePage.Lineup");
  const items = t.raw("guide.items") as {
    title: string;
    description: string;
  }[];

  return (
    <motion.ul
      variants={waterfallList}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="grid list-none grid-cols-1 items-stretch gap-6 lg:grid-cols-3"
    >
      {items.map((item, index) => {
        const Icon = GUIDE_ICONS[index];
        return (
          <motion.li
            key={item.title}
            variants={waterfallItem}
            className="flex h-full flex-col rounded-2xl border border-neutral-900 bg-neutral-950/60 p-6 backdrop-blur-sm"
          >
            <Icon
              className="size-10 text-green-400"
              strokeWidth={1}
              aria-hidden="true"
            />

            <p className="mt-5 text-2xl font-light text-white">
              {index + 1}. {item.title}
            </p>

            <div className="mt-4 h-px w-full bg-green-400/10" />

            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              {item.description}
            </p>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
