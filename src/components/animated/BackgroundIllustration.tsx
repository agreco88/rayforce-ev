"use client";

import { useId } from "react";
import type { ComponentPropsWithoutRef } from "react";

type BackgroundIllustrationProps = ComponentPropsWithoutRef<"div">;

export function BackgroundIllustration({
  className,
  ...props
}: BackgroundIllustrationProps) {
  const id = useId();

  return (
    <div
      {...props}
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
      aria-hidden="true"
    >
      {/* ---------- Outer ring ---------- */}
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        className="absolute inset-0 h-full w-full animate-spin-slow"
      >
        <path
          d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
          stroke="#D4D4D4"
          strokeOpacity="0.3"
        />
        <path
          d="M513 1025C230.23 1025 1 795.77 1 513"
          stroke={`url(#${id}-gradient-outer)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-outer`}
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

      {/* ---------- Inner ring ---------- */}
      <svg
        viewBox="0 0 1026 1026"
        fill="none"
        className="absolute inset-0 h-full w-full animate-spin-reverse-slower"
      >
        <path
          d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
          stroke="#D4D4D4"
          strokeOpacity="0.2"
        />
        <path
          d="M913 513c0 220.914-179.086 400-400 400"
          stroke={`url(#${id}-gradient-inner)`}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient
            id={`${id}-gradient-inner`}
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
