"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";

type Props = {
  href: string;
  label: string;
  description: string;
  className?: string;
};

export default function ChargerCard({
  href,
  label,
  description,
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={clsx(
        "group relative block overflow-hidden",
        "h-[420px] sm:h-[480px] lg:h-[720px]",
        " rounded-sm",
        className,
      )}
    >
      {/* Image */}
      {/* <div className="absolute inset-0">
        <Image
          src={posterSrc}
          alt={label}
          fill
          priority={false}
          className="
            object-cover object-center
            transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]
            group-hover:scale-[1.009]    
            blur-[1px] group-hover:blur-none
            grayscale-75 group-hover:grayscale-0
          "
        />
      </div> */}

      {/* Dark overlay (readability) */}
      <div
        className="
          absolute inset-0 
          bg-gradient-to-t
          from-black via-black/60 to-black/0 
        "
      />

      {/* Subtle radial highlight (premium touch) */}
      {/* <div
        className="
          absolute inset-0 opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.08),transparent_60%)]
        "
      /> */}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col gap-2"
        >
          {/* Title */}
          <h3 className="text-white text-xl sm:text-2xl font-semibold tracking-tight">
            {label}
          </h3>

          {/* Description */}
          <p className="text-neutral-300 text-sm sm:text-base max-w-sm">
            {description}
          </p>

          {/* CTA */}
          <div className="pt-4">
            <span
              className="
                inline-flex items-center gap-2
                text-sm text-white/80
                transition-all duration-300
                group-hover:text-white
              "
            >
              Ver modelo
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom border glow (very subtle, very premium) */}
      <div
        className="
          absolute bottom-0 left-0 right-0 h-[2px]
          bg-gradient-to-r from-transparent via-green-400/50 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        "
      />
    </Link>
  );
}
