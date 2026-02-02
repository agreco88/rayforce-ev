"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimateNumber } from "motion-plus/react";
import { useTranslations } from "next-intl";

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
import { ChargerEVMobile } from "@/components/animated/charger-ev/ChargerEvMobile";

/* ------------------------------------------------------------------
 * Helpers
 * ---------------------------------------------------------------- */

function parsePrice(price: string) {
  return Number(price.replace(/[^\d]/g, ""));
}

/**
 * Maps section index → translation section key
 * (order-based, stable, explicit)
 */
const SECTION_KEYS = ["mainSpecs", "connectivity", "protection"] as const;

/**
 * Maps feature index per section → translation feature key
 */
const FEATURE_KEYS: Record<(typeof SECTION_KEYS)[number], string[]> = {
  mainSpecs: [
    "maxPower",
    "phaseType",
    "nominalCurrent",
    "voltage",
    "display",
    "wallMount",
  ],
  connectivity: ["appControl", "wireless"],
  protection: ["electricalProtection", "ipRating", "temperature"],
};

/* ------------------------------------------------------------------
 * Total Price (Animated)
 * ---------------------------------------------------------------- */

function TotalPrice({ amount }: { amount: number }) {
  const t = useTranslations("HomePage.RayforceProductSection.ComparisonTable");

  return (
    <div className="w-full max-w-sm rounded-2xl border border-neutral-800 bg-neutral-950/70 px-6 py-5 text-center">
      <AnimateNumber
        locales="en-US"
        format={{
          style: "currency",
          currency: "USD",
          currencyDisplay: "narrowSymbol",
          maximumFractionDigits: 0,
        }}
        className="text-5xl font-semibold text-white"
      >
        {amount}
      </AnimateNumber>

      <div className="mt-1 text-xs tracking-widest text-neutral-500">
        {t("priceLabel")}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * WhatsApp CTA
 * ---------------------------------------------------------------- */

function WhatsAppCTA({ model }: { model: string }) {
  const t = useTranslations("HomePage.RayforceProductSection.ComparisonTable");

  const message = encodeURIComponent(t("cta.message", { model }));

  return (
    <a
      href={`https://wa.me/598XXXXXXXX?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex items-center justify-center gap-2
        rounded-xl
        px-6 py-5
        text-base font-medium
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
        w-full
      "
    >
      <FaWhatsapp className="size-5 text-white" />
      {t("cta.button")}
    </a>
  );
}

/* ------------------------------------------------------------------
 * Mobile Product Section
 * ---------------------------------------------------------------- */

export function RayforceProductSectionMobile() {
  const tHeader = useTranslations("HomePage.RayforceProductSection.header");
  const tTable = useTranslations(
    "HomePage.RayforceProductSection.ComparisonTable",
  );

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const charger = CHARGERS[selectedIndex];

  /* Sync selection with carousel swipe */
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(Math.min(api.selectedScrollSnap(), CHARGERS.length - 1));
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="lg:hidden relative bg-linear-to-b from-neutral-950 to-neutral-900 text-white">
      {/* Header */}
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-5xl font-medium tracking-tight bg-linear-to-b pb-2 from-neutral-100 to-neutral-300 bg-clip-text text-transparent">
          {tHeader("title")}
        </h2>

        <div className="mt-6">
          <ChargerEVMobile powerKw={charger.powerKw} />
        </div>

        <p className="mt-4 text-sm text-neutral-400">
          {tHeader("description")}
        </p>
      </div>

      {/* Model selector */}
      <div className="mt-10">
        <Carousel opts={{ align: "center" }} setApi={setApi}>
          <CarouselContent className="-ml-4 px-4 pr-8">
            {CHARGERS.map((c) => (
              <CarouselItem key={c.key} className="basis-[100%] pl-4">
                <button
                  type="button"
                  className={`w-full rounded-2xl border p-5 text-center transition-colors ${
                    charger.key === c.key
                      ? "border-green-500 bg-neutral-900 text-white"
                      : "border-neutral-800 bg-neutral-950 text-neutral-400"
                  }`}
                >
                  <div className="text-xl font-medium">{c.roleLabel}</div>
                  <div className="mt-1 text-xs opacity-70">{c.modelLabel}</div>
                </button>
              </CarouselItem>
            ))}
            <CarouselItem aria-hidden className="basis-[8%] pl-4" />
          </CarouselContent>
          {/* Indicator */}
          <div className="my-6 flex justify-center">
            <div className="relative h-1 w-24 rounded-full bg-neutral-800 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-green-500"
                style={{ width: `${100 / CHARGERS.length}%` }}
                animate={{
                  x: `${selectedIndex * 100}%`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            </div>
          </div>
        </Carousel>
      </div>

      {/* Selected content */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="px-4 mt-8"
      >
        <p className="text-sm text-center leading-relaxed text-neutral-300">
          {charger.description}
        </p>

        {/* Accordion */}
        <Accordion
          type="single"
          collapsible
          className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-950/60"
        >
          {COMPARISON_SECTIONS.map((section, sectionIndex) => {
            const sectionKey = SECTION_KEYS[sectionIndex];

            return (
              <AccordionItem
                key={sectionKey}
                value={sectionKey}
                className="px-4"
              >
                <AccordionTrigger className="text-sm font-medium text-white">
                  {tTable(`sections.${sectionKey}.title`)}
                </AccordionTrigger>

                <AccordionContent className="pb-4">
                  <ul className="space-y-3">
                    {section.features.map((feature, featureIndex) => {
                      const featureKey = FEATURE_KEYS[sectionKey][featureIndex];

                      const value = feature.tiers[charger.key];

                      return (
                        <li
                          key={featureKey}
                          className="flex items-center justify-between gap-4 text-sm"
                        >
                          <span className="text-neutral-400">
                            {tTable(
                              `sections.${sectionKey}.features.${featureKey}`,
                            )}
                          </span>

                          {typeof value === "string" ? (
                            <span className="text-white">
                              {tTable(`values.${value}`)}
                            </span>
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
            );
          })}
        </Accordion>

        {/* Price + CTA */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <TotalPrice amount={parsePrice(charger.price)} />
          <WhatsAppCTA model={`${charger.roleLabel} – ${charger.modelLabel}`} />
        </div>
      </motion.div>
    </section>
  );
}
