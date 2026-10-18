import Image from "next/image";

import { GroupedList } from "@/components/grouped-list/grouped-list";
import type { TopArtist } from "@/entities/top-artist";

import { MusicRow } from "./music-row";

export type TopArtistsListProps = {
	artists: TopArtist[];
};

export function TopArtistsList({ artists }: TopArtistsListProps) {
	const topPlayCount = Math.max(...artists.map((artist) => artist.playCount));

	return (
		<GroupedList>
			{artists.map((artist, index) => (
				<MusicRow
					key={artist.name}
					leading={
						<>
							<span className="w-[18px] shrink-0 text-center font-semibold text-[15px] text-muted-foreground tabular-nums">
								{index + 1}
							</span>
							<Image
								src={artist.imageUrl}
								alt={artist.name}
								width={44}
								height={44}
								className="size-11 shrink-0 rounded-full object-cover shadow-[0_0_0_0.5px_rgb(255_255_255/0.12)]"
							/>
						</>
					}
					title={artist.name}
					description={`${artist.playCount} plays`}
					trailing={
						<span className="h-1.5 w-14 shrink-0 overflow-hidden rounded-full bg-secondary sm:w-60">
							<i
								className="block h-full rounded-full bg-foreground/45"
								style={{ width: `${(artist.playCount / topPlayCount) * 100}%` }}
							/>
						</span>
					}
				/>
			))}
		</GroupedList>
	);
}
