"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { waterfallList } from "@/lib/animation-variants";
import { AnimatedFaqWrapper } from "./AnimatedFaqWrapper";

export function FaqSection({ id }: { id?: string }) {
  const t = useTranslations("HomePage.FaqSection");

  const categories = t.raw("categories") as Record<string, string>;
  const groups = t.raw("groups") as Record<
    string,
    { title: string; answer: string }[]
  >;

  const categoryKeys = Object.keys(groups);
  const [active, setActive] = useState(categoryKeys[0]);

  return (
    <AnimatedFaqWrapper>
      <section id={id} className="px-4  bg-black border-t py-16 sm:py-32">
        <div className="mx-auto max-w-5xl">
          {/* Title */}
          <h3 className="mb-14 text-center text-3xl sm:text-4xl font-semibold">
            {t("title")}
          </h3>

          {/* Category toggles */}
          <div className="mb-14 flex w-full flex-wrap justify-center gap-3">
            {categoryKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`
                  cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition
                  ${
                    active === key
                      ? "bg-green-500 text-black"
                      : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
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
                  className="w-full rounded-lg border px-8"
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
                            py-6 text-left text-lg font-medium
                            hover:no-underline
                            text-green-900
                            [&>svg]:text-green-900
                            [&[data-state=open]>svg]:text-green-400
                            cursor-pointer
                            flex items-center
                          "
                        >
                          <span className="text-neutral-300">{item.title}</span>
                        </AccordionTrigger>

                        <AccordionContent className="pb-6 text-base text-neutral-400">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </AnimatedFaqWrapper>
  );
}
