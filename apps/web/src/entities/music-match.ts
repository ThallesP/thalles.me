import type { PlayUnit, TasteSource } from "./taste-profile";

export type MatchedArtist = {
	name: string;
	artworkUrl: string | null;
	visitorPlayCount: number;
	myPlayCount: number;
};

export type MatchSong = {
	title: string;
	artist: string;
	artworkUrl: string | null;
	url: string;
};

export type MusicMatchVisitor = {
	source: TasteSource;
	name: string;
	url: string;
	avatarUrl: string | null;
	playUnit: PlayUnit;
};

export type MusicMatch = {
	visitor: MusicMatchVisitor;
	sharedArtists: MatchedArtist[];
	sharedCount: number;
	comparedCount: number;
	songs: MatchSong[];
	icebreaker: string;
};
