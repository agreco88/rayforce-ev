"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animation-variants";
import { Button } from "@/components/ui/button";
import SectionWrapper from "../layout/section-wrapper";
import Container from "../layout/container";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function DefaultHero() {
  const t = useTranslations("HomePage.hero");

  return (
    <SectionWrapper className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/windoors-hero.webp"
          alt="Interior moderno con cortinas y luz natural"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        className="absolute inset-0 z-10 sm:hidden"
        style={{
          background: `
      radial-gradient(
        120% 120% at 0% 0%,
        rgba(0,0,0,0.80) 20%,
        rgba(0,0,0,0.60) 40%,
        rgba(0,0,0,0.50) 50%,
        rgba(0,0,0,0.40) 60%
      )
    `,
        }}
      />

      {/* Desktop */}
      <div
        className="absolute inset-0 z-10 hidden sm:block"
        style={{
          background: `
      radial-gradient(
        120% 120% at 0% 0%,
        rgba(0,0,0,0.75) 0%,
        rgba(0,0,0,0.55) 45%,
        rgba(0,0,0,0.35) 55%,
        rgba(0,0,0,0.01) 85%
      )
    `,
        }}
      />

      {/* Soft global darken */}
      <div className="absolute inset-0 z-10 bg-black/10" />

      {/* Content */}
      <div className="relative z-20 flex min-h-screen items-center pt-16">
        <Container>
          <motion.div
            variants={fadeInUp(0.2)}
            initial="hidden"
            animate="show"
            className="flex gap-3  items-center mb-4"
          >
            <motion.div variants={fadeInUp(0.2)} className="w-10">
              <Image
                src="/images/windoors-isotype.webp"
                alt="Windoors"
                height={50}
                width={50}
                priority
              />
            </motion.div>

            <motion.p
              variants={fadeInUp(0.4)}
              className="text-xl sm:text-2xl text-gray-200"
            >
              Windoors
            </motion.p>
          </motion.div>

          <motion.h1
            variants={fadeInUp(0.6)}
            initial="hidden"
            animate="show"
            className="
              max-w-3xl 2xl:max-w-4xl
              text-5xl sm:text-6xl 2xl:text-7xl
              font-medium
              tracking-tight lg:tracking-[-0.015em]
              leading-tighter
              text-gray-50  
            "
            style={{
              textShadow: "0 2px 12px rgba(0,0,0,0.35)",
            }}
          >
            {t("title")}
          </motion.h1>

          <motion.p
            variants={fadeInUp(0.8)}
            initial="hidden"
            animate="show"
            className="
              mt-6
              max-w-xl
              text-base sm:text-lg
              leading-relaxed
              tracking-wide
              text-white/85
            "
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <motion.div variants={fadeInUp(1)}>
              <Button
                asChild
                className="
                  bg-gradient-to-b from-neutral-900 to-neutral-800 sm:px-8 sm:py-5
                  border border-neutral-800
                  bg-[length:100%_200%]
                  bg-[position:0%_0%]
                  hover:bg-[position:0%_100%]
                  transition-[background-position]
                  duration-700
                  ease-out
                "
              >
                <Link href="#products" scroll>
                  {t("cta2")}
                </Link>
              </Button>
            </motion.div>
            <motion.div variants={fadeInUp(1.2)}>
              <Button
                asChild
                variant="ghost"
                className="text-secondary hover:bg-neutral-600/60! sm:px-8 sm:py-5 hover:text-gray-50! duration-700! cursor-pointer"
              >
                <Link href="#contact" scroll>
                  {t("cta")}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </SectionWrapper>
  );
}
