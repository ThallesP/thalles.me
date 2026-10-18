import { Button } from "@thalles-me/ui/components/button";
import { cn } from "@thalles-me/ui/lib/utils";
import { Lock, User } from "lucide-react";
import Image from "next/image";

import { Section } from "@/components/section/section";

const fanArtworks = [
	{
		src: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/da/72/ed/da72edf4-27c8-2d20-a870-3259f853a866/13UABIM70454.rgb.jpg/600x600bb.jpg",
		className: "top-2 left-1 -rotate-10",
	},
	{
		src: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/69/9c/b5/699cb5d6-115c-ff73-9d26-e57ea4350d72/887828031795.png/600x600bb.jpg",
		className: "top-2 left-11 rotate-9",
	},
	{
		src: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/16/fe/be/16febeb7-b081-c66c-a26b-1f7cd097bd45/19UMGIM66061.rgb.jpg/600x600bb.jpg",
		className: "top-0.5 left-6 z-1",
	},
];

export function MusicMatchSection() {
	return (
		<Section id="music-match" title="Do we like the same music?">
			<div className="grid items-center gap-7 rounded-xl bg-card p-6 sm:p-7 md:grid-cols-[1fr_240px]">
				<div>
					<p className="text-body leading-normal">
						Talking to strangers is hard, so let's skip the small talk. Type
						your Last.fm username and I'll find the music we both like, ranked
						by what <strong className="text-foreground">you</strong> play the
						most. You get two songs to listen to while you look around, and
						something to say when you write me.
					</p>
					<form className="mt-5 flex flex-col gap-2 sm:flex-row">
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
				<div aria-hidden className="flex items-center justify-center">
					<span className="relative z-2 grid size-16 shrink-0 place-items-center rounded-full border-2 border-[#48484A] border-dashed bg-card">
						<User className="size-[30px] text-muted-foreground" />
					</span>
					<span className="relative -mx-2.5 h-20 w-28">
						{fanArtworks.map(({ src, className }) => (
							<Image
								key={src}
								src={src}
								alt=""
								width={64}
								height={64}
								className={cn(
									"absolute size-16 rounded-lg shadow-[0_0_0_0.5px_rgb(255_255_255/0.12),0_6px_16px_rgb(0_0_0/0.5)]",
									className,
								)}
							/>
						))}
					</span>
					<Image
						src="https://avatars.githubusercontent.com/u/76017384?v=4"
						alt=""
						width={64}
						height={64}
						className="relative z-2 size-16 shrink-0 rounded-full"
					/>
				</div>
			</div>
		</Section>
	);
}
