"use client";

import { HeroEnergyBackground } from "@/components/AnimatedGridBackground";
import { HeroIntro } from "./HeroIntro";
import { HeroBanner } from "./HeroBanner";
import { HeroFeatureCardsSection } from "./HeroFeatureCardsSection";
import Container from "@/components/layout/container";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-neutral-900 pt-48 pb-32">
      {/* Ambient vignette */}
      <div
        className="
          absolute inset-0 -z-10
          bg-radial-[at_50%_30%]
          from-neutral-400/12
          via-neutral-500/6
          to-neutral-950
        "
      />

      <HeroEnergyBackground />

      <Container className="max-w-[88rem] relative">
        {/* HERO GRID */}
        <div className="space-y-16">
          {/* Banner row */}
          <div>
            {/* Mobile */}
            <div className="md:hidden space-y-12">
              <HeroIntro />
              <HeroBanner variant="imageOnly" />
            </div>

            {/* Desktop */}
            <div className="hidden md:block">
              <HeroBanner />
            </div>
          </div>

          {/* Feature cards row (still inside hero) */}
          <HeroFeatureCardsSection />
        </div>
      </Container>
    </section>
  );
}
