import React from "react";
import clsx from "clsx";
import Header from "./header/header";

type BaseLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export default function BaseLayout({ children, className }: BaseLayoutProps) {
  return (
    <div className={clsx("flex min-h-screen w-full flex-col", className)}>
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  );
}
