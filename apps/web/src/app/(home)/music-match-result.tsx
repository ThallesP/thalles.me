import {
	ArrowUpRight,
	Headphones,
	ListMusic,
	type LucideIcon,
	MessageCircle,
} from "lucide-react";

import { Artwork } from "@/components/artwork/artwork";
import type {
	MatchedArtist,
	MatchSong,
	MusicMatch,
} from "@/entities/music-match";
import type { PlayUnit } from "@/entities/taste-profile";
import { getSpotifySearchUrl } from "@/lib/spotify-search-url";

import { IcebreakerCard } from "./icebreaker-card";

const formatCount = new Intl.NumberFormat("en-US").format;

const visitorUnitLabel: Record<PlayUnit, string> = {
	plays: "plays",
	tracks: "tracks",
};

type BlockProps = {
	icon: LucideIcon;
	title: string;
	children: React.ReactNode;
};

function Block({ icon: Icon, title, children }: BlockProps) {
	return (
		<section>
			<h3 className="mb-2 flex items-center gap-2 px-1 font-semibold text-[13px] text-muted-foreground">
				<Icon aria-hidden className="size-4 shrink-0" />
				{title}
			</h3>
			{children}
		</section>
	);
}

type SharedArtistsListProps = {
	artists: MatchedArtist[];
	sharedCount: number;
	playUnit: PlayUnit;
};

function SharedArtistsList({
	artists,
	sharedCount,
	playUnit,
}: SharedArtistsListProps) {
	const [topArtist] = artists;
	if (topArtist === undefined)
		return (
			<p className="rounded-2xl bg-card-raised px-4 py-3.5 text-[15px] text-muted-foreground leading-snug">
				None of your top artists are in mine. Start me off below.
			</p>
		);

	const hiddenCount = sharedCount - artists.length;

	return (
		<>
			<ol className="overflow-hidden rounded-2xl bg-card-raised">
				{artists.map((artist, index) => (
					<li key={artist.name} className="group/row">
						<a
							href={getSpotifySearchUrl(artist.name)}
							target="_blank"
							rel="noopener"
							className="flex items-center gap-3 px-4 outline-none transition-colors hover:bg-white/[0.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
						>
							<span className="w-4 shrink-0 text-center font-semibold text-[13px] text-muted-foreground tabular-nums">
								{index + 1}
							</span>
							<Artwork
								src={artist.artworkUrl}
								alt=""
								width={40}
								height={40}
								className="size-10 shrink-0 rounded-full object-cover shadow-[0_0_0_0.5px_rgb(255_255_255/0.12)]"
							/>
							<span className="flex min-w-0 flex-1 items-center gap-4 border-border border-b-[0.5px] py-2.5 group-last/row:border-b-0">
								<span className="min-w-0 flex-1">
									<span className="block truncate font-semibold text-[15px] tracking-[-0.01em]">
										{artist.name}
									</span>
									<span className="block truncate text-[13px] text-muted-foreground tabular-nums">
										you {formatCount(artist.visitorPlayCount)}{" "}
										{visitorUnitLabel[playUnit]} · me{" "}
										{formatCount(artist.myPlayCount)} plays
									</span>
								</span>
								<span className="hidden h-1.5 w-32 shrink-0 overflow-hidden rounded-full bg-secondary sm:block">
									<i
										className="block h-full rounded-full bg-foreground/45"
										style={{
											width: `${(artist.visitorPlayCount / topArtist.visitorPlayCount) * 100}%`,
										}}
									/>
								</span>
							</span>
						</a>
					</li>
				))}
			</ol>
			{hiddenCount > 0 && (
				<p className="mt-2 px-1 text-[13px] text-muted-foreground">
					and {formatCount(hiddenCount)} more.
				</p>
			)}
		</>
	);
}

function SongsList({ songs }: { songs: MatchSong[] }) {
	return (
		<ul className="grid gap-2.5 sm:grid-cols-2">
			{songs.map((song) => (
				<li key={`${song.artist}-${song.title}`}>
					<a
						href={song.url}
						target="_blank"
						rel="noopener"
						className="flex items-center gap-3 rounded-2xl bg-card-raised px-4 py-3 outline-none transition-colors hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-ring"
					>
						<Artwork
							src={song.artworkUrl}
							alt=""
							width={48}
							height={48}
							className="size-12 shrink-0 rounded-lg shadow-[0_0_0_0.5px_rgb(255_255_255/0.12)]"
						/>
						<span className="min-w-0 flex-1">
							<span className="block truncate font-semibold text-[15px] tracking-[-0.01em]">
								{song.title}
							</span>
							<span className="block truncate text-[13px] text-muted-foreground">
								{song.artist}
							</span>
						</span>
						<ArrowUpRight
							aria-hidden
							className="size-4 shrink-0 text-muted-foreground"
						/>
					</a>
				</li>
			))}
		</ul>
	);
}

export type MusicMatchResultProps = {
	match: MusicMatch;
};

export function MusicMatchResult({ match }: MusicMatchResultProps) {
	const songsTitle =
		match.sharedCount === 0
			? "Two of mine to start with"
			: "Two songs for while you look around";

	return (
		<div
			key={match.visitor.url}
			className="fade-in slide-in-from-bottom-2 mt-6 flex animate-in flex-col gap-5 duration-500 ease-out motion-reduce:animate-none"
		>
			<Block icon={ListMusic} title="What we both play, ranked by you">
				<SharedArtistsList
					artists={match.sharedArtists}
					sharedCount={match.sharedCount}
					playUnit={match.visitor.playUnit}
				/>
			</Block>
			<Block icon={Headphones} title={songsTitle}>
				<SongsList songs={match.songs} />
			</Block>
			<Block icon={MessageCircle} title="Something to say when you write me">
				<IcebreakerCard
					visitor={match.visitor}
					icebreakers={match.icebreakers}
				/>
			</Block>
		</div>
	);
}
