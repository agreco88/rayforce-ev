import { AppBreadcrumb } from "@/components/ui/wrappers/AppBreadcrumb";
import { ChargerVariant } from "@/lib/chargers/chargers.type";

type Props = {
  variants: ChargerVariant[];
};

export function ChargersHero({ variants }: Props) {
  return (
    <div className="flex flex-col px-4 sm:px-0">
      <AppBreadcrumb
        items={[{ label: "Inicio", href: "/" }, { label: "Cargadores" }]}
      />
      <div className="flex flex-col py-7 gap-2.5">
        <h1 className="text-5xl sm:text-6xl text-green-400 font-thin">
          Cargadores eléctricos de tipo Wallbox
        </h1>
        <p className="text-neutral-400 max-w-2xl sm:max-w-4xl sm:py-4">
          Soluciones de carga para autos, SUV y camionetas eléctricas en
          Uruguay. Elegí la potencia que mejor se adapte a tu uso, con la
          familia de modelos de Besen BS20 en sus variantes de 7w, 11w y 22w
        </p>
      </div>
    </div>
  );
}
