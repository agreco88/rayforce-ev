"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

type CTAItem = {
  type?: "primary" | "secondary";
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
};

type Props = {
  items: CTAItem[];
};

export function ChargerModelHeroCTA({ items }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
      {items.map((item, index) => {
        const isPrimary = item.type === "primary";

        const content = (
          <>
            {item.icon && <span className="size-5">{item.icon}</span>}
            <span>{item.label}</span>
          </>
        );

        // PRIMARY
        if (isPrimary) {
          return (
            <motion.a
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl",
                "bg-green-500 text-black font-medium",
                "shadow-lg shadow-green-500/20",
                "hover:bg-green-400 hover:shadow-green-500/30",
                "transition-all duration-300",
              )}
            >
              {content}
            </motion.a>
          );
        }

        // SECONDARY
        if (item.href) {
          return (
            <motion.a
              key={index}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-neutral-300 hover:text-white transition-all duration-300"
            >
              <span className="underline underline-offset-4">{item.label}</span>

              {item.icon && (
                <span className="opacity-70 group-hover:translate-y-[1px] transition-transform">
                  {item.icon}
                </span>
              )}
            </motion.a>
          );
        }

        // BUTTON (fallback)
        return (
          <motion.button
            key={index}
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
            onClick={item.onClick}
            className="group flex items-center gap-2 text-neutral-300 hover:text-white transition-all duration-300"
          >
            <span className="underline underline-offset-4">{item.label}</span>

            {item.icon && (
              <span className="opacity-70 group-hover:translate-y-[1px] transition-transform">
                {item.icon}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
