import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { HomeFaqContent } from "@/components/sections/home/faq/HomeFaqContent";

type Props = {
  faqId?: string;
};

/**
 * Las preguntas frecuentes de la home, con el fondo y la grilla que antes
 * compartían con la compatibilidad —que ahora vive arriba del CTA del footer—.
 */
export function HomeClosingSection({ faqId }: Props) {
  // `neutral-900` y no `neutral-950`: el footer también es 950, así que con el
  // mismo valor el cierre y el footer se leían como una sola mancha negra. Un
  // escalón más claro deja al footer como el fondo del final.
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-neutral-900">
      <GridBackground
        cellSize={64}
        lineOpacity={0.3}
        className="opacity-30"
        maskImage="radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 80%)"
      />

      <div id={faqId} className="relative scroll-mt-24">
        <HomeFaqContent />
      </div>
    </section>
  );
}
