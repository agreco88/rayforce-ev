"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animation-variants";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import SectionWrapper from "../layout/section-wrapper";
import LogoLoop from "../logo-loop";
import { techLogos } from "@/lib/stack-logos";

export default function LogoLoopSection() {
  return (
    <SectionWrapper className="relative py-24 sm:py-32 text-center flex flex-col gap-16">
      <motion.h2
        variants={fadeInUp(0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
      >
        Our technology stack
      </motion.h2>

      <LogoLoop
        logos={techLogos}
        speed={20}
        direction="left"
        logoHeight={48}
        gap={60}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#000"
        ariaLabel="Technology stack"
      />

      <motion.div
        variants={fadeInUp(0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Button size="lg" variant="outline" asChild>
          <Link href="/contact-us">Contact Us</Link>
        </Button>
      </motion.div>
    </SectionWrapper>
  );
}
