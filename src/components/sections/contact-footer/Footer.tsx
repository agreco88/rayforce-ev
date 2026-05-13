// "use client";

// import { useTranslations } from "next-intl";

// import { FooterCTA } from "./FooterCTA";
// import { FooterBrand } from "./FooterBrand";
// import { FooterNavColumn } from "./FooterNavColumn";
// import { FooterContactColumn } from "./FooterContactColumn";
// import { FooterMeta } from "./FooterMeta";

// export default function Footer({ id }: { id?: string }) {
//   const t = useTranslations("Footer");

//   return (
//     <footer
//       id={id}
//       className="bg-gradient-to-t from-neutral-900 via-neutral-950 to-neutral-950 text-neutral-200  border-white/10"
//     >
//       {" "}
//       <div className="mb-48 h-px w-full bg-gradient-to-r from-transparent via-green-700/25 to-transparent" />
//       <div className="mx-auto max-w-7xl  px-6 lg:px-8">
//         <FooterCTA />

//         {/* Main footer content */}
//         <div
//           className="
//             mt-48
//             border-t border-white/10
//             pt-12
//             grid
//             grid-cols-1
//             gap-14
//             md:grid-cols-12
//             md:gap-8
//           "
//         >
//           <div className="md:col-span-4">
//             <FooterBrand />
//           </div>
//           <div className="md:col-span-2"></div>
//           <div className="md:col-span-3">
//             <FooterNavColumn />
//           </div>

//           <div className="md:col-span-3 md:justify-self-end">
//             <FooterContactColumn />
//           </div>
//         </div>

//         {/* Bottom meta */}
//         <FooterMeta />
//       </div>
//     </footer>
//   );
// }

"use client";

import HeaderLogo from "@/components/layout/header/header-logo";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FooterCTA } from "./FooterCTA";

const socials = [
  {
    key: "x",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    key: "ig",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    key: "yt",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 4 12 4 12 4s-7.5 0-9.4.4A3 3 0 0 0 .5 6.5C0 8.4 0 12 0 12s0 3.6.5 5.5a3 3 0 0 0 2.1 2.1C4.5 20 12 20 12 20s7.5 0 9.4-.4a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.5.5-5.5s0-3.6-.5-5.5zM9.6 15.6V8.4l6.4 3.6z" />
      </svg>
    ),
  },
  {
    key: "li",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zm7 0h3.8v1.7h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.78 2.66 4.78 6.12V21h-4v-5.5c0-1.3-.02-3-1.83-3s-2.11 1.43-2.11 2.9V21h-4z" />
      </svg>
    ),
  },
];

const cols = [
  {
    title: "Pagina Principal",
    links: ["Inicio", "Beneficios", "Productos", "Preguntas frecuentes"],
  },
  {
    title: "Cargadores",
    links: ["Residencial 7w", "Residencial 11w", "Industrial 22w"],
  },
] as const;

export function Footer() {
  const t = useTranslations("Footer.brand");
  return (
    <footer
      id="footer"
      className="relative w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 overflow-hidden bg-neutral-950"
    >
      <div className="relative max-w-[1400px] mx-auto w-full">
        <FooterCTA />
        <div className="my-24 mb-48 h-[2px] w-full bg-gradient-to-r from-transparent via-green-700/25 to-transparent" />

        <div
          className="relative  mt-48 w-full"
          aria-hidden="true"
          style={{
            fontSize: "min(14.2vw, 210px)",
            height: "0.74em",
            maskImage: "linear-gradient(to bottom, #000 50%, transparent 95%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 50%, transparent 95%)",
          }}
        >
          <div
            className="absolute inset-0 flex justify-center uppercase leading-none whitespace-nowrap text-white dark:hidden"
            style={{
              fontSize: "inherit",
              letterSpacing: "0.15em",
              paddingLeft: "0.15em",
              textShadow:
                "0 -1.5px 0 rgba(115,115,115,0.7), 1.5px 0 0 rgba(115,115,115,0.7), 0 1.5px 0 rgba(115,115,115,0.7), -1.5px 0 0 rgba(115,115,115,0.7), 1px 1px 0 rgba(115,115,115,0.7), -1px -1px 0 rgba(115,115,115,0.7), 1px -1px 0 rgba(115,115,115,0.7), -1px 1px 0 rgba(115,115,115,0.7)",
            }}
          >
            Rayforce
          </div>
          <div
            className="absolute inset-0 hidden dark:flex justify-center font-bold uppercase leading-none whitespace-nowrap text-neutral-400"
            style={{
              fontSize: "inherit",
              letterSpacing: "0.15em",
              paddingLeft: "0.15em",
              textShadow:
                "0 -1.5px 0 rgba(163,163,163,0.55), 1.5px 0 0 rgba(163,163,163,0.55), 0 1.5px 0 rgba(163,163,163,0.55), -1.5px 0 0 rgba(163,163,163,0.55), 1px 1px 0 rgba(163,163,163,0.55), -1px -1px 0 rgba(163,163,163,0.55), 1px -1px 0 rgba(163,163,163,0.55), -1px 1px 0 rgba(163,163,163,0.55)",
            }}
          >
            Rayforce
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-neutral-500 dark:text-white/60">
          <p className="text-xs">
            © 2026 Rayforce. Todos los derechos reservados
          </p>
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.key}
                href="#"
                className="w-9 h-9  rounded-md  border-neutral-300 dark:border-white/30 text-neutral-700 dark:text-white/80 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-white/10 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-5 text-xs">
            <a
              href="#"
              className="hover:text-neutral-900 dark:hover:text-green-500 transition-colors "
            >
              Inicio
            </a>
            <a
              href="#"
              className="hover:text-neutral-900 dark:hover:text-green-500 transition-colors "
            >
              Cargadores
            </a>
            <a
              href="#"
              className="hover:text-neutral-900 dark:hover:text-green-500 transition-colors "
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
