"use client";

import { FiArrowRight } from "react-icons/fi";

import { Link } from "@/i18n/navigation";

type Props = {
  children: React.ReactNode;
  href: string;
  tag?: string;
  onClick?: () => void;
};

export function DotExpandBadge({ children, href, tag, onClick }: Props) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        group
        isolate
        flex h-10 w-fit items-center gap-2
        rounded-full
        border border-neutral-950/60
        bg-[length:200%_100%] bg-gradient-to-r
        from-green-500/25 via-green-300/45 to-green-500/25
        [will-change:background-position]
        [backface-visibility:hidden]
        animate-gradient-shift
        pr-2 pl-2
        text-green-50
        transition-colors duration-300 ease-in-out
        hover:border-neutral-950
      "
    >
      {tag ? (
        <span
          className="
            rounded-full
            bg-green-400
            px-2.5 py-0.5
            text-xs font-semibold tracking-wide uppercase
            text-neutral-950
          "
        >
          {tag}
        </span>
      ) : null}

      <span className={tag ? "text-sm" : "pl-2 text-sm"}>{children}</span>

      <span
        className="
          rounded-full
          bg-green-400
          p-1 text-sm
          transition-colors duration-300
          group-hover:bg-black
        "
      >
        <FiArrowRight
          className="
            translate-x-[200%]
            text-[0px] text-neutral-950
            transition-all duration-300
            group-hover:translate-x-0
            group-hover:text-lg
            group-hover:text-white
            group-active:-rotate-45
          "
        />
      </span>
    </Link>
  );
}
