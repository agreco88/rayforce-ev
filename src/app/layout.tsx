import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Website Template",
  description: "Next.js Website Template used for default landing pages",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
