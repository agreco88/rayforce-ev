"use client";

import { motion } from "framer-motion";

import { waterfallList } from "@/lib/animation-variants";

import { LocaleSwitcherSelect } from "../locale-switcher/locale-switcher-select";

import NavLink from "./header-nav-link";
import HeaderProductsFlyout from "./header-products-flyout";

export default function HeaderNav() {
  return (
    <motion.nav
      variants={waterfallList}
      initial="hidden"
      animate="show"
      className="
        hidden md:flex
        flex-1
        items-center
        justify-between
      "
    >
      {/* -------------------------------------------------------------- */}
      {/* Navigation                                                     */}
      {/* -------------------------------------------------------------- */}

      <motion.ul
        variants={waterfallList}
        className="
          flex flex-1
          items-center
          justify-center
          gap-6
        "
      >
        {/* Inicio */}
        <NavLink sectionId="inicio" label="home" />

        {/* Products Flyout */}
        <HeaderProductsFlyout />

        {/* compatibility */}
        <NavLink sectionId="compatibilidad" label="compatibility" />
      </motion.ul>

      {/* -------------------------------------------------------------- */}
      {/* Locale Switcher                                                */}
      {/* -------------------------------------------------------------- */}

      <LocaleSwitcherSelect />
    </motion.nav>
  );
}
