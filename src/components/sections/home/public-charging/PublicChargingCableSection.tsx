import { PublicChargingCableDesktop } from "./PublicChargingCableDesktop";
import { PublicChargingCableMobile } from "./PublicChargingCableMobile";

type Props = {
  id?: string;
};

export function PublicChargingCableSection({ id }: Props) {
  return (
    <section id={id} className="border-y border-neutral-800 bg-neutral-950">
      <div className="hidden lg:block">
        <PublicChargingCableDesktop />
      </div>
      <div className="lg:hidden">
        <PublicChargingCableMobile />
      </div>
    </section>
  );
}
