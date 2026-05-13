import { EvCharger, ShieldCheck, HouseWifi } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type Theme = {
  accentText: string;
  divide: string;
  gradientLine: string;
};

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

const STATS = [
  {
    icon: HouseWifi,
    title: "Ideal para hogares",
    description: "Perfecto para uso residencial diario y nocturno.",
  },
  {
    icon: EvCharger,
    title: "Enfocado en ahorro",
    description: "Aprovechá la tarifa nocturna y ahorrá en cada carga.",
  },
  {
    icon: ShieldCheck,
    title: "Manejo desde el celular",
    description: "Cambiar horarios y monitorea desde el cel.",
  },
];

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

type Props = {
  theme: Theme;
};

export function ChargerModelHeroStats({ theme }: Props) {
  return (
    <div
      className={`grid grid-cols-3 mt-5 lg:mt-0 sm:grid-cols-3 gap-6 sm:gap-16 w-full sm:w-fit ${theme.divide}`}
    >
      {STATS.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex flex-col items-center gap-2 flex-1  sm:py-0  w-full sm:w-fit"
          >
            {/* Icon + Title */}
            <div
              className={`${theme.accentText} flex  flex-col  gap-2 items-center sm:items-center`}
            >
              <Icon className="size-8 stroke-[1.5]" />
              <h4 className="text-white font-medium text-center sm:text-center text-sm sm:text-lg">
                {item.title}
              </h4>{" "}
              {/* Divider */}
              <div
                className={`w-full h-[2px] bg-gradient-to-r ${theme.gradientLine} sm:my-1`}
              />
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm w-full flex items-center text-neutral-400 leading-relaxed text-pretty text-center sm:text-center max-w-[24ch]">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
