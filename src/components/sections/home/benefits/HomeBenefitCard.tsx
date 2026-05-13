"use client";

import {
  ShieldCheck,
  DollarSign,
  Smartphone,
  TrendingUp,
  Leaf,
  Home,
  Clock,
  Building2,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

const ICONS = {
  shield: ShieldCheck,
  money: DollarSign,
  phone: Smartphone,

  // Reusable future icons
  growth: TrendingUp,
  leaf: Leaf,
  home: Home,
  clock: Clock,
  building: Building2,
};

export type BenefitIcon = keyof typeof ICONS;

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type Props = {
  title: string;
  description: string;
  icon: BenefitIcon;
};

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function HomeBenefitCard({ title, description, icon }: Props) {
  const Icon = ICONS[icon];

  return (
    <div
      className="
        group relative
        overflow-hidden

      

        p-6

        transition-all duration-300 ease-out
      "
    >
      {/* Glow */}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Icon */}
        <div
          className="
      mb-5
      flex size-24 sm:size-24 lg:size-28
      items-center justify-center
      rounded-2xl
      bg-neutral-950
      shadow shadow-green-950/40
    "
        >
          <Icon
            className="
        size-12

        text-green-400
      "
            strokeWidth={1.5}
          />
        </div>

        {/* Title */}
        <h4
          className="
      mt-2 sm:mt-4
      text-4xl sm:text-3xl
      font-medium
      tracking-tight
      text-white
    "
        >
          {title}
        </h4>

        <div className="h-[2px] bg-gradient-to-r from-transparent via-green-800 to-transparent w-3/4 my-6 sm:my-8" />

        {/* Description */}
        <p
          className="
      text-sm sm:text-base
      leading-relaxed
      text-neutral-400
    "
        >
          {description}
        </p>
      </div>
    </div>
  );
}
