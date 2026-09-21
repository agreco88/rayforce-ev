"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useTrack } from "@/lib/analytics/use-track";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { waterfallList, waterfallItem } from "@/lib/animation-variants";

type FaqItem = { title: string; answer: string };

/**
 * FAQ general de la empresa: quiénes somos, autorizaciones, instalación,
 * garantía, cobertura, pagos y soporte.
 *
 * Antes eran ~20 preguntas de producto repartidas en 6 categorías, con pills
 * que swapeaban el acordeón entero. Ahora es una sola lista plana: las
 * preguntas de producto van a ir en un FAQ por ruta (/cargadores, /cables) y
 * en una ruta /faq propia, que quedan para más adelante.
 */
export default function HomeFaq({ id }: { id?: string }) {
  const t = useTranslations("HomePage.FaqSection");

  const items = t.raw("items") as FaqItem[];

  const [openItems, setOpenItems] = useState<string[]>([]);
  const track = useTrack();

  const handleAccordionChange = (values: string[]) => {
    const added = values.filter((v) => !openItems.includes(v));
    added.forEach((value) => {
      const index = Number(value.replace("faq-", ""));
      const item = items[index];
      if (item) track.faqItemExpanded("general", item.title, index);
    });
    setOpenItems(values);
  };

  return (
    <section
      id={id}
      className="px-4 relative bg-neutral-900 border-t border-t-neutral-800 py-24 sm:py-32"
    >
      <div
        className="absolute inset-0 z-50 pointer-events-none opacity-30 top-0"
        style={{
          backgroundImage: `
                  linear-gradient(to right, rgba(64,64,64,0.3) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(64,64,64,0.3) 1px, transparent 1px)
                `,
          backgroundSize: "60px 60px",
          maskImage: `
                radial-gradient(ellipse 80% 80% at 100% 0%, #000 20%, transparent 80%)
              `,
        }}
      />

      <div className="mx-auto max-w-5xl">
        {/* Title */}
        <h3 className="text-center">{t("eyebrow")}</h3>
        <h2 className="mt-2 mb-12! text-4xl sm:text-6xl text-center normal-case">
          {t("title")}
        </h2>

        <div className="my-12 h-[1px] w-full bg-gradient-to-r from-transparent via-green-500/25 to-transparent" />

        <motion.div
          variants={waterfallList}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={handleAccordionChange}
            className="w-full rounded-lg border border-neutral-800 px-6 sm:px-8"
          >
            {items.map((item, i) => (
              <motion.div
                key={item.title}
                variants={waterfallItem}
                className="border-b last:border-0 border-neutral-800 py-3"
              >
                <AccordionItem value={`faq-${i}`} className="border-none">
                  <AccordionTrigger
                    className="
                      text-left text-base sm:text-lg font-bold sm:font-medium
                        hover:no-underline
                        text-green-900
                        [&>svg]:text-green-900
                        [&[data-state=open]>svg]:text-green-400
                        cursor-pointer
                        flex items-center
                        tracking-tight
                      "
                  >
                    <span className="text-neutral-50">{item.title}</span>
                  </AccordionTrigger>

                  <AccordionContent className="text-sm sm:text-base text-balance text-neutral-400">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
