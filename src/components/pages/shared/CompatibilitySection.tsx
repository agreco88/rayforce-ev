"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { FaWhatsapp } from "react-icons/fa";

import {
  ArrowRight,
  CheckIcon,
  ChevronRight,
  Search,
  SearchX,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

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
  accentRing: string;
};

type Props = {
  theme?: Theme;
  id?: string;
};

type Brand = {
  name: string;
  models: string[];
};

/* -------------------------------------------------------------------------- */
/*                              DEFAULT THEME                                 */
/* -------------------------------------------------------------------------- */

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
  accentRing: "ring-green-500",
};

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                  COMPONENT                                 */
/* -------------------------------------------------------------------------- */

export function CompatibilitySection({ theme, id }: Props) {
  const ui = theme ?? DEFAULT_THEME;

  const t = useTranslations("HomePage.CompatibilitySection");

  const [search, setSearch] = useState("");

  const whatsappNumber = "59892041709";

  /* ---------------------------------------------------------------------- */
  /* Utils                                                                  */
  /* ---------------------------------------------------------------------- */

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

      <span key="match" className={cn("font-semibold", ui.accentText)}>
        {text.slice(start, end)}
      </span>,

      <span key="after">{text.slice(end)}</span>,
    ];
  }

  /* ---------------------------------------------------------------------- */
  /* Filtering                                                              */
  /* ---------------------------------------------------------------------- */

  const filteredData = useMemo(() => {
    const term = normalize(search);

    if (!term) return COMPATIBILITY_DATA;

    return COMPATIBILITY_DATA.map((brand) => {
      const normalizedBrand = normalize(brand.name);

      const matchesBrand = normalizedBrand.includes(term);

      const matchingModels = brand.models.filter((model) =>
        normalize(model).includes(term),
      );

      if (matchingModels.length > 0) {
        return {
          ...brand,
          models: matchingModels,
        };
      }

      if (matchesBrand) {
        return brand;
      }

      return null;
    }).filter(Boolean) as Brand[];
  }, [search]);

  const isSearching = search.trim().length > 0;

  /* ---------------------------------------------------------------------- */
  /* Render                                                                 */
  /* ---------------------------------------------------------------------- */

  return (
    <section
      id={id}
      className="
        relative
        container
        mx-auto
        max-w-[1600px]

        bg-black

        px-6
        py-16

        sm:px-8
        sm:py-32
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}

      <div className="mx-auto max-w-3xl text-center">
        <p className={cn("text-sm uppercase tracking-[0.25em]", ui.accentText)}>
          {t("header.eyebrow")}
        </p>

        <h2 className="mt-4 text-4xl tracking-tight sm:text-6xl">
          {t("header.title")}
        </h2>

        <p className="mt-6 text-lg text-neutral-400">
          {t("header.description")}
        </p>

        {/* Search */}
        <div className="relative mx-auto mt-10 max-w-2xl">
          <Search
            className="
              absolute left-5 top-1/2
              size-5 -translate-y-1/2
              text-neutral-500
            "
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("search.placeholder")}
            className={cn(
              "h-14 w-full rounded-2xl",
              "border bg-neutral-950",
              "pl-14 pr-5",
              "text-neutral-200 placeholder:text-neutral-500",
              "focus:outline-none focus:ring-1",
              ui.accentBorder,
              ui.accentRing,
            )}
          />
        </div>
      </div>

      {/* Divider */}
      <div
        className={cn(
          "mt-14 mb-10 h-[2px] w-full bg-gradient-to-r opacity-50",
          ui.gradientLine,
        )}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Empty State                                                        */}
      {/* ------------------------------------------------------------------ */}

      {isSearching && filteredData.length === 0 && (
        <div
          className="
            relative
            mx-auto mt-10
            w-fit overflow-hidden

            rounded-3xl
            border border-green-500/20

            bg-gradient-to-br
            from-green-500/10
            via-green-500/[0.07]
            to-transparent

            p-6

            sm:mt-14
            sm:p-8
          "
        >
          <div
            className="
              absolute inset-0
              pointer-events-none
              bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_70%)]
            "
          />

          <div
            className="
              relative z-10

              flex flex-col gap-6

              sm:flex-row
              sm:items-center
              sm:justify-around
              sm:gap-32
            "
          >
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div
                className="
                  flex size-16 shrink-0
                  items-center justify-center
                  rounded-full
                  bg-green-700
                "
              >
                <FaWhatsapp className="size-20 text-white" />
              </div>

              <div className="mt-4 text-center sm:ml-8 sm:mt-0 sm:text-start">
                <h3
                  className="
                    text-xl
                    font-semibold
                    tracking-tight
                    text-white

                    sm:text-2xl
                  "
                >
                  {t("emptyState.title")}
                </h3>

                <p className="mt-4 text-neutral-300 sm:mt-2">
                  {t("emptyState.description")}
                </p>

                <p className="mt-5 text-sm text-neutral-500 sm:mt-3">
                  {t("emptyState.note")}
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "h-12 rounded-xl px-6",
                "font-medium text-black",
                "bg-green-400 transition-all hover:bg-green-500",
              )}
            >
              {t("cta.whatsapp")}
            </a>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Results                                                            */}
      {/* ------------------------------------------------------------------ */}

      {filteredData.length > 0 && (
        <>
          {/* Desktop */}
          <div className="hidden gap-16 md:grid md:grid-cols-2">
            {filteredData.map((brand) => (
              <div key={brand.name}>
                <h3
                  className="
                    mb-5
                    text-3xl
                    font-semibold
                    tracking-tight
                    text-white
                  "
                >
                  {brand.name}
                </h3>

                <div className="grid gap-2 xl:grid-cols-2">
                  {brand.models.map((model) => {
                    const message = encodeURIComponent(
                      t("whatsapp.message", { model }),
                    );

                    return (
                      <a
                        key={model}
                        href={`https://wa.me/${whatsappNumber}?text=${message}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          group

                          flex items-center justify-between

                          rounded-xl
                          border border-neutral-900

                          bg-neutral-950

                          px-4 py-3

                          transition-all duration-300

                          hover:border-green-500/30
                          hover:bg-neutral-900
                        "
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckIcon className={cn("size-4", ui.accentText)} />

                          <span className="flex flex-1 uppercase">
                            {highlightMatch(model, search)}
                          </span>
                        </div>

                        <div
                          className="
                            flex items-center gap-2

                            translate-x-2
                            opacity-0

                            transition-all duration-300

                            group-hover:translate-x-0
                            group-hover:opacity-100
                          "
                        >
                          <FaWhatsapp className="text-green-500" />

                          <span className="text-xs text-neutral-400">
                            {t("cta.contactSales")}
                          </span>

                          <ChevronRight className="size-3 text-neutral-500" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <Accordion type="multiple" className="flex flex-col gap-3">
              {filteredData.map((brand) => (
                <AccordionItem
                  key={brand.name}
                  value={brand.name}
                  className="
                    rounded-2xl
                    border border-neutral-900
                    bg-neutral-950
                    px-4
                  "
                >
                  <AccordionTrigger
                    className="
                      items-center
                      py-4
                      hover:no-underline
                    "
                  >
                    <span
                      className="
                        mx-2 my-1

                        text-xl
                        font-medium
                        uppercase
                        tracking-tighter
                        text-white
                      "
                    >
                      {brand.name}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="pb-4">
                    <div className="flex flex-col gap-1.5">
                      {brand.models.map((model) => {
                        const message = encodeURIComponent(
                          t("whatsapp.message", { model }),
                        );

                        return (
                          <div
                            key={model}
                            className="
                              flex items-center justify-between

                              rounded-xl
                              border border-neutral-900

                              bg-black/40

                              px-4 py-3
                            "
                          >
                            <span className="text-sm uppercase">
                              {highlightMatch(model, search)}
                            </span>

                            <a
                              href={`https://wa.me/${whatsappNumber}?text=${message}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="
                                flex w-15 justify-center
                                rounded-lg
                                border border-neutral-900
                                bg-neutral-900
                                py-1
                              "
                            >
                              <FaWhatsapp className="text-green-500" />
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Divider */}
          <div
            className={cn(
              "mt-14 mb-10 h-[2px] w-full bg-gradient-to-r opacity-50",
              ui.gradientLine,
            )}
          />

          {/* Banner */}
          <div
            className="
              relative
              mx-auto mt-10
              w-fit overflow-hidden

              rounded-3xl
              border border-green-500/20

              bg-gradient-to-br
              from-green-500/10
              via-green-500/[0.07]
              to-transparent

              p-6

              sm:mt-14
              sm:p-8
            "
          >
            <div
              className="
                absolute inset-0
                pointer-events-none
                bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.15),transparent_70%)]
              "
            />

            <div
              className="
                relative z-10

                flex flex-col gap-6

                sm:flex-row
                sm:items-center
                sm:justify-around
                sm:gap-32
              "
            >
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div
                  className="
                    flex size-16 shrink-0
                    items-center justify-center
                    rounded-full
                    bg-green-700
                  "
                >
                  <FaWhatsapp className="size-20 text-white" />
                </div>

                <div className="mt-4 text-center sm:ml-8 sm:mt-0 sm:text-start">
                  <h3
                    className="
                      text-2xl
                      font-bold
                      tracking-tight
                      text-white
                      normal-case
                      sm:text-3xl
                    "
                  >
                    {t("banner.title")}
                  </h3>

                  <p className="mt-4 text-neutral-300 sm:mt-2">
                    {t("banner.description")}
                  </p>

                  <p className="mt-5 text-sm text-neutral-500 sm:mt-3">
                    {t("banner.note")}
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  t("whatsapp.fallbackMessage"),
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "h-12 rounded-xl px-6",
                  "font-medium text-black",
                  "bg-green-400 transition-all hover:bg-green-500",
                )}
              >
                {t("cta.whatsapp")}
              </a>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
