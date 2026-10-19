import type { Metadata } from "next";
import { cacheLife } from "next/cache";

import { railwayTemplates } from "@/content/projects-templates";
import { getRepoStatsByName } from "@/http/get-repo-stats-by-name";
import { getTemplateDeploysByCode } from "@/http/get-template-deploys-by-code";

import { ProjectsPage } from "./projects-page";

export const metadata: Metadata = {
	title: "Projects",
};

export default async function Page() {
	"use cache";
	cacheLife("hours");

	const [repoStatsByName, deploysByCode] = await Promise.all([
		getRepoStatsByName(),
		getTemplateDeploysByCode(railwayTemplates.map(({ code }) => code)),
	]);

	return (
		<ProjectsPage
			repoStatsByName={repoStatsByName}
			deploysByCode={deploysByCode}
		/>
	);
}
