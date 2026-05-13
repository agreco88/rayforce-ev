"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Device from "@/components/pages/shared/Device";
import { cn } from "@/lib/utils";

/* ------------------ Types ------------------ */

type Theme = {
  accentText: string;
  accentBorder: string;
};

/* ------------------ Data ------------------ */

const FEATURES = [
  {
    title: "Chequea el estado y la configuracion de carga",
    description:
      "Configurá la potencia de carga según tus necesidades y optimizá el consumo energético.",
    image: "/images/app/01.jpeg",
  },
  {
    title: "Historial de carga",
    description:
      "Accedé a registros completos de uso y analizá cada sesión de carga al detalle.",
    image: "/images/app/02.jpeg",
  },
  {
    title: "Historial de uso",
    description:
      "Recibi notificaciones de cuando el cargador cominenza a cargar.",
    image: "/images/app/03.jpeg",
  },
  {
    title: "Diagnóstico inteligente",
    description:
      "Detectá errores rápidamente con información clara y accionable.",
    image: "/images/app/04.jpeg",
  },
  {
    title: "Monitoreo en tiempo real",
    description:
      "Visualizá consumo, potencia y estado en vivo desde tu celular.",
    image: "/images/app/05.jpeg",
  },
];

/* ------------------ Component ------------------ */

export function AppHighlightsWithDevice({ theme }: { theme: Theme }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeImage =
    activeIndex !== null
      ? FEATURES[activeIndex].image
      : "/images/app/default.jpeg"; // 👈 default screen

  return (
    <section className="w-full py-24 px-6 bg-neutral-950">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT - LIST */}
        <div className="flex flex-col gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-medium text-white"
          >
            Control total desde tu celular
          </motion.h2>

          <div className="flex flex-col gap-6">
            {FEATURES.map((feature, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={cn(
                    "p-4 rounded-xl border transition-all duration-300 cursor-pointer",
                    isActive
                      ? cn(theme.accentBorder, "bg-white/5")
                      : "border-transparent hover:border-neutral-800",
                  )}
                >
                  <p
                    className={cn(
                      "text-lg font-medium",
                      isActive ? theme.accentText : "text-white",
                    )}
                  >
                    {feature.title}
                  </p>

                  <p className="text-sm text-neutral-400 mt-1">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* RIGHT - DEVICE */}
        <div className="flex justify-center">
          <Device
            image={activeImage}
            scale={0.6}
            className="transition-all duration-500"
          />
        </div>
      </div>
    </section>
  );
}
