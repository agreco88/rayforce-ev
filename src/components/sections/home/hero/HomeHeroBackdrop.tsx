/**
 * Foto de fondo del hero desktop, a ancho completo del viewport (no del
 * contenedor de 1440px, para que no queden barras a los costados).
 *
 * Encima van tres capas que no se pisan: una oscurece la columna del texto,
 * otra ilumina el cargador, la última cierra el borde derecho.
 */
export function HomeHeroBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="relative h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/brand/rayforce-hero-3.webp"
          alt="Cargador EV Rayforce"
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 h-full w-full select-none object-cover object-center"
        />

        {/* Contraste del texto: diagonal, porque el pasto iluminado que se come
            la lectura está abajo a la izquierda, no en toda la columna */}
        <div className="absolute inset-0 bg-gradient-to-br from-black from-0% via-transparent via-50% to-transparent" />

        {/* Refuerzo lateral: la diagonal deja flojo el borde superior izquierdo */}
        <div className="absolute inset-y-0 left-0 w-[52%] bg-gradient-to-r from-black/55 from-0% via-black/20 via-55% to-transparent" />

        {/* Viñeta con el núcleo sobre el cargador: una sola fuente de luz.
            El 66% es el punto medio de dónde cae el equipo al recortar (~63% a
            1920px, ~68% a 1280px); la elipse es alta porque el cargador lo es */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_85%_at_66%_42%,transparent_15%,rgba(0,0,0,0.45)_45%,rgba(0,0,0,0.8)_80%,rgba(0,0,0,0.9)_100%)]" />

        {/* Cierre del borde derecho, solo para pantallas muy anchas */}
        <div className="absolute inset-y-0 right-0 w-[18%] bg-gradient-to-r from-transparent to-black to-95%" />
      </div>
    </div>
  );
}
