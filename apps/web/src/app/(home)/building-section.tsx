import Link from "next/link";

import { AppIcon } from "@/components/grouped-list/app-icon";
import { GroupedList } from "@/components/grouped-list/grouped-list";
import { ListRow } from "@/components/grouped-list/list-row";
import { RepoMeta } from "@/components/repo-meta/repo-meta";
import { Section } from "@/components/section/section";
import { buildingProjects } from "@/content/home-building-projects";
import { getRepoStatsByName } from "@/http/get-repo-stats-by-name";

export async function BuildingSection() {
	const repoStatsByName = await getRepoStatsByName();

	return (
		<Section
			title="Things I'm building"
			action={
				<Link href="/projects" className="text-[15px] text-link">
					All projects
				</Link>
			}
		>
			<figure className="mx-1 mt-0.5 mb-5 border-foreground border-l-3 pl-4.5">
				<blockquote className="text-[19px] leading-normal tracking-[-0.01em]">
					“They've often lived through the pain of bad software, diagnosed the
					cause of their suffering, and made it their mission to convince the
					world they have the right solution.”
				</blockquote>
				<figcaption className="mt-2 text-muted-foreground text-sm">
					a16z, on why they backed Svix. That's the kind of builder I'm trying
					to be.
				</figcaption>
			</figure>
			<GroupedList>
				{buildingProjects.map(({ repo, name, description, icon: Icon }) => {
					const stats = repoStatsByName[repo];

					return (
						<ListRow
							key={repo}
							href={stats.url}
							leading={
								<AppIcon>
									<Icon aria-hidden />
								</AppIcon>
							}
							title={name}
							description={description}
							trailing={<RepoMeta stats={stats} />}
						/>
					);
				})}
			</GroupedList>
		</Section>
	);
}
