import { cacheLife } from "next/cache";

import type { TopArtist } from "@/entities/top-artist";
import { ENV } from "@/env.server";

import { LASTFM_USERNAME } from "./lastfm";

type TopArtistsResponse = {
	topartists: {
		artist: {
			name: string;
			playcount: string;
		}[];
	};
};

export type GetTopArtistsInput = {
	period: "overall" | "7day" | "1month" | "3month" | "6month" | "12month";
};

export async function getTopArtists({ period }: GetTopArtistsInput) {
	"use cache";
	cacheLife("hours");

	const search = new URLSearchParams({
		method: "user.gettopartists",
		user: LASTFM_USERNAME,
		api_key: ENV.LASTFM_API_KEY,
		format: "json",
		period,
		limit: "6",
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
