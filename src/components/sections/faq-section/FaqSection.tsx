"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  const t = useTranslations("HomePage.FaqSection");

  const items = t.raw("items") as {
    title: string;
    answer: string;
  }[];

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <h3 className="mb-10 text-center text-3xl font-semibold">
          {t("title")}
        </h3>

        <Accordion
          type="multiple"
          className="w-full border px-8 rounded-lg grid"
        >
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-b py-3 border-neutral-800 "
            >
              <AccordionTrigger
                className="
                  py-6 text-left text-lg font-medium
                  hover:no-underline
                  text-green-900
                  [&>svg]:text-green-900
                  [&[data-state=open]>svg]:text-green-400
                  cursor-pointer
                "
              >
                <span className="bg-gradient-to-b text-neutral-300">
                  {item.title}
                </span>
              </AccordionTrigger>

              <AccordionContent className="pb-6 text-neutral-400 text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
