import { cn } from "@/lib/utils";

import { BRAND_LOGOS } from "./brand-logos";

/** El logo de la marca en el color del texto, encajado en la caja que le den
 *  (`className` con alto y ancho). Sin logo, nada. */
export function BrandLogo({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Logo = BRAND_LOGOS[name];
  if (!Logo) return null;

  if (typeof Logo === "string") {
    return (
      // Mascara y no `<img>`: el archivo toma el color del texto, como los de
      // Simple Icons, y cambia con el hover.
      <span
        className={cn(
          "bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]",
          className,
        )}
        style={{ maskImage: `url(${Logo})` }}
        aria-hidden="true"
      />
    );
  }

  return <Logo className={className} aria-hidden="true" />;
}
