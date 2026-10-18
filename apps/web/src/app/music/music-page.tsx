import { PageColumn } from "@/components/page/page-column";
import { PageHeader } from "@/components/page/page-header";
import { Section } from "@/components/section/section";
import { SiteFooter } from "@/components/site-footer/site-footer";
import {
	lastFmProfileUrl,
	listeningUpdatedMinutesAgo,
	nowPlaying,
	nowPlayingReleaseYear,
	onRepeat,
	recentTracks,
	topArtists,
} from "@/content/listening";

import { MusicMatchCard } from "./music-match-card";
import { NowPlayingCard } from "./now-playing-card";
import { OnRepeatShelf } from "./on-repeat-shelf";
import { RecentlyPlayedList } from "./recently-played-list";
import { TopArtistsList } from "./top-artists-list";

export function MusicPage() {
	const updatedAgo = new Intl.RelativeTimeFormat("en").format(
		-listeningUpdatedMinutesAgo,
		"minute",
	);

	return (
		<PageColumn>
			<PageHeader
				title="Music"
				subtitle="Everything here comes from my Last.fm, live."
			/>
			<section className="mt-14">
				<NowPlayingCard
					track={nowPlaying}
					releaseYear={nowPlayingReleaseYear}
				/>
			</section>
			<Section
				title="Top artists this month"
				action={
					<a href={lastFmProfileUrl} className="text-[15px] text-link">
						Last.fm profile
					</a>
				}
			>
				<TopArtistsList artists={topArtists} />
			</Section>
			<Section title="On repeat">
				<OnRepeatShelf albums={onRepeat} />
			</Section>
			<Section title="Recently played">
				<RecentlyPlayedList tracks={recentTracks} />
			</Section>
			<section className="mt-14">
				<MusicMatchCard />
			</section>
			<SiteFooter
				sources={
					<>
						Music from Last.fm, code from GitHub.
						<br />
						Updated {updatedAgo}.
					</>
				}
			/>
		</PageColumn>
	);
}
