import Image from "next/image";

import type { Track } from "@/entities/track";

export type NowPlayingCardProps = {
	track: Track;
	releaseYear: number;
};

export function NowPlayingCard({ track, releaseYear }: NowPlayingCardProps) {
	return (
		<div className="relative flex flex-col gap-5 overflow-hidden rounded-xl bg-card p-5 text-white sm:h-60 sm:flex-row sm:items-center sm:gap-7">
			<div className="absolute -inset-15">
				<Image
					src={track.artworkUrl}
					alt=""
					fill
					sizes="880px"
					className="object-cover blur-[48px] brightness-50 saturate-130"
				/>
			</div>
			<Image
				src={track.artworkUrl}
				alt={`${track.album} album cover`}
				width={200}
				height={200}
				priority
				className="relative size-40 shrink-0 rounded-[14px] shadow-[0_12px_32px_rgb(0_0_0/0.5)] sm:size-50"
			/>
			<div className="relative min-w-0 flex-1">
				<div className="flex items-center gap-1.5 font-semibold text-sm text-white/80">
					<Image src="/music/listening.svg" alt="" width={18} height={18} />
					Listening now
				</div>
				<div className="mt-3 font-bold text-[28px] leading-[1.1] tracking-[-0.025em] sm:text-[34px]">
					{track.title}
				</div>
				<div className="mt-1.5 text-[19px] text-white/88 tracking-[-0.01em]">
					{track.artist}
				</div>
				<div className="mt-1 text-[15px] text-white/72">
					{track.album} · {releaseYear}
				</div>
			</div>
			<div className="relative flex items-center gap-[5px] text-[13px] text-white/72 sm:absolute sm:right-5 sm:bottom-[18px]">
				<Image src="/music/lastfm.svg" alt="" width={13} height={13} />
				via Last.fm
			</div>
		</div>
	);
}
