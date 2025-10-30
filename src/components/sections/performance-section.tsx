"use client";

import { motion } from "framer-motion";
import CircularProgress from "../circular-progress";

const metrics = [
  { label: "Performance", color: "#22c55e" },
  { label: "Accessibility", color: "#10b981" },
  { label: "Good practices", color: "#10b981" },
  { label: "SEO", color: "#10b981" },
];

export default function PerformanceSection() {
  return (
    <section className="relative bg-gradient-to-bl from-neutral-800 via-neutral-900 to-neutral-950 py-24 rounded-3xl text-center border border-neutral-800">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-semibold text-white"
        >
          Take your performance to another level
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          We build blazing-fast, accessible websites optimized for SEO and
          performance — the kind that Lighthouse loves.
        </motion.p>

        <div className="w-full h-0.5 rounded bg-neutral-800 my-16"></div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-12 justify-items-center">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <CircularProgress label={m.label} color={m.color} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
