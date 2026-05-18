"use client";

import { useEffect } from "react";
import { scrollToSection } from "@/lib/scroll-to-section";

export default function HashScrollOnMount() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);
    const timer = setTimeout(() => scrollToSection(id), 100);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
