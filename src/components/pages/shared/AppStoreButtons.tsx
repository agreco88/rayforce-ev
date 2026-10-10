import { useTranslations } from "next-intl";
import { SiApple, SiGoogleplay } from "react-icons/si";
import { cn } from "@/lib/utils";

const STORES = [
  {
    name: "App Store",
    href: "https://apps.apple.com/us/app/evsemaster/id1474532183",
    Icon: SiApple,
    accent: false,
  },
  {
    name: "Google Play",
    href: "https://play.google.com/store/apps/details?id=com.evsemaster.dev",
    Icon: SiGoogleplay,
    accent: true,
  },
] as const;

/** La ficha lo reusa para el boton del manual, que va al lado de las tiendas. */
export const STORE_BUTTON =
  "inline-flex h-14 w-full items-center justify-center gap-3 rounded-xl border px-5 transition-colors hover:bg-white/5";

/**
 * Los dos botones de descarga de EVSEMaster. Devuelve un fragmento: el layout
 * (columna en la seccion de la app, 50/50 en la ficha desde `sm`) lo pone
 * quien los monta.
 */
export function AppStoreButtons({
  theme,
}: {
  theme: { accentText?: string; accentBorder?: string };
}) {
  const t = useTranslations("Common.AppStores");

  return (
    <>
      {STORES.map(({ name, href, Icon, accent }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("ariaLabel", { store: name })}
          className={cn(
            STORE_BUTTON,
            accent
              ? [theme.accentBorder ?? "border-white/30", theme.accentText ?? "text-white/80"]
              : "border-white/30 text-white/80",
          )}
        >
          <Icon size={18} className="shrink-0" />
          {/* Una linea en mobile, donde el boton va a ancho completo; desde
              `sm`, dos lineas como los badges oficiales, para entrar en media
              columna. */}
          <span className="flex items-baseline gap-1 leading-tight sm:flex-col sm:items-start sm:gap-0">
            <span className="text-sm font-normal opacity-60 sm:text-[11px]">
              {t("downloadOn")}
            </span>
            <span className="text-sm font-semibold">{name}</span>
          </span>
        </a>
      ))}
    </>
  );
}
