import type { TopArtist } from "./top-artist";

export type TasteSource = "lastfm" | "spotify";

export type PlayUnit = "plays" | "tracks";

export type TasteProfile = {
	source: TasteSource;
	name: string;
	url: string;
	avatarUrl: string | null;
	playUnit: PlayUnit;
	artists: TopArtist[];
};
