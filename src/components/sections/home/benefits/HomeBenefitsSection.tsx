import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { HomeBenefitsDesktop } from "./HomeBenefitsDesktop";
import { HomeBenefitsMobile } from "./HomeBenefitsMobile";

type Props = {
  id?: string;
};

export function HomeBenefitsSection({ id }: Props) {
  return (
    <section
      id={id}
      className="
        relative
        overflow-hidden
      "
    >
      <GridBackground cellSize={24} lineOpacity={0.1} />

      <div
        className="
          relative z-10
          mb-32
          h-[2px]
          w-full
          bg-gradient-to-r
          from-transparent
          via-green-950
          to-transparent
        "
      />

      <div className="relative z-10">
        <div className="hidden lg:block">
          <HomeBenefitsDesktop />
        </div>
        <div className="lg:hidden">
          <HomeBenefitsMobile />
        </div>
      </div>
    </section>
  );
}
