import Image from "next/image";

import type { TopAlbum } from "@/entities/top-album";

export type OnRepeatShelfProps = {
	albums: TopAlbum[];
};

export function OnRepeatShelf({ albums }: OnRepeatShelfProps) {
	return (
		<div className="grid grid-cols-3 gap-[15px] sm:grid-cols-5">
			{albums.map((album) => (
				<div key={album.title} className="min-w-0">
					<Image
						src={album.artworkUrl}
						alt={`${album.title} cover`}
						width={300}
						height={300}
						className="block aspect-square w-full rounded-[10px] shadow-[0_0_0_0.5px_rgb(255_255_255/0.1)]"
					/>
					<div className="mt-2.5 truncate font-semibold text-[15px] tracking-[-0.01em]">
						{album.title}
					</div>
					<div className="text-muted-foreground text-sm">{album.artist}</div>
					<div className="mt-0.5 text-[13px] text-muted-foreground">
						{album.playCount} plays
					</div>
				</div>
			))}
		</div>
	);
}
