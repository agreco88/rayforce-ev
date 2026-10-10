/**
 * Foto de arriba del hero mobile, apilada sobre el contenido en vez de por
 * debajo. Al no haber texto encima no hacen falta overlays de contraste — solo
 * el fade que cierra el borde inferior.
 */
import { useTranslations } from "next-intl";

export function HomeHeroMobileImage() {
  const t = useTranslations("HomePage.Hero");

  return (
    /* `svh` y no `dvh`: con dvh la foto cambia de alto cuando el browser
       esconde la barra al scrollear, y empuja todo lo de abajo */
    <div className="relative h-[54svh] w-full overflow-hidden">
      {/* Mismo asset que el desktop. Al 35% y no arriba del todo: queda algo
          del fondo sobre el cargador sin que el equipo baje tanto */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/images/chargers/cargador-wallbox-rayforce.webp"
        alt={t("imageAlt")}
        fetchPriority="high"
        decoding="sync"
        className="h-full w-full object-cover object-[50%_35%]"
      />

      {/* Cierra el borde contra el fondo de la seccion para que la foto no
          corte con una linea dura */}
      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-neutral-950 to-transparent" />
    </div>
  );
}
