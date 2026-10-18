import { cacheLife } from "next/cache";

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

export async function getRecentTracks() {
	"use cache";
	cacheLife("minutes");

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
	};
}
