"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { CardCarousel } from "@/components/shared/carousel/CardCarousel";
import type { CatalogTheme } from "@/lib/catalog/catalog.types";
import { cn } from "@/lib/utils";

const INSTALLATIONS = "/assets/images/installations";

// Abre el plano general y despues los detalles. `position`: la de la cochera
// es apaisada y el recorte vertical tiene que quedarse con el wallbox.
const PHOTOS = [
  { key: "edificio-cochera-con-auto", position: "object-[70%_50%]" },
  { key: "edificio-wallbox-tablero-abierto" },
  { key: "edificio-wallbox-detalle" },
  { key: "edificio-tablero-termica-abb" },
  { key: "casa-wallbox-cargando" },
  { key: "casa-wallbox-y-tablero" },
];

type Props = {
  theme: CatalogTheme;
};

/** Fotos de instalaciones reales, todas de BC: la pagina la monta solo en los
 *  que traen cable integrado. */
export function InstallationsSection({ theme }: Props) {
  const t = useTranslations("ChargerModelPage.Installations");

  return (
    // Sin `pt` en mobile: viene despues de las reseñas, con el mismo fondo, y
    // su `pb` ya separa.
    <section className="bg-neutral-950 px-6 pb-24 lg:px-16 lg:pb-32">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-3xl sm:text-center"
        >
          <span className={cn("section-eyebrow", theme.accentText)}>
            {t("eyebrow")}
          </span>
          <h2 className="section-title mt-4">{t("title")}</h2>
          <p className="mx-auto mt-6 max-w-2xl section-subtitle">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* `-mx-6`: en mobile el carousel va a sangre para que asome la
            siguiente. `@container`: los items no toman ancho del carousel. */}
        <div className="@container -mx-6 mt-12 sm:mt-20 lg:mx-0 lg:overflow-x-clip">
          {/* Desktop: el carousel mide una foto (+ su `px-5`) y va centrado;
              las vecinas se ven por el `overflow`. Asi cada pagina es una foto
              y avanza hasta que la ultima queda en el medio. */}
          <div className="lg:mx-auto lg:w-[calc(30cqw+40px)]">
            <CardCarousel
              autoplay={5}
              theme={theme}
              items={PHOTOS.map(({ key, position }) => (
                <div
                  key={key}
                  className="relative aspect-[3/4] w-[75cqw] overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 lg:w-[30cqw]"
                >
                  <Image
                    src={`${INSTALLATIONS}/${key}.jpg`}
                    alt={t(`imageAlt.${key}`)}
                    fill
                    draggable={false}
                    sizes="(max-width: 1024px) 75vw, 30vw"
                    className={cn("object-cover", position)}
                  />
                </div>
              ))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
