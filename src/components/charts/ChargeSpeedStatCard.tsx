"use client";

import { useEffect, useState } from "react";
import { Progress } from "@base-ui/react/progress";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Basado en el ejemplo "Base UI: Progress" de Motion+
 * (https://examples.motion.dev/react/base-progress). La animacion es la del
 * ejemplo; lo que cambia es el estilado para el proyecto: colores
 * (var(--divider)/var(--hue-6) -> paleta Tailwind) y un trazo mas fino con el
 * numero en peso liviano, para que el anillo no compita con el titulo de la
 * tarjeta.
 *
 * Unico agregado propio: el anillo arranca cuando entra en viewport y no al
 * montar, porque ahora hay tres apiladas y de la otra forma las de abajo
 * terminaban de animar antes de que el usuario llegue a verlas.
 */
function StatRing({ size = "lg" }: { size?: "sm" | "lg" }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const progress = useMotionValue(0);
  const roundedProgress = useTransform(() => Math.round(progress.get()));
  const pathLength = useTransform(progress, [0, 100], [0, 1]);
  const strokeLinecap = useTransform(() =>
    pathLength.get() === 0 ? "none" : "round",
  );
  const filter = useTransform(progress, [0, 100], ["blur(10px)", "blur(0px)"]);
  const scale = useTransform(progress, [0, 100], [0.5, 1]);
  const opacity = useTransform(progress, [0, 100], [0.5, 1]);
  const [ariaValue, setAriaValue] = useState(0);

  useEffect(() => {
    const unsubscribe = progress.on("change", (v) =>
      setAriaValue(Math.round(v)),
    );
    return unsubscribe;
  }, [progress]);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(progress, 100, {
      duration: 3,
      ease: [0.31, 0.05, 0.28, 0.85],
    });
    return () => controls.stop();
  }, [progress, isInView]);

  return (
    <Progress.Root
      value={ariaValue}
      className={cn("relative shrink-0", size === "sm" ? "size-28" : "size-40")}
    >
      <Progress.Indicator
        render={
          <div
            ref={ref}
            className="relative size-full"
            style={{ width: "100%" }}
          >
            <svg viewBox="0 0 100 100" className="size-full">
              <motion.path
                d="M50 10 A40 40 0 1 1 50 90 A40 40 0 1 1 50 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-neutral-800/60"
              />
              <motion.path
                d="M50 10 A40 40 0 1 1 50 90 A40 40 0 1 1 50 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-green-400"
                style={{
                  pathLength,
                  strokeLinecap,
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className={cn(
                  "font-light tabular-nums tracking-tight text-white",
                  size === "sm" ? "text-3xl" : "text-4xl",
                )}
                style={{
                  filter,
                  scale,
                  opacity,
                  willChange: "filter, transform, opacity",
                }}
              >
                {roundedProgress}
              </motion.div>
            </div>
          </div>
        }
      />
    </Progress.Root>
  );
}

/** Medidas del anillo, para que los otros visuales ocupen exactamente el mismo
 *  hueco y las tarjetas apiladas queden alineadas entre si. */
const VISUAL_SIZE = { sm: "size-28", lg: "size-40" } as const;

/**
 * Icono suelto, con una etiqueta opcional debajo (ej. "IP66"). Es el reemplazo
 * del anillo para los items que no son un porcentaje: ahi el 0->100 contaba
 * algo que no existe. Ocupa el mismo hueco que el anillo para que las tarjetas
 * de una misma grilla queden alineadas.
 */
function StatIcon({
  icon: Icon,
  label,
  size = "lg",
}: {
  icon: LucideIcon;
  label?: string;
  size?: "sm" | "lg";
}) {
  const isSm = size === "sm";

  return (
    <div
      className={cn(
        "flex shrink-0 flex-col items-center justify-center gap-1",
        VISUAL_SIZE[size],
      )}
    >
      <Icon
        className={cn("text-green-400", isSm ? "size-20" : "size-28")}
        strokeWidth={0.85}
        aria-hidden="true"
      />
      {label ? (
        <span
          className={cn(
            "font-semibold tracking-wider text-green-400",
            isSm ? "text-sm" : "text-base",
          )}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}

/**
 * Igual que `StatIcon` pero con un SVG del proyecto en lugar de un icono de
 * lucide. El archivo (ej. socket-type-2) trae sus propios colores, asi que se
 * pinta como mascara para que tome el verde del acento.
 */
function StatMask({
  src,
  label,
  size = "lg",
}: {
  src: string;
  label: string;
  size?: "sm" | "lg";
}) {
  const isSm = size === "sm";

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center",
        VISUAL_SIZE[size],
      )}
      role="img"
      aria-label={label}
    >
      <div
        className={cn("bg-green-400", isSm ? "size-20" : "size-28")}
        style={{
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </div>
  );
}

/**
 * Logo redondo. El mark de URSEA es oscuro sobre transparente, asi que va
 * contenido sobre un circulo blanco (mismo tratamiento que el resto del sitio).
 */
function StatLogo({
  src,
  alt,
  size = "lg",
}: {
  src: string;
  alt: string;
  size?: "sm" | "lg";
}) {
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-white",
        VISUAL_SIZE[size],
      )}
    >
      <Image src={src} alt={alt} fill className="object-contain p-4" />
    </div>
  );
}

