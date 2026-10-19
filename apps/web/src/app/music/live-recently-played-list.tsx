"use client";

import type { Listening } from "@/entities/listening";
import { useListening } from "@/hooks/use-listening";

import { RecentlyPlayedList } from "./recently-played-list";

export type LiveRecentlyPlayedListProps = {
	listening: Listening;
};

export function LiveRecentlyPlayedList({
	listening,
}: LiveRecentlyPlayedListProps) {
	const { recentTracks, fetchedAtMs } = useListening(listening);

	return <RecentlyPlayedList tracks={recentTracks} nowMs={fetchedAtMs} />;
}
