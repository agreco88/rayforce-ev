"use client"

import { AnimateNumber, Cursor } from "motion-plus/react"
import { AnimatePresence, motion, MotionConfig } from "motion/react"
import { useState } from "react"

/* ── Geometría ──────────────────────────────────────────
   Misma altura que LineGraph (300), pero el doble de ancho: esta
   gráfica ocupa el ancho completo de la sección en vez de media
   columna, y con un viewBox más ancho el texto y el trazo quedan del
   mismo tamaño relativo en vez de estirarse x2 al llenar el espacio. */
const VIEW_W = 1200
const VIEW_H = 420
const PAD_L = 64
const PAD_R = 24
const PAD_T = 20
const PAD_B = 40

const PLOT_W = VIEW_W - PAD_L - PAD_R
const PLOT_H = VIEW_H - PAD_T - PAD_B

/** Los ticks del eje van cada $10, no en una cantidad fija de líneas. */
const TICK_STEP = 10

export type CombinedSeries = {
    key: string
    data: number[]
    color: string
    /** Se antepone al valor de esa serie en el tooltip. */
    prefix?: string
    /** Título fijo de la fila del tooltip, ej. "Nafta". */
    tooltipLabel: string
    unit?: string
}

export type CombinedTrendGraphProps = {
    labels: (string | number)[]
    series: [CombinedSeries, CombinedSeries]
    delay?: number
}

/**
 * Una sola gráfica con las dos series superpuestas en un único eje,
 * que va del precio más bajo de las dos al más alto: así se ve la
 * diferencia real de magnitud (la nafta arriba, la luz achatada cerca
 * del piso) en vez de que cada una dibuje su propia curva a su propia
 * escala. El tooltip muestra ambos valores juntos por año.
 */
