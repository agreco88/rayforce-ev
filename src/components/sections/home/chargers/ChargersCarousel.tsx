"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { ChargerEV } from "@/components/animated/charger-ev/ChargerEv";
import { Link } from "@/i18n/navigation";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";
import { getChargerProducts, getPowerLabel } from "@/lib/catalog/catalog.helpers";

export function ChargersCarousel({ id }: { id?: string }) {
  const t = useTranslations("HomePage.HomeChargersSection");
  const products = getChargerProducts();

  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const cardWidth = el.scrollWidth / products.length;
    setActiveIndex(Math.min(products.length - 1, Math.round(el.scrollLeft / cardWidth)));
  };

  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
  };

  return (
    <section
      id={id}
      aria-labelledby="chargers-carousel-heading"
      className="bg-neutral-950 py-20"
    >
      <motion.div
        variants={waterfallList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center"
      >
        <motion.span
          variants={waterfallItem}
          className="text-xs uppercase tracking-widest text-green-400 sm:text-sm"
        >
          {t("eyebrow")}
        </motion.span>

        <motion.h2
          id="chargers-carousel-heading"
          variants={waterfallItem}
          className="mt-4 text-pretty"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          variants={waterfallItem}
          className="mt-4 max-w-[48ch] text-sm leading-relaxed text-neutral-400 sm:text-base"
        >
          {t("description")}
        </motion.p>
      </motion.div>

      <motion.div
        variants={waterfallList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto mt-12 max-w-7xl"
      >
        <div className="relative">
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="
              flex overflow-x-auto
              snap-x snap-mandatory
              gap-6
              px-4
              pb-2
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {products.map((product, i) => {
              const highlights = t.raw(
                `chargers.${product.slug}.highlights`,
              ) as string[];

              return (
                <motion.div
                  key={product.slug}
                  variants={waterfallItem}
                  ref={(el: HTMLDivElement | null) => {
                    cardRefs.current[i] = el;
                  }}
                  className="w-[85%] shrink-0 snap-start sm:w-[320px]"
                >
                  <Link
                    href={`/cargadores/${product.slug}`}
                    aria-label={`${t(`chargers.${product.slug}.title`)} ${getPowerLabel(product)} — ${t("cta.moreInfo")}`}
                    className="
                      group flex h-full flex-col items-center
                      rounded-2xl border border-white/10
                      bg-neutral-950 px-6 py-8
                      transition-colors duration-300
                      hover:border-white/20
                    "
                  >
                    <div
                      className={
                        product.visual.cableType === "socket"
                          ? "mb-[330px]"
                          : "mb-36"
                      }
                    >
                      <ChargerEV {...product.visual} />
                    </div>

                    <div className="mt-2 flex flex-col items-center gap-1">
                      <span
                        className={`text-sm uppercase tracking-widest ${product.theme.accentText}`}
                      >
                        {t(`chargers.${product.slug}.title`)}
                      </span>
                      <span className="text-4xl font-thin tracking-tight text-neutral-100">
                        {getPowerLabel(product)}
                      </span>
                    </div>

                    <ul
                      className="mt-5 flex flex-col gap-2 text-center text-sm text-neutral-400"
                      aria-label={`${t(`chargers.${product.slug}.title`)} highlights`}
                    >
                      {highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-center justify-center gap-2"
                        >
                          <span
                            className={`size-1 shrink-0 rounded-full ${product.theme.accentBg}`}
                            aria-hidden="true"
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div
                      className={`
                        mt-6
                        flex items-center gap-2
                        border-t border-t-neutral-800 pt-4
                        text-sm font-medium
                        transition-all duration-300
                        ${product.theme.accentText}
                        group-hover:gap-3
                      `}
                      aria-hidden="true"
                    >
                      {t("cta.moreInfo")}
                      <ArrowRight size={18} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right vignette */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-neutral-950 to-transparent" />
        </div>

        {/* Dots */}
        <nav
          aria-label={t("carouselLabel")}
          className="mt-5 flex justify-center gap-2"
        >
          {products.map((product, i) => (
            <button
              key={product.slug}
              onClick={() => scrollToCard(i)}
              aria-label={`${t(`chargers.${product.slug}.title`)} ${getPowerLabel(product)}`}
              aria-current={activeIndex === i ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i ? "bg-white w-6" : "bg-neutral-600 w-1.5"
              }`}
            />
          ))}
        </nav>
      </motion.div>
    </section>
  );
}
