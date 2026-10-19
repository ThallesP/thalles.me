import { cacheLife } from "next/cache";

import {
	getLargestSourceUrl,
	readScriptContent,
	SPOTIFY_USER_AGENT,
	type SpotifyImageSource,
} from "./spotify";

export type SpotifyPlaylistTrack = {
	title: string;
	artists: string[];
	previewUrl: string | null;
};

export type SpotifyPlaylist = {
	id: string;
	name: string;
	url: string;
	coverUrl: string | null;
	tracks: SpotifyPlaylistTrack[];
};

type SpotifyEmbedTrack = {
	title: string;
	subtitle: string;
	audioPreview: { url: string } | null;
};

type SpotifyEmbedPlaylist = {
	name: string;
	coverArt: { sources: SpotifyImageSource[] } | null;
	trackList: SpotifyEmbedTrack[];
};

type SpotifyEmbedPageProps =
	| { status: 404; state?: undefined }
	| { status?: undefined; state: { data: { entity: SpotifyEmbedPlaylist } } };

type SpotifyEmbedData = { props: { pageProps: SpotifyEmbedPageProps } };

export async function getSpotifyPlaylist(
	id: string,
): Promise<SpotifyPlaylist | null> {
	"use cache";
	cacheLife("hours");

	const response = await fetch(
		`https://open.spotify.com/embed/playlist/${id}`,
		{ headers: { "User-Agent": SPOTIFY_USER_AGENT } },
	);
	if (response.status === 404) return null;
	if (!response.ok)
		throw new Error(
			`Spotify playlist embed request failed with ${response.status}`,
		);

	const {
		props: { pageProps },
	}: SpotifyEmbedData = JSON.parse(
		readScriptContent(await response.text(), "__NEXT_DATA__"),
	);
	if (pageProps.state === undefined) return null;

	const { name, coverArt, trackList } = pageProps.state.data.entity;

	return {
		id,
		name,
		url: `https://open.spotify.com/playlist/${id}`,
		coverUrl: coverArt === null ? null : getLargestSourceUrl(coverArt.sources),
		tracks: trackList.map(({ title, subtitle, audioPreview }) => ({
			title,
			artists: subtitle.split(/,\s/),
			previewUrl: audioPreview === null ? null : audioPreview.url,
		})),
	};
}
