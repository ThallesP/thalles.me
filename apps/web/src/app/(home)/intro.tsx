import Link from "next/link";

import { getTopArtists } from "@/http/get-top-artists";
import { LASTFM_USERNAME } from "@/http/lastfm";

import { ShuffleArtist } from "./shuffle-artist";
import { TermTooltip } from "./term-tooltip";

const inlineLinkClass =
	"rounded-[2px] font-semibold text-foreground shadow-[inset_0_-1.5px_0_rgb(245_245_247/0.35)] focus-visible:outline-2 focus-visible:outline-link focus-visible:outline-offset-3";

export async function Intro() {
	const topArtists = await getTopArtists({
		username: LASTFM_USERNAME,
		period: "7day",
		limit: 6,
	});

	return (
		<p className="mt-3.5 max-w-[620px] text-body text-xl leading-[1.55] tracking-[-0.008em]">
			I'm a{" "}
			<TermTooltip
				label="Founding Engineer"
				title="Founding Engineer"
				definition="One of the first engineers at a startup. Besides writing a lot of the code, I help decide what gets built and how, and I own it all the way to production."
			/>{" "}
			at{" "}
			<a href="https://notus.team" className={inlineLinkClass}>
				Notus Labs
			</a>
			, from Brazil. The rest of the time I build the tools I wish existed. I
			code from a{" "}
			<Link href="/setup" className={inlineLinkClass}>
				home lab
			</Link>{" "}
			and listen to a lot of{" "}
			<ShuffleArtist artists={topArtists.map(({ name }) => name)} />.
		</p>
	);
}
