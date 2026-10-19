import Image from "next/image";

import { AppIcon } from "@/components/grouped-list/app-icon";
import { ListRow } from "@/components/grouped-list/list-row";
import { RepoMeta } from "@/components/repo-meta/repo-meta";
import type { OpenSourceProject } from "@/content/projects-open-source";
import type { RepoStats } from "@/entities/repo-stats";

export type OpenSourceRowProps = {
	project: OpenSourceProject;
	stats: RepoStats;
};

export function OpenSourceRow({ project, stats }: OpenSourceRowProps) {
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
					{project.note && (
						<span className="mt-1 block text-[13px] text-muted-foreground/80">
							{project.note}
						</span>
					)}
				</>
			}
			trailing={<RepoMeta stats={stats} />}
		/>
	);
}
