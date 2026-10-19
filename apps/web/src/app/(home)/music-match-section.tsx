import { Button } from "@thalles-me/ui/components/button";
import { cn } from "@thalles-me/ui/lib/utils";
import { Headphones, ListMusic, Lock, MessageCircle, User } from "lucide-react";
import Image from "next/image";

import { Artwork } from "@/components/artwork/artwork";
import { Section } from "@/components/section/section";
import { getTopAlbums } from "@/http/get-top-albums";

const fanPositions = [
	"top-2 left-1 -rotate-10",
	"top-2 left-11 rotate-9",
	"top-0.5 left-6 z-1",
];

const benefits = [
	{ icon: ListMusic, text: "What we both play, ranked by you" },
	{ icon: Headphones, text: "Two songs for while you look around" },
	{ icon: MessageCircle, text: "Something to say when you write me" },
];

export async function MusicMatchSection() {
	const topAlbums = await getTopAlbums();
	const fanAlbums = topAlbums
		.filter((album) => album.artworkUrl !== null)
		.slice(0, fanPositions.length);

	return (
		<Section id="music-match" title="Do we like the same music?">
			<div className="rounded-xl bg-card p-6 sm:p-7">
				<div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">
					<div aria-hidden className="flex shrink-0 items-center">
						<span className="relative z-2 grid size-14 shrink-0 place-items-center rounded-full border-2 border-[#48484A] border-dashed bg-card">
							<User className="size-6 text-muted-foreground" />
						</span>
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
					<p className="text-[19px] text-foreground leading-snug tracking-[-0.01em]">
						Talking to strangers is hard. Let's start with the music we both
						like.
					</p>
				</div>
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
				<form className="mt-6 flex flex-col gap-2 sm:flex-row">
					<label className="flex h-11 items-center gap-2.5 rounded-[12px] bg-card-raised px-3.5 focus-within:ring-2 focus-within:ring-ring sm:flex-1">
						<Image
							src="/home/lastfm.svg"
							alt=""
							width={18}
							height={18}
							className="size-[18px]"
						/>
						<input
							name="username"
							required
							autoComplete="off"
							autoCapitalize="none"
							spellCheck={false}
							placeholder="Your Last.fm username"
							aria-label="Your Last.fm username"
							aria-describedby="music-match-hint"
							className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
						/>
					</label>
					<Button
						type="submit"
						size="lg"
						disabled
						aria-describedby="music-match-hint"
						className="rounded-[12px] font-semibold"
					>
						Find our music
					</Button>
					<span id="music-match-hint" className="sr-only">
						Matching isn't live yet, so this button is turned off for now.
					</span>
				</form>
				<p className="mt-3 flex items-center gap-1.5 text-[13px] text-muted-foreground">
					<Lock aria-hidden className="size-3.5 shrink-0" />
					<span>
						Nothing is stored. Use{" "}
						<a href="https://listenbrainz.org" className="text-link">
							ListenBrainz
						</a>{" "}
						instead if you prefer.
					</span>
				</p>
			</div>
		</Section>
	);
}