export default function CombinedTrendGraph({
    labels,
    series,
    delay = 0,
}: CombinedTrendGraphProps) {
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

    const allValues = series.flatMap((s) => s.data)
    const dataMin = Math.min(...allValues)
    const dataMax = Math.max(...allValues)

    /* Piso y techo redondeados al escalón de $10 más cercano, así el
       primer y el último tick caen justo en el borde del área. */
    const yMin = Math.floor(dataMin / TICK_STEP) * TICK_STEP
    const yMax = Math.ceil(dataMax / TICK_STEP) * TICK_STEP
    const yRange = yMax - yMin === 0 ? 1 : yMax - yMin

    const xFor = (i: number) =>
        PAD_L + (i / Math.max(labels.length - 1, 1)) * PLOT_W
    const yFor = (value: number) =>
        PAD_T + PLOT_H - ((value - yMin) / yRange) * PLOT_H

    const pointsFor = (seriesIndex: number) =>
        series[seriesIndex].data.map((value, i) => ({
            x: xFor(i),
            y: yFor(value),
            value,
        }))

    const ticks: number[] = []
    for (let value = yMin; value <= yMax; value += TICK_STEP) {
        ticks.push(value)
    }

    const drawDuration = 1.5

    return (
        <div onPointerLeave={() => setHoveredPoint(null)}>
            <motion.svg
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                className="w-full overflow-visible"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay }}
            >
                <defs>
                    {series.map((s) => (
                        <linearGradient
                            key={s.key}
                            id={`combined-area-${s.key}`}
                            x1="0"
                            x2="0"
                            y1="0"
                            y2="1"
                        >
                            <stop offset="0%" stopColor={s.color} stopOpacity="0.18" />
                            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                        </linearGradient>
                    ))}
                    {/* Glow del color de cada serie para el bullet con
                        hover: un blur coloreado detrás del punto, no un
                        drop-shadow genérico. */}
                    {series.map((s) => (
                        <filter
                            key={s.key}
                            id={`combined-glow-${s.key}`}
                            x="-200%"
                            y="-200%"
                            width="500%"
                            height="500%"
                        >
                            <feDropShadow
                                dx="0"
                                dy="0"
                                stdDeviation="4"
                                floodColor={s.color}
                                floodOpacity="0.9"
                            />
                        </filter>
                    ))}
                </defs>

                {/* Eje Y: grilla + valor, cada $10 */}
                {ticks.map((value) => (
                    <g key={value}>
                        <line
                            x1={PAD_L}
                            y1={yFor(value)}
                            x2={VIEW_W - PAD_R}
                            y2={yFor(value)}
                            stroke="#262626"
                            strokeWidth="1"
                            strokeDasharray="4,6"
                        />
                        <text
                            x={PAD_L - 10}
                            y={yFor(value)}
                            textAnchor="end"
                            dominantBaseline="middle"
                            className="fill-neutral-600 text-[11px] tabular-nums"
                        >
                            ${value}
                        </text>
                    </g>
                ))}

                {labels.map((text, i) => (
                    <text
                        key={i}
                        x={xFor(i)}
                        y={VIEW_H - PAD_B + 24}
                        textAnchor="middle"
                        className={`text-[11px] tabular-nums transition-colors ${
                            hoveredPoint === i
                                ? "fill-neutral-200"
                                : "fill-neutral-500"
                        }`}
                    >
                        {text}
                    </text>
                ))}

                {series.map((s, seriesIndex) => {
                    const points = pointsFor(seriesIndex)
                    const pathD = points.reduce(buildPath, "")
                    return (
                        <g key={s.key}>
                            <motion.path
                                d={`${pathD} L ${xFor(labels.length - 1)},${PAD_T + PLOT_H} L ${PAD_L},${PAD_T + PLOT_H} Z`}
                                fill={`url(#combined-area-${s.key})`}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: 0.6,
                                    delay: delay + drawDuration * 0.7,
                                }}
                            />
                            <motion.path
                                d={pathD}
                                fill="none"
                                stroke={s.color}
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: drawDuration,
                                    ease: "easeInOut",
                                    delay,
                                }}
                            />
                        </g>
                    )
                })}

                {/* Puntos + hit area, una franja por año que cubre las
                    dos series a la vez. */}
                <motion.g
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={{
                        visible: {
                            transition: {
                                delayChildren: delay + 0.1,
                                staggerChildren: drawDuration / labels.length,
                            },
                        },
                    }}
                >
                    {labels.map((_, index) => {
                        const halfSlot =
                            PLOT_W / Math.max(labels.length - 1, 1) / 2
                        const x = xFor(index)
                        return (
                            <g key={index}>
                                <motion.rect
                                    x={x - halfSlot}
                                    y={0}
                                    width={halfSlot * 2}
                                    height={VIEW_H}
                                    fill="transparent"
                                    onHoverStart={() => setHoveredPoint(index)}
                                    style={{ cursor: "pointer" }}
                                />
                                {series.map((s) => {
                                    const y = yFor(s.data[index])
                                    const isHovered = hoveredPoint === index
                                    return (
                                        <motion.circle
                                            key={s.key}
                                            cx={x}
                                            cy={y}
                                            r="5"
                                            fill="#0a0a0a"
                                            stroke={s.color}
                                            strokeWidth="1.5"
                                            filter={
                                                isHovered
                                                    ? `url(#combined-glow-${s.key})`
                                                    : undefined
                                            }
                                            animate={
                                                isHovered
                                                    ? { scale: 1.5 }
                                                    : { scale: 1 }
                                            }
                                            variants={{
                                                hidden: { scale: 0.5, opacity: 0 },
                                                visible: { scale: 1, opacity: 1 },
                                            }}
                                        />
                                    )
                                })}
                            </g>
                        )
                    })}
                </motion.g>
            </motion.svg>

            {/* Tooltip que sigue al cursor, igual que en LineGraph: vive
                en un portal (Cursor) y anima transform, por eso se
                siente fluido. Acá van dos instancias, una por serie,
                cada una con su propio offset para no superponerse. */}
            <AnimatePresence>
                {hoveredPoint !== null &&
                    series.map((s, seriesIndex) => (
                        <Cursor
                            follow
                            key={s.key}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            offset={
                                seriesIndex === 0
                                    ? { x: 20, y: -100 }
                                    : { x: 20, y: 20 }
                            }
                        >
                            <MotionConfig
                                transition={{
                                    type: "spring",
                                    visualDuration: 0.6,
                                    bounce: 0.2,
                                }}
                            >
                                <div style={tooltipContainer}>
                                    <span style={tooltipTitleStyle}>
                                        {s.tooltipLabel}{" "}
                                        <AnimateNumber
                                            style={yearStyle}
                                            format={{ useGrouping: false }}
                                        >
                                            {Number(labels[hoveredPoint])}
                                        </AnimateNumber>
                                    </span>
                                    <AnimateNumber
                                        initial={{ color: s.color }}
                                        animate={{ color: s.color }}
                                        style={valueStyle}
                                        prefix={s.prefix}
                                        format={{ maximumFractionDigits: 2 }}
                                    >
                                        {s.data[hoveredPoint]}
                                    </AnimateNumber>
                                </div>
                            </MotionConfig>
                        </Cursor>
                    ))}
            </AnimatePresence>
        </div>
    )
}

function buildPath(path: string, point: { x: number; y: number }, i: number) {
    if (i === 0) return `M ${point.x},${point.y}`
    return `${path} L ${point.x},${point.y}`
}

const tooltipContainer = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    backgroundColor: "#0a0a0a",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "10px 16px 12px",
    borderRadius: 18,
    willChange: "transform",
}

/* Mismos estilos que el tooltip de LineGraph, con ancho fijo agregado
   en título y valor: acá hay dos tooltips a la vez, y sin minWidth el
   dígito que cambia (ej. "78.54" -> "88.67") corre el ancho del bloque
   mientras AnimateNumber cuenta, y el tooltip tiembla. */
const tooltipTitleStyle = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    fontWeight: 500,
    color: "#a3a3a3",
    whiteSpace: "nowrap" as const,
    minWidth: "230px",
}

const yearStyle = {
    fontVariantNumeric: "tabular-nums",
    color: "#e5e5e5",
}

const valueStyle = {
    fontSize: "34px",
    fontWeight: 300,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
    fontVariantNumeric: "tabular-nums",
    minWidth: "110px",
}
