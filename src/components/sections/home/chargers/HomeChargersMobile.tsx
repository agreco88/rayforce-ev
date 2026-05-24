"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { waterfallItem, waterfallList } from "@/lib/animation-variants";

const CHARGERS = [
  {
    key: "residential",
    power: "7.4kW",
    image: "/assets/images/chargers/bs20-bc-7kw-card.avif",
    slug: "bs20-bc-7kw",
    accent: "text-sky-400",
    glow: "from-sky-500/20",
    bullet: "bg-sky-400",
  },
  {
    key: "pro",
    power: "22.0kW",
    image: "/assets/images/chargers/bs20-bc-22kw-card.avif",
    slug: "bs20-bc-22kw",
    accent: "text-green-400",
    glow: "from-green-500/20",
    bullet: "bg-green-400",
  },
] as const;

export function HomeChargersMobile({ id }: { id?: string }) {
  const t = useTranslations("HomePage.HomeChargersSection");
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
    <section
      id={id}
      aria-labelledby="chargers-mobile-heading"
      className="bg-neutral-950 px-4 py-20"
    >
      {/* Header */}
      <motion.div
        variants={waterfallList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-10 flex flex-col items-start"
      >
        <motion.span
          variants={waterfallItem}
          aria-hidden="true"
          className="text-xs uppercase tracking-widest text-green-400"
        >
          {t("eyebrow")}
        </motion.span>

        <motion.h2
          id="chargers-mobile-heading"
          variants={waterfallItem}
          className="mt-4 text-4xl text-pretty"
        >
          {t("title")}
        </motion.h2>

        <motion.p
          variants={waterfallItem}
          className="mt-4 max-w-[40ch] text-sm leading-relaxed text-neutral-400"
        >
          {t("description")}
        </motion.p>
      </motion.div>

      {/* Carousel */}
      <motion.div
        variants={waterfallList}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {/* Track */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="
            flex overflow-x-auto
            snap-x snap-mandatory
            gap-4
            -mx-4 px-4
            pb-2
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {CHARGERS.map((charger, i) => {
            const highlights = t.raw(
              `chargers.${charger.key}.highlights`,
            ) as string[];

            return (
              <motion.div
                key={charger.slug}
                variants={waterfallItem}
                ref={(el: HTMLDivElement | null) => {
                  cardRefs.current[i] = el;
                }}
                className="snap-start shrink-0 w-[90%]"
              >
                <Link
                  href={`/cargadores/${charger.slug}`}
                  aria-label={`${t(`chargers.${charger.key}.title`)} ${charger.power} — ${t("cta.moreInfo")}`}
                  className="
                    group relative
                    flex flex-col w-full
                    overflow-hidden rounded-xl
                    border border-white/10
                    bg-neutral-950
                  "
                >
                  {/* Glow */}
                  <div
                    className={`
                      absolute inset-0
                      bg-gradient-to-br ${charger.glow}
                      via-transparent to-transparent
                      opacity-40
                    `}
                  />

                  {/* Background image */}
                  <div
                    className="
                      absolute right-[-20%] top-1/2
                      -translate-y-1/2
                      opacity-70
                      transition-all duration-500
                      group-hover:scale-105 group-hover:opacity-50
                    "
                  >
                    <Image
                      src={charger.image}
                      alt=""
                      aria-hidden="true"
                      width={250}
                      height={250}
                      className="h-auto md:w-screen scale-x-[-1]"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col px-6 py-6">
                    <div className="flex flex-col">
                      <span
                        className={`text-base uppercase tracking-[0.3em] ${charger.accent}`}
                      >
                        {t(`chargers.${charger.key}.title`)}
                      </span>

                      <h3 className="pt-1 text-5xl font-semibold tracking-tight text-neutral-100">
                        {charger.power}
                      </h3>
                    </div>

                    <ul
                      className="mt-5 flex flex-col gap-2 text-sm text-neutral-400"
                      aria-label={`${t(`chargers.${charger.key}.title`)} highlights`}
                    >
                      {highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2">
                          <span
                            className={`size-1.5 shrink-0 rounded-full ${charger.bullet}`}
                            aria-hidden="true"
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div
                      className={`
                        mt-8
                        flex items-center justify-center gap-2
                        border-t border-t-neutral-800 pt-4
                        text-sm font-medium
                        transition-all duration-300
                        ${charger.accent}
                        group-hover:gap-4
                      `}
                      aria-hidden="true"
                    >
                      {t("cta.moreInfo")}
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Dots */}
        <nav
          aria-label={t("carouselLabel")}
          className="flex justify-center gap-2 mt-5"
        >
          {CHARGERS.map((charger, i) => (
            <button
              key={charger.slug}
              onClick={() => scrollToCard(i)}
              aria-label={`${t(`chargers.${charger.key}.title`)} ${charger.power}`}
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
