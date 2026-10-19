import type { TasteSource } from "@/entities/taste-profile";

import type { SharedArtist } from "./compare-tastes";

const formatCount = new Intl.NumberFormat("en-US").format;

const noOverlapLine: Record<TasteSource, string> = {
	lastfm:
		"Our Last.fm histories don't overlap yet. What should I listen to first?",
	spotify:
		"Your Spotify and my top artists don't overlap yet. What should I listen to first?",
};

const overlapLine: Record<TasteSource, (artist: SharedArtist) => string> = {
	lastfm: ({ name, visitorPlayCount, myPlayCount }) =>
		`We both listen to ${name}. You've played them ${formatCount(visitorPlayCount)} times, I'm at ${formatCount(myPlayCount)}.`,
	spotify: ({ name, visitorPlayCount, myPlayCount }) =>
		`${name} shows up ${formatCount(visitorPlayCount)} times in your Spotify. I've played them ${formatCount(myPlayCount)} times.`,
};

export function writeIcebreaker(
	source: TasteSource,
	sharedArtists: SharedArtist[],
) {
	const [topArtist] = sharedArtists;
	if (topArtist === undefined) return noOverlapLine[source];

	return overlapLine[source](topArtist);
}
