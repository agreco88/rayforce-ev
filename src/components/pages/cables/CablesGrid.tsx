"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { getCableProducts } from "@/lib/catalog/catalog.helpers";
import ChargerCard from "../chargers/ChargerCard";

export default function CablesGrid() {
  const t = useTranslations("CablesPage.ProductCard");
  const tPage = useTranslations("CablesPage");
  const variantsT = t.raw("variants") as Record<
    string,
    { label: string; description: string }
  >;
  const products = getCableProducts();

  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const cardWidth = el.scrollWidth / products.length;
    setActiveIndex(
      Math.min(products.length - 1, Math.round(el.scrollLeft / cardWidth)),
    );
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
      <div className="sm:hidden -mx-6 overflow-x-hidden">
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
            {products.map((product, i) => (
              <div
                key={product.slug}
                ref={(el: HTMLDivElement | null) => {
                  cardRefs.current[i] = el;
                }}
                className="snap-start shrink-0 w-[90%]"
              >
                <ChargerCard
                  href={`/cables/${product.slug}`}
                  image={product.heroImage}
                  label={variantsT[product.slug]?.label ?? product.slug}
                  description={variantsT[product.slug]?.description ?? ""}
                  theme="amber"
                  namespace="CablesPage.ProductCard"
                  imagePosition="65% center"
                />
              </div>
            ))}
          </div>

          {/* Right vignette — only when more cards remain */}
          {activeIndex < products.length - 1 && (
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-neutral-950 to-transparent" />
          )}
        </div>

        {/* Dot indicators */}
        <nav
          aria-label={tPage("carouselLabel")}
          className="flex justify-center gap-2 mt-5"
        >
          {products.map((product, i) => (
            <button
              key={product.slug}
              onClick={() => scrollToCard(i)}
              aria-label={variantsT[product.slug]?.label ?? product.slug}
              aria-current={activeIndex === i ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? "bg-white w-6" : "bg-neutral-600 w-1.5"
              }`}
            />
          ))}
        </nav>
      </div>

      {/* ── Desktop: 3-column grid ─────────────────────────── */}
      <motion.ul
        variants={waterfallList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="hidden sm:grid list-none grid-cols-3 gap-8"
      >
        {products.map((product) => (
          <motion.li key={product.slug} variants={waterfallItem}>
            <ChargerCard
              href={`/cables/${product.slug}`}
              image={product.heroImage}
              label={variantsT[product.slug]?.label ?? product.slug}
              description={variantsT[product.slug]?.description ?? ""}
              theme="amber"
              namespace="CablesPage.ProductCard"
            />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
