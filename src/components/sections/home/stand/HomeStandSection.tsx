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
        border-y border-neutral-800
        bg-neutral-900
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
