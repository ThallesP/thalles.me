import type { TasteProfile } from "@/entities/taste-profile";
import type { TopArtist } from "@/entities/top-artist";
import type { TopTrack } from "@/entities/top-track";

const SONGS_LIMIT = 2;

export type SharedArtist = {
	name: string;
	visitorPlayCount: number;
	myPlayCount: number;
	visitorRank: number;
	myRank: number;
};

export type SharedTrack = {
	title: string;
	artist: string;
};

export type TasteComparison = {
	sharedArtists: SharedArtist[];
	sharedTracks: SharedTrack[];
	comparedCount: number;
	songs: TopTrack[];
};

export type CompareTastesInput = {
	visitor: TasteProfile;
	myArtists: TopArtist[];
	myTracks: TopTrack[];
};

export function normalizeName(name: string) {
	return name.trim().toLowerCase();
}

function trackKey({ title, artist }: TopTrack) {
	return `${normalizeName(artist)} - ${normalizeName(title)}`;
}

function pickSongs(tracks: TopTrack[]) {
	const songs: TopTrack[] = [];
	for (const track of tracks) {
		if (songs.length === SONGS_LIMIT) break;
		if (songs.some((song) => song.artist === track.artist)) continue;
		songs.push(track);
	}

	return songs;
}

export function compareTastes({
	visitor,
	myArtists,
	myTracks,
}: CompareTastesInput): TasteComparison {
	const myArtistsByName = new Map(
		myArtists.map((artist, index) => [
			normalizeName(artist.name),
			{ artist, rank: index + 1 },
		]),
	);
	const sharedArtists = visitor.artists.flatMap(
		(artist, index): SharedArtist[] => {
			const mine = myArtistsByName.get(normalizeName(artist.name));
			if (mine === undefined) return [];

			return [
				{
					name: mine.artist.name,
					visitorPlayCount: artist.playCount,
					myPlayCount: mine.artist.playCount,
					visitorRank: index + 1,
					myRank: mine.rank,
				},
			];
		},
	);
	const sharedNames = new Set(
		sharedArtists.map((artist) => normalizeName(artist.name)),
	);
	const myTrackKeys = new Set(myTracks.map(trackKey));
	const sharedTracks = visitor.tracks
		.filter((track) => myTrackKeys.has(trackKey(track)))
		.map(({ title, artist }): SharedTrack => ({ title, artist }));
	const sharedArtistTracks = myTracks.filter((track) =>
		sharedNames.has(normalizeName(track.artist)),
	);

	return {
		sharedArtists,
		sharedTracks,
		comparedCount: visitor.artists.length,
		songs: pickSongs([...sharedArtistTracks, ...myTracks]),
	};
}
