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
      {/* Centrado desde `sm`, como el CTA: son el mismo bloque de cierre. En
          mobile, a la izquierda como el resto de las secciones. */}
      <motion.div
        variants={waterfallItem}
        className="mx-auto max-w-3xl sm:text-center"
      >
        <p className={`section-eyebrow ${accentText}`}>
          {t("eyebrow")}
        </p>

        <h2 className="section-title mt-4">
          {t("title")}
        </h2>

        <p className="mx-auto mt-6 max-w-2xl section-subtitle">
          {t("description")}
        </p>
      </motion.div>

      <motion.div
        variants={waterfallItem}
        className="-mx-6 mt-12 sm:mx-0 lg:mt-14"
      >
        <FaqAccordion items={items} />
      </motion.div>
    </motion.div>
  );
}
