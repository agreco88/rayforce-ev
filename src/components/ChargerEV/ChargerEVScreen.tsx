"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export function ChargerEVScreen() {
  const power = useMotionValue<number>(22);
  const temp = useMotionValue<number>(23.5);
  const timer = useMotionValue<number>(0);
  const battery = useMotionValue<number>(40);

  useEffect(() => {
    const controls = [
      animate(power, [22, 21.6, 22.3, 22.0], {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }),
      animate(temp, [23.5, 24.2, 23.0, 23.7], {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }),
      animate(battery, [40, 60, 80, 100], {
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }),
      animate(timer, 9999, { duration: 9999, ease: "linear" }),
    ];
    return () => controls.forEach((c) => c.stop());
  }, [power, temp, battery, timer]);

  const powerText = useTransform(power, (v) => v.toFixed(1));
  const tempText = useTransform(temp, (v) => v.toFixed(1));
  const timerText = useTransform(timer, (v) => {
    const total = Math.floor(v);
    const mins = Math.floor(total / 60)
      .toString()
      .padStart(2, "0");
    const secs = (total % 60).toString().padStart(2, "0");
    return `00:${mins}:${secs}`;
  });
  const batteryHeight = useTransform(battery, (v) => `${v}%`);

  return (
    <div className="overflow-hidden pt-3 rounded-md border border-blue-500 bg-linear-to-b from-sky-300 via-blue-700 to-blue-950 text-[12px] text-blue-100 shadow-inner">
      {/* Header */}

      {/* Grid Body */}
      <div className="grid grid-cols-3 grid-rows-[auto_auto_auto] gap-x-2 gap-y-1 px-3 py-2 text-[11px] text-blue-200">
        {/* --- Row 1 --- */}
        <div className="col-span-2 row-span-1 flex flex-col justify-center">
          <motion.span className="px-0 py-1 flex items-center text-[45px] leading-none text-white">
            <span className="inline-block w-[3ch] text-right tabular-nums">
              <motion.span>{powerText}</motion.span>
            </span>
            <span className="ml-5 w-full text-[18px] text-blue-300">kW</span>
          </motion.span>
        </div>

        {/* Battery graphic (takes right 1/3, spans 2 rows) */}
        <div className="row-span-2 flex justify-end">
          <div className="relative flex h-full w-9 items-end justify-end overflow-hidden rounded-sm border-2 border-blue-300">
            <motion.div
              style={{ height: batteryHeight }}
              className="absolute bottom-0 left-0 w-full bg-green-500/90"
            />
            <div className="absolute -top-1.5 left-1/2 h-1 w-3 -translate-x-1/2 bg-blue-300" />
          </div>
        </div>

        {/* --- Row 2: Phase data (L1/L2/L3) --- */}
        <div className="col-span-2 flex flex-col justify-center gap-0.5 text-[11px]">
          <div className="flex items-center gap-2 text-sky-400">
            <div className="h-2.5 w-2.5 bg-sky-400" />
            <span>L1: 220 V</span>
            <span className="ml-auto">0.00 A</span>
          </div>
          <div className="flex items-center gap-2 text-green-500">
            <div className="h-2.5 w-2.5 bg-green-400" />
            <span>L2: 220 V</span>
            <span className="ml-auto">0.00 A</span>
          </div>

          <div className="flex items-center gap-2 text-yellow-500">
            <div className="h-2.5 w-2.5 bg-yellow-400" />
            <span>L3: 220 V</span>
            <span className="ml-auto">0.00 A</span>
          </div>
        </div>

        {/* --- Row 3: Footer metrics --- */}
        <div className="col-span-3 mt-1 flex justify-between border-t border-blue-800 pt-2 text-[11px] text-blue-100">
          <motion.span>{timerText}</motion.span>
          <span>0.00 kWh</span>
          <motion.span>{tempText.get()}°C</motion.span>
        </div>
      </div>
    </div>
  );
}
