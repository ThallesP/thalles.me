"use client";

import { cn } from "@thalles-me/ui/lib/utils";
import { Shuffle } from "lucide-react";
import { useState } from "react";

export type ShuffleArtistProps = {
	artists: string[];
};

export function ShuffleArtist({ artists }: ShuffleArtistProps) {
	const [shuffleCount, setShuffleCount] = useState(0);
	const labels = ["music", ...artists];
	const label = labels[shuffleCount % labels.length];
	const hasShuffled = shuffleCount > 0;

	function handleShuffle() {
		setShuffleCount((count) => count + 1);
	}

	return (
		<button
			type="button"
			onClick={handleShuffle}
			title="Shuffle through what I've been listening to"
			className="group inline-flex cursor-pointer items-center gap-[5px] rounded-[2px] font-semibold text-foreground shadow-[inset_0_-1.5px_0_rgb(245_245_247/0.35)] focus-visible:outline-2 focus-visible:outline-link focus-visible:outline-offset-3"
		>
			<span aria-live="polite">
				<span
					key={shuffleCount}
					className={cn(
						"inline-block",
						hasShuffled &&
							"fade-in-0 slide-in-from-bottom-[6px] duration-280 motion-safe:animate-in",
					)}
				>
					{label}
				</span>
			</span>
			<Shuffle
				aria-hidden
				className="size-[17px] text-muted-foreground transition-transform duration-300 group-hover:-rotate-12"
			/>
		</button>
	);
}
