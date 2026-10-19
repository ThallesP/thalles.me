import { cn } from "@thalles-me/ui/lib/utils";
import { User } from "lucide-react";
import Image from "next/image";

import { Artwork } from "@/components/artwork/artwork";
import type { MusicMatchVisitor } from "@/entities/music-match";
import type { TasteSource } from "@/entities/taste-profile";
import type { TopAlbum } from "@/entities/top-album";

const fanPositions = [
	"top-2 left-1 -rotate-10",
	"top-2 left-11 rotate-9",
	"top-0.5 left-6 z-1",
];

export const FAN_ALBUMS_LIMIT = fanPositions.length;

const visitorAvatarShape: Record<TasteSource, string> = {
	lastfm: "rounded-full",
	spotify: "rounded-[14px]",
};

export type TasteAvatarsProps = {
	fanAlbums: TopAlbum[];
	visitor: MusicMatchVisitor | null;
};

function VisitorAvatar({ visitor }: { visitor: MusicMatchVisitor | null }) {
	if (visitor === null || visitor.avatarUrl === null)
		return (
			<span className="relative z-2 grid size-14 shrink-0 place-items-center rounded-full border-2 border-[#48484A] border-dashed bg-card">
				<User className="size-6 text-muted-foreground" />
			</span>
		);

	return (
		<Artwork
			key={visitor.avatarUrl}
			src={visitor.avatarUrl}
			alt=""
			width={56}
			height={56}
			className={cn(
				"fade-in zoom-in-50 relative z-2 size-14 shrink-0 animate-in object-cover duration-500 ease-out motion-reduce:animate-none",
				visitorAvatarShape[visitor.source],
			)}
		/>
	);
}

export function TasteAvatars({ fanAlbums, visitor }: TasteAvatarsProps) {
	return (
		<div aria-hidden className="flex shrink-0 items-center">
			<VisitorAvatar visitor={visitor} />
			<span className="relative -mx-2.5 h-[72px] w-24">
				{fanAlbums.map((album, index) => (
					<Artwork
						key={`${album.artist}-${album.title}`}
						src={album.artworkUrl}
						alt=""
						width={56}
						height={56}
						className={cn(
							"absolute size-14 rounded-lg shadow-[0_0_0_0.5px_rgb(255_255_255/0.12),0_6px_16px_rgb(0_0_0/0.5)]",
							fanPositions[index],
						)}
					/>
				))}
			</span>
			<Image
				src="https://avatars.githubusercontent.com/u/76017384?v=4"
				alt=""
				width={56}
				height={56}
				className="relative z-2 size-14 shrink-0 rounded-full"
			/>
		</div>
	);
}
