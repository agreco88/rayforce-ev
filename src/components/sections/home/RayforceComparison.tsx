"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { GiElectricalSocket } from "react-icons/gi";
import { FaWhatsapp } from "react-icons/fa";
import SocketTypeTwo from "../../../../public/images/icons/type-2-socket.svg";
import { cn } from "@/lib/utils";
import { useTrack } from "@/lib/analytics";

/* ------------------ Types ------------------ */

type Theme = {
  accentText: string;
  accentBg: string;
  accentHover: string;
  accentBorder: string;
  glow: string;
};

type Column = {
  label: string;
  type: "wallbox" | "schuko";
  icon?: React.ComponentType<{ className?: string }>;
  isMask?: boolean;
};

type Row =
  | {
      label: string;
      type: "boolean";
      wallbox: boolean;
      schuko: boolean;
      bold?: boolean;
    }
  | {
      label: string;
      type: "value";
      wallbox: string;
      schuko: string;
      bold?: boolean;
    };

type Props = {
  theme: Theme;
  powerKw: number;
  price?: { currency: string; amount: number };
  variantPublicName?: string;
};

/* ------------------ Config ------------------ */

const columns: Column[] = [
  {
    label: "Enchufe común Schuko",
    type: "schuko",
    icon: GiElectricalSocket,
  },
  {
    label: "Wallbox Rayforce",
    type: "wallbox",
    isMask: true,
  },
];

/* ------------------ Dynamic Rows ------------------ */

function getRows(powerKw: number): Row[] {
  const isFast = powerKw >= 11;

  return [
    {
      label: "Tiempo de carga",
      type: "value",
      wallbox: isFast ? "2–4 horas" : "4–8 horas",
      schuko: "10–20 horas",
      bold: true,
    },
    {
      label: "Potencia",
      type: "value",
      wallbox: `Hasta ${powerKw} kW`,
      schuko: "Hasta 3.7 kW",
      bold: true,
    },
    {
      label: "Uso recomendado",
      type: "value",
      wallbox: "Diario",
      schuko: "Ocasional",
    },
    {
      label: "Comunicación con el vehículo",
      type: "boolean",
      wallbox: true,
      schuko: false,
    },
    {
      label: "Protecciones eléctricas",
      type: "boolean",
      wallbox: true,
      schuko: false,
    },
    {
      label: "Instalación dedicada",
      type: "boolean",
      wallbox: true,
      schuko: false,
    },
  ];
}

/* ------------------ Cell ------------------ */

function Cell({
  type,
  value,
  theme,
}: {
  type: "boolean" | "value";
  value: boolean | string;
  theme: Theme;
}) {
  if (type === "boolean") {
    return value ? (
      <Check
        className={cn("w-5 h-5 sm:w-6 sm:h-6", theme.accentText)}
        strokeWidth={3}
      />
    ) : (
      <X className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" strokeWidth={3} />
    );
  }

  return (
    <span className="text-xs sm:text-sm text-neutral-300">
      {value}
    </span>
  );
}

/* ------------------ Component ------------------ */

const WHATSAPP_NUMBER = "59892041709";

const MERCADOPAGO_URLS: Record<string, string> = {
  residencial: "http://mpago.la/1notnYD",
  comercial: "https://mpago.la/2C6CFZe",
};

export default function RayforceComparison({
  theme,
  powerKw,
  price,
  variantPublicName,
}: Props) {
  const rows = getRows(powerKw);
  const track = useTrack();

  const whatsappHref = variantPublicName
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola! Quiero comprar mi cargador ${variantPublicName}`)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;

  const mpUrl =
    powerKw >= 11 ? MERCADOPAGO_URLS.comercial : MERCADOPAGO_URLS.residencial;

  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-neutral-950">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="sm:text-5xl py-8 sm:py-16 text-center"
        >
          ¿Por qué cargar con un Wallbox y no con un enchufe común?
        </motion.h2>

        {/* Table */}
        <div className="grid grid-cols-[1.4fr_1fr_1fr] sm:grid-cols-[2fr_1fr_1fr] border-b border-neutral-800 pb-6">
          <span />

          {columns.map((col, i) => {
            const Icon = col.icon;

            return (
              <div key={i} className="flex flex-col items-center gap-3">
                <span className="text-xs sm:text-sm text-neutral-500 text-center h-[2lh]">
                  {col.label}
                </span>

                <div className="w-16 h-16 flex items-center justify-center">
                  {col.isMask ? (
                    <div
                      className={cn("w-full h-full", theme.accentBg)}
                      style={{
                        WebkitMaskImage: `url(${SocketTypeTwo.src})`,
                        maskImage: `url(${SocketTypeTwo.src})`,
                        WebkitMaskSize: "75%",
                        maskSize: "75%",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                      }}
                    />
                  ) : Icon ? (
                    <Icon className="w-12 h-12 text-neutral-500" />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Rows */}
        {rows.map((row) => (
          <motion.div
            key={row.label}
            className="grid grid-cols-[1.4fr_1fr_1fr] sm:grid-cols-[2fr_1fr_1fr] py-4 border-b  border-neutral-800"
          >
            <span className="text-xs sm:text-sm text-neutral-100">
              {row.label}
            </span>

            {columns.map((col, colIndex) => {
              const value = col.type === "wallbox" ? row.wallbox : row.schuko;

              return (
                <span key={colIndex} className="flex justify-center">
                  <Cell type={row.type} value={value} theme={theme} />
                </span>
              );
            })}
          </motion.div>
        ))}

        {/* Buy CTA row */}
        {/* {price && (
          <div className="grid grid-cols-[1.4fr_1fr_1fr] sm:grid-cols-[2fr_1fr_1fr] py-6 border-b border-neutral-800">
            <span />
            <span />
            <div className="flex justify-center">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track.whatsappClick({
                    source: "comparison_buy_cta",
                    charger: variantPublicName,
                  })
                }
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl",
                  "text-black font-semibold text-xs sm:text-sm",
                  "transition-all duration-200",
                  theme.accentBg,
                  theme.accentHover,
                )}
              >
                <FaWhatsapp className="size-4 shrink-0" />
                <span>Comprar por ${price.amount}</span>
              </a>
            </div>
          </div>
        )} */}

        {/* Images */}
        {/* <div className="mt-8 sm:mt-20 rounded-2xl overflow-hidden border border-neutral-800">
          <div className="relative">
            <img
              src="/assets/images/banners/rayforce-charging.avif"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div
              className={cn("absolute top-4 left-4 text-sm", theme.accentText)}
            >
              ✔ Seguro
            </div>
          </div>
        </div> */}

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-6 text-center">
          <p>No arriesgues la protección de tu hogar.</p>
          <p className={cn("text-2xl font-medium", theme.accentText)}>
            Instalá un Wallbox y descansá tranquilo.
          </p>
          <div className="flex flex-col items-center gap-2">
            <a
              href={mpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2.5 px-5 py-3 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-[#009EE3]/40 shadow-sm font-semibold text-sm transition-colors duration-200"
            >
              <span className="text-[#0a0080] uppercase tracking-tighter">
                Comprar con
              </span>
              <img
                src="/images/icons/mpago.png"
                alt="MercadoPago"
                className="h-8 w-auto"
              />
            </a>
            <span className="text-[11px] text-neutral-500">
              *Hasta 12 cuotas sin interés.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
