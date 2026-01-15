import { DemoVideoModal } from "@/components/DemoVideoModal";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export function HeroIntro() {
  return (
    <div className="relative z-10 max-w-3xl">
      <h1
        className="
          text-4xl sm:text-5xl lg:text-6xl
          font-semibold
          tracking-tighter
          bg-linear-to-t pb-2
          from-neutral-300
          to-white
          bg-clip-text
          text-transparent
        "
      >
        Cargá tu vehículo con la energía del futuro.
      </h1>

      <p
        className="
          mt-6 text-lg
          bg-linear-to-b py-2
          from-stone-300
          to-stone-400
          bg-clip-text
          text-transparent
        "
      >
        Rayforce trae a Uruguay la nueva línea de cargadores{" "}
        <strong>EV Wallbox</strong> desarrollados por
        <strong> Besen</strong>, pensados para hogares, empresas y flotas
        eléctricas.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <Button asChild variant="outline">
          <Link
            href="#productos"
            scroll
            className="hover:text-green-300 transition-all duration-400 text-green-400 border-green-700! hover:border-green-400 py-6! w-40"
          >
            Ver modelos
          </Link>
        </Button>

        <DemoVideoModal />
      </div>
    </div>
  );
}
