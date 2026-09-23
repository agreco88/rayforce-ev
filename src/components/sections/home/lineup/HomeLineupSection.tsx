import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { HomeLineupDesktop } from "./HomeLineupDesktop";
import { HomeLineupMobile } from "./HomeLineupMobile";

/**
 * El lineup de wallboxes, entre "que es un wallbox" y la columna: la seccion
 * anterior explica por que conviene uno, esta muestra cuales hay.
 *
 * El corte desktop/mobile es `xl` y no `lg`: en `HomeLineupDesktop` las cuatro
 * columnas son fijas, y abajo de 1280 la tarjeta queda en ~220px con el copy
 * desarmado en cinco lineas. `HomeLineupMobile` tiene su propia grilla de 2
 * columnas con una tarjeta mas chica.
 */
export function HomeLineupSection({ id }: { id?: string }) {
  return (
    <section
      id={id}
      aria-labelledby="home-lineup-heading"
      className="relative overflow-hidden border-t border-neutral-900 bg-neutral-950"
    >
      <GridBackground
        cellSize={64}
        lineOpacity={0.3}
        className="opacity-30"
        maskImage="radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 80%)"
      />

      {/* Glow verde arriba a la izquierda: las planchas blancas de las fichas
          de producto contra el negro plano cortaban demasiado, el degradado
          levanta el fondo donde entra la grilla. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(74,222,128,0.10), transparent 55%)",
        }}
      />

      <div className="relative z-10 hidden xl:block">
        <HomeLineupDesktop />
      </div>
      <div className="relative z-10 xl:hidden">
        <HomeLineupMobile />
      </div>
    </section>
  );
}
