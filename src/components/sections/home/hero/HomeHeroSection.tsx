import { HomeHeroDesktop } from "./HomeHeroDesktop";
import { HomeHeroMobile } from "./HomeHeroMobile";

type Props = {
  id?: string;
};

export function HomeHeroSection({ id }: Props) {
  return (
    <>
      <div className="hidden lg:block">
        <HomeHeroDesktop id={id} />
      </div>
      <div className="lg:hidden">
        <HomeHeroMobile id={id} />
      </div>
    </>
  );
}
