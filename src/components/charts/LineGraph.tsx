"use client"

import { AnimateNumber, Cursor } from "motion-plus/react"
import { AnimatePresence, motion, MotionConfig } from "motion/react"
import { useState } from "react"

/* ── Geometría ──────────────────────────────────────────
   Mismo sistema de coordenadas que el ejemplo de Motion
   (600x300), con lugar a la izquierda y abajo para los ejes. */
const VIEW_W = 600
const VIEW_H = 300
const PAD_L = 56
const PAD_R = 16
const PAD_T = 20
const PAD_B = 40

const PLOT_W = VIEW_W - PAD_L - PAD_R
const PLOT_H = VIEW_H - PAD_T - PAD_B

/** Cuántas líneas de grilla / ticks del eje Y. */
const TICK_COUNT = 5

export type LineGraphProps = {
    /** Valores de la serie, uno por label. */
    data: number[]
    /** Etiquetas del eje X, en el mismo orden que `data`. */
    labels: (string | number)[]
    /** Color de la línea, los puntos y los números del tooltip. */
    color: string
    /** Se antepone a los valores del eje Y y del tooltip. */
    prefix?: string
    /** Encabezado fijo del tooltip, ej. "Precio por litro de nafta en". */
    tooltipTitle?: string
    /** Texto corto que identifica la serie (usado para ids internos). */
    label?: string
    /** Retrasa el dibujado, para escalonar dos gráficas hermanas. */
    delay?: number
    /**
     * Índice con hover elevado al padre, para sincronizar dos gráficas.
     * Si se pasa, el componente deja de manejarlo solo.
     */
    hovered?: number | null
    onHoverChange?: (index: number | null) => void
    /**
     * Oculta el tooltip que sigue al cursor. Se usa cuando el valor se
     * muestra en un panel fijo debajo de la gráfica.
     */
    hideTooltip?: boolean
    /**
     * Techo del eje Y. Fijarlo igual en dos gráficas las vuelve
     * comparables: sin esto cada una se escala a su propio máximo y dos
     * series de magnitud muy distinta dibujan la misma curva.
     */
    yMax?: number
}

