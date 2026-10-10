/**
 * Foto de arriba del hero mobile, apilada sobre el contenido en vez de por
 * debajo. Al no haber texto encima no hacen falta overlays de contraste — solo
 * el fade que cierra el borde inferior.
 */
import { useTranslations } from "next-intl";
import { preload } from "react-dom";

import { EMPTY_IMAGE } from "@/lib/utils";

const SRC = "/assets/images/chargers/cargador-wallbox-rayforce.webp";

export function HomeHeroMobileImage() {
  const t = useTranslations("HomePage.Hero");

  // Dentro de un `<picture>` React deja de precargarla solo. Es el LCP: el
  // preload la pide desde los headers, y el `media` lo limita a mobile
  preload(SRC, { as: "image", fetchPriority: "high", media: "(max-width: 1023px)" });

  return (
    /* `svh` y no `dvh`: con dvh la foto cambia de alto cuando el browser
       esconde la barra al scrollear, y empuja todo lo de abajo */
    <div className="relative h-[54svh] w-full overflow-hidden">
      <picture>
        {/* Desde `lg` el hero mobile esta oculto: sin esto el desktop bajaba
            esta foto ademas de la suya */}
        <source media="(min-width: 1024px)" srcSet={EMPTY_IMAGE} />
        {/* Al 35% y no arriba del todo: queda algo del fondo sobre el cargador
            sin que el equipo baje tanto */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SRC}
          alt={t("imageAlt")}
          fetchPriority="high"
          decoding="sync"
          className="h-full w-full object-cover object-[50%_35%]"
        />
      </picture>

      {/* Cierra el borde contra el fondo de la seccion para que la foto no
          corte con una linea dura */}
      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-neutral-950 to-transparent" />
    </div>
  );
}
