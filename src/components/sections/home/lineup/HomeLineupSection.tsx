import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { HomeLineupDesktop } from "./HomeLineupDesktop";
import { HomeLineupMobile } from "./HomeLineupMobile";
import { HomeLineupUtePower } from "./HomeLineupUtePower";

/**
 * El lineup de wallboxes, primero despues del hero: los modelos, los consejos
 * para elegir y el aumento de potencia con UTE. "Por que un wallbox" viene despues.
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

      {/* Una sola vez y fuera del corte desktop/mobile: el CTA del hero apunta
          a su ancla, y duplicado el navegador elige la copia oculta. El `px`
          sigue al de cada layout (en celular la tarjeta va a sangre); el ancho
          es el de compatibilidad, porque a 1600 las lineas de texto quedaban
          demasiado largas. */}
      <div className="relative z-10 mx-auto w-full max-w-6xl pb-14 sm:px-8 xl:pb-20">
        <HomeLineupUtePower id="aumento-de-potencia" />
      </div>
    </section>
  );
}
