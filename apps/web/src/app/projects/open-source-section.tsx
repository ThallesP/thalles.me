import { GroupedList } from "@/components/grouped-list/grouped-list";
import { Section } from "@/components/section/section";
import { openSourceProjects } from "@/content/projects-open-source";
import type { RepoStats } from "@/entities/repo-stats";

import { OpenSourceRow } from "./open-source-row";

export type OpenSourceSectionProps = {
	repoStatsByName: Record<string, RepoStats>;
	nowMs: number;
};

export function OpenSourceSection({
	repoStatsByName,
	nowMs,
}: OpenSourceSectionProps) {
	return (
		<Section
			title="Open source"
			action={
				<a
					href="https://github.com/ThallesP?tab=repositories"
					className="text-[15px] text-link"
				>
					All repos
				</a>
			}
		>
			<GroupedList>
				{openSourceProjects.map((project) => (
					<OpenSourceRow
						key={project.repoName}
						project={project}
						stats={repoStatsByName[project.repoName]}
						nowMs={nowMs}
					/>
				))}
			</GroupedList>
		</Section>
	);
}
