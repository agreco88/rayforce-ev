"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckIcon, XIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import { CHARGERS, COMPARISON_SECTIONS } from "@/lib/products-data";
import { ChargerEVMobile } from "@/components/ChargerEV/ChargerEvMobile";

/* ------------------------------------------------------------------
 * Mobile Product Section (Rayforce)
 * ---------------------------------------------------------------- */

export function RayforceProductSectionMobile() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const charger = CHARGERS[selectedIndex];

  /* Sync selection with carousel swipe */
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    onSelect(); // initial sync
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="lg:hidden relative bg-linear-to-b from-neutral-950 to-neutral-900 text-white">
      {/* Header */}
      {/* <div className="mx-auto max-w-xl px-6 text-center">
        <h2
          className="
            text-3xl font-medium tracking-tight
            bg-linear-to-b pb-2
            from-neutral-100
            to-neutral-300
            bg-clip-text
            text-transparent
          "
        >
          Elegí tu cargador Rayforce
        </h2>
        <p className="mt-4 text-sm text-neutral-400">
          Deslizá para comparar configuraciones según tu tipo de instalación.
        </p>
      </div> */}
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2
          className="            text-4xl font-medium tracking-tighter
            bg-linear-to-b pb-2
            from-neutral-100
            to-neutral-300
            bg-clip-text
            text-transparent"
        >
          Elegí el cargador ideal para tu instalación
        </h2>
        <ChargerEVMobile />
        <p className="text-sm text-neutral-400">
          Compará configuraciones y prestaciones para encontrar la mejor opción
          según tu uso.
        </p>
      </div>

      {/* ---------------- CAROUSEL (MODEL SELECTOR) ---------------- */}
      <div className="mt-10">
        <Carousel opts={{ align: "center" }} setApi={setApi}>
          <CarouselContent className="-ml-4 px-4 pr-8">
            {CHARGERS.map((c) => (
              <CarouselItem className="basis-[88%] pl-4">
                <button
                  type="button"
                  className={`
                    w-full rounded-2xl border p-5 text-center transition-colors
                    ${
                      charger.key === c.key
                        ? "border-green-500 bg-neutral-900 text-white"
                        : "border-neutral-800 bg-neutral-950 text-neutral-400"
                    }
                  `}
                >
                  <div className="text-xl font-medium">{c.roleLabel}</div>
                  <div className="mt-1 text-xs opacity-70">{c.modelLabel}</div>
                </button>
              </CarouselItem>
            ))}
            {/* 👇 EDGE SPACER */}
            <CarouselItem
              aria-hidden
              className="basis-[8%] pl-4 pointer-events-none"
            />
          </CarouselContent>
        </Carousel>

        {/* Indicator (Windoors-style) */}
        <div className="mt-4 flex justify-center">
          <div className="relative h-1 w-24 rounded-full bg-neutral-800 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-green-500 transition-transform duration-300"
              style={{
                width: `${100 / CHARGERS.length}%`,
                transform: `translateX(${selectedIndex * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* ---------------- SELECTED CONTENT ---------------- */}
      <motion.div
        key={charger.key}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="mt-12 px-4"
      >
        {/* Description */}
        <p className="text-sm text-center leading-relaxed text-neutral-300">
          {charger.description}
        </p>

        {/* Accordion (comparison by section) */}
        <Accordion type="single" collapsible className="mt-8 mb-1 space-y-2">
          {COMPARISON_SECTIONS.map((section) => (
            <AccordionItem
              key={section.name}
              value={section.name}
              className="rounded-xl border  px-4 border-b border-neutral-800 last:border-b"
            >
              <AccordionTrigger className="text-sm font-medium text-white">
                {section.name}
              </AccordionTrigger>

              <AccordionContent className="pb-4">
                <ul className="space-y-3">
                  {section.features.map((feature) => {
                    const value = feature.tiers[charger.key];

                    return (
                      <li
                        key={feature.name}
                        className="flex items-center justify-between gap-4 text-sm"
                      >
                        <span className="text-neutral-400">{feature.name}</span>

                        {typeof value === "string" ? (
                          <span className="text-white">{value}</span>
                        ) : value ? (
                          <CheckIcon className="h-4 w-4 text-green-400" />
                        ) : (
                          <XIcon className="h-4 w-4 text-neutral-600" />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Price + CTA */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="text-lg font-medium text-white">{charger.price}</div>

          <WhatsAppCTA model={`${charger.roleLabel} – ${charger.modelLabel}`} />
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------
 * WhatsApp CTA
 * ---------------------------------------------------------------- */

function WhatsAppCTA({ model }: { model: string }) {
  const message = encodeURIComponent(
    `Hola! Quiero información sobre el modelo ${model}.`
  );

  return (
    <a
      href={`https://wa.me/598XXXXXXXX?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex items-center justify-center gap-2
        rounded-full
        px-6 py-3
        text-sm font-medium
        text-white

        border border-green-900
        bg-gradient-to-b from-green-950 to-green-600
        bg-[length:100%_200%]
        bg-[position:0%_0%]

        transition-[background-position] duration-1000
        hover:bg-[position:0%_100%]

        shadow-sm
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-white/40
      "
    >
      <FaWhatsapp className="size-5 text-white" />
      Quiero este modelo
    </a>
  );
}
