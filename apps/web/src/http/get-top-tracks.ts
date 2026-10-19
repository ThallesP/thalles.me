import { cacheLife } from "next/cache";

import type { TopTrack } from "@/entities/top-track";
import { ENV } from "@/env.server";

type TopTracksResponse = {
	toptracks: {
		track: {
			name: string;
			playcount: string;
			artist: { name: string };
		}[];
	};
};

export type GetTopTracksInput = {
	username: string;
	period: "overall" | "7day" | "1month" | "3month" | "6month" | "12month";
	limit: number;
};

export async function getTopTracks({
	username,
	period,
	limit,
}: GetTopTracksInput) {
	"use cache";
	cacheLife("hours");

	const search = new URLSearchParams({
		method: "user.gettoptracks",
		user: username,
		api_key: ENV.LASTFM_API_KEY,
		format: "json",
		period,
		limit: String(limit),
	});
	const response = await fetch(`https://ws.audioscrobbler.com/2.0/?${search}`);
	if (!response.ok)
		throw new Error(
			`Last.fm top tracks request failed with ${response.status}`,
		);

	const { toptracks }: TopTracksResponse = await response.json();

	return toptracks.track.map(
		({ name, playcount, artist }): TopTrack => ({
			title: name,
			artist: artist.name,
			playCount: Number(playcount),
		}),
	);
}
