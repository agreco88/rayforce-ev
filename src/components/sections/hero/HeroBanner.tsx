import Image from "next/image";
import { HeroIntro } from "./HeroIntro";

type HeroBannerProps = {
  variant?: "default" | "imageOnly";
};

export function HeroBanner({ variant = "default" }: HeroBannerProps) {
  const showIntro = variant === "default";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-neutral-800">
      {/* Background image */}
      <picture>
        {/* Mobile image */}
        <source
          media="(max-width: 767px)"
          srcSet="/images/hero-bg-mobile.webp"
        />

        {/* Desktop image */}
        <img
          src="/images/hero-bg-wide.webp"
          alt="Cargador EV Wallbox instalado"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>

      {/* Image treatments */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-l
          from-black/40
          via-black/40
          to-transparent
        "
      />

      {showIntro && (
        <>
          <div
            className="
              pointer-events-none absolute inset-y-0 right-0 w-full
              bg-linear-to-l from-black via-black/40 to-transparent
            "
          />

          <div className="relative z-10 grid min-h-[420px] lg:min-h-[520px] grid-cols-12 items-center px-6 sm:px-10 lg:px-16">
            <div className="hidden lg:block lg:col-span-5" />
            <div className="lg:col-span-7 pt-20">
              <HeroIntro />
            </div>
          </div>
        </>
      )}

      {!showIntro && <div className="relative z-10 h-[240px] sm:h-[300px]" />}
    </div>
  );
}
