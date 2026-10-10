import { useTranslations } from "next-intl";

/**
 * La foto del hero desktop: arranca en el primer tercio y sigue hasta el borde
 * derecho de la pantalla. Como no cubre todo el ancho, no se estira en
 * pantallas grandes, y el negro de la izquierda le da el contraste al texto.
 */
export function EmpresasHeroBackdrop() {
  const t = useTranslations("EmpresasPage.Hero");

  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 left-1/3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/images/chargers/wallbox-shared-space-building-apartment-complex.webp"
        alt={t("imageAlt")}
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 h-full w-full select-none object-cover object-center"
      />

      {/* La foto es casi toda pared blanca: sin este velo pesaba mas que el titulo */}
      <div className="absolute inset-0 bg-black/25" />
      {/* Cae rapido y despues se estira: el texto que pisa el arranque queda
          sobre casi negro y el cargador izquierdo apenas se oscurece */}
      <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-neutral-950 via-neutral-950/55 via-30% to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent" />
    </div>
  );
}
