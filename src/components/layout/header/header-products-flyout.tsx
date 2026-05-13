"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import clsx from "clsx";

import { Link } from "@/i18n/navigation";

import { waterfallItem } from "@/lib/animation-variants";

const PRODUCTS = [
  {
    key: "residential",
    power: "7.4kW",
    href: "/cargadores/bs20-bc-7kw",
  },

  {
    key: "mid",
    power: "11kW",
    href: "/cargadores/bs20-bc-11kw",
  },

  {
    key: "industrial",
    power: "22kW",
    href: "/cargadores/bs20-bc-22kw",
  },
] as const;

export default function HeaderProductsFlyout() {
  const t = useTranslations("Layout.Header");

  const triggerClassName = clsx(
    "text-neutral-50!",
    "cursor-pointer",
    "hover:text-green-400!",
    "transition-all duration-300",
  );

  return (
    <motion.li variants={waterfallItem} className="group relative">
      {/* ------------------------------------------------------------------ */}
      {/* Trigger                                                            */}
      {/* ------------------------------------------------------------------ */}

      <button
        className={clsx("flex items-center gap-1", "text-sm", triggerClassName)}
      >
        {t("nav.chargers")}

        <ChevronDown
          size={16}
          className="
            transition-transform duration-300
            group-hover:rotate-180
          "
        />
      </button>

      {/* ------------------------------------------------------------------ */}
      {/* Flyout                                                             */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          invisible

          absolute left-1/2 top-full
          z-50

          mt-4
          w-[720px]

          -translate-x-1/2

          rounded-3xl
          border border-white/10

          bg-neutral-950/95
          p-4

          opacity-0
          backdrop-blur-xl

          transition-all duration-200

          group-hover:visible
          group-hover:opacity-100
        "
      >
        <div className="grid grid-cols-3 gap-4">
          {PRODUCTS.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              className="
                rounded-2xl
                border border-white/5

                bg-white/[0.02]

                p-5

                transition-all duration-300

                hover:border-green-500/30
                hover:bg-white/[0.04]
                hover:-translate-y-1
              "
            >
              {/* Label */}
              <div
                className="
                  text-xs
                  uppercase
                  tracking-[0.2em]

                  text-green-400
                "
              >
                {t(`products.${product.key}.title`)}
              </div>

              {/* Power */}
              <div
                className="
                  mt-2

                  text-3xl
                  font-light
                  tracking-tight
                "
              >
                {product.power}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.li>
  );
}
