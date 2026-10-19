import { cacheLife } from "next/cache";

import {
	getLargestSourceUrl,
	readScriptContent,
	SPOTIFY_USER_AGENT,
	type SpotifyImageSource,
} from "./spotify";

export type SpotifyUser = {
	id: string;
	name: string;
	url: string;
	avatarUrl: string | null;
	playlistIds: string[];
};

type SpotifyPublicPlaylist = {
	_uri: string;
	data: { __typename: "Playlist" } | { __typename: "NotFound" };
};

type SpotifyUserEntity = {
	name: string;
	avatar: { sources: SpotifyImageSource[] } | null;
	publicPlaylistsV2: { items: SpotifyPublicPlaylist[] };
};

type SpotifyUserPageState = {
	entities: { items: Record<`spotify:user:${string}`, SpotifyUserEntity> };
};

export async function getSpotifyUser(id: string): Promise<SpotifyUser | null> {
	"use cache";
	cacheLife("hours");

	const url = `https://open.spotify.com/user/${encodeURIComponent(id)}`;
	const response = await fetch(url, {
		headers: { "User-Agent": SPOTIFY_USER_AGENT },
	});
	if (response.status === 404) return null;
	if (!response.ok)
		throw new Error(`Spotify user page request failed with ${response.status}`);

	const encodedState = readScriptContent(await response.text(), "initialState");
	const { entities }: SpotifyUserPageState = JSON.parse(
		Buffer.from(encodedState, "base64").toString(),
	);
	const { name, avatar, publicPlaylistsV2 } =
		entities.items[`spotify:user:${id}`];

	const playlistIds = publicPlaylistsV2.items
		.filter(({ data }) => data.__typename === "Playlist")
		.map(({ _uri }) => _uri.replace("spotify:playlist:", ""));

	return {
		id,
		name,
		url,
		avatarUrl: avatar === null ? null : getLargestSourceUrl(avatar.sources),
		playlistIds: [...new Set(playlistIds)],
	};
}
