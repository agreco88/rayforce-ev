"use client";

import {
  AlertTriangle,
  PlugZap,
  BatteryCharging,
  Smartphone,
  SlidersHorizontal,
  Clock,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

import Container from "@/components/layout/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

/* ------------------------------------------------------------------
 * Indicator
 * ---------------------------------------------------------------- */

function CarouselIndicator({
  total,
  index,
  color = "green",
}: {
  total: number;
  index: number;
  color?: "green" | "red";
}) {
  const barColor = color === "red" ? "bg-red-500" : "bg-green-500";

  return (
    <div className="mt-6 flex justify-center">
      <div className="relative h-1 w-24 rounded-full bg-neutral-800 overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 rounded-full transition-transform duration-300 ${barColor}`}
          style={{
            width: `${100 / total}%`,
            transform: `translateX(${index * 100}%)`,
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Mobile Section
 * ---------------------------------------------------------------- */

export function ChargingSafetyMobile() {
  const t = useTranslations("HomePage.ChargingSafetySection");

  const risks = [
    { key: "overload", icon: PlugZap },
    { key: "protections", icon: AlertTriangle },
    { key: "outlets", icon: PlugZap },
    { key: "batteryWear", icon: BatteryCharging },
  ] as const;

  const solutions = [
    { key: "smartScheduling", icon: Clock },
    { key: "mobileControl", icon: Smartphone },
    { key: "powerRegulation", icon: SlidersHorizontal },
    { key: "batteryCare", icon: BatteryCharging },
  ] as const;

  /* ---------------- RISKS carousel state ---------------- */
  const [riskApi, setRiskApi] = useState<CarouselApi | null>(null);
  const [riskIndex, setRiskIndex] = useState(0);

  useEffect(() => {
    if (!riskApi) return;

    const onSelect = () => {
      setRiskIndex(riskApi.selectedScrollSnap());
    };

    onSelect();
    riskApi.on("select", onSelect);

    return () => {
      riskApi.off("select", onSelect);
    };
  }, [riskApi]);

  /* ---------------- SOLUTIONS carousel state ---------------- */
  const [solutionApi, setSolutionApi] = useState<CarouselApi | null>(null);
  const [solutionIndex, setSolutionIndex] = useState(0);

  useEffect(() => {
    if (!solutionApi) return;

    const onSelect = () => {
      setSolutionIndex(solutionApi.selectedScrollSnap());
    };

    onSelect();
    solutionApi.on("select", onSelect);

    return () => {
      solutionApi.off("select", onSelect);
    };
  }, [solutionApi]);

  return (
    <section className="relative bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 py-24 border-t">
      <Container className="px-4 flex flex-col items-center text-left gap-3">
        {/* Header */}
        <h2 className="text-4xl text-balance font-medium tracking-tight ">
          {t("header.title")}
        </h2>

        <p className="whitespace-pre-line text-neutral-400 pt-6">
          {t("header.description")}
        </p>
        {/* ---------------- RISKS ---------------- */}
        <div className="mt-12 w-full">
          <h3 className="text-2xl  font-medium mr-6 text-pretty tracking-tight  text-white mb-6">
            {t("risks.title")}
          </h3>
          <Carousel opts={{ align: "center" }} setApi={setRiskApi}>
            <CarouselContent className="-ml-4 px-4">
              {risks.map(({ key, icon: Icon }) => (
                <CarouselItem key={key} className="basis-[90%] first:pl-0">
                  <div className="rounded-2xl border border-neutral-800 bg-neutral-900 min-h-80 justify-center flex flex-col px-6 gap-1">
                    <Icon className="size-15 self-start text-red-500" />
                    <h4 className="mt-4 text-lg text-balance font-medium text-white">
                      {t(`risks.items.${key}.title`)}
                    </h4>
                    <p className="mt-2 text-base text-neutral-400">
                      {t(`risks.items.${key}.description`)}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div
              aria-hidden
              className="
                pointer-events-none
                absolute inset-y-0 -right-2 w-12
                bg-gradient-to-l
                from-neutral-900
                to-transparent 
              "
            />
          </Carousel>

          <CarouselIndicator
            total={risks.length}
            index={riskIndex}
            color="red"
          />
        </div>

        {/* ---------------- SOLUTIONS ---------------- */}
        <div className="mt-12 w-full">
          <h3 className="text-2xl  font-medium mr-6 text-pretty tracking-tight text-white mb-6">
            {t("solutions.title")}
          </h3>
          <Carousel opts={{ align: "center" }} setApi={setSolutionApi}>
            <CarouselContent className="-ml-4 px-4">
              {solutions.map(({ key, icon: Icon }) => (
                <CarouselItem key={key} className="basis-[90%] first:pl-0">
                  <div className="rounded-2xl border border-neutral-800 bg-neutral-900 min-h-80 justify-center flex flex-col px-6 gap-1">
                    <Icon className="size-15 self-start text-green-500" />
                    <h4 className="mt-4 text-lg text-balance font-medium uppercase tracking-tight text-green-500">
                      {t(`solutions.items.${key}.title`)}
                    </h4>
                    <p className="mt-2 text-sm text-neutral-400">
                      {t(`solutions.items.${key}.description`)}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div
              aria-hidden
              className="
                pointer-events-none
                absolute inset-y-0 -right-2 w-12
                bg-gradient-to-l
                from-neutral-900
                to-transparent 
              "
            />
          </Carousel>

          <CarouselIndicator
            total={solutions.length}
            index={solutionIndex}
            color="green"
          />
        </div>

        {/* Closing */}
        <p className="mt-20 text-2xl text-center text-neutral-200 whitespace-pre-line">
          {t("closing")}
        </p>
      </Container>
    </section>
  );
}
