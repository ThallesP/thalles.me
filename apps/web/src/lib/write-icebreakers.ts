import type { TasteProfile, TasteSource } from "@/entities/taste-profile";
import type { TopArtist } from "@/entities/top-artist";
import { LASTFM_USERNAME } from "@/http/lastfm";

import {
	normalizeName,
	type SharedArtist,
	type SharedTrack,
} from "./compare-tastes";

const MAX_ICEBREAKERS = 4;
const HIGH_OVERLAP_PERCENT = 25;
const LOPSIDED_RATIO = 2;
const MIN_PLAYS_FOR_RATIO = 10;
const SELF_LINE = "Hi Thalles, it's Thalles. We have a lot in common.";

const formatCount = new Intl.NumberFormat("en-US").format;

function times(count: number) {
	return `${formatCount(count)} ${count === 1 ? "time" : "times"}`;
}

function songs(count: number) {
	return `${formatCount(count)} ${count === 1 ? "song" : "songs"}`;
}

type Lines = {
	none: string;
	sharedTrack: (track: SharedTrack) => string;
	highOverlap: (percent: number) => string;
	visitorAhead: (artist: SharedArtist) => string | null;
	meAhead: (artist: SharedArtist) => string | null;
	missingTop: (artist: TopArtist) => string;
	top: (artist: SharedArtist) => string;
};

const linesBySource: Record<TasteSource, Lines> = {
	lastfm: {
		none: "Our top artists don't overlap at all. Send me one song and I'll send one back.",
		sharedTrack: ({ title, artist }) =>
			`"${title}" by ${artist} is in both our top tracks. Figured that earns a hello.`,
		highOverlap: (percent) =>
			`${percent}% of my top artists are in yours. Suspicious.`,
		visitorAhead: ({ name, visitorPlayCount, myPlayCount }) =>
			`I've played ${name} ${times(visitorPlayCount)}. You're at ${formatCount(myPlayCount)}. You'll get there.`,
		meAhead: ({ name, visitorPlayCount, myPlayCount }) =>
			`You've played ${name} ${times(myPlayCount)} and I thought my ${formatCount(visitorPlayCount)} was a lot.`,
		missingTop: ({ name }) =>
			`My #1 is ${name} and they're nowhere in your list. That's on you to fix.`,
		top: ({ name, visitorPlayCount, myPlayCount }) =>
			`We both listen to ${name}. I'm at ${formatCount(visitorPlayCount)} plays, you're at ${formatCount(myPlayCount)}.`,
	},
	spotify: {
		none: "Nothing in my Spotify matches your top artists. Send me one song and I'll send one back.",
		sharedTrack: ({ title, artist }) =>
			`"${title}" by ${artist} is in my Spotify and in your top tracks. Figured that earns a hello.`,
		highOverlap: (percent) =>
			`${percent}% of the artists in my Spotify are in your top artists. Suspicious.`,
		visitorAhead: () => null,
		meAhead: () => null,
		missingTop: ({ name }) =>
			`${name}: all over my Spotify, nowhere in your top artists. Start there.`,
		top: ({ name, visitorPlayCount, myPlayCount }) =>
			`I have ${songs(visitorPlayCount)} by ${name} in my Spotify and you've played them ${times(myPlayCount)}. We should talk.`,
	},
};

function findLopsided(
	sharedArtists: SharedArtist[],
	ratioOf: (artist: SharedArtist) => number,
) {
	return sharedArtists
		.filter(
			(artist) =>
				Math.min(artist.visitorPlayCount, artist.myPlayCount) >=
				MIN_PLAYS_FOR_RATIO,
		)
		.filter((artist) => ratioOf(artist) >= LOPSIDED_RATIO)
		.sort((a, b) => ratioOf(b) - ratioOf(a))[0];
}

export type WriteIcebreakersInput = {
	visitor: TasteProfile;
	sharedArtists: SharedArtist[];
	sharedTracks: SharedTrack[];
	comparedCount: number;
};

export function writeIcebreakers({
	visitor,
	sharedArtists,
	sharedTracks,
	comparedCount,
}: WriteIcebreakersInput) {
	if (
		visitor.source === "lastfm" &&
		normalizeName(visitor.name) === LASTFM_USERNAME
	)
		return [SELF_LINE];

	const lines = linesBySource[visitor.source];
	const [topShared] = sharedArtists;
	if (topShared === undefined) return [lines.none];

	const sharedNames = new Set(
		sharedArtists.map((artist) => normalizeName(artist.name)),
	);
	const [sharedTrack] = sharedTracks;
	const [visitorTop] = visitor.artists;
	const percent = Math.round((sharedArtists.length / comparedCount) * 100);
	const visitorAhead = findLopsided(
		sharedArtists,
		(artist) => artist.visitorPlayCount / artist.myPlayCount,
	);
	const meAhead = findLopsided(
		sharedArtists,
		(artist) => artist.myPlayCount / artist.visitorPlayCount,
	);
	const missingTop =
		visitorTop !== undefined && !sharedNames.has(normalizeName(visitorTop.name))
			? visitorTop
			: undefined;

	const candidates = [
		sharedTrack === undefined ? null : lines.sharedTrack(sharedTrack),
		percent < HIGH_OVERLAP_PERCENT ? null : lines.highOverlap(percent),
		visitorAhead === undefined ? null : lines.visitorAhead(visitorAhead),
		meAhead === undefined ? null : lines.meAhead(meAhead),
		missingTop === undefined ? null : lines.missingTop(missingTop),
		lines.top(topShared),
	];

	return candidates.filter((line) => line !== null).slice(0, MAX_ICEBREAKERS);
}
