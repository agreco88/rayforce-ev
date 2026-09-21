import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { HomeCostSection } from "@/components/sections/home/cost/HomeCostSection";
import { EnergyTrendSection } from "@/components/sections/home/cost/EnergyTrendSection";

const THEME = {
  accentText: "text-green-400",
};

export function EnergyCostAndTrendSection({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="relative overflow-hidden border-t border-neutral-900 bg-neutral-950"
    >
      <GridBackground
        cellSize={64}
        lineOpacity={0.3}
        className="opacity-30"
        maskImage="radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 80%)"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-24 px-6 py-24 sm:px-8 lg:gap-32 lg:px-16 lg:py-32 2xl:px-0">
        <HomeCostSection theme={THEME} />
        <EnergyTrendSection id="tendencia-precios" />
      </div>
    </section>
  );
}
