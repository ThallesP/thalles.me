import type { TasteProfile } from "@/entities/taste-profile";
import type { TopArtist } from "@/entities/top-artist";
import type { TopTrack } from "@/entities/top-track";
import {
	getSpotifyPlaylist,
	type SpotifyPlaylist,
} from "@/http/get-spotify-playlist";
import { getSpotifyUser } from "@/http/get-spotify-user";
import { resolveSpotifyShortLink } from "@/http/resolve-spotify-short-link";

import { parseSpotifyLink, type SpotifyLink } from "./spotify-link";

const PROFILE_PLAYLISTS_LIMIT = 10;

export class SpotifyLinkNotSupportedError extends Error {}

export class SpotifyPlaylistNotFoundError extends Error {}

export class SpotifyUserNotFoundError extends Error {}

async function resolveLink(input: string): Promise<SpotifyLink> {
	const link = parseSpotifyLink(input);
	if (link !== null) return link;

	const resolvedLink = parseSpotifyLink(await resolveSpotifyShortLink(input));
	if (resolvedLink === null) throw new SpotifyLinkNotSupportedError(input);

	return resolvedLink;
}

function listTracks(playlists: SpotifyPlaylist[]): TopTrack[] {
	return playlists.flatMap(({ tracks }) =>
		tracks.map(({ title, artists: [artist] }) => ({
			title,
			artist,
			playCount: 1,
		})),
	);
}

function countArtists(playlists: SpotifyPlaylist[]): TopArtist[] {
	const playCounts = new Map<string, number>();
	for (const { tracks } of playlists) {
		for (const {
			artists: [artist],
		} of tracks) {
			playCounts.set(artist, (playCounts.get(artist) ?? 0) + 1);
		}
	}

	return [...playCounts]
		.map(([name, playCount]) => ({ name, playCount }))
		.sort((a, b) => b.playCount - a.playCount);
}

async function getPlaylistTasteProfile(id: string): Promise<TasteProfile> {
	const playlist = await getSpotifyPlaylist(id);
	if (playlist === null)
		throw new SpotifyPlaylistNotFoundError(`Spotify playlist ${id} not found`);

	return {
		source: "spotify",
		name: playlist.name,
		url: playlist.url,
		avatarUrl: playlist.coverUrl,
		playUnit: "tracks",
		artists: countArtists([playlist]),
		tracks: listTracks([playlist]),
	};
}

async function getUserTasteProfile(id: string): Promise<TasteProfile> {
	const user = await getSpotifyUser(id);
	if (user === null)
		throw new SpotifyUserNotFoundError(`Spotify user ${id} not found`);

	const playlists = (
		await Promise.all(
			user.playlistIds
				.slice(0, PROFILE_PLAYLISTS_LIMIT)
				.map(getSpotifyPlaylist),
		)
	).filter((playlist) => playlist !== null);

	return {
		source: "spotify",
		name: user.name,
		url: user.url,
		avatarUrl: user.avatarUrl,
		playUnit: "tracks",
		artists: countArtists(playlists),
		tracks: listTracks(playlists),
	};
}

const tasteProfileByLinkKind: Record<
	SpotifyLink["kind"],
	(id: string) => Promise<TasteProfile>
> = {
	playlist: getPlaylistTasteProfile,
	user: getUserTasteProfile,
};

export async function getSpotifyTasteProfile(input: string) {
	const link = await resolveLink(input);

	return tasteProfileByLinkKind[link.kind](link.id);
}
