"use client";

import { Select } from "@base-ui/react/select";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { BrandLogo } from "./BrandLogo";
import { COMPATIBILITY_DATA } from "./compatibility.data";
import type { Theme } from "./compatibility.theme";

type Props = {
  value: string | null;
  onValueChange: (name: string | null) => void;
  ui: Theme;
  /** El label visible de arriba, para que el lector de pantalla lo lea. */
  labelId?: string;
  className?: string;
};

/** El dropdown de marcas, compartido por el layout centrado y el 50/50. */
export function BrandSelect({
  value,
  onValueChange,
  ui,
  labelId,
  className,
}: Props) {
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
        aria-labelledby={labelId}
        className={cn(
          "relative flex h-16 w-full items-center rounded-2xl lg:h-14",
          "border border-white/10 bg-neutral-950",
          "pr-10 pl-6 text-neutral-200",
          "transition-colors duration-200",
          "focus:ring-1 focus:outline-none",
          "data-[popup-open]:ring-1",
          ui.accentBorderHover,
          ui.accentRing,
          className,
        )}
      >
        <Select.Value>
          {(selected: string | null) =>
            selected ? <BrandName name={selected} /> : t("search.placeholder")
          }
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
              align="start"
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
                      "max-h-[min(28rem,var(--available-height))] w-max min-w-[var(--anchor-width)] overflow-x-hidden overflow-y-auto rounded-2xl",
                      "flex flex-col gap-1",
                      "border bg-neutral-950 p-1.5",
                      "shadow-xl shadow-black/40",
                      ui.accentBorder,
                    )}
                  />
                }
              >
                {/* `pl-4.5` + el `p-1.5` del popup = el `pl-6` del boton: los
                    logos de la lista caen en la misma columna que el elegido. */}
                {COMPATIBILITY_DATA.map((b) => (
                  <Select.Item
                    key={b.name}
                    value={b.name}
                    className="flex cursor-pointer items-center gap-6 rounded-md py-3 pr-4 pl-4.5 text-base text-neutral-300 outline-none transition-colors duration-100 data-[highlighted]:text-white data-[selected]:text-white"
                    style={(state) => ({
                      backgroundColor:
                        state.highlighted || state.selected
                          ? ui.glow
                          : "transparent",
                    })}
                  >
                    <Select.ItemText>
                      <BrandName name={b.name} />
                    </Select.ItemText>
                    <Select.ItemIndicator className="ml-auto flex">
                      <Check className={cn("size-4", ui.accentText)} />
                    </Select.ItemIndicator>
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

/** El logo y el nombre. Caja mas ancha que alta: los logos que son el
 *  nombre (BYD, Omoda) no entran en un cuadrado de 20px. Mas grande en
 *  mobile, donde a 40px de ancho esos quedaban ilegibles. */
function BrandName({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-6 lg:gap-3">
      <BrandLogo name={name} className="h-7 w-14 shrink-0 lg:h-5 lg:w-10" />
      {name}
    </span>
  );
}
