import { cn } from "@/lib/utils";

type Props = {
  cellSize?: number;
  lineOpacity?: number;
  lineThickness?: number;
  className?: string;
  maskImage?: string;
};

export function GridBackground({
  cellSize = 24,
  lineOpacity = 0.3,
  lineThickness = 1,
  className,
  maskImage,
}: Props) {
  return (
    <div
      className={cn(
        `
          absolute inset-0
          pointer-events-none
        `,
        className,
      )}
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(64,64,64,${lineOpacity}) ${lineThickness}px,
            transparent 1px
          ),
          linear-gradient(
            to bottom,
            rgba(64,64,64,${lineOpacity}) ${lineThickness}px,
            transparent 1px
          )
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        maskImage,
      }}
    />
  );
}
