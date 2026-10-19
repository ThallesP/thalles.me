import type { RecentTrack } from "./recent-track";
import type { Track } from "./track";

export type Listening = {
	latestTrack: Track;
	isNowPlaying: boolean;
	recentTracks: RecentTrack[];
	fetchedAtMs: number;
};
