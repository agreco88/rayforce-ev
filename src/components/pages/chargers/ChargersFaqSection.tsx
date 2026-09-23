import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { ChargersFaqContent } from "@/components/pages/chargers/ChargersFaqContent";

/**
 * Cierre de /cargadores: mismo tratamiento visual que HomeClosingSection
 * (fondo + grilla), con las preguntas propias de esta pagina.
 */
export function ChargersFaqSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-neutral-900">
      <GridBackground
        cellSize={64}
        lineOpacity={0.3}
        className="opacity-30"
        maskImage="radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 80%)"
      />

      <ChargersFaqContent />
    </section>
  );
}
