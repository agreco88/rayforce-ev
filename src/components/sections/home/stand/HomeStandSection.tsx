import { GridBackground } from "@/components/shared/backgrounds/GridBackground";
import { HomeStandMobile } from "./HomeStandMobile";
import { HomeStandDesktop } from "./HomeStandDesktop";

type Props = {
  id?: string;
  /** En la home es una seccion mas; en /accesorios/columna-para-cargador es
   *  la pagina entera y su titulo pasa a ser el h1. */
  titleAs?: "h1" | "h2";
  /** Lo que va arriba del titulo en la subruta: el breadcrumb. */
  header?: React.ReactNode;
};

export function HomeStandSection({ id, titleAs = "h2", header }: Props) {
  return (
    <section
      id={id}
      // Como pagina (con `header`) no lleva borde arriba: bajaba el breadcrumb
      // 1px respecto del resto de las paginas.
      className={`relative overflow-hidden border-neutral-800 bg-neutral-900 ${header ? "border-b" : "border-y"}`}
    >
      <GridBackground
        cellSize={64}
        lineOpacity={0.3}
        className="opacity-30"
        maskImage="radial-gradient(ellipse 80% 60% at 50% 0%, #000 20%, transparent 80%)"
      />

      <div className="hidden lg:block">
        <HomeStandDesktop titleAs={titleAs} header={header} />
      </div>
      <div className="lg:hidden">
        <HomeStandMobile titleAs={titleAs} header={header} />
      </div>
    </section>
  );
}
