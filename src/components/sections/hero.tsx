"use client";

import { useId } from "react";
import Container from "../layout/container";
import { Button } from "../ui/button";
import { Link } from "@/i18n/navigation";
import { DemoVideoModal } from "../DemoVideoModal";
import { HeroEnergyBackground } from "../AnimatedGridBackground";

/* ----------------- BACKGROUND ILLUSTRATION ----------------- */
export function BackgroundIllustration(
  props: React.ComponentPropsWithoutRef<"div">
) {
  const id = useId();

  return (
    <div {...props}>
      {/* Outer ring */}
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full animate-spin-slow"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#D4D4D4"
          strokeOpacity="0.3"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-1)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-1`}
            x1="1"
            y1="513"
            x2="1"
            y2="1025"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#22ff66" />
            <stop
              offset="1"
              stopColor="oklch(72.3% 0.219 149.579)"
              stopOpacity="0.5"
            />
          </linearGradient>
        </defs>
      </svg>

      {/* Inner ring */}
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full animate-spin-reverse-slower"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#D4D4D4"
          strokeOpacity="0.2"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-2)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-2`}
            x1="913"
            y1="513"
            x2="913"
            y2="913"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#06b6d4" />
            <stop
              offset="1"
              stopColor="oklch(72.3% 0.219 149.579)"
              stopOpacity="0.5"
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ----------------- HERO ----------------- */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-neutral-800 pt-64 pb-32">
      {/* ---------- Vignette ---------- */}
      <div
        className="
          absolute inset-0 -z-10
          bg-radial-[at_50%_30%]
          from-neutral-400/12
          via-neutral-500/6
          to-neutral-950
        "
      />

      <Container className="max-w-[88rem]">
        <HeroEnergyBackground />

        {/* ---------- 50 / 50 GRID ---------- */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* ---------------- LEFT: TEXT ---------------- */}
          <div className="relative z-10">
            <h1
              className="
                text-6xl
                font-semibold
                tracking-tighter
                bg-linear-to-t pb-2
                from-neutral-300
                to-white
                bg-clip-text
                text-transparent
              "
            >
              Cargá tu vehículo con la energía del futuro.
            </h1>

            <p
              className="
                mt-4 text-lg
                bg-linear-to-b py-2
                from-stone-300
                to-stone-400
                bg-clip-text
                text-transparent
              "
            >
              Rayforce trae a Uruguay la nueva línea de cargadores{" "}
              <strong>EV Wallbox</strong> desarrollados por
              <strong> Besen</strong>, pensados para hogares, empresas y flotas
              eléctricas.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Button asChild variant="outline">
                <Link
                  href="#productos"
                  scroll
                  className="hover:text-white text-green-400 py-6! w-40"
                >
                  Ver modelos
                </Link>
              </Button>

              <DemoVideoModal />
            </div>
          </div>

          {/* ---------------- RIGHT: PRODUCT VISUAL GRID ---------------- */}
          <div className="relative hidden lg:block">
            <HeroProductGrid />
          </div>
        </div>
        {/* ---------- HIGHLIGHTS ---------- */}
        <div className="mt-28 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <HeroHighlight
            title="Ahorro inteligente."
            description="Optimizá el consumo energético y reducí costos frente a combustibles tradicionales."
          />

          <HeroHighlight
            title="Control total desde tu celular"
            description="Mayor velocidad de carga con control desde app para monitorear consumo, horarios y potencia."
          />

          <HeroHighlight
            title="Energía sustentable"
            description="Impulsá la movilidad eléctrica reduciendo emisiones y apostando a un futuro más limpio."
          />
        </div>
      </Container>
    </section>
  );
}

/* ----------------- PRODUCT GRID ----------------- */
import { motion } from "framer-motion";

function HeroProductGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(16px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1], // smooth, premium easing
      }}
      className="
          relative overflow-hidden rounded-2xl
          shadow-lg
        "
    >
      {/* Image */}
      <img
        src="/images/rayforce-charger-1.webp"
        alt="Cargador EV Wallbox Rayforce"
        className="
            h-full w-full
            object-contain
            select-none
          "
      />

      {/* Vignette overlay */}
      <div
        className="
        pointer-events-none absolute inset-0
        bg-radial-[at_50%_40%]
        from-transparent
        via-black/10
        to-black/40
      "
      />
    </motion.div>
  );
}

function HeroHighlight({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="relative">
      <h3
        className="
          text-lg font-medium 
          text-neutral-100
        "
      >
        {title}
      </h3>

      <p className="mt-2 text-sm w-xs text-pretty leading-relaxed tracking-tight text-neutral-400">
        {description}
      </p>
    </div>
  );
}
