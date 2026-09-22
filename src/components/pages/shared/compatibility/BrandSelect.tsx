"use client";

import { Select } from "@base-ui/react/select";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { COMPATIBILITY_DATA } from "./compatibility.data";
import type { Theme } from "./compatibility.theme";

type Props = {
  value: string | null;
  onValueChange: (name: string | null) => void;
  ui: Theme;
  className?: string;
};

/** El dropdown de marcas, compartido por el layout centrado y el 50/50. */
export function BrandSelect({ value, onValueChange, ui, className }: Props) {
  const t = useTranslations("HomePage.CompatibilitySection");
  const [open, setOpen] = useState(false);

  return (
    <Select.Root
      items={COMPATIBILITY_DATA.map((b) => ({ value: b.name, label: b.name }))}
      value={value}
      onValueChange={onValueChange}
      open={open}
      onOpenChange={setOpen}
      modal={false}
    >
      <Select.Trigger
        className={cn(
          "relative flex h-14 w-full items-center justify-center rounded-2xl",
          "border border-white/10 bg-neutral-950",
          "px-10 text-neutral-200",
          "transition-colors duration-200",
          "focus:ring-1 focus:outline-none",
          "data-[popup-open]:ring-1",
          ui.accentBorderHover,
          ui.accentRing,
          className,
        )}
      >
        <Select.Value className="text-center">
          {(selected: string | null) => selected || t("search.placeholder")}
        </Select.Value>
        <Select.Icon className="absolute right-4 flex items-center">
          <ChevronDown className="size-5 text-neutral-500" />
        </Select.Icon>
      </Select.Trigger>

      <AnimatePresence>
        {open && (
          <Select.Portal>
            <Select.Positioner
              className="z-20 outline-none"
              sideOffset={8}
              align="center"
              alignItemWithTrigger={false}
            >
              <Select.Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -4 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    style={{ willChange: "transform, opacity" }}
                    className={cn(
                      "max-h-[28rem] w-max min-w-[var(--anchor-width)] overflow-x-hidden overflow-y-auto rounded-2xl",
                      "flex flex-col gap-1",
                      "border bg-neutral-950 p-1.5",
                      "shadow-xl shadow-black/40",
                      ui.accentBorder,
                    )}
                  />
                }
              >
                {COMPATIBILITY_DATA.map((b) => (
                  <Select.Item
                    key={b.name}
                    value={b.name}
                    className="flex cursor-pointer items-center justify-center rounded-md px-4 py-3 text-center text-base text-neutral-300 outline-none transition-colors duration-100 data-[highlighted]:text-white data-[selected]:text-white"
                    style={(state) => ({
                      backgroundColor:
                        state.highlighted || state.selected
                          ? ui.glow
                          : "transparent",
                    })}
                  >
                    <Select.ItemText>{b.name}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        )}
      </AnimatePresence>
    </Select.Root>
  );
}
