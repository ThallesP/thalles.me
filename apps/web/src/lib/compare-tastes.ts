import type { TasteProfile } from "@/entities/taste-profile";
import type { TopArtist } from "@/entities/top-artist";
import type { TopTrack } from "@/entities/top-track";

const SONGS_LIMIT = 2;

export type SharedArtist = {
	name: string;
	visitorPlayCount: number;
	myPlayCount: number;
};

export type TasteComparison = {
	sharedArtists: SharedArtist[];
	comparedCount: number;
	songs: TopTrack[];
};

export type CompareTastesInput = {
	visitor: TasteProfile;
	myArtists: TopArtist[];
	myTracks: TopTrack[];
};

export function normalizeArtistName(name: string) {
	return name.trim().toLowerCase();
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
		myArtists.map((artist) => [normalizeArtistName(artist.name), artist]),
	);
	const sharedArtists = visitor.artists.flatMap((artist): SharedArtist[] => {
		const mine = myArtistsByName.get(normalizeArtistName(artist.name));
		if (mine === undefined) return [];

		return [
			{
				name: mine.name,
				visitorPlayCount: artist.playCount,
				myPlayCount: mine.playCount,
			},
		];
	});
	const sharedNames = new Set(
		sharedArtists.map((artist) => normalizeArtistName(artist.name)),
	);
	const sharedTracks = myTracks.filter((track) =>
		sharedNames.has(normalizeArtistName(track.artist)),
	);

	return {
		sharedArtists,
		comparedCount: visitor.artists.length,
		songs: pickSongs([...sharedTracks, ...myTracks]),
	};
}
