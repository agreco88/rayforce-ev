"use client";

import { Zap, Smartphone, Leaf, SlidersHorizontal } from "lucide-react";
import Container from "@/components/layout/container";

const FEATURES = [
  {
    title: "Ahorro inteligente",
    description: "Menor costo de carga frente a combustibles tradicionales.",
    icon: Zap,
  },
  {
    title: "Control desde tu celular",
    description: "Monitoreá consumo, horarios y potencia desde la app.",
    icon: Smartphone,
  },
  {
    title: "Energía sustentable",
    description: "Reducí emisiones y apostá por movilidad eléctrica.",
    icon: Leaf,
  },
  {
    title: "Regulación de potencia",
    description: "Ajustá la carga para evitar sobrecargas eléctricas.",
    icon: SlidersHorizontal,
  },
];

export function HeroFeatureCardsSection() {
  return (
    <Container className="px-6 sm:px-0!">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="
              rounded-2xl
              border border-neutral-800
              bg-gradient-to-tl from-neutral-950 via-neutral-950 to-neutral-900
              backdrop-blur
              p-6
              transition-colors
              hover:bg-neutral-900
            "
          >
            <feature.icon className="h-5 w-5 text-green-400" aria-hidden />

            <h3 className="mt-4 text-base font-medium text-white">
              {feature.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
