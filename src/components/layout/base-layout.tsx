import React from "react";
import clsx from "clsx";
import Header from "./header/header";

type BaseLayoutProps = {
  /** The content to render inside the BaseLayout container */
  children: React.ReactNode;
  /** Optional custom classes for fine-tuning BaseLayout per section */
  className?: string;
  /** Disable max-width to allow full-width (edge-to-edge) BaseLayouts */
  fluid?: boolean;
  /** Control horizontal spacing preset */
  padding?: "default" | "none" | "wide";
};

/**
 * BaseLayout — a universal constrained content wrapper with responsive padding.
 * Used across all sections to keep horizontal rhythm consistent.
 */

export default function BaseLayout({
  children,
  className,
  fluid = false,
  padding = "default",
}: BaseLayoutProps) {
  const paddingClasses =
    padding === "none"
      ? "px-0"
      : padding === "wide"
      ? "px-6 sm:px-8 lg:px-12"
      : "px-4 sm:px-6 lg:px-8";

  return (
    <div
      className={clsx(
        "flex flex-col h-full w-full",
        !fluid && "mx-auto container",
        paddingClasses,
        className
      )}
    >
      <Header />
      <main className="flex flex-col"> {children}</main>
    </div>
  );
}
