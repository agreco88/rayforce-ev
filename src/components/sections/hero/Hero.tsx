"use client";

import { HeroIntro } from "./HeroIntro";

export function Hero({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="
        relative isolate overflow-hidden
        border-b border-neutral-900
        h-screen 
      "
    >
      <div className="relative z-20 max-w-7xl mx-auto px-4 h-full">
        <HeroIntro />
      </div>

      {/* Background image */}
      <img
        src="/images/rayforce-hero.webp" // ← your collage image
        alt="Cargadores EV instalados"
        className="
          absolute inset-0
          w-full h-full
          object-cover
          object-center
          z-0
        "
      />

      {/* Dark gradient overlay (critical for readability) */}
      <div
        className="
          absolute inset-0 z-10
          bg-gradient-to-tr
          from-black via-black/80 to-black/20
        "
      />
    </section>
  );
}
