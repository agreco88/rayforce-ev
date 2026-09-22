"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { motion, MotionConfig } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useTrack } from "@/lib/analytics";

export type FaqItem = { title: string; answer: string };

/**
 * Lista de preguntas. Desktop y mobile montan este mismo componente: lo único
 * que cambia entre los dos es el layout de alrededor, no el acordeón.
 *
 * Basado en el ejemplo oficial "Radix: Accordion" de Motion
 * (examples.motion.dev/react/radix-accordion), del que conserva el blur-in del
 * texto. No usa el `Accordion` de shadcn porque ése colapsa por CSS keyframes:
 * no interpola el alto real ni se puede interrumpir a mitad de camino.
 *
 * Una sola abierta a la vez: abrir la siguiente cierra la anterior, así la
 * sección no crece y el scroll no salta mientras se leen las respuestas.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openValue, setOpenValue] = useState("");
  const track = useTrack();

  const handleValueChange = (value: string) => {
    setOpenValue(value);
    if (!value) return;
    const index = Number(value.replace("faq-", ""));
    track.faqItemExpanded("general", items[index].title, index);
  };

  // Tween y no spring: un spring con bounce pasa el alto final y vuelve, y en
  // un panel de texto ese rebote se lee como que el acordeón sigue moviéndose
  // después de haber terminado. Este easing llega y se queda.
  return (
    <MotionConfig transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
      <Accordion.Root
        type="single"
        collapsible
        value={openValue}
        onValueChange={handleValueChange}
        className="flex flex-col"
      >
        {items.map((item, i) => (
          <FaqRow
            key={item.title}
            item={item}
            value={`faq-${i}`}
            isOpen={openValue === `faq-${i}`}
          />
        ))}
      </Accordion.Root>
    </MotionConfig>
  );
}

function FaqRow({
  item,
  value,
  isOpen,
}: {
  item: FaqItem;
  value: string;
  isOpen: boolean;
}) {
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  // El alto del texto depende del ancho, que cambia al redimensionar y al
  // pasar de desktop a mobile: un ResizeObserver lo mantiene al día, así que
  // una respuesta abierta durante el resize se reajusta en vez de recortarse.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setContentHeight(entry.target.scrollHeight);
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <Accordion.Item
      value={value}
      className="border-b border-white/10 last:border-b-0"
    >
      <Accordion.Header className="flex">
        <Accordion.Trigger
          className="
            group flex w-full cursor-pointer items-start justify-between gap-6
            py-5 text-left outline-none
            focus-visible:ring-2 focus-visible:ring-green-400/40
          "
        >
          <span
            className={`
              text-base font-light tracking-tight transition-colors sm:text-lg
              ${isOpen ? "text-white" : "text-neutral-300 group-hover:text-white"}
            `}
          >
            {item.title}
          </span>
          <Chevron isOpen={isOpen} />
        </Accordion.Trigger>
      </Accordion.Header>

      {/* El panel queda siempre montado y anima a un alto medido en píxeles, no
          a `height: "auto"`: animando contra `auto`, el cierre arranca desde un
          valor que Motion todavía tiene que resolver y el panel pega un salto
          en el primer frame. Con la medida real, abrir y cerrar recorren
          exactamente el mismo camino. */}
      <Accordion.Content forceMount asChild>
        <motion.div
          className="overflow-hidden"
          initial={false}
          animate={{ height: isOpen ? contentHeight : 0 }}
          /* aria-hidden va de la mano del alto 0: cerrado sigue en el DOM, así
             que sin esto un lector de pantalla leería las 8 respuestas. */
          aria-hidden={!isOpen}
        >
          <motion.p
            ref={contentRef}
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
              filter: isOpen ? "blur(0px)" : "blur(2px)",
            }}
            className="max-w-[60ch] pr-10 pb-6 text-sm leading-relaxed text-neutral-400"
          >
            {item.answer}
          </motion.p>
        </motion.div>
      </Accordion.Content>
    </Accordion.Item>
  );
}

/** Chevron propio en vez del de lucide: rota con el spring del `MotionConfig`. */
function Chevron({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      animate={{ rotate: isOpen ? 180 : 0 }}
      className={`mt-1 shrink-0 ${isOpen ? "text-green-400" : "text-neutral-500"}`}
    >
      <path d="m6 9 6 6 6-6" />
    </motion.svg>
  );
}
