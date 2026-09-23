"use client";

import Image from "next/image";

import { AppButton } from "@/components/ui/wrappers/AppButton";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa6";
import { useTrack } from "@/lib/analytics";
import { buildWhatsAppHref } from "@/lib/whatsapp";

type Props = {
  /** Namespace con `eyebrow`, `title`, `description`, `button` y `whatsappMessage`. */
  namespace: string;
  /** Para distinguir en analytics desde que ruta salio el click. */
  source: string;
};

export function FooterCTA({ namespace, source }: Props) {
  const t = useTranslations(namespace);
  const track = useTrack();

  return (
    <div
      id="contacto"
      className="relative mx-auto max-w-2xl py-24 text-center lg:py-36"
    >
      <h3>{t("eyebrow")}</h3>

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
        {/* El verde sólido del CTA principal (mismo que `ChargerModelHeroCTA`).
            Los `!` pisan el outline verde que `AppButton` trae por defecto. */}
        <AppButton
          href={buildWhatsAppHref(t("whatsappMessage"))}
          external
          className="group border-transparent! bg-green-500! px-6 py-6 font-medium text-black! shadow-lg shadow-green-500/20 hover:bg-green-400! hover:text-black! hover:shadow-green-500/30"
          icon={<FaWhatsapp className="ml-1 size-4" />}
          track={() => track.whatsappClick({ source })}
        >
          {t("button")}
        </AppButton>
      </div>
    </div>
  );
}
