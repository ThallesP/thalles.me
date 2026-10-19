import { cacheLife } from "next/cache";

import { PageColumn } from "@/components/page/page-column";
import { PageHeader } from "@/components/page/page-header";
import { Section } from "@/components/section/section";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { getRecentTracks } from "@/http/get-recent-tracks";
import { getTopAlbums } from "@/http/get-top-albums";
import { getTopArtists } from "@/http/get-top-artists";
import { LiveNowPlayingCard } from "./live-now-playing-card";
import { LiveRecentlyPlayedList } from "./live-recently-played-list";
import { MusicMatchCard } from "./music-match-card";
import { OnRepeatShelf } from "./on-repeat-shelf";
import { TopArtistsList } from "./top-artists-list";

export async function MusicPage() {
	"use cache";
	cacheLife("minutes");

	const [listening, topArtists, topAlbums] = await Promise.all([
		getRecentTracks("page"),
		getTopArtists({ period: "1month" }),
		getTopAlbums(),
	]);

	return (
		<PageColumn>
			<PageHeader
				title="Music"
				subtitle="Everything here comes from my Last.fm, live."
			/>
			<section className="mt-14">
				<LiveNowPlayingCard listening={listening} />
			</section>
			<Section
				title="Top artists this month"
				action={
					<a
						href="https://www.last.fm/user/thallesp"
						className="text-[15px] text-link"
					>
						Last.fm profile
					</a>
				}
			>
				<TopArtistsList artists={topArtists} albums={topAlbums} />
			</Section>
			<Section title="On repeat">
				<OnRepeatShelf albums={topAlbums.slice(0, 5)} />
			</Section>
			<Section title="Recently played">
				<LiveRecentlyPlayedList listening={listening} />
			</Section>
			<section className="mt-14">
				<MusicMatchCard />
			</section>
			<SiteFooter sources={"Music from Last.fm."} />
		</PageColumn>
	);
}
