import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { HomeStandMobile } from "./HomeStandMobile";
import { HomeStandDesktop } from "./HomeStandDesktop";

type Props = {
  id?: string;
};

export function HomeStandSection({ id }: Props) {
  return (
    <section
      id={id}
      className="
        relative overflow-hidden
        border-y border-neutral-800
        bg-neutral-900
      "
    >
      <GridBackground
        cellSize={64}
        lineOpacity={0.3}
        className="opacity-30"
        maskImage="radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 80%)"
      />

      <div className="hidden lg:block">
        <HomeStandDesktop />
      </div>
      <div className="lg:hidden">
        <HomeStandMobile />
      </div>
    </section>
  );
}
