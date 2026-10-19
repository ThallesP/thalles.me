"use client";

import type { Listening } from "@/entities/listening";
import { useListening } from "@/hooks/use-listening";

import { NowPlayingCard } from "./now-playing-card";

export type LiveNowPlayingCardProps = {
	listening: Listening;
};

export function LiveNowPlayingCard({ listening }: LiveNowPlayingCardProps) {
	const { latestTrack, isNowPlaying } = useListening(listening);

	return <NowPlayingCard track={latestTrack} isNowPlaying={isNowPlaying} />;
}
