import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Load the font
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta", // Optional, useful for Tailwind
  weight: ["200", "300", "400", "500", "600", "700"], // Include only what you need
  display: "swap", // ✅ <— this line is key
});

export const metadata: Metadata = {
  title: "Next.js Website Template",
  description: "Next.js Website Template used for default landing pages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={jakarta.variable}>
      <body className="transition-all min-w-dvw min-h-dvh overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
