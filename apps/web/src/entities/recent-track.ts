import type { Track } from "./track";

export type RecentTrack = Track & {
	playedMinutesAgo: number;
};
