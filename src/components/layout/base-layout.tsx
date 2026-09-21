import React from "react";
import clsx from "clsx";
import NavigationScroll from "./header/navigation-scroll";

type BaseLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export default function BaseLayout({ children, className }: BaseLayoutProps) {
  return (
    <div className={clsx("flex min-h-screen w-full flex-col", className)}>
      {/*
        El header se posiciona y anima solo: se esconde al bajar y vuelve al
        subir, asi que el `fixed` y el backdrop tienen que viajar con el
        elemento animado en vez de vivir en un wrapper de acá.
      */}
      <NavigationScroll />

      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
