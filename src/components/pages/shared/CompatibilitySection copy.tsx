"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

/* ------------------ Types ------------------ */

type Theme = {
  accentText: string;
  accentBg: string;
  accentHover: string;
  divide: string;
  gradientLine: string;
  accentSoft: string;
  accentBorder: string;
  accentGradient: string;
  glow: string;
  glowStrong: string;
};

type Props = {
  theme?: Theme;
};

type Brand = {
  name: string;
  models: string[];
};

/* ------------------ Default Theme (GREEN) ------------------ */

const DEFAULT_THEME: Theme = {
  accentText: "text-green-500",
  accentBg: "bg-green-500",
  accentHover: "hover:bg-green-400",
  divide: "divide-green-500/10",
  gradientLine:
    "from-transparent sm:from-green-600 via-green-700 to-transparent",
  accentSoft: "bg-green-500/10",
  accentBorder: "border-green-500/30",
  accentGradient: "from-green-400 via-green-500 to-emerald-400",
  glow: "rgba(34,197,94,0.25)",
  glowStrong: "rgba(22,163,74,0.35)",
};

/* ------------------ Data ------------------ */

const COMPATIBILITY_DATA: Brand[] = [
  {
    name: "BYD",
    models: [
      "Yuan Pro",
      "Yuan Plus",
      "Dolphin",
      "Dolphin Mini",
      "Seagull",
      "Seal",
      "Han",
      "Song Pro",
      "Song Plus",
      "Shark",
      "D1",
    ],
  },
  { name: "Dongfeng", models: ["Vigo", "Mage", "Huge", "Nammi", "Nano Box"] },
  {
    name: "Chery",
    models: ["eQ1", "eQ7", "Tiggo 4 ", "Tiggo 7 ", "Tiggo 8 "],
  },
  { name: "Chevrolet", models: ["Bolt EV", "Bolt EUV", "Spark EUV"] },
  { name: "Suzuki", models: ["Swift ", "Fronx "] },

  { name: "Geely", models: ["Geometry E", "Geometry C", "EX5"] },
  {
    name: "Omoda",
    models: ["5 SHS", "5 EV", "Jaecoo 7", "Jaecoo 6", "Jaecoo 5"],
  },
  { name: "Lynk & Co", models: ["01 ", "02 ", "08 EM-P", "Z10 EV"] },
  { name: "JAC", models: ["E2", "E-S1", "E-S2", "E-S3"] },
  {
    name: "GAC MOTOR",
    models: ["Aion Y", "Aion S", "Aion V", "Aion V Plus", "Aion ES"],
  },
  { name: "Hyundai", models: ["Kona ", "Ioniq ", "Ioniq 5"] },
  { name: "Jetour", models: ["T1", "T2", "X50", "X70"] },
  { name: "JMEV", models: ["GSE", "EV3"] },
  { name: "Kia", models: ["Niro EV", "EV6"] },
  {
    name: "Toyota",
    models: ["bZ4X", "Corolla ", "Corolla Cross ", "RAV4 "],
  },
  { name: "Leapmotor", models: ["T03", "C11"] },
  { name: "MG", models: ["MG4 ", "ZS EV", "Marvel R"] },
  { name: "Mini", models: ["Cooper SE "] },
  { name: "Nissan", models: ["Leaf"] },
  { name: "Renault", models: ["Kwid E-Tech", "Zoe"] },
  {
    name: "Audi",
    models: ["Q4 e-tron", "e-tron", "e-tron Sport", "e-tron GT"],
  },
  { name: "BMW", models: ["i3", "i4", "iX1", "iX3", "iX"] },

  {
    name: "Tesla",
    models: ["Model 3", "Model Y", "Model S", "Model X"],
  },

  { name: "Volkswagen", models: ["ID.3", "ID.4", "ID.5"] },
  { name: "Volvo", models: ["EX30", "XC40", "C40"] },
];

/* ------------------ Component ------------------ */

