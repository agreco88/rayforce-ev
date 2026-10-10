import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

import {
  Accordion,
  AccordionContentAnimated,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { UtePowerChannels } from "./UtePowerChannels";

const strong = (chunks: ReactNode) => (
  <strong className="font-medium text-white">{chunks}</strong>
);

/**
 * El cierre del lineup: el aumento de potencia con UTE, con el copy tal cual lo
 * paso el cliente. En desktop, a la izquierda como funciona y como se pide y a
 * la derecha por donde; apilado, los tres van en acordeon. El disclaimer va
 * afuera de la tarjeta.
 */
export function HomeLineupUtePower({
  id,
  className,
}: {
  id?: string;
  className?: string;
}) {
  const t = useTranslations("HomePage.Lineup.utePower");

  const blocks = [
    { key: "howItWorks", content: <UteParagraphs block="howItWorks" /> },
    { key: "request", content: <UteParagraphs block="request" /> },
    { key: "channels", content: <UtePowerChannels /> },
  ];

  return (
    // `scroll-mt-24`: el CTA del hero ancla aca y el header fijo lo tapaba.
    <div id={id} className={cn("scroll-mt-24", className)}>
      {/* En celular va a sangre: margen + borde + padding se comian ~37px por
          lado. El `px-6` de adentro es el gutter del resto de la pagina. */}
      <div className="overflow-hidden border-y border-white/10 bg-white/[0.02] sm:rounded-2xl sm:border">
        <div className="flex items-center gap-4 border-b border-white/10 bg-white/[0.02] p-6 sm:gap-8 sm:p-8 lg:p-10">
          {/* Version blanca sobre transparente al 60%: el original tiene fondo
              blanco y encandilaba. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/partners/logo-ute-white.webp"
            alt="UTE"
            width={468}
            height={214}
            loading="lazy"
            decoding="async"
            className="h-7 w-auto shrink-0 opacity-60 sm:h-10 lg:h-12"
          />

          <div className="border-l border-white/10 pl-4 sm:pl-8">
            <h3 className="text-xl leading-snug font-light normal-case tracking-tight text-balance text-white sm:text-2xl lg:text-3xl">
              {t("title")}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-neutral-400 lg:text-base">
              {t("subtitle")}
            </p>
          </div>
        </div>

        <Accordion type="multiple" className="lg:hidden">
          {blocks.map(({ key, content }) => (
            <AccordionItem
              key={key}
              value={key}
              className="border-b border-white/10 last:border-b-0"
            >
              {/* Radix envuelve el trigger en un `h3`, y el reset global de
                  `h3` lo pondria en mayuscula y verde. */}
              <AccordionTrigger className="items-center px-6 py-5 text-base font-medium normal-case tracking-normal text-white hover:no-underline sm:px-8">
                {t(`${key}.title`)}
              </AccordionTrigger>
              <AccordionContentAnimated className="px-6 pb-6 sm:px-8">
                {content}
              </AccordionContentAnimated>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="hidden divide-x divide-white/10 lg:grid lg:grid-cols-2">
          <div className="p-10">
            <h4 className="text-lg font-medium text-white">
              {t("howItWorks.title")}
            </h4>
            <UteParagraphs block="howItWorks" className="mt-4" />

            <h4 className="mt-10 text-lg font-medium text-white">
              {t("request.title")}
            </h4>
            <UteParagraphs block="request" className="mt-4" />
          </div>

          <div className="flex flex-col p-10">
            <h4 className="text-lg font-medium text-white">
              {t("channels.title")}
            </h4>
            <UtePowerChannels className="mt-5 flex-1" />
          </div>
        </div>
      </div>

      <p className="mx-auto mt-6 text-xs px-1 text-[11px] sm:max-w-2xl text-center sm:text-xs leading-relaxed text-balance text-neutral-500 sm:px-0">
        {t("footnote")}
      </p>
    </div>
  );
}

/** Los parrafos de un bloque, compartidos entre el acordeon y la grilla. */
function UteParagraphs({
  block,
  className,
}: {
  block: "howItWorks" | "request";
  className?: string;
}) {
  const t = useTranslations("HomePage.Lineup.utePower");
  const paragraphs = t.raw(`${block}.description`) as string[];

  return (
    // La tipografia va en cada `<p>` y no en el contenedor: el reset global
    // de `p` pisa lo heredado.
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Por indice y no con el texto de `raw`: los parrafos traen los tags
          `<strong>` de las tres cosas que definen la carga. */}
      {paragraphs.map((_, index) => (
        <p
          key={index}
          className="text-sm leading-relaxed text-neutral-400 lg:text-base"
        >
          {t.rich(`${block}.description.${index}`, { strong })}
        </p>
      ))}
    </div>
  );
}
