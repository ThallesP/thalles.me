import { cacheLife } from "next/cache";

import type { TopArtist } from "@/entities/top-artist";
import { ENV } from "@/env.server";

type TopArtistsResponse = {
	topartists: {
		artist: {
			name: string;
			playcount: string;
		}[];
	};
};

export type GetTopArtistsInput = {
	username: string;
	period: "overall" | "7day" | "1month" | "3month" | "6month" | "12month";
	limit: number;
};

export async function getTopArtists({
	username,
	period,
	limit,
}: GetTopArtistsInput) {
	"use cache";
	cacheLife("hours");

	const search = new URLSearchParams({
		method: "user.gettopartists",
		user: username,
		api_key: ENV.LASTFM_API_KEY,
		format: "json",
		period,
		limit: String(limit),
	});
	const response = await fetch(`https://ws.audioscrobbler.com/2.0/?${search}`);
	if (!response.ok)
		throw new Error(
			`Last.fm top artists request failed with ${response.status}`,
		);

	const { topartists }: TopArtistsResponse = await response.json();

	return topartists.artist.map(
		({ name, playcount }): TopArtist => ({
			name,
			playCount: Number(playcount),
		}),
	);
}
