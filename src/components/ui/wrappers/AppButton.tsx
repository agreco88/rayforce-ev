"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import clsx from "clsx";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;

  variant?: "default" | "secondary" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";

  className?: string;

  /**
   * Optional tracking callback. Compose useTrack() helpers here.
   * Example: track={() => t.whatsappClick({ source: "footer" })}
   */
  track?: () => void;
};

export function AppButton({
  children,
  href,
  external,
  icon,
  variant = "outline",
  size = "default",
  className,
  track,
}: Props) {
  const content = (
    <span className="inline-flex items-center gap-1 px-1.5">
      {children}
      {icon && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </span>
  );

  const baseStyles = clsx(
    "rounded-lg transition-all py-6 duration-300",
    "border-green-400/30 text-green-500 hover:text-green-400",
    "hover:bg-green-400/10",
    "focus-visible:ring-green-400/40",
    className,
  );

  // 👉 External link
  if (href && external) {
    return (
      <Button asChild variant={variant} size={size} className={baseStyles}>
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={() => track?.()}>
          {content}
        </a>
      </Button>
    );
  }

  // 👉 Internal link (next-intl)
  if (href) {
    return (
      <Button asChild variant={variant} size={size} className={baseStyles}>
        <Link href={href} onClick={() => track?.()}>{content}</Link>
      </Button>
    );
  }

  // 👉 Regular button
  return (
    <Button variant={variant} size={size} className={baseStyles} onClick={() => track?.()}>
      {content}
    </Button>
  );
}
