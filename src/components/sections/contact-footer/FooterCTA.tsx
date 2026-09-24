"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { CHIP_CTA_CLASS } from "@/components/layout/header/nav-chip";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";
import { useTrack } from "@/lib/analytics";
import { buildWhatsAppHref } from "@/lib/whatsapp";

type Props = {
  /** Namespace con `eyebrow`, `title`, `description`, `button` y `whatsappMessage`. */
  namespace: string;
  /** Para distinguir en analytics desde que ruta salio el click. */
  source: string;
  /** Color del eyebrow y del boton. Sin esto va el verde de marca. */
  accentText?: string;
  accentBg?: string;
  accentHover?: string;
};

export function FooterCTA({
  namespace,
  source,
  accentText,
  accentBg = "bg-[#25D366]",
  accentHover = "hover:bg-[#1EBE5B]",
}: Props) {
  const t = useTranslations(namespace);
  const track = useTrack();

  return (
    <div
      id="contacto"
      className="relative mx-auto max-w-2xl py-24 text-center lg:py-36"
    >
      {/* Sin `accentText` se queda con el verde que le da el reset global. */}
      <h3 className={accentText}>{t("eyebrow")}</h3>

      {/* La marca reemplaza al titulo en todas las rutas: sigue siendo el h2 de
          la seccion, con el texto de `title` como `alt` para que el screen
          reader lea el mensaje propio de cada pagina. */}
      <h2 className="my-8!">
        {/* `invert saturate-0`: el archivo es negro, como en el header.
            El fuente es de 500x80: mostrarlo a 320px deja margen para
            pantallas 2x sin que se vea blando. Con un SVG esto no haria falta. */}
        <Image
          src="/images/brand/rayforce-logo.webp"
          alt={t("title")}
          width={500}
          height={80}
          quality={100}
          className="mx-auto h-auto w-full max-w-[320px] invert saturate-0"
        />
      </h2>

      <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-neutral-400">
        {t("description")}
      </p>

      <div className="mt-8 flex justify-center">
        {/* El chip del navbar, que era el unico CTA solido del sitio: ahora que
            el header no lo lleva, este es el que cierra toda pagina. Va con el
            color de la ruta en vez del verde fijo. */}
        <a
          href={buildWhatsAppHref(t("whatsappMessage"))}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track.whatsappClick({ source })}
          className={cn(CHIP_CTA_CLASS, accentBg, accentHover)}
        >
          <FaWhatsapp className="size-4" />
          {t("button")}
        </a>
      </div>
    </div>
  );
}
