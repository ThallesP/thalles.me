import { ArrowUpRight, Star } from "lucide-react";

import type { RepoStats } from "@/entities/repo-stats";

export type RepoMetaProps = {
	stats: RepoStats;
};

export function RepoMeta({ stats }: RepoMetaProps) {
	const hasStars = stats.stars > 0;

	return (
		<>
			<span className="flex shrink-0 items-center gap-2.5 text-muted-foreground text-sm">
				{stats.language && (
					<span className="max-sm:hidden">{stats.language}</span>
				)}
				{hasStars && (
					<span className="inline-flex items-center gap-0.5 tabular-nums">
						<Star aria-hidden className="size-[15px] fill-current" />
						{stats.stars}
						<span className="sr-only"> stars</span>
					</span>
				)}
			</span>
			<ArrowUpRight
				aria-hidden
				className="size-[18px] shrink-0 text-muted-foreground opacity-60"
			/>
		</>
	);
}
