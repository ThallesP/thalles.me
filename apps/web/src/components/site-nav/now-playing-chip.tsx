import Image from "next/image";
import Link from "next/link";

import type { Track } from "@/entities/track";

export type NowPlayingChipProps = {
	track: Track;
};

export function NowPlayingChip({ track }: NowPlayingChipProps) {
	return (
		<Link
			href="/music"
			aria-label={`Listening to ${track.title} by ${track.artist}. Open Music.`}
			className="hidden items-center gap-2 rounded-full py-1 pr-3.5 pl-1 font-semibold text-sm sm:flex"
		>
			<Image
				src={track.artworkUrl}
				alt=""
				width={28}
				height={28}
				className="size-7 rounded-[7px]"
			/>
			<span aria-hidden className="flex h-3 items-end gap-0.5">
				<i className="h-1.5 w-0.5 rounded-full bg-online" />
				<i className="h-3 w-0.5 rounded-full bg-online" />
				<i className="h-2 w-0.5 rounded-full bg-online" />
			</span>
			<span className="max-w-[150px] truncate">{track.title}</span>
		</Link>
	);
}
