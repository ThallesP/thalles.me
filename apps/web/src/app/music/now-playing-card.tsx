import { cn } from "@thalles-me/ui/lib/utils";
import Image from "next/image";

import { Artwork } from "@/components/artwork/artwork";
import type { Track } from "@/entities/track";
import { getSpotifySearchUrl } from "@/lib/spotify-search-url";

type StatusLabelProps = {
	isNowPlaying: boolean;
	className?: string;
};

function StatusLabel({ isNowPlaying, className }: StatusLabelProps) {
	return (
		<div
			className={cn(
				"items-center gap-1.5 font-semibold text-sm text-white/80",
				className,
			)}
		>
			<Image src="/music/listening.svg" alt="" width={18} height={18} />
			{isNowPlaying ? "Listening now" : "Last played"}
		</div>
	);
}

export type NowPlayingCardProps = {
	track: Track;
	isNowPlaying: boolean;
};

export function NowPlayingCard({ track, isNowPlaying }: NowPlayingCardProps) {
	return (
		<div className="relative overflow-hidden rounded-xl bg-card p-5 text-white sm:flex sm:h-60 sm:items-center sm:gap-7">
			{track.artworkUrl && (
				<div className="absolute -inset-15">
					<Image
						src={track.artworkUrl}
						alt=""
						fill
						sizes="880px"
						unoptimized
						className="object-cover blur-[48px] brightness-50 saturate-130"
					/>
				</div>
			)}
			<div className="relative flex items-center justify-between sm:contents">
				<StatusLabel isNowPlaying={isNowPlaying} className="flex sm:hidden" />
				<div className="relative flex items-center gap-[5px] text-[13px] text-white/72 sm:absolute sm:right-5 sm:bottom-[18px]">
					<Image src="/music/lastfm.svg" alt="" width={13} height={13} />
					via Last.fm
				</div>
			</div>
			<div className="relative mt-4 flex items-center gap-4 sm:contents">
				<Artwork
					src={track.artworkUrl}
					alt={`${track.album} album cover`}
					width={200}
					height={200}
					preload
					className="relative size-30 shrink-0 rounded-[12px] shadow-[0_12px_32px_rgb(0_0_0/0.5)] sm:size-50 sm:rounded-[14px]"
				/>
				<div className="relative min-w-0 flex-1">
					<StatusLabel isNowPlaying={isNowPlaying} className="hidden sm:flex" />
					<div className="font-bold text-[22px] leading-[1.1] tracking-[-0.025em] sm:mt-3 sm:text-[34px]">
						<a
							href={getSpotifySearchUrl(`${track.title} ${track.artist}`)}
							target="_blank"
							rel="noopener"
							className="outline-none hover:underline focus-visible:underline"
						>
							{track.title}
						</a>
					</div>
					<div className="mt-1 text-[17px] text-white/88 tracking-[-0.01em] sm:mt-1.5 sm:text-[19px]">
						{track.artist}
					</div>
					<div className="mt-0.5 text-[14px] text-white/72 sm:mt-1 sm:text-[15px]">
						{track.album}
					</div>
				</div>
			</div>
		</div>
	);
}
