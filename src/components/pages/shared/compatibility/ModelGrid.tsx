"use client";

import { useEffect, useRef, useState } from "react";
import { stagger } from "motion";
import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTrack } from "@/lib/analytics";

import type { Brand } from "./compatibility.data";
import type { Theme } from "./compatibility.theme";

// OJO: no es el `WHATSAPP_NUMBER` de `lib/whatsapp.ts`, que tiene un 0 de más
// (598092041709). Éste es el que ya usaba esta sección y el que coincide con el
// `telephone` del schema en `layout.tsx`. Los dos conviven en el repo: unificar
// es su propia tarea, acá se conserva el que estaba para no romper los links.
const WHATSAPP_NUMBER = "59892041709";

type Props = {
  brand: Brand | undefined;
  ui: Theme;
};

// La cascada de pills no vive en `animation-variants`: es la única que corre al
// cambiar de estado y no al entrar en viewport, y su stagger se acorta según
// cuántos modelos tenga la marca (ver `staggerFor`).
const gridVariants: Variants = {
  hidden: {},
  show: (count: number) => ({
    transition: { delayChildren: stagger(staggerFor(count)) },
  }),
};

const pillVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

/**
 * BYD tiene 11 modelos y otras marcas tienen 1: con un stagger fijo la cascada
 * de BYD duraría casi un segundo. Se reparte el mismo presupuesto (~0.35s)
 * entre los que haya, con un techo para que 1 o 2 modelos no aparezcan de golpe.
 */
function staggerFor(count: number) {
  return Math.min(0.06, 0.35 / Math.max(count, 1));
}

/**
 * Los modelos de la marca elegida, cada uno como un link a WhatsApp con el
 * modelo ya escrito en el mensaje.
 *
 * El contenedor anima su alto al cambiar de marca para que la sección no pegue
 * un salto: marcas con 11 modelos y marcas con 1 conviven en el mismo lugar.
 */
export function ModelGrid({ brand, ui }: Props) {
  const t = useTranslations("HomePage.CompatibilitySection");
  const track = useTrack();

  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      setHeight(
        entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height,
      );
    });
    observer.observe(node);
    setHeight(node.getBoundingClientRect().height);

    return () => observer.disconnect();
  }, [brand]);

  function handleModelClick(brandName: string, model: string) {
    track.compatibilityModelSelected(brandName, model);
    track.whatsappClick({
      source: "compatibility_model",
      vehicle_brand: brandName,
      vehicle_model: model,
    });
  }

  return (
    <motion.div
      animate={{ height }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      {brand && (
        <div ref={contentRef}>
          <p className="text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
            {t("modelsLabel", { brand: brand.name })}
          </p>

          {/* `key` por marca: remonta la grilla, y con eso la cascada vuelve a
              correr en cada cambio en vez de una sola vez al montar. */}
          <motion.div
            key={brand.name}
            variants={gridVariants}
            custom={brand.models.length}
            initial="hidden"
            animate="show"
            className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3"
          >
            {brand.models.map((model) => (
              <motion.a
                key={model}
                variants={pillVariants}
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  t("whatsapp.message", { model }),
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleModelClick(brand.name, model)}
                className="
                  flex items-center justify-center gap-1.5
                  rounded-lg border border-white/10 bg-white/[0.03]
                  px-4 py-2 text-sm text-neutral-300
                  transition-colors duration-200
                  hover:border-white/20 hover:bg-white/5 hover:text-white
                "
              >
                <CheckIcon className={cn("size-3.5 shrink-0", ui.accentText)} />
                <span className="truncate">{model}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
