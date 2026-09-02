"use client";

import { useEffect, useRef, useState } from "react";
import { Select } from "@base-ui/react/select";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";
import { useTrack } from "@/lib/analytics";

import { CheckIcon, ChevronDown } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Theme = {
  accentText: string;
  accentBg: string;
  accentHover: string;
  divide: string;
  gradientLine: string;
  accentSoft: string;
  accentBorder: string;
  accentBorderHover: string;
  accentGradient: string;
  glow: string;
  glowStrong: string;
  accentRing: string;
};

type Props = {
  theme?: Theme;
  id?: string;
};

type Brand = {
  name: string;
  models: string[];
};

/* -------------------------------------------------------------------------- */
/*                              DEFAULT THEME                                 */
/* -------------------------------------------------------------------------- */

const DEFAULT_THEME: Theme = {
  accentText: "text-green-500",
  accentBg: "bg-green-500",
  accentHover: "hover:bg-green-400",
  divide: "divide-green-500/10",
  gradientLine:
    "from-transparent sm:from-green-600 via-green-700 to-transparent",
  accentSoft: "bg-green-500/10",
  accentBorder: "border-green-500/30",
  accentBorderHover: "hover:border-green-500/30",
  accentGradient: "from-green-400 via-green-500 to-emerald-400",
  glow: "rgba(34,197,94,0.25)",
  glowStrong: "rgba(22,163,74,0.35)",
  accentRing: "ring-green-500",
};

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const COMPATIBILITY_DATA: Brand[] = [
  {
    name: "BYD",
    models: [
      "Yuan Pro",
      "Yuan Plus",
      "Dolphin",
      "Dolphin Mini",
      "Seagull",
      "Seal",
      "Han",
      "Song Pro",
      "Song Plus",
      "Shark",
      "D1",
    ],
  },
  {
    name: "Tesla",
    models: ["Model 3", "Model Y", "Model S", "Model X"],
  },
  { name: "Dongfeng", models: ["Vigo", "Mage", "Huge", "Nammi", "Nano Box"] },
  {
    name: "Chery",
    models: ["eQ1", "eQ7", "Tiggo 4 ", "Tiggo 7 ", "Tiggo 8 "],
  },
  { name: "Chevrolet", models: ["Bolt EV", "Bolt EUV", "Spark EUV"] },
  { name: "Suzuki", models: ["Swift ", "Fronx "] },
  { name: "Geely", models: ["Geometry E", "Geometry C", "EX5"] },
  {
    name: "Omoda",
    models: ["5 SHS", "5 EV", "Jaecoo 7", "Jaecoo 6", "Jaecoo 5"],
  },
  { name: "Lynk & Co", models: ["01 ", "02 ", "08 EM-P", "Z10 EV"] },
  { name: "JAC", models: ["E2", "E-S1", "E-S2", "E-S3"] },
  {
    name: "GAC MOTOR",
    models: ["Aion Y", "Aion S", "Aion V", "Aion V Plus", "Aion ES"],
  },
  { name: "Hyundai", models: ["Kona ", "Ioniq ", "Ioniq 5"] },
  { name: "Jetour", models: ["T1", "T2", "X50", "X70"] },
  { name: "JMEV", models: ["GSE", "EV3"] },
  { name: "Kia", models: ["Niro EV", "EV6"] },
  {
    name: "Toyota",
    models: ["bZ4X", "Corolla ", "Corolla Cross ", "RAV4 "],
  },
  { name: "Leapmotor", models: ["T03", "C11"] },
  { name: "MG", models: ["MG4 ", "ZS EV", "Marvel R"] },
  { name: "Mini", models: ["Cooper SE "] },
  { name: "Nissan", models: ["Leaf"] },
  { name: "Renault", models: ["Kwid E-Tech", "Zoe"] },
  {
    name: "Audi",
    models: ["Q4 e-tron", "e-tron", "e-tron Sport", "e-tron GT"],
  },
  { name: "BMW", models: ["i3", "i4", "iX1", "iX3", "iX"] },
  { name: "Volkswagen", models: ["ID.3", "ID.4", "ID.5"] },
  { name: "Volvo", models: ["EX30", "XC40", "C40"] },
];

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export function CompatibilitySection({ theme, id }: Props) {
  const ui = theme ?? DEFAULT_THEME;

  const t = useTranslations("HomePage.CompatibilitySection");

  const [selectedBrand, setSelectedBrand] = useState<string | null>("BYD");
  const [selectOpen, setSelectOpen] = useState(false);
  const track = useTrack();

  const whatsappNumber = "59892041709";

  const brand = COMPATIBILITY_DATA.find((b) => b.name === selectedBrand);

  const modelsContentRef = useRef<HTMLDivElement>(null);
  const [modelsHeight, setModelsHeight] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    const node = modelsContentRef.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry)
        setModelsHeight(
          entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height,
        );
    });
    observer.observe(node);
    setModelsHeight(node.getBoundingClientRect().height);

    return () => observer.disconnect();
  }, [selectedBrand]);

  function handleBrandChange(name: string | null) {
    setSelectedBrand(name);
    if (name) track.compatibilityBrandExpanded(name);
  }

  function handleWhatsAppModel(brandName: string, model: string) {
    track.compatibilityModelSelected(brandName, model);
    track.whatsappClick({
      source: "compatibility_model",
      vehicle_brand: brandName,
      vehicle_model: model,
    });
  }

  /* ---------------------------------------------------------------------- */
  /* Render                                                                 */
  /* ---------------------------------------------------------------------- */

  return (
    <section
      id={id}
      className="relative overflow-hidden bg-neutral-950 px-6 pt-24 pb-24 sm:px-8 sm:pt-32 sm:pb-32"
    >
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(64,64,64,0.3) 2px, transparent 1px),
            linear-gradient(to bottom, rgba(64,64,64,0.3) 2px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 0%, #000 20%, transparent 80%)",
        }}
      />

      <div className="relative z-10 container mx-auto max-w-[1600px]">
        {/* ------------------------------------------------------------------ */}
        {/* Header                                                             */}
        {/* ------------------------------------------------------------------ */}

        <div className="mx-auto max-w-3xl text-center">
          <p
            className={cn("text-sm uppercase tracking-[0.25em]", ui.accentText)}
          >
            {t("header.eyebrow")}
          </p>

          <h2 className="mt-4 text-4xl tracking-tight sm:text-6xl">
            {t("header.title")}
          </h2>

          <p className="mt-6 text-lg text-neutral-400">
            {t("header.description")}
          </p>

          {/* Brand dropdown */}
          <div className="mx-auto mt-10 max-w-[13rem]">
            <Select.Root
              items={COMPATIBILITY_DATA.map((b) => ({
                value: b.name,
                label: b.name,
              }))}
              value={selectedBrand}
              onValueChange={handleBrandChange}
              open={selectOpen}
              onOpenChange={setSelectOpen}
              modal={false}
            >
              <Select.Trigger
                className={cn(
                  "relative flex h-14 w-full items-center justify-center rounded-2xl",
                  "border border-white/10 bg-neutral-950",
                  "px-10",
                  "text-neutral-200",
                  "transition-colors duration-200",
                  "focus:outline-none focus:ring-1",
                  "data-[popup-open]:ring-1",
                  ui.accentBorderHover,
                  ui.accentRing,
                )}
              >
                <Select.Value className="text-center">
                  {(value: string | null) => value || t("search.placeholder")}
                </Select.Value>
                <Select.Icon className="absolute right-4 flex items-center">
                  <ChevronDown className="size-5 text-neutral-500" />
                </Select.Icon>
              </Select.Trigger>

              <AnimatePresence>
                {selectOpen && (
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
                              "max-h-[28rem] w-max min-w-[var(--anchor-width)] overflow-y-auto overflow-x-hidden rounded-2xl",
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
          </div>
        </div>

        {/* Divider */}
        <div
          className={cn(
            "mx-auto mt-14 mb-10 h-[2px] max-w-3xl bg-gradient-to-r opacity-50",
            ui.gradientLine,
          )}
        />

        {/* ------------------------------------------------------------------ */}
        {/* Models — pills for the selected brand                             */}
        {/* ------------------------------------------------------------------ */}

        <motion.div
          animate={{ height: modelsHeight }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          {brand && (
            <div ref={modelsContentRef} className="mx-auto max-w-3xl">
              <p className="text-center text-xs font-semibold uppercase mb-12 tracking-[0.2em] text-neutral-500">
                {t("modelsLabel")}
              </p>
              <div className="mt-3 grid grid-cols-2 justify-center gap-2 sm:grid-cols-3">
                {brand.models.map((model) => {
                  const message = encodeURIComponent(
                    t("whatsapp.message", { model }),
                  );
                  return (
                    <a
                      key={model}
                      href={`https://wa.me/${whatsappNumber}?text=${message}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleWhatsAppModel(brand.name, model)}
                      className="
                        flex  justify-center  items-center gap-1.5
                        rounded-lg
                        border border-white/10
                        bg-white/[0.03]
                        px-4 py-2
                        text-sm text-neutral-300
                        transition-colors duration-200
                        hover:border-white/20 hover:bg-white/5 hover:text-white
                      "
                    >
                      <CheckIcon
                        className={cn("size-3.5 shrink-0", ui.accentText)}
                      />
                      <span className="truncate">{model}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