export function CompatibilitySection({ theme }: Props) {
  const t = theme ?? DEFAULT_THEME;
  const [search, setSearch] = useState("");

  /* ------------------ Utils ------------------ */

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "")
      .replace(/-/g, "");

  function highlightMatch(text: string, query: string) {
    if (!query) return text;

    const clean = (str: string) =>
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[\s-]/g, "");

    const normalizedText = clean(text);
    const normalizedQuery = clean(query);

    const index = normalizedText.indexOf(normalizedQuery);
    if (index === -1) return text;

    const map: number[] = [];
    let normalizedIndex = 0;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === " " || char === "-") continue;
      map[normalizedIndex++] = i;
    }

    const start = map[index];
    const end = map[index + normalizedQuery.length - 1] + 1;

    return [
      <span key="before">{text.slice(0, start)}</span>,
      <span key="match" className={cn("font-semibold", t.accentText)}>
        {text.slice(start, end)}
      </span>,
      <span key="after">{text.slice(end)}</span>,
    ];
  }

  /* ------------------ Filtering ------------------ */

  const filteredData = useMemo(() => {
    if (!search.trim()) return COMPATIBILITY_DATA;

    const term = normalize(search);

    return COMPATIBILITY_DATA.map((brand) => {
      const matchesBrand = normalize(brand.name).includes(term);

      const filteredModels = brand.models.filter((model) =>
        normalize(model).includes(term),
      );

      if (matchesBrand) return brand;

      if (filteredModels.length > 0) {
        return { ...brand, models: filteredModels };
      }

      return null;
    }).filter(Boolean) as Brand[];
  }, [search]);

  const whatsappNumber = "59892041709";

  /* ------------------ Render ------------------ */

  return (
    <section className="w-full relative container max-w-7xl mx-auto py-24">
      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <p className={cn("uppercase text-sm tracking-widest", t.accentText)}>
          Compatibilidad
        </p>

        <h2>¿Funciona con tu vehículo?</h2>

        <div className="text-neutral-400 space-y-3 pt-6 text-sm">
          <p>
            <span className={t.accentText}>✔</span> Compatible con modelos
            electricos y hibridos en Uruguay
          </p>
          <p>
            <span className={t.accentText}>✔</span> Estándar Tipo 2 (Europa /
            America Latina)
          </p>
          <p>
            <span className={t.accentText}>✔</span> BYD, Tesla, BMW, Hyundai y
            más
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-16">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar marca o modelo..."
          className={cn(
            "w-full px-4 py-3 rounded-xl",
            "bg-neutral-900 border border-neutral-800",
            "text-white placeholder:text-neutral-500",
            "focus:outline-none focus:ring-2",
            t.accentBorder,
          )}
        />
      </div>

      {/* Divider */}
      <div
        className={cn("h-px my-16 w-full bg-gradient-to-r", t.gradientLine)}
      />

      {/* Results */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 px-4 sm:px-0 sm:grid-cols-3 gap-8 sm:gap-16 divide-y divide-neutral-900">
          {filteredData.map((brand) => (
            <div key={brand.name} className="flex flex-col pb-8 sm:pb-16">
              <h3 className="text-4xl mb-8 tracking-tighter font-semibold text-white">
                {highlightMatch(brand.name, search)}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {brand.models.map((model) => (
                  <span
                    key={model}
                    className={cn(
                      "uppercase px-4 py-2 items-center flex rounded-md",
                      "bg-neutral-900 text-neutral-300 border border-neutral-800",
                    )}
                  >
                    {highlightMatch(model, search)}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center text-center gap-6 py-16">
          <div className="flex flex-col gap-2 text-center items-center justify-center">
            <h3 className={`text-2xl font-semibold mb-2 ${t.accentText} `}>
              ¿No encontráste tu modelo?
            </h3>
            <p className="text-neutral-400 text-lg w-xs">
              Te confirmamos compatibilidad en minutos por WhatsApp.
            </p>
          </div>{" "}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              `Hola! Quisiera consultar compatibilidad con modelo/marca: ${search}`,
            )}`}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-xl",
              t.accentBg,
              t.accentHover,
              "text-black font-medium",
            )}
          >
            <FaWhatsapp />
            Consultar
          </a>
        </div>
      )}
    </section>
  );
}
