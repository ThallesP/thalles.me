import { cacheLife } from "next/cache";

import type { TokenProfileStats } from "@/entities/token-usage";

type TokenProfileResponse = {
	stats: TokenProfileStats;
	user: {
		avatarUrl: string;
		login: string;
		name: string;
	};
};

export async function getTokenProfile() {
	"use cache";
	cacheLife("hours");

	const response = await fetch("https://api.tokenmaxxing.sh/profiles/thallesp");
	if (!response.ok)
		throw new Error(
			`tokenmaxxing profile request failed with ${response.status}`,
		);

	const { stats }: TokenProfileResponse = await response.json();

	return stats;
}
