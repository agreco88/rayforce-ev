"use client";

import {
  AlertTriangle,
  PlugZap,
  BatteryCharging,
  ShieldCheck,
  Smartphone,
  SlidersHorizontal,
  Clock,
} from "lucide-react";
import Container from "@/components/layout/container";

export function ChargingSafetySection() {
  return (
    <section className="relative border-y border-neutral-800 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 py-24">
      <Container className="relative mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white">
            Cargá de forma segura.
            <br />
            Evitá riesgos innecesarios.
          </h2>

          <p className="mt-4 max-w-2xl text-neutral-400">
            Una carga sin control puede afectar tu instalación eléctrica, tu
            vehículo y la seguridad de tu hogar. Con el equipo adecuado, estos
            riesgos se evitan fácilmente.
          </p>
        </div>

        {/* Content */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Risks */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8">
            <h3 className="flex items-center gap-2 text-lg font-medium text-white">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              Riesgos comunes al cargar sin un equipo dedicado
            </h3>

            <ul className="mt-6 space-y-5">
              <RiskItem
                icon={PlugZap}
                title="Sobrecarga de la instalación"
                description="Adaptadores o enchufes domésticos no están preparados para cargas prolongadas de alta potencia."
              />
              <RiskItem
                icon={AlertTriangle}
                title="Uso de tomas Schuko adaptadas"
                description="Pueden sobrecalentarse, hacer saltar protecciones y generar riesgos eléctricos."
              />
              <RiskItem
                icon={BatteryCharging}
                title="Carga continua al 100%"
                description="Cargar siempre al máximo acelera el desgaste de la batería y reduce su vida útil."
              />
            </ul>

            <p className="mt-8 text-sm text-neutral-400">
              Cuidar tu auto también es cuidar tu casa y a quienes viven en
              ella.
            </p>
          </div>

          {/* Solutions */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
            <h3 className="flex items-center gap-2 text-lg font-medium text-white">
              <ShieldCheck className="h-5 w-5 text-green-400" />
              Cómo lo resuelve Rayforce
            </h3>

            <ul className="mt-6 space-y-5">
              <SolutionItem
                icon={Smartphone}
                title="Control inteligente desde el celular"
                description="Iniciá, pausá y monitoreá la carga en tiempo real desde la app."
              />
              <SolutionItem
                icon={Clock}
                title="Programación en horarios de menor costo"
                description="Cargá cuando la demanda es más baja y aprovechá tarifas más convenientes según tu plan con UTE."
              />
              <SolutionItem
                icon={SlidersHorizontal}
                title="Regulación de potencia"
                description="Ajustá la potencia de carga para adaptarla a tu instalación y evitar sobrecargas."
              />
              <SolutionItem
                icon={BatteryCharging}
                title="Cuidado de la batería"
                description="Configurá límites de carga, como el 80%, para prolongar la vida útil del vehículo."
              />
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function RiskItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <li className="flex gap-4">
      <Icon className="mt-1 h-5 w-5 text-neutral-400 shrink-0" />
      <div>
        <h4 className="text-sm font-medium text-white">{title}</h4>
        <p className="mt-1 text-sm leading-relaxed text-neutral-400">
          {description}
        </p>
      </div>
    </li>
  );
}

function SolutionItem({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <li className="flex gap-4">
      <Icon className="mt-1 h-5 w-5 text-green-400 shrink-0" />
      <div>
        <h4 className="text-sm font-medium text-white">{title}</h4>
        <p className="mt-1 text-sm leading-relaxed text-neutral-400">
          {description}
        </p>
      </div>
    </li>
  );
}
