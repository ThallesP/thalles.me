import Link from "next/link";

import { Artwork } from "@/components/artwork/artwork";
import type { Listening } from "@/entities/listening";
import { useListening } from "@/hooks/use-listening";

export type NowPlayingChipProps = {
	listening: Listening;
};

export function NowPlayingChip({ listening }: NowPlayingChipProps) {
	const { latestTrack: track, isNowPlaying } = useListening(listening);

	if (!isNowPlaying) return null;

	return (
		<>
			<span aria-hidden className="mx-1 hidden h-5 w-px bg-white/20 sm:block" />
			<Link
				href="/music"
				aria-label={`Listening to ${track.title} by ${track.artist}. Open Music.`}
				className="hidden items-center gap-2 rounded-full py-1 pr-3.5 pl-1 font-semibold text-sm sm:flex"
			>
				<Artwork
					src={track.artworkUrl}
					alt=""
					width={28}
					height={28}
					className="size-7 rounded-[7px]"
				/>
				<span aria-hidden className="flex h-3 items-end gap-0.5">
					<i className="h-3 w-0.5 origin-bottom animate-equalizer rounded-full bg-online [animation-delay:-0.4s] motion-reduce:h-1.5 motion-reduce:animate-none" />
					<i className="h-3 w-0.5 origin-bottom animate-equalizer rounded-full bg-online [animation-duration:0.7s] motion-reduce:animate-none" />
					<i className="h-3 w-0.5 origin-bottom animate-equalizer rounded-full bg-online [animation-delay:-0.2s] [animation-duration:1.1s] motion-reduce:h-2 motion-reduce:animate-none" />
				</span>
				<span className="max-w-[150px] truncate">{track.title}</span>
			</Link>
		</>
	);
}
