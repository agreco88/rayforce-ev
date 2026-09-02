"use client";

import { useRef, useState } from "react";

import { motion, useAnimate, useMotionValue, type PanInfo } from "motion/react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";

type GalleryImage = {
  src: string;
  aspectRatio: number;
};

const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/images/besen/1.webp", aspectRatio: 4 / 3 },
  { src: "/images/stand/stand-9.png", aspectRatio: 3 / 4 },
  { src: "/images/besen/2.webp", aspectRatio: 4 / 3 },
  { src: "/images/besen/3.webp", aspectRatio: 4 / 3 },
  { src: "/images/besen/4.webp", aspectRatio: 4 / 3 },
];

/* -------------------------------------------------------------------------- */
/*                                  GEOMETRY                                  */
/* -------------------------------------------------------------------------- */

const CARD_WIDTH = 280;
const CARD_GAP = 20;
const ITEM_DISTANCE = CARD_WIDTH + CARD_GAP;
const PARALLAX_RANGE = 32;
const DRAG_SPRING = { type: "spring", stiffness: 380, damping: 38, mass: 0.6 } as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function GalleryPhoto({
  index,
  src,
  aspectRatio,
  activeIndex,
}: {
  index: number;
  src: string;
  aspectRatio: number;
  activeIndex: number;
}) {
  const distance = clamp(index - activeIndex, -1, 1);

  return (
    <motion.div
      style={{ width: CARD_WIDTH, aspectRatio }}
      animate={{ x: distance * -PARALLAX_RANGE }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-[280px] shrink-0 overflow-hidden rounded-2xl sm:h-[380px]"
    >
      <motion.img
        src={src}
        draggable={false}
        alt={`Rayforce charger — client installation ${index + 1}`}
        className="h-full w-full object-cover"
        style={{ scale: 1.15 }}
      />
    </motion.div>
  );
}

export function ChargerGallery({ id }: { id?: string }) {
  const t = useTranslations("HomePage.ChargerGallery");

  const [scope, animate] = useAnimate();
  const carouselX = useMotionValue(0);
  const dragStartIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const lastIndex = GALLERY_IMAGES.length - 1;
  const minX = -(ITEM_DISTANCE * lastIndex);

  function goTo(index: number) {
    const next = clamp(index, 0, lastIndex);
    setActiveIndex(next);
    animate(scope.current, { x: -next * ITEM_DISTANCE }, DRAG_SPRING);
  }

  function handleDragStart() {
    dragStartIndexRef.current = activeIndex;
  }

  function handleDrag(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) {
    const rawX = -dragStartIndexRef.current * ITEM_DISTANCE + info.offset.x;
    const proposed = clamp(Math.round(-rawX / ITEM_DISTANCE), 0, lastIndex);
    if (proposed !== activeIndex) setActiveIndex(proposed);
  }

  function handleDragEnd() {
    const nearest = clamp(
      Math.round(-carouselX.get() / ITEM_DISTANCE),
      0,
      lastIndex,
    );
    goTo(nearest);
  }

  const isPrevActive = activeIndex > 0;
  const isNextActive = activeIndex < lastIndex;

  return (
    <section id={id} aria-labelledby="charger-gallery-heading" className="bg-neutral-950 py-20">
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

        <motion.h2 id="charger-gallery-heading" variants={waterfallItem} className="mt-4 text-pretty">
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
        className="relative mx-auto mt-12 w-full max-w-7xl px-4"
      >
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
          }}
        >
          <motion.div
            ref={scope}
            className="flex cursor-grab gap-5 active:cursor-grabbing"
            style={{ x: carouselX }}
            drag="x"
            dragConstraints={{ left: minX, right: 0 }}
            dragElastic={0.12}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            {GALLERY_IMAGES.map((image, index) => (
              <GalleryPhoto
                key={image.src}
                index={index}
                activeIndex={activeIndex}
                src={image.src}
                aspectRatio={image.aspectRatio}
              />
            ))}
          </motion.div>
        </div>

        <nav className="mt-6 flex items-center justify-center gap-4">
          <motion.button
            type="button"
            aria-label="Previous"
            onClick={() => goTo(activeIndex - 1)}
            animate={{ opacity: isPrevActive ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
            className="flex size-10 items-center justify-center rounded-full bg-white/5 text-white backdrop-blur-md transition-opacity focus-visible:outline-2 focus-visible:outline-green-400 disabled:cursor-not-allowed"
            disabled={!isPrevActive}
          >
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            type="button"
            aria-label="Next"
            onClick={() => goTo(activeIndex + 1)}
            animate={{ opacity: isNextActive ? 1 : 0.3 }}
            transition={{ duration: 0.3 }}
            className="flex size-10 items-center justify-center rounded-full bg-white/5 text-white backdrop-blur-md transition-opacity focus-visible:outline-2 focus-visible:outline-green-400 disabled:cursor-not-allowed"
            disabled={!isNextActive}
          >
            <ChevronRight size={20} />
          </motion.button>
        </nav>
      </motion.div>
    </section>
  );
}
