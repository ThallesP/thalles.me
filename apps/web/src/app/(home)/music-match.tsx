"use client";

import { Button } from "@thalles-me/ui/components/button";
import { Headphones, ListMusic, Lock, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";

import type { MusicMatch as MusicMatchData } from "@/entities/music-match";
import type { TopAlbum } from "@/entities/top-album";
import { useMusicMatch } from "@/hooks/use-music-match";

import { MusicMatchResult } from "./music-match-result";
import { TasteAvatars } from "./taste-avatars";

const formSchema = z.object({ q: z.string().trim().min(1) });

const benefits = [
	{ icon: ListMusic, text: "What we both play, ranked by you" },
	{ icon: Headphones, text: "Two songs for while you look around" },
	{ icon: MessageCircle, text: "Something to say when you write me" },
];

function pluralize(count: number, noun: string) {
	return count === 1 ? noun : `${noun}s`;
}

function Headline({ match }: { match: MusicMatchData | undefined }) {
	if (match === undefined)
		return (
			<>
				Talking to strangers is hard. Let's start with the music we both like.
			</>
		);

	const visitorLink = (
		<a href={match.visitor.url} className="text-link">
			{match.visitor.name}
		</a>
	);
	if (match.sharedCount === 0)
		return <>{visitorLink}, nothing in common yet. That's rare.</>;

	return (
		<>
			{visitorLink}, we share {match.sharedCount}{" "}
			{pluralize(match.sharedCount, "artist")}.
		</>
	);
}

function BenefitTiles() {
	return (
		<ul className="mt-6 grid gap-2.5 sm:grid-cols-3">
			{benefits.map(({ icon: Icon, text }) => (
				<li
					key={text}
					className="flex items-center gap-3 rounded-2xl bg-card-raised px-4 py-3.5 text-[15px] leading-snug sm:flex-col sm:items-start sm:gap-2.5"
				>
					<Icon aria-hidden className="size-5 shrink-0 text-body" />
					{text}
				</li>
			))}
		</ul>
	);
}

export type MusicMatchProps = {
	fanAlbums: TopAlbum[];
};

export function MusicMatch({ fanAlbums }: MusicMatchProps) {
	const [query, setQuery] = useState<string | null>(null);
	const { data: match, error, isLoading } = useMusicMatch(query);
	const visitor = match === undefined ? null : match.visitor;

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const { q } = formSchema.parse(
			Object.fromEntries(new FormData(event.currentTarget)),
		);
		setQuery(q);
	}

	return (
		<div className="rounded-xl bg-card p-6 sm:p-7">
			<div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
				<TasteAvatars fanAlbums={fanAlbums} visitor={visitor} />
				<p className="text-[19px] text-foreground leading-snug tracking-[-0.01em]">
					<Headline match={match} />
				</p>
			</div>
			{match === undefined ? (
				<BenefitTiles />
			) : (
				<MusicMatchResult match={match} />
			)}
			<form
				onSubmit={handleSubmit}
				className="mt-6 flex flex-col gap-2 sm:flex-row"
			>
				<label className="flex h-11 items-center gap-2.5 rounded-[12px] bg-card-raised px-3.5 focus-within:ring-2 focus-within:ring-ring sm:flex-1">
					<Image
						src="/home/lastfm.svg"
						alt=""
						width={18}
						height={18}
						className="size-[18px]"
					/>
					<input
						name="q"
						required
						autoComplete="off"
						autoCapitalize="none"
						spellCheck={false}
						placeholder="Last.fm user or Spotify link"
						aria-label="Last.fm username or Spotify playlist link"
						className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
					/>
				</label>
				<Button
					type="submit"
					size="lg"
					disabled={isLoading}
					className="rounded-[12px] font-semibold"
				>
					{isLoading ? "Finding…" : "Find our music"}
				</Button>
			</form>
			{error !== undefined && (
				<p role="alert" className="mt-3 text-[13px] text-destructive">
					{error.message}
				</p>
			)}
			<p className="mt-3 flex items-center gap-1.5 text-[13px] text-muted-foreground">
				<Lock aria-hidden className="size-3.5 shrink-0" />
				Public data only. Cached for an hour, then gone.
			</p>
		</div>
	);
}
