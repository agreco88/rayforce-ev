import { HomeLineupGuide } from "@/components/sections/home/lineup/HomeLineupGuide";

/**
 * La guia de 3 pasos del lineup, sin su header ni la grilla de productos: el
 * hero de /cargadores ya cubre titulo y descripcion, y la grilla ya esta ahi
 * arriba. Desktop en fila, mobile apilada — mismo `HomeLineupGuide`.
 */
export function ChargersLineupGuideSection() {
  return (
    <section className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-16 2xl:px-0 py-16 lg:py-20">
      <div className="hidden lg:block">
        <HomeLineupGuide columns={3} />
      </div>
      <div className="lg:hidden">
        <HomeLineupGuide columns={1} />
      </div>
    </section>
  );
}
