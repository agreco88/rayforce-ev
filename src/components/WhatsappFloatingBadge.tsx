"use client";

import { FaWhatsapp } from "react-icons/fa6";
import Link from "next/link";
import { motion } from "framer-motion";

type WhatsappFloatingBadgeProps = {
  phone: string; // e.g. "59899123456"
  message?: string;
};

export function WhatsappFloatingBadge({
  phone,
  message = "Hola! Quiero información sobre Rayforce EV 🚗⚡",
}: WhatsappFloatingBadgeProps) {
  const encodedMessage = encodeURIComponent(message);

  const href = `https://wa.me/${phone}?text=${encodedMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 }}
      className="
        fixed
        bottom-6
        right-6
        z-[100]
      "
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="
          flex items-center justify-center
          h-14 w-14
          rounded-full
          shadow-neutral-900
          bg-green-800
          text-white
          shadow-lg
          hover:scale-110
          transition-all duration-300
        "
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp size={28} />
      </Link>
    </motion.div>
  );
}
