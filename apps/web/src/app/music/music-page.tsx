import { connection } from "next/server";
import { Suspense } from "react";

import { PageColumn } from "@/components/page/page-column";
import { PageHeader } from "@/components/page/page-header";
import { Section } from "@/components/section/section";
import { SiteFooter } from "@/components/site-footer/site-footer";
import { getRecentTracks } from "@/http/get-recent-tracks";
import { getTopAlbums } from "@/http/get-top-albums";
import { getTopArtists } from "@/http/get-top-artists";
import { LASTFM_USERNAME } from "@/http/lastfm";
import { LiveNowPlayingCard } from "./live-now-playing-card";
import { LiveRecentlyPlayedList } from "./live-recently-played-list";
import { MusicMatchCard } from "./music-match-card";
import { OnRepeatShelf } from "./on-repeat-shelf";
import { TopArtistsList } from "./top-artists-list";

export async function MusicPage() {
	const [topArtists, topAlbums] = await Promise.all([
		getTopArtists({ username: LASTFM_USERNAME, period: "1month", limit: 6 }),
		getTopAlbums(),
	]);

	return (
		<PageColumn>
			<PageHeader
				title="Music"
				subtitle="Everything here comes from my Last.fm, live."
			/>
			<section className="mt-14">
				<Suspense fallback={<div className="h-60 rounded-xl bg-card" />}>
					<NowPlaying />
				</Suspense>
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
				<Suspense>
					<RecentlyPlayed />
				</Suspense>
			</Section>
			<section className="mt-14">
				<MusicMatchCard />
			</section>
			<SiteFooter sources={"Music from Last.fm."} />
		</PageColumn>
	);
}

async function NowPlaying() {
	await connection();

	return <LiveNowPlayingCard listening={await getRecentTracks()} />;
}

async function RecentlyPlayed() {
	await connection();

	return <LiveRecentlyPlayedList listening={await getRecentTracks()} />;
}
