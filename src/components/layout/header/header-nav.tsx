"use client";

import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/internal-nav-links";
import { waterfallList } from "@/lib/animation-variants";
import { LocaleSwitcherSelect } from "../locale-switcher/locale-switcher-select";
import HeaderNavLink from "./header-nav-link";

export default function HeaderNav() {
  return (
    <motion.nav
      variants={waterfallList}
      initial="hidden"
      animate="show"
      className="hidden md:flex flex-1 justify-between items-center "
    >
      <motion.ul
        variants={waterfallList}
        initial="hidden"
        animate="show"
        className="flex gap-4 flex-1 justify-center"
      >
        {NAV_LINKS.map((link) => (
          <HeaderNavLink key={link.href} href={link.href} label={link.label} />
        ))}
      </motion.ul>
      <LocaleSwitcherSelect />
    </motion.nav>
  );
}
