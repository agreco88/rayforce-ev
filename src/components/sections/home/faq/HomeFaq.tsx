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
      className="px-4 relative bg-gradient-to-tr from-neutral-950 via-neutral-950 to-neutral-950 border-t border-t-neutral-900 py-24 sm:py-32"
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
      </div>{" "}
    </section>
  );
}
