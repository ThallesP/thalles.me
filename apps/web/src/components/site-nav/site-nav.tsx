"use client";

import { cn } from "@thalles-me/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Track } from "@/entities/track";

import { NowPlayingChip } from "./now-playing-chip";

const links = [
	{ href: "/", label: "Home" },
	{ href: "/projects", label: "Projects" },
	{ href: "/music", label: "Music" },
	{ href: "/setup", label: "Setup" },
	{ href: "/ai", label: "AI" },
] as const;

export type SiteNavProps = {
	nowPlaying: Track;
};

export function SiteNav({ nowPlaying }: SiteNavProps) {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-50 flex justify-center px-3 py-3.5">
			<nav className="flex items-center gap-1 rounded-full bg-card/60 p-1.5 shadow-[inset_0_0_0_0.5px_rgb(255_255_255/0.14),0_8px_24px_rgb(0_0_0/0.4)] backdrop-blur-xl backdrop-saturate-150">
				{links.map(({ href, label }) => (
					<Link
						key={href}
						href={href}
						aria-current={pathname === href ? "page" : undefined}
						className={cn(
							"rounded-full px-4 py-1.5 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground",
							"aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground",
						)}
					>
						{label}
					</Link>
				))}
				<span
					aria-hidden
					className="mx-1 hidden h-5 w-px bg-white/20 sm:block"
				/>
				<NowPlayingChip track={nowPlaying} />
			</nav>
		</header>
	);
}
