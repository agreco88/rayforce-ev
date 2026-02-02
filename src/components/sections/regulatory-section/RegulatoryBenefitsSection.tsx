"use client";

import Container from "@/components/layout/container";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { waterfallList, waterfallItem } from "@/lib/animation-variants";

export function RegulatorySection({ id }: { id?: string }) {
  const t = useTranslations("HomePage.RegulatorySection");

  return (
    <section
      id={id}
      className="relative bg-gradient-to-b from-green-950 via-neutral-950 pb-20 sm:pb-40"
    >
      {" "}
      <div className="h-[1px] bg-green-900 animate-pulse [animation-duration:8s]"></div>
      <Container className="max-w-7xl px-6  pt-20 sm:pt-40">
        <motion.div
          variants={waterfallList}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-12 lg:grid-cols-2 lg:items-center"
        >
          {/* Logos */}
          <motion.div
            variants={waterfallItem}
            className="flex justify-center order-2 lg:order-1"
          >
            <div className="grid grid-cols-2 gap-6 items-center">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
                <Image
                  src="/images/logo-ursea.webp"
                  alt="URSEA"
                  width={160}
                  height={80}
                  className="mx-auto opacity-90 rounded"
                />
              </div>

              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6">
                <Image
                  src="/images/logo-ute.webp"
                  alt="UTE"
                  width={160}
                  height={80}
                  className="mx-auto opacity-90 rounded"
                />
              </div>
            </div>
          </motion.div>
          {/* Text */}
          <div>
            <motion.h2
              variants={waterfallItem}
              className="text-3xl sm:text-4xl font-medium tracking-tight text-white"
            >
              {t("title")}
            </motion.h2>

            <motion.p
              variants={waterfallItem}
              className="mt-6 text-neutral-200 text-pretty leading-relaxed"
            >
              {t("paragraph1")}
            </motion.p>

            <motion.p
              variants={waterfallItem}
              className="mt-4 text-neutral-400 leading-relaxed"
            >
              {t("paragraph2")}
            </motion.p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
