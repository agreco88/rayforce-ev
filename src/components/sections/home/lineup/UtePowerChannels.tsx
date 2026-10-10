import type { ElementType, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Building2, Globe, Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

import { cn } from "@/lib/utils";

type Channel = {
  key: "phone" | "online" | "whatsapp" | "email" | "offices";
  icon: ElementType;
  /** Cada tag del copy (`<landline>`, `<link>`) y a donde lleva. */
  links: Record<string, string>;
};

/** En el orden en que los lista el cliente. */
const CHANNELS: Channel[] = [
  { key: "phone", icon: Phone, links: { landline: "tel:08001930", mobile: "tel:*1930" } },
  {
    key: "online",
    icon: Globe,
    links: { link: "https://portal.ute.com.uy/clientes/tramites-y-servicios/potencia-contratada" },
  },
  { key: "whatsapp", icon: FaWhatsapp, links: { link: "https://wa.me/59898193000" } },
  { key: "email", icon: Mail, links: { link: "mailto:comercial@ute.com.uy" } },
  { key: "offices", icon: Building2, links: {} },
];

/**
 * Los canales de UTE para pedir el aumento: telefono, web y correo se tocan.
 * Sin titulo: en el acordeon lo pone el trigger y en la grilla el padre.
 */
export function UtePowerChannels({ className }: { className?: string }) {
  const t = useTranslations("HomePage.Lineup.utePower.channels");

  return (
    <div className={cn("flex flex-col", className)}>
      {/* `flex-1` + `justify-around`: en desktop la columna izquierda es mas
          alta y los canales se reparten hasta la nota en vez de dejar un hueco
          abajo. En el acordeon no sobra alto y queda el `gap-4`. */}
      <ul className="flex flex-1 flex-col justify-around gap-4">
        {CHANNELS.map(({ key, icon: Icon, links }) => (
          <li key={key} className="flex gap-4">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-green-400">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm leading-relaxed font-medium text-white lg:text-base">
                {t(`items.${key}.title`)}
              </p>
              <p className="text-sm leading-relaxed text-neutral-400 lg:text-base">
                {t.rich(`items.${key}.description`, linkTags(links))}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm leading-relaxed text-neutral-300 lg:text-base">{t("note")}</p>
    </div>
  );
}

function linkTags(links: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(links).map(([tag, href]) => {
      const external = href.startsWith("http");
      return [
        tag,
        (chunks: ReactNode) => (
          <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="text-green-400 underline decoration-green-400/30 underline-offset-4 transition-colors hover:text-green-300 hover:decoration-green-300"
          >
            {chunks}
          </a>
        ),
      ];
    }),
  );
}
