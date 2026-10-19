import { cacheLife } from "next/cache";

type ITunesSearchResponse = {
	results: { artworkUrl100: string }[];
};

export async function findITunesArtworkUrl(
	term: string,
	entity: "song" | "album",
) {
	"use cache";
	cacheLife("weeks");

	const search = new URLSearchParams({ term, entity, limit: "1" });
	const response = await fetch(`https://itunes.apple.com/search?${search}`);
	if (!response.ok)
		throw new Error(`iTunes search request failed with ${response.status}`);

	const {
		results: [result],
	}: ITunesSearchResponse = await response.json();

	return result === undefined
		? null
		: result.artworkUrl100.replace("100x100bb", "600x600bb");
}
