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
        border-y border-neutral-900
        bg-neutral-950
      "
    >
      <div className="hidden lg:block">
        <HomeStandDesktop />
      </div>
      <div className="lg:hidden">
        <HomeStandMobile />
      </div>
    </section>
  );
}
