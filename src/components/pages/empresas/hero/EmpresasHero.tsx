import { EmpresasHeroDesktop } from "./EmpresasHeroDesktop";
import { EmpresasHeroMobile } from "./EmpresasHeroMobile";

/** Desktop: texto sobre negro a la izquierda y la foto del garaje en los dos
 * tercios de la derecha.
 * Mobile: el mismo armado que el de la home (`HomeHeroMobile`). */
export function EmpresasHero() {
  return (
    <>
      <div className="hidden lg:block">
        <EmpresasHeroDesktop />
      </div>
      <div className="lg:hidden">
        <EmpresasHeroMobile />
      </div>
    </>
  );
}
