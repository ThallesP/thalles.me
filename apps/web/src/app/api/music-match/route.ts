import { z } from "zod";

import type {
	MatchedArtist,
	MatchSong,
	MusicMatch,
} from "@/entities/music-match";
import { findArtworkUrlByArtist } from "@/entities/top-album";
import { findITunesArtworkUrl } from "@/http/find-itunes-artwork-url";
import { getTopAlbums } from "@/http/get-top-albums";
import { getTopArtists } from "@/http/get-top-artists";
import { getTopTracks } from "@/http/get-top-tracks";
import { LASTFM_USERNAME, LastFmUserNotFoundError } from "@/http/lastfm";
import { compareTastes } from "@/lib/compare-tastes";
import { getLastFmTasteProfile } from "@/lib/lastfm-taste-profile";
import {
	type MusicMatchQuery,
	parseMusicMatchQuery,
} from "@/lib/music-match-query";
import { getSpotifySearchUrl } from "@/lib/spotify-search-url";
import {
	getSpotifyTasteProfile,
	SpotifyLinkNotSupportedError,
	SpotifyPlaylistNotFoundError,
	SpotifyUserNotFoundError,
} from "@/lib/spotify-taste-profile";
import { writeIcebreakers } from "@/lib/write-icebreakers";

const MY_ARTISTS_LIMIT = 500;
const MY_TRACKS_LIMIT = 200;
const SHOWN_ARTISTS_LIMIT = 8;

const searchSchema = z.object({ q: z.string().trim().min(1) });

function getTasteProfile(query: MusicMatchQuery) {
	if (query.kind === "spotify") return getSpotifyTasteProfile(query.input);

	return getLastFmTasteProfile(query.username);
}

function errorResponse(message: string, status: number) {
	return Response.json({ message }, { status });
}

function toErrorResponse(error: unknown) {
	if (error instanceof LastFmUserNotFoundError)
		return errorResponse(`No Last.fm user called ${error.username}.`, 404);
	if (error instanceof SpotifyPlaylistNotFoundError)
		return errorResponse("That Spotify playlist isn't public.", 404);
	if (error instanceof SpotifyUserNotFoundError)
		return errorResponse("That Spotify profile doesn't exist.", 404);
	if (error instanceof SpotifyLinkNotSupportedError)
		return errorResponse("Paste a Spotify playlist or profile link.", 400);

	console.error(error);
	return errorResponse(
		"Couldn't reach the music data. Try again in a bit.",
		502,
	);
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const parsedSearch = searchSchema.safeParse(Object.fromEntries(searchParams));
	if (!parsedSearch.success)
		return errorResponse("Type a Last.fm username or a Spotify link.", 400);

	const query = parseMusicMatchQuery(parsedSearch.data.q);

	try {
		const [visitor, myArtists, myTracks, myAlbums] = await Promise.all([
			getTasteProfile(query),
			getTopArtists({
				username: LASTFM_USERNAME,
				period: "overall",
				limit: MY_ARTISTS_LIMIT,
			}),
			getTopTracks({
				username: LASTFM_USERNAME,
				period: "12month",
				limit: MY_TRACKS_LIMIT,
			}),
			getTopAlbums(),
		]);
		const { sharedArtists, sharedTracks, comparedCount, songs } = compareTastes(
			{
				visitor,
				myArtists,
				myTracks,
			},
		);
		const [shownArtists, matchSongs] = await Promise.all([
			Promise.all(
				sharedArtists.slice(0, SHOWN_ARTISTS_LIMIT).map(
					async (artist): Promise<MatchedArtist> => ({
						...artist,
						artworkUrl:
							findArtworkUrlByArtist(myAlbums, artist.name) ??
							(await findITunesArtworkUrl(artist.name, "album").catch(
								() => null,
							)),
					}),
				),
			),
			Promise.all(
				songs.map(
					async ({ title, artist }): Promise<MatchSong> => ({
						title,
						artist,
						url: getSpotifySearchUrl(`${artist} ${title}`),
						artworkUrl: await findITunesArtworkUrl(
							`${artist} ${title}`,
							"song",
						).catch(() => null),
					}),
				),
			),
		]);
		const match: MusicMatch = {
			visitor: {
				source: visitor.source,
				name: visitor.name,
				url: visitor.url,
				avatarUrl: visitor.avatarUrl,
				playUnit: visitor.playUnit,
			},
			sharedArtists: shownArtists,
			sharedCount: sharedArtists.length,
			comparedCount,
			songs: matchSongs,
			icebreakers: writeIcebreakers({
				visitor,
				sharedArtists,
				sharedTracks,
				comparedCount,
			}),
		};

		return Response.json(match);
	} catch (error) {
		return toErrorResponse(error);
	}
}
