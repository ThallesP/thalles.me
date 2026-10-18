import type { Track } from "./track";

export type RecentTrack = Track & {
	playedAtMs: number;
};
