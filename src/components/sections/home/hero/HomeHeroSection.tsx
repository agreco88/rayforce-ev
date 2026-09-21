import { HomeHeroDesktop } from "./HomeHeroDesktop";
import { HomeHeroMobile } from "./HomeHeroMobile";
import { HomeHeroTrustBand } from "./HomeHeroTrustBand";

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
        {/*
          Las señales de confianza van fuera del hero solo en mobile: adentro
          empujan los CTA fuera del fold. En desktop siguen dentro del hero,
          donde la media columna les da lugar.
        */}
        <HomeHeroTrustBand />
      </div>
    </>
  );
}
