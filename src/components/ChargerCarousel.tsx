"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const IMAGES = [
  "/images/besen/1.webp",
  "/images/besen/2.webp",
  "/images/besen/3.webp",
  "/images/besen/4.webp",
];

export function ChargerCarousel() {
  return (
    <section className="w-full pt-8">
      <div className="mx-auto w-full">
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {IMAGES.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-900"
            >
              <Image
                src={src}
                alt={`Charger image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel>
            <CarouselContent>
              {IMAGES.map((src, index) => (
                <CarouselItem key={src} className="basis-[85%]">
                  <div className="relative h-[400px] overflow-hidden rounded-2xl">
                    <Image
                      src={src}
                      alt={`Charger image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
