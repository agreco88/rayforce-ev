import Image from "next/image";
import { HeroIntro } from "./HeroIntro";

type HeroBannerProps = {
  variant?: "default" | "imageOnly";
};

export function HeroBanner({ variant = "default" }: HeroBannerProps) {
  const showIntro = variant === "default";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-neutral-800">
      {showIntro && <HeroIntro />}
    </div>
  );
}
