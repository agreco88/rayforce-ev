"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import {
  FaqAccordion,
  type FaqItem,
} from "@/components/sections/home/faq/FaqAccordion";

type Props = {
  /** Namespace con `eyebrow`, `title`, `description` e `items`. */
  namespace: string;
};

/**
 * Las preguntas de la ruta que lo monta. El namespace entra por prop porque
 * cada pagina tiene las suyas — antes esto eran dos componentes identicos
 * (`HomeFaqContent` y `ChargersFaqContent`) que solo diferian en esa string.
 *
 * La salida a WhatsApp no va aca: es el CTA que sigue abajo.
 */
export function FooterFaq({ namespace }: Props) {
  const t = useTranslations(namespace);
  const items = t.raw("items") as FaqItem[];

  return (
    <motion.div
      variants={waterfallList}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      // Sin padding abajo: el CTA que sigue ya trae el suyo, y sumados dejaban
      // casi 300px de aire entre los dos.
      className="mx-auto w-full max-w-3xl pt-24 lg:pt-36"
    >
      {/* Encabezado centrado como el del CTA: ahora son el mismo bloque de
          cierre y alineados distinto se leian como dos secciones sueltas. */}
      <motion.div variants={waterfallItem} className="text-center">
        <span className="text-[10px] tracking-[0.3em] uppercase text-green-400 sm:text-xs sm:tracking-[0.25em]">
          {t("eyebrow")}
        </span>

        <h2 className="mt-4 text-3xl leading-[1.1] font-light tracking-tight text-white sm:mt-5 sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-neutral-400 sm:mt-6">
          {t("description")}
        </p>
      </motion.div>

      <motion.div variants={waterfallItem} className="mt-10 lg:mt-14">
        <FaqAccordion items={items} />
      </motion.div>
    </motion.div>
  );
}
