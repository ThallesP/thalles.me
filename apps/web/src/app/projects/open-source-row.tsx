import Image from "next/image";

import { AppIcon } from "@/components/grouped-list/app-icon";
import { ListRow } from "@/components/grouped-list/list-row";
import { RepoMeta } from "@/components/repo-meta/repo-meta";
import type { OpenSourceProject } from "@/content/projects-open-source";
import type { RepoStats } from "@/entities/repo-stats";
import { formatTimeAgo } from "@/lib/format-time-ago";

export type OpenSourceRowProps = {
	project: OpenSourceProject;
	stats: RepoStats;
	nowMs: number;
};

export function OpenSourceRow({ project, stats, nowMs }: OpenSourceRowProps) {
	const pushedAgoMs = nowMs - Date.parse(stats.pushedAt);
	const isRecentlyPushed = pushedAgoMs < 180 * 86_400_000;
	const caption =
		project.note ??
		(isRecentlyPushed ? `Updated ${formatTimeAgo(pushedAgoMs)}` : null);

	return (
		<ListRow
			href={stats.url}
			leading={
				<AppIcon>
					<Image src={project.iconSrc} alt="" width={28} height={28} />
				</AppIcon>
			}
			title={project.title}
			description={
				<>
					{project.description}
					{caption && (
						<span className="mt-1 block text-[13px] text-muted-foreground/80">
							{caption}
						</span>
					)}
				</>
			}
			trailing={<RepoMeta stats={stats} />}
		/>
	);
}
