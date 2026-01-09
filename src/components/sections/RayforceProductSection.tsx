import { ChargerShowcase } from "./ChargerSwocase";
import { ComparisonTable } from "./ComparisonTable";

export function RayforceProductSection() {
  return (
    <section
      id="productos"
      className="relative bg-linear-to-b from-neutral-950 to-neutral-900 text-white pt-38 gap-32 flex flex-col"
    >
      {/* Header */}
      <div className="mx-auto max-w-7xl px-6  text-center">
        <h2
          className="text-4xl font-medium tracking-tight sm:text-5xl                 bg-linear-to-b pb-2
                from-neutral-100
                to-neutral-300
                bg-clip-text
                text-transparent"
        >
          Elegí el cargador ideal para tu instalación
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
          Compará configuraciones y prestaciones para encontrar la mejor opción
          según tu uso.
        </p>
      </div>
      <ChargerShowcase />

      <div className="border-t border-neutral-800 to bg-neutral-950">
        <ComparisonTable />
      </div>
    </section>
  );
}
