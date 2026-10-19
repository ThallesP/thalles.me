"use client";

import { buttonVariants } from "@thalles-me/ui/components/button";
import { cn } from "@thalles-me/ui/lib/utils";
import { Shuffle } from "lucide-react";
import { useState } from "react";

import type { MusicMatchVisitor } from "@/entities/music-match";

const CONTACT_EMAIL = "contato@thalles.me";

function getWriteMeUrl(visitor: MusicMatchVisitor, icebreaker: string) {
	const subject = encodeURIComponent(`${visitor.name} from thalles.me`);
	const body = encodeURIComponent(icebreaker);

	return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export type IcebreakerCardProps = {
	visitor: MusicMatchVisitor;
	icebreakers: string[];
};

export function IcebreakerCard({ visitor, icebreakers }: IcebreakerCardProps) {
	const [index, setIndex] = useState(0);
	const icebreaker = icebreakers[index];
	if (icebreaker === undefined) return null;

	function showNext() {
		setIndex((current) => (current + 1) % icebreakers.length);
	}

	return (
		<div className="flex flex-col gap-3 rounded-2xl bg-card-raised px-4 py-3.5 sm:flex-row sm:items-center">
			<p
				key={index}
				className="fade-in-0 slide-in-from-bottom-[6px] flex-1 text-[15px] leading-snug duration-280 motion-safe:animate-in"
			>
				“{icebreaker}”
			</p>
			<span className="flex items-center gap-2">
				{icebreakers.length > 1 && (
					<button
						type="button"
						onClick={showNext}
						aria-label="Show another line"
						title="Another one"
						className={cn(
							buttonVariants({ variant: "secondary", size: "sm" }),
							"group w-7 cursor-pointer px-0",
						)}
					>
						<Shuffle
							aria-hidden
							className="size-4 transition-transform duration-300 group-hover:-rotate-12"
						/>
					</button>
				)}
				<a
					href={getWriteMeUrl(visitor, icebreaker)}
					className={buttonVariants({ variant: "tinted", size: "sm" })}
				>
					Write me
				</a>
			</span>
		</div>
	);
}
