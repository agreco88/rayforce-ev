"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Copy, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";

import { useTrack } from "@/lib/analytics/use-track";
import { INSTAGRAM } from "@/lib/social-links";
import { buildWhatsAppHref, WHATSAPP_NUMBER } from "@/lib/whatsapp";

/** El pie del menu mobile: el telefono para llamar o abrir WhatsApp, el mail
 *  de ventas para escribir o copiar, y abajo Instagram, el dominio y la
 *  direccion. Los datos son los del footer. */
export function MobileMenuContact() {
  const t = useTranslations("Layout.Header.menu");
  const tContact = useTranslations("Footer.contact");
  const track = useTrack();

  return (
    <div className="flex flex-col gap-3 px-4">
      <ContactCard
        label={t("phone.label")}
        value={tContact("phone")}
        href={`tel:+${WHATSAPP_NUMBER}`}
        action={t("phone.cta")}
        icon={<Phone className="size-4" />}
        valueClassName="text-3xl"
        secondary={
          <a
            href={buildWhatsAppHref()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track.whatsappClick({ source: "mobile_menu" })}
            className="flex h-12 items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-800"
          >
            <FaWhatsapp className="size-4 text-[#25D366]" aria-hidden="true" />
            WhatsApp
          </a>
        }
      />
      <ContactCard
        label={t("email.label")}
        value={tContact("email")}
        href={`mailto:${tContact("email")}`}
        action={t("email.cta")}
        icon={<Mail className="size-4" />}
        onAction={() => track.emailLinkClicked()}
        valueClassName="text-xl"
        secondary={<CopyButton value={tContact("email")} />}
      />

      <div className="mt-6 flex flex-col items-center gap-4 text-center">
        <a
          href={INSTAGRAM.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
        >
          <FaInstagram className="size-5" aria-hidden="true" />
          {INSTAGRAM.handle}
        </a>

        <div className="flex flex-col gap-1 text-[11px] text-neutral-500">
          <span className="font-medium uppercase tracking-widest">rayforce.uy</span>
          <span>{tContact("address")}</span>
        </div>
      </div>
    </div>
  );
}

function ContactCard({
  label,
  value,
  href,
  action,
  icon,
  onAction,
  valueClassName,
  secondary,
}: {
  label: string;
  value: string;
  href: string;
  action: string;
  icon: ReactNode;
  onAction?: () => void;
  valueClassName: string;
  secondary: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <span className="text-xs uppercase tracking-widest text-neutral-500">
        {label}
      </span>
      <a
        href={href}
        onClick={onAction}
        className={`mt-2 block font-light tracking-tight break-all text-neutral-900 dark:text-white ${valueClassName}`}
      >
        {value}
      </a>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <a
          href={href}
          onClick={onAction}
          className="flex h-12 items-center justify-center gap-2 rounded-lg bg-green-500 px-4 text-sm font-medium text-black transition-colors hover:bg-green-400"
        >
          {icon}
          {action}
        </a>
        {secondary}
      </div>
    </div>
  );
}

/** Adaptado del ejemplo "Copy Button" de Motion
 *  (https://examples.motion.dev/react/copy-button, MotionScore A). */
function CopyButton({ value }: { value: string }) {
  const t = useTranslations("Layout.Header.menu");
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => () => clearTimeout(timerRef.current!), []);

  const handleCopy = async () => {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Sin HTTPS (el dev abierto en el celular por la IP de la red) no hay
      // `navigator.clipboard`: queda el metodo viejo.
      const input = document.createElement("textarea");
      input.value = value;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(true);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`flex h-12 items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors ${
        copied
          ? "border-green-500/30 text-green-600 dark:text-green-400"
          : "border-neutral-200 text-neutral-900 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-800"
      }`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? "copied" : "copy"}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="flex items-center gap-2"
        >
          {copied ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
              aria-hidden="true"
            >
              <motion.path
                d="M4 12l5 5L20 6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
              />
            </svg>
          ) : (
            <Copy className="size-4" />
          )}
          {t(copied ? "copied" : "copy")}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
