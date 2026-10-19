import Link from "next/link";

import { Artwork } from "@/components/artwork/artwork";
import type { Listening } from "@/entities/listening";
import { useListening } from "@/hooks/use-listening";

export type NowPlayingChipProps = {
	listening: Listening;
};

export function NowPlayingChip({ listening }: NowPlayingChipProps) {
	const { latestTrack: track, isNowPlaying } = useListening(listening);
	const label = isNowPlaying ? "Listening to" : "Last played";

	return (
		<Link
			href="/music"
			aria-label={`${label} ${track.title} by ${track.artist}. Open Music.`}
			className="hidden items-center gap-2 rounded-full py-1 pr-3.5 pl-1 font-semibold text-sm sm:flex"
		>
			<Artwork
				src={track.artworkUrl}
				alt=""
				width={28}
				height={28}
				className="size-7 rounded-[7px]"
			/>
			{isNowPlaying && (
				<span aria-hidden className="flex h-3 items-end gap-0.5">
					<i className="h-1.5 w-0.5 rounded-full bg-online" />
					<i className="h-3 w-0.5 rounded-full bg-online" />
					<i className="h-2 w-0.5 rounded-full bg-online" />
				</span>
			)}
			<span className="max-w-[150px] truncate">{track.title}</span>
		</Link>
	);
}
