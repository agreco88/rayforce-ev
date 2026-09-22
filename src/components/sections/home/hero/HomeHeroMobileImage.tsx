/**
 * Mitad de arriba del hero mobile: la foto, apilada sobre el contenido en vez
 * de por debajo. Al no haber texto encima no hacen falta overlays de
 * contraste — solo el fade que cierra el borde inferior.
 */
export function HomeHeroMobileImage() {
  return (
    <div className="relative w-full flex-1 basis-0 min-h-[12rem] overflow-hidden">
      {/* Mismo asset que el desktop. El encuadre en 65% horizontal es donde
          esta el cargador en el archivo (va de 61% a 71%) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/brand/rayforce-hero-3.webp"
        alt="Cargador EV Rayforce"
        fetchPriority="high"
        decoding="sync"
        className="h-full w-full object-cover object-[65%_42%]"
      />

      {/* Cierra el borde contra el fondo de la seccion para que la foto no
          corte con una linea dura */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent" />
    </div>
  );
}
