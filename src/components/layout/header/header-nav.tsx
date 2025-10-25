"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/internal-nav-links";
import { waterfallList, waterfallItem } from "@/lib/animation-variants";
import { LocaleSwitcherSelect } from "../locale-switcher/locale-switcher-select";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import clsx from "clsx";

export default function HeaderNav() {
	const t = useTranslations("Layout.Header");
	const pathname = usePathname();

	return (
		<motion.nav
			variants={waterfallList}
			initial="hidden"
			animate="show"
			className="hidden md:flex flex-1 justify-between items-center px-4"
		>
			<motion.ul
				variants={waterfallList}
				initial="hidden"
				animate="show"
				className="flex gap-4 flex-1 justify-start"
			>
				{NAV_LINKS.map((link) => (
					<motion.li key={link.href} variants={waterfallItem}>
						<Button
							asChild
							variant="ghost"
							className={clsx(
								"px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
								pathname === link.href && "border-b-primary text-primary"
							)}
						>
							<Link href={link.href}>{t(`nav.${link.label}`)}</Link>
						</Button>
					</motion.li>
				))}
			</motion.ul>
			<LocaleSwitcherSelect />
		</motion.nav>
	);
}
