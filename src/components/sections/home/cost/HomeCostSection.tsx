"use client";

import { useState } from "react";
import { Fuel, Home, Plug, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { waterfallItem, waterfallList } from "@/lib/animation-variants";

const CHART_HEIGHT = 480;

/**
 * Costo de 350 km para un EV de 17 kWh/100 km (59,5 kWh), contra un nafta de
 * 7,5 L/100 km. Las tres cifras salen de tarifas publicadas — la fuente y los
 * supuestos van en `footnote`/`source`, asi que si cambian las tarifas hay que
 * tocar los tres lugares juntos.
 *
 *  - casa:    59,5 kWh x $8,452 (TRS escalon 101-600) + 22% IVA
 *  - publica: 59,5 kWh x $11,8 + 2 cargos base de $132,9 (IVA incluido); son
 *             dos sesiones porque un DC no entrega 59,5 kWh de una.
 *  - nafta:   26,25 L x $88,67
 *
 * `heightPct` es la barra como % de la mas cara, con la nafta anclada en 90
 * para que no toque el techo del grafico.
 */
type Bar = {
  id: "rayforce" | "ute" | "nafta";
  heightPct: number;
  bg: string;
  /** Solo la barra de Rayforce: reemplaza al `Icon` por el lockup de marca. */
  logo?: string;
  Icon: LucideIcon;
  iconColor: string;
  displayPrice: string;
  isWinner: boolean;
  delay: number;
};

const BARS: Bar[] = [
  {
    id: "rayforce" as const,
    heightPct: 24,
    bg: "bg-green-600",
    /* Es nuestra barra: va la marca, no un icono generico. */
    logo: "/images/brand/rayforce-isotype.png",
    Icon: Home,
    iconColor: "text-green-600",
    displayPrice: "$614",
    isWinner: true,
    delay: 0.4,
  },
  {
    id: "ute" as const,
    heightPct: 37,
    bg: "bg-neutral-500",
    Icon: Plug,
    iconColor: "text-neutral-600",
    displayPrice: "$968",
    isWinner: false,
    delay: 0.5,
  },
  {
    id: "nafta" as const,
    heightPct: 90,
    bg: "bg-red-800",
    Icon: Fuel,
    iconColor: "text-red-700",
    displayPrice: "$2.328",
    isWinner: false,
    delay: 0.6,
  },
];

/* Las tarifas son verificables: cada una linkea a su pliego publicado, no es
   una atribucion suelta. El texto de cada link vive en `sources.<key>`. */
const SOURCES = [
  {
    key: "ute",
    href: "https://www.ute.com.uy/clientes/mi-factura/precios-actuales",
  },
  {
    key: "movilidad",
    href: "https://portal.ute.com.uy/movilidad-sostenible-carga",
  },
  {
    key: "ancap",
    href: "https://www.ancap.com.uy/2093/1/precios-combustibles.html",
  },
] as const;

type Theme = {
  accentText: string;
};

export function HomeCostSection({ theme, id }: { theme?: Theme; id?: string }) {
  const t = useTranslations("HomePage.HomeCostSection");
  const [chartInView, setChartInView] = useState(false);

  /* Sin ancho propio: lo fija el contenedor que la monta. */
  return (
    <div id={id} className="relative w-full">
      {/* Stack vertical, no 50/50: el grafico es mucho mas alto que el copy, y
          al lado dejaba media columna vacia. Encabezado arriba, grafico abajo. */}
      <div className="flex flex-col">
        {/* ── Encabezado ─────────────────────────────────── */}
        <motion.div
          variants={waterfallList}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col text-center"
        >
          {/* Mismo par eyebrow + h2 que la certificacion, que es la otra mitad
              de esta seccion: si no, los dos titulos no se leen como pares. */}
          <motion.span
            variants={waterfallItem}
            aria-hidden="true"
            className={`text-sm uppercase tracking-[0.35em] ${theme?.accentText ?? "text-green-400"}`}
          >
            {t("eyebrow")}
          </motion.span>

          <motion.h2
            id="cost-heading"
            variants={waterfallItem}
            className="mx-auto mt-4 mb-4 max-w-3xl text-4xl font-medium text-white sm:text-5xl text-balance"
          >
            {t("title")}
          </motion.h2>

          {/* La bajada cierra el encabezado: mas chica y en gris, para que no
              compita con el h2. El dato duro lo da el grafico. */}
          <motion.p
            variants={waterfallItem}
            className="mx-auto mt-2 max-w-xl text-base leading-relaxed text-pretty text-neutral-400 sm:text-lg"
          >
            {t("subheading")}
          </motion.p>
        </motion.div>

        {/* ── Grafico de barras ───────────────────────────── */}
        {/* Tope de ancho propio: a todo el ancho de la pagina las tres barras
            quedaban como tablones. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          onViewportEnter={() => setChartInView(true)}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-16 w-full max-w-3xl"
        >
          <p className="text-xs uppercase tracking-widest text-neutral-400 text-center mb-6">
            {t("chartTitle")}
          </p>

          {/* Chart: Y-axis + bars side by side */}
          <div className="flex" style={{ height: CHART_HEIGHT }}>
            {/* Y axis */}
            <div className="relative w-10 sm:w-14 shrink-0" aria-hidden="true">
              <div className="absolute right-0 top-0 bottom-0 w-px bg-neutral-800" />
              {BARS.map(({ id, displayPrice, heightPct, isWinner }) => (
                <div
                  key={id}
                  className="absolute right-2 flex items-center"
                  style={{
                    bottom: `${heightPct}%`,
                    transform: "translateY(50%)",
                  }}
                >
                  <span
                    className={`text-md tabular-nums tracking-tighter whitespace-nowrap ${
                      isWinner ? "text-green-400 font-bold" : "text-neutral-300"
                    }`}
                  >
                    {displayPrice}
                  </span>
                  <div
                    className={`h-px w-1.5 ml-1 ${
                      isWinner ? "bg-green-500/60" : "bg-neutral-700"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Bars area */}
            <div className="relative flex-1 flex items-end justify-around gap-2 sm:gap-4">
              {/* Background grid lines */}
              <div
                className="pointer-events-none absolute inset-0 flex flex-col justify-between"
                aria-hidden="true"
              >
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-px w-full bg-neutral-800/60" />
                ))}
              </div>

              {/* Dashed reference lines at bar heights */}
              {BARS.map(({ id, heightPct, isWinner }) => (
                <div
                  key={`ref-${id}`}
                  aria-hidden="true"
                  className={`pointer-events-none absolute left-0 right-0 h-0 border-t border-dashed ${
                    isWinner ? "border-green-500/35" : "border-neutral-700/50"
                  }`}
                  style={{ bottom: `${heightPct}%` }}
                />
              ))}

              {/* Bars */}
              {BARS.map(
                ({
                  id,
                  heightPct,
                  bg,
                  logo,
                  Icon,
                  iconColor,
                  isWinner,
                  delay,
                }) => {
                  const barH = (CHART_HEIGHT * heightPct) / 100;
                  return (
                    <div
                      key={id}
                      className="relative flex-1 min-w-0"
                      style={{ height: `${heightPct}%` }}
                    >
                      {/* Glow sits outside the clipped wrapper so blur can spread */}
                      {isWinner && (
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-t-full bg-green-400 blur-3xl opacity-30"
                        />
                      )}
                      {/* clipPath only on the bar itself, not the glow */}
                      <div
                        className="absolute inset-0"
                        style={{ clipPath: "inset(0 0 0 0)" }}
                      >
                        <motion.div
                          initial={{ y: barH }}
                          animate={{ y: chartInView ? 0 : barH }}
                          transition={{
                            duration: 1.1,
                            delay,
                            ease: "easeOut",
                          }}
                          className={`absolute inset-0 rounded-t-full ${bg}`}
                        >
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: chartInView ? 1 : 0 }}
                            transition={{
                              duration: 0.4,
                              delay: delay + 0.75,
                            }}
                            className="absolute left-1/2 top-3 sm:top-4 -translate-x-1/2"
                          >
                            <div className="flex h-8 w-8 overflow-hidden sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white shadow-sm">
                              {logo ? (
                                /* El isotipo ya viene sobre fondo blanco: se
                                   escala a todo el circulo en vez de dejar un
                                   cuadrado adentro. */
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                  src={logo}
                                  alt=""
                                  aria-hidden="true"
                                  className="h-full w-full scale-80 object-cover"
                                />
                              ) : (
                                <Icon
                                  className={`h-4 w-4 sm:h-6 sm:w-6 ${iconColor}`}
                                  aria-hidden="true"
                                />
                              )}
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>

          {/* Labels + price below bars — spacer matches Y-axis */}
          <div className="flex  mt-5">
            <div className="w-10 sm:w-14 shrink-0" aria-hidden="true" />
            {BARS.map(({ id, displayPrice, isWinner }) => (
              <div key={id} className="flex-1 min-w-0 text-center">
                <p
                  className={`text-xs sm:text-sm font-medium leading-tight ${
                    isWinner ? "text-green-400" : "text-neutral-200"
                  }`}
                >
                  {t(`items.${id}.title`)}
                </p>
                <p className="text-[9px] sm:text-xs text-neutral-400 mt-0.5">
                  {t(`items.${id}.subtitle`)}
                </p>
                <p
                  className={`mt-2 text-lg sm:text-2xl font-thin tracking-tighter ${
                    isWinner ? "text-green-400" : "text-neutral-200"
                  }`}
                >
                  {displayPrice}
                </p>
              </div>
            ))}
          </div>

          {/* La letra chica cierra el grafico, no la descripcion: el asterisco
              son los supuestos de estas barras. Va con las fuentes, que son de
              donde salen los numeros — tres links, no una frase corrida. */}
          <div className="mt-8 border-t border-white/10 pt-5 text-center">
            <p className="mx-auto max-w-md text-xs leading-relaxed text-neutral-400">
              {t("footnote")}
            </p>

            <p className="mt-6 text-[11px] uppercase tracking-widest text-neutral-500">
              {t("sourcesLabel")}
            </p>
            <ul className="mt-3 flex flex-col items-center gap-1.5 text-xs text-neutral-400 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-5">
              {SOURCES.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-white hover:decoration-neutral-400"
                  >
                    {t(`sources.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-neutral-500">
              {t("sourcesNote")}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
