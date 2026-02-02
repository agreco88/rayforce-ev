"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animation-variants";
import { cn } from "@/lib/utils";

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
      viewport={{ once: true, amount: 0.1 }}
      id={id}
      className={cn("relative w-full ", className)}
    >
      {children}
    </motion.section>
  );
}
