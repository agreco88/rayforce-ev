"use client";

import { useId, useRef, type ComponentType } from "react";
import { useAnimationFrame } from "motion/react";

type IconComponent = ComponentType<{
  className?: string;
  color?: string;
}>;

type Props = {
  icon: IconComponent;
  className?: string;
  /** 3 hex/rgb color stops the gradient cycles through. */
  colors: readonly [string, string, string];
  /** Seconds for one sweep across the gradient. */
  animationSpeed?: number;
  /** Ping-pong back and forth instead of looping forward. */
  yoyo?: boolean;
};

/**
 * SVG analog of GradientText: a lucide icon whose stroke is a
 * <linearGradient> (spreadMethod="repeat") swept via gradientTransform on
 * every frame. lucide-react forwards its `color` prop straight to the root
 * svg's `stroke` attribute, which accepts a paint-server url() reference.
 */
export function GradientIcon({
  icon: Icon,
  className = "",
  colors,
  animationSpeed = 6,
  yoyo = true,
}: Props) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gradientId = `gradient-icon-${rawId}`;
  const gradientRef = useRef<SVGLinearGradientElement>(null);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const animationDuration = animationSpeed * 1000;

  useAnimationFrame((time) => {
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    let progress: number;
    if (yoyo) {
      const fullCycle = animationDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;
      progress =
        cycleTime < animationDuration
          ? cycleTime / animationDuration
          : 1 - (cycleTime - animationDuration) / animationDuration;
    } else {
      progress = (elapsedRef.current % animationDuration) / animationDuration;
    }

    gradientRef.current?.setAttribute(
      "gradientTransform",
      `translate(${-progress} 0)`,
    );
  });

  return (
    <>
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <linearGradient
            ref={gradientRef}
            id={gradientId}
            x1="0"
            y1="0"
            x2="1"
            y2="0"
            spreadMethod="repeat"
          >
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="50%" stopColor={colors[1]} />
            <stop offset="100%" stopColor={colors[2]} />
          </linearGradient>
        </defs>
      </svg>
      <Icon className={className} color={`url(#${gradientId})`} />
    </>
  );
}
