import { PageColumn } from "@/components/page/page-column";
import { PageHeader } from "@/components/page/page-header";
import { SiteFooter } from "@/components/site-footer/site-footer";
import type { RepoStats } from "@/entities/repo-stats";

import { OpenSourceSection } from "./open-source-section";
import { TemplatesSection } from "./templates-section";
import { WorkSection } from "./work-section";

export type ProjectsPageProps = {
	repoStatsByName: Record<string, RepoStats>;
	deploysByCode: Record<string, number>;
	nowMs: number;
};

export function ProjectsPage({
	repoStatsByName,
	deploysByCode,
	nowMs,
}: ProjectsPageProps) {
	return (
		<div className="overflow-x-clip">
			<PageColumn>
				<PageHeader
					title="Projects"
					subtitle={
						<>
							Things I build because the existing ones annoyed me. Most of it is
							open source, and the code is on{" "}
							<a href="https://github.com/ThallesP" className="text-link">
								GitHub
							</a>
							.
						</>
					}
				/>
				<OpenSourceSection repoStatsByName={repoStatsByName} nowMs={nowMs} />
				<WorkSection />
				<TemplatesSection deploysByCode={deploysByCode} />
				<SiteFooter sources="Stars and pushes from GitHub, deploys from Railway." />
			</PageColumn>
		</div>
	);
}
