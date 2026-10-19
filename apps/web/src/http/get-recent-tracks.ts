import { cacheLife } from "next/cache";

import type { Listening } from "@/entities/listening";
import type { RecentTrack } from "@/entities/recent-track";
import type { Track } from "@/entities/track";
import { ENV } from "@/env.server";

import { findITunesArtworkUrl } from "./find-itunes-artwork-url";

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

async function toTrack({
	name,
	artist,
	album,
	image,
}: LastFmTrack): Promise<Track> {
	const artistName = artist["#text"];
	const artworkUrl =
		getLargestImageUrl(image) ??
		(await findITunesArtworkUrl(`${artistName} ${name}`, "song").catch(
			() => null,
		));

	return { title: name, artist: artistName, album: album["#text"], artworkUrl };
}

export async function getRecentTracks(): Promise<Listening> {
	"use cache";
	cacheLife({ stale: 30, revalidate: 10, expire: 60 });

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
	const recentTracks = await Promise.all(
		recenttracks.track
			.filter((track) => track !== latestTrack)
			.filter((track) => track.date !== undefined)
			.slice(0, 6)
			.map(
				async (track): Promise<RecentTrack> => ({
					...(await toTrack(track)),
					playedAtMs: Number(track.date.uts) * 1000,
				}),
			),
	);

	return {
		latestTrack: await toTrack(latestTrack),
		isNowPlaying: latestTrack["@attr"] !== undefined,
		recentTracks,
		fetchedAtMs: Date.now(),
	};
}
