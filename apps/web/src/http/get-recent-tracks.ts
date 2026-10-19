import { cacheLife } from "next/cache";

import type { Listening } from "@/entities/listening";
import type { RecentTrack } from "@/entities/recent-track";
import type { Track } from "@/entities/track";
import { ENV } from "@/env.server";

import {
	getLargestImageUrl,
	LASTFM_USERNAME,
	type LastFmImage,
} from "./lastfm";

type LastFmTrack = {
	name: string;
	artist: { "#text": string };
	album: { "#text": string };
	image: LastFmImage[];
};

type LastFmNowPlayingTrack = LastFmTrack & {
	"@attr": { nowplaying: "true" };
	date?: undefined;
};

type LastFmScrobbledTrack = LastFmTrack & {
	"@attr"?: undefined;
	date: { uts: string; "#text": string };
};

type RecentTracksResponse = {
	recenttracks: {
		track: (LastFmNowPlayingTrack | LastFmScrobbledTrack)[];
	};
};

function toTrack({ name, artist, album, image }: LastFmTrack): Track {
	return {
		title: name,
		artist: artist["#text"],
		album: album["#text"],
		artworkUrl: getLargestImageUrl(image),
	};
}

const cacheProfiles = {
	page: { stale: 300, revalidate: 60, expire: 3600 },
	live: { stale: 30, revalidate: 10, expire: 60 },
} as const;

export async function getRecentTracks(
	cacheProfile: keyof typeof cacheProfiles,
): Promise<Listening> {
	"use cache";
	cacheLife(cacheProfiles[cacheProfile]);

	const search = new URLSearchParams({
		method: "user.getrecenttracks",
		user: LASTFM_USERNAME,
		api_key: ENV.LASTFM_API_KEY,
		format: "json",
		limit: "7",
	});
	const response = await fetch(`https://ws.audioscrobbler.com/2.0/?${search}`);
	if (!response.ok)
		throw new Error(
			`Last.fm recent tracks request failed with ${response.status}`,
		);

	const { recenttracks }: RecentTracksResponse = await response.json();
	const [latestTrack] = recenttracks.track;
	const recentTracks = recenttracks.track
		.filter((track) => track !== latestTrack)
		.filter((track) => track.date !== undefined)
		.slice(0, 6)
		.map(
			(track): RecentTrack => ({
				...toTrack(track),
				playedAtMs: Number(track.date.uts) * 1000,
			}),
		);

	return {
		latestTrack: toTrack(latestTrack),
		isNowPlaying: latestTrack["@attr"] !== undefined,
		recentTracks,
		fetchedAtMs: Date.now(),
	};
}
