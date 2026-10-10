import { HomeAccessoriesDesktop } from "./HomeAccessoriesDesktop";
import { HomeAccessoriesMobile } from "./HomeAccessoriesMobile";

type Props = {
  id?: string;
};

/** Los accesorios (los tres cables y la columna), despues del lineup. */
export function HomeAccessoriesSection({ id }: Props) {
  return (
    <section id={id} className="border-y border-neutral-800 bg-neutral-950">
      {/* Corte en `lg`: abajo, las cuatro cards en 2x2 junto a la foto quedan
          demasiado angostas. */}
      <div className="hidden lg:block">
        <HomeAccessoriesDesktop />
      </div>
      <div className="lg:hidden">
        <HomeAccessoriesMobile />
      </div>
    </section>
  );
}
