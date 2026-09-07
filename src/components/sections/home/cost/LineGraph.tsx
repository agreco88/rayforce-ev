"use client"

import { AnimateNumber, Cursor } from "motion-plus/react"
import { AnimatePresence, motion, MotionConfig } from "motion/react"
import { useState } from "react"

export default function LineGraph({
    data = [30, 8, 36, 29, 50, 78],
}: {
    data?: number[]
}) {
    // Calculate points for the SVG path
    const points = data.map((value, index) => ({
        x: 50 + index * 100,
        y: 250 - value * 2,
        value,
    }))

    const pathD = points.reduce(buildPath, "")

    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)
    const [percentageChange, setPercentageChange] = useState<number | null>(
        null
    )
    const startHover = (index: number) => {
        setHoveredPoint(index)

        if (index > 0) {
            const currentValue = data[index]
            const previousValue = data[index - 1]
            const percentageChange =
                ((currentValue - previousValue) / previousValue) * 100
            setPercentageChange(percentageChange)
        } else {
            setPercentageChange(null)
        }
    }

    const endHover = () => {
        setHoveredPoint(null)
        setPercentageChange(null)
    }

    return (
        <div style={container} onPointerLeave={endHover}>
            <svg width="600" height="300" style={svgStyle}>
                <defs>
                    <linearGradient
                        id="areaGradient"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor="var(--hue-6)"
                            stopOpacity="0.2"
                        />
                        <stop
                            offset="100%"
                            stopColor="var(--hue-6)"
                            stopOpacity="0"
                        />
                    </linearGradient>
                </defs>

                {/* Background grid lines */}
                {[50, 100, 150, 200, 250].map((y) => (
                    <motion.line
                        key={y}
                        x1="50"
                        y1={y}
                        x2="550"
                        y2={y}
                        stroke="var(--border)"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                    />
                ))}

                {/* Area fill under the line */}
                <motion.path
                    d={`${pathD} L 550,250 L 50,250 Z`}
                    fill="url(#areaGradient)"
                />

                {/* Main graph line */}
                <motion.path
                    d={pathD}
                    fill="none"
                    stroke="var(--hue-6)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Points */}
                <motion.g
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: {
                            transition: {
                                delayChildren: 0.1,
                                staggerChildren: 1.5 / 6,
                            },
                        },
                    }}
                >
                    {points.map((point, index) => (
                        <g key={index}>
                            {/* Hit area */}
                            <motion.rect
                                x={point.x - 50}
                                y={0}
                                width={100}
                                height={300}
                                fill="transparent"
                                onHoverStart={() => startHover(index)}
                                style={{ cursor: "pointer" }}
                            />
                            {/* Dot */}
                            <motion.circle
                                cx={point.x}
                                cy={point.y}
                                r="6"
                                fill="var(--layer)"
                                stroke="var(--hue-6)"
                                strokeWidth="1"
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
                    ))}
                </motion.g>
            </svg>
            <AnimatePresence>
                {percentageChange !== null && (
                    <Cursor
                        follow
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        offset={{ x: 20, y: 20 }}
                        key="cursor"
                    >
                        <div style={numberContainer}>
                            <MotionConfig
                                transition={{
                                    type: "spring",
                                    visualDuration: 0.6,
                                    bounce: 0.2,
                                }}
                            >
                                <motion.div
                                    initial={{
                                        rotate: percentageChange < 0 ? 180 : 0,
                                        color:
                                            percentageChange < 0
                                                ? "var(--hue-1)"
                                                : "var(--hue-6)",
                                    }}
                                    animate={{
                                        rotate: percentageChange < 0 ? 180 : 0,
                                        color:
                                            percentageChange < 0
                                                ? "var(--hue-1)"
                                                : "var(--hue-6)",
                                    }}
                                    style={arrowStyle}
                                >
                                    ↑
                                </motion.div>
                                <AnimateNumber
                                    initial={{
                                        color:
                                            percentageChange < 0
                                                ? "var(--hue-1)"
                                                : "var(--hue-6)",
                                    }}
                                    animate={{
                                        color:
                                            percentageChange < 0
                                                ? "var(--hue-1)"
                                                : "var(--hue-6)",
                                    }}
                                    style={numberStyle}
                                    format={{
                                        notation: "compact",
                                        compactDisplay: "short",
                                    }}
                                    suffix={"%"}
                                >
                                    {percentageChange}
                                </AnimateNumber>
                            </MotionConfig>
                        </div>
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

/**
 * ==============   Styles   ================
 */

const container = {
    // El ejemplo de Motion usa estas custom properties de su propio sitio.
    // Las definimos acá para que el gráfico renderice igual sin tocar el theme global.
    ["--hue-6" as string]: "#ff0088",
    ["--hue-1" as string]: "#0cdcf7",
    ["--layer" as string]: "#0b1011",
    backgroundColor: "var(--layer)",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid var(--border)",
}

const svgStyle = {
    overflow: "visible",
}

const numberContainer = {
    ["--hue-6" as string]: "#ff0088",
    ["--hue-1" as string]: "#0cdcf7",
    ["--layer" as string]: "#0b1011",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "var(--layer)",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "6px 12px",
    borderRadius: 40,
    willChange: "transform",
}

const numberStyle = {
    fontSize: "24px",
}

const arrowStyle = {
    fontSize: "24px",
    fontWeight: "bold",
}
