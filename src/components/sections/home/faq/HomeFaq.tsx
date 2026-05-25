"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTrack } from "@/lib/analytics/use-track";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { waterfallList } from "@/lib/animation-variants";

export default function HomeFaq({ id }: { id?: string }) {
  const t = useTranslations("HomePage.FaqSection");

  const categories = t.raw("categories") as Record<string, string>;
  const groups = t.raw("groups") as Record<
    string,
    { title: string; answer: string }[]
  >;

  const categoryKeys = Object.keys(groups);
  const [active, setActive] = useState(categoryKeys[0]);
  const [openItems, setOpenItems] = useState<string[]>([]);
  const track = useTrack();

  const handleCategoryChange = (key: string) => {
    setActive(key);
    setOpenItems([]);
    track.faqCategorySelected(key);
  };

  const handleAccordionChange = (values: string[]) => {
    const prev = openItems;
    const added = values.filter((v) => !prev.includes(v));
    added.forEach((value) => {
      const match = value.match(/^faq-[^-]+-(\d+)$/);
      if (!match) return;
      const index = parseInt(match[1], 10);
      const item = groups[active]?.[index];
      if (item) track.faqItemExpanded(active, item.title, index);
    });
    setOpenItems(values);
  };

  const whatsappNumber = "59892041709";

  const message = encodeURIComponent(
    `Hola! Tengo una consulta sobre los cargadores Rayforce`,
  );

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <section
      id={id}
      className="px-4 relative bg-neutral-900 border-t border-t-neutral-800 py-24 sm:py-32"
    >
      {" "}
      <div
        className="absolute inset-0 z-50 pointer-events-none opacity-50 top-0"
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
        <h3 className="text-center ">{t("eyebrow")}</h3>
        <h2 className="mt-2 mb-12! text-4xl sm:text-6xl text-center normal-case">
          {t("title")}
        </h2>
        <div className="my-12 h-[1px] w-full bg-gradient-to-r from-transparent via-green-500/25 to-transparent" />
        {/* Category toggles */}
        <div className="mb-8 sm:mb-14 grid grid-cols-2 sm:flex w-full sm:flex-wrap justify-between gap-3">
          {categoryKeys.map((key) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key)}
              className={`
                  cursor-pointer rounded-lg sm:px-6 px-3 py-4 min-h-12  shadow shadow-neutral-700/25 text-xs sm:text-sm font-medium transition
                  ${
                    active === key
                      ? "bg-neutral-950/25 text-green-500 shadow-green-500/80!"
                      : "bg-neutral-950 text-neutral-300 hover:bg-neutral-900"
                  }
                `}
            >
              {categories[key]}
            </button>
          ))}
        </div>

        {/* FAQ content */}
        <motion.div layout>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={waterfallList}
              initial="hidden"
              animate="show"
              exit="hidden"
            >
              <Accordion
                type="multiple"
                value={openItems}
                onValueChange={handleAccordionChange}
                className="w-full rounded-lg border border-neutral-800 px-6 sm:px-8"
              >
                {groups[active].map((item, i) => (
                  <motion.div
                    key={i}
                    layout
                    className="border-b last:border-0 border-neutral-800 py-3"
                  >
                    <AccordionItem
                      value={`faq-${active}-${i}`}
                      className="border-none"
                    >
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
          </AnimatePresence>
        </motion.div>
        {/* WhatsApp CTA */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 h-14 rounded-2xl px-8 bg-green-700 hover:bg-green-600 text-white font-medium transition-colors duration-200"
          >
            <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Solicitar presupuesto
          </a>
        </div>
      </div>
    </section>
  );
}