type ChargeSpeedStatCardProps = {
  /** Texto principal. Por defecto, el stat de `whyBetter` (uso en /cargadores). */
  headline?: string;
  /** Linea chica debajo del headline. Se omite si no se pasa. */
  footnote?: string;
  /**
   * `compact` es la variante para las tres apiladas de la home: anillo mas
   * chico y headline mas corto, para que las tres entren sin dominar la grilla.
   */
  variant?: "default" | "compact";
  /**
   * Que va en la columna izquierda. `ring` es el contador 0->100 original;
   * `icon` y `logo` ocupan el mismo hueco para los items que no son un
   * porcentaje. Por defecto `ring`, para no tocar los usos existentes.
   */
  visual?: "ring" | "icon" | "logo" | "mask";
  /** Con `visual="icon"`: el icono y su etiqueta opcional (ej. "IP66"). */
  icon?: LucideIcon;
  iconLabel?: string;
  /** Con `visual="logo"`: la imagen redonda. */
  logoSrc?: string;
  logoAlt?: string;
  /** Con `visual="mask"`: SVG del proyecto pintado con el verde del acento. */
  maskSrc?: string;
  maskAlt?: string;
};

export function ChargeSpeedStatCard({
  headline,
  footnote,
  variant = "default",
  visual = "ring",
  icon,
  iconLabel,
  logoSrc,
  logoAlt,
  maskSrc,
  maskAlt,
}: ChargeSpeedStatCardProps = {}) {
  const t = useTranslations("HomePage.WallboxIntro.whyBetter");
  const isCompact = variant === "compact";
  const visualSize = isCompact ? "sm" : "lg";

  const resolvedHeadline = headline ?? t("stat.headline");
  const resolvedFootnote =
    footnote ?? (headline === undefined ? t("stat.footnote") : undefined);

  return (
    <div
      className={cn(
        "h-full w-full rounded-2xl border border-neutral-900 bg-neutral-900/20",
        isCompact ? "p-6 sm:p-7" : "p-6 sm:p-8",
      )}
    >
      {/* `h-full`: la tarjeta se estira a la altura de su fila (grilla con
          `items-stretch`), asi que sin esto el contenido de las tarjetas cortas
          quedaba pegado arriba y desalineado con las largas. En `compact` el
          reparto es `justify-around`, para que el aire sobrante se distribuya
          entre visual y texto en vez de acumularse en los extremos. */}
      <div
        className={cn(
          "flex h-full flex-col items-center text-center sm:flex-row sm:text-left",
          isCompact
            ? "justify-around gap-5"
            : "justify-center gap-8 py-4 sm:gap-10",
        )}
      >
        {/* En `compact` el reparto es 25/75: el visual vive en su cuarto y el
            texto se queda con el resto a ancho completo. Sin el wrapper el
            visual imponia su `VISUAL_SIZE` fijo y el texto tomaba lo que
            sobraba, que no es lo mismo. */}
        <div
          className={cn(
            "flex shrink-0 items-center justify-center",
            isCompact && "sm:w-1/4",
          )}
        >
          {visual === "icon" && icon ? (
            <StatIcon icon={icon} label={iconLabel} size={visualSize} />
          ) : visual === "logo" && logoSrc ? (
            <StatLogo src={logoSrc} alt={logoAlt ?? ""} size={visualSize} />
          ) : visual === "mask" && maskSrc ? (
            <StatMask src={maskSrc} label={maskAlt ?? ""} size={visualSize} />
          ) : (
            <StatRing size={visualSize} />
          )}
        </div>
        <div
          className={cn(
            "flex flex-col",
            isCompact ? "gap-5 sm:w-3/4 sm:gap-6" : "gap-5",
          )}
        >
          <p
            className={cn(
              "font-light tracking-tight text-balance text-white",
              isCompact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl",
            )}
          >
            {resolvedHeadline}
          </p>
          {resolvedFootnote ? (
            <p
              className={cn(
                "text-sm text-neutral-500",
                isCompact && "leading-relaxed",
              )}
            >
              {resolvedFootnote}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
