import type { Metadata } from "next";
import "./globals.css";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";

// Load the font
const lexend = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-sans", // 👈 match ShadCN/Tailwind expected token
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
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
    <html suppressHydrationWarning className={`${lexend.variable}`}>
      <body className="transition-all min-w-dvw min-h-dvh overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
