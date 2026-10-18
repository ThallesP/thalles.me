import { cacheLife } from "next/cache";

import type { RepoStats } from "@/entities/repo-stats";

type GitHubRepo = {
	name: string;
	html_url: string;
	language: string | null;
	stargazers_count: number;
	pushed_at: string;
};

export async function getRepoStatsByName() {
	"use cache";
	cacheLife("hours");

	const response = await fetch(
		"https://api.github.com/users/ThallesP/repos?per_page=100&sort=pushed",
		{
			headers: { Accept: "application/vnd.github+json" },
		},
	);
	if (!response.ok)
		throw new Error(`GitHub repos request failed with ${response.status}`);

	const repos: GitHubRepo[] = await response.json();

	return Object.fromEntries(
		repos.map((repo): [string, RepoStats] => [
			repo.name,
			{
				name: repo.name,
				url: repo.html_url,
				language: repo.language,
				stars: repo.stargazers_count,
				pushedAt: repo.pushed_at,
			},
		]),
	);
}
