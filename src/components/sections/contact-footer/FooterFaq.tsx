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
  /** Color del eyebrow. Sin esto va el verde de marca. */
  accentText?: string;
};

/**
 * Las preguntas de la ruta que lo monta. El namespace entra por prop porque
 * cada pagina tiene las suyas — antes esto eran dos componentes identicos
 * (`HomeFaqContent` y `ChargersFaqContent`) que solo diferian en esa string.
 *
 * La salida a WhatsApp no va aca: es el CTA que sigue abajo.
 */
export function FooterFaq({
  namespace,
  accentText = "text-green-400",
}: Props) {
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
      <motion.div
        variants={waterfallItem}
        className="mx-auto max-w-3xl text-center"
      >
        <p className={`text-sm uppercase tracking-[0.35em] ${accentText}`}>
          {t("eyebrow")}
        </p>

        <h2 className="mt-4 text-4xl font-medium text-white sm:text-5xl">
          {t("title")}
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-400">
          {t("description")}
        </p>
      </motion.div>

      <motion.div variants={waterfallItem} className="mt-10 lg:mt-14">
        <FaqAccordion items={items} />
      </motion.div>
    </motion.div>
  );
}
