import Link from "next/link";

import { Artwork } from "@/components/artwork/artwork";
import type { Listening } from "@/entities/listening";
import { useListening } from "@/hooks/use-listening";

export type NowPlayingChipProps = {
	listening: Listening;
};

export function NowPlayingChip({ listening }: NowPlayingChipProps) {
	const { latestTrack: track, isNowPlaying } = useListening(listening);
	const trackKey = `${track.artist}-${track.title}`;

	if (!isNowPlaying) return null;

	return (
		<>
			<span
				aria-hidden
				className="fade-in mx-1 hidden h-5 w-px animate-in bg-white/20 duration-500 motion-reduce:animate-none sm:block"
			/>
			<Link
				href="/music"
				aria-label={`Listening to ${track.title} by ${track.artist}. Open Music.`}
				className="fade-in zoom-in-90 slide-in-from-left-3 hidden origin-left animate-in items-center gap-2 rounded-full py-1 pr-3.5 pl-1 font-semibold text-sm duration-500 ease-out motion-reduce:animate-none sm:flex"
			>
				<Artwork
					key={`${trackKey}-artwork`}
					src={track.artworkUrl}
					alt=""
					width={28}
					height={28}
					className="fade-in zoom-in-75 size-7 animate-in rounded-[7px] duration-500 ease-out motion-reduce:animate-none"
				/>
				<span aria-hidden className="flex h-3 items-end gap-0.5">
					<i className="h-3 w-0.5 origin-bottom animate-equalizer rounded-full bg-online [animation-delay:-0.4s] motion-reduce:h-1.5 motion-reduce:animate-none" />
					<i className="h-3 w-0.5 origin-bottom animate-equalizer rounded-full bg-online [animation-duration:0.7s] motion-reduce:animate-none" />
					<i className="h-3 w-0.5 origin-bottom animate-equalizer rounded-full bg-online [animation-delay:-0.2s] [animation-duration:1.1s] motion-reduce:h-2 motion-reduce:animate-none" />
				</span>
				<span
					key={`${trackKey}-title`}
					className="fade-in slide-in-from-bottom-1 max-w-[150px] animate-in truncate duration-500 ease-out motion-reduce:animate-none"
				>
					{track.title}
				</span>
			</Link>
		</>
	);
}
