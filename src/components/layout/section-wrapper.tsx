"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animation-variants";
import React from "react";

type SectionWrapperProps = React.PropsWithChildren<{
  id?: string;
  className?: string;
}>;

export default function SectionWrapper({
  id,
  className,
  children,
}: SectionWrapperProps) {
  return (
    <motion.section
      variants={fadeIn(0.15)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      id={id}
      className="relative w-full scroll-mt-12"
    >
      {children}
    </motion.section>
  );
}
