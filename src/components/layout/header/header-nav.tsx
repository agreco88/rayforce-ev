"use client";

import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/internal-nav-links";
import { waterfallList } from "@/lib/animation-variants";
import { LocaleSwitcherSelect } from "../locale-switcher/locale-switcher-select";
import NavLink from "./header-nav-link";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function HeaderNav() {
  const activeId = useActiveSection(NAV_LINKS.map((l) => l.id));

  return (
    <motion.nav
      variants={waterfallList}
      initial="hidden"
      animate="show"
      className="hidden md:flex flex-1 justify-between items-center"
    >
      <motion.ul
        variants={waterfallList}
        className="flex gap-6 flex-1 justify-center"
      >
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.id}
            id={link.id}
            label={link.label}
            isActive={activeId === link.id}
          />
        ))}
      </motion.ul>

      <LocaleSwitcherSelect />
    </motion.nav>
  );
}
