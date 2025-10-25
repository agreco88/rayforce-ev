"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animation-variants";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function ContactSection() {
  return (
    <section className="relative py-24 sm:py-32 text-center">
      <motion.h2
        variants={fadeInUp(0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
      >
        Let’s build something together
      </motion.h2>

      <motion.p
        variants={fadeInUp(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground"
      >
        Whether you need a new website, infrastructure solution, or consultation
        — we’re here to help.
      </motion.p>

      <motion.div
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-10"
      >
        <Button size="lg" asChild>
          <Link href="/contact-us">Contact Us</Link>
        </Button>
      </motion.div>
    </section>
  );
}
