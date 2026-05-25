"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTrack } from "@/lib/analytics/use-track";

export type CardTheme = "green" | "blue";

const THEMES = {
  green: {
    title: "text-green-400",
    topGlow:
      "bg-[radial-gradient(circle_at_75%_15%,rgba(74,222,128,0.18),transparent_55%)]",
    border: "via-green-400/60",
    cta: "group-hover:text-green-400",
  },
  blue: {
    title: "text-sky-400",
    topGlow:
      "bg-[radial-gradient(circle_at_75%_15%,rgba(56,189,248,0.18),transparent_55%)]",
    border: "via-sky-400/60",
    cta: "group-hover:text-sky-400",
  },
} as const;

type Props = {
  href: string;
  label: string;
  description: string;
  image: string;
  theme?: CardTheme;
  className?: string;
};

export default function ChargerCard({
  href,
  label,
  description,
  image,
  theme = "green",
  className,
}: Props) {
  const t = useTranslations("ChargersPage.ChargerCard");
  const th = THEMES[theme];
  const track = useTrack();

  return (
    <Link
      href={href}
      onClick={() => track.chargerCardClicked(href.split("/").pop() ?? href)}
      className={clsx(
        "group relative block overflow-hidden",
        "h-[420px] sm:h-[480px] lg:h-[720px]",
        "rounded-sm",
        className,
      )}
    >
      {/* Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={label}
          fill
          priority={false}
          className="
            object-cover object-center
            transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:scale-[1.009]
            grayscale-0 group-hover:grayscale-0
          "
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Top-right accent glow */}
      <div
        className={clsx(
          "absolute inset-0 opacity-20 group-hover:opacity-80 transition-opacity duration-700",
          th.topGlow,
        )}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col gap-2"
        >
          <h3
            className={clsx(
              "text-xl sm:text-2xl font-semibold tracking-tight",
              th.title,
            )}
          >
            {label}
          </h3>

          <p className="text-neutral-300 text-sm max-h-[2lh] sm:text-base max-w-[480px]">
            {description}
          </p>

          <div className="pt-4">
            <span
              className={clsx(
                "inline-flex items-center gap-2",
                "text-sm text-white/70 transition-all duration-300",
                th.cta,
              )}
            >
              {t("cta")}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom border glow */}
      <div
        className={clsx(
          "absolute bottom-0 left-0 right-0 h-[2px]",
          "bg-gradient-to-r from-transparent to-transparent",
          th.border,
          "opacity-0 group-hover:opacity-100 transition-opacity duration-500",
        )}
      />
    </Link>
  );
}