export default function LineGraph({
    data,
    labels,
    color,
    prefix = "",
    tooltipTitle,
    label,
    delay = 0,
    hovered,
    onHoverChange,
    hideTooltip = false,
    yMax: yMaxProp,
}: LineGraphProps) {
    /* Si el padre pasa `hovered` manda él; si no, la gráfica se maneja
       sola y sigue sirviendo suelta. */
    const [ownHover, setOwnHover] = useState<number | null>(null)
    const isControlled = hovered !== undefined
    const hoveredPoint = isControlled ? hovered : ownHover

    const setHoveredPoint = (index: number | null) => {
        if (!isControlled) setOwnHover(index)
        onHoverChange?.(index)
    }

    /* El eje arranca en 0 y redondea el techo hacia arriba, así la
       línea nunca toca el borde de arriba del área de dibujo. */
    const max = Math.max(...data)
    const yMax = yMaxProp ?? (max === 0 ? 1 : max * 1.1)

    const xFor = (i: number) =>
        PAD_L + (i / Math.max(data.length - 1, 1)) * PLOT_W
    const yFor = (value: number) => PAD_T + PLOT_H - (value / yMax) * PLOT_H

    const points = data.map((value, index) => ({
        x: xFor(index),
        y: yFor(value),
        value,
    }))

    const pathD = points.reduce(buildPath, "")

    const ticks = Array.from(
        { length: TICK_COUNT },
        (_, i) => (yMax / (TICK_COUNT - 1)) * i
    )

    /* El dibujado de la línea y el stagger de los puntos comparten
       duración, así los puntos aparecen a medida que la línea pasa. */
    const drawDuration = 1.5

    /* Controlado, el padre decide cuándo se limpia (típicamente al salir
       del grupo entero), así pasar de una gráfica hermana a la otra no
       apaga el estado compartido en el camino. */
    const endHover = () => {
        if (!isControlled) setOwnHover(null)
    }

    const gradientId = `area-${label ?? color.replace("#", "")}`

    return (
        <div onPointerLeave={endHover}>
            <motion.svg
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                className="w-full overflow-visible"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay }}
            >
                <defs>
                    <linearGradient
                        id={gradientId}
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor={color}
                            stopOpacity="0.25"
                        />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                    {/* Glow del color de la serie para el bullet con
                        hover: un blur coloreado detrás del punto, no un
                        drop-shadow genérico. */}
                    <filter
                        id={`${gradientId}-glow`}
                        x="-200%"
                        y="-200%"
                        width="500%"
                        height="500%"
                    >
                        <feDropShadow
                            dx="0"
                            dy="0"
                            stdDeviation="4"
                            floodColor={color}
                            floodOpacity="0.9"
                        />
                    </filter>
                </defs>

                {/* Eje Y: grilla + valores */}
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
                            {prefix}
                            {formatTick(value)}
                        </text>
                    </g>
                ))}

                {/* Eje X: el label activo se resalta */}
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

                {/* Área bajo la línea */}
                <motion.path
                    d={`${pathD} L ${xFor(data.length - 1)},${PAD_T + PLOT_H} L ${PAD_L},${PAD_T + PLOT_H} Z`}
                    fill={`url(#${gradientId})`}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: delay + drawDuration * 0.7 }}
                />

                {/* Línea principal */}
                <motion.path
                    d={pathD}
                    fill="none"
                    stroke={color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: drawDuration, ease: "easeInOut", delay }}
                />

                {/* Puntos */}
                <motion.g
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={{
                        visible: {
                            transition: {
                                delayChildren: delay + 0.1,
                                staggerChildren: drawDuration / data.length,
                            },
                        },
                    }}
                >
                    {points.map((point, index) => {
                        const halfSlot =
                            PLOT_W / Math.max(data.length - 1, 1) / 2
                        return (
                            <g key={index}>
                                {/* Hit area */}
                                <motion.rect
                                    x={point.x - halfSlot}
                                    y={0}
                                    width={halfSlot * 2}
                                    height={VIEW_H}
                                    fill="transparent"
                                    onHoverStart={() => setHoveredPoint(index)}
                                    style={{ cursor: "pointer" }}
                                />
                                {/* Dot */}
                                <motion.circle
                                    cx={point.x}
                                    cy={point.y}
                                    r="5"
                                    fill="#0a0a0a"
                                    stroke={color}
                                    strokeWidth="1.5"
                                    filter={
                                        hoveredPoint === index
                                            ? `url(#${gradientId}-glow)`
                                            : undefined
                                    }
                                    animate={
                                        hoveredPoint === index
                                            ? { scale: 1.5 }
                                            : { scale: 1 }
                                    }
                                    variants={{
                                        hidden: { scale: 0.5, opacity: 0 },
                                        visible: { scale: 1, opacity: 1 },
                                    }}
                                />
                            </g>
                        )
                    })}
                </motion.g>
            </motion.svg>

            {/* Tooltip que sigue al cursor. Es el mecanismo del ejemplo de
                Motion: vive en un portal y anima transform, por eso se
                siente fluido aunque cambie de punto. */}
            <AnimatePresence>
                {hoveredPoint !== null && !hideTooltip && (
                    <Cursor
                        follow
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        offset={{ x: 20, y: 20 }}
                        key="cursor"
                    >
                        <MotionConfig
                            transition={{
                                type: "spring",
                                visualDuration: 0.6,
                                bounce: 0.2,
                            }}
                        >
                            <div style={tooltipContainer}>
                                {/* Header: el texto queda fijo, sólo tickea
                                    el año. */}
                                <span style={tooltipTitleStyle}>
                                    {tooltipTitle}{" "}
                                    <AnimateNumber
                                        style={yearStyle}
                                        format={{ useGrouping: false }}
                                    >
                                        {Number(labels[hoveredPoint])}
                                    </AnimateNumber>
                                </span>

                                {/* Valor grande. Sin flecha ni variación:
                                    las dos series suben todos los años, así
                                    que no aportaban nada. */}
                                <AnimateNumber
                                    initial={{ color }}
                                    animate={{ color }}
                                    style={valueStyle}
                                    prefix={prefix}
                                    format={{ maximumFractionDigits: 2 }}
                                >
                                    {data[hoveredPoint]}
                                </AnimateNumber>
                            </div>
                        </MotionConfig>
                    </Cursor>
                )}
            </AnimatePresence>
        </div>
    )
}

/**
 * ==============   Utils   ================
 */

function buildPath(path: string, point: { x: number; y: number }, i: number) {
    if (i === 0) return `M ${point.x},${point.y}`
    return `${path} L ${point.x},${point.y}`
}

/** Los ticks van redondeados: el detalle fino vive en el tooltip. */
function formatTick(value: number) {
    if (value >= 100) return Math.round(value).toString()
    if (value >= 10) return value.toFixed(0)
    return value.toFixed(1)
}

/**
 * ==============   Styles   ================
 */

const tooltipContainer = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
    backgroundColor: "#0a0a0a",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "10px 16px 12px",
    borderRadius: 18,
    willChange: "transform",
}

const tooltipTitleStyle = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    fontWeight: 500,
    color: "#a3a3a3",
    whiteSpace: "nowrap" as const,
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
}
