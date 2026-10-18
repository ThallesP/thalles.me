import { Artwork } from "@/components/artwork/artwork";
import { GroupedList } from "@/components/grouped-list/grouped-list";
import type { RecentTrack } from "@/entities/recent-track";

import { formatPlayedAgo } from "./format";
import { MusicRow } from "./music-row";

export type RecentlyPlayedListProps = {
	tracks: RecentTrack[];
	nowMs: number;
};

export function RecentlyPlayedList({ tracks, nowMs }: RecentlyPlayedListProps) {
	return (
		<GroupedList>
			{tracks.map((track) => (
				<MusicRow
					key={`${track.title}-${track.playedAtMs}`}
					leading={
						<Artwork
							src={track.artworkUrl}
							alt=""
							width={44}
							height={44}
							className="size-11 shrink-0 rounded-[7px] shadow-[0_0_0_0.5px_rgb(255_255_255/0.1)]"
						/>
					}
					title={track.title}
					description={track.artist}
					trailing={
						<span className="shrink-0 text-muted-foreground text-sm">
							{formatPlayedAgo(track.playedAtMs, nowMs)}
						</span>
					}
				/>
			))}
		</GroupedList>
	);
}
