"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import SocketTypeTwo from "../../../../public/images/icons/type-2-socket.svg";
import { cn } from "@/lib/utils";
import type { CatalogTheme } from "@/lib/catalog/catalog.types";

export type IconComponent = React.ComponentType<{
  className?: string;
  strokeWidth?: number;
}> & { displayName?: string };

export type HeroStat = {
  icon: IconComponent;
  title: string;
  description: string;
};

/** La toma del wallbox animado (`ChargerEVFrame`). Va como mascara con
 *  `bg-current` para tomar el color de acento, como un icono de lucide. */
export function Type2SocketIcon({ className }: { className?: string }) {
  return (
    <span
      className={`block bg-current ${className ?? ""}`}
      style={{
        WebkitMaskImage: `url(${SocketTypeTwo.src})`,
        maskImage: `url(${SocketTypeTwo.src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
// `SwapIcon` distingue iconos por el nombre, como los de lucide.
Type2SocketIcon.displayName = "Type2SocketIcon";

// Uno por potencia y fuera de React: un componente nuevo en cada render
// remontaria el icono sin que hubiera cambiado.
const powerIcons = new Map<string, IconComponent>();

/** La potencia como icono: el numero en la caja, para que cambie al pasar de
 *  modelo como cambian los otros. */
export function powerIcon(power: string): IconComponent {
  let Icon = powerIcons.get(power);
  if (!Icon) {
    Icon = function PowerIcon({ className }: { className?: string }) {
      return (
        // `size-auto` pisa el `size-6` de los iconos: el numero y el `kW` no entran.
        // `text-box` recorta cada linea al alto de las letras: sin eso el aire
        // de la fuente bajo el `kW` corria el bloque hacia abajo en la caja.
        <span className={cn(className, "flex size-auto flex-col items-center gap-1")}>
          <span className="text-sm font-semibold tabular-nums [text-box:trim-both_cap_alphabetic]">
            {power}
          </span>
          <span className="text-[0.625rem] font-medium [text-box:trim-both_cap_alphabetic]">
            kW
          </span>
        </span>
      );
    };
    Icon.displayName = `Power${power}`;
    powerIcons.set(power, Icon);
  }
  return Icon;
}

// El ultimo icono de cada posicion, fuera de React: pasar de un modelo a otro
// remonta la pagina, y sin esto el icono nuevo no sabria de cual viene.
const lastIcons: IconComponent[] = [];

/** Si el icono de la posicion cambio, el viejo sale hacia arriba y el nuevo
 *  entra desde abajo. */
function SwapIcon({
  slot,
  icon,
  className,
}: {
  slot: number;
  icon: IconComponent;
  className: string;
}) {
  const [Shown, setShown] = useState(() => lastIcons[slot] ?? icon);

  useEffect(() => {
    lastIcons[slot] = icon;
    setShown(() => icon);
  }, [slot, icon]);

  return (
    // `grid` + `[grid-area:1/1]`: el que sale y el que entra se apilan en la
    // misma celda mientras se cruzan.
    <span
      className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
      aria-hidden="true"
    >
      <AnimatePresence initial={false}>
        <motion.span
          key={Shown.displayName}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="[grid-area:1/1]"
        >
          <Shown className={className} strokeWidth={1.5} />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * Los seis stats de los heros con galeria (cargadores y cables), en dos
 * columnas de filas. `grid-flow-col` llena por columna: los tres primeros
 * quedan a la izquierda. En mobile, una sola columna.
 */
export function HeroStatList({
  stats,
  theme,
}: {
  stats: HeroStat[];
  theme: CatalogTheme;
}) {
  // Arriba y abajo de la grilla.
  const separator = (
    <div className={`h-px w-full bg-gradient-to-r ${theme.gradientLine}`} />
  );

  return (
    // `max-w-2xl`: el minimo para que la descripcion mas larga (toma Tipo 2)
    // siga en dos lineas.
    <div className="flex w-full max-w-2xl flex-col">
      {separator}
      <ul className="grid gap-x-8 gap-y-6 py-6 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-3">
        {stats.map(({ icon, title, description }, slot) => (
          // `h-16` fijo, el alto de titulo + dos lineas de descripcion: las
          // descripciones van de una a dos segun el modelo, y sin alto fijo
          // cambiar de modelo desplaza todo lo de abajo.
          <li key={slot} className="flex h-16 items-center gap-3">
            <SwapIcon
              slot={slot}
              icon={icon}
              className={`size-6 ${theme.accentText}`}
            />

            <div className="flex flex-col gap-0.5">
              <h4 className="text-sm font-medium text-white">{title}</h4>
              <p className="text-xs leading-relaxed text-pretty text-neutral-400">
                {description}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {separator}
    </div>
  );
}
