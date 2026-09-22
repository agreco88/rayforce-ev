import { PublicChargingCableDesktop } from "./PublicChargingCableDesktop";
import { PublicChargingCableMobile } from "./PublicChargingCableMobile";

type Props = {
  id?: string;
};

export function PublicChargingCableSection({ id }: Props) {
  return (
    <section id={id} className="border-y border-neutral-800 bg-neutral-950">
      {/* El corte va en `md` (768px) y no en `lg`: entre 768 y 1023px la
          variante mobile apilaba el precio sobre los CTAs, y desde tablet ya
          hay ancho de sobra para la fila. La de desktop adapta sus tamaños
          hacia abajo en vez de mantener el layout de 1280px. */}
      <div className="hidden md:block">
        <PublicChargingCableDesktop />
      </div>
      <div className="md:hidden">
        <PublicChargingCableMobile />
      </div>
    </section>
  );
}
