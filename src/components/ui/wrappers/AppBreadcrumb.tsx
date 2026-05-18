"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type DropdownItem = {
  label: React.ReactNode;
  href: string;
};

type Item = {
  label: React.ReactNode;
  href?: string;
  dropdown?: DropdownItem[];
};

type Props = {
  items: Item[];
  className?: string;
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export function AppBreadcrumb({ items, className }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleEnter = (index: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenIndex(index);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenIndex(null), 150);
  };

  const handleToggle = (index: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // Close on outside click/tap
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <Breadcrumb className={className}>
        <BreadcrumbList>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const hasDropdown = !!item.dropdown?.length;
            const isOpen = openIndex === index;

            return (
              <span key={index} className="contents">
                <BreadcrumbItem>
                  {!isLast && item.href ? (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  ) : hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => handleEnter(index)}
                      onMouseLeave={handleLeave}
                    >
                      <BreadcrumbPage>
                        <button
                          onClick={() => handleToggle(index)}
                          className="flex items-center gap-1 cursor-pointer select-none"
                        >
                          {item.label}
                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="flex items-center"
                          >
                            <ChevronDown className="size-3.5 text-neutral-400" />
                          </motion.span>
                        </button>
                      </BreadcrumbPage>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -2.5 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-0 mt-2 z-50 min-w-[180px]"
                            onMouseEnter={() => handleEnter(index)}
                            onMouseLeave={handleLeave}
                          >
                            <div className="rounded-xl border border-white/10 bg-neutral-950/95 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.6)] p-1 border">
                              {item.dropdown!.map((d, di) => (
                                <Link
                                  key={di}
                                  href={d.href}
                                  className="flex items-center px-3 py-2 w-fit rounded-lg text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors duration-150"
                                >
                                  {d.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>

                {!isLast && <BreadcrumbSeparator />}
              </span>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
