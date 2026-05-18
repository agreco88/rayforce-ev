"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import clsx from "clsx";

import { Link, usePathname } from "@/i18n/navigation";
import { waterfallItem } from "@/lib/animation-variants";

const PRODUCTS = [
  {
    key: "residential",
    power: "7.4kW",
    href: "/cargadores/bs20-bc-7kw",
    accent: "text-sky-400",
  },
  {
    key: "comercial",
    power: "22kW",
    href: "/cargadores/bs20-bc-22kw",
    accent: "text-green-400",
  },
] as const;

export default function HeaderProductsFlyout() {
  const t = useTranslations("Layout.Header");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <motion.li
      variants={waterfallItem}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Trigger */}
      <button
        className={clsx(
          "flex items-center gap-1 text-sm cursor-pointer",
          "text-neutral-50 hover:text-green-400",
          "transition-colors duration-300",
        )}
      >
        {t("nav.chargers")}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex items-center"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      {/* Flyout */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2.5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="
              absolute left-1/2 top-full
              z-50 mt-4 w-[720px]
              -translate-x-1/2
              rounded-3xl border border-white/10
              bg-neutral-950/95 p-4 backdrop-blur-xl
              shadow-[0_8px_40px_rgba(0,0,0,0.5)]
            "
          >
            <div className="grid grid-cols-2 gap-4">
              {PRODUCTS.map((product) => {
                const isActive = pathname === product.href;
                return (
                  <Link
                    key={product.href}
                    href={product.href}
                    aria-disabled={isActive}
                    className={clsx(
                      "rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all duration-300",
                      isActive
                        ? "opacity-50 pointer-events-none cursor-default"
                        : "hover:border-white/10 hover:bg-white/[0.04] hover:-translate-y-1 active:scale-[0.90]",
                    )}
                  >
                    <div
                      className={clsx(
                        "text-xs uppercase tracking-[0.2em]",
                        isActive ? "text-neutral-400" : product.accent,
                      )}
                    >
                      {t(`products.${product.key}.title`)}
                    </div>
                    <div
                      className={clsx(
                        "mt-2 text-3xl font-light tracking-tight",
                        isActive ? "text-neutral-400" : product.accent,
                      )}
                    >
                      {product.power}
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
