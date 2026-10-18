import { cacheLife } from "next/cache";

import type { TokenUsageDay } from "@/entities/token-usage";

type TokenDailyResponse = {
	days: TokenUsageDay[];
	range: {
		firstDate: string;
		lastDate: string;
	};
};

export type GetTokenDailyInput = {
	since: string;
	until: string;
	groupBy: "model" | "source";
};

export async function getTokenDaily({
	since,
	until,
	groupBy,
}: GetTokenDailyInput) {
	"use cache";
	cacheLife("hours");

	const search = new URLSearchParams({ since, until, groupBy });
	const response = await fetch(
		`https://api.tokenmaxxing.sh/profiles/thallesp/daily?${search}`,
	);
	if (!response.ok)
		throw new Error(
			`tokenmaxxing daily request failed with ${response.status}`,
		);

	const { days }: TokenDailyResponse = await response.json();

	return days;
}
