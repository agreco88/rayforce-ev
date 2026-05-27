import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rayforce – Cargadores Wallbox en Uruguay",
  description:
    "Venta e instalación de cargadores Wallbox para vehículos eléctricos e híbridos en Uruguay. Equipos certificados por UTE y URSEA.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
