import { cacheLife } from "next/cache";

import type { TopAlbum } from "@/entities/top-album";
import { ENV } from "@/env.server";
import { findITunesArtworkUrl } from "./find-itunes-artwork-url";
import {
	getLargestImageUrl,
	LASTFM_USERNAME,
	type LastFmImage,
} from "./lastfm";

const ARTWORK_FALLBACK_LIMIT = 5;

type TopAlbumsResponse = {
	topalbums: {
		album: {
			name: string;
			artist: { name: string };
			playcount: string;
			image: LastFmImage[];
		}[];
	};
};

export async function getTopAlbums() {
	"use cache";
	cacheLife("hours");

	const search = new URLSearchParams({
		method: "user.gettopalbums",
		user: LASTFM_USERNAME,
		api_key: ENV.LASTFM_API_KEY,
		format: "json",
		period: "1month",
		limit: "50",
	});
	const response = await fetch(`https://ws.audioscrobbler.com/2.0/?${search}`);
	if (!response.ok)
		throw new Error(
			`Last.fm top albums request failed with ${response.status}`,
		);

	const { topalbums }: TopAlbumsResponse = await response.json();

	const albums = topalbums.album.map(
		({ name, artist, playcount, image }): TopAlbum => ({
			title: name,
			artist: artist.name,
			artworkUrl: getLargestImageUrl(image),
			playCount: Number(playcount),
		}),
	);

	return Promise.all(
		albums.map(async (album, index) => {
			if (index >= ARTWORK_FALLBACK_LIMIT || album.artworkUrl !== null)
				return album;

			const artworkUrl = await findITunesArtworkUrl(
				`${album.artist} ${album.title}`,
				"album",
			).catch(() => null);

			return { ...album, artworkUrl };
		}),
	);
}
