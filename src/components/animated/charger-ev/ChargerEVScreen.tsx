"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  MotionValue,
} from "framer-motion";
import { useEffect } from "react";

type Variant = "residential" | "pro";
type Mode = "single" | "multi";

type Props = {
  powerKw: number;
  variant?: Variant;
  mode?: Mode;
  phases?: 1 | 2 | 3;
};

/* ---------- theme ---------- */

const THEMES = {
  residential: {
    container: "border-blue-800 bg-blue-900",
    accent: "text-teal-200/90",
    divider: "border-teal-800",
    battery: "bg-green-400",
  },
  pro: {
    container:
      "border-blue-800 bg-gradient-to-b from-blue-950 via-blue-950 to-blue-900 text-blue-100",
    accent: "text-blue-200/90",
    divider: "border-blue-800",
    battery: "bg-green-500",
  },
} as const;

/* ---------- helpers ---------- */

function MotionText({ value }: { value: MotionValue<string> }) {
  return (
    <motion.span className="tracking-tighter">
      {value as unknown as string}
    </motion.span>
  );
}

/* ---------- battery ---------- */

function Battery({
  height,
  color,
}: {
  height: MotionValue<string>;
  color: string;
}) {
  return (
    <div className="relative h-full w-9 border border-white/40 rounded-sm overflow-hidden">
      <motion.div
        style={{ height }}
        className={`absolute bottom-0 w-full ${color} shadow-[0_0_8px_rgba(34,255,102,0.6)]`}
      />
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-white/60 rounded-sm" />
    </div>
  );
}

/* ---------- phases ---------- */

const PHASE_COLORS = [
  { bg: "bg-blue-500", text: "text-blue-400" },
  { bg: "bg-green-500", text: "text-green-400" },
  { bg: "bg-amber-400", text: "text-amber-400" },
];

function PhaseRows({ phases }: { phases: number }) {
  return (
    <>
      {[0, 1, 2].map((i) => {
        const active = i < phases;
        const color = PHASE_COLORS[i];

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: active ? 1 : 0.25 }}
            transition={{ delay: i * 0.25 }}
            className="flex items-center gap-2"
          >
            <span className={`w-5 h-2.5 ${color.bg}`} />
            <span className={color.text}>L{i + 1}: 220V</span>
            <span className={color.text}>{active ? "16.0 A" : "0.0 A"}</span>
          </motion.div>
        );
      })}
    </>
  );
}

/* ---------- main ---------- */

export function ChargerEVScreen({
  powerKw,
  variant = "pro",
  mode = "multi",
  phases = 3,
}: Props) {
  const theme = THEMES[variant];

  const power = useMotionValue(powerKw);
  const temp = useMotionValue(23.5);
  const timer = useMotionValue(0);
  const battery = useMotionValue(40);

  useEffect(() => {
    const controls = [
      animate(power, [powerKw * 0.25, powerKw], {
        duration: 2,
        ease: "easeInOut",
      }),
      animate(temp, [24.1, 24.2, 24.3, 24.5], {
        duration: 32,
        repeat: Infinity,
      }),
      animate(battery, [40, 60, 80, 95], {
        duration: 20,
        repeat: Infinity,
      }),
      animate(timer, 9999, { duration: 9999, ease: "linear" }),
    ];

    return () => controls.forEach((c) => c.stop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [powerKw]);

  const powerText = useTransform(power, (v) => v.toFixed(1));
  const tempText = useTransform(temp, (v) => v.toFixed(1));
  const batteryHeight = useTransform(battery, (v) => `${v}%`);

  const timerText = useTransform(timer, (v) => {
    const total = Math.floor(v);
    const mins = String(Math.floor(total / 60)).padStart(2, "0");
    const secs = String(total % 60).padStart(2, "0");
    return `00:${mins}:${secs}`;
  });

  return (
    <div className={`rounded border shadow-inner ${theme.container} w-54`}>
      {mode === "single" ? (
        <>
          {/* 🔹 SINGLE PHASE */}

          {/* Header */}
          <div className="flex px-3 py-2 justify-between text-[11px] ">
            <span className="text-white/90">EV Charger</span>
            <span>
              <MotionText value={tempText} />
              °C
            </span>
          </div>

          {/* Body */}
          <div
            className={`grid grid-cols-3 w-full py-4 bg-gradient-to-b from-sky-400 via-sky-500 to-sky-800 border-y border-white border-2! border-x-0! gap-2 px-3 ${theme.accent}`}
          >
            {/* Amps */}
            <div className="col-span-2 flex items-center">
              <span className="text-5xl font-bold text-white">30.8A</span>
            </div>

            {/* Battery */}
            <div className="row-span-2 flex justify-end">
              <Battery height={batteryHeight} color={theme.battery} />
            </div>

            {/* Info */}
            <div className="col-span-2 text-[11px] flex justify-between pt-1">
              <span>220V</span>
              <span>{powerKw} kWh</span>
              <MotionText value={timerText} />
            </div>

            {/* Footer */}
          </div>
          <div
            className={`col-span-3  px-3 py-2 flex justify-between border-t pt-2 text-[10px] ${theme.divider}`}
          >
            <span className="opacity-80">Rated</span>
            <span>32A</span>
          </div>
        </>
      ) : (
        <>
          {/* 🔹 MULTI PHASE */}

          {/* Header */}
          <div className="flex px-3 py-2 justify-between text-[11px]">
            <span className="text-white/90">EV Charger</span>
            <span className="opacity-70">Rated 32A</span>
          </div>

          {/* Body */}
          <div className={`grid grid-cols-3 gap-2 px-3  ${theme.accent}`}>
            {/* Power */}
            <div className="col-span-2 flex items-center">
              <span className="text-5xl font-thin text-white tabular-nums flex items-end gap-2">
                <MotionText value={powerText} />
                <span className="text-2xl tracking-tighter">kW</span>
              </span>
            </div>

            {/* Battery */}
            <div className="row-span-2 flex justify-end">
              <Battery height={batteryHeight} color={theme.battery} />
            </div>

            {/* Phases */}
            <div className="col-span-2 text-[11px] space-y-1">
              <PhaseRows phases={phases} />
            </div>

            {/* Footer */}
            <div
              className={`col-span-3 flex justify-between border-t pt-2 text-[10px] ${theme.divider}`}
            >
              <MotionText value={timerText} />
              <span className="opacity-80">
                <MotionText value={powerText} /> kWh
              </span>
              <span>
                <MotionText value={tempText} />
                °C
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
