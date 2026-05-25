"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { CHARGER_FAMILIES } from "@/lib/chargers/chargers.data";
import ChargerModelCard, { type CardTheme } from "./ChargerCard";

function getAllVariants() {
  return CHARGER_FAMILIES.flatMap((family) =>
    family.variants.map((variant) => ({
      id: variant.key,
      slug: variant.slug,
      image: variant.images[0],
      href: `/cargadores/${variant.slug}`,
    })),
  );
}

const VARIANT_THEMES: Record<string, CardTheme> = {
  "bs20-bc-7kw": "blue",
  "bs20-bc-22kw": "green",
};

export default function ChargersGrid() {
  const t = useTranslations("ChargersPage.ChargerCard");
  const tHome = useTranslations("HomePage.HomeChargersSection");
  const variantsT = t.raw("variants") as Record<
    string,
    { label: string; description: string }
  >;
  const models = getAllVariants();

  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    setActiveIndex(progress < 0.5 ? 0 : 1);
  };

  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      {/* ── Mobile: scroll-snap carousel ──────────────────── */}
      {/* -mx-2 cancels the page section's px-2; overflow-x-hidden contains bleed */}
      <div className="sm:hidden -mx-2 overflow-x-hidden">
        <div className="relative">
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="
              flex overflow-x-auto
              snap-x snap-mandatory
              gap-4 px-4 pb-2
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            "
          >
            {models.map((model, i) => (
              <div
                key={model.id}
                ref={(el: HTMLDivElement | null) => {
                  cardRefs.current[i] = el;
                }}
                className="snap-start shrink-0 w-[90%]"
              >
                <ChargerModelCard
                  href={model.href}
                  image={model.image}
                  label={variantsT[model.slug]?.label ?? model.slug}
                  description={variantsT[model.slug]?.description ?? ""}
                  theme={VARIANT_THEMES[model.slug] ?? "green"}
                />
              </div>
            ))}
          </div>

          {/* Right vignette */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-neutral-950 to-transparent" />
        </div>

        {/* Dot indicators */}
        <nav
          aria-label={tHome("carouselLabel")}
          className="flex justify-center gap-2 mt-5"
        >
          {models.map((model, i) => (
            <button
              key={model.id}
              onClick={() => scrollToCard(i)}
              aria-label={variantsT[model.slug]?.label ?? model.slug}
              aria-current={activeIndex === i ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? "bg-white w-6" : "bg-neutral-600 w-1.5"
              }`}
            />
          ))}
        </nav>
      </div>

      {/* ── Desktop: 2-column grid ─────────────────────────── */}
      <motion.ul
        variants={waterfallList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="hidden sm:grid list-none grid-cols-2 px-4 sm:px-0 gap-8"
      >
        {models.map((model) => (
          <motion.li key={model.id} variants={waterfallItem}>
            <ChargerModelCard
              href={model.href}
              image={model.image}
              label={variantsT[model.slug]?.label ?? model.slug}
              description={variantsT[model.slug]?.description ?? ""}
              theme={VARIANT_THEMES[model.slug] ?? "green"}
            />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
