/**
 * Foto de fondo del hero desktop, capeada a 1440px en vez de estirarse a todo
 * el viewport, que en un 4K obligaba a escalar la foto por encima de su
 * resolucion y se veia pixelada. Va mas ancha que el carril de 1280 del texto
 * a proposito: el titulo tiene que caer sobre la foto, no contra su borde.
 *
 * Lo que queda a los costados es el negro de la seccion, disimulado con un fade
 * en cada borde para que no se lea como barras.
 *
 * Dos versiones de la misma foto: la normal (~1980px) alcanza hasta 1440px de
 * contenedor, y la -2x (3200px) entra recien en 2xl, donde suele haber cable.
 */
import { useTranslations } from "next-intl";

export function HomeHeroBackdrop() {
  const t = useTranslations("HomePage.Hero");

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* La foto y sus overlays comparten este contenedor, asi los gradientes
          siguen midiendose contra la imagen y no contra el viewport */}
      <div className="relative mx-auto h-full w-full max-w-[1440px]">
        {/* El corte va por viewport (media) y no por srcset: con srcset el
            browser suma el DPR y un laptop retina de 1440px se bajaria igual la
            version grande, que es lo que queremos evitar en conexiones moviles */}
        <picture>
          <source media="(min-width: 1536px)" srcSet="/images/brand/rayforce-hero-3-2x.webp" />
          <img
            src="/images/brand/rayforce-hero-3.webp"
            alt={t("imageAlt")}
            fetchPriority="high"
            decoding="sync"
            className="absolute inset-0 h-full w-full select-none object-cover object-center"
          />
        </picture>

        {/* Contraste del texto: diagonal, porque el pasto iluminado que se come
            la lectura está abajo a la izquierda, no en toda la columna */}
        <div className="absolute inset-0 bg-gradient-to-br from-black from-0% via-transparent via-50% to-transparent" />

        {/* Refuerzo lateral: la diagonal deja flojo el borde superior izquierdo */}
        <div className="absolute inset-y-0 left-0 w-[52%] bg-gradient-to-r from-black/55 from-0% via-black/20 via-55% to-transparent" />

        {/* Viñeta con el núcleo sobre el cargador: una sola fuente de luz.
            El 66% es el punto medio de dónde cae el equipo al recortar; la
            elipse es alta porque el cargador lo es */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_85%_at_66%_42%,transparent_15%,rgba(0,0,0,0.45)_45%,rgba(0,0,0,0.8)_80%,rgba(0,0,0,0.9)_100%)]" />

        {/* Fade contra el negro de la seccion en cada borde. Van por dentro de
            la foto (no por fuera) para que el corte nunca quede duro, incluso
            cuando el viewport mide justo 1600px y no hay negro a los costados */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent" />
      </div>
    </div>
  );
}
